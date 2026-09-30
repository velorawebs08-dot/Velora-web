import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import {
  Compass,
  Clock,
  Star,
  MapPin,
  ArrowRight,
  Filter,
  CheckCircle2,
  SlidersHorizontal,
  Sparkles
} from 'lucide-react';
import { siteData, TourPackage } from '../data/siteData';

interface AllToursPageProps {
  onSelectPackage: (slug: string) => void;
  onOpenEnquiry: (slug?: string) => void;
}

export const AllToursPage: React.FC<AllToursPageProps> = ({
  onSelectPackage,
  onOpenEnquiry,
}) => {
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');

  const regions = ['All', 'Western Ghats', 'Lonavala & Pune', 'Konkan Coast', 'Satara'];
  const difficulties = ['All', 'Easy', 'Moderate', 'Challenging'];

  const filteredPackages = useMemo(() => {
    return siteData.packages.filter((pkg) => {
      const matchRegion =
        selectedRegion === 'All' ||
        (selectedRegion === 'Western Ghats' && (pkg.destinationSlug === 'harishchandragad' || pkg.destinationSlug === 'kalsubai')) ||
        (selectedRegion === 'Lonavala & Pune' && (pkg.destinationSlug === 'rajmachi' || pkg.destinationSlug === 'rajgad-torna')) ||
        (selectedRegion === 'Konkan Coast' && pkg.destinationSlug === 'tarkarli-konkan') ||
        (selectedRegion === 'Satara' && pkg.destinationSlug === 'kaas-plateau');

      const matchDiff =
        selectedDifficulty === 'All' || pkg.difficulty.includes(selectedDifficulty);

      return matchRegion && matchDiff;
    });
  }, [selectedRegion, selectedDifficulty]);

  return (
    <div className="min-h-screen bg-[#F7F2E9] pt-24 sm:pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B3A6B]/10 text-[#1B3A6B] text-xs font-black uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5 text-[#D9622B]" />
            <span>ALL DESTINATIONS & CIRCUITS</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#1B3A6B] font-heading tracking-tight leading-tight">
            Curated Expeditions for Discerning Travelers
          </h1>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Every itinerary is personally mapped, vetted, and led by our expedition captains. Pick your terrain and pack your bags.
          </p>
        </div>

        {/* Filters Strip */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-sm border border-stone-200 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-stone-500">
            <SlidersHorizontal className="w-4 h-4 text-[#D9622B]" />
            <span>Filter Expeditions:</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Region Filter */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <span className="text-xs text-stone-400 font-bold mr-1">Region:</span>
              {regions.map((r) => (
                <button
                  key={r}
                  onClick={() => setSelectedRegion(r)}
                  className={`text-xs px-3.5 py-1.5 rounded-full font-extrabold transition-all cursor-pointer ${
                    selectedRegion === r
                      ? 'bg-[#1B3A6B] text-white shadow-sm'
                      : 'bg-[#F7F2E9] text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>

            {/* Difficulty Filter */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <span className="text-xs text-stone-400 font-bold mr-1">Difficulty:</span>
              {difficulties.map((d) => (
                <button
                  key={d}
                  onClick={() => setSelectedDifficulty(d)}
                  className={`text-xs px-3.5 py-1.5 rounded-full font-extrabold transition-all cursor-pointer ${
                    selectedDifficulty === d
                      ? 'bg-[#D9622B] text-white shadow-sm'
                      : 'bg-[#F7F2E9] text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredPackages.map((pkg: TourPackage) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group bg-white rounded-3xl overflow-hidden border border-stone-200/90 shadow-md card-hover-lift flex flex-col justify-between"
            >
              <div>
                {/* Image Banner */}
                <div
                  onClick={() => onSelectPackage(pkg.slug)}
                  className="relative h-60 overflow-hidden cursor-pointer"
                >
                  <img
                    src={pkg.heroImage}
                    alt={pkg.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#1B3A6B] text-[10px] font-black uppercase tracking-wider shadow-sm">
                      {pkg.destinationName}
                    </span>
                    {pkg.bestseller && (
                      <span className="px-3 py-1 rounded-full bg-[#D9622B] text-white text-[10px] font-black uppercase tracking-wider shadow-sm">
                        BESTSELLER
                      </span>
                    )}
                  </div>

                  {/* Rating badge */}
                  <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-white flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-500" />
                    <span>{pkg.rating} ({pkg.reviewCount})</span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-3 text-xs text-stone-500 font-semibold">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#D9622B]" /> {pkg.duration}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Compass className="w-3.5 h-3.5 text-[#1B3A6B]" /> {pkg.difficulty}
                    </span>
                  </div>

                  <h3
                    onClick={() => onSelectPackage(pkg.slug)}
                    className="font-heading font-black text-xl text-[#1B3A6B] group-hover:text-[#D9622B] transition-colors cursor-pointer leading-snug line-clamp-2"
                  >
                    {pkg.title}
                  </h3>

                  <p className="text-stone-600 text-xs line-clamp-2 leading-relaxed">
                    {pkg.summary}
                  </p>
                </div>
              </div>

              {/* Bottom Footer */}
              <div className="p-6 pt-0">
                <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-stone-400 block">
                      Starts from
                    </span>
                    <span className="text-xl font-black text-[#1B3A6B]">
                      ₹{pkg.price.toLocaleString()}
                    </span>
                  </div>

                  <button
                    onClick={() => onSelectPackage(pkg.slug)}
                    className="px-5 py-2.5 rounded-full bg-[#D9622B] hover:bg-[#C35320] text-white text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-orange-600/25 transition-all active:scale-95 cursor-pointer"
                  >
                    <span>VIEW TOUR</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
