import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ChevronLeft, ChevronRight, Compass } from 'lucide-react';
import { siteData, Destination } from '../data/siteData';

interface DestinationsSectionProps {
  onSelectDestination: (slug: string) => void;
  onSeeAllDestinations: () => void;
}

export const DestinationsSection: React.FC<DestinationsSectionProps> = ({
  onSelectDestination,
  onSeeAllDestinations,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const offset = direction === 'left' ? -380 : 380;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-[#F7F2E9] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B3A6B]/10 text-[#1B3A6B] text-xs font-black uppercase tracking-wider mb-2">
              <Compass className="w-3.5 h-3.5 text-[#D9622B]" />
              <span>EXPLORE THE TERRAIN</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1B3A6B] font-heading tracking-tight leading-[1.12]">
              Your Journey to the Perfect Destination Begins Here
            </h2>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {/* Carousel navigation controls */}
            <div className="hidden sm:flex items-center gap-2 mr-2">
              <button
                onClick={() => scroll('left')}
                aria-label="Previous destination"
                className="w-10 h-10 rounded-full border border-stone-300 bg-white hover:bg-stone-100 text-[#1B3A6B] flex items-center justify-center transition-colors shadow-sm cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll('right')}
                aria-label="Next destination"
                className="w-10 h-10 rounded-full border border-stone-300 bg-white hover:bg-stone-100 text-[#1B3A6B] flex items-center justify-center transition-colors shadow-sm cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* "SEE ALL DESTINATIONS →" pill button */}
            <button
              onClick={onSeeAllDestinations}
              className="px-6 py-3 rounded-full bg-[#D9622B] hover:bg-[#C35320] text-white text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-md shadow-orange-600/25 transition-all active:scale-95 cursor-pointer"
            >
              <span>SEE ALL DESTINATIONS</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Horizontal scrollable card row */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-6 pt-2 thin-scrollbar snap-x snap-mandatory"
        >
          {siteData.destinations.map((destination: Destination, index: number) => {
            return (
              <motion.div
                key={destination.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => onSelectDestination(destination.slug)}
                className="group relative flex-none w-[280px] sm:w-[320px] md:w-[360px] h-[460px] rounded-3xl overflow-hidden cursor-pointer shadow-lg card-hover-lift snap-start border border-stone-200"
              >
                {/* Background Image */}
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                />

                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-[#0A1628]/30 to-black/20" />
                <div className="absolute inset-0 bg-[#1B3A6B]/20 group-hover:bg-[#1B3A6B]/0 transition-colors" />

                {/* Top-left badge: "X PACKAGES" */}
                <div className="absolute top-5 left-5 z-10">
                  <span className="inline-block px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-[#1B3A6B] text-[11px] font-black uppercase tracking-wider shadow-sm">
                    {destination.packageCount} PACKAGES
                  </span>
                </div>

                {/* Top-right circular arrow icon */}
                <div className="absolute top-5 right-5 z-10">
                  <div className="w-10 h-10 rounded-full bg-white/90 group-hover:bg-[#D9622B] text-[#1B3A6B] group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-md">
                    <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                  </div>
                </div>

                {/* Bottom Overlay: Destination name, 1-line description, from price */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10 space-y-2">
                  <div className="text-[11px] font-bold text-orange-300 uppercase tracking-widest">
                    {destination.region}
                  </div>
                  <h3 className="text-2xl font-black text-white font-heading tracking-tight leading-tight group-hover:text-orange-200 transition-colors">
                    {destination.name}
                  </h3>
                  <p className="text-xs text-white/80 line-clamp-2 leading-relaxed font-normal">
                    {destination.shortDesc}
                  </p>

                  <div className="pt-2 flex items-center justify-between border-t border-white/20">
                    <span className="text-xs text-blue-100/90 font-medium">
                      from <strong className="text-white text-sm font-extrabold">₹{destination.startingPrice.toLocaleString()}</strong> / person
                    </span>
                    <span className="text-xs font-bold text-orange-400 group-hover:text-orange-300 inline-flex items-center gap-1">
                      <span>Explore</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
