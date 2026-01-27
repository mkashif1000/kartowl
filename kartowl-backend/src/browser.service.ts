import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';

@Injectable()
export class BrowserService implements OnModuleInit, OnModuleDestroy {
  private browser: any = null;
  private browserAvailable: boolean = false;
  private readonly logger = new Logger(BrowserService.name);

  async onModuleInit() {
    try {
      // Dynamically import playwright to handle cases where it's not available
      const { chromium } = await import('playwright-extra');
      const stealthPlugin = (await import('puppeteer-extra-plugin-stealth')).default;

      chromium.use(stealthPlugin());

      this.logger.log('🕵️ Launching Stealth Singleton Browser...');
      this.browser = await chromium.launch({
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-blink-features=AutomationControlled'
        ]
      });
      this.browserAvailable = true;
      this.logger.log('✅ Browser launched successfully');
    } catch (error) {
      this.browserAvailable = false;
      this.logger.warn('⚠️ Playwright browser not available - web scraping features disabled');
      this.logger.warn(`Reason: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async onModuleDestroy() {
    if (this.browser) {
      this.logger.log('🛑 Closing Browser Instance...');
      await this.browser.close();
    }
  }

  /**
   * Check if browser is available for scraping
   */
  isBrowserAvailable(): boolean {
    return this.browserAvailable;
  }

  /**
   * Creates a lightweight "Incognito Page" reusing the main browser.
   * Returns null if browser is not available.
   */
  async getNewPage() {
    if (!this.browserAvailable || !this.browser) {
      this.logger.warn('Browser not available - cannot create new page');
      return null;
    }

    try {
      if (!this.browser) await this.onModuleInit();

      const context = await this.browser.newContext({
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        viewport: { width: 1366, height: 768 },
      });

      const page = await context.newPage();
      return { page, context };
    } catch (error) {
      this.logger.error('Failed to create new page', error);
      return null;
    }
  }
}