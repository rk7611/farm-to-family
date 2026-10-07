'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
      <Navbar />

      <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full space-y-8">
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#102115]">
          Subscription Terms & Quality Policy
        </h1>
        <p className="text-xs text-zinc-500 font-mono">Effective: October 2026</p>

        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#D8D1C5] shadow-xs space-y-6 text-xs sm:text-sm text-zinc-700 leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-[#102115]">
              1. Dedicated Cultivation Commitment
            </h2>
            <p>
              Farm-to-Family operates on physical, living biological cycles. When you subscribe, a specific
              numbered plot is conditioned with aged compost, heirloom seeds are sown, and dedicated cultivators
              are assigned exclusively to grow produce for your family. Therefore, subscriptions operate on
              committed cultivation cycles for each active billing term, ensuring uninterrupted crop nurturing
              and harvest planning.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-[#102115]">
              2. Annual Private Estate Engagements
            </h2>
            <p>
              The &ldquo;My Private Farm&rdquo; tier involves dedicated land parcel reservations of up to 1/2 acre,
              custom soil conditioning, personal agronomist assignments, and long-range seasonal planning. Annual
              engagements represent a committed estate management agreement for the full contractual 12-month
              agricultural cycle.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-[#102115]">
              3. Produce Quality Replacement Guarantee
            </h2>
            <p>
              We stand unconditionally behind the physical quality and freshness of every harvest box delivered.
              If any deliverable crate does not meet our verified quality grading standards (such as transit bruising,
              temperature fluctuation, or transit delays), notify your dedicated farm concierge within 12 hours of delivery
              with a photograph. An immediate replacement harvest batch from our monitored reserve beds will be dispatched.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
