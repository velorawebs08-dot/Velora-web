import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, MapPin, Calendar, Clock, Star, ArrowRight } from 'lucide-react';
import { siteData, TourPackage } from '../data/siteData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPackage: (slug: string) => void;
  initialQuery?: string;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectPackage,
  initialQuery = '',
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [categoryFilter, setCategoryFilter] = useState('All');

  React.useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
    }
  }, [initialQuery]);

  const categories = ['All', 'Fortress Treks', 'Konkan Coast', 'Sunrise & Night', 'UNESCO Heritage'];

  const results = useMemo(() => {
    return siteData.packages.filter((pkg) => {
      const matchQuery =
        !query.trim() ||
        pkg.title.toLowerCase().includes(query.toLowerCase()) ||
        pkg.destinationName.toLowerCase().includes(query.toLowerCase()) ||
        pkg.summary.toLowerCase().includes(query.toLowerCase()) ||
        pkg.highlights.some(h => h.toLowerCase().includes(query.toLowerCase()));

      let matchCategory = true;
      if (categoryFilter === 'Fortress Treks') {
        matchCategory = pkg.destinationSlug === 'harishchandragad' || pkg.destinationSlug === 'rajmachi' || pkg.destinationSlug === 'rajgad-torna';
      } else if (categoryFilter === 'Konkan Coast') {
        matchCategory = pkg.destinationSlug === 'tarkarli-konkan';
      } else if (categoryFilter === 'Sunrise & Night') {
        matchCategory = pkg.destinationSlug === 'kalsubai' || pkg.destinationSlug === 'harishchandragad';
      } else if (categoryFilter === 'UNESCO Heritage') {
        matchCategory = pkg.destinationSlug === 'kaas-plateau' || pkg.destinationSlug === 'harishchandragad';
      }

      return matchQuery && matchCategory;
    });
  }, [query, categoryFilter]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 sm:pt-20 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#0F1E36]/80 backdrop-blur-md"
        />

        {/* Search Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 border border-stone-200"
        >
          {/* Top Search Input Bar */}
          <div className="p-4 sm:p-6 border-b border-stone-200 bg-[#F7F2E9]/60 flex items-center gap-3">
            <Search className="w-6 h-6 text-[#D9622B] shrink-0" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by destination (e.g. Bali, Spiti, Meghalaya) or activity..."
              className="w-full bg-transparent text-lg sm:text-xl font-bold text-[#1B3A6B] placeholder-gray-400 focus:outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="text-gray-400 hover:text-gray-600 p-1"
                aria-label="Clear search input"
              >
                <X className="w-5 h-5" />
              </button>
            )}
            <button
              onClick={onClose}
              aria-label="Close search"
              className="ml-2 w-9 h-9 rounded-full bg-gray-200/80 hover:bg-gray-300 flex items-center justify-center text-gray-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Category Quick Tags */}
          <div className="px-6 py-3 bg-white border-b border-stone-100 flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider shrink-0 mr-1">
              Filter:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`text-xs px-3.5 py-1.5 rounded-full font-bold transition-all shrink-0 cursor-pointer ${
                  categoryFilter === cat
                    ? 'bg-[#1B3A6B] text-white shadow-sm'
                    : 'bg-[#F7F2E9] text-gray-600 hover:bg-stone-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Results List */}
          <div className="p-4 sm:p-6 max-h-[60vh] overflow-y-auto space-y-3">
            {results.length === 0 ? (
              <div className="text-center py-12 space-y-2">
                <p className="text-lg font-bold text-[#1B3A6B]">No matching trips found</p>
                <p className="text-sm text-gray-500">
                  Try searching for &quot;Bali&quot;, &quot;Spiti&quot;, &quot;Meghalaya&quot;, &quot;Vietnam&quot;, or &quot;Trek&quot;.
                </p>
              </div>
            ) : (
              results.map((pkg: TourPackage) => (
                <div
                  key={pkg.id}
                  onClick={() => {
                    onSelectPackage(pkg.slug);
                    onClose();
                  }}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 rounded-2xl bg-[#FAF8F5] hover:bg-orange-50/60 border border-stone-200/80 hover:border-orange-300 transition-all cursor-pointer group gap-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={pkg.heroImage}
                      alt={pkg.title}
                      className="w-20 h-20 sm:w-24 sm:h-20 rounded-xl object-cover shrink-0 group-hover:scale-105 transition-transform"
                    />
                    <div>
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-[#1B3A6B]/10 text-[#1B3A6B]">
                          {pkg.destinationName}
                        </span>
                        {pkg.bestseller && (
                          <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-[#D9622B] text-white">
                            BESTSELLER
                          </span>
                        )}
                        <span className="text-xs text-amber-500 flex items-center font-bold">
                          <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-500 inline mr-0.5" />
                          {pkg.rating}
                        </span>
                      </div>
                      <h4 className="font-extrabold text-[#1B3A6B] text-base group-hover:text-[#D9622B] transition-colors leading-snug">
                        {pkg.title}
                      </h4>
                      <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-gray-400" /> {pkg.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-gray-400" /> {pkg.startPoint.split(',')[0]}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto shrink-0 pt-2 sm:pt-0 border-t sm:border-0 border-stone-200">
                    <div className="text-left sm:text-right">
                      <span className="text-[11px] uppercase tracking-wider text-gray-400 font-bold block">
                        Starts from
                      </span>
                      <span className="text-lg font-black text-[#D9622B]">
                        ₹{pkg.price.toLocaleString()}
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-[#1B3A6B] group-hover:text-[#D9622B] transition-colors">
                      <span>View Tour</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
