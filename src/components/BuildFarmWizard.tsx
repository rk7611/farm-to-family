'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Users,
  Check,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Calendar,
  Layers,
  Scale,
  MessageCircle,
  PhoneCall,
  ShieldCheck,
  CheckCircle2,
  RefreshCw,
} from 'lucide-react';
import { useFarmStore } from '@/lib/farmStore';
import { PlanTier } from '@/lib/types';
import { analytics } from '@/lib/analytics';
import LeadModal from './LeadModal';

export default function BuildFarmWizard() {
  const { config } = useFarmStore();

  // Wizard state
  const [step, setStep] = useState(1);
  const [familySize, setFamilySize] = useState<'1–2' | '3–4' | '5–6' | '7+'>('3–4');
  const [selectedVegs, setSelectedVegs] = useState<string[]>([
    'Tomato',
    'Carrot',
    'Cucumber',
    'Capsicum',
    'French Beans',
  ]);
  const [priority, setPriority] = useState<
    'Maximum variety' | 'Specific vegetables' | 'Seasonal produce' | 'Family supply' | 'Premium quality'
  >('Family supply');

  const [leadModalOpen, setLeadModalOpen] = useState(false);

  // Track start of wizard
  React.useEffect(() => {
    analytics.buildFarmStart();
  }, []);

  // Track completion when reaching step 4
  React.useEffect(() => {
    if (step === 4) {
      analytics.buildFarmComplete({
        familySize,
        cropsCount: selectedVegs.length,
        priority,
      });
    }
  }, [step, familySize, selectedVegs.length, priority]);

  const vegetableList = [
    { name: 'Carrot', icon: '🥕', tag: 'Root' },
    { name: 'Cabbage', icon: '🥬', tag: 'Leafy' },
    { name: 'Cauliflower', icon: '🥦', tag: 'Cruciferous' },
    { name: 'Capsicum', icon: '🫑', tag: 'Fruit' },
    { name: 'Bottle Gourd', icon: '🥒', tag: 'Creeper' },
    { name: 'Green Chilli', icon: '🌶️', tag: 'Aromatic' },
    { name: 'Green Peas', icon: '🫛', tag: 'Seasonal' },
    { name: 'Brinjal', icon: '🍆', tag: 'Fruit' },
    { name: 'Cucumber', icon: '🥒', tag: 'Creeper' },
    { name: 'Tomato', icon: '🍅', tag: 'Fruit' },
    { name: 'French Beans', icon: '🌱', tag: 'Legume' },
    { name: 'Seasonal Vegetables', icon: '🌾', tag: 'Agronomist Pick' },
  ];

  const priorities = [
    {
      id: 'Family supply',
      title: 'Family supply',
      desc: 'Consistent volume to meet daily kitchen cooking staples.',
    },
    {
      id: 'Premium quality',
      title: 'Premium quality',
      desc: 'Top-tier taste, heirloom varieties, peak nutrition.',
    },
    {
      id: 'Specific vegetables',
      title: 'Specific vegetables',
      desc: 'Cultivate only our preferred hand-selected list.',
    },
    {
      id: 'Seasonal produce',
      title: 'Seasonal produce',
      desc: 'Naturally rotated crops aligned with seasonal weather.',
    },
    {
      id: 'Maximum variety',
      title: 'Maximum variety',
      desc: 'Diverse basket with leafy greens, herbs, and roots.',
    },
  ];

  const toggleVegetable = (vegName: string) => {
    if (selectedVegs.includes(vegName)) {
      if (selectedVegs.length > 2) {
        setSelectedVegs(selectedVegs.filter((v) => v !== vegName));
      }
    } else {
      setSelectedVegs([...selectedVegs, vegName]);
    }
  };

  // Recommendation calculation logic
  const getRecommendation = () => {
    if (familySize === '7+' || priority === 'Premium quality' && familySize === '5–6') {
      return {
        planTier: 'private' as PlanTier,
        planName: 'My Private Farm',
        priceLabel: '₹7,00,000 / year',
        monthlyNote: 'Approx. ₹58,333/month',
        sqFt: '10,000 – 20,000 sq.ft (PureVegies Managed Estate Parcel)',
        estHarvest: '65 – 80 kg fresh produce monthly',
        frequency: 'Twice-weekly personalized morning deliveries in timber crates',
        idealFor: 'Large households requiring bespoke crop planning on PureVegies managed farmland.',
      };
    } else if (familySize === '3–4' || familySize === '5–6') {
      return {
        planTier: 'dedicated' as PlanTier,
        planName: 'My Dedicated Farm',
        priceLabel: '₹20,000 / month',
        monthlyNote: 'Most popular family choice',
        sqFt: '2,000 – 2,800 sq.ft (Dedicated Farming Area within PureVegies Network)',
        estHarvest: '35 – 45 kg fresh produce monthly',
        frequency: 'Weekly or bi-weekly priority doorstep deliveries in climate-protected crates',
        idealFor: '3 to 6 member families desiring tailored crops and a dedicated farming area without owning land.',
      };
    } else {
      return {
        planTier: 'family' as PlanTier,
        planName: "My Family's Farm",
        priceLabel: '₹10,000 / month',
        monthlyNote: 'Accessible managed farming',
        sqFt: '1,200 – 1,600 sq.ft (PureVegies Managed Farming Allocation)',
        estHarvest: '22 – 28 kg seasonal produce monthly',
        frequency: 'Weekly doorstep harvest delivery',
        idealFor: 'Couples and nuclear families seeking everyday traceable vegetables grown on PureVegies farmland.',
      };
    }
  };

  const rec = getRecommendation();

  return (
    <div className="w-full bg-[#FAF8F5] border border-[#E5E0D8] rounded-3xl shadow-xl overflow-hidden">
      {/* Top Wizard Bar */}
      <div className="bg-[#172F1F] p-6 text-white border-b border-[#234531]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#20412B] text-[#9EC9AB] text-[11px] font-semibold tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5 text-[#9EC9AB]" />
                Interactive Farm Builder
              </span>
              <span className="text-zinc-400 text-xs">Step {step} of 4</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
              Design Your Family&rsquo;s Farm Plan
            </h3>
            <p className="text-xs text-zinc-300 mt-1 max-w-xl">
              Tell us your family profile and culinary preferences. PureVegies provides the land and farmers. We calculate the exact farming space, crop matrix, and subscription plan required.
            </p>
          </div>

          {/* Stepper Dots */}
          <div className="flex items-center gap-2 self-start sm:self-center">
            {[1, 2, 3, 4].map((i) => (
              <button
                key={i}
                type="button"
                onClick={() => i <= step && setStep(i)}
                className={`h-2.5 rounded-full transition-all ${
                  step === i
                    ? 'w-8 bg-[#A1D1AF]'
                    : i < step
                    ? 'w-2.5 bg-[#4A7D58]'
                    : 'w-2.5 bg-[#234531]'
                }`}
                aria-label={`Go to step ${i}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Step Body */}
      <div className="p-6 sm:p-10">
        {/* STEP 1: Family Size */}
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <span className="text-xs font-bold text-[#628A6F] uppercase tracking-wider">
                Question 01
              </span>
              <h4 className="font-serif text-2xl font-bold text-[#102115] mt-1">
                How many people are in your family?
              </h4>
              <p className="text-sm text-zinc-600 mt-1">
                We balance your allocated farm area and harvest cycles to match your weekly kitchen consumption.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              {[
                { size: '1–2', title: '1–2 Members', subtitle: 'Couple / Small Home', icon: '🏡' },
                { size: '3–4', title: '3–4 Members', subtitle: 'Standard Family (Most Common)', icon: '👨‍👩‍👧' },
                { size: '5–6', title: '5–6 Members', subtitle: 'Active Family Kitchen', icon: '👨‍👩‍👧‍👦' },
                { size: '7+', title: '7+ Members', subtitle: 'Joint / Extended Household', icon: '🏰' },
              ].map((item) => (
                <button
                  key={item.size}
                  type="button"
                  onClick={() => setFamilySize(item.size as any)}
                  className={`p-6 rounded-2xl border text-left transition-all ${
                    familySize === item.size
                      ? 'border-[#172F1F] bg-[#172F1F] text-white shadow-md scale-[1.02]'
                      : 'border-[#D8D1C5] bg-white text-[#202521] hover:border-zinc-400 hover:bg-[#FDFCFB]'
                  }`}
                >
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <div className="font-serif text-xl font-bold">{item.title}</div>
                  <div
                    className={`text-xs mt-1 ${
                      familySize === item.size ? 'text-[#9EC9AB]' : 'text-zinc-500'
                    }`}
                  >
                    {item.subtitle}
                  </div>
                  {familySize === item.size && (
                    <div className="mt-4 flex items-center gap-1.5 text-xs text-[#A1D1AF] font-semibold">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Selected</span>
                    </div>
                  )}
                </button>
              ))}
            </div>

            <div className="pt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#172F1F] hover:bg-[#20412B] text-white rounded-full font-semibold text-sm transition shadow-sm"
              >
                <span>Continue: Select Vegetables</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Vegetables Selection */}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <span className="text-xs font-bold text-[#628A6F] uppercase tracking-wider">
                Question 02
              </span>
              <h4 className="font-serif text-2xl font-bold text-[#102115] mt-1">
                What does your family like to eat?
              </h4>
              <p className="text-sm text-zinc-600 mt-1">
                Select your preferred vegetables. Our agronomists will configure the exact seedbed
                rotation across your allocated farming beds.
              </p>
            </div>

            <div className="flex items-center justify-between text-xs text-zinc-500 py-1">
              <span>
                Selected:{' '}
                <strong className="text-[#172F1F] font-bold">{selectedVegs.length} crops</strong>
              </span>
              <span>Click any vegetable to toggle</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {vegetableList.map((veg) => {
                const isSelected = selectedVegs.includes(veg.name);
                return (
                  <button
                    key={veg.name}
                    type="button"
                    onClick={() => toggleVegetable(veg.name)}
                    className={`p-3.5 rounded-2xl border text-center transition-all flex flex-col items-center justify-center relative ${
                      isSelected
                        ? 'border-[#172F1F] bg-[#172F1F] text-white shadow-sm ring-2 ring-[#2D5A3C]'
                        : 'border-[#D8D1C5] bg-white text-[#202521] hover:border-zinc-400'
                    }`}
                  >
                    {isSelected && (
                      <span className="absolute top-2 right-2 w-4 h-4 bg-[#25D366] text-white rounded-full flex items-center justify-center text-[10px] font-bold">
                        ✓
                      </span>
                    )}
                    <span className="text-2xl mb-1.5">{veg.icon}</span>
                    <span className="text-xs font-semibold leading-tight">{veg.name}</span>
                    <span
                      className={`text-[10px] mt-1 uppercase tracking-wider ${
                        isSelected ? 'text-[#9EC9AB]' : 'text-zinc-400'
                      }`}
                    >
                      {veg.tag}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="pt-6 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 border border-[#D8D1C5] bg-white text-zinc-700 rounded-full font-medium text-xs hover:bg-zinc-50 transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#172F1F] hover:bg-[#20412B] text-white rounded-full font-semibold text-sm transition shadow-sm"
              >
                <span>Continue: Select Priorities</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Priorities */}
        {step === 3 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <span className="text-xs font-bold text-[#628A6F] uppercase tracking-wider">
                Question 03
              </span>
              <h4 className="font-serif text-2xl font-bold text-[#102115] mt-1">
                What matters most to you?
              </h4>
              <p className="text-sm text-zinc-600 mt-1">
                Choose the primary philosophy guiding your family&rsquo;s farming plan.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
              {priorities.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setPriority(item.id as any)}
                  className={`p-5 rounded-2xl border text-left transition-all ${
                    priority === item.id
                      ? 'border-[#172F1F] bg-[#172F1F] text-white shadow-md'
                      : 'border-[#D8D1C5] bg-white text-[#202521] hover:border-zinc-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-serif text-lg font-bold">{item.title}</span>
                    {priority === item.id && (
                      <CheckCircle2 className="w-5 h-5 text-[#9EC9AB]" />
                    )}
                  </div>
                  <p
                    className={`text-xs leading-relaxed ${
                      priority === item.id ? 'text-[#DCEAE0]' : 'text-zinc-600'
                    }`}
                  >
                    {item.desc}
                  </p>
                </button>
              ))}
            </div>

            <div className="pt-6 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 border border-[#D8D1C5] bg-white text-zinc-700 rounded-full font-medium text-xs hover:bg-zinc-50 transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={() => setStep(4)}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#172F1F] hover:bg-[#20412B] text-white rounded-full font-semibold text-sm transition shadow-sm"
              >
                <span>Calculate My Farm Plan</span>
                <Sparkles className="w-4 h-4 text-[#A1D1AF]" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Results & Recommendation */}
        {step === 4 && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#E2ECE5] text-[#20412B] text-xs font-bold uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 text-[#20412B]" />
                Analysis Complete
              </span>
              <h4 className="font-serif text-3xl sm:text-4xl font-bold text-[#102115]">
                Your Recommended Farm Plan
              </h4>
              <p className="text-sm text-zinc-600">
                Calculated based on your household of {familySize} members, {selectedVegs.length} selected
                crops, prioritizing {priority.toLowerCase()}.
              </p>
            </div>

            {/* Recommendation Highlight Card */}
            <div className="bg-white border-2 border-[#172F1F] rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#172F1F] text-[#9EC9AB] text-[11px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-bl-2xl">
                Tailored Recommendation
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#628A6F]">
                      Plan Tier
                    </span>
                    <h5 className="font-serif text-2xl sm:text-3xl font-bold text-[#102115]">
                      {rec.planName}
                    </h5>
                    <p className="text-xs text-zinc-500 mt-0.5">{rec.idealFor}</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E5E0D8]">
                      <div className="flex items-center gap-2 text-zinc-500 text-xs mb-1">
                        <Layers className="w-4 h-4 text-[#2D5A3C]" />
                        <span>Estimated Farm Space</span>
                      </div>
                      <p className="text-sm font-bold text-[#102115]">{rec.sqFt}</p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E5E0D8]">
                      <div className="flex items-center gap-2 text-zinc-500 text-xs mb-1">
                        <Scale className="w-4 h-4 text-[#2D5A3C]" />
                        <span>Estimated Harvest</span>
                      </div>
                      <p className="text-sm font-bold text-[#102115]">{rec.estHarvest}</p>
                    </div>

                    <div className="sm:col-span-2 p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E5E0D8]">
                      <div className="flex items-center gap-2 text-zinc-500 text-xs mb-1">
                        <Calendar className="w-4 h-4 text-[#2D5A3C]" />
                        <span>Delivery Rhythm</span>
                      </div>
                      <p className="text-sm font-bold text-[#102115]">{rec.frequency}</p>
                    </div>
                  </div>

                  {/* Selected Crops Summary */}
                  <div className="pt-2">
                    <p className="text-xs font-semibold text-zinc-700 mb-2">
                      Suggested Crops to Cultivate:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedVegs.map((veg) => (
                        <span
                          key={veg}
                          className="px-2.5 py-1 rounded-full bg-[#EAE4D9] text-[#172F1F] text-xs font-medium"
                        >
                          {veg}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Pricing & Call to Action Column */}
                <div className="lg:col-span-5 bg-[#FAF8F5] p-6 rounded-2xl border border-[#D8D1C5] flex flex-col justify-between space-y-6">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-zinc-500 font-medium">
                      Transparent Pricing
                    </span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="font-serif text-3xl sm:text-4xl font-bold text-[#102115]">
                        {rec.priceLabel}
                      </span>
                    </div>
                    <p className="text-xs text-[#628A6F] font-semibold mt-1">{rec.monthlyNote}</p>
                    <p className="text-[11px] text-zinc-500 mt-2 leading-relaxed">
                      Includes plot allocation, non-synthetic nutrient management, agronomist supervision,
                      quality inspection, and temperature-controlled doorstep delivery.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <button
                      type="button"
                      onClick={() => {
                        analytics.advisorEnquiry(rec.planTier, `Wizard: ${rec.planName}`);
                        setLeadModalOpen(true);
                      }}
                      className="w-full py-3.5 px-6 rounded-full bg-[#172F1F] hover:bg-[#20412B] text-white font-semibold text-sm transition shadow-md flex items-center justify-center gap-2 group"
                    >
                      <PhoneCall className="w-4 h-4" />
                      <span>Talk to a Farm Advisor</span>
                    </button>

                    <a
                      href={`https://wa.me/${config.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                        `Hi Farm-to-Family, I built a farm plan for my family of ${familySize}. Recommended plan: ${rec.planName} (${rec.priceLabel}). Selected crops: ${selectedVegs.join(
                          ', '
                        )}. Please advise next steps!`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => analytics.whatsappClick('wizard_summary', rec.planName)}
                      className="w-full py-2.5 px-4 rounded-full bg-white hover:bg-zinc-50 border border-[#D8D1C5] text-[#172F1F] font-semibold text-xs transition flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4 text-[#25D366]" />
                      <span>Send Summary to WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Recalculate or restart button */}
            <div className="flex items-center justify-center gap-4 text-xs text-zinc-500">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-1 hover:text-[#172F1F] transition underline font-medium"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Adjust inputs and recalculate</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal for Lead Capture */}
      <LeadModal
        isOpen={leadModalOpen}
        onClose={() => setLeadModalOpen(false)}
        defaultPlan={rec.planTier}
        defaultTitle={`Discuss Your ${rec.planName}`}
      />
    </div>
  );
}
