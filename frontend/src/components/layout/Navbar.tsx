import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Bell, Menu, X, LogOut, User, Settings } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/button';

export const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const navLinks = isAuthenticated
    ? [
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Universities', href: '/universities' },
        { label: 'Budget', href: '/dashboard/budget' },
        { label: 'Student Life', href: '/dashboard/life' },
      ]
    : [
        { label: 'Features', href: '/#features' },
        { label: 'Pricing', href: '/#pricing' },
        { label: 'About', href: '/#about' },
      ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass-strong shadow-lg' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <GraduationCap className="h-7 w-7 text-primary group-hover:scale-110 transition-transform" />
          <span className="font-heading font-bold text-lg">Abroad Guide</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((l) => (
            <Link key={l.href} to={l.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <button className="relative p-2 rounded-full hover:bg-muted transition-colors">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-primary rounded-full" />
              </button>
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-full hover:bg-muted transition-colors"
                >
                  <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-medium">
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                </button>
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      className="absolute right-0 top-12 w-48 glass-strong rounded-xl p-2 shadow-xl"
                    >
                      <Link to="/dashboard/profile" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted text-sm transition-colors" onClick={() => setDropdownOpen(false)}>
                        <User className="h-4 w-4" /> Profile
                      </Link>
                      <Link to="/dashboard/profile" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted text-sm transition-colors" onClick={() => setDropdownOpen(false)}>
                        <Settings className="h-4 w-4" /> Settings
                      </Link>
                      <button onClick={() => { logout(); setDropdownOpen(false); navigate('/'); }} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted text-sm w-full text-left text-destructive transition-colors">
                        <LogOut className="h-4 w-4" /> Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </>
          ) : (
            <>
              <Button variant="ghost" className="btn-pill" onClick={() => navigate('/login')}>Log in</Button>
              <Button className="btn-pill glow-blue" onClick={() => navigate('/register')}>Start Free</Button>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-strong border-t border-border overflow-hidden"
          >
            <div className="p-4 flex flex-col gap-3">
              {navLinks.map((l) => (
                <Link key={l.href} to={l.href} className="py-2 text-sm hover:text-primary transition-colors" onClick={() => setMobileOpen(false)}>
                  {l.label}
                </Link>
              ))}
              {!isAuthenticated && (
                <div className="flex gap-2 pt-2">
                  <Button variant="ghost" className="flex-1 btn-pill" onClick={() => { navigate('/login'); setMobileOpen(false); }}>Log in</Button>
                  <Button className="flex-1 btn-pill" onClick={() => { navigate('/register'); setMobileOpen(false); }}>Start Free</Button>
                </div>
              )}
              {isAuthenticated && (
                <button onClick={() => { logout(); setMobileOpen(false); navigate('/'); }} className="py-2 text-sm text-destructive">Logout</button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
