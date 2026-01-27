import { Product } from '@shared/schema';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Eye, MapPin } from 'lucide-react'; // Added MapPin
import { motion } from 'framer-motion';

export default function ProfessionalProductCard({ product, onViewDetails }: { product: Product, onViewDetails?: (id: string) => void }) {
  
  // Helper to determine badge color
  const getBadgeColor = (m: string) => {
    switch(m) {
      case 'daraz': return 'bg-orange-500 text-white';
      case 'olx': return 'bg-teal-600 text-white'; // OLX Color
      case 'priceoye': return 'bg-blue-600 text-white';
      case 'telemart': return 'bg-red-600 text-white';
      default: return 'bg-slate-800 text-white';
    }
  };

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      onClick={() => onViewDetails && onViewDetails(product.id)}
      className="group relative bg-white dark:bg-slate-900 rounded-2xl shadow-sm hover:shadow-glow transition-all duration-300 border border-slate-100 dark:border-slate-800 overflow-hidden flex flex-col h-full cursor-pointer"
    >
      <div className="absolute top-3 left-3 z-20 flex flex-col gap-2">
        <Badge variant="secondary" className={`${getBadgeColor(product.marketplace)} font-bold shadow-sm`}>
          {product.marketplace}
        </Badge>
        
        {/* NEW: Location Badge for OLX */}
        {product.location && (
          <Badge variant="outline" className="bg-white/90 backdrop-blur text-xs text-slate-700 border-slate-200">
             <MapPin className="w-3 h-3 mr-1" /> {product.location}
          </Badge>
        )}
      </div>

      <div className="relative aspect-[4/3] overflow-hidden bg-white p-6 flex items-center justify-center">
        <img 
          src={product.image} 
          alt={product.title}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
        />
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
             <Button size="sm" className="rounded-full bg-white text-black shadow-lg">
                <Eye className="w-4 h-4 mr-2" /> Quick View
             </Button>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1 gap-2">
        <div className="flex items-center gap-1 text-xs font-medium text-slate-500">
          {/* Only show Reseller Listing for OLX items, others show ratings or nothing */}
          {product.marketplace === 'olx' ? (
            <span className="text-slate-400 italic">Reseller Listing</span>
          ) : product.rating ? (
            <>
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
              <span className="text-slate-300">•</span>
              <span>{product.reviews} reviews</span>
            </>
          ) : null}
          
          {product.sold && (
            <>
              <span className="text-slate-300">•</span>
              <span>{product.sold} sold</span>
            </>
          )}
        </div>

        <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm leading-tight line-clamp-2 min-h-[2.5rem]">
          {product.title}
        </h3>

        <div className="mt-auto pt-3 flex items-end justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-extrabold text-brand-purple">
                {product.marketplace === 'olx' && product.priceText
                  ? product.priceText.replace(/^Rs\.?\s*/, '₨') // Use captured price text, replace Rs with ₨
                  : `₨${product.currentPrice.toLocaleString()}`
                }
              </span>
              {/* Only show original price for non-OLX items with discounts */}
              {product.marketplace !== 'olx' && product.originalPrice && product.originalPrice > product.currentPrice && (
                <span className="text-xs text-slate-400 line-through decoration-slate-400/50">
                  ₨{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
          </div>
          
          {/* ISSUE #2 FIX: Removed ShoppingCart Button */}
        </div>
      </div>
    </motion.div>
  );
}