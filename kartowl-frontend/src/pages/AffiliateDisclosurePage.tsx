import { ArrowLeft, DollarSign, Info } from 'lucide-react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

export default function AffiliateDisclosurePage() {
    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-12 max-w-4xl">
                <Link href="/">
                    <Button variant="ghost" className="mb-8">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Home
                    </Button>
                </Link>

                <h1 className="text-4xl font-bold mb-2">Affiliate Disclosure</h1>
                <p className="text-muted-foreground mb-8">Last updated: January 2026</p>

                <div className="p-6 rounded-xl bg-amber-500/10 border border-amber-500/20 mb-8">
                    <div className="flex items-start gap-3">
                        <Info className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                        <p className="text-amber-800 dark:text-amber-200">
                            <strong>In plain English:</strong> When you click a product link on KartOwl and
                            buy something, we may earn a small commission. This doesn't cost you anything extra —
                            the price you pay is the same whether you come through us or go directly.
                        </p>
                    </div>
                </div>

                <div className="prose prose-slate dark:prose-invert max-w-none space-y-6">
                    <section>
                        <h2 className="text-2xl font-bold">What Are Affiliate Links?</h2>
                        <p>
                            Affiliate links are special URLs that contain a tracking code. When you click on
                            a product link on KartOwl and make a purchase, the marketplace knows you came
                            from us and may pay us a small referral fee (typically 1-5% of the sale price).
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold">Which Marketplaces?</h2>
                        <p>We may have affiliate relationships with:</p>
                        <ul>
                            <li>Daraz.pk</li>
                            <li>PriceOye.pk</li>
                            <li>Telemart.pk</li>
                            <li>Other Pakistani e-commerce platforms</li>
                        </ul>
                        <p>
                            Note: Not all links on our platform are affiliate links. OLX, for example,
                            does not have an affiliate program, but we still show their listings for
                            completeness.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold">Our Commitment to You</h2>
                        <div className="not-prose grid gap-4">
                            <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                                <DollarSign className="w-5 h-5 text-green-600 mt-0.5" />
                                <div>
                                    <h4 className="font-semibold">No Extra Cost</h4>
                                    <p className="text-sm text-muted-foreground">
                                        You pay the exact same price whether you use our link or go directly.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                                <DollarSign className="w-5 h-5 text-green-600 mt-0.5" />
                                <div>
                                    <h4 className="font-semibold">Honest Rankings</h4>
                                    <p className="text-sm text-muted-foreground">
                                        Affiliate status NEVER affects which products we show first.
                                        The lowest price always wins.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                                <DollarSign className="w-5 h-5 text-green-600 mt-0.5" />
                                <div>
                                    <h4 className="font-semibold">Full Transparency</h4>
                                    <p className="text-sm text-muted-foreground">
                                        We show prices from ALL marketplaces, not just our affiliate partners.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold">Why Affiliate Links?</h2>
                        <p>
                            Affiliate commissions are how we keep KartOwl free for users. Instead of
                            charging you a subscription or showing annoying ads, we earn a small commission
                            when you find a great deal through us. It's a win-win!
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold">Questions?</h2>
                        <p>
                            If you have any questions about our affiliate relationships, please{' '}
                            <Link href="/contact" className="text-brand-purple">contact us</Link>.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
