import { Search, TrendingUp, ShieldCheck, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Product } from '@shared/schema';

interface ModernHeroProps {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  onSearch?: () => void;
  featuredDeal?: Product | null;
  isLoading?: boolean;
}

export default function ModernHero({ searchQuery = '', onSearchChange, onSearch, featuredDeal, isLoading }: ModernHeroProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.();
  };

  return (
    <section className="relative overflow-hidden pt-20 pb-32 lg:pt-32 lg:pb-40">
      {/* Background Gradients */}
      <div className="absolute top-0 -left-4 w-96 h-96 bg-brand-purple/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
      <div className="absolute top-0 -right-4 w-96 h-96 bg-brand-teal/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left Column: Content */}
          <div className="flex-1 text-center lg:text-left space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge variant="outline" className="px-4 py-1 border-brand-purple/30 text-brand-purple bg-brand-purple/5 mb-6 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5 mr-2" />
                Trusted by 50,000+ Pakistani Shoppers
              </Badge>
              
              <h1 className="text-4xl lg:text-7xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
                Stop Overpaying. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-teal">
                  Start Karting.
                </span>
              </h1>
              
              <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                KartOwl scans Daraz, PriceOye, and AliExpress instantly. We track price history so you never fall for a fake sale again.
              </p>
            </motion.div>

            {/* Search Bar - Floating Glass Effect */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="p-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 max-w-xl mx-auto lg:mx-0 flex gap-2"
            >
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <Input 
                  className="pl-12 h-14 bg-transparent border-none text-lg placeholder:text-slate-400 focus-visible:ring-0"
                  placeholder="Paste a link or search product..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange?.(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && onSearch?.()}
                />
              </div>
              <Button 
                size="lg" 
                onClick={onSearch}
                className="h-14 px-8 rounded-xl bg-brand-purple hover:bg-brand-purple/90 text-white shadow-lg shadow-brand-purple/25 text-lg font-medium"
              >
                Search
              </Button>
            </motion.div>

            {/* Quick Categories */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 text-sm text-slate-500">
              <span className="mr-2">Trending:</span>
              {['Infinix Note 30', 'Airpods Pro', 'Gaming Laptop'].map(tag => (
                <button key={tag} className="hover:text-brand-purple underline decoration-dotted transition-colors">
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: DYNAMIC PRICE DROP CARD */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}
            className="flex-1 relative hidden lg:block"
          >
            <div className="relative z-10 bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] border border-slate-100 dark:border-slate-800 transform rotate-[-2deg] hover:rotate-0 transition-transform duration-500 max-w-sm mx-auto">
               
               {isLoading ? (
                 // Loading State for Card
                 <div className="flex flex-col items-center justify-center h-80 space-y-4">
                   <Loader2 className="w-10 h-10 text-brand-purple animate-spin" />
                   <p className="text-sm text-slate-400">Scanning for live drops...</p>
                 </div>
               ) : featuredDeal ? (
                 // REAL DEAL STATE
                 <>
                   <div className="bg-slate-50 rounded-xl h-64 w-full mb-4 overflow-hidden relative group flex items-center justify-center p-4">
                      <img 
                        src={featuredDeal.image} 
                        alt={featuredDeal.title} 
                        className="max-h-full max-w-full object-contain mix-blend-multiply"
                      />
                      <div className="absolute top-4 right-4 bg-brand-teal text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                        -{featuredDeal.discount}%
                      </div>
                      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-4 py-2 rounded-lg text-brand-purple font-bold flex items-center shadow-lg border border-purple-100">
                        <TrendingUp className="w-4 h-4 mr-2" /> Price Drop Detected
                      </div>
                   </div>
                   
                   <div className="space-y-2">
                     <div className="flex justify-between items-start">
                       <h3 className="font-bold text-slate-800 line-clamp-2 text-lg leading-tight">
                         {featuredDeal.title}
                       </h3>
                     </div>
                     
                     <div className="flex items-end justify-between pt-2">
                       <div>
                         <p className="text-xs text-slate-400 mb-0.5">Found on {featuredDeal.marketplace}</p>
                         <div className="flex items-baseline gap-2">
                           <span className="text-2xl font-extrabold text-brand-purple">
                             ₨{featuredDeal.currentPrice.toLocaleString()}
                           </span>
                           {featuredDeal.originalPrice && (
                             <span className="text-sm text-slate-400 line-through">
                               {featuredDeal.originalPrice.toLocaleString()}
                             </span>
                           )}
                         </div>
                       </div>
                       <Button size="sm" variant="outline" className="rounded-full" onClick={() => window.open(featuredDeal.productUrl, '_blank')}>
                         View Deal
                       </Button>
                     </div>
                   </div>
                 </>
               ) : (
                 // Empty State (rare)
                 <div className="h-80 flex items-center justify-center text-slate-400">
                   No drops found right now.
                 </div>
               )}
            </div>

            {/* Floating Savings Bubble (Only show if we have savings) */}
            {!isLoading && featuredDeal && featuredDeal.discount! > 0 && (
              <div className="absolute -top-6 -right-6 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-xl animate-bounce duration-[3000ms] border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold">
                    VS
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">Total Savings</div>
                    <div className="font-bold text-green-600">
                      ₨ {(featuredDeal.originalPrice! - featuredDeal.currentPrice).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}