// src/app.controller.ts
import { Controller, Get, Query, Inject, Post, Body, UseInterceptors } from '@nestjs/common';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { DarazService } from './daraz.service';
import { PriceOyeService } from './priceoye.service';
import { TelemartService } from './telemart.service';
import { OlxService } from './olx.service';
import { HistoryService } from './history.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { AlertsService } from './alerts/alerts.service';

@Controller('api')
export class AppController {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly darazService: DarazService,
    private readonly priceOyeService: PriceOyeService,
    private readonly telemartService: TelemartService,
    private readonly olxService: OlxService,
    private readonly historyService: HistoryService,
    private readonly alertsService: AlertsService
  ) {}

  @Get('search')
  async search(@Query('q') query: string) {
    if (!query) return { error: 'Query is required' };
    
    const cacheKey = `search:${query.toLowerCase().trim()}`;

    // 1. Check Cache
    const cachedData = await this.cacheManager.get(cacheKey);
    if (cachedData) {
      console.log(`⚡ Serving from cache: ${query}`);
      return cachedData;
    }

    console.log(`🚀 Scrapers engaged: ${query}`);

    // 2. Real Execution (If not cached)
    const [daraz, priceOye, telemart, olx] = await Promise.all([
      this.darazService.searchProduct(query),
      this.priceOyeService.searchProduct(query),
      this.telemartService.searchProduct(query),
      this.olxService.searchProduct(query)
    ]);

    // ❌ OLD: const allProducts = [...daraz, ...priceOye, ...telemart, ...olx];
    
    // ✅ NEW: Mix them evenly
    const allProducts = interleaveArrays(daraz, priceOye, telemart, olx);
    
    const results = {
      success: true,
      count: allProducts.length,
      data: allProducts
    };

    // 3. Save to Cache
    await this.cacheManager.set(cacheKey, results); // Uses default TTL from module

    // FIRE AND FORGET: Save history in background
    allProducts.forEach((product: any) => {
        this.historyService.addPricePoint(
            product.productUrl,
            product.title,
            product.currentPrice,
            product.marketplace
        ).catch(err => console.error("History save failed", err));
    });

    return {
      success: true,
      count: allProducts.length,
      data: allProducts
    };
  }

  @Get('history')
  async getPriceHistory(@Query('url') productUrl: string) {
    if (!productUrl) return { error: 'Product URL is required' };
    
    const history = await this.historyService.getHistory(productUrl);
    return {
      success: true,
      count: history.length,
      data: history
    };
  }

  @Get('trending')
  @UseInterceptors(CacheInterceptor) // <--- Automatically caches the response
  @CacheTTL(3600000) // <--- Cache for 1 hour (in ms)
  async getTrending() {
    const deals = await this.historyService.getTrendingDeals();
    // If DB is empty, fallback to empty array (Frontend will handle it)
    return deals.length > 0 ? deals : []; 
  }

  @Post('alerts')
  async createAlert(@Body() body: any) {
    console.log("🔔 New Alert Requested:", body);
    
    // Send confirmation email
    await this.alertsService.sendConfirmation(body.email, body.productUrl, body.targetPrice);
    
    return { success: true };
  }
}

// Add this helper function at the bottom of the file (outside the class)
function interleaveArrays<T>(...arrays: T[][]): T[] {
  const maxLength = Math.max(...arrays.map(arr => arr.length));
  const result: T[] = [];
  for (let i = 0; i < maxLength; i++) {
    for (const arr of arrays) {
      if (i < arr.length) result.push(arr[i]);
    }
  }
  return result;
}




