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
    <section className="py-16 md:py-20 bg-gradient-to-b from-background via-primary/5 to-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-green-600 text-white hover:bg-green-700">
            <Shield className="w-3 h-3 mr-1" />
            100% Verified
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Verified Deals
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Handpicked genuine deals below historical average prices. No fake sales, just real savings.
          </p>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 max-w-4xl mx-auto">
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
              description: 'No inflated original prices',
              color: 'text-blue-600'
            },
            {
              icon: Clock,
              title: 'Updated Daily',
              description: 'Fresh deals every 24 hours',
              color: 'text-purple-600'
            }
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <Card 
                key={item.title}
                className="border-2 hover-elevate transition-all"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="flex items-center gap-4 p-4">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br from-${item.color}/20 to-${item.color}/10 flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-6 h-6 ${item.color}`} />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-sm md:text-base">{item.title}</div>
                    <div className="text-xs md:text-sm text-muted-foreground">{item.description}</div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Verified Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {verifiedProducts.map(product => (
            <div key={product.id} className="relative">
              {/* Verified Badge Overlay */}
              <div className="absolute -top-2 -right-2 z-20">
                <Badge className="bg-green-600 text-white shadow-lg border-2 border-background">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  Verified
                </Badge>
              </div>
              <ProfessionalProductCard 
                product={product}
                onViewDetails={onViewDetails}
              />
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:opacity-90 text-white px-8"
          >
            <Shield className="w-5 h-5 mr-2" />
            View All Verified Deals
          </Button>
        </div>

        {/* How We Verify Section */}
        <div className="mt-16 p-6 md:p-8 bg-muted/50 rounded-xl border-2">
          <h3 className="text-xl md:text-2xl font-bold mb-4 text-center">
            How We Verify Deals
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h4 className="font-semibold mb-2">Track Price History</h4>
              <p className="text-sm text-muted-foreground">
                We monitor prices for 3+ months across all marketplaces
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h4 className="font-semibold mb-2">Compare Average</h4>
              <p className="text-sm text-muted-foreground">
                Current price must be below historical average
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h4 className="font-semibold mb-2">Verify Authenticity</h4>
              <p className="text-sm text-muted-foreground">
                Check original prices aren't artificially inflated
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
