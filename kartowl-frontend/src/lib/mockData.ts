import { Product, ProductDetail, PriceHistory, Marketplace } from '@/shared/schema';
import headphonesImg from '@assets/generated_images/Wireless_bluetooth_headphones_product_2396b4bd.png';
import smartphoneImg from '@assets/generated_images/Modern_smartphone_product_photo_d774d4f7.png';
import laptopImg from '@assets/generated_images/Laptop_computer_product_image_82406f59.png';
import smartwatchImg from '@assets/generated_images/Smartwatch_product_photo_75506046.png';
import cameraImg from '@assets/generated_images/Digital_camera_product_image_7009cf35.png';
import shoesImg from '@assets/generated_images/Athletic_running_shoes_product_ed0b6a24.png';

//todo: remove mock functionality

const generatePriceHistory = (basePrice: number, marketplace: Marketplace): PriceHistory[] => {
  const history: PriceHistory[] = [];
  const now = new Date();

  for (let i = 90; i >= 0; i -= 3) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const variance = (Math.random() - 0.5) * 0.2;
    const price = Math.round(basePrice * (1 + variance));
    history.push({
      date: date.toISOString().split('T')[0],
      price,
      marketplace
    });
  }

  return history;
};

export const mockProducts: Product[] = [
  {
    id: '1',
    title: 'Premium Wireless Bluetooth Headphones - Noise Cancelling',
    image: headphonesImg,
    marketplace: 'daraz',
    currentPrice: 12999,
    originalPrice: 18999,
    discount: 32,
    rating: 4.5,
    reviews: 234,
    inStock: true,
    productUrl: '#'
  },
  {
    id: '2',
    title: 'Premium Wireless Bluetooth Headphones - Noise Cancelling',
    image: headphonesImg,
    marketplace: 'priceoye',
    currentPrice: 11499,
    originalPrice: 16999,
    discount: 32,
    rating: 4.3,
    reviews: 156,
    inStock: true,
    productUrl: '#'
  },
  {
    id: '3',
    title: 'Latest Smartphone 5G - 128GB Storage',
    image: smartphoneImg,
    marketplace: 'telemart',
    currentPrice: 89999,
    originalPrice: 109999,
    discount: 18,
    rating: 4.7,
    reviews: 567,
    inStock: true,
    productUrl: '#'
  },
  {
    id: '4',
    title: 'Latest Smartphone 5G - 128GB Storage',
    image: smartphoneImg,
    marketplace: 'daraz',
    currentPrice: 92999,
    originalPrice: 99999,
    discount: 7,
    rating: 4.6,
    reviews: 423,
    inStock: true,
    productUrl: '#'
  },
  {
    id: '5',
    title: 'Professional Laptop 15.6" - Intel i7, 16GB RAM',
    image: laptopImg,
    marketplace: 'priceoye',
    currentPrice: 145000,
    originalPrice: 165000,
    discount: 12,
    rating: 4.8,
    reviews: 189,
    inStock: true,
    productUrl: '#'
  },
  {
    id: '6',
    title: 'Professional Laptop 15.6" - Intel i7, 16GB RAM',
    image: laptopImg,
    marketplace: 'olx',
    currentPrice: 138000,
    originalPrice: 155000,
    discount: 11,
    rating: 4.4,
    reviews: 92,
    inStock: true,
    productUrl: '#'
  },
  {
    id: '7',
    title: 'Smartwatch Fitness Tracker - Heart Rate Monitor',
    image: smartwatchImg,
    marketplace: 'olx',
    currentPrice: 5999,
    originalPrice: 8999,
    discount: 33,
    rating: 4.2,
    reviews: 678,
    inStock: true,
    productUrl: '#'
  },
  {
    id: '8',
    title: 'Smartwatch Fitness Tracker - Heart Rate Monitor',
    image: smartwatchImg,
    marketplace: 'daraz',
    currentPrice: 6499,
    originalPrice: 9499,
    discount: 32,
    rating: 4.1,
    reviews: 445,
    inStock: true,
    productUrl: '#'
  },
  {
    id: '9',
    title: 'Professional DSLR Camera - 24MP, 4K Video',
    image: cameraImg,
    marketplace: 'telemart',
    currentPrice: 125000,
    originalPrice: 145000,
    discount: 14,
    rating: 4.9,
    reviews: 87,
    inStock: true,
    productUrl: '#'
  },
  {
    id: '10',
    title: 'Professional DSLR Camera - 24MP, 4K Video',
    image: cameraImg,
    marketplace: 'priceoye',
    currentPrice: 129000,
    originalPrice: 149000,
    discount: 13,
    rating: 4.7,
    reviews: 64,
    inStock: false,
    productUrl: '#'
  },
  {
    id: '11',
    title: 'Running Shoes - Lightweight Athletic Footwear',
    image: shoesImg,
    marketplace: 'daraz',
    currentPrice: 7999,
    originalPrice: 12999,
    discount: 38,
    rating: 4.3,
    reviews: 892,
    inStock: true,
    productUrl: '#'
  },
  {
    id: '12',
    title: 'Running Shoes - Lightweight Athletic Footwear',
    image: shoesImg,
    marketplace: 'telemart',
    currentPrice: 6499,
    originalPrice: 9999,
    discount: 35,
    rating: 4.0,
    reviews: 534,
    inStock: true,
    productUrl: '#'
  }
];

export const getProductDetail = (id: string): ProductDetail | undefined => {
  const product = mockProducts.find(p => p.id === id);
  if (!product) return undefined;

  const priceHistory = generatePriceHistory(product.currentPrice, product.marketplace);
  const prices = priceHistory.map(h => h.price);
  const averagePrice = Math.round(prices.reduce((a, b) => a + b, 0) / prices.length);
  const lowestPrice = Math.min(...prices);
  const highestPrice = Math.max(...prices);

  let fakeSaleStatus: 'genuine' | 'fair' | 'suspicious' = 'fair';
  if (product.currentPrice < averagePrice * 0.9) {
    fakeSaleStatus = 'genuine';
  } else if (product.originalPrice && product.originalPrice > highestPrice * 1.15) {
    fakeSaleStatus = 'suspicious';
  }

  return {
    ...product,
    description: `High-quality ${product.title.toLowerCase()} with excellent features and great value for money. Perfect for everyday use.`,
    priceHistory,
    fakeSaleStatus,
    averagePrice,
    lowestPrice,
    highestPrice
  };
};
