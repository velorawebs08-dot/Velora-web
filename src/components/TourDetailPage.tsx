import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Clock,
  Compass,
  Users,
  Sun,
  Star,
  MapPin,
  CheckCircle2,
  XCircle,
  Plus,
  X,
  ArrowRight,
  MessageCircle,
  Share2,
  ChevronRight,
  Calendar,
  Sparkles,
  HelpCircle,
  Bed,
  Utensils
} from 'lucide-react';
import { siteData, TourPackage, ItineraryDay } from '../data/siteData';

interface TourDetailPageProps {
  packageSlug: string;
  onNavigate: (view: string, param?: string) => void;
  onOpenEnquiry: (packageSlug?: string) => void;
  onOpenPayment: (pkg: TourPackage) => void;
}

export const TourDetailPage: React.FC<TourDetailPageProps> = ({
  packageSlug,
  onNavigate,
  onOpenEnquiry,
  onOpenPayment,
}) => {
  // Find matching package or fallback to first package
  const tour = siteData.packages.find((p) => p.slug === packageSlug) || siteData.packages[0];

  // Accordion state: D1 expanded by default (index 0 / day 1)
  const [expandedDays, setExpandedDays] = useState<number[]>([1]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);

  const toggleDay = (dayNum: number) => {
    setExpandedDays((prev) =>
      prev.includes(dayNum) ? prev.filter((d) => d !== dayNum) : [...prev, dayNum]
    );
  };

  const expandAll = () => {
    setExpandedDays(tour.itinerary.map((d) => d.day));
  };

  const collapseAll = () => {
    setExpandedDays([]);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const savingsAmount = tour.originalPrice - tour.price;

  // WhatsApp click handler
  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Hi Tripto Travels! I'm interested in the ${tour.title} (${tour.duration}). Could you share the detailed PDF itinerary and upcoming batch dates?`
    );
    window.open(`https://wa.me/${siteData.brand.whatsapp.replace('+', '')}?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#F7F2E9] pt-24 sm:pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* =========================================================================
            5.1 HEADER
           ========================================================================= */}
        <div className="space-y-4 mb-8">
          {/* Breadcrumb: DESTINATIONS / [DESTINATION] / [DURATION] ITINERARY */}
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-500 overflow-x-auto no-scrollbar">
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-[#1B3A6B] transition-colors"
            >
              HOME
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
            <button
              onClick={() => onNavigate('tours')}
              className="hover:text-[#1B3A6B] transition-colors"
            >
              DESTINATIONS
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
            <button
              onClick={() => onNavigate('tours')}
              className="hover:text-[#1B3A6B] transition-colors uppercase font-extrabold text-[#1B3A6B]"
            >
              {tour.destinationName}
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
            <span className="text-[#D9622B] shrink-0 font-extrabold">
              {tour.duration} ITINERARY
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              {/* "BESTSELLER" badge (orange, if applicable) */}
              {tour.bestseller && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D9622B] text-white text-xs font-black uppercase tracking-wider mb-2 shadow-sm">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>BESTSELLER</span>
                </div>
              )}

              {/* Large bold title */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1B3A6B] font-heading tracking-tight leading-tight">
                {tour.title}
              </h1>
            </div>

            {/* Share button */}
            <button
              onClick={handleShare}
              className="self-start md:self-auto px-4 py-2 rounded-full border border-stone-300 bg-white hover:bg-stone-50 text-stone-700 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copiedLink ? 'Link Copied!' : 'Share Itinerary'}</span>
            </button>
          </div>

          {/* Row of Info Pills: Duration | Difficulty | Group size | Best season | ⭐ Rating */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-1">
            {/* Duration */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-stone-200 text-xs font-bold text-stone-800 shadow-sm">
              <Clock className="w-3.5 h-3.5 text-[#D9622B]" />
              <span>Duration: <strong className="text-[#1B3A6B]">{tour.duration}</strong></span>
            </div>

            {/* Difficulty */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-stone-200 text-xs font-bold text-stone-800 shadow-sm">
              <Compass className="w-3.5 h-3.5 text-[#D9622B]" />
              <span>Difficulty: <strong className="text-[#1B3A6B]">{tour.difficulty}</strong></span>
            </div>

            {/* Group size */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-stone-200 text-xs font-bold text-stone-800 shadow-sm">
              <Users className="w-3.5 h-3.5 text-[#D9622B]" />
              <span>Group size: <strong className="text-[#1B3A6B]">{tour.groupSize}</strong></span>
            </div>

            {/* Best season */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-stone-200 text-xs font-bold text-stone-800 shadow-sm">
              <Sun className="w-3.5 h-3.5 text-[#D9622B]" />
              <span>Best season: <strong className="text-[#1B3A6B]">{tour.season}</strong></span>
            </div>

            {/* ⭐ Rating */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-xs font-bold text-amber-900 shadow-sm">
              <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-500" />
              <span>Rating: <strong>{tour.rating}</strong> ({tour.reviewCount} reviews)</span>
            </div>
          </div>

          {/* Full-width banner image below */}
          <div className="relative w-full h-[320px] sm:h-[460px] lg:h-[520px] rounded-3xl overflow-hidden shadow-2xl border border-stone-300 group">
            <img
              src={tour.galleryImages[activeImageIndex] || tour.heroImage}
              alt={tour.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

            {/* Starting from chip on image */}
            <div className="absolute bottom-6 left-6 z-10 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg border border-white/50 flex items-center gap-3">
              <MapPin className="w-4 h-4 text-[#D9622B]" />
              <div>
                <span className="text-[10px] uppercase font-bold text-stone-500 block">Starting Point</span>
                <span className="text-xs sm:text-sm font-extrabold text-[#1B3A6B]">{tour.startPoint}</span>
              </div>
            </div>

            {/* Image switcher thumbnail dock if gallery images exist */}
            {tour.galleryImages && tour.galleryImages.length > 0 && (
              <div className="absolute bottom-6 right-6 z-10 flex items-center gap-2 bg-black/40 backdrop-blur-md p-1.5 rounded-2xl border border-white/20">
                <button
                  onClick={() => setActiveImageIndex(0)}
                  className={`w-12 h-10 rounded-xl overflow-hidden border-2 transition-all ${
                    activeImageIndex === 0 ? 'border-[#D9622B] scale-105' : 'border-transparent opacity-70'
                  }`}
                >
                  <img src={tour.heroImage} alt="Main" className="w-full h-full object-cover" />
                </button>
                {tour.galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-12 h-10 rounded-xl overflow-hidden border-2 transition-all ${
                      activeImageIndex === idx ? 'border-[#D9622B] scale-105' : 'border-transparent opacity-70'
                    }`}
                  >
                    <img src={img} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* =========================================================================
            5.2 BODY (TWO-COLUMN LAYOUT)
           ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* =======================================================================
              LEFT COLUMN
             ======================================================================= */}
          <div className="lg:col-span-8 space-y-10">
            {/* 1. "THE TRIP IN ONE BREATH" */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-stone-200/90 space-y-3">
              <span className="text-xs font-black uppercase tracking-widest text-[#D9622B] px-3 py-1 rounded-full bg-orange-50 border border-orange-200 inline-block">
                THE TRIP IN ONE BREATH
              </span>
              <p className="text-stone-700 text-base sm:text-lg leading-relaxed font-medium">
                {tour.summary}
              </p>
            </div>

            {/* 2. HIGHLIGHTS LIST */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-stone-200/90 space-y-5">
              <h2 className="text-2xl font-black text-[#1B3A6B] font-heading tracking-tight">
                Trip Highlights
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {tour.highlights.map((highlight, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#F7F2E9]/60 border border-stone-200/70 text-sm font-semibold text-stone-800"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#D9622B]/10 text-[#D9622B] flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. "DAY-BY-DAY PLAN" — Expandable/Accordion list */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-stone-200/90 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-stone-100">
                <div>
                  <span className="text-xs font-black uppercase tracking-widest text-[#D9622B] px-3 py-1 rounded-full bg-orange-50 border border-orange-200 inline-block mb-1.5">
                    DAY-BY-DAY PLAN
                  </span>
                  <h2 className="text-2xl font-black text-[#1B3A6B] font-heading tracking-tight">
                    Full Expedition Itinerary
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={expandAll}
                    className="text-xs font-bold text-[#1B3A6B] hover:text-[#D9622B] px-3 py-1.5 rounded-lg bg-stone-100 transition-colors"
                  >
                    Expand All
                  </button>
                  <button
                    onClick={collapseAll}
                    className="text-xs font-bold text-stone-500 hover:text-stone-800 px-3 py-1.5 rounded-lg bg-stone-100 transition-colors"
                  >
                    Collapse
                  </button>
                </div>
              </div>

              {/* Accordion container with vertical dotted line */}
              <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:top-4 before:bottom-4 before:left-[19px] sm:before:left-[27px] before:w-[2px] before:border-l-2 before:border-dotted before:border-[#D9622B]/60">
                {tour.itinerary.map((day: ItineraryDay) => {
                  const isExpanded = expandedDays.includes(day.day);

                  return (
                    <div key={day.day} className="relative group">
                      {/* Circular Day Badge (D1, D2...) */}
                      <button
                        onClick={() => toggleDay(day.day)}
                        aria-label={`Toggle Day ${day.day}`}
                        className={`absolute -left-6 sm:-left-8 top-1 w-9 h-9 sm:w-11 sm:h-11 rounded-full font-black text-xs sm:text-sm flex items-center justify-center transition-all z-10 shadow-sm cursor-pointer ${
                          isExpanded
                            ? 'bg-[#D9622B] text-white ring-4 ring-orange-100'
                            : 'bg-white border-2 border-[#1B3A6B] text-[#1B3A6B] hover:bg-stone-50'
                        }`}
                      >
                        D{day.day}
                      </button>

                      {/* Day Card */}
                      <div
                        className={`rounded-2xl border transition-all ${
                          isExpanded
                            ? 'bg-[#FAF8F5] border-orange-200/80 shadow-sm p-4 sm:p-5'
                            : 'bg-white border-stone-200 hover:border-stone-300 p-4'
                        }`}
                      >
                        {/* Day Title & Toggle trigger */}
                        <div
                          onClick={() => toggleDay(day.day)}
                          className="flex items-center justify-between gap-3 cursor-pointer select-none"
                        >
                          <div className="space-y-0.5">
                            <span className="text-[11px] font-black uppercase tracking-wider text-[#D9622B]">
                              Day 0{day.day}
                            </span>
                            <h3 className="font-heading font-black text-base sm:text-lg text-[#1B3A6B]">
                              {day.title}
                            </h3>
                          </div>

                          {/* Plus / X icon */}
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                              isExpanded
                                ? 'bg-[#D9622B] text-white'
                                : 'bg-stone-100 group-hover:bg-stone-200 text-stone-600'
                            }`}
                          >
                            {isExpanded ? (
                              <X className="w-4 h-4 stroke-[2.5]" />
                            ) : (
                              <Plus className="w-4 h-4 stroke-[2.5]" />
                            )}
                          </div>
                        </div>

                        {/* Collapsible description */}
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.25 }}
                              className="overflow-hidden"
                            >
                              <div className="pt-3 border-t border-stone-200/60 mt-3 space-y-3">
                                <p className="text-stone-700 text-sm leading-relaxed font-normal">
                                  {day.description}
                                </p>

                                {/* Day Meta: Meals & Stay */}
                                {(day.meals || day.stay) && (
                                  <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-semibold text-stone-600">
                                    {day.meals && (
                                      <div className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-full border border-stone-200">
                                        <Utensils className="w-3.5 h-3.5 text-[#D9622B]" />
                                        <span>{day.meals}</span>
                                      </div>
                                    )}
                                    {day.stay && (
                                      <div className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-full border border-stone-200">
                                        <Bed className="w-3.5 h-3.5 text-[#1B3A6B]" />
                                        <span>Stay: {day.stay}</span>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 4. INCLUSIONS & EXCLUSIONS */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-stone-200/90 space-y-6">
              <h2 className="text-2xl font-black text-[#1B3A6B] font-heading tracking-tight">
                What&apos;s Covered &amp; What&apos;s Not
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Inclusions */}
                <div className="bg-emerald-50/50 rounded-2xl p-5 border border-emerald-200/70 space-y-3">
                  <div className="flex items-center gap-2 text-emerald-800 font-black text-sm uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Inclusions</span>
                  </div>
                  <ul className="space-y-2.5">
                    {tour.inclusions.map((inc, i) => (
                      <li key={i} className="text-xs sm:text-sm text-stone-700 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Exclusions */}
                <div className="bg-rose-50/50 rounded-2xl p-5 border border-rose-200/70 space-y-3">
                  <div className="flex items-center gap-2 text-rose-800 font-black text-sm uppercase tracking-wider">
                    <XCircle className="w-4 h-4 text-rose-600" />
                    <span>Exclusions</span>
                  </div>
                  <ul className="space-y-2.5">
                    {tour.exclusions.map((exc, i) => (
                      <li key={i} className="text-xs sm:text-sm text-stone-700 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
                        <span>{exc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* =======================================================================
              RIGHT COLUMN (STICKY SIDEBAR CARD)
             ======================================================================= */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-4">
            <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-xl border-2 border-stone-200 relative overflow-hidden">
              {/* Decorative accent top strip */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#1B3A6B] via-[#D9622B] to-[#1B3A6B]" />

              {/* "STARTS FROM" label + Big price + Strikethrough + "save ₹X" badge */}
              <div className="space-y-1 pb-5 border-b border-stone-100">
                <span className="text-[11px] font-black uppercase tracking-wider text-stone-400">
                  STARTS FROM
                </span>
                <div className="flex items-baseline gap-2.5 flex-wrap">
                  <span className="text-3xl sm:text-4xl font-black text-[#1B3A6B] font-heading">
                    ₹{tour.price.toLocaleString()}
                  </span>
                  <span className="text-xs font-bold text-stone-500">/ person</span>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <span className="text-xs text-stone-400 line-through font-semibold">
                    ₹{tour.originalPrice.toLocaleString()}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[11px] font-black">
                    SAVE ₹{savingsAmount.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Detail Rows: Duration | Group size | Difficulty | Best season | Starts at | Ends at */}
              <div className="py-4 space-y-3 text-xs border-b border-stone-100">
                <div className="flex items-center justify-between">
                  <span className="text-stone-500 font-semibold">Duration:</span>
                  <span className="font-extrabold text-[#1B3A6B]">{tour.duration}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-500 font-semibold">Group Size:</span>
                  <span className="font-extrabold text-[#1B3A6B]">{tour.groupSize}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-500 font-semibold">Difficulty:</span>
                  <span className="font-extrabold text-[#1B3A6B]">{tour.difficulty}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-500 font-semibold">Best Season:</span>
                  <span className="font-extrabold text-[#1B3A6B]">{tour.season}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-500 font-semibold">Starts at:</span>
                  <span className="font-extrabold text-[#1B3A6B] truncate max-w-[160px] text-right" title={tour.startPoint}>
                    {tour.startPoint}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-500 font-semibold">Ends at:</span>
                  <span className="font-extrabold text-[#1B3A6B] truncate max-w-[160px] text-right" title={tour.endPoint}>
                    {tour.endPoint}
                  </span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="pt-5 space-y-3">
                {/* "ENQUIRE NOW →" button (orange, filled) */}
                <button
                  onClick={() => onOpenEnquiry(tour.slug)}
                  className="w-full py-4 px-6 rounded-full bg-[#D9622B] hover:bg-[#C35320] text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-orange-600/30 transition-all active:scale-[0.99] cursor-pointer"
                >
                  <span>ENQUIRE NOW</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* "WHATSAPP US" button (outline) */}
                <button
                  onClick={handleWhatsApp}
                  className="w-full py-3.5 px-6 rounded-full border-2 border-[#1B3A6B] hover:bg-[#1B3A6B] text-[#1B3A6B] hover:text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>WHATSAPP US</span>
                </button>

                {/* Small text: "Free consultation · No advance needed to enquire" */}
                <div className="text-center text-[11px] text-stone-500 font-medium pt-1">
                  Free consultation · No advance needed to enquire
                </div>

                {/* Link: "Already confirmed with your captain? Pay for your trip →" */}
                <div className="pt-2 text-center border-t border-stone-100">
                  <button
                    onClick={() => onOpenPayment(tour)}
                    className="text-xs font-black text-[#1B3A6B] hover:text-[#D9622B] transition-colors inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>Already confirmed with your captain? Pay for your trip</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* Upcoming Batches Quick Card */}
            <div className="bg-[#FAF8F5] rounded-3xl p-5 border border-stone-200 space-y-3">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#1B3A6B]">
                <Calendar className="w-4 h-4 text-[#D9622B]" />
                <span>Upcoming Group Departures</span>
              </div>
              <div className="space-y-2">
                {siteData.departures
                  .filter((d) => d.linkedPackageSlug === tour.slug)
                  .map((dep) => (
                    <div
                      key={dep.id}
                      onClick={() => onOpenEnquiry(tour.slug)}
                      className="p-2.5 rounded-xl bg-white border border-stone-200 hover:border-orange-300 flex items-center justify-between text-xs cursor-pointer transition-colors"
                    >
                      <div className="font-extrabold text-[#1B3A6B]">{dep.displayDate}</div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-100 text-[#D9622B]">
                          {dep.seatsLeft} seats left
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
