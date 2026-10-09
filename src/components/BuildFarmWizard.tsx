'use client';

import React, { useState } from 'react';
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
  Info,
  Sprout,
  Heart,
} from 'lucide-react';
import { useFarmStore } from '@/lib/farmStore';
import { PlanTier } from '@/lib/types';
import { analytics } from '@/lib/analytics';
import LeadModal from './LeadModal';

export default function BuildFarmWizard() {
  const { config } = useFarmStore();

  // Wizard state: 5 questions + 1 results step (step 6)
  const [step, setStep] = useState(1);
  const [familySize, setFamilySize] = useState<'1–2' | '3–4' | '5–6' | '7+'>('3–4');
  const [selectedVegs, setSelectedVegs] = useState<string[]>([
    'Tomato',
    'Carrot',
    'Cucumber',
    'Capsicum',
    'French Beans',
  ]);
  const [priorityCrops, setPriorityCrops] = useState<string[]>(['Tomato', 'Carrot']);
  const [volumePreference, setVolumePreference] = useState<
    'More Variety' | 'Larger Quantities' | 'Balanced Mix'
  >('Balanced Mix');
  const [planInterest, setPlanInterest] = useState<
    'family' | 'dedicated' | 'private' | 'recommend'
  >('recommend');

  const [leadModalOpen, setLeadModalOpen] = useState(false);

  // Track start of wizard
  React.useEffect(() => {
    analytics.buildFarmStart();
  }, []);

  // Track completion when reaching final step (step 6)
  React.useEffect(() => {
    if (step === 6) {
      analytics.buildFarmComplete({
        familySize,
        cropsCount: selectedVegs.length,
        priority: volumePreference,
      });
    }
  }, [step, familySize, selectedVegs.length, volumePreference]);

  const vegetableList = [
    { name: 'Tomato', icon: '🍅', tag: 'Fruit Crop' },
    { name: 'Carrot', icon: '🥕', tag: 'Root Crop' },
    { name: 'Cabbage', icon: '🥬', tag: 'Leafy' },
    { name: 'Cauliflower', icon: '🥦', tag: 'Cruciferous' },
    { name: 'Capsicum', icon: '🫑', tag: 'Fruit Crop' },
    { name: 'Bottle Gourd', icon: '🥒', tag: 'Creeper' },
    { name: 'Green Chilli', icon: '🌶️', tag: 'Aromatic' },
    { name: 'Green Peas', icon: '🫛', tag: 'Seasonal' },
    { name: 'Brinjal', icon: '🍆', tag: 'Fruit Crop' },
    { name: 'Cucumber', icon: '🥒', tag: 'Creeper' },
    { name: 'French Beans', icon: '🌱', tag: 'Legume' },
    { name: 'Seasonal Greens', icon: '🌾', tag: 'Agronomist Selection' },
  ];

  const toggleVegetable = (vegName: string) => {
    if (selectedVegs.includes(vegName)) {
      if (selectedVegs.length > 2) {
        setSelectedVegs(selectedVegs.filter((v) => v !== vegName));
        setPriorityCrops(priorityCrops.filter((v) => v !== vegName));
      }
    } else {
      setSelectedVegs([...selectedVegs, vegName]);
    }
  };

  const togglePriorityCrop = (vegName: string) => {
    if (priorityCrops.includes(vegName)) {
      if (priorityCrops.length > 1) {
        setPriorityCrops(priorityCrops.filter((v) => v !== vegName));
      }
    } else {
      if (priorityCrops.length < 3) {
        setPriorityCrops([...priorityCrops, vegName]);
      }
    }
  };

  // Recommendation calculation logic
  const getRecommendation = () => {
    let chosenTier: PlanTier = 'dedicated';

    if (planInterest !== 'recommend') {
      chosenTier = planInterest;
    } else {
      if (familySize === '7+' || volumePreference === 'Larger Quantities' && familySize === '5–6') {
        chosenTier = 'private';
      } else if (familySize === '3–4' || familySize === '5–6') {
        chosenTier = 'dedicated';
      } else {
        chosenTier = 'family';
      }
    }

    if (chosenTier === 'private') {
      return {
        planTier: 'private' as PlanTier,
        planName: 'My Private Farm',
        priceLabel: '₹7,00,000 / year',
        monthlyNote: 'Approx. ₹58,333 / month (Annual service)',
        sqFt: '10,000 – 20,000 sq.ft (PureVegies Managed Estate Area)',
        estHarvest: '65 – 80 kg fresh produce monthly',
        frequency: 'Twice-weekly scheduled deliveries in premium insulated packs',
        idealFor: 'Large households requiring a highly personalised farming service on PureVegies farmland.',
      };
    } else if (chosenTier === 'dedicated') {
      return {
        planTier: 'dedicated' as PlanTier,
        planName: 'My Dedicated Farm',
        priceLabel: '₹20,000 / month',
        monthlyNote: 'Most popular family choice',
        sqFt: '2,000 – 2,800 sq.ft (Dedicated Farming Area within PureVegies Network)',
        estHarvest: '35 – 45 kg fresh produce monthly',
        frequency: 'Weekly or bi-weekly priority doorstep deliveries',
        idealFor: '3 to 6 member families desiring tailored crops and a dedicated natural farming area.',
      };
    } else {
      return {
        planTier: 'family' as PlanTier,
        planName: "My Family's Farm",
        priceLabel: '₹10,000 / month',
        monthlyNote: 'Accessible managed natural farming',
        sqFt: '1,200 – 1,600 sq.ft (PureVegies Managed Farming Allocation)',
        estHarvest: '22 – 28 kg seasonal produce monthly',
        frequency: 'Weekly doorstep harvest delivery',
        idealFor: 'Couples and standard nuclear families seeking everyday vegetables grown using natural farming.',
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
              <span className="text-zinc-400 text-xs">Step {step} of 6</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
              Design Your Family&rsquo;s Natural Farm Plan
            </h3>
            <p className="text-xs text-zinc-300 mt-1 max-w-xl">
              PureVegies provides the farmland, farmers, and complete farm management. Configure your
              family preferences below to calculate your tailored allocation.
            </p>
          </div>

          {/* Stepper Dots */}
          <div className="flex items-center gap-2 self-start sm:self-center">
            {[1, 2, 3, 4, 5, 6].map((i) => (
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
                Question 01 of 05
              </span>
              <h4 className="font-serif text-2xl font-bold text-[#102115] mt-1">
                How many people are in your family?
              </h4>
              <p className="text-sm text-zinc-600 mt-1">
                We calibrate your allocated farm area and seasonal sowing cycles to match your weekly kitchen consumption.
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
                <span>Continue: Select Preferred Vegetables</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Vegetables Preference */}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <span className="text-xs font-bold text-[#628A6F] uppercase tracking-wider">
                Question 02 of 05
              </span>
              <h4 className="font-serif text-2xl font-bold text-[#102115] mt-1">
                Which vegetables do you prefer?
              </h4>
              <p className="text-sm text-zinc-600 mt-1">
                Select the vegetables your family cooks. PureVegies provides the land and manages cultivation using natural farming practices.
              </p>
            </div>

            <div className="flex items-center justify-between text-xs text-zinc-500 py-1">
              <span>
                Selected:{' '}
                <strong className="text-[#172F1F] font-bold">{selectedVegs.length} crops</strong>
              </span>
              <span>Click to select or unselect</span>
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
                <span>Continue: Priority Crops</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Most Important Crops */}
        {step === 3 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <span className="text-xs font-bold text-[#628A6F] uppercase tracking-wider">
                Question 03 of 05
              </span>
              <h4 className="font-serif text-2xl font-bold text-[#102115] mt-1">
                Which crops are most important to you?
              </h4>
              <p className="text-sm text-zinc-600 mt-1">
                Select 1 to 3 core staples that your household depends on most heavily. Our team will prioritize these in bed planning.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pt-2">
              {selectedVegs.map((vegName) => {
                const isPriority = priorityCrops.includes(vegName);
                return (
                  <button
                    key={vegName}
                    type="button"
                    onClick={() => togglePriorityCrop(vegName)}
                    className={`p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${
                      isPriority
                        ? 'border-[#172F1F] bg-[#172F1F] text-white shadow-sm'
                        : 'border-[#D8D1C5] bg-white text-[#202521] hover:border-zinc-400'
                    }`}
                  >
                    <div>
                      <span className="font-semibold text-sm block">{vegName}</span>
                      <span className={`text-[10px] ${isPriority ? 'text-[#9EC9AB]' : 'text-zinc-500'}`}>
                        {isPriority ? '★ Priority Staple' : 'Regular rotation'}
                      </span>
                    </div>
                    {isPriority && <CheckCircle2 className="w-5 h-5 text-[#A1D1AF] shrink-0" />}
                  </button>
                );
              })}
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
                <span>Continue: Variety vs Quantity</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Variety vs Quantity Preference */}
        {step === 4 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <span className="text-xs font-bold text-[#628A6F] uppercase tracking-wider">
                Question 04 of 05
              </span>
              <h4 className="font-serif text-2xl font-bold text-[#102115] mt-1">
                Would you prefer more variety or larger quantities of selected vegetables?
              </h4>
              <p className="text-sm text-zinc-600 mt-1">
                Help us balance bed space between culinary diversity and bulk weekly yields.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              {[
                {
                  id: 'More Variety',
                  title: 'More Variety',
                  subtitle: 'Diverse seasonal harvest',
                  desc: 'A wide range of vegetables, seasonal greens, and herbs in each crate. Ideal for households that love exploring recipes.',
                  icon: '🥗',
                },
                {
                  id: 'Larger Quantities',
                  title: 'Larger Quantities',
                  subtitle: 'Higher volume staples',
                  desc: 'Greater weekly volumes of your preferred staple vegetables for high-volume family kitchen cooking.',
                  icon: '📦',
                },
                {
                  id: 'Balanced Mix',
                  title: 'Balanced Rotation',
                  subtitle: 'Recommended default',
                  desc: 'A balanced split between essential family kitchen staples and rotational seasonal varieties.',
                  icon: '⚖️',
                },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setVolumePreference(item.id as any)}
                  className={`p-6 rounded-2xl border text-left transition-all ${
                    volumePreference === item.id
                      ? 'border-[#172F1F] bg-[#172F1F] text-white shadow-md'
                      : 'border-[#D8D1C5] bg-white text-[#202521] hover:border-zinc-400'
                  }`}
                >
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <div className="font-serif text-lg font-bold">{item.title}</div>
                  <div
                    className={`text-xs font-medium mt-0.5 ${
                      volumePreference === item.id ? 'text-[#9EC9AB]' : 'text-emerald-700'
                    }`}
                  >
                    {item.subtitle}
                  </div>
                  <p
                    className={`text-xs mt-2 leading-relaxed ${
                      volumePreference === item.id ? 'text-[#DCEAE0]' : 'text-zinc-600'
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
                onClick={() => setStep(3)}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 border border-[#D8D1C5] bg-white text-zinc-700 rounded-full font-medium text-xs hover:bg-zinc-50 transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={() => setStep(5)}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#172F1F] hover:bg-[#20412B] text-white rounded-full font-semibold text-sm transition shadow-sm"
              >
                <span>Continue: Plan Preference</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: Subscription Plan Interest */}
        {step === 5 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <span className="text-xs font-bold text-[#628A6F] uppercase tracking-wider">
                Question 05 of 05
              </span>
              <h4 className="font-serif text-2xl font-bold text-[#102115] mt-1">
                Which subscription plan interests you?
              </h4>
              <p className="text-sm text-zinc-600 mt-1">
                All plans are managed farming services on PureVegies farmland. Customers do not purchase land.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              {[
                {
                  id: 'family',
                  title: "My Family's Farm",
                  price: '₹10,000 / month',
                  desc: "Natural farming for your family's everyday food needs. PureVegies provides land & farming.",
                  icon: '🌱',
                },
                {
                  id: 'dedicated',
                  title: 'My Dedicated Farm',
                  price: '₹20,000 / month',
                  desc: "A dedicated farming experience shaped around your family's preferences. Custom crop planning.",
                  icon: '🌾',
                },
                {
                  id: 'private',
                  title: 'My Private Farm',
                  price: '₹7,00,000 / year',
                  desc: 'A premium, privately managed natural farming experience on PureVegies farmland with dedicated manager.',
                  icon: '🏰',
                },
                {
                  id: 'recommend',
                  title: 'Let PureVegies Recommend',
                  price: 'Tailored Match',
                  desc: 'Our agronomists will recommend the best plan based on your family scale and kitchen consumption.',
                  icon: '✨',
                },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setPlanInterest(item.id as any)}
                  className={`p-5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                    planInterest === item.id
                      ? 'border-[#172F1F] bg-[#172F1F] text-white shadow-md'
                      : 'border-[#D8D1C5] bg-white text-[#202521] hover:border-zinc-400'
                  }`}
                >
                  <div className="space-y-2">
                    <span className="text-2xl">{item.icon}</span>
                    <h5 className="font-serif text-base font-bold">{item.title}</h5>
                    <span
                      className={`text-xs font-bold block ${
                        planInterest === item.id ? 'text-[#A1D1AF]' : 'text-[#2D5A3C]'
                      }`}
                    >
                      {item.price}
                    </span>
                    <p
                      className={`text-[11px] leading-relaxed ${
                        planInterest === item.id ? 'text-[#DCEAE0]' : 'text-zinc-600'
                      }`}
                    >
                      {item.desc}
                    </p>
                  </div>

                  {planInterest === item.id && (
                    <div className="mt-4 pt-2 border-t border-white/20 flex items-center gap-1 text-[11px] text-[#A1D1AF] font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Selected</span>
                    </div>
                  )}
                </button>
              ))}
            </div>

            <div className="pt-6 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(4)}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 border border-[#D8D1C5] bg-white text-zinc-700 rounded-full font-medium text-xs hover:bg-zinc-50 transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={() => setStep(6)}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#172F1F] hover:bg-[#20412B] text-white rounded-full font-semibold text-sm transition shadow-sm"
              >
                <span>Calculate & View My Farm Plan</span>
                <Sparkles className="w-4 h-4 text-[#A1D1AF]" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 6: Results & Recommendation */}
        {step === 6 && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#E2ECE5] text-[#20412B] text-xs font-bold uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 text-[#20412B]" />
                Farm Plan Configuration Complete
              </span>
              <h4 className="font-serif text-3xl sm:text-4xl font-bold text-[#102115]">
                Your Configured Farm Plan
              </h4>
              <p className="text-sm text-zinc-600">
                Calculated for a household of {familySize} members, with priority on {priorityCrops.join(', ')} and {volumePreference.toLowerCase()}.
              </p>
            </div>

            {/* Recommendation Highlight Card */}
            <div className="bg-white border-2 border-[#172F1F] rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#172F1F] text-[#9EC9AB] text-[11px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-bl-2xl">
                Natural Farming Plan
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

                  {/* Priority Crops & Selected Crops */}
                  <div className="space-y-2 pt-2">
                    <div>
                      <p className="text-xs font-semibold text-zinc-700 mb-1">
                        Priority Staples for Your Kitchen:
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {priorityCrops.map((veg) => (
                          <span
                            key={veg}
                            className="px-2.5 py-1 rounded-full bg-[#172F1F] text-white text-xs font-semibold flex items-center gap-1"
                          >
                            <span>★</span>
                            <span>{veg}</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-zinc-700 mb-1">
                        Additional Selected Crops:
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedVegs
                          .filter((v) => !priorityCrops.includes(v))
                          .map((veg) => (
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
                </div>

                {/* Pricing & Call to Action Column */}
                <div className="lg:col-span-5 bg-[#FAF8F5] p-6 rounded-2xl border border-[#D8D1C5] flex flex-col justify-between space-y-6">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-zinc-500 font-medium">
                      Managed Farming Subscription
                    </span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="font-serif text-3xl sm:text-4xl font-bold text-[#102115]">
                        {rec.priceLabel}
                      </span>
                    </div>
                    <p className="text-xs text-[#628A6F] font-semibold mt-1">{rec.monthlyNote}</p>
                    <p className="text-[11px] text-zinc-500 mt-2 leading-relaxed">
                      PureVegies provides the farmland, farmers, irrigation, and doorstep delivery. You do not purchase land.
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
                      <span>Discuss With Farm Advisor</span>
                    </button>

                    <a
                      href={`https://wa.me/${config.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                        `Hi PureVegies, I built a natural farm plan for my family of ${familySize}. Plan: ${rec.planName} (${rec.priceLabel}). Priority staples: ${priorityCrops.join(
                          ', '
                        )}. Selected crops: ${selectedVegs.join(', ')}. Preference: ${volumePreference}. Please advise next steps!`
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

              {/* Crucial Reality Explanation Box */}
              <div className="mt-6 p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs text-zinc-700 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-amber-900">
                  <Info className="w-4 h-4 text-amber-800 shrink-0" />
                  <span>Important Agricultural Information:</span>
                </div>
                <p className="text-[11px] text-zinc-600 leading-relaxed">
                  Crop selection depends on season, climate, growing conditions, natural yield, and your selected plan.
                  We do not promise that every selected crop can always be grown or delivered simultaneously, as nature
                  operates on seasonal biological cycles. Buffer beds and seasonal crop rotations ensure your kitchen basket
                  remains continuously fulfilled with fresh natural produce.
                </p>
              </div>
            </div>

            {/* Recalculate button */}
            <div className="flex items-center justify-center gap-4 text-xs text-zinc-500">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-1 hover:text-[#172F1F] transition underline font-medium"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Adjust preferences and recalculate</span>
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
