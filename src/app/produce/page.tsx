'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sprout, Filter, Clock, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import { useFarmStore } from '@/lib/farmStore';

export default function ProducePage() {
  const { config } = useFarmStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Vegetables' },
    { id: 'fruit', label: 'Fruit Vegetables (Tomato, Capsicum...)' },
    { id: 'root', label: 'Root Vegetables (Carrots...)' },
    { id: 'leafy', label: 'Leafy & Cruciferous (Cabbage...)' },
    { id: 'creeper', label: 'Creeper Gourds (Cucumber, Lauki...)' },
    { id: 'seasonal', label: 'Seasonal & Legumes (Peas, Specials)' },
  ];

  const filteredCatalog =
    selectedCategory === 'all'
      ? config.vegetableCatalog
      : config.vegetableCatalog.filter((v) => v.category === selectedCategory);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
      <Navbar />

      <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#628A6F]">
            Produce & Seasonality Matrix
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[#102115]">
            What We Grow For Your Family
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 leading-relaxed">
            Every crop is selected for genuine flavor, tender cellular structure, and clean mineral
            content. Here are the vegetables cultivated across our managed plots.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition ${
                selectedCategory === cat.id
                  ? 'bg-[#172F1F] text-white shadow-xs'
                  : 'bg-white border border-[#D8D1C5] text-zinc-700 hover:bg-[#F4EFE7]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Crops Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredCatalog.map((veg) => (
            <div
              key={veg.id}
              className="bg-white rounded-3xl overflow-hidden border border-[#D8D1C5] shadow-xs hover:shadow-md transition flex flex-col justify-between group"
            >
              <div className="aspect-4/3 relative overflow-hidden">
                <img
                  src={veg.image}
                  alt={veg.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-[#172F1F]/90 text-[#9EC9AB] text-[10px] font-mono font-bold uppercase backdrop-blur-sm">
                  {veg.season} season
                </span>
              </div>

              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#102115]">{veg.name}</h3>
                  <div className="flex items-center gap-2 text-xs text-zinc-500 mt-1">
                    <Clock className="w-3.5 h-3.5 text-[#2D5A3C]" />
                    <span>~{veg.typicalDaysToHarvest} Days to Harvest</span>
                  </div>
                  <p className="text-xs text-zinc-600 leading-relaxed mt-2">{veg.benefits}</p>
                </div>

                <div className="pt-3 border-t border-zinc-100 flex items-center justify-between text-[11px] text-[#2D5A3C] font-semibold">
                  <span>Non-GMO Heirloom</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Seasonality Notice */}
        <div className="bg-[#FAF8F5] border border-[#D8D1C5] rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h4 className="font-serif text-2xl font-bold text-[#102115]">
              Respecting the Seasonal Agronomy Calendar
            </h4>
            <p className="text-xs text-zinc-600 max-w-2xl leading-relaxed">
              We do not use artificial chemical ripeners to force out-of-season produce. Vegetables
              taste sweetest when harvested under their natural temperature and sunlight photoperiod.
            </p>
          </div>

          <Link
            href="/build-your-farm"
            className="px-6 py-3 bg-[#172F1F] hover:bg-[#20412B] text-white text-xs font-semibold rounded-full shrink-0"
          >
            Build Your Seasonal Basket
          </Link>
        </div>
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
