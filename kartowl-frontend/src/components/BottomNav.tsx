import { Home, Search, ShoppingBag, User } from 'lucide-react';
import { Link, useLocation } from 'wouter';

export default function BottomNav() {
  const [location] = useLocation();

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Search, label: 'Search', path: '/search' },
    { icon: ShoppingBag, label: 'Deals', path: '/#deals' },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-slate-200 p-2 z-50 pb-safe">
      <div className="flex justify-around items-center">
        {navItems.map((item) => {
          const isActive = location === item.path;
          return (
            <Link key={item.path} href={item.path}>
              <div className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-colors ${isActive ? 'text-brand-purple' : 'text-slate-400'}`}>
                <item.icon className={`w-6 h-6 ${isActive ? 'fill-brand-purple/20' : ''}`} />
                <span className="text-[10px] font-medium">{item.label}</span>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  );
}