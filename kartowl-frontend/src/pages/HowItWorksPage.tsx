import { ArrowLeft, Search, BarChart3, Bell, CheckCircle2 } from 'lucide-react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

const steps = [
    {
        icon: Search,
        title: '1. Search Any Product',
        description: 'Enter a product name or paste a URL from any marketplace. We support Daraz, OLX, Telemart, and PriceOye.',
    },
    {
        icon: BarChart3,
        title: '2. Compare Prices',
        description: 'We scan all major Pakistani marketplaces in real-time and show you prices from each store side by side.',
    },
    {
        icon: CheckCircle2,
        title: '3. Check Price History',
        description: 'View historical price data to see if the current "sale" is genuine or just marketing. We track prices over time.',
    },
    {
        icon: Bell,
        title: '4. Set Price Alerts',
        description: 'Want to wait for a better price? Set an alert and we\'ll email you when the price drops to your target.',
    },
];

export default function HowItWorksPage() {
    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-12 max-w-4xl">
                <Link href="/">
                    <Button variant="ghost" className="mb-8">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Home
                    </Button>
                </Link>

                <h1 className="text-4xl font-bold mb-4">How It Works</h1>
                <p className="text-lg text-muted-foreground mb-12">
                    KartOwl makes price comparison simple and transparent. Here's how:
                </p>

                <div className="space-y-8">
                    {steps.map((step, index) => (
                        <div key={index} className="flex gap-6 items-start p-6 rounded-xl bg-muted/50 border">
                            <div className="flex-shrink-0 w-14 h-14 rounded-full bg-brand-purple/10 flex items-center justify-center">
                                <step.icon className="w-7 h-7 text-brand-purple" />
                            </div>
                            <div>
                                <h3 className="font-bold text-xl mb-2">{step.title}</h3>
                                <p className="text-muted-foreground">{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 p-6 rounded-xl bg-brand-purple/10 border border-brand-purple/20">
                    <h3 className="font-bold text-lg mb-2">🔒 Your Data is Safe</h3>
                    <p className="text-muted-foreground">
                        We don't store any personal shopping data. Price alerts only require your email,
                        and we never share it with third parties.
                    </p>
                </div>
            </div>
        </div>
    );
}
