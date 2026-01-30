import { useAuthStore } from '@/store/auth-store';
import { Link, useLocation } from 'wouter';
import { LayoutDashboard, ShoppingBag, User, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import Button from '@/components/ui/button';

export function Layout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const logout = useAuthStore((state) => state.logout);
  const [, setLocation] = useLocation();

  const handleLogout = () => {
    logout();
    setLocation('/login');
  };

  const navItems = [
    { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/products', icon: ShoppingBag, label: 'Products' },
    { href: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden sticky top-0 bg-white border-b p-4 flex justify-between items-center z-50">
        <h1 className="text-xl font-bold text-slate-800 font-display">Store</h1>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`
        fixed left-0 right-0 ${isMobileMenuOpen ? 'top-16 bottom-0 z-50' : 'inset-0 z-40'} bg-white md:sticky md:top-0 md:h-screen md:w-64 border-r border-slate-200
        transform transition-transform duration-300 ease-in-out flex flex-col
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}
      >
        <div className="p-6 hidden md:block sticky top-0 bg-white z-10">
          <h1 className="text-2xl font-bold text-primary font-display">Store</h1>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer
                  ${
                    isActive
                      ? 'bg-primary/10 text-primary font-medium shadow-sm'
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                  }
                `}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <Button
            className="w-full justify-start bg-transparent text-red-500 hover:text-red-600 hover:bg-red-50 gap-3 shadow-none"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5 text-red-500" />
            <span className="text-red-500">Logout</span>
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto h-[calc(100vh-64px)] md:h-screen">
        <div className="max-w-7xl mx-auto animate-in">{children}</div>
      </main>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30 md:hidden backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}
