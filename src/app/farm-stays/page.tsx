'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Compass,
  Sprout,
  Sun,
  Moon,
  Heart,
  Users,
  Clock,
  Sparkles,
  CheckCircle2,
  Calendar,
  ArrowRight,
  ShieldCheck,
  Coffee,
  BookOpen,
  MapPin,
  ChevronRight,
  Smile,
  AlertCircle,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import FarmStayInterestModal from '@/components/FarmStayInterestModal';
import { FarmStayExperienceType } from '@/lib/types';
import { BLOG_POSTS } from '@/lib/blogData';

export default function FarmStaysPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] =
    useState<FarmStayExperienceType>('weekend');

  const openModal = (exp: FarmStayExperienceType = 'weekend') => {
    setSelectedExperience(exp);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
      <Navbar />

      <main className="flex-1 space-y-20 py-12 sm:py-16">
        {/* =========================================================================
            SECTION 1: HERO
           ========================================================================= */}
        <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          <div className="relative rounded-3xl overflow-hidden bg-[#0D1B11] text-white py-16 sm:py-24 px-6 sm:px-12 shadow-2xl">
            {/* Background Image with Overlay */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-35 mix-blend-luminosity scale-105"
              style={{
                backgroundImage:
                  'url(https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2000&q=85)',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0D1B11]/95 via-[#0D1B11]/80 to-[#0D1B11]/60" />

            {/* Content */}
            <div className="relative z-10 max-w-3xl space-y-6">
              {/* Status Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1A3824] border border-[#3E7952]/40 text-[#A1D1AF] text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Upcoming Experience — Register Your Interest</span>
              </div>

              {/* Tagline */}
              <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#9EC9AB]">
                Grow Closer to Nature. Stay Closer to What Matters.
              </p>

              {/* Main Headline */}
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Your Next Getaway Should Bring You Closer to Nature.
              </h1>

              {/* Supporting Copy */}
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-2xl">
                Imagine waking up to fresh air, spending unhurried time among green fields, enjoying
                farm-to-table meals and experiencing a slower pace of life. PureVegies Farm Stays are
                being developed for people who want a more meaningful way to spend their holidays.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <a
                  href="#experiences"
                  className="px-6 py-3.5 rounded-full bg-[#C48248] hover:bg-[#b0733d] text-white font-semibold text-xs uppercase tracking-wider transition shadow-md flex items-center gap-2"
                >
                  <span>Explore Farm Stay Experiences</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <button
                  type="button"
                  onClick={() => openModal('weekend')}
                  className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs uppercase tracking-wider transition backdrop-blur-sm"
                >
                  Register Your Interest
                </button>
              </div>

              {/* Trust Subtext */}
              <div className="pt-2 flex items-center gap-2 text-xs text-zinc-400">
                <ShieldCheck className="w-4 h-4 text-[#A1D1AF]" />
                <span>
                  Planned countryside retreats • Not open for immediate booking • Express interest for priority access
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 2: CAMPAIGN MANIFESTO & PHILOSOPHY
           ========================================================================= */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-8 rounded-3xl bg-white border border-[#D8D1C5] shadow-xs space-y-3">
              <Sun className="w-6 h-6 text-[#B2763D] mx-auto" />
              <h3 className="font-serif text-xl font-bold text-[#102115]">
                &ldquo;Your Weekend Deserves More Than Another Hotel.&rdquo;
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Step outside of generic hotel corridors. Wake up to dew on vegetable leaves, morning
                birds, and open skies.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-[#D8D1C5] shadow-xs space-y-3">
              <Compass className="w-6 h-6 text-[#2D5A3C] mx-auto" />
              <h3 className="font-serif text-xl font-bold text-[#102115]">
                &ldquo;Come for the Weekend. Leave With a Little More Peace.&rdquo;
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                No packed itineraries or tourist queues. Just time to breathe deeply, eat honest food,
                and spend quiet hours with loved ones.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-[#D8D1C5] shadow-xs space-y-3">
              <Sparkles className="w-6 h-6 text-[#B2763D] mx-auto" />
              <h3 className="font-serif text-xl font-bold text-[#102115]">
                &ldquo;Celebrate the Freedom to Enjoy Your Journey.&rdquo;
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Retirement, anniversaries, and personal milestones deserve a peaceful celebration
                surrounded by living nature.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: THE 5 FARM STAY EXPERIENCES
           ========================================================================= */}
        <section id="experiences" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#628A6F]">
              Tailored Countryside Escapes
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#102115]">
              Five Thoughtfully Planned Experiences
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
              We are developing farm stays for different budgets and life stages—from short weekend
              refreshes to milestone retirement vacations.
            </p>
          </div>

          <div className="space-y-12">
            {/* -------------------------------------------------------------------
                EXPERIENCE 1: WEEKEND FARM ESCAPE
               ------------------------------------------------------------------- */}
            <div className="bg-white rounded-3xl border border-[#D8D1C5] overflow-hidden shadow-xs grid grid-cols-1 lg:grid-cols-12 items-center">
              <div className="lg:col-span-6 p-8 sm:p-12 space-y-6">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E2ECE5] text-[#20412B] text-xs font-bold uppercase tracking-wider">
                  <Sun className="w-3.5 h-3.5" />
                  <span>Experience 01 • Short Breaks</span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#102115]">
                  Escape the City. Rediscover the Weekend.
                </h3>

                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  &ldquo;Your weekend is precious. Spend it somewhere that lets you slow down, breathe
                  deeply and reconnect with the people who matter.&rdquo;
                </p>

                <div className="space-y-2 pt-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                    What to expect:
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-xs text-zinc-700">
                    <span className="flex items-center gap-2">✓ 1–2 night countryside stay</span>
                    <span className="flex items-center gap-2">✓ Guided morning farm walks</span>
                    <span className="flex items-center gap-2">✓ Fresh farm-to-table meals</span>
                    <span className="flex items-center gap-2">✓ Stargazing evening skies</span>
                    <span className="flex items-center gap-2">✓ Seasonal farming activities</span>
                    <span className="flex items-center gap-2">✓ Outdoor reading spaces</span>
                  </div>
                </div>

                <div className="pt-4 flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => openModal('weekend')}
                    className="px-6 py-3 rounded-full bg-[#172F1F] hover:bg-[#20412B] text-white text-xs font-semibold uppercase tracking-wider transition shadow-sm"
                  >
                    Register for Weekend Stays
                  </button>
                  <Link
                    href="/blog/weekend-farm-getaway"
                    className="text-xs font-semibold text-[#2D5A3C] hover:underline flex items-center gap-1"
                  >
                    <span>Read Article</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-6 h-full min-h-[320px] aspect-4/3 lg:aspect-auto">
                <img
                  src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80"
                  alt="Weekend countryside field"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* -------------------------------------------------------------------
                EXPERIENCE 2: FAMILY FARM VACATION
               ------------------------------------------------------------------- */}
            <div className="bg-white rounded-3xl border border-[#D8D1C5] overflow-hidden shadow-xs grid grid-cols-1 lg:grid-cols-12 items-center">
              <div className="lg:col-span-6 h-full min-h-[320px] aspect-4/3 lg:aspect-auto order-last lg:order-first">
                <img
                  src="https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=1000&q=80"
                  alt="Children learning about vegetables on a farm"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="lg:col-span-6 p-8 sm:p-12 space-y-6">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF2E0] text-[#B2763D] text-xs font-bold uppercase tracking-wider">
                  <Users className="w-3.5 h-3.5" />
                  <span>Experience 02 • For Parents & Kids</span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#102115]">
                  Give Your Family a Holiday Beyond Screens.
                </h3>

                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  &ldquo;Let children discover where food comes from, give families time to reconnect and
                  create memories beyond malls and screens.&rdquo;
                </p>

                <div className="space-y-2 pt-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                    What to expect:
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-xs text-zinc-700">
                    <span className="flex items-center gap-2">✓ Family cottage stay</span>
                    <span className="flex items-center gap-2">✓ Pulling carrots & harvesting</span>
                    <span className="flex items-center gap-2">✓ Soil & seed discovery</span>
                    <span className="flex items-center gap-2">✓ Outdoor play spaces</span>
                    <span className="flex items-center gap-2">✓ Family dining with farm food</span>
                    <span className="flex items-center gap-2">✓ Educational agronomist walks</span>
                  </div>
                </div>

                <div className="pt-4 flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => openModal('family')}
                    className="px-6 py-3 rounded-full bg-[#172F1F] hover:bg-[#20412B] text-white text-xs font-semibold uppercase tracking-wider transition shadow-sm"
                  >
                    Explore Family Farm Vacations
                  </button>
                  <Link
                    href="/blog/family-farm-vacation"
                    className="text-xs font-semibold text-[#2D5A3C] hover:underline flex items-center gap-1"
                  >
                    <span>Read Article</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* -------------------------------------------------------------------
                EXPERIENCE 3: COUPLES & ANNIVERSARY RETREATS
               ------------------------------------------------------------------- */}
            <div className="bg-white rounded-3xl border border-[#D8D1C5] overflow-hidden shadow-xs grid grid-cols-1 lg:grid-cols-12 items-center">
              <div className="lg:col-span-6 p-8 sm:p-12 space-y-6">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-bold uppercase tracking-wider">
                  <Heart className="w-3.5 h-3.5" />
                  <span>Experience 03 • Couples & Milestones</span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#102115]">
                  Celebrate Your Story Somewhere Beautiful.
                </h3>

                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  &ldquo;Some moments deserve more than a hotel room. Celebrate your relationship in a
                  peaceful setting where time slows down and every moment feels more personal.&rdquo;
                </p>

                <div className="space-y-2 pt-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                    What to expect:
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-xs text-zinc-700">
                    <span className="flex items-center gap-2">✓ Peaceful private surroundings</span>
                    <span className="flex items-center gap-2">✓ Fresh seasonal celebration dining</span>
                    <span className="flex items-center gap-2">✓ Romantic garden walks</span>
                    <span className="flex items-center gap-2">✓ Beautiful landscape photography</span>
                    <span className="flex items-center gap-2">✓ Extended weekend packages</span>
                    <span className="flex items-center gap-2">✓ Star-filled evening skies</span>
                  </div>
                </div>

                <div className="pt-4 flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => openModal('couples')}
                    className="px-6 py-3 rounded-full bg-[#172F1F] hover:bg-[#20412B] text-white text-xs font-semibold uppercase tracking-wider transition shadow-sm"
                  >
                    Register for Couples&apos; Retreats
                  </button>
                  <Link
                    href="/blog/anniversary-farm-getaway"
                    className="text-xs font-semibold text-[#2D5A3C] hover:underline flex items-center gap-1"
                  >
                    <span>Read Article</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-6 h-full min-h-[320px] aspect-4/3 lg:aspect-auto">
                <img
                  src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80"
                  alt="Couple enjoying quiet countryside retreat"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* -------------------------------------------------------------------
                EXPERIENCE 4: THE RETIREMENT FARM ESCAPE (PRIORITY SPOTLIGHT!)
               ------------------------------------------------------------------- */}
            <div className="bg-[#172F1F] text-white rounded-3xl border border-[#234531] overflow-hidden shadow-2xl relative p-8 sm:p-14 space-y-10">
              {/* Gold Glow Accent */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#C48248]/15 rounded-full blur-3xl pointer-events-none" />

              <div className="max-w-3xl space-y-4 relative z-10">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#20412B] text-[#A1D1AF] text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-[#C48248]" />
                  <span>Priority Milestone Campaign • The Retirement Escape</span>
                </div>

                <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                  You Worked Hard for Decades.
                  <br />
                  Now Make Time for Yourself.
                </h3>

                <p className="font-serif italic text-lg sm:text-xl text-[#A1D1AF]">
                  &ldquo;Why Should Honeymoon Be the Only Once-in-a-Lifetime Escape? Retirement Deserves a
                  Getaway Too.&rdquo;
                </p>

                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  After decades of responsibilities, deadlines, commutes and commitments, retirement
                  opens a whole new chapter. It is an opportunity to slow down, reconnect with loved
                  ones, explore nature and enjoy the freedom to choose how you spend your days.
                </p>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  PureVegies is developing peaceful farm experiences for people who want to celebrate
                  this new chapter with nature, good food, unhurried mornings and meaningful moments.
                </p>
              </div>

              {/* 5 Core Emotional Pillars */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2 text-center text-xs font-semibold relative z-10">
                {['FREEDOM', 'NEW BEGINNINGS', 'TIME FOR YOURSELF', 'TIME WITH FAMILY', 'A NEW CHAPTER'].map(
                  (pillar, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-2xl bg-white/5 border border-white/10 text-[#A1D1AF] uppercase tracking-wider text-[11px]"
                    >
                      {pillar}
                    </div>
                  )
                )}
              </div>

              {/* Retreat Formats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <span className="font-mono text-xs text-[#C48248] uppercase tracking-wider block">
                    3-Night Getaway
                  </span>
                  <h4 className="font-serif text-lg font-bold text-white">The Milestone Escape</h4>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    A peaceful weekend retreat to mark the final working day and welcome unhurried life.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <span className="font-mono text-xs text-[#C48248] uppercase tracking-wider block">
                    7-Night Holiday
                  </span>
                  <h4 className="font-serif text-lg font-bold text-white">The Countryside Immersion</h4>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    A week of living soil, farm walks, organic meals, reading in the verandah, and quiet sunsets.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <span className="font-mono text-xs text-[#C48248] uppercase tracking-wider block">
                    Extended Stays
                  </span>
                  <h4 className="font-serif text-lg font-bold text-white">Extended Slow Living</h4>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    Multi-week countryside stays to enjoy nature at your own pace with your partner.
                  </p>
                </div>
              </div>

              {/* CTAs */}
              <div className="pt-2 flex flex-wrap items-center gap-4 relative z-10">
                <button
                  type="button"
                  onClick={() => openModal('retirement')}
                  className="px-8 py-3.5 rounded-full bg-[#C48248] hover:bg-[#b0733d] text-white text-xs font-semibold uppercase tracking-wider transition shadow-lg"
                >
                  Register for the First Retirement Retreat
                </button>

                <Link
                  href="/blog/retirement-deserves-a-farm-vacation"
                  className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold uppercase tracking-wider transition border border-white/20 flex items-center gap-2"
                >
                  <span>Read Our Retirement Story</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="pt-2 border-t border-white/10 text-[11px] text-zinc-400">
                Notice: PureVegies Farm Stays are countryside holiday experiences, not retirement homes,
                healthcare facilities, or assisted-living services.
              </div>
            </div>

            {/* -------------------------------------------------------------------
                EXPERIENCE 5: SLOW LIVING & EXTENDED FARM STAYS
               ------------------------------------------------------------------- */}
            <div className="bg-white rounded-3xl border border-[#D8D1C5] overflow-hidden shadow-xs grid grid-cols-1 lg:grid-cols-12 items-center">
              <div className="lg:col-span-6 h-full min-h-[320px] aspect-4/3 lg:aspect-auto order-last lg:order-first">
                <img
                  src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1000&q=80"
                  alt="Quiet verandah overlooking countryside vegetable farm"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="lg:col-span-6 p-8 sm:p-12 space-y-6">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E2ECE5] text-[#20412B] text-xs font-bold uppercase tracking-wider">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Experience 05 • Slow Living</span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#102115]">
                  Stay Longer. Live Slower.
                </h3>

                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  &ldquo;Not every holiday needs a packed itinerary. Sometimes the best experience is having
                  time to enjoy the morning, walk among the fields, eat thoughtfully prepared food and
                  spend your day at your own pace.&rdquo;
                </p>

                <div className="space-y-2 pt-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                    What to expect:
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-xs text-zinc-700">
                    <span className="flex items-center gap-2">✓ 7- to 14-night extended stays</span>
                    <span className="flex items-center gap-2">✓ Quiet reading & work verandahs</span>
                    <span className="flex items-center gap-2">✓ Wholesome daily farm meals</span>
                    <span className="flex items-center gap-2">✓ Optional daily farming activities</span>
                    <span className="flex items-center gap-2">✓ Unhurried morning walks</span>
                    <span className="flex items-center gap-2">✓ Clean air & restorative peace</span>
                  </div>
                </div>

                <div className="pt-4 flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => openModal('extended')}
                    className="px-6 py-3 rounded-full bg-[#172F1F] hover:bg-[#20412B] text-white text-xs font-semibold uppercase tracking-wider transition shadow-sm"
                  >
                    Register Interest in Extended Stays
                  </button>
                  <Link
                    href="/blog/slow-living-farm-stays"
                    className="text-xs font-semibold text-[#2D5A3C] hover:underline flex items-center gap-1"
                  >
                    <span>Read Article</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: WHO ARE PUREVEGIES FARM STAYS FOR? (10 GROUPS)
           ========================================================================= */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          <div className="bg-[#F4EFE7] rounded-3xl p-8 sm:p-12 border border-[#E5E0D8] space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#628A6F]">
                Welcoming Diverse Travellers
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#102115]">
                Meaningful Stays for Every Life Stage
              </h3>
              <p className="text-xs text-zinc-600">
                Created for people looking for a deeper connection to nature, good food, and peaceful
                surroundings—accessible across diverse budgets.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {[
                { title: 'Weekend Getaways', desc: 'Professionals seeking respite from city grind' },
                { title: 'Couples & Honeymoons', desc: 'Quiet moments under starlit skies' },
                { title: 'New Retirees', desc: 'Inaugurate freedom with countryside peace' },
                { title: 'Retirement Celebrations', desc: 'Family milestone gatherings' },
                { title: 'Extended Countryside Stays', desc: 'Slow living for seniors' },
                { title: 'Anniversaries & Birthdays', desc: 'Celebrate stories in nature' },
                { title: 'Curious Children', desc: 'Screen-free tactile farming discovery' },
                { title: 'Subscribed Members', desc: 'Visit where your family food grows' },
                { title: 'Remote Workations', desc: 'Quiet writing and thoughtful focus' },
                { title: 'Agro-Tourism Groups', desc: 'Learning biological natural farming' },
              ].map((grp, i) => (
                <div key={i} className="p-4 bg-white rounded-2xl border border-[#D8D1C5] space-y-1">
                  <h4 className="font-serif text-sm font-bold text-[#102115]">{grp.title}</h4>
                  <p className="text-[11px] text-zinc-500 leading-relaxed">{grp.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 5: BLOG SPOTLIGHT
           ========================================================================= */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#628A6F]">
                Insights & Stories
              </span>
              <h3 className="font-serif text-2xl sm:text-4xl font-bold text-[#102115] mt-1">
                Explore Our Farm Stay Journal
              </h3>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2D5A3C] hover:underline"
            >
              <span>View All 10 Articles</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BLOG_POSTS.slice(0, 3).map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-white rounded-3xl overflow-hidden border border-[#D8D1C5] shadow-xs hover:shadow-md transition flex flex-col justify-between"
              >
                <div className="aspect-16/10 overflow-hidden relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-[#172F1F]/90 text-[#9EC9AB] text-[10px] font-mono font-bold uppercase backdrop-blur-sm">
                    {post.category}
                  </span>
                </div>

                <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-[10px] text-zinc-400 font-mono block">
                      {post.publishedDate} • {post.readingTime}
                    </span>
                    <h4 className="font-serif text-lg font-bold text-[#102115] group-hover:text-[#2D5A3C] transition leading-snug">
                      {post.title}
                    </h4>
                    <p className="text-xs text-zinc-600 line-clamp-2 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-zinc-100 flex items-center justify-between text-xs font-semibold text-[#2D5A3C]">
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* =========================================================================
            SECTION 6: REGISTRATION CALLOUT BANNER
           ========================================================================= */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          <div className="bg-[#102115] text-white rounded-3xl p-8 sm:p-14 border border-[#234531] shadow-xl text-center space-y-6 relative overflow-hidden">
            <div className="max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#A1D1AF]">
                Join the Preview Cohort
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white">
                Be the First to Experience Countryside Peace.
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                Tell us which farm experience interests you most. As our countryside cottages and
                natural farming retreats reach operational certification, priority preview dates will
                be shared with registered guests.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => openModal('weekend')}
                className="px-8 py-3.5 rounded-full bg-[#C48248] hover:bg-[#b0733d] text-white font-semibold text-xs uppercase tracking-wider transition shadow-md"
              >
                Register Your Interest Now
              </button>
              <Link
                href="/plans"
                className="px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs uppercase tracking-wider transition"
              >
                Explore Farming Subscriptions
              </Link>
            </div>

            <p className="text-[11px] text-zinc-400">
              Zero obligation • No payment required • Submitting does not constitute an immediate booking
            </p>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppFloat />

      {/* Modal */}
      <FarmStayInterestModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialExperience={selectedExperience}
      />
    </div>
  );
}
