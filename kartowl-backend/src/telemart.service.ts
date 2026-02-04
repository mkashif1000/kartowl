import { Injectable, Logger } from '@nestjs/common';
import { BrowserService } from './browser.service';
import { randomDelay } from './utils/throttle.utils';

@Injectable()
export class TelemartService {
  private readonly logger = new Logger(TelemartService.name);
  private readonly BASE_URL = 'https://telemart.pk';

  constructor(private readonly browserService: BrowserService) { }

  async searchProduct(query: string) {
    this.logger.log(`Scraping Telemart for: ${query}`);
    const browserSession = await this.browserService.getNewPage();
    if (!browserSession) return [];

    const { page, context } = browserSession;

    try {
      // Add random delay before navigation to avoid detection
      await randomDelay(500, 1500);

      // 1. Navigate to Homepage first
      await page.goto(this.BASE_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });

      // 2. Find and fill the search box
      await page.waitForSelector('#search-box', { timeout: 10000 });
      await page.fill('#search-box', query);
      await page.press('#search-box', 'Enter');

      // 3. Wait for results page to load
      await page.waitForLoadState('networkidle');

      // 4. Wait for product links
      try {
        await page.waitForSelector('a[href^="/"][href*="-"], a[href^="https://telemart.pk/"][href*="-"]', { timeout: 15000 });
      } catch (e) {
        this.logger.warn(`No products found on Telemart for "${query}"`);
        return [];
      }

      // 5. Extract Data
      const products = await page.evaluate(() => {
        const items: any[] = [];

        // Select all anchor tags that look like product links
        const productLinks = Array.from(document.querySelectorAll('a[href^="/"][href*="-"], a[href^="https://telemart.pk/"][href*="-"]')).filter((link: any) => {
          const href = link.getAttribute('href');
          return href &&
            !href.includes('#') &&
            !href.includes('/cart') &&
            !href.includes('/account') &&
            !href.includes('/wishlist') &&
            href.split('/').length > 1 &&
            href.split('/')[1].length > 5;
        });

        productLinks.slice(0, 15).forEach((link: any) => {
          try {
            const container = link.closest('div') || link.parentElement;

            // Extract title
            let title = '';
            const titleElement = link.querySelector('h3, h4, h5, h6') || link;
            title = titleElement?.innerText?.trim() || link.innerText.trim() || '';
            title = title.replace(/\s+/g, ' ').trim();
            title = title.replace(/[0-9]+\s*%\s*OFF/i, '').trim();
            title = title.replace(/[0-9.]+\s*[0-9]*\s*Ratings?\s*&?\s*Reviews?/i, '').trim();
            title = title.replace(/Rs\.\s*[0-9,]+/g, '').trim();
            title = title.replace(/\s+/g, ' ').trim();

            if (title.length < 5 || title.includes('Home') || title.includes('Category')) {
              return;
            }

            // Extract prices
            let currentPrice = 0;
            let originalPrice = 0;

            const priceTextElements = Array.from(container.querySelectorAll('*')).filter((elem: any) => {
              const el = elem as HTMLElement;
              const text = el.innerText || '';
              return (text.includes('Rs') || text.includes('PKR')) && !text.includes('% OFF') && !text.includes('OFF');
            });

            for (const elem of priceTextElements) {
              const el = elem as HTMLElement;
              const text = el.innerText || '';
              const matches = text.match(/[\d,]+/g);
              if (matches && matches.length > 0) {
                const isDeleted = el.closest('del') !== null;

                if (isDeleted) {
                  const price = parseInt(matches[0].replace(/,/g, ''), 10) || 0;
                  if (price > originalPrice) {
                    originalPrice = price;
                  }
                } else {
                  const price = parseInt(matches[0].replace(/,/g, ''), 10) || 0;
                  if (price > currentPrice && price > 30) {
                    currentPrice = price;
                  }

                  if (matches.length >= 2 && originalPrice === 0) {
                    const secondPrice = parseInt(matches[1].replace(/,/g, ''), 10) || 0;
                    if (secondPrice > originalPrice && secondPrice > 30) {
                      originalPrice = secondPrice;
                    }
                  }
                }
              }
            }

            if (originalPrice < currentPrice) {
              originalPrice = currentPrice;
            }

            // Extract image
            let image = '';
            const imgElement = container.querySelector('img');
            if (imgElement) {
              image = imgElement.src || imgElement.getAttribute('data-src') || imgElement.getAttribute('data-original') || '';
            }

            // Calculate discount
            const discount = originalPrice > currentPrice ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100) : 0;

            // Construct product URL
            let productUrl = link.href || link.getAttribute('href') || '';
            if (productUrl.startsWith('/')) {
              productUrl = 'https://telemart.pk' + productUrl;
            } else if (!productUrl.startsWith('http')) {
              productUrl = 'https://telemart.pk/' + productUrl;
            }

            // Extract rating and reviews
            let rating = 0;
            let reviews = 0;
            const containerText = (container as HTMLElement).innerText || '';

            const ratingMatch = containerText.match(/[0-5]\.[0-9]{1,2}/);
            if (ratingMatch) {
              rating = parseFloat(ratingMatch[0]);
            }

            const reviewCountMatch = containerText.match(/[0-5]\.[0-9]{1,2}\s*\((\d+)\)/);
            if (reviewCountMatch) {
              reviews = parseInt(reviewCountMatch[1], 10);
            } else {
              const generalReviewMatch = containerText.match(/\((\d+)\)|([0-9]+)\s*Reviews?/i);
              if (generalReviewMatch) {
                reviews = parseInt(generalReviewMatch[1] || generalReviewMatch[2], 10);
              }
            }

            // Determine stock status
            let inStock = true;
            if (originalPrice === 0 || originalPrice === currentPrice) {
              inStock = false;
            }

            items.push({
              id: Math.random().toString(36).substr(2, 9),
              title,
              currentPrice,
              originalPrice,
              discount,
              image,
              marketplace: 'telemart',
              productUrl,
              rating,
              reviews,
              inStock
            });

          } catch (itemError) {
            console.error('Error processing item:', itemError);
          }
        });

        return items;
      });

      return products;

    } catch (error) {
      this.logger.error(`Failed to scrape Telemart: ${error.message}`);
      return [];
    } finally {
      // ONLY close the page/context, never the browser
      await page.close();
      await context.close();
    }
  }
}