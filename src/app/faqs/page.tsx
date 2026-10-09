'use client';

import React, { useState } from 'react';
import { Search, ChevronDown, MessageCircle, HelpCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import { useFarmStore } from '@/lib/farmStore';

export default function FaqsPage() {
  const { config } = useFarmStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<number | null>(0);

  const faqItems = [
    {
      id: 0,
      cat: 'land',
      q: 'Do I need to own land?',
      a: 'No. PureVegies provides and manages the farmland used for your subscription.',
    },
    {
      id: 1,
      cat: 'produce',
      q: 'What is natural farming?',
      a: 'Natural farming is an approach that emphasises soil health, ecological processes, biodiversity and responsible cultivation practices. The specific practices used by PureVegies will be explained transparently.',
    },
    {
      id: 2,
      cat: 'produce',
      q: 'Is your produce certified organic?',
      a: 'Our primary focus is natural farming. Organic certification is a separate matter. Please check the current certification status and farming information for the farm supplying your produce.',
    },
    {
      id: 3,
      cat: 'produce',
      q: 'Do you use pesticides?',
      a: 'We aim to use appropriate, responsible crop-management practices. Please contact our farm team for details of the specific practices followed on a particular farm.',
    },
    {
      id: 4,
      cat: 'produce',
      q: 'Can I choose the vegetables?',
      a: 'Yes. You can express your preferences and select from available crops, subject to season, farm conditions and your plan.',
    },
    {
      id: 5,
      cat: 'subscription',
      q: 'Who manages the farm?',
      a: 'PureVegies manages the farmland, agricultural team, crop planning, cultivation, harvesting and delivery according to the selected service.',
    },
    {
      id: 6,
      cat: 'land',
      q: 'Do I own the allocated land?',
      a: 'No. The subscription provides a managed farming service, not ownership of agricultural land.',
    },
    {
      id: 7,
      cat: 'land',
      q: 'Where is the farm located?',
      a: 'Our managed farms are situated in ecologically balanced, unpolluted agricultural belts outside major metropolitan hubs, featuring clean groundwater and fertile soil.',
    },
    {
      id: 8,
      cat: 'visits',
      q: 'Can I visit the farm?',
      a: 'Farm visits may be available depending on the farm location and your plan. Contact our farm advisor to arrange a weekend family visit.',
    },
    {
      id: 9,
      cat: 'delivery',
      q: 'How often will I receive produce?',
      a: 'Depending on your plan and household needs, deliveries are made once or twice a week. Harvests are carried out at pre-dawn, quality-inspected, and delivered to your doorstep within hours.',
    },
    {
      id: 10,
      cat: 'subscription',
      q: 'What happens if a crop fails?',
      a: 'Farming is subject to natural micro-climates. To ensure your kitchen supply remains uninterrupted, our managed farms maintain buffer cultivation beds managed under identical natural farming protocols.',
    },
  ];

  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'subscription', label: 'Subscription & Plans' },
    { id: 'produce', label: 'Produce & Crops' },
    { id: 'land', label: 'Land & Locations' },
    { id: 'delivery', label: 'Harvest & Delivery' },
    { id: 'visits', label: 'Farm Visits' },
  ];

  const filteredFaqs = faqItems.filter((item) => {
    const matchesCat = activeCategory === 'all' || item.cat === activeCategory;
    const matchesSearch =
      item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.a.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
      <Navbar />

      <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full space-y-12">
        <div className="text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#628A6F]">
            Knowledge Base
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[#102115]">
            Frequently Asked Questions
          </h1>
          <p className="text-base text-zinc-600 max-w-2xl mx-auto leading-relaxed">
            Transparent answers regarding plot allocation, agronomy practices, delivery cadence, and
            subscription management.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-5 h-5 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions (e.g. land, delivery, ₹7 lakh, organic, water)..."
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-[#D8D1C5] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#172F1F] shadow-xs"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                activeCategory === c.id
                  ? 'bg-[#172F1F] text-white shadow-xs'
                  : 'bg-white border border-[#D8D1C5] text-zinc-700 hover:bg-[#F4EFE7]'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* FAQs List */}
        <div className="space-y-4">
          {filteredFaqs.map((faq) => {
            const isOpen = expandedId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-[#E5E0D8] overflow-hidden transition"
              >
                <button
                  type="button"
                  onClick={() => setExpandedId(isOpen ? null : faq.id)}
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

        {/* Custom Help Box */}
        <div className="bg-[#FAF8F5] border border-[#D8D1C5] rounded-3xl p-8 text-center space-y-4">
          <HelpCircle className="w-8 h-8 text-[#2D5A3C] mx-auto" />
          <h4 className="font-serif text-2xl font-bold text-[#102115]">Still have questions?</h4>
          <p className="text-xs sm:text-sm text-zinc-600 max-w-md mx-auto">
            Our lead agricultural concierge is available on WhatsApp to answer any query regarding
            soil tests, crop varieties, or visiting schedules.
          </p>
          <a
            href={`https://wa.me/${config.whatsappNumber.replace(/[^0-9]/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white text-xs font-semibold rounded-full shadow-xs hover:bg-[#20BA5A] transition"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Chat Directly on WhatsApp</span>
          </a>
        </div>
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
