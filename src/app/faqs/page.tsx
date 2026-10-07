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
      a: 'No, absolutely not. Farm-to-Family operates long-term leased and managed agro-estates with tested soil and water infrastructure. When you subscribe, a specific plot area or dedicated section is allocated to your family.',
    },
    {
      id: 1,
      cat: 'subscription',
      q: 'How does the subscription work?',
      a: 'You select a plan based on your household size and preferences. We allocate your plot, plan your crop cycle, manage daily irrigation, agronomy, and bio-protection. As crops ripen, our team harvests, conducts quality inspections, and delivers directly to your home on scheduled weekly cycles.',
    },
    {
      id: 2,
      cat: 'produce',
      q: 'Can I choose my vegetables?',
      a: 'Yes. In both "My Dedicated Farm" and "My Private Farm" plans, you hand-select your desired vegetables and culinary herbs from our seasonal agronomy matrix. In "My Family’s Farm", our lead agronomists curate a high-variety seasonal harvest basket for your family.',
    },
    {
      id: 3,
      cat: 'visits',
      q: 'Can I visit the farm?',
      a: 'Yes! Transparency is the foundation of our service. Subscribed families can book guided weekend farm visits. You can walk through your assigned plot, meet the agronomists, inspect our drip irrigation system, and even harvest with your children.',
    },
    {
      id: 4,
      cat: 'technology',
      q: 'How do I track my crops?',
      a: 'You receive access to your private Customer Dashboard. There, you can view your Plot ID, sowing dates, current crop lifecycle stage, days until expected harvest, weekly photo/video updates from the field, and even live farm camera feeds on private plans.',
    },
    {
      id: 5,
      cat: 'delivery',
      q: 'How often will I receive produce?',
      a: 'Depending on your plan and household needs, deliveries are made once or twice a week. Harvests are carried out at pre-dawn (5:30 AM – 8:30 AM), pre-chilled to prevent moisture loss, and delivered to your doorstep within hours.',
    },
    {
      id: 6,
      cat: 'subscription',
      q: 'What happens if a crop fails?',
      a: 'Farming is subject to natural micro-climates. To ensure your kitchen supply is never interrupted, our estates maintain buffer cultivation beds managed under identical zero-synthetic protocols. If an unseasonal weather event damages a specific crop, your delivery basket is fulfilled from our monitored reserve beds.',
    },
    {
      id: 7,
      cat: 'subscription',
      q: 'Can I upgrade my plan?',
      a: 'Yes. You can upgrade or adjust your plan tier and crop selections as your household produce requirements grow, directly through your customer dashboard or by consulting your assigned farm manager.',
    },
    {
      id: 8,
      cat: 'subscription',
      q: 'What is included in the ₹7 lakh private farm plan?',
      a: 'The "My Private Farm" tier is designed for High-Net-Worth households seeking an exclusive private estate experience. It includes up to 1/2 acre of allocated land, bespoke heirloom crop planning, a dedicated senior farm manager, live PTZ camera feeds, custom chef requests, artisan wooden crate packaging, and private weekend farm retreats.',
    },
    {
      id: 9,
      cat: 'produce',
      q: 'Is the produce certified organic?',
      a: 'We adhere to a strict policy of transparency: we do not make unsupported claims such as "100% organic" or "zero pesticides" unless backed by accredited laboratory certifications. Instead, we practice verified bio-dynamic methods: zero synthetic systemic chemicals, certified neem and microbial inoculants, dual-filtered water, and regular third-party heavy metal/nitrate residue testing reports which are openly visible on your dashboard.',
    },
    {
      id: 10,
      cat: 'land',
      q: 'Where are the farms located?',
      a: 'Our participating agro-estates are strategically situated in pristine rural green-belts within 45 to 90 minutes of major urban centers: Anekal Foothills (South Bengaluru), Baramati Ridge (Pune / Western Maharashtra), and Sohna Rural Corridor (Delhi NCR / Gurugram).',
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
