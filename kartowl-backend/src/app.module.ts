// Full Production-Ready app.module.ts
// Use this version when PostgreSQL and Redis are available

import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { DarazService } from './daraz.service';
import { PriceOyeService } from './priceoye.service';
import { TelemartService } from './telemart.service';
import { OlxService } from './olx.service';
import { BrowserService } from './browser.service';
import { HistoryService } from './history.service';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductHistory } from './entities/product-history.entity';
import { AlertsModule } from './alerts/alerts.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';

@Module({
  imports: [
    ConfigModule.forRoot(),
    // Rate Limiting: 5 requests per 60 seconds per IP
    ThrottlerModule.forRoot([{
      name: 'default',
      ttl: 60000, // Time window in ms (60 seconds)
      limit: 5,   // Max requests per window
    }]),
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
    // Setup Cache (Redis if available, else In-Memory)
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const redisHost = configService.get<string>('REDIS_HOST');
        if (redisHost) {
          // Dynamic import to avoid build issues if dep is missing, though it's in package.json
          const store = await import('cache-manager-redis-store');
          return {
            store: store.redisStore,
            host: redisHost,
            port: configService.get<number>('REDIS_PORT') || 6379,
            password: configService.get<string>('REDIS_PASSWORD'),
            username: configService.get<string>('REDIS_USERNAME'), // For some providers like Upstash/Railway
            no_ready_check: true, // Often needed for cloud redis
            ttl: 3600, // 1 hour (in seconds for Redis Store v2, check version compat)
          };
        }
        return {
          ttl: 3600000, // 1 hour (in ms for memory store)
        };
      },
      inject: [ConfigService],
    }),
    AlertsModule,
  ],
  controllers: [AppController],
  providers: [
    BrowserService,
    DarazService,
    PriceOyeService,
    TelemartService,
    OlxService,
    HistoryService,
    // Apply rate limiting globally
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule { }