import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Phone,
  Mail,
  Copy,
  Check,
  Calendar,
  Send,
  ArrowRight,
  Clock,
  Sparkles,
  MapPin,
  CheckCircle2
} from 'lucide-react';
import { siteData, FixedDeparture } from '../data/siteData';

interface ContactPageProps {
  onSelectPackage: (packageSlug: string) => void;
  onViewAllDates: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  onSelectPackage,
  onViewAllDates,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  // Group departures by month category
  const departuresByMonth = siteData.departures.reduce((acc, dep) => {
    if (!acc[dep.monthCategory]) {
      acc[dep.monthCategory] = [];
    }
    acc[dep.monthCategory].push(dep);
    return acc;
  }, {} as Record<string, FixedDeparture[]>);

  return (
    <div className="min-h-screen bg-[#F7F2E9] pt-24 sm:pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* =======================================================================
              LEFT COLUMN: CONTACT FORM & INFO
             ======================================================================= */}
          <div className="lg:col-span-7 space-y-8">
            {/* Heading + Intro text */}
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B3A6B]/10 text-[#1B3A6B] text-xs font-black uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#D9622B]" />
                <span>EXPEDITION CONCIERGE</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black text-[#1B3A6B] font-heading tracking-tight leading-tight">
                HELLO — TALK TRIP[S]
              </h1>
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                Confirmed idea? Fixed dates but no travel buddy? Or just staring at mountain wallpapers wondering when to break routine? Drop us a line. We reply fast, skip corporate scripts, and talk travel truth.
              </p>
            </div>

            {/* Contact info blocks: Call Us + Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Call Us block */}
              <div className="bg-white rounded-3xl p-5 border border-stone-200/90 shadow-sm space-y-2">
                <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[#1B3A6B] flex items-center justify-center">
                  <Phone className="w-5 h-5 text-[#D9622B]" />
                </div>
                <div className="text-xs font-black uppercase tracking-wider text-stone-400">
                  Call or WhatsApp Us
                </div>
                <a
                  href={`tel:${siteData.brand.phone.replace(/\s+/g, '')}`}
                  className="text-base font-extrabold text-[#1B3A6B] hover:text-[#D9622B] transition-colors block"
                >
                  {siteData.brand.displayPhone}
                </a>
                <div className="flex items-center gap-1.5 text-xs text-stone-500 font-medium">
                  <Clock className="w-3.5 h-3.5 text-stone-400" />
                  <span>{siteData.brand.supportHours}</span>
                </div>
              </div>

              {/* Email block with copy button */}
              <div className="bg-white rounded-3xl p-5 border border-stone-200/90 shadow-sm space-y-2">
                <div className="w-10 h-10 rounded-2xl bg-orange-50 text-[#D9622B] flex items-center justify-center">
                  <Mail className="w-5 h-5 text-[#D9622B]" />
                </div>
                <div className="text-xs font-black uppercase tracking-wider text-stone-400">
                  Email the Team
                </div>
                <div className="flex items-center justify-between">
                  <a
                    href={`mailto:${siteData.brand.email}`}
                    className="text-sm font-extrabold text-[#1B3A6B] hover:text-[#D9622B] transition-colors truncate"
                  >
                    {siteData.brand.email}
                  </a>
                  <button
                    onClick={() => copyToClipboard(siteData.brand.email)}
                    title="Copy email to clipboard"
                    className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <div className="text-xs text-stone-500 font-medium">
                  Average reply time: under 30 minutes
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm">
              <h2 className="text-xl font-black text-[#1B3A6B] font-heading tracking-tight mb-4">
                Leave a Note for the Captain
              </h2>

              {isSubmitted ? (
                <div className="text-center py-8 space-y-3">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-black text-[#1B3A6B]">
                    Message Sent Smoothly!
                  </h3>
                  <p className="text-sm text-stone-600 max-w-sm mx-auto">
                    Thanks, {formData.name || 'friend'}. We have routed your notes to our route captains and will get in touch on {formData.phone || 'WhatsApp'}.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ name: '', email: '', phone: '', message: '' });
                    }}
                    className="mt-4 px-6 py-2 rounded-full bg-stone-100 text-stone-700 text-xs font-bold uppercase tracking-wider hover:bg-stone-200 transition-colors"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Siddharth"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-[#F7F2E9] border border-stone-200 rounded-2xl px-4 py-3 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#D9622B]"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                        WhatsApp / Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-[#F7F2E9] border border-stone-200 rounded-2xl px-4 py-3 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#D9622B]"
                      />
                    </div>
                  </div>

                  {/* Email (optional) */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. siddharth@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#F7F2E9] border border-stone-200 rounded-2xl px-4 py-3 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#D9622B]"
                    />
                  </div>

                  {/* Message/Notes field */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                      Message / Notes *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Which destination are you eyeing? How many people? Any fixed dates in mind?"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-[#F7F2E9] border border-stone-200 rounded-2xl px-4 py-3 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#D9622B] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 rounded-full bg-[#D9622B] hover:bg-[#C35320] text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-orange-600/25 transition-all cursor-pointer disabled:opacity-70 active:scale-[0.99]"
                  >
                    {isSubmitting ? (
                      <span>Sending note...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>SEND MESSAGE TO CAPTAIN →</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Office Address Card */}
            <div className="p-4 rounded-2xl bg-white border border-stone-200 flex items-center gap-3 text-xs text-stone-600">
              <MapPin className="w-4 h-4 text-[#D9622B] shrink-0" />
              <span>{siteData.brand.address}</span>
            </div>
          </div>

          {/* =======================================================================
              RIGHT PANEL: "NEXT FIXED DEPARTURES" CARD
             ======================================================================= */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-stone-200 shadow-xl space-y-6">
              {/* Header with "ALL DATES →" link top-right */}
              <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                <div>
                  <div className="text-[11px] font-black uppercase tracking-wider text-[#D9622B]">
                    SCHEDULED BATCHES
                  </div>
                  <h3 className="text-xl font-black text-[#1B3A6B] font-heading tracking-tight">
                    NEXT FIXED DEPARTURES
                  </h3>
                </div>

                {/* "ALL DATES →" link */}
                <button
                  onClick={onViewAllDates}
                  className="text-xs font-black uppercase tracking-wider text-[#D9622B] hover:text-[#C35320] flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>ALL DATES</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Grouped by Month */}
              <div className="space-y-6">
                {Object.entries(departuresByMonth).map(([month, deps]) => (
                  <div key={month} className="space-y-3">
                    {/* Month Section Header */}
                    <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-stone-400 bg-[#F7F2E9] px-3 py-1.5 rounded-xl">
                      <Calendar className="w-3.5 h-3.5 text-[#1B3A6B]" />
                      <span>{month}</span>
                    </div>

                    {/* Departure rows */}
                    <div className="space-y-2.5">
                      {deps.map((dep) => (
                        <div
                          key={dep.id}
                          onClick={() => onSelectPackage(dep.linkedPackageSlug)}
                          className="group p-3 rounded-2xl bg-[#FAF8F5] hover:bg-orange-50/70 border border-stone-200 hover:border-orange-300 transition-all cursor-pointer flex items-center justify-between gap-3"
                        >
                          {/* Left: Thumbnail & Date & Destination */}
                          <div className="flex items-center gap-3 min-w-0">
                            <img
                              src={dep.thumbnail}
                              alt={dep.destinationName}
                              className="w-12 h-12 rounded-xl object-cover shrink-0 group-hover:scale-105 transition-transform"
                            />
                            <div className="min-w-0">
                              {/* Date (bold, clickable → opens that tour) */}
                              <div className="font-heading font-black text-sm text-[#1B3A6B] group-hover:text-[#D9622B] transition-colors">
                                {dep.displayDate}
                              </div>
                              <div className="text-xs text-stone-500 font-medium truncate">
                                {dep.destinationName}
                              </div>
                            </div>
                          </div>

                          {/* Right: Price & Status */}
                          <div className="text-right shrink-0">
                            <div className="font-black text-[#D9622B] text-sm">
                              ₹{dep.price.toLocaleString()}
                            </div>
                            {dep.status && (
                              <span className="text-[10px] font-extrabold text-stone-500 uppercase">
                                {dep.seatsLeft} seats left
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom reassurance */}
              <div className="pt-2 text-center border-t border-stone-100">
                <span className="text-xs text-stone-500">
                  Custom private batches available for groups of 6+
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
