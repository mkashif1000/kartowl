import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductHistory } from './entities/product-history.entity';
import { normalizeUrl } from './utils/url.utils';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(ProductHistory)
    private historyRepository: Repository<ProductHistory>,
  ) {}

  async addPricePoint(rawUrl: string, title: string, price: number, marketplace: string) {
    const cleanUrl = normalizeUrl(rawUrl);

    // Prevent spam: Check if we already saved this URL today
    const existingToday = await this.historyRepository.createQueryBuilder('history')
      .where('history.productUrl = :url', { url: cleanUrl })
      .andWhere('history.scrapedAt > current_date') 
      .getOne();

    if (existingToday) return; 

    const entry = this.historyRepository.create({
      productUrl: cleanUrl, 
      productTitle: title,
      price: price,
      marketplace: marketplace
    });

    return await this.historyRepository.save(entry);
  }

  async getHistory(rawUrl: string) {
    const cleanUrl = normalizeUrl(rawUrl);
    return await this.historyRepository.find({
      where: { productUrl: cleanUrl },
      order: { scrapedAt: 'ASC' }
    });
  }

  // Add this method to HistoryService class
  async getTrendingDeals() {
    // Fetch products with >10% discount, ordered by discount amount
    // We use raw query for speed or QueryBuilder
    return await this.historyRepository.createQueryBuilder('history')
      .select('DISTINCT ON (history.productUrl) history.*') // unique products
      .where('history.price < history.originalPrice') // only discounted
      .orderBy('history.productUrl')
      .addOrderBy('history.scrapedAt', 'DESC') // latest price
      .limit(20)
      .getMany();
  }
}