import { ArrowLeft } from 'lucide-react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-12 max-w-4xl">
                <Link href="/">
                    <Button variant="ghost" className="mb-8">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Home
                    </Button>
                </Link>

                <h1 className="text-4xl font-bold mb-2">Terms of Service</h1>
                <p className="text-muted-foreground mb-8">Last updated: January 2026</p>

                <div className="prose prose-slate dark:prose-invert max-w-none space-y-6">
                    <section>
                        <h2 className="text-2xl font-bold">1. Acceptance of Terms</h2>
                        <p>
                            By using KartOwl, you agree to these Terms of Service. If you do not agree,
                            please do not use our platform.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold">2. Description of Service</h2>
                        <p>
                            KartOwl is a price comparison platform that aggregates product information from
                            various Pakistani online marketplaces. We do not sell products directly — we
                            redirect users to third-party marketplace websites.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold">3. Accuracy of Information</h2>
                        <p>
                            While we strive to provide accurate and up-to-date pricing information, we cannot
                            guarantee that all prices and product details are 100% accurate at all times.
                            Prices are subject to change and may vary when you visit the actual marketplace.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold">4. Third-Party Websites</h2>
                        <p>
                            KartOwl contains links to third-party websites (marketplaces). We are not responsible
                            for the content, policies, or practices of these sites. Any transactions you make
                            with these marketplaces are solely between you and them.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold">5. Limitation of Liability</h2>
                        <p>
                            KartOwl is provided "as is" without warranties of any kind. We are not liable for
                            any damages arising from your use of our platform, including but not limited to
                            purchasing decisions made based on our price data.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold">6. Prohibited Uses</h2>
                        <p>You agree not to:</p>
                        <ul>
                            <li>Use automated systems to scrape or extract data from our platform</li>
                            <li>Attempt to interfere with or disrupt our services</li>
                            <li>Use our platform for any illegal purposes</li>
                            <li>Misrepresent your identity or affiliation</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold">7. Changes to Terms</h2>
                        <p>
                            We may update these terms from time to time. Continued use of KartOwl after
                            changes constitutes acceptance of the new terms.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold">8. Contact</h2>
                        <p>
                            For questions about these terms, contact us at{' '}
                            <a href="mailto:legal@kartowl.pk" className="text-brand-purple">legal@kartowl.pk</a>
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
