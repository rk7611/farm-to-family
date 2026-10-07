'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Check,
  CheckCircle2,
  X,
  Sparkles,
  HelpCircle,
  PhoneCall,
  MessageCircle,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import LeadModal from '@/components/LeadModal';
import { useFarmStore } from '@/lib/farmStore';
import { PlanTier } from '@/lib/types';
import { analytics } from '@/lib/analytics';

export default function PlansPage() {
  const { config } = useFarmStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PlanTier>('dedicated');
  const [modalTitle, setModalTitle] = useState('Configure Your Farm Plan');

  const openPlanModal = (tier: PlanTier, title: string) => {
    setSelectedPlan(tier);
    setModalTitle(title);
    setModalOpen(true);

    analytics.planView(tier);
    if (tier === 'family') analytics.interest10k('plans_page');
    if (tier === 'dedicated') analytics.interest20k('plans_page');
    if (tier === 'private') analytics.interest700k('plans_page');
  };

  const comparisonRows = [
    {
      feature: 'Allocated Farm Space',
      family: '1,200 – 1,600 sq.ft sector',
      dedicated: '2,000 – 2,800 sq.ft numbered plot',
      private: 'Up to 1/2 Acre Private Estate',
    },
    {
      feature: 'Monthly Produce Volume',
      family: 'Approx. 25–30 kg / month',
      dedicated: 'Approx. 35–45 kg / month',
      private: 'Bespoke (65–85+ kg / month)',
    },
    {
      feature: 'Crop Selection Control',
      family: 'Agronomist Seasonal Curated',
      dedicated: 'Customer Selected Crops',
      private: 'Custom Heirloom & Chef Matrix',
    },
    {
      feature: 'Delivery Frequency',
      family: 'Weekly doorstep delivery',
      dedicated: 'Priority weekly / bi-weekly',
      private: 'Twice-weekly white glove delivery',
    },
    {
      feature: 'Packaging Format',
      family: 'Eco breathable linen packs',
      dedicated: 'Insulated climate crates',
      private: 'Signature handcrafted wooden crates',
    },
    {
      feature: 'Customer Dashboard',
      family: 'Included (Plot & Harvest logs)',
      dedicated: 'Included + Live Growth Timelines',
      private: 'Full Access + Multi-Camera View',
    },
    {
      feature: 'Live Farm Camera Access',
      family: 'Photo & Video logs only',
      dedicated: 'Weekly video walkthroughs',
      private: '24/7 Live Streaming PTZ Camera',
    },
    {
      feature: 'Farm Visit Privileges',
      family: 'Scheduled Open Days (Quarterly)',
      dedicated: 'Scheduled Weekend Family Visits',
      private: 'Private Estate Visits & Picnics',
    },
    {
      feature: 'Dedicated Farm Concierge',
      family: 'WhatsApp Support Desk',
      dedicated: 'Personal Account Manager',
      private: 'Dedicated Senior Farm Manager',
    },
    {
      feature: 'Soil & Water Lab Reports',
      family: 'Quarterly Summary',
      dedicated: 'Bi-monthly detailed lab assay',
      private: 'Monthly comprehensive soil & water audit',
    },
    {
      feature: 'Seasonal Crop Planning Review',
      family: 'Quarterly Seasonal Rotation',
      dedicated: 'Monthly Crop Customization',
      private: 'Bespoke Weekly Agronomist Planning',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
      <Navbar />

      <main className="flex-1 space-y-20 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#628A6F]">
            Transparent Subscriptions
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[#102115]">
            Choose Your Family&rsquo;s Farm Plan
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 leading-relaxed">
            No land purchase. No farming liabilities. Three clearly structured plans tailored to
            your kitchen scale and culinary preferences.
          </p>
        </div>

        {/* 3 Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {/* Plan 1: Family */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#D8D1C5] shadow-xs flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#628A6F]">
                  Family Farming Allocation
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#102115] mt-1">
                  My Family&rsquo;s Farm
                </h3>
                <p className="text-xs text-zinc-600 mt-2">
                  PureVegies provides the land and manages the farming. You choose your family&rsquo;s preferred produce and receive farm-grown vegetables according to your subscription.
                </p>
              </div>

              <div className="pt-2 border-t border-zinc-100">
                <div className="flex items-baseline gap-1">
                  <span className="font-serif text-4xl font-bold text-[#102115]">₹10,000</span>
                  <span className="text-sm font-medium text-zinc-500">/ month</span>
                </div>
                <p className="text-[11px] text-zinc-500 mt-0.5">Managed family farm plan • PureVegies farmland</p>
              </div>

              <div className="space-y-3 pt-2">
                <p className="text-xs font-bold uppercase tracking-wider text-zinc-700">
                  Plan inclusions:
                </p>
                <ul className="space-y-2.5 text-xs text-zinc-600">
                  {[
                    'PureVegies-managed farmland',
                    'Family-oriented crop planning',
                    'Seasonal vegetable selection',
                    'Regular produce delivery',
                    'Farm updates',
                    'Photos/videos',
                    'Quality checking',
                    'WhatsApp support',
                  ].map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#2D5A3C] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-zinc-100">
              <button
                type="button"
                onClick={() => openPlanModal('family', "Start My Family's Farm Plan (₹10,000/mo)")}
                className="w-full py-3.5 px-6 rounded-full bg-[#172F1F] hover:bg-[#20412B] text-white font-semibold text-xs uppercase tracking-wider transition shadow-sm text-center"
              >
                Start My Farm Plan
              </button>
            </div>
          </div>

          {/* Plan 2: Dedicated */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border-2 border-[#172F1F] shadow-xl flex flex-col justify-between relative transform lg:-translate-y-3">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#172F1F] text-[#A1D1AF] text-[11px] font-bold uppercase tracking-widest px-4 py-1 rounded-full shadow-md">
              Most Popular Choice
            </div>

            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#B2763D]">
                  Dedicated Farming Area
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#102115] mt-1">
                  My Dedicated Farm
                </h3>
                <p className="text-xs text-zinc-600 mt-2">
                  A dedicated farming area within our managed farm network, planned around your family&rsquo;s preferences.
                </p>
                <p className="text-[11px] text-emerald-800 font-medium mt-1 bg-emerald-50 px-2 py-0.5 rounded">
                  You don&rsquo;t need to own or provide land. PureVegies provides and manages the farming space.
                </p>
              </div>

              <div className="pt-2 border-t border-zinc-100">
                <div className="flex items-baseline gap-1">
                  <span className="font-serif text-4xl font-bold text-[#102115]">₹20,000</span>
                  <span className="text-sm font-medium text-zinc-500">/ month</span>
                </div>
                <p className="text-[11px] text-[#2D5A3C] font-semibold mt-0.5">
                  Dedicated farming area within our network
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <p className="text-xs font-bold uppercase tracking-wider text-zinc-700">
                  Plan inclusions:
                </p>
                <ul className="space-y-2.5 text-xs text-zinc-600">
                  {[
                    'Dedicated farming area within PureVegies farm',
                    'Custom crop planning',
                    'Customer-selected crops',
                    'Farm updates',
                    'Photos/videos',
                    'Harvest tracking',
                    'Priority delivery',
                    'Farm visit option',
                  ].map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#2D5A3C] shrink-0 mt-0.5" />
                      <span className="font-medium text-zinc-800">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-zinc-100">
              <button
                type="button"
                onClick={() =>
                  openPlanModal('dedicated', 'Create My Dedicated Farm Plan (₹20,000/mo)')
                }
                className="w-full py-3.5 px-6 rounded-full bg-[#172F1F] hover:bg-[#20412B] text-white font-semibold text-xs uppercase tracking-wider transition shadow-md text-center"
              >
                Create My Dedicated Farm Plan
              </button>
            </div>
          </div>

          {/* Plan 3: Private HNI */}
          <div className="bg-[#102115] text-white rounded-3xl p-8 sm:p-10 border border-[#234531] shadow-2xl flex flex-col justify-between relative overflow-hidden">
            <div className="space-y-6 relative z-10">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#C48248]">
                  HNI / Premium Segment
                </span>
                <span className="text-[10px] uppercase font-mono px-2.5 py-0.5 rounded-full bg-[#C48248]/20 text-[#edd2bd]">
                  Bespoke Estate
                </span>
              </div>

              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
                  My Private Farm
                </h3>
                <p className="text-xs text-zinc-300 mt-2">
                  A premium privately managed farming experience using PureVegies-managed farmland and infrastructure.
                </p>
                <p className="text-[11px] text-[#A1D1AF] font-medium mt-1 bg-[#1A3824] px-2 py-0.5 rounded">
                  PureVegies manages the land, farming team and complete agricultural operation. No land ownership required.
                </p>
              </div>

              <div className="pt-2 border-t border-white/10">
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-4xl font-bold text-white">₹7,00,000</span>
                  <span className="text-sm font-medium text-zinc-400">/ year</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs font-mono text-[#A1D1AF]">
                    (Approx. ₹58,333 / month)
                  </span>
                  <span className="text-[10px] text-zinc-400">• Annual engagement</span>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <p className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                  Private Estate Privileges:
                </p>
                <ul className="space-y-2.5 text-xs text-zinc-300">
                  {[
                    'Premium dedicated farm area within PureVegies estate',
                    'Custom crop planning',
                    'Complete farm management',
                    'Premium produce',
                    'Farm monitoring',
                    'Detailed farming reports',
                    'Harvest planning',
                    'Premium packaging',
                    'Home delivery',
                    'Dedicated farm manager',
                    'Farm visits',
                    'Custom requirements',
                  ].map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#A1D1AF] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 relative z-10">
              <button
                type="button"
                onClick={() =>
                  openPlanModal('private', 'Talk to a Farm Advisor (My Private Farm)')
                }
                className="w-full py-3.5 px-6 rounded-full bg-[#FAF8F5] hover:bg-white text-[#102115] font-semibold text-xs uppercase tracking-wider transition shadow-md text-center"
              >
                Talk to a Farm Advisor
              </button>
            </div>
          </div>
        </div>

        {/* Business Model Explanation Banner */}
        <div className="p-6 bg-[#FAF8F5] border-2 border-[#172F1F] rounded-3xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#2D5A3C] bg-emerald-100 px-2.5 py-0.5 rounded-full">
              NO LAND REQUIRED
            </span>
            <h4 className="font-serif text-xl font-bold text-[#102115]">
              You&rsquo;re Not Buying Land. You&rsquo;re Buying a Managed Farming Service.
            </h4>
            <p className="text-xs text-zinc-600 max-w-2xl">
              PureVegies provides the agricultural land, water infrastructure, farmers, and delivery. You simply choose what you want your family to eat.
            </p>
          </div>
          <Link
            href="/business-model"
            className="px-6 py-3 bg-[#172F1F] hover:bg-[#20412B] text-white text-xs font-semibold uppercase tracking-wider rounded-full shadow-sm transition whitespace-nowrap shrink-0 flex items-center gap-2"
          >
            <span>Read Our Full Business Model</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Deep Side-by-Side Comparison Matrix */}
        <div className="space-y-8 pt-8">
          <div className="text-center space-y-2">
            <h2 className="font-serif text-3xl font-bold text-[#102115]">
              Detailed Feature Comparison Matrix
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500">
              Side-by-side specifications of all three farming plans.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-[#D8D1C5] overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-[#172F1F] text-white font-serif text-sm">
                    <th className="py-4 px-6 w-1/4">Feature & Service</th>
                    <th className="py-4 px-6 w-1/4 font-sans font-bold">
                      My Family&rsquo;s Farm (₹10k/mo)
                    </th>
                    <th className="py-4 px-6 w-1/4 font-sans font-bold text-[#9EC9AB]">
                      My Dedicated Farm (₹20k/mo)
                    </th>
                    <th className="py-4 px-6 w-1/4 font-sans font-bold text-[#C48248]">
                      My Private Farm (₹7L/yr)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {comparisonRows.map((row, idx) => (
                    <tr
                      key={idx}
                      className={idx % 2 === 0 ? 'bg-[#FAF8F5]/60 hover:bg-zinc-50' : 'bg-white hover:bg-zinc-50'}
                    >
                      <td className="py-4 px-6 font-semibold text-zinc-900">{row.feature}</td>
                      <td className="py-4 px-6 text-zinc-700">{row.family}</td>
                      <td className="py-4 px-6 font-medium text-zinc-900 bg-emerald-50/20">
                        {row.dedicated}
                      </td>
                      <td className="py-4 px-6 font-medium text-zinc-900">{row.private}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Trust & Guarantee Callout */}
        <div className="bg-[#FAF8F5] border border-[#D8D1C5] rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#172F1F] text-[#A1D1AF] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-xl font-bold text-[#102115]">
                Buffer Bed Protection Guarantee
              </h4>
              <p className="text-xs text-zinc-600 mt-1 max-w-xl">
                Nature can be unpredictable. If an unseasonal weather phenomenon affects your allocated crops,
                our monitored reserve beds fulfill your weekly harvest without interruption or extra
                cost.
              </p>
            </div>
          </div>

          <Link
            href="/build-your-farm"
            className="px-6 py-3 bg-[#172F1F] hover:bg-[#20412B] text-white text-xs font-semibold rounded-full shrink-0"
          >
            Calculate Exact Requirement
          </Link>
        </div>
      </main>

      <Footer />
      <WhatsAppFloat />
      <LeadModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultPlan={selectedPlan}
        defaultTitle={modalTitle}
      />
    </div>
  );
}
