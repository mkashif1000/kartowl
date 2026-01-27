import { ArrowLeft, DollarSign, Link2, Shield } from 'lucide-react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

export default function HowWeEarnPage() {
    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-12 max-w-4xl">
                <Link href="/">
                    <Button variant="ghost" className="mb-8">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Home
                    </Button>
                </Link>

                <h1 className="text-4xl font-bold mb-4">How We Earn Money</h1>
                <p className="text-lg text-muted-foreground mb-8">
                    Transparency is at our core. Here's exactly how KartOwl sustains itself:
                </p>

                <div className="space-y-6">
                    <div className="p-6 rounded-xl bg-muted/50 border">
                        <div className="flex items-center gap-3 mb-4">
                            <Link2 className="w-8 h-8 text-brand-purple" />
                            <h3 className="font-bold text-xl">Affiliate Commissions</h3>
                        </div>
                        <p className="text-muted-foreground">
                            When you click on a product link and make a purchase, the marketplace may pay us a
                            small commission (typically 1-5% of the sale). This does NOT increase the price you pay
                            — it comes from the seller's marketing budget.
                        </p>
                    </div>

                    <div className="p-6 rounded-xl bg-green-500/10 border border-green-500/20">
                        <div className="flex items-center gap-3 mb-4">
                            <Shield className="w-8 h-8 text-green-600" />
                            <h3 className="font-bold text-xl">What We Promise</h3>
                        </div>
                        <ul className="space-y-2 text-muted-foreground">
                            <li>✓ We show ALL prices, not just from affiliate partners</li>
                            <li>✓ Affiliate status never affects our price rankings</li>
                            <li>✓ We always show the lowest price first, regardless of commission</li>
                            <li>✓ We clearly disclose our affiliate relationships</li>
                        </ul>
                    </div>

                    <div className="p-6 rounded-xl bg-muted/50 border">
                        <div className="flex items-center gap-3 mb-4">
                            <DollarSign className="w-8 h-8 text-amber-500" />
                            <h3 className="font-bold text-xl">No Hidden Fees</h3>
                        </div>
                        <p className="text-muted-foreground">
                            KartOwl is completely free to use. We don't charge users any fees, and we don't
                            sell your personal data. Our affiliate commissions are our only source of revenue.
                        </p>
                    </div>
                </div>

                <div className="mt-8 text-sm text-muted-foreground">
                    <p>
                        For more details, please read our <Link href="/affiliate-disclosure" className="text-brand-purple underline">Affiliate Disclosure</Link>.
                    </p>
                </div>
            </div>
        </div>
    );
}
