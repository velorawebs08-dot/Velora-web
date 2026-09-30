import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Calendar, Users, Mountain, Compass, Waves, Trees, Search, ChevronDown } from 'lucide-react';
import { siteData } from '../data/siteData';

interface HeroSectionProps {
  onSearch: (params: { location: string; date: string; guests: string }) => void;
  onNavigate: (view: string, param?: string) => void;
  onOpenEnquiry: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSearch,
}) => {
  const [whereTo, setWhereTo] = useState('Anywhere');
  const [date, setDate] = useState('Flexible');
  const [guests, setGuests] = useState(2);

  const destinationOptions = [
    { label: 'Anywhere (All Destinations)', value: 'Anywhere' },
    { label: 'Harishchandragad & Sandhan Valley', value: 'Harishchandragad' },
    { label: 'Kalsubai Peak — Everest of Maharashtra', value: 'Kalsubai' },
    { label: 'Rajmachi & Kataldhar Waterfalls', value: 'Rajmachi' },
    { label: 'Tarkarli & Devbagh Coastal Backwaters', value: 'Tarkarli' },
    { label: 'Rajgad to Torna Fortress Traverse', value: 'Rajgad' },
    { label: 'Kaas Plateau of Flowers & Mahabaleshwar', value: 'Kaas' },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      location: whereTo === 'Anywhere' ? '' : whereTo,
      date,
      guests: guests.toString(),
    });
  };

  return (
    <section className="relative min-h-[88dvh] sm:min-h-screen flex flex-col justify-between pt-20 sm:pt-24 pb-5 sm:pb-6 overflow-hidden select-none">
      {/* 1. Full-bleed background image with clean, natural clarity */}
      <div className="absolute inset-0 z-0">
        <img
          src={siteData.brand.heroBgImage}
          alt="Natural Wonders Landscape"
          className="w-full h-full object-cover object-center"
        />
        {/* Soft, minimal lower gradient for crisp contrast without dimming the image */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 pointer-events-none" />
      </div>

      {/* Flexible Spacer */}
      <div className="relative z-10 flex-1 min-h-[4vh] sm:min-h-[14vh]" />

      {/* 2. Hero Content Area: Shorter context text size + Compact, reliable search diagram */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mb-4 sm:mb-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-end">
          
          {/* Shorter, compact context heading */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5"
          >
            <h1 className="text-2xl sm:text-3xl lg:text-[2.25rem] font-black text-white leading-tight tracking-tight font-heading drop-shadow-[0_2px_14px_rgba(0,0,0,0.7)]">
              Uncover The<br />
              Natural Wonders.
            </h1>
          </motion.div>

          {/* Compact, short search diagram with fully accessible & clear dropdowns */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-7 flex lg:justify-end"
          >
            <div className="w-full max-w-xl bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-full p-1.5 shadow-xl border border-white/70">
              <form
                onSubmit={handleSearchSubmit}
                className="flex flex-col sm:flex-row items-stretch sm:items-center divide-y sm:divide-y-0 sm:divide-x divide-stone-100"
              >
                
                {/* 1. WHERE TO (Native accessible selector: works 100% reliably, shows all options clearly on all devices) */}
                <div className="relative w-full sm:w-[35%] px-3 py-1.5 sm:py-1 group hover:bg-orange-50/40 rounded-xl sm:rounded-l-full transition-colors">
                  <label htmlFor="where-to-select" className="block text-[9px] font-extrabold uppercase tracking-wider text-stone-400 leading-none cursor-pointer">
                    WHERE TO
                  </label>
                  <div className="relative flex items-center gap-1.5 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-[#D9622B] shrink-0 pointer-events-none" />
                    <select
                      id="where-to-select"
                      value={whereTo}
                      onChange={(e) => setWhereTo(e.target.value)}
                      aria-label="Destination"
                      className="bg-transparent font-extrabold text-[#1B3A6B] text-xs focus:outline-none cursor-pointer w-full pr-5 appearance-none truncate"
                    >
                      {destinationOptions.map((opt) => (
                        <option
                          key={opt.value}
                          value={opt.value}
                          className="bg-white text-stone-900 font-semibold py-1"
                        >
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-3 h-3 text-stone-400 absolute right-0 pointer-events-none group-hover:text-[#D9622B] transition-colors" />
                  </div>
                </div>

                {/* 2. DATE (Clean date selector) */}
                <div className="relative w-full sm:w-[26%] px-3 py-1.5 sm:py-1 group hover:bg-orange-50/40 transition-colors">
                  <label htmlFor="date-select" className="block text-[9px] font-extrabold uppercase tracking-wider text-stone-400 leading-none cursor-pointer">
                    DATE
                  </label>
                  <div className="relative flex items-center gap-1.5 mt-0.5">
                    <Calendar className="w-3.5 h-3.5 text-[#1B3A6B] shrink-0 pointer-events-none" />
                    <select
                      id="date-select"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      aria-label="Date of trip"
                      className="bg-transparent font-extrabold text-[#1B3A6B] text-xs focus:outline-none cursor-pointer w-full pr-5 appearance-none"
                    >
                      <option value="Flexible" className="bg-white text-stone-900 font-semibold">Flexible</option>
                      <option value="This Weekend" className="bg-white text-stone-900 font-semibold">This Weekend</option>
                      <option value="Next Weekend" className="bg-white text-stone-900 font-semibold">Next Weekend</option>
                      <option value="Oct 2026" className="bg-white text-stone-900 font-semibold">Oct 2026</option>
                      <option value="Nov 2026" className="bg-white text-stone-900 font-semibold">Nov 2026</option>
                      <option value="Dec 2026" className="bg-white text-stone-900 font-semibold">Dec 2026</option>
                    </select>
                    <ChevronDown className="w-3 h-3 text-stone-400 absolute right-0 pointer-events-none group-hover:text-[#1B3A6B] transition-colors" />
                  </div>
                </div>

                {/* 3. GUEST (Touch-friendly counter) */}
                <div className="w-full sm:w-[21%] px-3 py-1.5 sm:py-1 flex items-center justify-between sm:block">
                  <div>
                    <div className="text-[9px] font-extrabold uppercase tracking-wider text-stone-400 leading-none">
                      GUEST
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <Users className="w-3.5 h-3.5 text-[#1B3A6B] shrink-0" />
                      <span className="font-extrabold text-[#1B3A6B] text-xs">
                        {guests} {guests === 1 ? 'Guest' : 'Guests'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 sm:mt-0.5">
                    <button
                      type="button"
                      aria-label="Decrease guests"
                      onClick={() => setGuests(Math.max(1, guests - 1))}
                      className="w-5 h-5 rounded-full bg-stone-100 hover:bg-stone-200 active:scale-90 text-stone-700 font-bold text-[11px] flex items-center justify-center transition-all cursor-pointer"
                    >
                      -
                    </button>
                    <span className="w-3 text-center font-extrabold text-[#1B3A6B] text-[11px] sm:hidden">
                      {guests}
                    </span>
                    <button
                      type="button"
                      aria-label="Increase guests"
                      onClick={() => setGuests(Math.min(10, guests + 1))}
                      className="w-5 h-5 rounded-full bg-stone-100 hover:bg-stone-200 active:scale-90 text-stone-700 font-bold text-[11px] flex items-center justify-center transition-all cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* 4. SEARCH TRIPS Button (Compact pill button) */}
                <div className="w-full sm:w-[18%] p-0.5 sm:pl-1 mt-1 sm:mt-0">
                  <button
                    type="submit"
                    className="w-full py-2 sm:py-2.5 px-3 rounded-xl sm:rounded-full bg-[#1B3A6B] hover:bg-[#12284C] text-white font-extrabold text-[11px] uppercase tracking-wider shadow-sm active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Search className="w-3 h-3" />
                    <span>SEARCH</span>
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 3. Bottom Strip: 300+ Iconic Spots with 4 circular badges */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="text-white text-[11px] font-black tracking-tight leading-tight drop-shadow-md">
            <div>300+ Iconic</div>
            <div className="text-white/85 font-semibold text-[10px]">Spots Included</div>
          </div>
          <div className="flex items-center gap-1.5 ml-1">
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border border-white/40 bg-black/30 backdrop-blur-sm flex items-center justify-center text-white drop-shadow-sm">
              <Mountain className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </div>
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border border-white/40 bg-black/30 backdrop-blur-sm flex items-center justify-center text-white drop-shadow-sm">
              <Trees className="w-3.5 h-3.5 sm:w-3.5 sm:h-3.5" />
            </div>
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border border-white/40 bg-black/30 backdrop-blur-sm flex items-center justify-center text-white drop-shadow-sm">
              <Compass className="w-3.5 h-3.5 sm:w-3.5 sm:h-3.5" />
            </div>
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border border-white/40 bg-black/30 backdrop-blur-sm flex items-center justify-center text-white drop-shadow-sm">
              <Waves className="w-3.5 h-3.5 sm:w-3.5 sm:h-3.5" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
