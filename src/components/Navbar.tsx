import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, Search, ChevronDown, Menu, X, ArrowRight, MapPin, Calendar, Sparkles } from 'lucide-react';
import { siteData } from '../data/siteData';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string, param?: string) => void;
  onOpenEnquiry: (packageSlug?: string) => void;
  onOpenSearch: () => void;
  onOpenAbout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onOpenEnquiry,
  onOpenSearch,
  onOpenAbout,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toursDropdownOpen, setToursDropdownOpen] = useState(false);
  const [groupTripsDropdownOpen, setGroupTripsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // If we are not on 'home', or if user scrolled past 60px, solid navy
      if (window.scrollY > 50 || currentView !== 'home') {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentView]);

  // Always solid on non-home pages
  const isSolid = isScrolled || currentView !== 'home';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isSolid
          ? 'bg-[#1B3A6B] shadow-xl py-3 border-b border-white/10'
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Brand Logo & Tagline */}
        <div
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2.5 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-2xl bg-[#D9622B] flex items-center justify-center text-white shadow-lg shadow-orange-600/30 group-hover:rotate-12 transition-transform duration-300">
            <Compass className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-black text-xl sm:text-2xl text-white tracking-tight leading-none">
              TRIPTO<span className="text-[#D9622B]">.</span>
            </span>
            <span className="text-[10px] font-semibold text-blue-100/90 tracking-wider uppercase">
              {siteData.brand.tagline}
            </span>
          </div>
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {/* Home */}
          <button
            onClick={() => onNavigate('home')}
            className={`px-3.5 py-2 text-xs font-bold uppercase tracking-wider rounded-full transition-colors cursor-pointer ${
              currentView === 'home'
                ? 'text-[#D9622B] bg-white/10'
                : 'text-white/90 hover:text-white hover:bg-white/5'
            }`}
          >
            Home
          </button>

          {/* Tours Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setToursDropdownOpen(true)}
            onMouseLeave={() => setToursDropdownOpen(false)}
          >
            <button
              onClick={() => onNavigate('tours')}
              className={`px-3.5 py-2 text-xs font-bold uppercase tracking-wider rounded-full transition-colors flex items-center gap-1 cursor-pointer ${
                currentView === 'tours'
                  ? 'text-[#D9622B] bg-white/10'
                  : 'text-white/90 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>Tours</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${toursDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {toursDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ duration: 0.18 }}
                  className="absolute top-full left-0 mt-1 w-72 bg-white rounded-2xl shadow-2xl p-2.5 border border-stone-200 z-50"
                >
                  <div className="px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-gray-400">
                    Popular Expeditions
                  </div>
                  {siteData.packages.map((pkg) => (
                    <div
                      key={pkg.slug}
                      onClick={() => {
                        onNavigate('tour-detail', pkg.slug);
                        setToursDropdownOpen(false);
                      }}
                      className="p-2.5 rounded-xl hover:bg-orange-50/70 transition-colors flex items-center justify-between cursor-pointer group"
                    >
                      <div>
                        <div className="text-xs font-extrabold text-[#1B3A6B] group-hover:text-[#D9622B]">
                          {pkg.destinationName}
                        </div>
                        <div className="text-[11px] text-gray-500 font-medium">
                          {pkg.duration} · from ₹{pkg.price.toLocaleString()}
                        </div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-[#D9622B] group-hover:translate-x-0.5 transition-all" />
                    </div>
                  ))}
                  <div className="pt-1 mt-1 border-t border-stone-100">
                    <button
                      onClick={() => {
                        onNavigate('tours');
                        setToursDropdownOpen(false);
                      }}
                      className="w-full text-center py-2 text-xs font-bold text-[#D9622B] hover:text-[#C35320] block"
                    >
                      SEE ALL DESTINATIONS →
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Group Trips Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setGroupTripsDropdownOpen(true)}
            onMouseLeave={() => setGroupTripsDropdownOpen(false)}
          >
            <button
              onClick={() => onNavigate('group-trips')}
              className={`px-3.5 py-2 text-xs font-bold uppercase tracking-wider rounded-full transition-colors flex items-center gap-1 cursor-pointer ${
                currentView === 'group-trips'
                  ? 'text-[#D9622B] bg-white/10'
                  : 'text-white/90 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>Group Trips</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${groupTripsDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {groupTripsDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ duration: 0.18 }}
                  className="absolute top-full left-0 mt-1 w-80 bg-white rounded-2xl shadow-2xl p-2.5 border border-stone-200 z-50"
                >
                  <div className="px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-gray-400">
                    Upcoming Fixed Batches
                  </div>
                  {siteData.departures.slice(0, 4).map((dep) => (
                    <div
                      key={dep.id}
                      onClick={() => {
                        onNavigate('tour-detail', dep.linkedPackageSlug);
                        setGroupTripsDropdownOpen(false);
                      }}
                      className="p-2.5 rounded-xl hover:bg-orange-50/70 transition-colors flex items-center justify-between cursor-pointer group"
                    >
                      <div className="flex items-center gap-2.5">
                        <img
                          src={dep.thumbnail}
                          alt={dep.destinationName}
                          className="w-9 h-9 rounded-lg object-cover"
                        />
                        <div>
                          <div className="text-xs font-extrabold text-[#1B3A6B] group-hover:text-[#D9622B]">
                            {dep.displayDate}
                          </div>
                          <div className="text-[11px] text-gray-500 truncate max-w-[150px]">
                            {dep.destinationName}
                          </div>
                        </div>
                      </div>
                      <span className="text-[11px] font-black text-[#D9622B]">
                        ₹{dep.price.toLocaleString()}
                      </span>
                    </div>
                  ))}
                  <div className="pt-1 mt-1 border-t border-stone-100">
                    <button
                      onClick={() => {
                        onNavigate('group-trips');
                        setGroupTripsDropdownOpen(false);
                      }}
                      className="w-full text-center py-2 text-xs font-bold text-[#1B3A6B] hover:text-[#D9622B] block"
                    >
                      VIEW ALL SCHEDULED DATES →
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Blog */}
          <button
            onClick={() => onNavigate('blog')}
            className={`px-3.5 py-2 text-xs font-bold uppercase tracking-wider rounded-full transition-colors cursor-pointer ${
              currentView === 'blog'
                ? 'text-[#D9622B] bg-white/10'
                : 'text-white/90 hover:text-white hover:bg-white/5'
            }`}
          >
            Blog
          </button>

          {/* About */}
          <button
            onClick={onOpenAbout}
            className="px-3.5 py-2 text-xs font-bold uppercase tracking-wider rounded-full text-white/90 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
          >
            About
          </button>

          {/* Contact */}
          <button
            onClick={() => onNavigate('contact')}
            className={`px-3.5 py-2 text-xs font-bold uppercase tracking-wider rounded-full transition-colors cursor-pointer ${
              currentView === 'contact'
                ? 'text-[#D9622B] bg-white/10'
                : 'text-white/90 hover:text-white hover:bg-white/5'
            }`}
          >
            Contact
          </button>
        </nav>

        {/* Right: Search & Enquire Pill Button */}
        <div className="flex items-center gap-3">
          {/* Search Icon Button */}
          <button
            onClick={onOpenSearch}
            aria-label="Search trips"
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* ENQUIRE NOW Pill Button */}
          <button
            onClick={() => onOpenEnquiry()}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#D9622B] hover:bg-[#C35320] text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-orange-600/30 transition-all active:scale-95 cursor-pointer"
          >
            <span>ENQUIRE NOW</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Open mobile menu"
            className="lg:hidden w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#1B3A6B] border-t border-white/10 px-4 py-6 space-y-3"
          >
            <div className="flex flex-col space-y-1">
              <button
                onClick={() => {
                  onNavigate('home');
                  setMobileMenuOpen(false);
                }}
                className="text-left px-4 py-2.5 rounded-xl font-bold text-white hover:bg-white/10 text-sm uppercase tracking-wider"
              >
                Home
              </button>
              <button
                onClick={() => {
                  onNavigate('tours');
                  setMobileMenuOpen(false);
                }}
                className="text-left px-4 py-2.5 rounded-xl font-bold text-white hover:bg-white/10 text-sm uppercase tracking-wider"
              >
                Tours & All Destinations
              </button>
              <button
                onClick={() => {
                  onNavigate('group-trips');
                  setMobileMenuOpen(false);
                }}
                className="text-left px-4 py-2.5 rounded-xl font-bold text-white hover:bg-white/10 text-sm uppercase tracking-wider"
              >
                Group Trips & Departures
              </button>
              <button
                onClick={() => {
                  onNavigate('blog');
                  setMobileMenuOpen(false);
                }}
                className="text-left px-4 py-2.5 rounded-xl font-bold text-white hover:bg-white/10 text-sm uppercase tracking-wider"
              >
                Travel Blog & Guides
              </button>
              <button
                onClick={() => {
                  onOpenAbout();
                  setMobileMenuOpen(false);
                }}
                className="text-left px-4 py-2.5 rounded-xl font-bold text-white hover:bg-white/10 text-sm uppercase tracking-wider"
              >
                About Tripto
              </button>
              <button
                onClick={() => {
                  onNavigate('contact');
                  setMobileMenuOpen(false);
                }}
                className="text-left px-4 py-2.5 rounded-xl font-bold text-white hover:bg-white/10 text-sm uppercase tracking-wider"
              >
                Contact & Fixed Departures
              </button>
            </div>

            <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
              <button
                onClick={() => {
                  onOpenEnquiry();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3.5 rounded-full bg-[#D9622B] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <span>ENQUIRE NOW</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => {
                  onOpenSearch();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3 rounded-full bg-white/10 text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Search Trips</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
