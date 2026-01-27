import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, TrendingDown, Clock, Shield } from 'lucide-react';
import ProfessionalProductCard from './ProfessionalProductCard';
import { mockProducts, getProductDetail } from '@/lib/mockData';

interface VerifiedDealsSectionProps {
  onViewDetails?: (productId: string) => void;
}

export default function VerifiedDealsSection({ onViewDetails }: VerifiedDealsSectionProps) {
  // Filter for genuine deals only
  const verifiedProducts = mockProducts
    .filter(product => {
      const detail = getProductDetail(product.id);
      return detail?.fakeSaleStatus === 'genuine';
    })
    .slice(0, 6);

  return (
    <section className="py-8 sm:py-16 md:py-20 bg-gradient-to-b from-background via-primary/5 to-background">
      <div className="container mx-auto px-4">
        {/* Header - More compact on mobile */}
        <div className="text-center mb-6 sm:mb-12">
          <Badge className="mb-2 sm:mb-4 bg-green-600 text-white hover:bg-green-700 text-xs">
            <Shield className="w-3 h-3 mr-1" />
            100% Verified
          </Badge>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-2 sm:mb-4">
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Verified Deals
            </span>
          </h2>
          <p className="text-sm sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Genuine deals below historical average prices
          </p>
        </div>

        {/* Trust Indicators - Horizontal scroll on mobile, hidden on very small screens */}
        <div className="hidden sm:grid grid-cols-3 gap-3 sm:gap-4 mb-8 sm:mb-12 max-w-4xl mx-auto">
          {[
            {
              icon: CheckCircle2,
              title: 'Verified Pricing',
              description: 'Below 3-month average',
              color: 'text-green-600'
            },
            {
              icon: TrendingDown,
              title: 'Real Discounts',
              description: 'No inflated prices',
              color: 'text-blue-600'
            },
            {
              icon: Clock,
              title: 'Updated Daily',
              description: 'Fresh deals',
              color: 'text-purple-600'
            }
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.title}
                className="border hover-elevate transition-all"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="flex items-center gap-3 p-3 sm:p-4">
                  <div className={`w-8 sm:w-12 h-8 sm:h-12 rounded-full bg-gradient-to-br from-${item.color}/20 to-${item.color}/10 flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-4 sm:w-6 h-4 sm:h-6 ${item.color}`} />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-xs sm:text-sm md:text-base">{item.title}</div>
                    <div className="text-[10px] sm:text-xs md:text-sm text-muted-foreground">{item.description}</div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Verified Products Grid - 2 columns on mobile */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          {verifiedProducts.slice(0, 4).map(product => (
            <div key={product.id} className="relative">
              {/* Verified Badge Overlay - Smaller on mobile */}
              <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 z-20">
                <Badge className="bg-green-600 text-white shadow-lg border-2 border-background text-[10px] sm:text-xs px-1.5 sm:px-2">
                  <CheckCircle2 className="w-2.5 sm:w-3 h-2.5 sm:h-3 mr-0.5 sm:mr-1" />
                  <span className="hidden sm:inline">Verified</span>
                  <span className="sm:hidden">✓</span>
                </Badge>
              </div>
              <ProfessionalProductCard
                product={product}
                onViewDetails={onViewDetails}
              />
            </div>
          ))}
        </div>

        {/* View All Button - Smaller on mobile */}
        <div className="text-center mt-6 sm:mt-12">
          <Button
            size="default"
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:opacity-90 text-white px-4 sm:px-8 text-sm sm:text-base"
          >
            <Shield className="w-4 h-4 mr-2" />
            View All Verified Deals
          </Button>
        </div>

        {/* How We Verify Section - Hidden on mobile */}
        <div className="hidden sm:block mt-12 sm:mt-16 p-4 sm:p-6 md:p-8 bg-muted/50 rounded-xl border">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 text-center">
            How We Verify Deals
          </h3>
          <div className="grid grid-cols-3 gap-4 sm:gap-6 text-center">
            <div>
              <div className="w-10 sm:w-12 h-10 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                <span className="text-lg sm:text-2xl font-bold text-primary">1</span>
              </div>
              <h4 className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Track Prices</h4>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Monitor for 3+ months
              </p>
            </div>
            <div>
              <div className="w-10 sm:w-12 h-10 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                <span className="text-lg sm:text-2xl font-bold text-primary">2</span>
              </div>
              <h4 className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Compare</h4>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Below average = real deal
              </p>
            </div>
            <div>
              <div className="w-10 sm:w-12 h-10 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                <span className="text-lg sm:text-2xl font-bold text-primary">3</span>
              </div>
              <h4 className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Verify</h4>
              <p className="text-xs sm:text-sm text-muted-foreground">
                No inflated prices
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
