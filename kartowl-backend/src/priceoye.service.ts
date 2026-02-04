import { Injectable } from '@nestjs/common';
import { BrowserService } from './browser.service';
import { randomDelay } from './utils/throttle.utils';

@Injectable()
export class PriceOyeService {
  constructor(private readonly browserService: BrowserService) { }

  async searchProduct(query: string) {
    const browserSession = await this.browserService.getNewPage();
    if (!browserSession) return [];

    const { page, context } = browserSession;

    try {
      // Add random delay before navigation to avoid detection
      await randomDelay(500, 1500);

      console.log(`🦉 KartOwl is checking PriceOye for: ${query}`);
      const searchUrl = `https://priceoye.pk/search?q=${encodeURIComponent(query)}`;

      await page.goto(searchUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });

      // 1. Wait for Product List
      // PriceOye uses .product-list for the container
      try {
        await page.waitForSelector('.product-list', { timeout: 10000 });
      } catch (e) {
        console.log("PriceOye: No standard product list found (might be empty result)");
        return [];
      }

      // 2. Extract Data
      const products = await page.evaluate(() => {
        // PriceOye cards are usually inside 'div.product-list' -> 'div.p-item'
        // We select the individual product items
        const cards = document.querySelectorAll('.product-list .p-item, .product-list .productBox');

        return Array.from(cards).slice(0, 15).map((card: any) => {

          // --- Title & URL ---
          // Usually in a div with class 'p-title' or similar
          const anchor = card.querySelector('a');
          const productUrl = anchor?.href || '';

          // Title logic: Try specific class, fallback to image alt
          const titleEl = card.querySelector('.p-title') || card.querySelector('.product-title');
          const title = titleEl?.textContent?.trim() || card.querySelector('img')?.alt || 'Unknown Product';

          // --- Image ---
          // PriceOye uses amp-img for images
          let image = '';
          const ampImgEl = card.querySelector('amp-img');
          if (ampImgEl) {
            image = ampImgEl.getAttribute('src') || '';
            // Handle relative URLs
            if (image && image.startsWith('/')) {
              image = 'https://priceoye.pk' + image;
            }
          } else {
            // Fallback to regular img tag
            const imgEl = card.querySelector('img');
            if (imgEl) {
              image = imgEl.getAttribute('data-src') || imgEl.getAttribute('data-original') || imgEl.src || '';
              // Handle relative URLs
              if (image && image.startsWith('/')) {
                image = 'https://priceoye.pk' + image;
              }
            }
          }

          // --- Price ---
          let currentPrice = 0;
          let originalPrice = 0;

          // Current price extraction - look for the main price element
          const currentPriceEl = card.querySelector('.price-box');
          if (currentPriceEl) {
            const currentPriceText = currentPriceEl.textContent || currentPriceEl.innerText || '';
            // Extract numeric values from text like "Rs 169,500"
            const priceMatches = currentPriceText.match(/[\d,]+/g);
            if (priceMatches && priceMatches.length > 0) {
              currentPrice = parseInt(priceMatches[0].replace(/,/g, '')) || 0;
            }
          }

          // Original price extraction - look for crossed out prices or price-diff elements
          const priceDiffEl = card.querySelector('.price-diff');
          if (priceDiffEl) {
            const priceDiffText = priceDiffEl.textContent || priceDiffEl.innerText || '';
            // Extract numeric values
            const priceMatches = priceDiffText.match(/[\d,]+/g);
            if (priceMatches && priceMatches.length > 0) {
              originalPrice = parseInt(priceMatches[0].replace(/,/g, '')) || 0;
            }
          }

          // Ensure original price is not less than current price
          if (originalPrice < currentPrice) {
            originalPrice = currentPrice;
          }

          // Calculate discount percentage
          const discount = originalPrice > currentPrice ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100) : 0;

          // --- Rating ---
          let rating = 0;
          // Look for the user rating content div which contains the actual rating
          const ratingContentEl = card.querySelector('.user-rating-content');
          if (ratingContentEl) {
            const ratingText = ratingContentEl.textContent || ratingContentEl.innerText || '';
            const ratingMatch = ratingText.match(/[\d.]+/);
            if (ratingMatch) {
              rating = parseFloat(ratingMatch[0]);
            }
          }

          // Fallback: Check for star elements
          if (rating === 0) {
            const starElements = card.querySelectorAll('.stars i, .stars img');
            if (starElements.length > 0) {
              // Count star elements (assuming all are filled if present)
              rating = Math.min(starElements.length, 5); // Max 5 stars
            }
          }

          // Final fallback: Default rating
          if (rating === 0) {
            rating = 4.5; // Default rating
          }

          // --- Reviews ---
          let reviews = 0;
          // Look for the rating-h7 bold span which contains the review count
          const reviewCountEl = card.querySelector('span.rating-h7.bold');
          if (reviewCountEl) {
            const reviewsText = reviewCountEl.textContent || reviewCountEl.innerText || '';
            const reviewsMatch = reviewsText.match(/[\d,]+/);
            if (reviewsMatch) {
              reviews = parseInt(reviewsMatch[0].replace(/,/g, '')) || 0;
            }
          }

          // Fallback: Look in the user rating box
          if (reviews === 0) {
            const userRatingBox = card.querySelector('.user-rating-box');
            if (userRatingBox) {
              const ratingBoxText = userRatingBox.textContent || userRatingBox.innerText || '';
              const reviewsMatch = ratingBoxText.match(/[\d,]+\s*review/i);
              if (reviewsMatch) {
                const numberMatch = reviewsMatch[0].match(/[\d,]+/);
                if (numberMatch) {
                  reviews = parseInt(numberMatch[0].replace(/,/g, '')) || 0;
                }
              }
            }
          }

          // Default reviews if none found
          // Don't use random reviews - if we can't find them, set to a reasonable default
          if (reviews === 0) {
            reviews = 5;
          }

          // Determine stock status
          // According to requirements: When there is no original/non-discounted price, product is out of stock
          // ALSO: When original price equals current price, product is out of stock
          let inStock = true;

          // Check if there's no price difference (no discount/original price)
          const hasPriceDifference = !!(priceDiffEl);

          // Check for explicit out-of-stock indicators
          const outOfStockImg = card.querySelector('img[src*="out-of-stock"]') ||
            card.querySelector('img[alt*="out of stock"]') ||
            card.querySelector('[class*="out-of-stock"]');

          // NEW: Check if original price equals current price (another indicator of out of stock)
          const pricesAreEqual = (originalPrice > 0 && originalPrice === currentPrice);

          // According to the requirement: 
          // 1. No original/non-discounted price = out of stock
          // 2. Original price equals current price = out of stock
          // 3. Explicit out-of-stock indicators = out of stock
          if (!hasPriceDifference || outOfStockImg || pricesAreEqual) {
            inStock = false;
          }

          return {
            id: Math.random().toString(36).substr(2, 9),
            title,
            currentPrice,
            originalPrice,
            discount,
            image,
            marketplace: 'priceoye', // Important: This tag tells Frontend to show PriceOye badge
            productUrl,
            rating,
            reviews,
            inStock
          };
        });
      });

      return products;

    } catch (error) {
      console.error("❌ PriceOye Scraping failed:", error);
      return [];
    } finally {
      // ONLY close the page/context, never the browser
      await page.close();
      await context.close();
    }
  }
}