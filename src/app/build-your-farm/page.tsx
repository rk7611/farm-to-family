'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import BuildFarmWizard from '@/components/BuildFarmWizard';
import { Sprout, ShieldCheck, Scale, CheckCircle2 } from 'lucide-react';

export default function BuildYourFarmPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
      <Navbar />

      <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E2ECE5] text-[#20412B] text-xs font-bold uppercase tracking-wider">
            <Sprout className="w-3.5 h-3.5" />
            <span>Interactive Agronomy Estimator</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[#102115]">
            Build Your Family&rsquo;s Farm Plan
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 leading-relaxed">
            Configure your household scale, select your preferred vegetables, and calculate the exact
            PureVegies farming allocation and subscription plan. PureVegies provides the land and farmers — no land purchase required.
          </p>
        </div>

        {/* The Wizard */}
        <BuildFarmWizard />

        {/* Why this calculation matters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          <div className="bg-white p-6 rounded-2xl border border-[#D8D1C5] space-y-2">
            <Scale className="w-5 h-5 text-[#2D5A3C]" />
            <h4 className="font-serif text-lg font-bold text-[#102115]">Balanced Bed Ecology</h4>
            <p className="text-xs text-zinc-600 leading-relaxed">
              We rotate legumes (beans, peas) alongside heavy feeders (tomatoes, cabbage) so the allocated
              soil beds stay naturally replenished with organic nitrogen.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#D8D1C5] space-y-2">
            <ShieldCheck className="w-5 h-5 text-[#2D5A3C]" />
            <h4 className="font-serif text-lg font-bold text-[#102115]">Zero Wastage Guarantee</h4>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Harvest volumes are calibrated to actual kitchen consumption curves so crisp vegetables
              are enjoyed fresh without wilting in refrigerators.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#D8D1C5] space-y-2">
            <CheckCircle2 className="w-5 h-5 text-[#2D5A3C]" />
            <h4 className="font-serif text-lg font-bold text-[#102115]">Dynamic Seasonal Swaps</h4>
            <p className="text-xs text-zinc-600 leading-relaxed">
              You can adjust your selected crop matrix before each new quarterly planting cycle directly
              with your dedicated agronomist.
            </p>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
