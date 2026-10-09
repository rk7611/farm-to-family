'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import FarmStayInterestModal from '@/components/FarmStayInterestModal';
import { FarmStayExperienceType } from '@/lib/types';

interface ArticleClientActionsProps {
  ctaText: string;
  ctaExperience: FarmStayExperienceType;
}

export default function ArticleClientActions({
  ctaText,
  ctaExperience,
}: ArticleClientActionsProps) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="bg-[#172F1F] text-white rounded-3xl p-8 sm:p-10 border border-[#234531] shadow-xl space-y-6">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#A1D1AF]">
          <Sparkles className="w-4 h-4 text-[#C48248]" />
          <span>Upcoming Farm Stay Experience</span>
        </div>

        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-snug">
          Inspired to Experience Countryside Peace?
        </h3>

        <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-2xl">
          PureVegies is exploring farm stays that bring together natural farming, peaceful
          surroundings, and thoughtfully planned hospitality. Register your interest to receive
          priority preview access as our countryside retreats develop.
        </p>

        <div className="flex flex-wrap items-center gap-4 pt-2">
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="px-8 py-3.5 rounded-full bg-[#C48248] hover:bg-[#b0733d] text-white text-xs font-semibold uppercase tracking-wider transition shadow-md flex items-center gap-2"
          >
            <span>{ctaText}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <Link
            href="/farm-stays"
            className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold uppercase tracking-wider transition"
          >
            Explore All 5 Experiences
          </Link>
        </div>

        <div className="pt-2 border-t border-white/10 flex items-center gap-2 text-[11px] text-zinc-400">
          <ShieldCheck className="w-3.5 h-3.5 text-[#A1D1AF]" />
          <span>
            Upcoming experience • Zero financial commitment • Registering does not constitute a booking
          </span>
        </div>
      </div>

      <FarmStayInterestModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialExperience={ctaExperience}
      />
    </>
  );
}
