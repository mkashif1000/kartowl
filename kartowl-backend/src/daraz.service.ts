import { Injectable } from '@nestjs/common';
import { BrowserService } from './browser.service';

@Injectable()
export class DarazService {
  constructor(private readonly browserService: BrowserService) {}

  async searchProduct(query: string) {
    // ✅ NEW: Get lightweight page from singleton browser
    const { page, context } = await this.browserService.getNewPage();

    try {
      console.log(`🦉 KartOwl is hunting for: ${query}`);
      const searchUrl = `https://www.daraz.pk/catalog/?q=${encodeURIComponent(query)}`;
      await page.goto(searchUrl, { waitUntil: 'domcontentloaded', timeout: 45000 });

      // 1. ENHANCED SCROLL FIX: Force images to load with multiple scrolls and waits
      await page.evaluate(async () => {
        // Scroll deeper and slower to catch more lazy items
        window.scrollBy(0, 800);
        await new Promise(r => setTimeout(r, 1000));
        window.scrollBy(0, 800);
        await new Promise(r => setTimeout(r, 1000));
        // Additional scroll for first search reliability
        window.scrollBy(0, 800);
        await new Promise(r => setTimeout(r, 1000));
      });
      
      // 2. EXTRA WAIT FOR IMAGES TO LOAD
      await page.waitForTimeout(2000);

      await page.waitForSelector('[data-qa-locator="product-item"]', { timeout: 15000 });

      const products = await page.evaluate(() => {
        const cards = document.querySelectorAll('[data-qa-locator="product-item"]');
        
        return Array.from(cards).slice(0, 20).map((card: any) => {
          const cardText = card.innerText; // Grab all text for Regex searching

          // --- ENHANCED IMAGE FIX ---
          // PRIORITY CHANGE: Check lazy attributes FIRST, then src.
          const imgEl = card.querySelector('img');
          let image = imgEl?.getAttribute('data-ks-lazyload') || 
                      imgEl?.getAttribute('data-src') || 
                      imgEl?.getAttribute('src') || '';
          
          // Retry mechanism for missing images on first search
          // Note: We can't use await inside page.evaluate, so we'll rely on the extra wait time before
          
          if (image) {
             image = image.replace(/_\d+x\d+.*$/, '').replace(/_.webp$/, '');
          }

          // --- PRICE FIX (Enhanced Strategy) ---
          // Instead of fragile classes, we'll extract prices directly from HTML elements
          let currentPrice = 0;
          let originalPrice = 0;

          // Find Current Price (usually in a span that's not inside <del>)
          const priceElements = card.querySelectorAll('span');
          for (const el of priceElements) {
            // Skip elements inside <del> tags (those are original prices)
            if (el.closest('del')) continue;
            
            const text = el.textContent || el.innerText || '';
            if (text.includes('Rs.') && /[\d,]+/.test(text)) {
              currentPrice = parseInt(text.replace(/[^\d]/g, '')) || 0;
              if (currentPrice > 0) break;
            }
          }

          // Find Original Price (inside <del> tags)
          const delEl = card.querySelector('del');
          if (delEl) {
            const delText = delEl.textContent || delEl.innerText || '';
            if (delText.includes('Rs.')) {
              originalPrice = parseInt(delText.replace(/[^\d]/g, '')) || 0;
            }
          }

          // Fallback: If original price not found or is less than current, set to current
          if (!originalPrice || originalPrice < currentPrice) {
            originalPrice = currentPrice;
          }

          // --- REVIEW FIX (Comma Logic) ---
          const reviewsMatch = cardText.match(/\((\d+[\d,]*)\)/); // Capture digits AND commas
          let reviews = 0;
          if (reviewsMatch) {
             // Remove commas BEFORE parsing. "1,234" -> "1234" -> 1234
             reviews = parseInt(reviewsMatch[1].replace(/,/g, ''));
          }

          // --- METADATA ---
          const titleEl = card.querySelector('a[title]');
          let productUrl = titleEl?.getAttribute('href') || '';
          if (productUrl.startsWith('//')) productUrl = `https:${productUrl}`;
          
          const soldMatch = cardText.match(/(\d+[\d\.]*[kK]?)\s+Sold/i);
          
          // Rating (Star Width Logic) - Keep stars but remove numeric rating
          let hasRating = false;
          const styleElements = card.querySelectorAll('[style*="width"]');
          for (const el of styleElements) {
             const widthStyle = el.getAttribute('style');
             if (widthStyle && widthStyle.includes('%')) {
                const num = parseInt(widthStyle.match(/(\d+)%/)?.[1] || '0');
                if (num > 0 && num <= 100) {
                   hasRating = true;
                   break;
                }
             }
          }

          return {
            id: Math.random().toString(36).substr(2, 9),
            title: titleEl?.getAttribute('title') || 'Unknown Product',
            currentPrice,
            originalPrice,
            discount: originalPrice > currentPrice ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100) : 0,
            image,
            marketplace: 'daraz',
            productUrl,
            hasRating: hasRating, 
            reviews,
            sold: soldMatch ? soldMatch[0] : '0 Sold',
            inStock: true
          };
        });
      });

      return products;

    } catch (error) {
      console.error("❌ Scraping failed:", error);
      return [];
    } finally {
      // ONLY close the page/context, never the browser
      await page.close();
      await context.close();
    }
  }
}