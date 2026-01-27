// Full Production-Ready app.module.ts
// Use this version when PostgreSQL and Redis are available

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DarazService } from './daraz.service';
import { PriceOyeService } from './priceoye.service';
import { TelemartService } from './telemart.service';
import { OlxService } from './olx.service';
import { BrowserService } from './browser.service';
import { HistoryService } from './history.service';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductHistory } from './entities/product-history.entity';
import { AlertsModule } from './alerts/alerts.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    // Setup PostgreSQL Database
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.TYPEORM_HOST ?? 'localhost',
      port: parseInt(process.env.TYPEORM_PORT ?? '5432'),
      username: process.env.TYPEORM_USERNAME ?? 'postgres',
      password: process.env.TYPEORM_PASSWORD ?? 'postgres',
      database: process.env.TYPEORM_DATABASE ?? 'kartowl_db',
      entities: [ProductHistory],
      synchronize: true, // Set to false in production
      logging: true,
    }),
    TypeOrmModule.forFeature([ProductHistory]),
    // Setup Redis Cache
    CacheModule.register({
      isGlobal: true, 
      store: redisStore as any,
      host: process.env.REDIS_HOST ?? 'localhost',
      port: parseInt(process.env.REDIS_PORT ?? '6379'),
      ttl: 3600000, // 1 hour (in milliseconds)
    }),
    AlertsModule,
  ],
  controllers: [AppController],
  providers: [BrowserService, DarazService, PriceOyeService, TelemartService, OlxService, HistoryService],
})
export class AppModule {}