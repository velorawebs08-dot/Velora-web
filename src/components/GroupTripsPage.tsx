import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Calendar,
  Users,
  Clock,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  MapPin,
  ChevronRight,
  Filter
} from 'lucide-react';
import { siteData, FixedDeparture } from '../data/siteData';

interface GroupTripsPageProps {
  onSelectPackage: (slug: string) => void;
  onOpenEnquiry: (slug?: string) => void;
}

export const GroupTripsPage: React.FC<GroupTripsPageProps> = ({
  onSelectPackage,
  onOpenEnquiry,
}) => {
  const [selectedMonth, setSelectedMonth] = useState('All');

  const months = ['All', 'OCTOBER 2026', 'NOVEMBER 2026', 'DECEMBER 2026'];

  const filteredDepartures = siteData.departures.filter((dep) => {
    return selectedMonth === 'All' || dep.monthCategory === selectedMonth;
  });

  return (
    <div className="min-h-screen bg-[#F7F2E9] pt-24 sm:pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D9622B]/10 text-[#D9622B] text-xs font-black uppercase tracking-wider">
            <Calendar className="w-3.5 h-3.5" />
            <span>FIXED DEPARTURE CALENDAR</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#1B3A6B] font-heading tracking-tight leading-tight">
            Upcoming Group Trips &amp; Fixed Departures
          </h1>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Lock your seat in confirmed batches. Over 70% of travelers join solo — travel with like-minded explorers under certified expedition captain guidance.
          </p>
        </div>

        {/* Month Filter Tabs */}
        <div className="flex items-center justify-center gap-2 mb-8 overflow-x-auto no-scrollbar pb-2">
          {months.map((m) => (
            <button
              key={m}
              onClick={() => setSelectedMonth(m)}
              className={`px-5 py-2.5 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                selectedMonth === m
                  ? 'bg-[#1B3A6B] text-white shadow-md'
                  : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-100'
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        {/* Departures Grid / Cards */}
        <div className="space-y-4 max-w-4xl mx-auto">
          {filteredDepartures.map((dep: FixedDeparture) => {
            const pkg = siteData.packages.find((p) => p.slug === dep.linkedPackageSlug);

            return (
              <motion.div
                key={dep.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl p-4 sm:p-6 border border-stone-200/90 shadow-sm card-hover-lift flex flex-col sm:flex-row sm:items-center justify-between gap-5"
              >
                {/* Left side: Thumbnail + Date badge + Title */}
                <div
                  onClick={() => onSelectPackage(dep.linkedPackageSlug)}
                  className="flex items-center gap-4 cursor-pointer group flex-1"
                >
                  <img
                    src={dep.thumbnail}
                    alt={dep.destinationName}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover group-hover:scale-105 transition-transform shrink-0"
                  />

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs sm:text-sm font-black text-[#D9622B] uppercase tracking-wider">
                        {dep.displayDate}
                      </span>
                      {dep.status && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-orange-100 text-[#D9622B]">
                          {dep.status} ({dep.seatsLeft} left)
                        </span>
                      )}
                    </div>

                    <h3 className="font-heading font-black text-base sm:text-xl text-[#1B3A6B] group-hover:text-[#D9622B] transition-colors leading-tight">
                      {dep.destinationName}
                    </h3>

                    {pkg && (
                      <div className="flex items-center gap-3 text-xs text-stone-500 font-medium">
                        <span>{pkg.duration}</span>
                        <span>•</span>
                        <span>{pkg.difficulty}</span>
                        <span>•</span>
                        <span>{pkg.startPoint.split(',')[0]}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right side: Price + CTA */}
                <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-stone-100">
                  <div className="text-left sm:text-right">
                    <span className="text-[10px] uppercase font-bold text-stone-400 block">
                      Price / Person
                    </span>
                    <span className="text-xl sm:text-2xl font-black text-[#1B3A6B]">
                      ₹{dep.price.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSelectPackage(dep.linkedPackageSlug)}
                      className="px-4 py-2.5 rounded-full border-2 border-[#1B3A6B] text-[#1B3A6B] hover:bg-[#1B3A6B] hover:text-white text-xs font-black uppercase tracking-wider transition-all cursor-pointer"
                    >
                      ITINERARY
                    </button>

                    <button
                      onClick={() => onOpenEnquiry(dep.linkedPackageSlug)}
                      className="px-5 py-2.5 rounded-full bg-[#D9622B] hover:bg-[#C35320] text-white text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-orange-600/25 transition-all active:scale-95 cursor-pointer"
                    >
                      <span>BOOK SEAT</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Solo Traveler Assurance banner */}
        <div className="mt-12 bg-white rounded-3xl p-6 sm:p-8 max-w-4xl mx-auto border border-stone-200/90 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 text-[#D9622B] flex items-center justify-center shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-heading font-black text-lg text-[#1B3A6B]">
                Traveling Solo? You&apos;re in Great Company.
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm mt-1 max-w-md">
                We pair solo explorers with roommates of the same gender so there are no single supplements. Make friends before day one in the pre-trip WhatsApp crew group.
              </p>
            </div>
          </div>

          <button
            onClick={() => onOpenEnquiry()}
            className="shrink-0 px-6 py-3 rounded-full bg-[#1B3A6B] hover:bg-[#12284C] text-white text-xs font-black uppercase tracking-wider shadow-md cursor-pointer"
          >
            TALK TO A CAPTAIN
          </button>
        </div>
      </div>
    </div>
  );
};
