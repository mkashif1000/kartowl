import { Marketplace, MarketplaceStatus } from '@/shared/schema';
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

interface MarketplaceStatusBannerProps {
    marketplaceStatus: Record<Marketplace, MarketplaceStatus>;
}

const marketplaceConfig: Record<Marketplace, { name: string; color: string }> = {
    daraz: { name: 'Daraz', color: 'bg-orange-500' },
    priceoye: { name: 'PriceOye', color: 'bg-green-500' },
    telemart: { name: 'Telemart', color: 'bg-blue-500' },
    olx: { name: 'OLX', color: 'bg-cyan-500' },
};

export default function MarketplaceStatusBanner({ marketplaceStatus }: MarketplaceStatusBannerProps) {
    const marketplaces = Object.entries(marketplaceStatus) as [Marketplace, MarketplaceStatus][];

    const successCount = marketplaces.filter(([, status]) => status.success).length;
    const failedMarketplaces = marketplaces.filter(([, status]) => !status.success);

    // Don't show banner if all marketplaces succeeded
    if (successCount === 4) {
        return null;
    }

    return (
        <div className="mb-6">
            {/* Warning Banner for Failures */}
            {failedMarketplaces.length > 0 && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
                    <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                        <div>
                            <h4 className="font-semibold text-amber-800">
                                Some marketplaces couldn't be reached
                            </h4>
                            <p className="text-sm text-amber-700 mt-1">
                                {failedMarketplaces.map(([marketplace]) => marketplaceConfig[marketplace].name).join(', ')}
                                {failedMarketplaces.length === 1 ? ' is' : ' are'} temporarily unavailable.
                                Showing results from other sources.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Status Pills */}
            <div className="flex flex-wrap gap-2">
                {marketplaces.map(([marketplace, status]) => (
                    <div
                        key={marketplace}
                        className={`
              inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium
              ${status.success
                                ? 'bg-slate-100 text-slate-700'
                                : 'bg-red-50 text-red-700 border border-red-200'}
            `}
                    >
                        <span className={`w-2 h-2 rounded-full ${marketplaceConfig[marketplace].color}`} />
                        <span>{marketplaceConfig[marketplace].name}</span>
                        {status.success ? (
                            <span className="flex items-center gap-1 text-green-600">
                                <CheckCircle2 className="w-4 h-4" />
                                <span className="text-xs">{status.count}</span>
                            </span>
                        ) : (
                            <span className="flex items-center gap-1 text-red-500">
                                <XCircle className="w-4 h-4" />
                                <span className="text-xs">Failed</span>
                            </span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
