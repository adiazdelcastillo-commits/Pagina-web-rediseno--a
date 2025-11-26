import React, { useState, useEffect } from 'react';
import { Hexagon, Menu, X } from 'lucide-react';
import { NAV_LINKS } from '../constants';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-slate-950/80 backdrop-blur-md border-b border-slate-800 py-3' 
          : 'bg-transparent py-6 border-b border-transparent'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2 text-white">
          <Hexagon className="text-amber-500 w-8 h-8 fill-amber-500/20" />
          <span className="font-display text-2xl font-bold tracking-tight">AluCycle</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {NAV_LINKS.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm text-slate-300 hover:text-amber-400 font-medium transition-colors"
            >
              {link.name}
            </a>
          ))}
          <button className="px-5 py-2 rounded bg-slate-800 text-white text-sm font-bold border border-slate-600 hover:border-amber-500 hover:bg-slate-900 transition-all shadow-[0_0_15px_rgba(245,158,11,0)] hover:shadow-[0_0_15px_rgba(245,158,11,0.3)]">
            Client Portal
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-slate-200"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-slate-950 border-b border-slate-800 p-6 flex flex-col space-y-4">
           {NAV_LINKS.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-slate-300 hover:text-amber-400 py-2 block"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
           <button className="w-full py-3 rounded bg-amber-600 text-white font-bold">
            Client Portal
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;