'use client';

import React, { useState } from 'react';
import {
  X,
  Compass,
  CheckCircle2,
  Calendar,
  Users,
  MapPin,
  Heart,
  Sparkles,
  ShieldCheck,
  Clock,
  Send,
  Loader2,
} from 'lucide-react';
import { FarmStayExperienceType } from '@/lib/types';
import { useFarmStore } from '@/lib/farmStore';
import { trackEvent } from '@/lib/analytics';

interface FarmStayInterestModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialExperience?: FarmStayExperienceType;
}

export default function FarmStayInterestModal({
  isOpen,
  onClose,
  initialExperience = 'weekend',
}: FarmStayInterestModalProps) {
  const { addFarmStayEnquiry } = useFarmStore();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('India');
  const [city, setCity] = useState('');
  const [preferredExperience, setPreferredExperience] =
    useState<FarmStayExperienceType>(initialExperience);
  const [travellingWith, setTravellingWith] = useState<
    'Alone' | 'Partner' | 'Family with children' | 'Parents' | 'Friends' | 'Other'
  >('Partner');
  const [duration, setDuration] = useState<
    'One night' | 'Two nights' | 'Three nights' | 'Seven nights' | 'Fourteen nights' | 'Longer stay'
  >('Two nights');
  const [budgetRange, setBudgetRange] = useState('₹10,000–₹25,000');
  const [preferredDistance, setPreferredDistance] = useState<
    'Within 2 hours of my city' | 'Within 4 hours' | 'Within 6 hours' | 'Open to travelling farther'
  >('Within 2 hours of my city');
  const [priorityInterest, setPriorityInterest] = useState('Peace and relaxation');
  const [notes, setNotes] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  React.useEffect(() => {
    if (isOpen) {
      setPreferredExperience(initialExperience);
      setIsSuccess(false);
      setErrorMsg('');
      trackEvent('farm_stay_form_start', { initialExperience });
    }
  }, [isOpen, initialExperience]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !phone.trim() || !city.trim()) {
      setErrorMsg('Please complete all required fields.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      // Add to reactive store
      addFarmStayEnquiry({
        fullName,
        email,
        phone,
        whatsapp: phone,
        country,
        city,
        preferredExperience,
        travellingWith,
        duration,
        budgetRange,
        preferredDistance,
        priorityInterest,
        notes,
      });

      // Submit to backend API
      await fetch('/api/farm-stays', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          country,
          city,
          preferredExperience,
          travellingWith,
          duration,
          budgetRange,
          preferredDistance,
          priorityInterest,
          notes,
        }),
      });

      // Track analytics
      trackEvent('farm_stay_lead_submitted', {
        preferredExperience,
        travellingWith,
        duration,
        budgetRange,
        city,
      });

      if (preferredExperience === 'retirement') {
        trackEvent('retirement_stay_interest', { city, duration });
      } else if (preferredExperience === 'weekend') {
        trackEvent('weekend_stay_interest', { city });
      } else if (preferredExperience === 'family') {
        trackEvent('family_vacation_interest', { city });
      } else if (preferredExperience === 'couples') {
        trackEvent('couples_retreat_interest', { city });
      } else if (preferredExperience === 'extended') {
        trackEvent('extended_stay_interest', { city, duration });
      }

      setIsSuccess(true);
    } catch (err) {
      setErrorMsg('Unable to submit your registration. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#D8D1C5] overflow-hidden my-8">
        {/* Header Bar */}
        <div className="bg-[#172F1F] text-white px-6 sm:px-8 py-5 flex items-center justify-between">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#20412B] text-[#A1D1AF] text-[10px] font-mono font-bold uppercase tracking-wider">
              <span>Upcoming Experience — Register Interest</span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
              PureVegies Farm Stays
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#20412B] text-zinc-300 hover:text-white flex items-center justify-center transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
          {isSuccess ? (
            <div className="text-center py-8 space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div className="space-y-2 max-w-lg mx-auto">
                <h4 className="font-serif text-2xl font-bold text-[#102115]">
                  Interest Registered Successfully
                </h4>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  Thank you for your interest in PureVegies Farm Stays. We are exploring experiences
                  for different travellers and life stages. We will share relevant updates as plans develop.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E5E0D8] text-xs text-zinc-500 max-w-md mx-auto text-left space-y-1">
                <p className="font-semibold text-zinc-800">Important Notice:</p>
                <p>
                  Submitting this interest form does not constitute a booking or payment. PureVegies Farm Stays
                  are planned countryside experiences currently under development.
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="px-8 py-3 bg-[#172F1F] hover:bg-[#20412B] text-white text-xs font-semibold uppercase tracking-wider rounded-full transition shadow-sm"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Context Note */}
              <div className="p-4 rounded-2xl bg-[#F4EFE7] border border-[#E5E0D8] text-xs text-zinc-600 leading-relaxed">
                <strong className="text-[#102115]">Grow Closer to Nature. Stay Closer to What Matters.</strong>
                <p className="mt-1">
                  We are developing peaceful, nature-connected farm holidays for families, couples, and retirees.
                  Register your preferences below to be part of our preview cohort when stays open.
                </p>
              </div>

              {errorMsg && (
                <div className="p-3.5 bg-red-50 text-red-700 text-xs rounded-xl font-medium border border-red-200">
                  {errorMsg}
                </div>
              )}

              {/* Personal Details */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                  1. Contact Information
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-zinc-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Rajiv Malhotra"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8D1C5] text-xs focus:outline-hidden focus:border-[#172F1F]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. rajiv@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8D1C5] text-xs focus:outline-hidden focus:border-[#172F1F]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-700 mb-1">
                      WhatsApp / Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +91 7877832221"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8D1C5] text-xs focus:outline-hidden focus:border-[#172F1F]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-700 mb-1">
                      City of Residence *
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Bengaluru, Mumbai, Pune"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8D1C5] text-xs focus:outline-hidden focus:border-[#172F1F]"
                    />
                  </div>
                </div>
              </div>

              {/* Preferred Experience */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                  2. Preferred Experience
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    {
                      id: 'weekend' as const,
                      title: 'Weekend Farm Stay',
                      desc: '1–2 nights peaceful countryside getaway',
                    },
                    {
                      id: 'family' as const,
                      title: 'Family Farm Vacation',
                      desc: 'Children nature activities & harvesting',
                    },
                    {
                      id: 'couples' as const,
                      title: 'Couples’ Retreat',
                      desc: 'Anniversary & quiet romantic holidays',
                    },
                    {
                      id: 'retirement' as const,
                      title: 'Retirement Farm Escape',
                      desc: 'Celebrate freedom, slow pace & nature',
                    },
                    {
                      id: 'extended' as const,
                      title: 'Extended Farm Stay',
                      desc: '7–14+ nights slow living / remote work',
                    },
                    {
                      id: 'private' as const,
                      title: 'Premium Private Farm Stay',
                      desc: 'Bespoke estate exclusivity & chef dining',
                    },
                  ].map((exp) => (
                    <button
                      key={exp.id}
                      type="button"
                      onClick={() => setPreferredExperience(exp.id)}
                      className={`p-3.5 rounded-2xl border text-left transition flex flex-col justify-between ${
                        preferredExperience === exp.id
                          ? 'border-[#172F1F] bg-[#172F1F]/5 ring-1 ring-[#172F1F]'
                          : 'border-[#E5E0D8] bg-white hover:bg-zinc-50'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="font-semibold text-xs text-[#102115]">{exp.title}</span>
                        {preferredExperience === exp.id && (
                          <CheckCircle2 className="w-4 h-4 text-[#2D5A3C] shrink-0" />
                        )}
                      </div>
                      <span className="text-[11px] text-zinc-500 mt-1">{exp.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Travel Preferences */}
              <div className="space-y-4 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                  3. Travel Details
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Who travelling with */}
                  <div>
                    <label className="block text-xs font-medium text-zinc-700 mb-1">
                      Who would you be travelling with?
                    </label>
                    <select
                      value={travellingWith}
                      onChange={(e) => setTravellingWith(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-xl border border-[#D8D1C5] text-xs bg-white focus:outline-hidden"
                    >
                      <option value="Alone">Alone</option>
                      <option value="Partner">Partner</option>
                      <option value="Family with children">Family with children</option>
                      <option value="Parents">Parents</option>
                      <option value="Friends">Friends</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Duration */}
                  <div>
                    <label className="block text-xs font-medium text-zinc-700 mb-1">
                      How long would you prefer to stay?
                    </label>
                    <select
                      value={duration}
                      onChange={(e) => setDuration(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-xl border border-[#D8D1C5] text-xs bg-white focus:outline-hidden"
                    >
                      <option value="One night">One night</option>
                      <option value="Two nights">Two nights</option>
                      <option value="Three nights">Three nights</option>
                      <option value="Seven nights">Seven nights</option>
                      <option value="Fourteen nights">Fourteen nights</option>
                      <option value="Longer stay">Longer stay</option>
                    </select>
                  </div>

                  {/* Budget */}
                  <div>
                    <label className="block text-xs font-medium text-zinc-700 mb-1">
                      What budget would you consider per stay?
                    </label>
                    <select
                      value={budgetRange}
                      onChange={(e) => setBudgetRange(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-[#D8D1C5] text-xs bg-white focus:outline-hidden"
                    >
                      <option value="Under ₹5,000">Under ₹5,000</option>
                      <option value="₹5,000–₹10,000">₹5,000–₹10,000</option>
                      <option value="₹10,000–₹25,000">₹10,000–₹25,000</option>
                      <option value="₹25,000–₹50,000">₹25,000–₹50,000</option>
                      <option value="₹50,000+">₹50,000+ (Premium Private)</option>
                    </select>
                  </div>

                  {/* Distance */}
                  <div>
                    <label className="block text-xs font-medium text-zinc-700 mb-1">
                      Where would you prefer the farm located?
                    </label>
                    <select
                      value={preferredDistance}
                      onChange={(e) => setPreferredDistance(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-xl border border-[#D8D1C5] text-xs bg-white focus:outline-hidden"
                    >
                      <option value="Within 2 hours of my city">Within 2 hours of my city</option>
                      <option value="Within 4 hours">Within 4 hours</option>
                      <option value="Within 6 hours">Within 6 hours</option>
                      <option value="Open to travelling farther">Open to travelling farther</option>
                    </select>
                  </div>
                </div>

                {/* Priority Interest */}
                <div>
                  <label className="block text-xs font-medium text-zinc-700 mb-1">
                    Which experience matters most to you? (Optional)
                  </label>
                  <select
                    value={priorityInterest}
                    onChange={(e) => setPriorityInterest(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#D8D1C5] text-xs bg-white focus:outline-hidden"
                  >
                    <option value="Peace and relaxation">Peace and relaxation</option>
                    <option value="Natural farming">Natural farming</option>
                    <option value="Fresh farm food">Fresh farm food</option>
                    <option value="Family time">Family time</option>
                    <option value="Retirement celebration">Retirement celebration</option>
                    <option value="Couples' getaway">Couples&apos; getaway</option>
                    <option value="Outdoor activities">Outdoor activities</option>
                  </select>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-xs font-medium text-zinc-700 mb-1">
                    Special notes or dates you have in mind (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Planning my parents' retirement in December, or looking for a quiet weekend in November..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8D1C5] text-xs focus:outline-hidden focus:border-[#172F1F]"
                  />
                </div>
              </div>

              {/* Disclaimer */}
              <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/60 text-[11px] text-amber-900 leading-relaxed">
                <strong>Transparent Notice:</strong> PureVegies Farm Stays are currently planned
                hospitality services under development. Registering your interest informs our location
                planning and gives you priority preview access once certified operational. This is not a
                financial commitment or booking.
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-full bg-[#172F1F] hover:bg-[#20412B] text-white font-semibold text-xs uppercase tracking-wider transition shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Registering Interest...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Register My Interest</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
