'use client';

import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  FileCheck,
  Eye,
  CheckCircle2,
  Droplet,
  Compass,
  AlertCircle,
  HelpCircle,
  Download,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';

export default function TransparencyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
      <Navbar />

      <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#172F1F] text-[#A1D1AF] text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-[#A1D1AF]" />
            <span>The Trust & Integrity Standard</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[#102115]">
            Transparent Cultivation
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 leading-relaxed">
            Why we refuse to use marketing buzzwords like &ldquo;100% organic&rdquo; without
            scientific verification, and how we deliver real, auditable trust to your family.
          </p>
        </div>

        {/* Why Buzzwords Fail vs What We Do */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#D8D1C5] shadow-xs space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-700 bg-red-50 px-3 py-1 rounded-full">
              <span>What Commercial Grocery Labels Do</span>
            </div>

            <h3 className="font-serif text-2xl font-bold text-[#102115]">
              Unregulated Marketing Claims
            </h3>

            <ul className="space-y-4 text-xs sm:text-sm text-zinc-600">
              <li className="flex items-start gap-3">
                <span className="text-red-500 font-bold text-base">✕</span>
                <span>
                  <strong>Vague Organic Stickers:</strong> Produce purchased from aggregators with zero
                  visibility into which farm or borehole it originated from.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 font-bold text-base">✕</span>
                <span>
                  <strong>Post-Harvest Chemical Waxes:</strong> Glossy supermarket apples and tomatoes
                  coated with synthetic preservatives to withstand months of warehouse holding.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 font-bold text-base">✕</span>
                <span>
                  <strong>Untested Water Supplies:</strong> Farms irrigated with downstream industrial
                  drainage high in heavy metals.
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-[#172F1F] text-white p-8 sm:p-10 rounded-3xl border border-[#234531] shadow-xl space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#A1D1AF] bg-[#20412B] px-3 py-1 rounded-full">
              <span>The Farm-to-Family Standard</span>
            </div>

            <h3 className="font-serif text-2xl font-bold text-white">
              Scientific, Auditable Transparency
            </h3>

            <ul className="space-y-4 text-xs sm:text-sm text-zinc-300">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#A1D1AF] shrink-0 mt-0.5" />
                <span>
                  <strong>Traceable to the Exact Plot:</strong> Every delivery crate is mapped to a
                  numbered plot ID (e.g. Plot B-14) that you can personally visit.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#A1D1AF] shrink-0 mt-0.5" />
                <span>
                  <strong>Published Lab Assays:</strong> Periodic water TDS and heavy metal tests from
                  NABL-accredited third-party labs available directly on your portal.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#A1D1AF] shrink-0 mt-0.5" />
                <span>
                  <strong>Zero Synthetic Systemic Sprays:</strong> We rely strictly on fermented
                  botanicals (neem cake, jeevamrutha, bio-char, Trichoderma inoculants).
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* The 4 Trust Pillars */}
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="font-serif text-3xl font-bold text-[#102115]">
              The 4 Pillars of Our Cultivation Protocol
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500">
              Standard operating procedures enforced daily across all participating agro-estates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                title: 'Soil Health First',
                desc: 'We cultivate soil biodiversity, not just crops. Beds are enriched with aged farmyard manure and beneficial mycorrhizae.',
                stat: 'SQI > 90/100',
              },
              {
                title: 'Deep Aquifer Testing',
                desc: 'Irrigation water is tested quarterly for nitrates, fluorides, and heavy metals. Average TDS kept under 210 mg/L.',
                stat: 'TDS < 210 mg/L',
              },
              {
                title: 'Cold-Chain Integrity',
                desc: 'Harvested pre-dawn before sunlight causes sugar degradation. Pre-chilled to 12°C–14°C in eco-insulated breathable packs.',
                stat: '< 12 Hours to Door',
              },
              {
                title: 'Open Gate Policy',
                desc: 'No secret closed compounds. Any subscribed family can book a weekend visit to walk their plot and inspect our practices.',
                stat: '100% Verifiable',
              },
            ].map((p, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-3xl border border-[#D8D1C5] shadow-xs space-y-3"
              >
                <span className="font-mono text-xs font-bold text-[#2D5A3C] uppercase tracking-wider block">
                  {p.stat}
                </span>
                <h4 className="font-serif text-lg font-bold text-[#102115]">{p.title}</h4>
                <p className="text-xs text-zinc-600 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sample Lab Assay Preview */}
        <div className="bg-[#FAF8F5] border-2 border-[#D8D1C5] rounded-3xl p-6 sm:p-10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#E5E0D8] gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#628A6F]">
                Verified Lab Report Sample
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#102115] mt-1">
                Anekal Agro Estate — Multi-Residue & Aquifer Lab Assay
              </h3>
              <p className="text-xs text-zinc-500">
                Conducted by EnviroCare Laboratories (NABL Accredited) • Sample Ref: EC-AGR-2026-904
              </p>
            </div>

            <button
              type="button"
              onClick={() => alert('Sample Laboratory Report downloaded!')}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[#D8D1C5] rounded-full text-xs font-semibold hover:bg-zinc-50 shadow-xs self-start sm:self-auto"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Lab Certificate PDF</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
            <div className="p-3 bg-white rounded-xl border border-[#E8E2D8]">
              <span className="text-[10px] text-zinc-400 block uppercase">Synthetic Pesticides</span>
              <span className="font-bold text-emerald-700 text-sm">NOT DETECTED (&lt;0.01 mg/kg)</span>
            </div>
            <div className="p-3 bg-white rounded-xl border border-[#E8E2D8]">
              <span className="text-[10px] text-zinc-400 block uppercase">Lead (Pb) & Arsenic</span>
              <span className="font-bold text-emerald-700 text-sm">BELOW DETECTION LIMIT</span>
            </div>
            <div className="p-3 bg-white rounded-xl border border-[#E8E2D8]">
              <span className="text-[10px] text-zinc-400 block uppercase">Soil Organic Carbon</span>
              <span className="font-bold text-zinc-900 text-sm">1.42% (High Fertility)</span>
            </div>
            <div className="p-3 bg-white rounded-xl border border-[#E8E2D8]">
              <span className="text-[10px] text-zinc-400 block uppercase">Water Microbial Count</span>
              <span className="font-bold text-emerald-700 text-sm">CONFORMS TO POTABLE</span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
