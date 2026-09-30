import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Users, Phone, Mail, User, CheckCircle2, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { siteData, TourPackage } from '../data/siteData';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPackage?: TourPackage | null;
  onSelectPackage?: (slug: string) => void;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  onClose,
  selectedPackage,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    tourSlug: selectedPackage?.slug || siteData.packages[0].slug,
    date: 'Flexible',
    guests: '2',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Sync selected package if prop changes
  React.useEffect(() => {
    if (selectedPackage) {
      setFormData(prev => ({ ...prev, tourSlug: selectedPackage.slug }));
    }
  }, [selectedPackage]);

  const currentPkg = siteData.packages.find(p => p.slug === formData.tourSlug) || siteData.packages[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#0F1E36]/80 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 border border-stone-200"
        >
          {/* Header Banner */}
          <div className="bg-[#1B3A6B] text-white p-6 sm:p-8 relative">
            <button
              onClick={onClose}
              aria-label="Close enquiry modal"
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D9622B] text-white text-xs font-bold tracking-wider uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Free Trip Consultation</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-heading">
              Plan Your Adventure with a Captain
            </h2>
            <p className="text-blue-100/90 text-sm mt-1">
              Zero booking fee to enquire. Connect directly with our expedition captains in under 30 minutes.
            </p>
          </div>

          {/* Form Content */}
          <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8 space-y-4"
              >
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-extrabold text-[#1B3A6B] font-heading">
                  Enquiry Received, {formData.name || 'Explorer'}!
                </h3>
                <p className="text-gray-600 text-sm max-w-md mx-auto leading-relaxed">
                  Your lead captain for <span className="font-semibold text-gray-900">{currentPkg.title}</span> will review your dates and WhatsApp/call you at{' '}
                  <span className="font-semibold text-gray-900">{formData.phone || '+91 ...'}</span> within 30 minutes.
                </p>

                <div className="bg-[#F7F2E9] border border-orange-200/80 rounded-2xl p-4 text-left max-w-md mx-auto space-y-2 text-xs text-gray-700">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Trip:</span>
                    <span className="font-bold text-[#1B3A6B]">{currentPkg.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Duration:</span>
                    <span className="font-semibold">{currentPkg.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Travelers:</span>
                    <span className="font-semibold">{formData.guests} Persons</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Starts from:</span>
                    <span className="font-bold text-[#D9622B]">₹{currentPkg.price.toLocaleString()} / person</span>
                  </div>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href={`https://wa.me/${siteData.brand.whatsapp.replace('+', '')}?text=${encodeURIComponent(`Hi Tripto Team! I just submitted an enquiry for ${currentPkg.title}. Looking forward to discussing details!`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-colors shadow-md"
                  >
                    <span>Instant WhatsApp Connect</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <button
                    onClick={handleReset}
                    className="px-6 py-3 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold text-sm transition-colors"
                  >
                    Close Window
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Trip Selection */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Select Expedition
                  </label>
                  <select
                    value={formData.tourSlug}
                    onChange={(e) => setFormData({ ...formData, tourSlug: e.target.value })}
                    className="w-full bg-[#F7F2E9] border border-stone-200 rounded-xl px-4 py-3 text-sm font-semibold text-[#1B3A6B] focus:outline-none focus:ring-2 focus:ring-[#D9622B]"
                  >
                    {siteData.packages.map((pkg) => (
                      <option key={pkg.slug} value={pkg.slug}>
                        {pkg.destinationName} — {pkg.title} ({pkg.duration}) · ₹{pkg.price.toLocaleString()}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date & Guests row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      <Calendar className="w-3.5 h-3.5 inline mr-1 text-[#D9622B]" /> Preferred Month / Dates
                    </label>
                    <select
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full bg-[#F7F2E9] border border-stone-200 rounded-xl px-4 py-3 text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#D9622B]"
                    >
                      <option value="Flexible">I’m Flexible / Weekend Batches</option>
                      <option value="Oct 2026">October 2026 (Navratri / Diwali)</option>
                      <option value="Nov 2026">November 2026</option>
                      <option value="Dec 2026">December 2026 (Year-End Special)</option>
                      <option value="Custom">Custom Group Dates</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      <Users className="w-3.5 h-3.5 inline mr-1 text-[#D9622B]" /> Number of Travelers
                    </label>
                    <div className="flex items-center gap-2">
                      {['1 (Solo)', '2', '3-4', '5+'].map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setFormData({ ...formData, guests: opt })}
                          className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                            formData.guests === opt
                              ? 'bg-[#1B3A6B] text-white border-[#1B3A6B] shadow-sm'
                              : 'bg-[#F7F2E9] text-gray-700 border-stone-200 hover:bg-stone-200/70'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Personal Information */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      <User className="w-3.5 h-3.5 inline mr-1 text-[#D9622B]" /> Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Varun Kapoor"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#F7F2E9] border border-stone-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D9622B]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      <Phone className="w-3.5 h-3.5 inline mr-1 text-[#D9622B]" /> Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#F7F2E9] border border-stone-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D9622B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    <Mail className="w-3.5 h-3.5 inline mr-1 text-[#D9622B]" /> Email Address (For PDF Itinerary)
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. varun@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#F7F2E9] border border-stone-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D9622B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Questions, Customization or Notes
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Tell us if you're traveling solo, looking for female-only batches, dietary preferences, etc."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full bg-[#F7F2E9] border border-stone-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D9622B] resize-none"
                  />
                </div>

                {/* Guarantee Banner */}
                <div className="flex items-center gap-2 text-xs text-gray-500 pt-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>No pushy sales calls. Instant PDF brochure sent on WhatsApp. 100% spam-free.</span>
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 px-6 rounded-full bg-[#D9622B] hover:bg-[#C35320] text-white font-bold tracking-wide uppercase text-sm shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 transition-all active:scale-[0.99] disabled:opacity-75 cursor-pointer"
                  >
                    {loading ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Connecting with Captain...
                      </span>
                    ) : (
                      <>
                        <span>GET ITINERARY & BEST PRICE →</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
