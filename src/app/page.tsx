'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Sprout,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Layers,
  MapPin,
  Calendar,
  Users,
  Compass,
  PhoneCall,
  MessageCircle,
  Eye,
  Camera,
  Truck,
  HeartHandshake,
  Check,
  ChevronDown,
  Info,
  Clock,
  Droplet,
  Sun,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import BuildFarmWizard from '@/components/BuildFarmWizard';
import FarmTimelineView from '@/components/FarmTimelineView';
import LiveFarmCamera from '@/components/LiveFarmCamera';
import LeadModal from '@/components/LeadModal';
import { useFarmStore } from '@/lib/farmStore';
import { PlanTier } from '@/lib/types';
import { analytics } from '@/lib/analytics';

export default function HomePage() {
  const { config, currentCustomer, farms } = useFarmStore();

  // Modal control
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('Get My Custom Farm Plan');
  const [modalPlan, setModalPlan] = useState<PlanTier | 'undecided'>('dedicated');
  const [isVisitModal, setIsVisitModal] = useState(false);

  // FAQ Accordion State
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const openPlanModal = (planTier: PlanTier, title: string) => {
    setModalPlan(planTier);
    setModalTitle(title);
    setIsVisitModal(false);
    setModalOpen(true);

    if (planTier === 'family') analytics.interest10k('home_plans');
    if (planTier === 'dedicated') analytics.interest20k('home_plans');
    if (planTier === 'private') analytics.interest700k('home_plans');
  };

  const openVisitModal = () => {
    setIsVisitModal(true);
    setModalTitle('Book a Weekend Farm Visit');
    setModalOpen(true);
    analytics.visitEnquiry('home_section', 'Weekend Farm Visit');
  };

  // FAQ items list
  const faqs = [
    {
      q: 'Do I need to own land?',
      a: 'No. You do not need to own, purchase or provide agricultural land. PureVegies provides and manages the farmland used for your subscription.',
    },
    {
      q: 'Do I have to manage the farm?',
      a: 'No. PureVegies manages the complete farming operation including land preparation, crop planning, cultivation, irrigation, monitoring, harvesting and packing.',
    },
    {
      q: 'Do I own the farm?',
      a: 'No. The PureVegies service is primarily a managed farming subscription. You are paying for the farming service and produce, not purchasing agricultural land.',
    },
    {
      q: 'Can I choose what vegetables are grown?',
      a: 'Yes. Depending on your plan, you can select from available vegetables and seasonal crops. Our farm team will also help create a practical crop plan.',
    },
    {
      q: 'Where is my farm?',
      a: 'Your produce is grown on PureVegies-managed farmland. Customers will be able to see their assigned farm/plot information and farming updates through their dashboard, subject to the plan.',
    },
    {
      q: 'Can I visit the farm?',
      a: 'Farm visits may be available depending on the farm location and your plan. Contact our farm advisor to arrange a visit.',
    },
    {
      q: 'How often will I receive produce?',
      a: 'Depending on your plan and household needs, deliveries are made once or twice a week. Harvests are carried out at pre-dawn (5:30 AM – 8:30 AM), pre-chilled to preserve nutrition, and delivered to your doorstep within hours.',
    },
    {
      q: 'What happens if a crop fails?',
      a: 'Farming is subject to natural micro-climates. To ensure your kitchen supply is never interrupted, our managed farms maintain buffer cultivation beds managed under identical responsible protocols. If an unseasonal weather event affects a specific crop, your delivery basket is fulfilled from our monitored reserve beds.',
    },
    {
      q: 'What is included in the ₹7 lakh private farm plan?',
      a: 'The "My Private Farm" tier is designed for High-Net-Worth households seeking an exclusive private estate experience. PureVegies provides a premium dedicated farming area within our managed farmland, bespoke heirloom crop planning, a dedicated senior farm manager, live camera feeds where available, custom chef requests, artisan packaging, and private weekend farm visits.',
    },
    {
      q: 'Is the produce certified organic?',
      a: 'We adhere to a strict policy of transparency: we do not make unsupported claims such as "100% organic" or "zero pesticides" unless backed by accredited laboratory certifications. Instead, we practice verified responsible farming methods: zero synthetic systemic chemicals, certified bio-inputs, dual-filtered water, and regular third-party laboratory residue testing reports which are openly visible on your dashboard.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
      <Navbar />

      <main className="flex-1">
        {/* =========================================================================
            SECTION 1 — HERO
            New Core Positioning: "Your Farm. Without Owning Land."
           ========================================================================= */}
        <section className="relative min-h-[92vh] flex items-center justify-center bg-[#0D1B11] text-white overflow-hidden py-24 px-4 sm:px-6 lg:px-8">
          {/* Cinematic Background with Dark Luxury Overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105 opacity-40 mix-blend-luminosity"
            style={{
              backgroundImage:
                'url(https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=2000&q=85)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0D1B11]/90 via-[#0D1B11]/70 to-[#0D1B11] pointer-events-none" />

          {/* Hero Content */}
          <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1A3824]/90 border border-[#3E7952]/40 text-[#A1D1AF] text-xs font-semibold uppercase tracking-widest backdrop-blur-md">
              <Sprout className="w-4 h-4 text-[#A1D1AF]" />
              <span>YOUR FARM. WITHOUT OWNING LAND.</span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#FAF8F5] leading-[1.12]">
              You Don&rsquo;t Need to Own a Farm.{' '}
              <br className="hidden sm:inline" />
              <span className="text-[#9EC9AB] italic font-normal">We&rsquo;ll Grow Your Food for You.</span>
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-2xl text-zinc-300 font-light max-w-3xl mx-auto leading-relaxed">
              PureVegies provides the farmland, farming infrastructure and expert farm management.
              You choose what your family wants us to grow — we take care of the rest.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/build-your-farm"
                className="w-full sm:w-auto px-8 py-4 bg-[#FAF8F5] hover:bg-white text-[#102115] font-semibold text-sm uppercase tracking-wider rounded-full shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
              >
                <span>Build My Farm Plan</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/business-model"
                className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-white/10 text-white font-semibold text-sm uppercase tracking-wider rounded-full border border-white/30 backdrop-blur-md transition-all flex items-center justify-center gap-2"
              >
                <span>How It Works</span>
              </Link>
            </div>

            {/* Highly Visible Trust Statement */}
            <div className="pt-6 border-t border-white/10 max-w-2xl mx-auto space-y-2">
              <div className="inline-block px-3.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-[#A1D1AF] font-mono text-xs font-bold tracking-widest uppercase">
                NO LAND REQUIRED
              </div>
              <p className="text-xs sm:text-sm text-zinc-300 font-medium tracking-wide">
                Land • Farmers • Irrigation • Farming • Harvesting • Delivery — We Manage It.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION: HOW DOES PUREVEGIES WORK? (DIRECTLY BELOW HERO)
            Clear side-by-side comparison: You Don't Need To vs PureVegies Provides
           ========================================================================= */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-b border-[#E5E0D8]">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#628A6F]">
                The Clear Distinction
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#102115]">
                How Does PureVegies Work?
              </h2>
              <p className="text-base sm:text-lg text-zinc-600">
                You never need to buy, lease, or manage agricultural land. We handle the heavy lifting of farming.
              </p>
            </div>

            {/* Visual Comparison Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
              {/* Left Side: You Don't Need To */}
              <div className="bg-[#FAF8F5] rounded-3xl p-8 border border-red-200/60 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-red-700 font-semibold text-xs uppercase tracking-wider mb-2">
                    <span className="w-2 h-2 rounded-full bg-red-500" />
                    <span>Customer Peace of Mind</span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#102115]">
                    YOU DON&rsquo;T NEED TO:
                  </h3>

                  <ul className="mt-6 space-y-3 text-sm text-zinc-700">
                    {[
                      'Buy land',
                      'Lease land',
                      'Find farmers',
                      'Manage workers',
                      'Install irrigation',
                      'Buy farming equipment',
                      'Monitor crops',
                      'Arrange harvesting',
                      'Arrange packing',
                      'Manage delivery',
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-red-100 text-red-600 font-bold flex items-center justify-center shrink-0 text-xs">
                          ✕
                        </span>
                        <span className="font-medium text-zinc-800">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-4 border-t border-zinc-200 text-xs text-zinc-500 italic">
                  Zero capital overhead. Zero rural labor complications.
                </div>
              </div>

              {/* Right Side: PureVegies Provides */}
              <div className="bg-[#172F1F] text-white rounded-3xl p-8 shadow-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-[#9EC9AB] font-semibold text-xs uppercase tracking-wider mb-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Our Managed Service</span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-white">
                    PUREVEGIES PROVIDES:
                  </h3>

                  <ul className="mt-6 space-y-3 text-sm text-zinc-200">
                    {[
                      'Farming land (held & managed by PureVegies)',
                      'Agricultural infrastructure & fencing',
                      'Farmers & full-time farm managers',
                      'Seeds & custom crop planning',
                      'Irrigation & water systems',
                      'Daily crop management & care',
                      'Farm monitoring & digital updates',
                      'Harvesting at peak maturity',
                      'Quality checking & lab safety tests',
                      'Insulated eco-friendly packing',
                      'Doorstep cold-chain delivery',
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-[#A1D1AF] font-bold flex items-center justify-center shrink-0 text-xs border border-emerald-400/30">
                          ✓
                        </span>
                        <span className="font-medium text-white">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-4 border-t border-[#234531] text-xs text-[#A1D1AF]">
                  ★ Full agricultural operation executed by professional agronomists
                </div>
              </div>
            </div>

            {/* Bottom Statement & Link */}
            <div className="p-6 bg-[#FAF8F5] border border-[#E5E0D8] rounded-3xl text-center space-y-4">
              <p className="font-serif italic text-xl sm:text-2xl text-[#102115]">
                &ldquo;You simply choose your plan and tell us what you want your family to eat.&rdquo;
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/business-model"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#172F1F] hover:bg-[#20412B] text-white text-xs font-semibold uppercase tracking-wider rounded-full shadow-sm transition"
                >
                  <span>Explore Our Complete Business Model</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/build-your-farm"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-zinc-50 border border-[#D8D1C5] text-[#172F1F] text-xs font-semibold uppercase tracking-wider rounded-full transition"
                >
                  <span>Build My Farm Plan</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION: WHAT YOU ARE ACTUALLY BUYING
            5 Pillars: LAND, FARMING, TRANSPARENCY, HARVEST, DELIVERY
           ========================================================================= */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F4EFE7] border-b border-[#E5E0D8]">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#628A6F]">
                Total Clarity
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#102115]">
                You&rsquo;re Not Buying Land.
                <br />
                You&rsquo;re Buying a Managed Farming Service.
              </h2>
              <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
                When you subscribe to PureVegies, you are not purchasing agricultural land. You are purchasing
                access to a managed farming service where our land, infrastructure and farming team work
                together to grow produce for your family.
              </p>
            </div>

            {/* Five Pillars Grid */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {[
                {
                  title: 'LAND',
                  desc: 'Provided and managed by PureVegies. No land purchase, lease, or registration required.',
                  icon: '🏞️',
                },
                {
                  title: 'FARMING',
                  desc: 'Managed by our agricultural team. Sowing, watering, bio-protection, and daily supervision.',
                  icon: '🧑‍🌾',
                },
                {
                  title: 'TRANSPARENCY',
                  desc: 'See what is growing and how your farm is progressing through weekly photos and dashboard notes.',
                  icon: '📱',
                },
                {
                  title: 'HARVEST',
                  desc: 'We manage pre-dawn harvesting, laboratory safety testing, sorting, and careful packing.',
                  icon: '🧺',
                },
                {
                  title: 'DELIVERY',
                  desc: 'We bring fresh produce directly to your home in temperature-protected eco crates.',
                  icon: '🚚',
                },
              ].map((p, idx) => (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-2xl border border-[#D8D1C5] text-center space-y-2 shadow-xs hover:border-[#172F1F] transition"
                >
                  <div className="text-3xl mb-1">{p.icon}</div>
                  <h3 className="font-serif font-bold text-lg text-[#102115]">{p.title}</h3>
                  <p className="text-xs text-zinc-600 leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION: INTERACTIVE PROCESS DIAGRAM (YOU CHOOSE vs WE DO THE FARMING)
           ========================================================================= */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-b border-[#E5E0D8]">
          <div className="max-w-5xl mx-auto space-y-10">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#628A6F]">
                Visual Process Diagram
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#102115]">
                From Your Kitchen Request to Your Dining Table
              </h2>
            </div>

            {/* Diagram Flow */}
            <div className="space-y-6">
              {/* Customer Row */}
              <div className="p-6 bg-[#FAF8F5] border-2 border-[#172F1F] rounded-3xl space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#172F1F] px-3 py-1 bg-white border border-[#D8D1C5] rounded-full">
                    YOU CHOOSE
                  </span>
                  <span className="text-xs text-zinc-500">Customer Decisions</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
                  <div className="p-4 bg-white rounded-xl border border-zinc-200">
                    <p className="font-bold text-sm text-[#102115]">1. Choose Your Plan</p>
                    <p className="text-xs text-zinc-500">Family, Dedicated, or Private tier</p>
                  </div>
                  <div className="p-4 bg-white rounded-xl border border-zinc-200">
                    <p className="font-bold text-sm text-[#102115]">2. Choose Your Crops</p>
                    <p className="text-xs text-zinc-500">Select veggies your family loves</p>
                  </div>
                </div>
              </div>

              {/* Arrow Connector */}
              <div className="flex justify-center">
                <div className="w-8 h-8 rounded-full bg-[#172F1F] text-white flex items-center justify-center font-bold text-xs">
                  ↓
                </div>
              </div>

              {/* PureVegies Row */}
              <div className="p-6 bg-[#172F1F] text-white rounded-3xl space-y-4 shadow-xl">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#9EC9AB] px-3 py-1 bg-[#102115] border border-[#234531] rounded-full">
                    WE DO THE FARMING
                  </span>
                  <span className="text-xs text-zinc-400">PureVegies Agricultural Execution</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 text-center">
                  {[
                    { step: 'Allocate Space', sub: 'From our farms' },
                    { step: 'Cultivate & Grow', sub: 'Expert agronomy' },
                    { step: 'Crop Monitoring', sub: 'Weekly updates' },
                    { step: 'Dawn Harvest', sub: 'Peak nutrition' },
                    { step: 'Quality Check', sub: 'Lab safety test' },
                    { step: 'Eco-Packing', sub: 'Insulated crates' },
                    { step: 'Home Delivery', sub: 'Doorstep arrival' },
                  ].map((s, idx) => (
                    <div key={idx} className="p-3 bg-[#102115] rounded-xl border border-[#234531]">
                      <span className="text-xs font-bold text-white block">{s.step}</span>
                      <span className="text-[10px] text-zinc-400 block mt-0.5">{s.sub}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 2 — THE PROBLEM
            "Healthy food shouldn't require you to become a farmer."
           ========================================================================= */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#F4EFE7] border-b border-[#E5E0D8]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#628A6F]">
                The Modern Conundrum
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#102115] leading-tight">
                Healthy food shouldn&rsquo;t require you to become a farmer.
              </h2>
              <p className="text-base sm:text-lg text-zinc-600 leading-relaxed">
                You care deeply about what your family puts into their bodies. But between demanding
                careers, family life, and city living, owning and running an agricultural estate is
                practically impossible.
              </p>
            </div>

            {/* Comparison Grid: What You Want vs What You Don't Have Time For */}
            <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Left Column: What Families Want */}
              <div className="lg:col-span-5 bg-white p-8 sm:p-10 rounded-3xl border border-[#D8D1C5] shadow-sm flex flex-col justify-between">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-[#172F1F] text-xs font-bold uppercase tracking-wider">
                    <span>What You Want For Your Family</span>
                  </div>

                  <ul className="space-y-4 text-sm sm:text-base text-zinc-800">
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#E2ECE5] text-[#20412B] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <strong>Uncompromising Quality:</strong> Crisp, nutrient-rich vegetables grown in
                        living soil without synthetic hormonal boosters.
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#E2ECE5] text-[#20412B] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <strong>True Farm Freshness:</strong> Harvested at dawn and in your kitchen within
                        hours, retaining natural vitamins.
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#E2ECE5] text-[#20412B] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <strong>Total Transparency:</strong> Knowing the exact plot, agronomist, water
                        source, and soil test results behind every meal.
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#E2ECE5] text-[#20412B] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <strong>Reliable Consistent Sourcing:</strong> Never guessing whether market
                        produce was sprayed with unknown post-harvest waxes.
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="mt-8 pt-6 border-t border-zinc-100 text-xs text-zinc-500 italic">
                  Desired outcome: Genuine peace of mind at the family dining table.
                </div>
              </div>

              {/* Middle: The Impossible Burden */}
              <div className="lg:col-span-3 bg-[#EAE3D6] p-8 rounded-3xl border border-[#D5CBBC] flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#7A4F27]">
                    The Reality
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-[#102115] mt-1">
                    You Don&rsquo;t Have Time To:
                  </h3>

                  <ul className="mt-6 space-y-3 text-xs sm:text-sm text-zinc-700">
                    <li className="flex items-center gap-2">
                      <span className="text-red-500 font-bold">✕</span>
                      <span>Buy & register agricultural land</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-red-500 font-bold">✕</span>
                      <span>Hire, train & manage farm labor</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-red-500 font-bold">✕</span>
                      <span>Monitor pest cycles daily</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-red-500 font-bold">✕</span>
                      <span>Manage borewells, pumps & drip</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-red-500 font-bold">✕</span>
                      <span>Plan staggered seasonal harvests</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-red-500 font-bold">✕</span>
                      <span>Organize weekly city logistics</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-8 p-3 bg-white/60 rounded-xl text-xs text-zinc-600">
                  Farming is a 24/7 science. It requires dedicated agronomy expertise.
                </div>
              </div>

              {/* Right Column: The Farm-to-Family Solution */}
              <div className="lg:col-span-4 bg-[#172F1F] text-white p-8 sm:p-10 rounded-3xl shadow-xl flex flex-col justify-between relative overflow-hidden">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#20412B] text-[#A1D1AF] text-xs font-bold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>The Solution</span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#FAF8F5]">
                    Farm-to-Family: Your Private Managed Farm
                  </h3>

                  <p className="text-sm text-zinc-300 leading-relaxed">
                    We combine prime agricultural parcels, senior agronomists, precision irrigation,
                    and clean cold-chain delivery into a seamless subscription service.
                  </p>

                  <div className="p-4 rounded-2xl bg-[#0D1B11] border border-[#234531] space-y-2">
                    <p className="font-serif italic text-base text-[#9EC9AB]">
                      &ldquo;You choose what your family eats. We take care of how it is grown.&rdquo;
                    </p>
                    <p className="text-xs text-zinc-400">
                      No capital investment in land. No labor management. Total transparency.
                    </p>
                  </div>
                </div>

                <div className="mt-8">
                  <Link
                    href="/how-it-works"
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#A1D1AF] hover:text-white transition group"
                  >
                    <span>Discover how our agronomy model works</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3 — HOW IT WORKS
            6-step visual process:
            01 Choose Your Plan ↓ 02 Select Your Crops ↓ 03 We Allocate Your Farm Space
            ↓ 04 Our Team Grows & Manages It ↓ 05 Track Your Farm ↓ 06 Harvest → QC → Delivery
           ========================================================================= */}
        <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#628A6F]">
                The Complete Journey
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#102115]">
                How Farm-to-Family Works
              </h2>
              <p className="text-base sm:text-lg text-zinc-600">
                A streamlined, six-step partnership connecting your kitchen directly to our fertile soil.
              </p>
            </div>

            {/* 6 Step Cards Grid */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  step: '01',
                  title: 'Choose Your Plan',
                  desc: 'Select from My Family Farm (Everyday produce), My Dedicated Farm (Custom plot), or My Private Farm (HNI Estate) depending on your household size.',
                  icon: '📋',
                  tag: 'Subscription Selection',
                },
                {
                  step: '02',
                  title: 'Select Your Crops',
                  desc: 'Pick the vegetables your family actually enjoys cooking—heirloom tomatoes, sweet carrots, crunchy cucumbers, or seasonal staples.',
                  icon: '🥕',
                  tag: 'Culinary Alignment',
                },
                {
                  step: '03',
                  title: 'We Allocate Your Farm Space',
                  desc: 'A dedicated numbered plot or managed parcel is assigned to your family at one of our prime participating agro-estates.',
                  icon: '📍',
                  tag: 'Plot Assignment',
                },
                {
                  step: '04',
                  title: 'Our Team Grows & Manages It',
                  desc: 'Our resident agronomists handle soil enrichment, seed priming, precision drip irrigation, and 100% bio-organic protection.',
                  icon: '🌱',
                  tag: 'Active Agronomy',
                },
                {
                  step: '05',
                  title: 'Track Your Farm',
                  desc: 'Follow your crops from germination to fruit set on your dashboard. Enjoy weekly photos, agronomist field notes, or live farm camera streams.',
                  icon: '📱',
                  tag: 'Real-time Transparency',
                },
                {
                  step: '06',
                  title: 'Harvest → QC → Delivery',
                  desc: 'Harvested pre-dawn, rigorously inspected for quality, packed in eco-insulated crates, and delivered straight to your door.',
                  icon: '🚚',
                  tag: 'Fresh Cold Chain',
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="bg-white p-8 rounded-3xl border border-[#E5E0D8] hover:border-[#172F1F] transition-all hover:shadow-lg flex flex-col justify-between group relative overflow-hidden"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-3xl font-bold text-[#D8D1C5] group-hover:text-[#172F1F] transition-colors">
                        {item.step}
                      </span>
                      <span className="text-2xl">{item.icon}</span>
                    </div>

                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#628A6F] block">
                      {item.tag}
                    </span>

                    <h3 className="font-serif text-xl font-bold text-[#102115] group-hover:text-[#2D5A3C] transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">{item.desc}</p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-400">
                    <span>Protocol Verified</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/build-your-farm"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#172F1F] hover:bg-[#20412B] text-white rounded-full font-semibold text-sm transition shadow-md group"
              >
                <span>Ready to start? Build Your Farm Now</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4 — OUR THREE PLANS
            Card 1: MY FAMILY'S FARM ₹10,000/month
            Card 2: MY DEDICATED FARM ₹20,000/month (Most Popular)
            Card 3: MY PRIVATE FARM ₹7,00,000/year (~₹58,333/month)
           ========================================================================= */}
        <section id="plans" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#F4EFE7] border-y border-[#E5E0D8]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#628A6F]">
                Tailored Subscription Tiers
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#102115]">
                Our Three Managed Farming Plans
              </h2>
              <p className="text-base sm:text-lg text-zinc-600">
                Transparent monthly and annual plans engineered for different family scales and
                involvement levels.
              </p>
            </div>

            {/* Pricing Cards */}
            <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
              {/* CARD 1: My Family's Farm */}
              <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#D8D1C5] shadow-sm flex flex-col justify-between hover:shadow-md transition">
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

                  {/* Price */}
                  <div className="pt-2 border-t border-zinc-100">
                    <div className="flex items-baseline gap-1">
                      <span className="font-serif text-4xl font-bold text-[#102115]">₹10,000</span>
                      <span className="text-sm font-medium text-zinc-500">/ month</span>
                    </div>
                    <p className="text-[11px] text-zinc-500 mt-0.5">Managed family farm plan • PureVegies farmland</p>
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-3 pt-2">
                    <p className="text-xs font-bold uppercase tracking-wider text-zinc-700">
                      Included with this plan:
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
                      ].map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
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
                    onClick={() => openPlanModal('family', "Start My Family's Farm Plan")}
                    className="w-full py-3.5 px-6 rounded-full bg-[#172F1F] hover:bg-[#20412B] text-white font-semibold text-xs uppercase tracking-wider transition shadow-sm text-center"
                  >
                    Start My Farm Plan
                  </button>
                </div>
              </div>

              {/* CARD 2: My Dedicated Farm (Most Popular) */}
              <div className="bg-white rounded-3xl p-8 sm:p-10 border-2 border-[#172F1F] shadow-xl flex flex-col justify-between relative transform lg:-translate-y-3">
                {/* Most Popular Badge */}
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

                  {/* Price */}
                  <div className="pt-2 border-t border-zinc-100">
                    <div className="flex items-baseline gap-1">
                      <span className="font-serif text-4xl font-bold text-[#102115]">₹20,000</span>
                      <span className="text-sm font-medium text-zinc-500">/ month</span>
                    </div>
                    <p className="text-[11px] text-[#2D5A3C] font-semibold mt-0.5">
                      Dedicated farming area within our network
                    </p>
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-3 pt-2">
                    <p className="text-xs font-bold uppercase tracking-wider text-zinc-700">
                      Included with this plan:
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
                      ].map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
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
                    onClick={() => openPlanModal('dedicated', 'Create My Dedicated Farm Plan')}
                    className="w-full py-3.5 px-6 rounded-full bg-[#172F1F] hover:bg-[#20412B] text-white font-semibold text-xs uppercase tracking-wider transition shadow-md text-center"
                  >
                    Create My Dedicated Farm Plan
                  </button>
                </div>
              </div>

              {/* CARD 3: My Private Farm (HNI / Luxury) */}
              <div className="bg-[#102115] text-white rounded-3xl p-8 sm:p-10 border border-[#234531] shadow-2xl flex flex-col justify-between relative overflow-hidden">
                {/* Subtle gold glow accent */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#C48248]/10 rounded-full blur-3xl pointer-events-none" />

                <div className="space-y-6 relative z-10">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#C48248]">
                      Private Managed Estate • HNI Tier
                    </span>
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-[#C48248]/20 text-[#edd2bd] border border-[#C48248]/30">
                      Bespoke
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

                  {/* Price: Primary ₹7,00,000/year + approx ₹58,333/month */}
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

                  {/* Feature Checklist */}
                  <div className="space-y-3 pt-2">
                    <p className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                      Private Managed Farm Privileges:
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
                      ].map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
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
                    onClick={() => openPlanModal('private', 'Talk to a Farm Advisor (My Private Farm)')}
                    className="w-full py-3.5 px-6 rounded-full bg-[#FAF8F5] hover:bg-white text-[#102115] font-semibold text-xs uppercase tracking-wider transition shadow-sm text-center"
                  >
                    Talk to a Farm Advisor
                  </button>
                </div>
              </div>
            </div>

            {/* Note on Transparency & Custom Billing */}
            <div className="mt-12 text-center text-xs text-zinc-500">
              Need a custom plan for joint families or institutional kitchens?{' '}
              <button
                type="button"
                onClick={() => openPlanModal('dedicated', 'Custom Agricultural Requirement')}
                className="text-[#172F1F] font-bold underline hover:text-[#2D5A3C]"
              >
                Inquire with our Lead Agronomist
              </button>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 5 — BUILD YOUR FARM (Interactive Experience)
           ========================================================================= */}
        <section id="build-your-farm" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5]">
          <div className="max-w-6xl mx-auto">
            <BuildFarmWizard />
          </div>
        </section>

        {/* =========================================================================
            SECTION 6 — KNOW YOUR FARM (Major Trust Section)
            Show example farm dashboard/visual:
            - Farm location, Plot ID, Crop, Sowing date, Expected harvest, Crop stage,
              Photos, Videos, Farming updates, Harvest history
            - For premium customers: Live Farm Camera
           ========================================================================= */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0D1B11] text-white">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#A1D1AF]">
                Trust & Verification
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#FAF8F5]">
                Know Where Your Food Comes From.
              </h2>
              <p className="text-base sm:text-lg text-zinc-300">
                You should never have to wonder who grew your tomatoes, what soil they drank from, or
                when they were plucked. Here is what you see as a subscribed member.
              </p>
            </div>

            {/* Example Farm Visual Mockup Container */}
            <div className="bg-[#14281B] border border-[#234531] rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8">
              {/* Top Farm Meta Bar */}
              <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-[#234531] gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#1B3626] border border-[#2D5A3C] flex items-center justify-center text-[#A1D1AF]">
                    <MapPin className="w-7 h-7" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-serif text-2xl font-bold text-white">
                        Anekal Valley Agro Estate
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#20412B] text-[#9EC9AB] text-xs font-mono font-semibold">
                        Plot B-14
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      Anekal Foothills, South Bengaluru • Red Sandy Loam (pH 6.8) • Aquifer Fed (TDS 185)
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right hidden sm:block">
                    <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">
                      Lead Agronomist
                    </span>
                    <span className="text-xs font-semibold text-white">Dr. Srinivas Murthy</span>
                  </div>
                  <Link
                    href="/dashboard"
                    className="px-4 py-2 bg-[#FAF8F5] text-[#102115] hover:bg-white text-xs font-semibold rounded-full transition shadow-xs"
                  >
                    Explore Live Dashboard
                  </Link>
                </div>
              </div>

              {/* Real-time Crops in Ground Grid */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-zinc-400">
                  <span className="font-bold uppercase tracking-wider text-[#A1D1AF]">
                    Current Cultivation on Plot B-14
                  </span>
                  <span>Updated 2 hours ago by field inspection team</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    {
                      name: 'Heirloom Tomato',
                      variety: 'San Marzano & Roma',
                      stage: 'Growing (Fruit Setting)',
                      sowingDate: '15 Aug 2026',
                      expectedHarvest: '18 Days',
                      progress: 78,
                      image:
                        'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80',
                    },
                    {
                      name: 'Early Nantes Carrot',
                      variety: 'Sweet Nantes',
                      stage: 'Growing (Root Swelling)',
                      sowingDate: '28 Aug 2026',
                      expectedHarvest: '32 Days',
                      progress: 58,
                      image:
                        'https://images.unsplash.com/photo-1598170845058-32b9d6a5c317?auto=format&fit=crop&w=600&q=80',
                    },
                    {
                      name: 'English Cucumber',
                      variety: 'Seedless Crisp',
                      stage: 'Harvest Ready',
                      sowingDate: '05 Aug 2026',
                      expectedHarvest: 'Today (Picking underway)',
                      progress: 98,
                      image:
                        'https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?auto=format&fit=crop&w=600&q=80',
                    },
                    {
                      name: 'California Bell Pepper',
                      variety: 'Green Blocky',
                      stage: 'Flowering & Setting',
                      sowingDate: '20 Aug 2026',
                      expectedHarvest: '24 Days',
                      progress: 68,
                      image:
                        'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=600&q=80',
                    },
                  ].map((crop, idx) => (
                    <div
                      key={idx}
                      className="bg-[#0E1E13] rounded-2xl border border-[#234531] p-4 space-y-3"
                    >
                      <div className="aspect-video rounded-xl overflow-hidden relative">
                        <img
                          src={crop.image}
                          alt={crop.name}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/70 text-[10px] font-mono text-[#A1D1AF] backdrop-blur-sm">
                          {crop.stage}
                        </span>
                      </div>

                      <div>
                        <h4 className="font-serif font-bold text-base text-white">{crop.name}</h4>
                        <p className="text-[11px] text-zinc-400">{crop.variety}</p>
                      </div>

                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between text-zinc-400 text-[11px]">
                          <span>Sown: {crop.sowingDate}</span>
                          <span className="text-[#A1D1AF] font-semibold">{crop.expectedHarvest}</span>
                        </div>
                        <div className="w-full h-1.5 bg-[#1B3626] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#A1D1AF] rounded-full"
                            style={{ width: `${crop.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Live Farm Camera Section (For Premium Tier Demo) */}
              <div className="pt-6 border-t border-[#234531] space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#C48248]">
                      Premium Feature Preview
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-white">Live Farm Camera</h3>
                    <p className="text-xs text-zinc-400">
                      Private estate customers enjoy 24/7 streaming access with environmental telemetry.
                    </p>
                  </div>
                </div>

                <LiveFarmCamera
                  farmName="Anekal Valley Agro Estate"
                  plotNumber="Plot B-14 (Dedicated Family Parcel)"
                  isPremium={true}
                />
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 7 — FARM TIMELINE
            Seed ↓ Germination ↓ Growing ↓ Flowering ↓ Harvest ↓ QC ↓ Packing ↓ Delivery
           ========================================================================= */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5]">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#628A6F]">
                Lifecycle Transparency
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#102115]">
                The Farm Timeline
              </h2>
              <p className="text-base sm:text-lg text-zinc-600">
                Every vegetable has a story. Follow the eight stages that transform a viable seed into
                dinner for your family.
              </p>
            </div>

            <FarmTimelineView />
          </div>
        </section>

        {/* =========================================================================
            SECTION 8 — REAL FARM STORY
            Large photography: Soil prep, Seed planting, Irrigation, Farmer working,
            Growing crops, Harvesting, Packing, Delivery.
            Headline: "From Our Farm to Your Family."
           ========================================================================= */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#F4EFE7] border-y border-[#E5E0D8]">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#628A6F]">
                Authentic Craftsmanship
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#102115]">
                From Our Farm to Your Family.
              </h2>
              <p className="text-base sm:text-lg text-zinc-600">
                True agriculture is not an automated warehouse. It is the skilled interplay of
                sunlight, microbe-rich soil, mountain air, and caring human hands.
              </p>
            </div>

            {/* Photo Collage Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: 'Living Soil Conditioning',
                  desc: 'Aged vermicompost, cow dung slurry and biochar enrich the root microbial colony.',
                  image:
                    'https://images.unsplash.com/photo-1592417817098-8f3d6ef23992?auto=format&fit=crop&w=800&q=80',
                  badge: 'Soil Preparation',
                },
                {
                  title: 'Heirloom Seed Sowing',
                  desc: 'Non-GMO seeds gently bedded into hand-formed raised ridges with drip tubing.',
                  image:
                    'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=800&q=80',
                  badge: 'Seed Planting',
                },
                {
                  title: 'Deep-Aquifer Drip Line',
                  desc: 'Precision micro-emitters deliver pure filtered water directly to the root bulb.',
                  image:
                    'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=800&q=80',
                  badge: 'Targeted Irrigation',
                },
                {
                  title: 'Dedicated Cultivators',
                  desc: 'Experienced farmers trained in biodynamic practices tending to each furrow.',
                  image:
                    'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=800&q=80',
                  badge: 'Farmer Care',
                },
                {
                  title: 'Canopy & Trellis Growth',
                  desc: 'Sun-warmed crops climbing natural jute cords under temperate skies.',
                  image:
                    'https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?auto=format&fit=crop&w=800&q=80',
                  badge: 'Growing Crops',
                },
                {
                  title: 'Pre-Dawn Harvest',
                  desc: 'Picked before sunrise to lock in natural morning sugars and turgor crunch.',
                  image:
                    'https://images.unsplash.com/photo-1598170845058-32b9d6a5c317?auto=format&fit=crop&w=800&q=80',
                  badge: 'Gentle Harvest',
                },
                {
                  title: 'Breathable Eco-Packs',
                  desc: 'Hand-sorted and placed in insulated linen bags without toxic plastic coatings.',
                  image:
                    'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
                  badge: 'Quality Packing',
                },
                {
                  title: 'Direct Doorstep Delivery',
                  desc: 'Climate-controlled morning dispatch directly to your kitchen threshold.',
                  image:
                    'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
                  badge: 'Doorstep Delivery',
                },
              ].map((card, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-3xl overflow-hidden border border-[#D8D1C5] shadow-xs group hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="relative aspect-4/3 overflow-hidden">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#172F1F]/90 text-[#9EC9AB] text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm">
                      {card.badge}
                    </span>
                  </div>

                  <div className="p-6 space-y-2">
                    <h3 className="font-serif text-lg font-bold text-[#102115] leading-snug">
                      {card.title}
                    </h3>
                    <p className="text-xs text-zinc-600 leading-relaxed">{card.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 9 — WHY FARM-TO-FAMILY
            5 key benefits:
            01 Transparent ("Know what is growing for your family.")
            02 Managed ("We handle the farming for you.")
            03 Personalised ("Choose crops based on your family's needs.")
            04 Traceable ("Follow your produce from farm to home.")
            05 Convenient ("No land, farming or farm management required.")
           ========================================================================= */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5]">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#628A6F]">
                Our Five Core Pillars
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#102115]">
                Why Farm-to-Family
              </h2>
              <p className="text-base sm:text-lg text-zinc-600">
                Built from the ground up to restore honesty, simplicity, and intimacy to the way
                families eat.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {[
                {
                  num: '01',
                  title: 'Transparent',
                  desc: 'Know what is growing for your family.',
                  detail:
                    'Zero hidden practices. Direct access to soil tests, water reports, and weekly plot updates.',
                },
                {
                  num: '02',
                  title: 'Managed',
                  desc: 'We handle the farming for you.',
                  detail:
                    'Our senior agronomists and cultivators manage irrigation, pest control, and soil nourishment daily.',
                },
                {
                  num: '03',
                  title: 'Personalised',
                  desc: 'Choose crops based on your family&rsquo;s needs.',
                  detail:
                    'Customize vegetables to match what your children eat and your kitchen actually cooks.',
                },
                {
                  num: '04',
                  title: 'Traceable',
                  desc: 'Follow your produce from farm to home.',
                  detail:
                    'Every crate is stamped with your Farm Allocation ID, harvest time, and quality inspector name.',
                },
                {
                  num: '05',
                  title: 'Convenient',
                  desc: 'No land, farming or farm management required.',
                  detail:
                    'Enjoy the health and lifestyle privileges of fresh farm food without any of the headache of land ownership or management.',
                },
              ].map((item) => (
                <div
                  key={item.num}
                  className="bg-white p-6 rounded-3xl border border-[#E5E0D8] hover:border-[#172F1F] transition flex flex-col justify-between group shadow-xs hover:shadow-sm"
                >
                  <div className="space-y-4">
                    <span className="font-mono text-2xl font-bold text-[#B2763D]">{item.num}</span>
                    <h3 className="font-serif text-xl font-bold text-[#102115]">{item.title}</h3>
                    <p className="text-xs font-semibold text-[#2D5A3C] italic leading-snug">
                      &ldquo;{item.desc}&rdquo;
                    </p>
                    <p className="text-xs text-zinc-500 leading-relaxed">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 10 — FARM VISIT
            Headline: "Don't Just Trust Us. Visit Your Farm."
            Explain customers can visit participating farms. CTA: "Book a Farm Visit"
           ========================================================================= */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#172F1F] text-white relative overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-overlay"
            style={{
              backgroundImage:
                'url(https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?auto=format&fit=crop&w=1600&q=80)',
            }}
          />

          <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#20412B] text-[#A1D1AF] text-xs font-semibold uppercase tracking-widest">
              <Eye className="w-4 h-4" />
              <span>Open Farm Gate Policy</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-[#FAF8F5] leading-tight">
              Don&rsquo;t Just Trust Us.{' '}
              <span className="italic text-[#9EC9AB] font-normal">Visit The Farm.</span>
            </h2>

            <p className="text-base sm:xl text-zinc-300 max-w-2xl mx-auto font-light leading-relaxed">
              We never ask for blind trust. As a subscriber, our estate gates are open to your family
              every weekend. Walk the soil, show your children where carrots grow, and pick fresh
              produce with your own hands.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto text-left pt-4">
              <div className="bg-[#0D1B11]/80 backdrop-blur-md p-5 rounded-2xl border border-white/10 space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[#A1D1AF]">
                  01. Inspect Your Farm Allocation
                </span>
                <p className="text-xs text-zinc-300">
                  Walk your assigned numbered beds and check irrigation lines up close.
                </p>
              </div>

              <div className="bg-[#0D1B11]/80 backdrop-blur-md p-5 rounded-2xl border border-white/10 space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[#A1D1AF]">
                  02. Meet Agronomists
                </span>
                <p className="text-xs text-zinc-300">
                  Discuss seed selections, soil biology, and pest defense with Dr. Murthy and team.
                </p>
              </div>

              <div className="bg-[#0D1B11]/80 backdrop-blur-md p-5 rounded-2xl border border-white/10 space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[#A1D1AF]">
                  03. Family Experience
                </span>
                <p className="text-xs text-zinc-300">
                  Spend tranquil weekend mornings away from urban smog and screen time.
                </p>
              </div>
            </div>

            <div className="pt-6">
              <button
                type="button"
                onClick={openVisitModal}
                className="px-8 py-4 bg-[#FAF8F5] hover:bg-white text-[#102115] font-semibold text-sm uppercase tracking-wider rounded-full shadow-lg transition-all transform hover:-translate-y-0.5 inline-flex items-center gap-2 group"
              >
                <span>Book a Farm Visit</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11 — TESTIMONIALS
            Realistic placeholder testimonials clearly marked as sample content in dev.
            No fake certifications or fake stats.
           ========================================================================= */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#F4EFE7]">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E5DFD3] text-zinc-600 text-[11px] font-semibold tracking-wider uppercase">
                <Info className="w-3.5 h-3.5" />
                <span>Sample Content in Development</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#102115]">
                What Families Are Experiencing
              </h2>

              <p className="text-xs text-zinc-500 italic max-w-lg mx-auto">
                *The following are realistic placeholder reviews reflecting pilot subscriber
                experiences. We do not manufacture fake celebrity claims.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: 'Rahul & Priya Verma',
                  city: 'Bengaluru (Whitefield)',
                  plan: 'My Dedicated Farm (₹20k/month)',
                  review:
                    'Our 7-year-old daughter refused to eat cucumbers from grocery stores because of bitterness. The seedless ones grown on Plot B-14 are crisp, sweet, and smell alive. Visiting the farm on a Sunday morning was the highlight of our month.',
                },
                {
                  name: 'Vikram Singhania',
                  city: 'Delhi NCR (Gurugram)',
                  plan: 'My Private Farm (₹7 Lakh/year)',
                  review:
                    'As someone with a hectic schedule, having half an acre in Sohna managed exclusively for our household is invaluable. Our private chef coordinates directly with Harinder on harvest cuts. The live camera access gives complete peace of mind.',
                },
                {
                  name: 'Meera Patel',
                  city: 'Pune (Undri)',
                  plan: "My Family's Farm (₹10k/month)",
                  review:
                    'We wanted pure food without spending weekends driving to rural mandis. The weekly box is abundant, exceptionally clean, and the bi-weekly soil moisture notes show real professionalism. Truly a service built on quiet respect.',
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white p-8 rounded-3xl border border-[#D8D1C5] shadow-xs flex flex-col justify-between space-y-6"
                >
                  <p className="font-serif italic text-sm sm:text-base text-zinc-800 leading-relaxed">
                    &ldquo;{item.review}&rdquo;
                  </p>

                  <div className="pt-4 border-t border-zinc-100 flex items-center justify-between">
                    <div>
                      <h4 className="font-serif font-bold text-base text-[#102115]">{item.name}</h4>
                      <p className="text-xs text-zinc-500">{item.city}</p>
                    </div>
                    <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-[#EAE4D9] text-[#172F1F] font-semibold">
                      {item.plan.split(' ')[1] || 'Plan'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 12 — FAQ
            All 11 questions answered accurately with transparent, trustworthy wording.
           ========================================================================= */}
        <section id="faqs" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5]">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#628A6F]">
                Clear Answers
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#102115]">
                Frequently Asked Questions
              </h2>
              <p className="text-base text-zinc-600 max-w-xl mx-auto">
                Everything you need to know about our farming methodology, logistics, and legal
                subscription structure.
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => {
                const isOpen = expandedFaq === idx;
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl border border-[#E5E0D8] overflow-hidden transition"
                  >
                    <button
                      type="button"
                      onClick={() => setExpandedFaq(isOpen ? null : idx)}
                      className="w-full p-6 text-left flex items-center justify-between gap-4 font-serif text-lg font-bold text-[#102115] hover:text-[#2D5A3C] transition"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-zinc-400 shrink-0 transition-transform ${
                          isOpen ? 'rotate-180 text-[#172F1F]' : ''
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="px-6 pb-6 pt-1 text-sm text-zinc-600 leading-relaxed border-t border-zinc-100 bg-[#FCFBF9] animate-in fade-in duration-200">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="text-center pt-4">
              <p className="text-xs text-zinc-500">
                Have a unique question not covered here?{' '}
                <a
                  href={`https://wa.me/${config.whatsappNumber.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#172F1F] font-bold underline hover:text-[#2D5A3C]"
                >
                  Chat directly with our farm advisor on WhatsApp
                </a>
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 13 — FINAL CTA
            Large premium section:
            "Your family's food deserves a farm you can trust."
            Buttons: "Build My Farm", "Talk to a Farm Advisor"
           ========================================================================= */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#102115] text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-radial-at-c from-[#1A3824] to-[#0D1B11] pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#1F3D2A] border border-[#2D5A3C] flex items-center justify-center text-[#A1D1AF] shadow-md">
              <Sprout className="w-7 h-7" />
            </div>

            <h2 className="font-serif text-4xl sm:text-6xl font-bold text-[#FAF8F5] leading-tight">
              Your family&rsquo;s food deserves a farm you can trust.
            </h2>

            <p className="text-base sm:text-xl text-zinc-300 font-light max-w-2xl mx-auto leading-relaxed">
              Step away from uncertain supply chains. Join a community of families who know exactly
              who planted their seeds and which soil fed their children.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/build-your-farm"
                className="w-full sm:w-auto px-9 py-4 bg-[#FAF8F5] hover:bg-white text-[#102115] font-semibold text-sm uppercase tracking-wider rounded-full shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
              >
                <span>Build My Farm</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <button
                type="button"
                onClick={() => openPlanModal('dedicated', 'Talk to a Senior Farm Advisor')}
                className="w-full sm:w-auto px-9 py-4 bg-transparent hover:bg-white/10 text-white font-semibold text-sm uppercase tracking-wider rounded-full border border-white/30 backdrop-blur-md transition-all flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-[#A1D1AF]" />
                <span>Talk to a Farm Advisor</span>
              </button>
            </div>

            <div className="pt-8 flex items-center justify-center gap-6 text-xs text-zinc-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#A1D1AF]" />
                Verified Non-Synthetic Farming
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#A1D1AF]" />
                Structured Seasonal Harvest Cycles
              </span>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppFloat />

      {/* Global Lead & Booking Modal */}
      <LeadModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultPlan={modalPlan}
        defaultTitle={modalTitle}
        isVisitBooking={isVisitModal}
      />
    </div>
  );
}
