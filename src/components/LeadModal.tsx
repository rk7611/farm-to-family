'use client';

import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  Calendar,
  MessageCircle,
  Phone,
  Sprout,
  User,
  MapPin,
  Users,
  ShieldCheck,
  Send,
} from 'lucide-react';
import { useFarmStore } from '@/lib/farmStore';
import { PlanTier } from '@/lib/types';
import { analytics } from '@/lib/analytics';

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPlan?: PlanTier | 'undecided';
  defaultTitle?: string;
  isVisitBooking?: boolean;
}

export default function LeadModal({
  isOpen,
  onClose,
  defaultPlan = 'dedicated',
  defaultTitle = 'Get My Custom Farm Plan',
  isVisitBooking = false,
}: LeadModalProps) {
  const { addLead, bookFarmVisit, farms, config } = useFarmStore();

  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('Bengaluru');
  const [familySize, setFamilySize] = useState('3–4');
  const [selectedPlan, setSelectedPlan] = useState<PlanTier | 'undecided'>(defaultPlan);
  const [monthlyBudget, setMonthlyBudget] = useState('₹20,000 / month (Dedicated Farm)');
  const [visitDate, setVisitDate] = useState('');
  const [selectedFarm, setSelectedFarm] = useState(farms[0]?.id || 'farm-anekal');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const validate = () => {
    const err: Record<string, string> = {};
    if (!fullName.trim()) err.fullName = 'Please enter your full name';
    if (!mobile.trim() || mobile.replace(/[^0-9]/g, '').length < 10) {
      err.mobile = 'Please enter a valid 10-digit mobile number';
    }
    if (isVisitBooking && !visitDate) {
      err.visitDate = 'Please select a preferred visit date';
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      if (isVisitBooking) {
        bookFarmVisit({
          fullName,
          phone: mobile,
          email: `${mobile.slice(-4)}@customer.farmtofamily.in`,
          farmId: selectedFarm,
          preferredDate: visitDate,
          guestsCount: parseInt(familySize.charAt(0)) || 4,
          notes,
        });
        analytics.visitEnquiry(selectedFarm, visitDate);
      } else {
        addLead({
          fullName,
          phone: mobile,
          whatsapp: whatsapp || mobile,
          city,
          familySize,
          interestedPlan: selectedPlan,
          monthlyBudget,
          selectedVegetables: ['Tomatoes', 'Carrots', 'Cucumbers', 'Greens'],
          primaryPriority: 'Quality & Traceability',
          notes,
        });
        analytics.leadSubmission({
          fullName,
          phone: mobile,
          city,
          familySize,
          plan: selectedPlan,
          budget: monthlyBudget,
        });
        if (defaultTitle.toLowerCase().includes('advisor')) {
          analytics.advisorEnquiry(selectedPlan, defaultTitle);
        }
        if (selectedPlan === 'family') analytics.interest10k('lead_submission');
        if (selectedPlan === 'dedicated') analytics.interest20k('lead_submission');
        if (selectedPlan === 'private') analytics.interest700k('lead_submission');
      }

      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-[#D8D1C5] overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#172F1F] p-6 text-white relative">
          <button
            onClick={handleResetAndClose}
            className="absolute top-5 right-5 p-2 text-zinc-400 hover:text-white rounded-full hover:bg-white/10 transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#20412B] text-[#9EC9AB] text-[11px] font-semibold tracking-wider uppercase">
              {isVisitBooking ? 'Farm Estate Visit' : 'Farming Advisory'}
            </span>
          </div>
          <h3 className="font-serif text-2xl font-bold tracking-tight text-[#FAF8F5]">
            {isVisitBooking ? 'Book a Family Farm Visit' : defaultTitle}
          </h3>
          <p className="text-xs text-zinc-300 mt-1 max-w-md">
            {isVisitBooking
              ? 'Walk through the estate, inspect our drip irrigation and meet our senior agronomists.'
              : 'Our farm advisor will customize your farming plan, crop schedule, and delivery rhythm.'}
          </p>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 bg-[#FAF8F5]">
          {isSubmitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shadow-inner">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <div className="space-y-1">
                <h4 className="font-serif text-2xl font-bold text-[#102115]">
                  {isVisitBooking ? 'Farm Visit Request Received' : 'Your Farm Plan Request Is Logged'}
                </h4>
                <p className="text-sm text-zinc-600 max-w-md mx-auto">
                  Thank you, <strong className="text-zinc-900">{fullName}</strong>. Our senior farm
                  advisor will reach out to you at <strong className="text-zinc-900">{mobile}</strong>{' '}
                  within 2 business hours.
                </p>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-[#D8D1C5] text-left text-xs space-y-2 max-w-md mx-auto">
                <div className="flex justify-between text-zinc-500">
                  <span>Selected Preference:</span>
                  <span className="font-semibold text-zinc-800">
                    {isVisitBooking ? `Visit on ${visitDate}` : selectedPlan.toUpperCase()}
                  </span>
                </div>
                <div className="flex justify-between text-zinc-500">
                  <span>Family Size:</span>
                  <span className="font-semibold text-zinc-800">{familySize} Members</span>
                </div>
                <div className="flex justify-between text-zinc-500">
                  <span>City:</span>
                  <span className="font-semibold text-zinc-800">{city}</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={`https://wa.me/${config.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                    `Hi, I just submitted a request for ${fullName} (${mobile}) regarding ${
                      isVisitBooking ? 'a farm visit' : 'a farm plan'
                    }.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#25D366] text-white text-xs font-semibold rounded-full shadow-sm hover:bg-[#20BA5A] transition"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Connect Instantly on WhatsApp</span>
                </a>
                <button
                  onClick={handleResetAndClose}
                  className="px-5 py-2.5 bg-white border border-[#D8D1C5] text-xs font-semibold text-[#172F1F] rounded-full hover:bg-zinc-50 transition"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-[#202521] mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Rahul Verma"
                    className={`w-full px-3.5 py-2.5 rounded-xl border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#2D5A3C] transition ${
                      errors.fullName ? 'border-red-500 bg-red-50/20' : 'border-[#D8D1C5]'
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-[11px] text-red-600 mt-1">{errors.fullName}</p>
                  )}
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="block text-xs font-semibold text-[#202521] mb-1">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="e.g. 7877832221"
                    className={`w-full px-3.5 py-2.5 rounded-xl border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#2D5A3C] transition ${
                      errors.mobile ? 'border-red-500 bg-red-50/20' : 'border-[#D8D1C5]'
                    }`}
                  />
                  {errors.mobile && (
                    <p className="text-[11px] text-red-600 mt-1">{errors.mobile}</p>
                  )}
                </div>

                {/* WhatsApp Number */}
                <div>
                  <label className="block text-xs font-semibold text-[#202521] mb-1">
                    WhatsApp Number (if different)
                  </label>
                  <input
                    type="tel"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="Same as mobile or new"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8D1C5] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#2D5A3C] transition"
                  />
                </div>

                {/* City */}
                <div>
                  <label className="block text-xs font-semibold text-[#202521] mb-1">
                    Delivery City
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8D1C5] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#2D5A3C] transition"
                  >
                    <option value="Bengaluru">Bengaluru & Outskirts</option>
                    <option value="Pune">Pune & PCMC</option>
                    <option value="Delhi NCR">Delhi NCR / Gurugram / Noida</option>
                    <option value="Mumbai">Mumbai & Navi Mumbai</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Other">Other Metro</option>
                  </select>
                </div>

                {/* Family Size */}
                <div>
                  <label className="block text-xs font-semibold text-[#202521] mb-1">
                    Family Size
                  </label>
                  <select
                    value={familySize}
                    onChange={(e) => setFamilySize(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8D1C5] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#2D5A3C] transition"
                  >
                    <option value="1–2">1–2 Members</option>
                    <option value="3–4">3–4 Members</option>
                    <option value="5–6">5–6 Members</option>
                    <option value="7+">7+ Members (Extended Family)</option>
                  </select>
                </div>

                {isVisitBooking ? (
                  <>
                    {/* Select Farm */}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-[#202521] mb-1">
                        Select Farm Estate to Visit
                      </label>
                      <select
                        value={selectedFarm}
                        onChange={(e) => setSelectedFarm(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8D1C5] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#2D5A3C] transition"
                      >
                        {farms.map((f) => (
                          <option key={f.id} value={f.id}>
                            {f.name} — {f.location}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Preferred Date */}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-[#202521] mb-1">
                        Preferred Weekend Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        value={visitDate}
                        onChange={(e) => setVisitDate(e.target.value)}
                        className={`w-full px-3.5 py-2.5 rounded-xl border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#2D5A3C] transition ${
                          errors.visitDate ? 'border-red-500' : 'border-[#D8D1C5]'
                        }`}
                      />
                      {errors.visitDate && (
                        <p className="text-[11px] text-red-600 mt-1">{errors.visitDate}</p>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    {/* Interested Plan */}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-[#202521] mb-1">
                        Interested Plan
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { id: 'family', label: "My Family's Farm", price: '₹10k/mo' },
                          { id: 'dedicated', label: 'My Dedicated Farm', price: '₹20k/mo' },
                          { id: 'private', label: 'My Private Farm', price: '₹7L/yr' },
                        ].map((plan) => (
                          <button
                            key={plan.id}
                            type="button"
                            onClick={() => setSelectedPlan(plan.id as PlanTier)}
                            className={`p-2.5 rounded-xl border text-left text-xs transition ${
                              selectedPlan === plan.id
                                ? 'border-[#172F1F] bg-[#172F1F] text-white shadow-xs'
                                : 'border-[#D8D1C5] bg-white text-zinc-700 hover:border-zinc-400'
                            }`}
                          >
                            <p className="font-semibold leading-tight">{plan.label}</p>
                            <p
                              className={`text-[11px] mt-0.5 ${
                                selectedPlan === plan.id ? 'text-[#9EC9AB]' : 'text-zinc-500'
                              }`}
                            >
                              {plan.price}
                            </p>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Budget */}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-[#202521] mb-1">
                        Monthly Produce Budget Range
                      </label>
                      <select
                        value={monthlyBudget}
                        onChange={(e) => setMonthlyBudget(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8D1C5] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#2D5A3C] transition"
                      >
                        <option value="₹10,000 / month (Everyday Family Plan)">
                          ₹10,000 / month (Everyday Family Plan)
                        </option>
                        <option value="₹20,000 / month (Dedicated Plot Plan)">
                          ₹20,000 / month (Dedicated Plot Plan)
                        </option>
                        <option value="₹50,000+ / month (Private Estate Custom Plan)">
                          ₹50,000+ / month (Private Estate Plan / ₹7 Lakh Annual)
                        </option>
                        <option value="Open to recommendation">
                          Open to agronomist recommendation
                        </option>
                      </select>
                    </div>
                  </>
                )}

                {/* Additional Notes */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-[#202521] mb-1">
                    Special Vegetables or Dietary Priorities (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Low spice chillies, high fiber leafy greens, sensitive digestion..."
                    className="w-full px-3.5 py-2 rounded-xl border border-[#D8D1C5] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#2D5A3C] transition"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-full bg-[#172F1F] hover:bg-[#20412B] text-white font-semibold text-sm transition shadow-md flex items-center justify-center gap-2 group disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>{isVisitBooking ? 'Confirm Visit Request' : 'Get My Farm Plan'}</span>
                      <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </div>

              {/* Trust statement */}
              <div className="pt-2 flex items-center justify-center gap-1.5 text-[11px] text-zinc-500">
                <ShieldCheck className="w-3.5 h-3.5 text-[#2D5A3C]" />
                <span>100% confidential • No spam calls • Direct agronomist consultation</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
