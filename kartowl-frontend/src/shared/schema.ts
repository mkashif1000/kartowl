export type Marketplace = 'daraz' | 'telemart' | 'priceoye' | 'olx';

export type Product = {
  id: string;
  title: string;
  image: string;
  marketplace: Marketplace;
  currentPrice: number;
  originalPrice?: number;
  discount?: number;
  rating?: number;
  reviews?: number;
  sold?: string;
  inStock: boolean;
  productUrl: string;
  location?: string; // <--- Added Location Field for Reselling Items
  priceText?: string; // <--- Added Price Text Field for OLX items
}

export type PriceHistory = {
  date: string;
  price: number;
  marketplace: Marketplace;
};

export type FakeSaleStatus = 'genuine' | 'fair' | 'suspicious';

export type ProductDetail = Product & {
  description?: string;
  priceHistory: PriceHistory[];
  fakeSaleStatus: FakeSaleStatus;
  averagePrice: number;
  lowestPrice: number;
  highestPrice: number;
};

// NEW: Per-marketplace status tracking
export type MarketplaceStatus = {
  success: boolean;
  count: number;
  error?: string;
};

export type SearchResponse = {
  success: boolean;
  count: number;
  marketplaceStatus: Record<Marketplace, MarketplaceStatus>;
  data: Product[];
};

