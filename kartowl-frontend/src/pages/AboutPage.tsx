import { ArrowLeft, Users, Target, Shield, Heart } from 'lucide-react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-12 max-w-4xl">
                <Link href="/">
                    <Button variant="ghost" className="mb-8">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Home
                    </Button>
                </Link>

                <h1 className="text-4xl font-bold mb-6">About KartOwl</h1>

                <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
                    <section>
                        <p className="text-lg text-muted-foreground">
                            KartOwl is Pakistan's premier price comparison platform, helping shoppers find the best
                            deals across multiple online marketplaces. We believe everyone deserves access to fair
                            prices and transparent shopping.
                        </p>
                    </section>

                    <section className="grid md:grid-cols-2 gap-6 not-prose">
                        <div className="p-6 rounded-xl bg-muted/50 border">
                            <Users className="w-10 h-10 text-brand-purple mb-4" />
                            <h3 className="font-bold text-lg mb-2">Our Mission</h3>
                            <p className="text-muted-foreground">
                                To empower Pakistani consumers with real-time price data, helping them make
                                informed purchasing decisions and avoid fake sales.
                            </p>
                        </div>

                        <div className="p-6 rounded-xl bg-muted/50 border">
                            <Target className="w-10 h-10 text-brand-teal mb-4" />
                            <h3 className="font-bold text-lg mb-2">Our Vision</h3>
                            <p className="text-muted-foreground">
                                To become the most trusted shopping companion for every Pakistani online shopper,
                                ensuring transparent and fair e-commerce.
                            </p>
                        </div>

                        <div className="p-6 rounded-xl bg-muted/50 border">
                            <Shield className="w-10 h-10 text-green-500 mb-4" />
                            <h3 className="font-bold text-lg mb-2">Trust & Transparency</h3>
                            <p className="text-muted-foreground">
                                We show real prices, track historical data, and highlight suspicious sales
                                so you never fall for marketing tricks.
                            </p>
                        </div>

                        <div className="p-6 rounded-xl bg-muted/50 border">
                            <Heart className="w-10 h-10 text-red-500 mb-4" />
                            <h3 className="font-bold text-lg mb-2">Made in Pakistan</h3>
                            <p className="text-muted-foreground">
                                Built by Pakistani developers for Pakistani shoppers. We understand local
                                marketplaces and shopping habits.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">The Team</h2>
                        <p className="text-muted-foreground">
                            KartOwl was created by a passionate team of developers and designers who were
                            frustrated with fake discounts and inflated "original prices" on e-commerce sites.
                            We built the tool we wished existed.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
