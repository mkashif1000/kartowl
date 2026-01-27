import { Marketplace } from '@shared/schema';
import { Badge } from '@/components/ui/badge';

const marketplaceColors: Record<Marketplace, { bg: string; text: string; name: string }> = {
  daraz: { bg: 'bg-orange-500', text: 'text-white', name: 'Daraz' },
  priceoye: { bg: 'bg-purple-600', text: 'text-white', name: 'PriceOye' },
  telemart: { bg: 'bg-green-600', text: 'text-white', name: 'Telemart' },
  olx: { bg: 'bg-cyan-500', text: 'text-white', name: 'OLX' },
};

interface MarketplaceBadgeProps {
  marketplace: Marketplace;
  size?: 'sm' | 'default';
}

export default function MarketplaceBadge({ marketplace, size = 'default' }: MarketplaceBadgeProps) {
  const config = marketplaceColors[marketplace];

  return (
    <Badge
      className={`${config.bg} ${config.text} ${size === 'sm' ? 'text-xs px-2' : ''}`}
      data-testid={`badge-marketplace-${marketplace}`}
    >
      {config.name}
    </Badge>
  );
}
