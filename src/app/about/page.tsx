'use client';

import React from 'react';
import Link from 'next/link';
import { Sprout, HeartHandshake, ShieldCheck, Users, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
      <Navbar />

      <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-20">
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#628A6F]">
            Our Purpose & Heritage
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[#102115] leading-tight">
            Restoring Trust Between the Soil and the Dining Table
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 leading-relaxed">
            Farm-to-Family was founded on a simple conviction: modern urban families deserve to know
            who grows their vegetables, without having to abandon their careers and buy agricultural
            land.
          </p>
        </div>

        {/* Founding Philosophy */}
        <div className="bg-white rounded-3xl p-8 sm:p-14 border border-[#D8D1C5] shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-[#B2763D]">
              The Core Promise
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#102115] leading-snug">
              &ldquo;You choose what your family eats. We take care of how it is grown.&rdquo;
            </h2>
            <p className="text-sm text-zinc-600 leading-relaxed">
              We operate at the intersection of private managed farming, premium food quality, and
              modern technology. We are not a digital middleman aggregating market surplus. We
              manage the soil, seeds, water, and agronomy end-to-end.
            </p>
            <p className="text-sm text-zinc-600 leading-relaxed">
              By pairing experienced agriculturalists with verified regenerative practices, we
              transform agriculture into an intimate, transparent family service.
            </p>
          </div>

          <div className="lg:col-span-6 aspect-4/3 rounded-2xl overflow-hidden shadow-md">
            <img
              src="https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=1200&q=80"
              alt="Farmer inspecting crop"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Agronomy Leadership Team */}
        <div className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#628A6F]">
              Scientific Guidance
            </span>
            <h3 className="font-serif text-3xl font-bold text-[#102115]">
              Meet Our Chief Agronomists
            </h3>
            <p className="text-xs sm:text-sm text-zinc-500">
              Seasoned researchers and master cultivators guiding each parcel.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Dr. Srinivas Murthy',
                role: 'Chief Agronomist, South Hub',
                credentials: 'Ph.D. Soil Microbiology, UAS Bangalore (28 Yrs Experience)',
                bio: 'Pioneered zero-synthetic root zone protocols and living microbial soil enrichment across Deccan plateau farms.',
                image:
                  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
              },
              {
                name: 'Kavita Deshmukh',
                role: 'Head of Agronomy, Western Ghats',
                credentials: 'M.Sc. Organic Agriculture, MPKV Rahuri (19 Yrs Experience)',
                bio: 'Specialist in drip fertigation using botanical extracts and precision natural pest shielding across Sahyadri farms.',
                image:
                  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
              },
              {
                name: 'Harinder Singh Brar',
                role: 'Director of Estate Cultivation, NCR',
                credentials: 'B.Sc. Horticulture, PAU Ludhiana (22 Yrs Experience)',
                bio: 'Third-generation agriculturalist leading cold-chain harvesting, estate design, and heirloom seed preservation.',
                image:
                  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
              },
            ].map((leader, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl overflow-hidden border border-[#D8D1C5] shadow-xs flex flex-col justify-between"
              >
                <div className="aspect-square relative">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-serif text-xl font-bold text-[#102115]">{leader.name}</h4>
                    <p className="text-xs font-semibold text-[#2D5A3C]">{leader.role}</p>
                    <p className="text-[11px] font-mono text-zinc-400 mt-0.5">
                      {leader.credentials}
                    </p>
                    <p className="text-xs text-zinc-600 leading-relaxed mt-2">{leader.bio}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Farmer Dignity & Living Wages */}
        <div className="bg-[#102115] text-white rounded-3xl p-8 sm:p-14 border border-[#234531] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1F3D2A] text-[#A1D1AF] text-xs font-bold uppercase tracking-wider">
              <HeartHandshake className="w-4 h-4" />
              <span>Fair Farmer Livelihood Pledge</span>
            </span>
            <h3 className="font-serif text-3xl font-bold text-white">
              Cultivators With Dignity & Predictable Incomes
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              Traditional farmers face unstable mandi prices and middlemen exploitation. At
              Farm-to-Family, every on-field cultivator receives predictable monthly salaries,
              medical insurance, and pride in farming honest, unadulterated food for appreciative
              families.
            </p>
          </div>

          <Link
            href="/plans"
            className="px-8 py-3.5 bg-[#FAF8F5] hover:bg-white text-[#102115] font-semibold text-xs uppercase tracking-wider rounded-full transition shadow-md shrink-0"
          >
            Explore Farming Plans
          </Link>
        </div>
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
