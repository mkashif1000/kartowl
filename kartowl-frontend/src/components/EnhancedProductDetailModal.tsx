import { ProductDetail } from '@shared/schema';
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CheckCircle2, Clock, Share2, ExternalLink, TrendingUp } from 'lucide-react';
import PriceHistoryChart from './PriceHistoryChart';
import PriceAlertDialog from './PriceAlertDialog';

interface EnhancedProductDetailModalProps {
  product: ProductDetail | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function EnhancedProductDetailModal({ product, open, onOpenChange }: EnhancedProductDetailModalProps) {
  if (!product) return null;

  const discountAmount = product.originalPrice 
    ? product.originalPrice - product.currentPrice 
    : 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl p-0 overflow-hidden bg-white dark:bg-slate-950 border-none shadow-2xl">
        <div className="flex flex-col md:flex-row h-[90vh] md:h-[80vh]">
          
          {/* COLUMN 1: Visuals & History (Scrollable) */}
          <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-900/50 p-6 md:p-10 scrollbar-hide">
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 p-8 mb-8 flex items-center justify-center">
              <img 
                src={product.image} 
                alt={product.title}
                className="max-h-[300px] object-contain mix-blend-multiply dark:mix-blend-normal"
              />
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 shadow-sm">
                <div className="text-slate-500 text-xs mb-1">Lowest Price (30d)</div>
                <div className="font-mono font-bold text-lg text-slate-900 dark:text-white">
                  ₨{product.lowestPrice.toLocaleString()}
                </div>
              </div>
              <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 shadow-sm">
                <div className="text-slate-500 text-xs mb-1">Real Sale Status</div>
                <Badge variant={product.fakeSaleStatus === 'genuine' ? 'default' : 'destructive'} className="mt-1">
                  {product.fakeSaleStatus.toUpperCase()}
                </Badge>
              </div>
            </div>

            <div className="prose dark:prose-invert max-w-none">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">Analysis</h3>
              <PriceHistoryChart 
                priceHistory={product.priceHistory}
                currentPrice={product.currentPrice}
                averagePrice={product.averagePrice}
                lowestPrice={product.lowestPrice}
                highestPrice={product.highestPrice}
              />
              <p className="text-sm text-slate-600 leading-relaxed mt-6">
                {product.description}
              </p>
            </div>
          </div>

          {/* COLUMN 2: The "Buy Box" (Sticky/Fixed on Desktop) */}
          <div className="w-full md:w-[400px] bg-white dark:bg-slate-950 p-6 md:p-8 border-l border-slate-100 dark:border-slate-800 flex flex-col z-20 shadow-[-20px_0_40px_-10px_rgba(0,0,0,0.05)]">
            
            {/* Header Info */}
            <div className="mb-auto">
              <div className="flex items-center justify-between mb-4">
                <Badge variant="outline" className="border-slate-200 text-slate-500">
                  {product.marketplace}
                </Badge>
                <div className="flex gap-2">
                  <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-slate-900 dark:text-white leading-tight mb-2">
                {product.title}
              </h2>
              
              {/* Rating Snippet */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex text-amber-400">★★★★☆</div>
                <span className="text-sm text-slate-400">({product.reviews} verified reviews)</span>
              </div>
            </div>

            {/* Pricing & CTA - The "Money" Area */}
            <div className="space-y-6 mt-6">
              <Separator />
              
              <div>
                <div className="flex items-end gap-3 mb-1">
                  <span className="text-4xl font-extrabold text-brand-purple tracking-tight">
                    {product.marketplace === 'olx' && product.priceText
                      ? product.priceText.replace(/^Rs\.?\s*/, '₨') // Use captured price text, replace Rs with ₨
                      : `₨${product.currentPrice.toLocaleString()}`
                    }
                  </span>
                  {/* Only show original price for non-OLX items */}
                  {product.marketplace !== 'olx' && product.originalPrice && (
                    <span className="text-lg text-slate-400 line-through mb-1">
                      ₨{product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
                {product.discount && (
                  <span className="text-green-600 font-medium text-sm flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    Lowest price in 30 days
                  </span>
                )}
              </div>

              <div className="space-y-3">
                {/* Add Alert Button Here */}
                <PriceAlertDialog 
                   productUrl={product.productUrl} 
                   currentPrice={product.currentPrice} 
                />

                <Button 
                  className="w-full h-14 text-lg bg-slate-900 hover:bg-brand-purple text-white shadow-xl shadow-brand-purple/20 transition-all duration-300 rounded-xl"
                  onClick={() => window.open(product.productUrl, '_blank')}
                >
                  Go to Store <ExternalLink className="ml-2 w-5 h-5" />
                </Button>
                
                <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
                  <CheckCircle2 className="w-3 h-3 text-green-500" />
                  <span>Stock Updated: <span className="font-medium text-slate-600">Just now</span></span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
