import { Marketplace } from '@shared/schema';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SlidersHorizontal } from 'lucide-react';

interface FilterSidebarProps {
  selectedMarketplaces: Marketplace[];
  onMarketplaceToggle: (marketplace: Marketplace) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  showSuspicious: boolean;
  onShowSuspiciousChange: (show: boolean) => void;
}

const marketplaces: { id: Marketplace; name: string }[] = [
  { id: 'daraz', name: 'Daraz' },
  { id: 'olx', name: 'OLX' },
  { id: 'telemart', name: 'Telemart' },
  { id: 'priceoye', name: 'PriceoYe' }
];

export default function FilterSidebar({
  selectedMarketplaces,
  onMarketplaceToggle,
  sortBy,
  onSortChange,
  showSuspicious,
  onShowSuspiciousChange
}: FilterSidebarProps) {
  return (
    <Card data-testid="card-filters">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5" />
          Filters & Sort
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label className="text-base font-semibold">Sort By</Label>
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger data-testid="select-sort">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="discount">Highest Discount</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator />

        <div className="space-y-3">
          <Label className="text-base font-semibold">Marketplaces</Label>
          <div className="space-y-2">
            {marketplaces.map((marketplace) => (
              <label
                key={marketplace.id}
                className="flex items-center gap-2 cursor-pointer hover-elevate px-2 py-1.5 rounded-md"
              >
                <Checkbox
                  checked={selectedMarketplaces.includes(marketplace.id)}
                  onCheckedChange={() => onMarketplaceToggle(marketplace.id)}
                  data-testid={`checkbox-filter-${marketplace.id}`}
                />
                <span className="text-sm">{marketplace.name}</span>
              </label>
            ))}
          </div>
        </div>

        <Separator />

        <div className="space-y-3">
          <Label className="text-base font-semibold">Price Alerts</Label>
          <label className="flex items-center gap-2 cursor-pointer hover-elevate px-2 py-1.5 rounded-md">
            <Checkbox
              checked={!showSuspicious}
              onCheckedChange={(checked) => onShowSuspiciousChange(!checked)}
              data-testid="checkbox-hide-suspicious"
            />
            <span className="text-sm">Hide Suspicious Deals</span>
          </label>
        </div>
      </CardContent>
    </Card>
  );
}
