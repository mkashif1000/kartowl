# KartOwl - Comprehensive E-commerce Price Tracker

## Overview
KartOwl is a scalable e-commerce price tracking application that aggregates product prices from multiple Pakistani marketplaces (Daraz, PriceOye, Telemart, OLX).

## Features Implemented
- ✅ **Resource Efficient Browser Management**: Singleton browser instance with reusable contexts
- ✅ **Caching Layer**: Redis-based caching for improved performance
- ✅ **Price History Tracking**: PostgreSQL database for historical price data
- ✅ **Multi-marketplace Scraping**: Supports Daraz, PriceOye, Telemart, and OLX
- ✅ **Docker Ready**: Production-ready deployment configuration

## Prerequisites

### Option 1: Docker (Recommended)
- [Docker Desktop for Windows](https://www.docker.com/products/docker-desktop/)
- Docker Compose

### Option 2: Manual Installation
- Node.js v16+ 
- PostgreSQL 12+
- Redis server
- Playwright-compatible browser

## Quick Start with Docker

1. **Start Database Services**
```bash
cd KartOwlV1
docker-compose up -d redis postgres
```

2. **Navigate to Backend and Install Dependencies**
```bash
cd kartowl-backend
npm install
```

3. **Start the Application**
```bash
npm run start:dev
```

4. **Test the API**
```bash
# Search for products
curl http://localhost:3002/api/search?q=iPhone

# Get price history for a product URL
curl http://localhost:3002/api/history?url=https://example-product-url
```

## Manual Setup (Without Docker)

### 1. Install PostgreSQL
- Download from https://www.postgresql.org/download/windows/
- During installation, set username: `postgres`, password: `postgres`
- Create database: `kartowl_db`

### 2. Install Redis
- Download from https://github.com/redis-windows/redis-windows
- Run Redis server: `redis-server.exe`

### 3. Configure Environment
Update `.env` file in `kartowl-backend`:
```
TYPEORM_CONNECTION=postgres
TYPEORM_HOST=localhost
TYPEORM_PORT=5432
TYPEORM_USERNAME=postgres
TYPEORM_PASSWORD=postgres
TYPEORM_DATABASE=kartowl_db
TYPEORM_ENTITIES=src/entities/**/*.entity.ts
TYPEORM_SYNCHRONIZE=true
TYPEORM_LOGGING=true
REDIS_HOST=localhost
REDIS_PORT=6379
```

### 4. Start the Application
```bash
cd kartowl-backend
npm install
npm run start:dev
```

## API Endpoints

- `GET /api/search?q={query}` - Search products across all marketplaces
- `GET /api/history?url={productUrl}` - Get price history for a product

## Architecture Overview

### Core Components
- **BrowserService**: Singleton browser manager for efficient scraping
- **HistoryService**: Handles price history storage and retrieval
- **Cache Layer**: Redis caching for improved performance
- **Database**: PostgreSQL for persistent price history

### Scraping Services
- **DarazService**: Scraper for Daraz.pk
- **PriceOyeService**: Scraper for PriceOye.pk
- **TelemartService**: Scraper for Telemart.pk
- **OlxService**: Scraper for OLX

## Running Tests

```bash
cd kartowl-backend
npm run test
npm run test:e2e
```

## Production Deployment

1. Build the application:
```bash
npm run build
```

2. Use the provided Dockerfile for containerized deployment:
```bash
docker build -t kartowl-backend .
docker run -p 3000:3000 kartowl-backend
```

## Troubleshooting

### Common Issues:

1. **Database Connection Issues**:
   - Ensure PostgreSQL is running and credentials in `.env` are correct
   - Check that the `kartowl_db` database exists

2. **Redis Connection Issues**:
   - Verify Redis server is running on configured port
   - Check firewall settings

3. **Playwright Browser Issues**:
   - Run: `npx playwright install`
   - Ensure system has necessary browser dependencies

### Port Conflicts:
- Default API runs on port 3002 (configured in `main.ts`)
- Update `main.ts` if you need a different port

## Performance Considerations

- The singleton browser approach significantly reduces resource consumption
- Redis caching prevents repeated scraping of popular searches
- PostgreSQL stores historical price data for trend analysis
- Rate limiting should be implemented based on marketplace policies

## Next Steps

1. Implement rate limiting and request throttling
2. Add monitoring and logging infrastructure
3. Set up automated testing pipeline
4. Configure production-grade security measures
5. Implement frontend integration for price history visualization