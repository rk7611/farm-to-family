'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
      <Navbar />

      <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full space-y-8">
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#102115]">Terms of Service</h1>
        <p className="text-xs text-zinc-500 font-mono">Effective Date: October 2026</p>

        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#D8D1C5] shadow-xs space-y-6 text-xs sm:text-sm text-zinc-700 leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-[#102115]">
              1. Nature of the Managed Farming Service
            </h2>
            <p>
              Farm-to-Family is a subscription-based agricultural management and delivery service.
              Subscribers do not acquire proprietary ownership of agricultural real estate or deed
              titles; subscribers contract for dedicated agricultural management, agronomic care,
              and periodic harvest distribution from designated agro-estate parcels.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-[#102115]">
              2. Cultivation & Natural Variations
            </h2>
            <p>
              Agricultural cultivation is influenced by seasons and micro-climates. While we maintain
              reserve buffer beds to guarantee continuous harvest baskets, individual vegetable
              yields may naturally fluctuate based on sunlight, rainfall, and natural biological
              rhythms.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-[#102115]">
              3. Farm Visiting Safety Guidelines
            </h2>
            <p>
              Subscribers visiting participating agro-estates must follow standard agricultural
              sanitation and safety protocols: wear closed-toe footwear, respect drip lines, and
              accompany children at all times.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
