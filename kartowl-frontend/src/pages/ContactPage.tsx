import { ArrowLeft, Mail, MessageSquare, MapPin } from 'lucide-react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

export default function ContactPage() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, you'd send this to your backend
        setSubmitted(true);
    };

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-12 max-w-4xl">
                <Link href="/">
                    <Button variant="ghost" className="mb-8">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Home
                    </Button>
                </Link>

                <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
                <p className="text-lg text-muted-foreground mb-8">
                    Have questions, feedback, or found a bug? We'd love to hear from you!
                </p>

                <div className="grid md:grid-cols-2 gap-12">
                    <div>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-brand-purple/10 flex items-center justify-center flex-shrink-0">
                                    <Mail className="w-5 h-5 text-brand-purple" />
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-1">Email</h3>
                                    <a href="mailto:support@kartowl.pk" className="text-muted-foreground hover:text-brand-purple">
                                        support@kartowl.pk
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-brand-purple/10 flex items-center justify-center flex-shrink-0">
                                    <MessageSquare className="w-5 h-5 text-brand-purple" />
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-1">Social Media</h3>
                                    <p className="text-muted-foreground">
                                        Follow us on Twitter/X, Facebook, and Instagram @KartOwlPK
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-brand-purple/10 flex items-center justify-center flex-shrink-0">
                                    <MapPin className="w-5 h-5 text-brand-purple" />
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-1">Location</h3>
                                    <p className="text-muted-foreground">
                                        Based in Pakistan 🇵🇰
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 rounded-xl bg-muted/50 border">
                        {submitted ? (
                            <div className="text-center py-8">
                                <div className="text-5xl mb-4">✅</div>
                                <h3 className="font-bold text-xl mb-2">Message Sent!</h3>
                                <p className="text-muted-foreground">
                                    Thank you for reaching out. We'll get back to you soon.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1.5">Your Email</label>
                                    <Input type="email" placeholder="you@example.com" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1.5">Subject</label>
                                    <Input type="text" placeholder="How can we help?" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1.5">Message</label>
                                    <Textarea placeholder="Tell us more..." rows={4} required />
                                </div>
                                <Button type="submit" className="w-full">Send Message</Button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
