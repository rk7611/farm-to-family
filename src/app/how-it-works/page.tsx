'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sprout,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Droplet,
  Sun,
  Truck,
  Layers,
  HeartHandshake,
  Calendar,
  Compass,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import FarmTimelineView from '@/components/FarmTimelineView';
import LeadModal from '@/components/LeadModal';

export default function HowItWorksPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
      <Navbar />

      <main className="flex-1 space-y-20 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Page Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#628A6F]">
            The Agronomy Protocol
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[#102115] leading-tight">
            How Farm-to-Family Operates
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 leading-relaxed">
            We bridge the gap between rural agricultural mastery and your family dining table.
            Here is the science, care, and logistics powering your subscription.
          </p>
        </div>

        {/* 6 Step Visual Process Detailed */}
        <div className="space-y-12">
          <div className="text-center space-y-2">
            <h2 className="font-serif text-3xl font-bold text-[#102115]">The 6-Step Managed Flow</h2>
            <p className="text-xs sm:text-sm text-zinc-500">From enrollment to weekly kitchen baskets.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                num: '01',
                title: 'Choose Your Plan',
                desc: "Select between My Family's Farm (Everyday essentials), My Dedicated Farm (Custom plot), or My Private Farm (HNI Estate) depending on your household scale.",
                action: 'Online subscription setup with zero long-term land lock-in.',
              },
              {
                num: '02',
                title: 'Select Your Crops',
                desc: 'Customize the vegetables your family eats. Our agronomists balance your basket across leafy greens, root vegetables, creeper gourds, and culinary aromatics.',
                action: 'Curated seasonality matrix prevents soil fatigue.',
              },
              {
                num: '03',
                title: 'We Allocate Your Farm Space',
                desc: 'A physical numbered plot or sector is earmarked exclusively for your family at our nearest partner agro-estate with verified water and soil health.',
                action: 'Full plot telemetry (sq.ft, sunlight hours, soil pH) logged in your portal.',
              },
              {
                num: '04',
                title: 'Our Team Grows & Manages It',
                desc: 'Trained cultivators under senior agronomist supervision handle composting, bio-inoculation, precision drip irrigation, and daily weed management.',
                action: 'Strict policy: zero synthetic systemic sprays or chemical accelerators.',
              },
              {
                num: '05',
                title: 'Track Your Farm',
                desc: 'Follow your plants from germination to flowering on your dashboard. Enjoy weekly photographic field notes, agronomist journal updates, and live camera streams.',
                action: 'Complete visual traceability accessible on your phone.',
              },
              {
                num: '06',
                title: 'Harvest → QC → Delivery',
                desc: 'Produce is picked between 5:30 AM and 8:30 AM, inspected for sugar brix and firmness, pre-chilled, and brought directly to your doorstep in eco-insulated crates.',
                action: 'Direct farm-to-table in under 12 hours from harvest.',
              },
            ].map((step) => (
              <div
                key={step.num}
                className="bg-white p-8 rounded-3xl border border-[#D8D1C5] shadow-xs flex flex-col justify-between space-y-4 hover:border-[#172F1F] transition"
              >
                <div className="space-y-3">
                  <span className="font-mono text-3xl font-bold text-[#B2763D]">{step.num}</span>
                  <h3 className="font-serif text-xl font-bold text-[#102115]">{step.title}</h3>
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">{step.desc}</p>
                </div>

                <div className="pt-4 border-t border-zinc-100 text-[11px] text-[#2D5A3C] font-semibold">
                  Protocol: {step.action}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* The 8-Stage Timeline */}
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="font-serif text-3xl font-bold text-[#102115]">The Biological Crop Timeline</h2>
            <p className="text-xs sm:text-sm text-zinc-500">
              Interactive breakdown of each growth milestone.
            </p>
          </div>

          <FarmTimelineView />
        </div>

        {/* Agronomy Pillars */}
        <div className="bg-[#102115] text-white rounded-3xl p-8 sm:p-14 border border-[#234531] shadow-2xl space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#A1D1AF]">
              Science & Soil Biology
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              Why Our Produce Tastes Different
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300">
              Commercial vegetables are forced to grow rapidly using chemical nitrogen salts. Our
              crops develop slowly in living microbial soil.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <Droplet className="w-6 h-6 text-[#A1D1AF]" />
              <h4 className="font-serif text-xl font-bold text-white">Pure Aquifer Irrigation</h4>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Water from deep subterranean aquifers filtered for TDS and heavy metals. We do not use
                untreated industrial run-off canal water.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <Sun className="w-6 h-6 text-[#A1D1AF]" />
              <h4 className="font-serif text-xl font-bold text-white">Natural Biological Mulching</h4>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Raised beds layered with biochar, aged composted cow manure, and straw mulch to insulate
                soil microbes and retain natural moisture.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <ShieldCheck className="w-6 h-6 text-[#A1D1AF]" />
              <h4 className="font-serif text-xl font-bold text-white">Predatory Micro-Ecology</h4>
              <p className="text-xs text-zinc-300 leading-relaxed">
                We plant border marigolds and introduce beneficial ladybugs and Trichoderma fungi to
                naturally prevent pest outbreaks without synthetic poison.
              </p>
            </div>
          </div>

          <div className="text-center pt-4">
            <button
              onClick={() => setModalOpen(true)}
              className="px-8 py-3.5 bg-[#FAF8F5] hover:bg-white text-[#102115] font-semibold text-xs uppercase tracking-wider rounded-full transition shadow-md"
            >
              Get Your Custom Farm Plan
            </button>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppFloat />
      <LeadModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
