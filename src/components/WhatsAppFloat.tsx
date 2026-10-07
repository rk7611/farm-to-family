'use client';

import React, { useState } from 'react';
import { MessageCircle, X, ArrowRight, ShieldCheck, Clock } from 'lucide-react';
import { useFarmStore } from '@/lib/farmStore';
import { analytics } from '@/lib/analytics';

export default function WhatsAppFloat() {
  const { config } = useFarmStore();
  const [isOpen, setIsOpen] = useState(false);

  const cleanNumber = config.whatsappNumber.replace(/[^0-9]/g, '');

  const quickPrompts = [
    {
      label: 'Ask about My Family Farm (₹10k/mo)',
      text: 'Hi Farm-to-Family, I want to learn more about the ₹10,000/mo Family Farm subscription.',
    },
    {
      label: 'Ask about My Dedicated Farm (₹20k/mo)',
      text: 'Hi Farm-to-Family, I would like details about having a dedicated farm plot for my family.',
    },
    {
      label: 'Inquire for Private Farm (₹7 Lakh/yr)',
      text: 'Hello, I am interested in the My Private Farm managed estate plan. Please connect me with a senior manager.',
    },
    {
      label: 'Book a weekend farm visit',
      text: 'Hi, I would like to schedule a visit to one of your partner farm plots with my family.',
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Drawer */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-[#D8D1C5] overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <div className="bg-[#172F1F] p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300">
                <MessageCircle className="w-5 h-5 text-emerald-300" />
              </div>
              <div>
                <p className="font-semibold text-sm leading-tight">Farm-to-Family Concierge</p>
                <p className="text-[11px] text-emerald-300 flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Lead Agronomist Online
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-zinc-400 hover:text-white transition p-1"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 bg-[#FAF8F5] space-y-3">
            <div className="bg-white p-3 rounded-xl border border-[#E8E2D8] text-xs text-[#202521] space-y-1.5">
              <p className="font-medium">
                👋 Welcome! How can we assist with your family&rsquo;s farming plan today?
              </p>
              <p className="text-zinc-500 text-[11px]">
                Typical reply time: <span className="font-semibold text-zinc-700">under 10 minutes</span>
              </p>
            </div>

            <p className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider px-1">
              Quick Inquiries:
            </p>

            <div className="space-y-1.5">
              {quickPrompts.map((prompt, idx) => (
                <a
                  key={idx}
                  href={`https://wa.me/${cleanNumber}?text=${encodeURIComponent(prompt.text)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => analytics.whatsappClick('quick_prompt', prompt.label)}
                  className="block p-2.5 bg-white hover:bg-[#F2ECE3] border border-[#E8E2D8] rounded-xl text-xs text-[#172F1F] font-medium transition group"
                >
                  <div className="flex items-center justify-between">
                    <span>{prompt.label}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-[#172F1F] transition-transform group-hover:translate-x-1" />
                  </div>
                </a>
              ))}
            </div>

            <a
              href={`https://wa.me/${cleanNumber}?text=${encodeURIComponent(
                'Hi Farm-to-Family, I would like to chat about getting my family a managed farm.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => analytics.whatsappClick('custom_chat', 'Open Custom Chat')}
              className="mt-2 w-full py-2.5 px-4 bg-[#25D366] hover:bg-[#20BA5A] text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-2 shadow-sm transition"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Open Custom Chat on WhatsApp</span>
            </a>
          </div>

          <div className="bg-[#F4EFE7] px-4 py-2 border-t border-[#E8E2D8] text-[10px] text-zinc-500 flex items-center justify-between">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#2D5A3C]" />
              Official WhatsApp Verified
            </span>
            <span>{config.whatsappNumber}</span>
          </div>
        </div>
      )}

      {/* Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 px-4 py-3 bg-[#172F1F] text-white rounded-full shadow-xl hover:bg-[#20412B] transition-all hover:scale-105 group border border-[#3E7952]/40"
        aria-label="Chat with Farm Advisor"
      >
        <div className="relative">
          <MessageCircle className="w-5 h-5 text-[#A1D1AF]" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#25D366] rounded-full border-2 border-[#172F1F]" />
        </div>
        <span className="text-xs font-semibold tracking-wide hidden sm:inline">
          Chat With Farm Advisor
        </span>
      </button>
    </div>
  );
}
