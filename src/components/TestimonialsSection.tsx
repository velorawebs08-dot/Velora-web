import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { Star, ArrowRight, Quote, ChevronLeft, ChevronRight, MessageSquareQuote } from 'lucide-react';
import { siteData, Testimonial } from '../data/siteData';

interface TestimonialsSectionProps {
  onSelectPackage: (packageSlug: string) => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  onSelectPackage,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -380 : 380;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  // Card themes mapped to background, borders, badge styling
  const themeStyles = {
    orange: {
      cardBg: 'bg-[#FFF7ED]',
      borderColor: 'border-[#FDBA74]',
      badgeBg: 'bg-[#D9622B]',
      badgeText: 'text-white',
      accentColor: '#D9622B',
      buttonBg: 'bg-[#D9622B] hover:bg-[#C35320] text-white',
    },
    navy: {
      cardBg: 'bg-[#EFF6FF]',
      borderColor: 'border-[#93C5FD]',
      badgeBg: 'bg-[#1B3A6B]',
      badgeText: 'text-white',
      accentColor: '#1B3A6B',
      buttonBg: 'bg-[#1B3A6B] hover:bg-[#12284C] text-white',
    },
    emerald: {
      cardBg: 'bg-[#ECFDF5]',
      borderColor: 'border-[#A7F3D0]',
      badgeBg: 'bg-emerald-700',
      badgeText: 'text-white',
      accentColor: '#047857',
      buttonBg: 'bg-emerald-700 hover:bg-emerald-800 text-white',
    },
    purple: {
      cardBg: 'bg-[#FAF5FF]',
      borderColor: 'border-[#E9D5FF]',
      badgeBg: 'bg-purple-800',
      badgeText: 'text-white',
      accentColor: '#6B21A8',
      buttonBg: 'bg-purple-800 hover:bg-purple-900 text-white',
    },
  };

  return (
    <section className="py-16 sm:py-24 bg-[#FAF7F2] overflow-hidden border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading & Subheading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D9622B]/10 text-[#D9622B] text-xs font-black uppercase tracking-wider mb-2">
              <MessageSquareQuote className="w-3.5 h-3.5" />
              <span>UNFILTERED MEMORIES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1B3A6B] font-heading tracking-tight">
              Stories from the Trail!
            </h2>
            <p className="text-stone-600 text-sm sm:text-base font-medium mt-2 max-w-2xl">
              Real trips, real people, unscripted moments — straight from past batches.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => scroll('left')}
              aria-label="Previous story"
              className="w-10 h-10 rounded-full border border-stone-300 bg-white hover:bg-stone-100 text-[#1B3A6B] flex items-center justify-center transition-colors shadow-sm cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label="Next story"
              className="w-10 h-10 rounded-full border border-stone-300 bg-white hover:bg-stone-100 text-[#1B3A6B] flex items-center justify-center transition-colors shadow-sm cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Card Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-6 pt-3 thin-scrollbar snap-x snap-mandatory"
        >
          {siteData.testimonials.map((test: Testimonial, index: number) => {
            const style = themeStyles[test.cardTheme] || themeStyles.orange;
            const tiltAngles = ['-rotate-3', 'rotate-2', '-rotate-2', 'rotate-3'];
            const tilt = tiltAngles[index % tiltAngles.length];

            return (
              <motion.div
                key={test.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex-none w-[300px] sm:w-[350px] md:w-[380px] rounded-3xl p-6 sm:p-7 border-2 ${style.cardBg} ${style.borderColor} shadow-md card-hover-lift snap-start flex flex-col justify-between`}
              >
                {/* Quote Icon watermark */}
                <Quote className="absolute top-5 right-5 w-12 h-12 text-black/5 pointer-events-none" />

                <div>
                  {/* Top: Tilted photo + Name and trip */}
                  <div className="flex items-center gap-4 mb-5">
                    {/* Tilted Photo */}
                    <div className="relative shrink-0">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden p-1 bg-white shadow-md">
                        <img
                          src={test.image}
                          alt={test.name}
                          className={`w-full h-full object-cover rounded-xl ${tilt} transition-transform group-hover:rotate-0`}
                        />
                      </div>
                    </div>

                    <div>
                      {/* Name (bold caps) */}
                      <h3 className="font-heading font-black text-base tracking-wide text-[#1B3A6B]">
                        {test.name}
                      </h3>
                      {/* Trip name + date (small caps, muted) */}
                      <div className="text-[11px] font-bold uppercase tracking-wider text-stone-500 mt-0.5">
                        {test.tripName} · {test.date}
                      </div>
                    </div>
                  </div>

                  {/* 5-star rating row */}
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 stroke-amber-500" />
                    ))}
                  </div>

                  {/* Quote text (italic-style) */}
                  <p className="text-stone-700 text-sm italic font-medium leading-relaxed mb-6">
                    {test.quote}
                  </p>
                </div>

                {/* Bottom: "THEIR TRIP →" pill button */}
                <div className="pt-4 border-t border-stone-200/80 flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
                    Verified Batch Traveler
                  </span>
                  <button
                    onClick={() => onSelectPackage(test.linkedPackageSlug)}
                    className={`px-5 py-2 rounded-full ${style.buttonBg} text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-sm transition-all active:scale-95 cursor-pointer`}
                  >
                    <span>THEIR TRIP</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
