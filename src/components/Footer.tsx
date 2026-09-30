import React, { useState } from 'react';
import { Compass, Phone, Mail, MapPin, ArrowRight, Instagram, Youtube, Facebook, ShieldCheck, Heart, Sparkles } from 'lucide-react';
import { siteData } from '../data/siteData';

interface FooterProps {
  onNavigate: (view: string, param?: string) => void;
  onOpenEnquiry: () => void;
  onOpenAbout: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenEnquiry,
  onOpenAbout,
}) => {
  const [emailSub, setEmailSub] = useState('');
  const [subSuccess, setSubSuccess] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailSub) {
      setSubSuccess(true);
      setTimeout(() => {
        setSubSuccess(false);
        setEmailSub('');
      }, 3000);
    }
  };

  return (
    <footer className="bg-[#12284C] text-white border-t border-white/10 pt-16 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top CTA Row */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#1B3A6B] to-[#162e55] border border-white/15 flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative overflow-hidden">
          <div className="space-y-2 relative z-10">
            <span className="text-xs font-black uppercase tracking-widest text-[#D9622B] px-3 py-1 rounded-full bg-white/10 inline-block">
              START YOUR ADVENTURE
            </span>
            <h3 className="text-2xl sm:text-4xl font-black font-heading tracking-tight leading-tight">
              Got your own squad or office team?
            </h3>
            <p className="text-blue-100/80 text-sm max-w-xl">
              We arrange custom private weekend batches with doorstep pick-up from Mumbai & Pune, private camp setups, and dedicated captains.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 relative z-10 shrink-0">
            <button
              onClick={onOpenEnquiry}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#D9622B] hover:bg-[#C35320] text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-orange-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>CUSTOM TRIP ENQUIRY</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href={`https://wa.me/${siteData.brand.whatsapp.replace('+', '')}`}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-full border border-white/30 hover:bg-white/10 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
            >
              <span>WHATSAPP CAPTAIN</span>
            </a>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Col 1: Brand & Tagline */}
          <div className="lg:col-span-2 space-y-4">
            <div
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-2xl bg-[#D9622B] flex items-center justify-center text-white shadow-md">
                <Compass className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-black text-2xl tracking-tight leading-none text-white">
                  TRIPTO<span className="text-[#D9622B]">.</span>
                </span>
                <span className="text-[10px] font-semibold text-blue-200/90 tracking-wider uppercase">
                  {siteData.brand.tagline}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-blue-100/70 leading-relaxed max-w-sm">
              Tripto Travels is a community-first expedition travel agency. We take adventurous travelers beyond run-of-the-mill tourist corridors into untouched wilderness with certified trip captains.
            </p>

            {/* Newsletter */}
            <form onSubmit={handleSubscribe} className="space-y-2 pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-200 block">
                Get Secret Departure Drops
              </span>
              <div className="flex items-center gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={emailSub}
                  onChange={(e) => setEmailSub(e.target.value)}
                  className="bg-white/10 border border-white/20 rounded-full px-4 py-2.5 text-xs text-white placeholder-blue-200/50 focus:outline-none focus:ring-2 focus:ring-[#D9622B] w-full"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-full bg-[#D9622B] hover:bg-[#C35320] text-white text-xs font-black uppercase tracking-wider shrink-0 transition-colors cursor-pointer"
                >
                  {subSuccess ? 'JOINED!' : 'JOIN'}
                </button>
              </div>
              {subSuccess && (
                <span className="text-[11px] text-emerald-400 font-semibold block">
                  ✓ Welcome aboard! Secret batches will be sent your way.
                </span>
              )}
            </form>
          </div>

          {/* Col 2: Featured Expeditions */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-orange-400">
              Expeditions
            </h4>
            <ul className="space-y-2 text-xs font-medium text-blue-100/80">
              {siteData.packages.map((pkg) => (
                <li key={pkg.slug}>
                  <button
                    onClick={() => onNavigate('tour-detail', pkg.slug)}
                    className="hover:text-white hover:underline transition-colors text-left"
                  >
                    {pkg.destinationName}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => onNavigate('tours')}
                  className="text-[#D9622B] font-bold hover:underline"
                >
                  All Destinations →
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Company & Trust */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-orange-400">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs font-medium text-blue-100/80">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('group-trips')} className="hover:text-white transition-colors">
                  Fixed Departure Batches
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('blog')} className="hover:text-white transition-colors">
                  Trail Guides & Blog
                </button>
              </li>
              <li>
                <button onClick={onOpenAbout} className="hover:text-white transition-colors">
                  About Tripto & Captains
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">
                  Contact Us & Office
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Reassurance */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-orange-400">
              Reach the Captains
            </h4>
            <div className="space-y-2.5 text-xs text-blue-100/80">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#D9622B]" />
                <a href={`tel:${siteData.brand.phone.replace(/\s+/g, '')}`} className="hover:text-white">
                  {siteData.brand.displayPhone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#D9622B]" />
                <a href={`mailto:${siteData.brand.email}`} className="hover:text-white truncate">
                  {siteData.brand.email}
                </a>
              </div>
              <div className="flex items-start gap-2 pt-1">
                <MapPin className="w-3.5 h-3.5 text-[#D9622B] shrink-0 mt-0.5" />
                <span className="text-[11px] leading-relaxed">{siteData.brand.address}</span>
              </div>
              <div className="pt-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/20">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified Travel Agency · ISO Certified</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-blue-200/60 font-medium">
          <div>
            © {new Date().getFullYear()} Tripto Travels Private Limited. Styled with love for wanderers.
          </div>
          <div className="flex items-center gap-4">
            <button onClick={onOpenAbout} className="hover:text-white transition-colors">
              Privacy Policy
            </button>
            <span>•</span>
            <button onClick={onOpenAbout} className="hover:text-white transition-colors">
              Terms &amp; Cancellation
            </button>
            <span>•</span>
            <button onClick={onOpenAbout} className="hover:text-white transition-colors">
              Captain Code of Conduct
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
