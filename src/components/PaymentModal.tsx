import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CreditCard, ShieldCheck, CheckCircle2, Lock, ArrowRight, Building, Smartphone } from 'lucide-react';
import { TourPackage } from '../data/siteData';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  tour: TourPackage;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  tour,
}) => {
  const [captainCode, setCaptainCode] = useState('TRIPTO-CAPTAIN-26');
  const [travelerName, setTravelerName] = useState('');
  const [travelerPhone, setTravelerPhone] = useState('');
  const [selectedGateway, setSelectedGateway] = useState<'upi' | 'card' | 'emi'>('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const depositAmount = 5000; // standard slot reservation deposit
  const fullAmount = tour.price;
  const [payFull, setPayFull] = useState(false);

  const amountToPay = payFull ? fullAmount : depositAmount;

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 1200);
  };

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
          className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 border border-stone-200"
        >
          {/* Header */}
          <div className="bg-[#1B3A6B] text-white p-6 relative">
            <button
              onClick={onClose}
              aria-label="Close payment modal"
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2 text-xs font-bold text-orange-300 uppercase tracking-widest mb-1">
              <Lock className="w-3.5 h-3.5 text-[#D9622B]" /> 256-Bit SSL Secure Checkout
            </div>
            <h3 className="text-xl sm:text-2xl font-black font-heading">
              Captain Slot Confirmation
            </h3>
            <p className="text-xs text-blue-200 mt-1">
              {tour.title}
            </p>
          </div>

          <div className="p-6">
            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6 space-y-4"
              >
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="text-2xl font-black text-[#1B3A6B]">
                  Payment Verified!
                </h4>
                <p className="text-sm text-gray-600 max-w-sm mx-auto">
                  Your seat for <span className="font-bold text-[#1B3A6B]">{tour.title}</span> is officially locked in.
                  The Captain Telegram & WhatsApp group link will be sent to your phone.
                </p>

                <div className="bg-[#F7F2E9] rounded-2xl p-4 text-xs text-left max-w-sm mx-auto space-y-2 text-gray-700">
                  <div className="flex justify-between">
                    <span>Transaction ID:</span>
                    <span className="font-mono font-bold">TRIP-{Math.floor(100000 + Math.random() * 900000)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Amount Paid:</span>
                    <span className="font-bold text-emerald-700">₹{amountToPay.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Captain Code:</span>
                    <span className="font-bold text-[#1B3A6B]">{captainCode}</span>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="px-8 py-3 rounded-full bg-[#1B3A6B] text-white font-bold text-sm hover:bg-[#12284C] transition-colors"
                >
                  Return to Trip Details
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handlePay} className="space-y-4">
                {/* Captain Code input */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Captain Trip Authorization Code
                  </label>
                  <input
                    type="text"
                    required
                    value={captainCode}
                    onChange={(e) => setCaptainCode(e.target.value)}
                    placeholder="Enter 6-digit Captain Code provided by team"
                    className="w-full bg-[#F7F2E9] border border-stone-200 rounded-xl px-4 py-2.5 text-sm font-mono font-bold text-[#1B3A6B] focus:outline-none focus:ring-2 focus:ring-[#D9622B]"
                  />
                  <span className="text-[11px] text-gray-500 mt-1 block">
                    Pre-filled with your confirmed verification batch code.
                  </span>
                </div>

                {/* Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                      Traveler Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sameer Jain"
                      value={travelerName}
                      onChange={(e) => setTravelerName(e.target.value)}
                      className="w-full bg-[#F7F2E9] border border-stone-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#D9622B]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                      Phone (for confirmation)
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={travelerPhone}
                      onChange={(e) => setTravelerPhone(e.target.value)}
                      className="w-full bg-[#F7F2E9] border border-stone-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#D9622B]"
                    />
                  </div>
                </div>

                {/* Amount Option */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Payment Plan
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setPayFull(false)}
                      className={`p-3 rounded-2xl border text-left cursor-pointer transition-all ${
                        !payFull
                          ? 'border-[#D9622B] bg-orange-50/50 shadow-sm'
                          : 'border-stone-200 bg-white hover:bg-stone-50'
                      }`}
                    >
                      <div className="text-xs font-bold text-gray-500 uppercase">Slot Deposit</div>
                      <div className="text-lg font-black text-[#1B3A6B]">₹5,000</div>
                      <div className="text-[11px] text-gray-500">Pay balance 10 days before</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPayFull(true)}
                      className={`p-3 rounded-2xl border text-left cursor-pointer transition-all ${
                        payFull
                          ? 'border-[#D9622B] bg-orange-50/50 shadow-sm'
                          : 'border-stone-200 bg-white hover:bg-stone-50'
                      }`}
                    >
                      <div className="text-xs font-bold text-gray-500 uppercase">Full Payment</div>
                      <div className="text-lg font-black text-[#1B3A6B]">₹{tour.price.toLocaleString()}</div>
                      <div className="text-[11px] text-emerald-600 font-bold">100% locked & confirmed</div>
                    </button>
                  </div>
                </div>

                {/* Gateway Options */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Select Payment Method
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedGateway('upi')}
                      className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        selectedGateway === 'upi'
                          ? 'bg-[#1B3A6B] text-white border-[#1B3A6B]'
                          : 'bg-[#F7F2E9] text-gray-700 border-stone-200 hover:bg-stone-200'
                      }`}
                    >
                      <Smartphone className="w-3.5 h-3.5" /> UPI / QR
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedGateway('card')}
                      className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        selectedGateway === 'card'
                          ? 'bg-[#1B3A6B] text-white border-[#1B3A6B]'
                          : 'bg-[#F7F2E9] text-gray-700 border-stone-200 hover:bg-stone-200'
                      }`}
                    >
                      <CreditCard className="w-3.5 h-3.5" /> Credit/Debit
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedGateway('emi')}
                      className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        selectedGateway === 'emi'
                          ? 'bg-[#1B3A6B] text-white border-[#1B3A6B]'
                          : 'bg-[#F7F2E9] text-gray-700 border-stone-200 hover:bg-stone-200'
                      }`}
                    >
                      <Building className="w-3.5 h-3.5" /> HDFC 0% EMI
                    </button>
                  </div>
                </div>

                <div className="bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs text-gray-500 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Free date exchange up to 21 days before departure. Protected under Tripto SafeTravel guarantee.</span>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-3.5 px-6 rounded-full bg-[#D9622B] hover:bg-[#C35320] text-white font-bold tracking-wide text-sm shadow-md transition-all active:scale-[0.99] disabled:opacity-75 cursor-pointer flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Authorizing Payment Gateway...
                    </span>
                  ) : (
                    <>
                      <span>PAY ₹{amountToPay.toLocaleString()} & CONFIRM SEAT</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
