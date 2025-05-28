
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/ThemeToggle';
import { SidebarTrigger } from '@/components/ui/sidebar';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-10 py-4",
        scrolled 
          ? "bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-sm" 
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <SidebarTrigger className="md:hidden" />
          
          <Link 
            to="/" 
            className="flex items-center space-x-2"
          >
            <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-primary-foreground" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 3v3m0 4.5v3m0 4.5v3M3 12h3m4.5 0h3m4.5 0h3" />
              </svg>
            </div>
            <span className="font-medium text-lg md:hidden">EcoTools</span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center space-x-1">
          <Link to="/" className={cn("nav-link", location.pathname === '/' && "active")}>
            Home
          </Link>
          <Link to="/tools" className={cn("nav-link", location.pathname.includes('/tools') && "active")}>
            Tools
          </Link>
          <Link to="/about" className={cn("nav-link", location.pathname === '/about' && "active")}>
            About
          </Link>
          <Link to="/contact" className={cn("nav-link", location.pathname === '/contact' && "active")}>
            Contact
          </Link>
          <Link to="/privacy" className={cn("nav-link", location.pathname === '/privacy' && "active")}>
            Privacy
          </Link>
          <Link to="/disclaimer" className={cn("nav-link", location.pathname === '/disclaimer' && "active")}>
            Disclaimer
          </Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
