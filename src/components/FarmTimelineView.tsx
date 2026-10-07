'use client';

import React, { useState } from 'react';
import {
  Sprout,
  Sun,
  Flower2,
  Scissors,
  CheckCircle,
  Package,
  Truck,
  ShieldCheck,
  ChevronRight,
  Info,
} from 'lucide-react';
import { CropStage } from '@/lib/types';

interface TimelineStep {
  stage: CropStage;
  label: string;
  duration: string;
  description: string;
  agronomyAction: string;
  qualityStandard: string;
  icon: any;
}

export default function FarmTimelineView() {
  const [activeStage, setActiveStage] = useState<CropStage>('growing');

  const steps: TimelineStep[] = [
    {
      stage: 'seed',
      label: 'Seed Selection',
      duration: 'Day 0',
      description: 'Open-pollinated and heirloom seeds selected from certified seed banks with verified germination rates.',
      agronomyAction: 'Warm water immersion and Trichoderma bio-seed priming to resist soil damping without synthetic chemicals.',
      qualityStandard: 'Minimum 92% germination viability tested in nursery Petri dishes.',
      icon: Sprout,
    },
    {
      stage: 'germination',
      label: 'Germination',
      duration: 'Day 3–7',
      description: 'First cotyledon leaves emerge in moisture-regulated coco-peat propagation plugs under shade net.',
      agronomyAction: 'Micro-misting twice daily using pure RO filtered deep-aquifer water (TDS < 200).',
      qualityStandard: 'Strict root elongation inspection before field bed transplantation.',
      icon: Sprout,
    },
    {
      stage: 'growing',
      label: 'Vegetative Growth',
      duration: 'Day 10–40',
      description: 'Rapid foliage and root development in raised beds enriched with aged vermicompost and biochar.',
      agronomyAction: 'Targeted sub-surface drip fertigation with fermented Jeevamrutha and seaweed foliar micro-spray.',
      qualityStandard: 'Zero synthetic systemic pesticides. Regular leaf sweep for beneficial ladybug and predatory mite counts.',
      icon: Sun,
    },
    {
      stage: 'flowering',
      label: 'Flowering & Fruit Set',
      duration: 'Day 40–60',
      description: 'Blossoms bloom and fruit setting begins with active bee pollination across the plot.',
      agronomyAction: 'Jute string vine trellising and potassium-rich wood ash mulch dressing to support fruit swelling.',
      qualityStandard: 'Optimum floral cluster density without artificial hormonal ripening agents.',
      icon: Flower2,
    },
    {
      stage: 'harvest',
      label: 'Morning Harvest',
      duration: 'Day 50–75',
      description: 'Gentle harvest between 5:30 AM and 8:30 AM before sunlight causes moisture transpiration.',
      agronomyAction: 'Sanitized stainless steel shears and cotton gloves used to clip produce at peak physiological ripeness.',
      qualityStandard: 'Careful grading to ensure no stem damage, bruises, or thermal shock.',
      icon: Scissors,
    },
    {
      stage: 'quality_check',
      label: 'Quality Check & Lab Assay',
      duration: 'Within 2 Hours',
      description: 'Every harvested batch is inspected under 4-point criteria: brix sweetness, firmness, skin integrity, and weight.',
      agronomyAction: 'Clean well-head rinse and random lot rapid nitrate/residue test strip screening.',
      qualityStandard: 'A+ Grade classification required for family subscription dispatch.',
      icon: CheckCircle,
    },
    {
      stage: 'packing',
      label: 'Eco-Chilled Packing',
      duration: 'Within 4 Hours',
      description: 'Packed into breathable food-grade linen pouches or reusable timber crates with natural moisture pads.',
      agronomyAction: 'Pre-cooled to 12°C–14°C to preserve morning freshness without moisture condensation.',
      qualityStandard: 'Zero single-use plastic wrap. Clear QR code plot batch label affixed.',
      icon: Package,
    },
    {
      stage: 'delivery',
      label: 'Direct Doorstep Delivery',
      duration: 'Within 8–12 Hours',
      description: 'Climate-controlled morning delivery directly from the farm gate to your kitchen counter.',
      agronomyAction: 'Electric delivery fleet running optimized cold routes to reduce urban transit time.',
      qualityStandard: 'Direct handoff to customer or designated drop-point with cold chain seal intact.',
      icon: Truck,
    },
  ];

  const currentStepData = steps.find((s) => s.stage === activeStage) || steps[2];

  return (
    <div className="w-full bg-white border border-[#E5E0D8] rounded-3xl p-6 sm:p-10 shadow-lg space-y-8">
      {/* Horizontal Step Navigation */}
      <div className="overflow-x-auto pb-4 scrollbar-thin">
        <div className="flex items-center justify-between min-w-[760px] relative px-4">
          {/* Connector line */}
          <div className="absolute top-6 left-12 right-12 h-0.5 bg-[#E8E2D8] -z-0" />

          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isSelected = activeStage === step.stage;
            return (
              <button
                key={step.stage}
                type="button"
                onClick={() => setActiveStage(step.stage)}
                className="flex flex-col items-center group relative z-10 focus:outline-none"
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                    isSelected
                      ? 'bg-[#172F1F] text-white ring-4 ring-[#9EC9AB]/40 scale-110 shadow-md'
                      : 'bg-[#FAF8F5] text-zinc-600 border border-[#D8D1C5] hover:border-[#172F1F] hover:bg-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span
                  className={`text-[11px] font-semibold mt-2 text-center max-w-[80px] leading-tight ${
                    isSelected ? 'text-[#172F1F] font-bold' : 'text-zinc-500 group-hover:text-zinc-800'
                  }`}
                >
                  {step.label}
                </span>
                <span className="text-[10px] text-zinc-400 font-mono mt-0.5">{step.duration}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Detail Showcase Panel for Selected Stage */}
      <div className="bg-[#FAF8F5] border border-[#D8D1C5] rounded-2xl p-6 sm:p-8 transition-all animate-in fade-in duration-200">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#172F1F] text-[#9EC9AB] text-xs font-bold font-mono">
                STAGE {steps.findIndex((s) => s.stage === activeStage) + 1} OF 8
              </span>
              <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                Timeline: {currentStepData.duration}
              </span>
            </div>

            <h4 className="font-serif text-2xl sm:text-3xl font-bold text-[#102115]">
              {currentStepData.label}
            </h4>

            <p className="text-sm text-zinc-700 leading-relaxed">
              {currentStepData.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-white rounded-xl border border-[#E8E2D8] space-y-1">
                <span className="text-[11px] font-bold text-[#628A6F] uppercase tracking-wider block">
                  Agronomy Protocol
                </span>
                <p className="text-xs text-zinc-700 leading-normal">
                  {currentStepData.agronomyAction}
                </p>
              </div>

              <div className="p-4 bg-white rounded-xl border border-[#E8E2D8] space-y-1">
                <span className="text-[11px] font-bold text-[#B2763D] uppercase tracking-wider block">
                  Quality & Traceability Standard
                </span>
                <p className="text-xs text-zinc-700 leading-normal">
                  {currentStepData.qualityStandard}
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-[#E5E0D8] space-y-4">
            <div className="flex items-center gap-2 text-[#172F1F] font-semibold text-sm">
              <ShieldCheck className="w-5 h-5 text-[#2D5A3C]" />
              <span>Verifiable Traceability Log</span>
            </div>

            <div className="space-y-2.5 text-xs text-zinc-600">
              <div className="flex justify-between py-1 border-b border-zinc-100">
                <span className="text-zinc-500">Cultivation Method:</span>
                <span className="font-semibold text-zinc-900">Bio-dynamic & Drip Fed</span>
              </div>
              <div className="flex justify-between py-1 border-b border-zinc-100">
                <span className="text-zinc-500">Synthetic Chemical Use:</span>
                <span className="font-semibold text-emerald-700">Strict Zero Synthetic Policy</span>
              </div>
              <div className="flex justify-between py-1 border-b border-zinc-100">
                <span className="text-zinc-500">Irrigation Purity:</span>
                <span className="font-semibold text-zinc-900">Dual-Filtered Aquifer (TDS 185)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-zinc-100">
                <span className="text-zinc-500">Harvest Temperature:</span>
                <span className="font-semibold text-zinc-900">Pre-dawn 16°C – 18°C ambient</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-zinc-500">Customer Access:</span>
                <span className="font-semibold text-zinc-900">Live Portal Updates & Visits</span>
              </div>
            </div>

            <div className="p-3 bg-[#FAF8F5] rounded-xl text-[11px] text-zinc-500 leading-normal flex items-start gap-2">
              <Info className="w-4 h-4 text-[#2D5A3C] shrink-0 mt-0.5" />
              <span>
                Each subscribed family has access to their plot&rsquo;s real-time stage progress on the
                customer dashboard.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
