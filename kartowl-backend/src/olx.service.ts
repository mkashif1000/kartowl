import { Injectable, Logger } from '@nestjs/common';
import { BrowserService } from './browser.service';
import { randomDelay } from './utils/throttle.utils';

@Injectable()
export class OlxService {
  private readonly logger = new Logger(OlxService.name);
  private readonly BASE_URL = 'https://www.olx.com.pk';

  constructor(private readonly browserService: BrowserService) { }

  async searchProduct(query: string) {
    this.logger.log(`🔍 KartOwl is checking OLX for: ${query}`);
    // ✅ NEW: Get lightweight page from singleton browser
    const { page, context } = await this.browserService.getNewPage();

    try {
      // Add random delay before navigation to avoid detection
      await randomDelay(500, 1500);

      // OLX Search URL Pattern
      const searchUrl = `${this.BASE_URL}/items/q-${encodeURIComponent(query)}`;
      await page.goto(searchUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });

      // Wait for the main listing container or standard items
      try {
        await page.waitForSelector('li[aria-label="Listing"], li article', { timeout: 10000 });
      } catch (e) {
        this.logger.warn(`OLX: No listings found for "${query}"`);
        return [];
      }

      // Extract Data using robust selectors
      const products = await page.evaluate(() => {
        const items: any[] = [];
        // OLX items are usually list items with an article or specific aria-label
        const cards = document.querySelectorAll('li[aria-label="Listing"], li article, .listing-card');

        cards.forEach((card: any) => {
          try {
            // --- Skip "Buy with Delivery" section ---
            const cardText = card.innerText || '';
            if (cardText.toLowerCase().includes('buy with delivery') ||
              cardText.toLowerCase().includes('delivery') && cardText.toLowerCase().includes('buy')) {
              return; // Skip this card
            }

            // --- Link & Title ---
            const anchor = card.querySelector('a');
            if (!anchor) return;

            let productUrl = anchor.getAttribute('href');
            if (productUrl && !productUrl.startsWith('http')) {
              productUrl = 'https://www.olx.com.pk' + productUrl;
            }

            // Title extraction
            let title = card.querySelector('[aria-label="Title"]')?.textContent ||
              card.querySelector('h2')?.textContent ||
              anchor.getAttribute('title') ||
              card.querySelector('img')?.getAttribute('alt') ||
              'Unknown Listing';

            title = title.trim();

            // --- Price ---
            let currentPrice = 0;
            let priceText = '';
            const textContent = card.innerText || '';

            // Extract price text
            const priceTextMatch = textContent.match(/Rs\.?\s*[\d,.]+\s*(?:Lac)?/i);
            if (priceTextMatch) {
              priceText = priceTextMatch[0].trim();

              // Extract numeric value
              const numericMatch = priceText.match(/[\d,.]+/);
              if (numericMatch) {
                const numericStr = numericMatch[0].replace(/,/g, '');
                if (priceText.toLowerCase().includes('lac')) {
                  currentPrice = parseFloat(numericStr) * 100000;
                } else {
                  currentPrice = parseInt(numericStr);
                }
              }
            }

            // --- Image ---
            const imgEl = card.querySelector('img');
            let image = imgEl?.getAttribute('src') || imgEl?.getAttribute('data-src') || '';

            // --- Location ---
            let location = 'Pakistan';
            const locationEl = card.querySelector('[aria-label="Location"]');
            if (locationEl) {
              location = locationEl.textContent?.trim() || location;
            } else {
              const metaText = card.innerText.split('\n');
              if (metaText.length > 2) {
                const commonCities = ['Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Multan', 'Peshawar'];
                for (const line of metaText) {
                  if (commonCities.some(city => line.includes(city))) {
                    location = line.trim();
                    break;
                  }
                }
              }
            }

            if (title && currentPrice > 0) {
              items.push({
                id: Math.random().toString(36).substr(2, 9),
                title,
                currentPrice,
                originalPrice: undefined,
                discount: 0,
                image,
                marketplace: 'olx',
                productUrl,
                rating: 0,
                reviews: 0,
                inStock: true,
                location: location,
                priceText: priceText
              });
            }
          } catch (err) {
            // Skip broken card
          }
        });

        return items.slice(0, 15);
      });

      return products;

    } catch (error) {
      this.logger.error(`❌ OLX Scraping failed: ${error.message}`);
      return [];
    } finally {
      // ONLY close the page/context, never the browser
      await page.close();
      await context.close();
    }
  }
}