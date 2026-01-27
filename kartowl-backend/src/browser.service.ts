import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { chromium } from 'playwright-extra'; // CHANGED: Import from extra
import stealthPlugin from 'puppeteer-extra-plugin-stealth'; // NEW

// Apply stealth plugin
chromium.use(stealthPlugin());

@Injectable()
export class BrowserService implements OnModuleInit, OnModuleDestroy {
  private browser: any; // Type is 'any' because 'playwright-extra' types are loose
  private readonly logger = new Logger(BrowserService.name);

  async onModuleInit() {
    this.logger.log('🕵️ Launching Stealth Singleton Browser...');
    this.browser = await chromium.launch({
      headless: true,
      args: [
        '--no-sandbox', 
        '--disable-setuid-sandbox',
        '--disable-blink-features=AutomationControlled' // Critical for stealth
      ]
    });
  }

  async onModuleDestroy() {
    this.logger.log('🛑 Closing Browser Instance...');
    if (this.browser) await this.browser.close();
  }

  /**
   * Creates a lightweight "Incognito Page" reusing the main browser.
   * This is 100x faster than launching a new browser.
   */
  async getNewPage() {
    if (!this.browser) await this.onModuleInit();
    
    // Create a new context (like a fresh profile)
    const context = await this.browser.newContext({
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      viewport: { width: 1366, height: 768 },
    });

    const page = await context.newPage();
    
    // Auto-close context when done to prevent memory leaks
    // You must manually close the page in your scraper, 
    // but this ensures the context (cookies/cache) is cleaned up.
    return { page, context };
  }
}