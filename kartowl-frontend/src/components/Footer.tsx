import { Link } from 'wouter';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t bg-muted/30 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <img 
              src="/src/assets/kartowl-logo.png" 
              alt="KartOwl Logo" 
              className="h-10 w-auto"
            />
            <p className="text-sm text-muted-foreground">
              Your trusted price comparison platform for Pakistani marketplaces.
            </p>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-semibold">Marketplaces</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover-elevate px-1 py-0.5 rounded">Daraz</a></li>
              <li><a href="#" className="hover-elevate px-1 py-0.5 rounded">Temu</a></li>
              <li><a href="#" className="hover-elevate px-1 py-0.5 rounded">AliExpress</a></li>
              <li><a href="#" className="hover-elevate px-1 py-0.5 rounded">Telemart</a></li>
              <li><a href="#" className="hover-elevate px-1 py-0.5 rounded">PriceoYe</a></li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-semibold">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover-elevate px-1 py-0.5 rounded">About Us</a></li>
              <li><a href="#" className="hover-elevate px-1 py-0.5 rounded">How It Works</a></li>
              <li><a href="#" className="hover-elevate px-1 py-0.5 rounded">How We Earn</a></li>
              <li><a href="#" className="hover-elevate px-1 py-0.5 rounded">Contact</a></li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-semibold">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover-elevate px-1 py-0.5 rounded">Privacy Policy</a></li>
              <li><a href="#" className="hover-elevate px-1 py-0.5 rounded">Terms of Service</a></li>
              <li><a href="#" className="hover-elevate px-1 py-0.5 rounded">Affiliate Disclosure</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© {currentYear} KartOwl. All rights reserved.</p>
          <p className="mt-2">
            We earn affiliate commissions from marketplace links. Prices may vary.
          </p>
        </div>
      </div>
    </footer>
  );
}
