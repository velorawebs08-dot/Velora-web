import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { DestinationsSection } from './components/DestinationsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { TourDetailPage } from './components/TourDetailPage';
import { ContactPage } from './components/ContactPage';
import { AllToursPage } from './components/AllToursPage';
import { GroupTripsPage } from './components/GroupTripsPage';
import { BlogPage } from './components/BlogPage';
import { EnquiryModal } from './components/EnquiryModal';
import { SearchModal } from './components/SearchModal';
import { AboutModal } from './components/AboutModal';
import { PaymentModal } from './components/PaymentModal';
import { siteData, TourPackage } from './data/siteData';
import {
  Compass,
  Users,
  ShieldCheck,
  CreditCard,
  ArrowRight,
  Sparkles,
  Calendar,
  HelpCircle,
  ChevronDown,
  Clock,
  Star
} from 'lucide-react';

export default function App() {
  // Navigation State: 'home' | 'tours' | 'tour-detail' | 'group-trips' | 'blog' | 'contact'
  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedPackageSlug, setSelectedPackageSlug] = useState<string>('harishchandragad-konkan-kada');

  // Modals
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [enquiryPackage, setEnquiryPackage] = useState<TourPackage | null>(null);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchInitialQuery, setSearchInitialQuery] = useState('');

  const [isAboutOpen, setIsAboutOpen] = useState(false);

  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [paymentTour, setPaymentTour] = useState<TourPackage>(siteData.packages[0]);

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Scroll to top on view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView, selectedPackageSlug]);

  // Navigate helper
  const handleNavigate = (view: string, param?: string) => {
    if (view === 'tour-detail' && param) {
      setSelectedPackageSlug(param);
    }
    setCurrentView(view);
  };

  // Open Enquiry helper
  const handleOpenEnquiry = (slug?: string) => {
    const pkg = slug ? siteData.packages.find((p) => p.slug === slug) : null;
    setEnquiryPackage(pkg || null);
    setIsEnquiryOpen(true);
  };

  // Open Payment helper
  const handleOpenPayment = (pkg: TourPackage) => {
    setPaymentTour(pkg);
    setIsPaymentOpen(true);
  };

  // Hero search trigger
  const handleHeroSearch = (params: { location: string; date: string; guests: string }) => {
    if (params.location) {
      // Find package matching location
      const matched = siteData.packages.find(
        (p) =>
          p.destinationName.toLowerCase().includes(params.location.toLowerCase()) ||
          p.destinationSlug.toLowerCase().includes(params.location.toLowerCase())
      );
      if (matched) {
        handleNavigate('tour-detail', matched.slug);
        return;
      }
      setSearchInitialQuery(params.location);
    } else {
      setSearchInitialQuery('');
    }
    setIsSearchOpen(true);
  };

  // Click destination card -> Navigate to dedicated Tour/Package Detail page
  const handleSelectDestination = (destinationSlug: string) => {
    const matchedPkg = siteData.packages.find((p) => p.destinationSlug === destinationSlug);
    if (matchedPkg) {
      handleNavigate('tour-detail', matchedPkg.slug);
    } else {
      handleNavigate('tours');
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F2E9] text-[#14233c] flex flex-col font-sans">
      {/* 3. NAVBAR (Sticky, All pages) */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenEnquiry={handleOpenEnquiry}
        onOpenSearch={() => {
          setSearchInitialQuery('');
          setIsSearchOpen(true);
        }}
        onOpenAbout={() => setIsAboutOpen(true)}
      />

      {/* Main View Router with Framer Motion transitions */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          {/* =====================================================================
              1. HOME PAGE
             ===================================================================== */}
          {currentView === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              {/* 4.1 Hero Section */}
              <HeroSection
                onSearch={handleHeroSearch}
                onNavigate={handleNavigate}
                onOpenEnquiry={() => handleOpenEnquiry()}
              />

              {/* 4.2 Destinations Section */}
              <DestinationsSection
                onSelectDestination={handleSelectDestination}
                onSeeAllDestinations={() => handleNavigate('tours')}
              />

              {/* WHY TRIPTO TRAVELS / CASUAL & FRIENDLY VIBE */}
              <section className="py-16 sm:py-20 bg-white border-y border-stone-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
                    <span className="text-xs font-black uppercase tracking-widest text-[#D9622B] px-3 py-1 rounded-full bg-orange-50 inline-block">
                      HOW WE ROLL
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-black text-[#1B3A6B] font-heading tracking-tight">
                      Why Travel With Tripto?
                    </h2>
                    <p className="text-stone-600 text-sm sm:text-base">
                      No boring bus tours, no rushing with selfie sticks. Just genuine weekend getaways, great conversations, and epic Sahyadri trails.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {/* Feature 1 */}
                    <div className="p-6 rounded-3xl bg-[#F7F2E9] border border-stone-200 space-y-3">
                      <div className="w-12 h-12 rounded-2xl bg-[#1B3A6B] text-white flex items-center justify-center shadow-md">
                        <Compass className="w-6 h-6 text-[#D9622B]" />
                      </div>
                      <h3 className="font-heading font-black text-lg text-[#1B3A6B]">
                        Friendly Trek Captains
                      </h3>
                      <p className="text-xs text-stone-600 leading-relaxed font-medium">
                        Experienced locals and certified mountaineers who guide the route, tell great stories, and look out for everyone.
                      </p>
                    </div>

                    {/* Feature 2 */}
                    <div className="p-6 rounded-3xl bg-[#F7F2E9] border border-stone-200 space-y-3">
                      <div className="w-12 h-12 rounded-2xl bg-[#D9622B] text-white flex items-center justify-center shadow-md">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-heading font-black text-lg text-[#1B3A6B]">
                        Super Solo Friendly
                      </h3>
                      <p className="text-xs text-stone-600 leading-relaxed font-medium">
                        Most people join alone! By Sunday night, your WhatsApp will be buzzing with new trek buddies and plans for the next trip.
                      </p>
                    </div>

                    {/* Feature 3 */}
                    <div className="p-6 rounded-3xl bg-[#F7F2E9] border border-stone-200 space-y-3">
                      <div className="w-12 h-12 rounded-2xl bg-[#1B3A6B] text-white flex items-center justify-center shadow-md">
                        <Sparkles className="w-6 h-6 text-orange-400" />
                      </div>
                      <h3 className="font-heading font-black text-lg text-[#1B3A6B]">
                        Hot Village Meals
                      </h3>
                      <p className="text-xs text-stone-600 leading-relaxed font-medium">
                        Freshly cooked Pithla Bhakri, Thecha, Solkadhi, and endless chai made by local families right at basecamp.
                      </p>
                    </div>

                    {/* Feature 4 */}
                    <div className="p-6 rounded-3xl bg-[#F7F2E9] border border-stone-200 space-y-3">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-700 text-white flex items-center justify-center shadow-md">
                        <ShieldCheck className="w-6 h-6 text-emerald-200" />
                      </div>
                      <h3 className="font-heading font-black text-lg text-[#1B3A6B]">
                        Zero Hidden Costs
                      </h3>
                      <p className="text-xs text-stone-600 leading-relaxed font-medium">
                        What you see is what you pay. Sanitized AC travel from Mumbai & Pune, permits, stay, and food are all taken care of.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* 4.3 Testimonials Section — "Stories from the Trail!" */}
              <TestimonialsSection
                onSelectPackage={(slug) => handleNavigate('tour-detail', slug)}
              />

              {/* UPCOMING BATCHES HOME STRIP */}
              <section className="py-16 sm:py-20 bg-[#F7F2E9]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                    <div>
                      <span className="text-xs font-black uppercase tracking-wider text-[#D9622B] px-3 py-1 rounded-full bg-orange-100 inline-block mb-1.5">
                        LOCK YOUR SPOT
                      </span>
                      <h2 className="text-2xl sm:text-4xl font-black text-[#1B3A6B] font-heading tracking-tight">
                        Next Fixed Group Departures
                      </h2>
                    </div>

                    <button
                      onClick={() => handleNavigate('group-trips')}
                      className="text-xs font-black uppercase tracking-wider text-[#1B3A6B] hover:text-[#D9622B] flex items-center gap-1 transition-colors self-start sm:self-auto cursor-pointer"
                    >
                      <span>VIEW ALL DEPARTURES</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {siteData.departures.slice(0, 4).map((dep) => (
                      <div
                        key={dep.id}
                        onClick={() => handleNavigate('tour-detail', dep.linkedPackageSlug)}
                        className="bg-white rounded-3xl p-4 border border-stone-200/90 shadow-sm card-hover-lift cursor-pointer space-y-3 group"
                      >
                        <div className="relative h-36 rounded-2xl overflow-hidden">
                          <img
                            src={dep.thumbnail}
                            alt={dep.destinationName}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                          <div className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-black uppercase text-white tracking-wider">
                            {dep.displayDate}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-heading font-black text-sm text-[#1B3A6B] group-hover:text-[#D9622B] transition-colors line-clamp-1">
                            {dep.destinationName}
                          </h4>
                          <div className="flex items-center justify-between text-xs mt-2 pt-2 border-t border-stone-100">
                            <span className="font-black text-[#D9622B]">
                              ₹{dep.price.toLocaleString()}
                            </span>
                            <span className="text-[10px] font-bold text-stone-500 uppercase">
                              {dep.seatsLeft} seats left
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* FAQ Section */}
              <section className="py-16 sm:py-20 bg-white border-t border-stone-200">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                  <div className="text-center space-y-2">
                    <span className="text-xs font-black uppercase tracking-widest text-[#D9622B] px-3 py-1 rounded-full bg-orange-50 inline-block">
                      FREQUENTLY ASKED QUESTIONS
                    </span>
                    <h2 className="text-2xl sm:text-4xl font-black text-[#1B3A6B] font-heading tracking-tight">
                      Got Questions? We&apos;ve Got Honest Answers.
                    </h2>
                  </div>

                  <div className="space-y-3">
                    {siteData.faqs.map((faq, index) => {
                      const isOpen = openFaqIndex === index;
                      return (
                        <div
                          key={index}
                          className="rounded-2xl border border-stone-200 overflow-hidden bg-[#FAF8F5]"
                        >
                          <button
                            onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                            className="w-full p-4 sm:p-5 text-left font-heading font-black text-sm sm:text-base text-[#1B3A6B] flex items-center justify-between gap-4 cursor-pointer"
                          >
                            <span>{faq.q}</span>
                            <ChevronDown className={`w-4 h-4 text-[#D9622B] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                          </button>
                          {isOpen && (
                            <div className="px-5 pb-5 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-200/50 pt-3">
                              {faq.a}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {/* =====================================================================
              2. TOURS / ALL DESTINATIONS PAGE
             ===================================================================== */}
          {currentView === 'tours' && (
            <motion.div
              key="tours"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <AllToursPage
                onSelectPackage={(slug) => handleNavigate('tour-detail', slug)}
                onOpenEnquiry={handleOpenEnquiry}
              />
            </motion.div>
          )}

          {/* =====================================================================
              3. TOUR / PACKAGE DETAIL PAGE (Section 5)
             ===================================================================== */}
          {currentView === 'tour-detail' && (
            <motion.div
              key={`tour-detail-${selectedPackageSlug}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <TourDetailPage
                packageSlug={selectedPackageSlug}
                onNavigate={handleNavigate}
                onOpenEnquiry={handleOpenEnquiry}
                onOpenPayment={handleOpenPayment}
              />
            </motion.div>
          )}

          {/* =====================================================================
              4. GROUP TRIPS / FIXED DEPARTURES
             ===================================================================== */}
          {currentView === 'group-trips' && (
            <motion.div
              key="group-trips"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <GroupTripsPage
                onSelectPackage={(slug) => handleNavigate('tour-detail', slug)}
                onOpenEnquiry={handleOpenEnquiry}
              />
            </motion.div>
          )}

          {/* =====================================================================
              5. BLOG & FIELD GUIDES
             ===================================================================== */}
          {currentView === 'blog' && (
            <motion.div
              key="blog"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <BlogPage
                onSelectPackage={(slug) => handleNavigate('tour-detail', slug)}
                onOpenEnquiry={() => handleOpenEnquiry()}
              />
            </motion.div>
          )}

          {/* =====================================================================
              6. CONTACT PAGE (Section 6)
             ===================================================================== */}
          {currentView === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <ContactPage
                onSelectPackage={(slug) => handleNavigate('tour-detail', slug)}
                onViewAllDates={() => handleNavigate('group-trips')}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Global Modals */}
      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        selectedPackage={enquiryPackage}
        onSelectPackage={(slug) => handleNavigate('tour-detail', slug)}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        initialQuery={searchInitialQuery}
        onSelectPackage={(slug) => handleNavigate('tour-detail', slug)}
      />

      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
        onOpenEnquiry={() => {
          setIsAboutOpen(false);
          handleOpenEnquiry();
        }}
      />

      <PaymentModal
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        tour={paymentTour}
      />

      {/* Footer (all pages) */}
      <Footer
        onNavigate={handleNavigate}
        onOpenEnquiry={() => handleOpenEnquiry()}
        onOpenAbout={() => setIsAboutOpen(true)}
      />
    </div>
  );
}
