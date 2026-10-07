'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
      <Navbar />

      <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full space-y-8">
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#102115]">Privacy Policy</h1>
        <p className="text-xs text-zinc-500 font-mono">Last Updated: October 2026</p>

        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#D8D1C5] shadow-xs space-y-6 text-xs sm:text-sm text-zinc-700 leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-[#102115]">1. Overview</h2>
            <p>
              Farm-to-Family (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) respects your
              privacy. This policy outlines how we collect, store, and utilize personal information
              when you visit our platform, subscribe to our managed farming services, or visit our
              agro-estates.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-[#102115]">2. Information We Collect</h2>
            <p>
              We collect information you explicitly provide: your name, contact phone numbers,
              WhatsApp number, delivery address, dietary preferences, and family household size. We do
              not store full payment card details on our servers; all transactions are processed via
              certified payment gateway partners (e.g. Razorpay).
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-[#102115]">
              3. Telemetry & Live Farm Camera Privacy
            </h2>
            <p>
              Cameras located on our estates monitor agricultural furrows and environmental telemetry
              only. Camera angles are strictly directed towards crop canopies, irrigation manifolds,
              and perimeter fences.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-[#102115]">4. Contact</h2>
            <p>
              For privacy queries, contact our data protection officer at{' '}
              <strong>privacy@farmtofamily.in</strong>.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
