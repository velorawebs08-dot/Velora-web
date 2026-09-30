import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Compass, Shield, Heart, Award, ArrowRight } from 'lucide-react';
import { siteData } from '../data/siteData';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenEnquiry: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({
  isOpen,
  onClose,
  onOpenEnquiry,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#0F1E36]/80 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 border border-stone-200"
        >
          {/* Header */}
          <div className="relative bg-[#1B3A6B] text-white p-8 overflow-hidden">
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
            <button
              onClick={onClose}
              aria-label="Close about modal"
              className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </button>
            <span className="text-xs font-black uppercase tracking-widest text-[#D9622B] px-3 py-1 rounded-full bg-white/10 inline-block mb-3">
              ABOUT TRIPTO TRAVELS
            </span>
            <h2 className="text-3xl sm:text-4xl font-black font-heading tracking-tight leading-tight">
              We Plan Weekend Trips That Turn Strangers Into Trek Buddies.
            </h2>
            <p className="text-blue-100/90 text-sm mt-2 max-w-xl">
              We started Tripto Travels because we were tired of boring, rushed bus tours. We lead small, friendly group treks across Maharashtra’s majestic Sahyadri forts, scenic waterfalls, and coastal Konkan backwaters.
            </p>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8 space-y-8 max-h-[70vh] overflow-y-auto">
            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="p-4 rounded-2xl bg-[#F7F2E9] border border-stone-200">
                <div className="text-2xl sm:text-3xl font-black text-[#1B3A6B]">{siteData.brand.stats.travelers}</div>
                <div className="text-xs font-semibold text-gray-500 uppercase mt-1">Happy Wanderers</div>
              </div>
              <div className="p-4 rounded-2xl bg-[#F7F2E9] border border-stone-200">
                <div className="text-2xl sm:text-3xl font-black text-[#D9622B]">{siteData.brand.stats.tripsCompleted}</div>
                <div className="text-xs font-semibold text-gray-500 uppercase mt-1">Trips Led</div>
              </div>
              <div className="p-4 rounded-2xl bg-[#F7F2E9] border border-stone-200">
                <div className="text-2xl sm:text-3xl font-black text-[#1B3A6B]">{siteData.brand.stats.avgRating}</div>
                <div className="text-xs font-semibold text-gray-500 uppercase mt-1">Average Rating</div>
              </div>
              <div className="p-4 rounded-2xl bg-[#F7F2E9] border border-stone-200">
                <div className="text-2xl sm:text-3xl font-black text-[#D9622B]">{siteData.brand.stats.iconicSpots}</div>
                <div className="text-xs font-semibold text-gray-500 uppercase mt-1">Hidden Spots</div>
              </div>
            </div>

            {/* Core Pillars */}
            <div className="space-y-4">
              <h3 className="text-xl font-black text-[#1B3A6B] font-heading">
                The Tripto Expedition Standard
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200/90 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 text-[#D9622B] flex items-center justify-center">
                    <Compass className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-[#1B3A6B] text-sm">Real Captains, No Guides</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Every trip is anchored by a certified Tripto Captain — an experienced wilderness leader, storyteller, and community builder.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200/90 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#1B3A6B] flex items-center justify-center">
                    <Shield className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-[#1B3A6B] text-sm">Uncompromising Safety</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    From portable oxygen cylinders on high passes to verified local van drivers and 24/7 operations room tracking.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200/90 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <Heart className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-[#1B3A6B] text-sm">Solo Traveler Friendly</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Over 70% join solo. No single supplements in group sharing, respectful community standards, and zero drama.
                  </p>
                </div>
              </div>
            </div>

            {/* Captain note & CTA */}
            <div className="p-6 rounded-2xl bg-[#1B3A6B]/5 border border-[#1B3A6B]/15 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-[#1B3A6B] uppercase">
                  <Award className="w-4 h-4 text-[#D9622B]" /> Handcrafted itineraries since 2021
                </div>
                <h4 className="font-extrabold text-[#1B3A6B] text-lg">
                  Ready to leave ordinary weekends behind?
                </h4>
                <p className="text-xs text-gray-600">
                  Speak to one of our founders or captains right away.
                </p>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onOpenEnquiry();
                }}
                className="shrink-0 px-6 py-3 rounded-full bg-[#D9622B] hover:bg-[#C35320] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>ENQUIRE WITH CAPTAIN</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
