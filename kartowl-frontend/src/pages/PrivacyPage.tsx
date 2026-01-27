import { ArrowLeft } from 'lucide-react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-12 max-w-4xl">
                <Link href="/">
                    <Button variant="ghost" className="mb-8">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Home
                    </Button>
                </Link>

                <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
                <p className="text-muted-foreground mb-8">Last updated: January 2026</p>

                <div className="prose prose-slate dark:prose-invert max-w-none space-y-6">
                    <section>
                        <h2 className="text-2xl font-bold">1. Information We Collect</h2>
                        <p>KartOwl collects minimal data necessary to provide our services:</p>
                        <ul>
                            <li><strong>Search Queries:</strong> We log search terms to improve our service. These are not linked to personal identities.</li>
                            <li><strong>Email Addresses:</strong> Only if you sign up for price alerts. We use this solely to send you alerts.</li>
                            <li><strong>Usage Analytics:</strong> Anonymous usage statistics to improve our platform.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold">2. How We Use Your Information</h2>
                        <ul>
                            <li>To provide price comparison services</li>
                            <li>To send price drop alerts (if you opted in)</li>
                            <li>To improve our platform and user experience</li>
                            <li>To detect and prevent fraud or misuse</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold">3. Data Sharing</h2>
                        <p>We do NOT sell, rent, or share your personal data with third parties, except:</p>
                        <ul>
                            <li>When required by law</li>
                            <li>With service providers who help operate our platform (under strict confidentiality)</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold">4. Cookies</h2>
                        <p>
                            We use essential cookies to remember your preferences (like recent searches).
                            We may use analytics cookies to understand how users interact with our site.
                            You can disable cookies in your browser settings.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold">5. Third-Party Links</h2>
                        <p>
                            Our site contains links to marketplace websites (Daraz, OLX, etc.).
                            We are not responsible for their privacy practices. Please review their policies separately.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold">6. Your Rights</h2>
                        <p>You have the right to:</p>
                        <ul>
                            <li>Request deletion of your email from our price alert system</li>
                            <li>Access any data we have about you</li>
                            <li>Opt out of any communications</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold">7. Contact Us</h2>
                        <p>
                            For privacy-related inquiries, contact us at{' '}
                            <a href="mailto:privacy@kartowl.pk" className="text-brand-purple">privacy@kartowl.pk</a>
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
