import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Sprout,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Sparkles,
  Layers,
  MapPin,
  Calendar,
  Truck,
  Users,
  Scale,
  Clock,
  HelpCircle,
  PhoneCall,
  Check,
  X,
  Droplet,
  Sun,
  Eye,
  FileText,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';

export const metadata: Metadata = {
  title: 'How PureVegies Managed Farming Works | Farming Without Owning Land',
  description:
    'PureVegies provides the farmland, farming infrastructure and complete farm management. Choose what you want grown for your family and receive farm-grown produce without owning or managing a farm.',
  keywords: [
    'managed farming',
    'farming without owning land',
    'family farming service',
    'managed farm subscription',
    'farm-to-family service',
    'vegetable farming subscription',
    'private farm management',
    'personal farm management',
    'farm-grown vegetables subscription',
  ],
};

export default function BusinessModelPage() {
  const steps = [
    {
      step: '01',
      title: 'WE PROVIDE THE LAND',
      subtitle: 'No land purchase or lease required',
      desc: 'PureVegies develops and manages agricultural land specifically for this service. Customers do not need to purchase, lease, or provide agricultural land.',
      icon: '🏞️',
      tag: 'PureVegies Infrastructure',
    },
    {
      step: '02',
      title: 'YOU CHOOSE A PLAN',
      subtitle: 'Select service tier for your household',
      desc: 'Customers select the service level that fits their family’s scale: My Family’s Farm (₹10,000/mo), My Dedicated Farm (₹20,000/mo), or My Private Farm (₹7,00,000/yr).',
      icon: '📋',
      tag: 'Customer Selection',
    },
    {
      step: '03',
      title: 'YOU SELECT WHAT YOU WANT GROWN',
      subtitle: 'Tailored to what your family cooks',
      desc: 'Customers choose from available vegetables and seasonal crops: Tomato, Carrot, Cabbage, Cauliflower, Capsicum, Bottle Gourd, Green Chilli, Green Peas, Brinjal, Cucumber, French Beans, and seasonal greens.',
      icon: '🥕',
      tag: 'Crop Matrix',
    },
    {
      step: '04',
      title: 'WE ALLOCATE FARM SPACE',
      subtitle: 'Managed allocation within our farm network',
      desc: 'Based on your plan and crop requirements, PureVegies allocates appropriate farming space within our managed farms. Your subscription gives you access to produce grown within our managed farming network.',
      icon: '📍',
      tag: 'Farm Allocation',
    },
    {
      step: '05',
      title: 'WE FARM',
      subtitle: 'End-to-end agronomy & daily care',
      desc: 'Our agricultural team manages land preparation, seed selection, sowing, irrigation, crop care, farm monitoring, responsible farming practices, and transparent cultivation.',
      icon: '🌱',
      tag: 'Expert Agronomy',
    },
    {
      step: '06',
      title: 'YOU TRACK THE FARM',
      subtitle: 'Live transparency & updates',
      desc: 'Customers receive farm photos, videos, crop updates, expected harvest dates, and farm progress reports via their private portal. Premium tiers include live camera access where available.',
      icon: '📱',
      tag: 'Field Transparency',
    },
    {
      step: '07',
      title: 'WE HARVEST',
      subtitle: 'Field harvest, quality check & eco-packing',
      desc: 'When produce reaches peak nutritional ripeness, our team performs: Pre-dawn Harvest → Laboratory Quality Check → Sorting → Insulated Eco-Packing.',
      icon: '🧺',
      tag: 'Quality Controlled',
    },
    {
      step: '08',
      title: 'WE DELIVER',
      subtitle: 'Straight from soil to doorstep',
      desc: 'Produce is delivered directly to your registered family address according to your plan and delivery schedule, maintaining freshness and unbroken cold-chain hygiene.',
      icon: '🚚',
      tag: 'Doorstep Delivery',
    },
  ];

  const comparisonRows = [
    { feature: 'Land Requirement', traditional: 'Buy or lease expensive farmland (₹50L - ₹2Cr+)', purevegies: 'PureVegies provides and controls the farmland' },
    { feature: 'Farmer & Labour Management', traditional: 'Hire, supervise, pay and manage daily workers', purevegies: 'PureVegies manages full agronomy & farm teams' },
    { feature: 'Infrastructure & Borewells', traditional: 'Install fencing, drip irrigation, electricity, water tanks', purevegies: 'PureVegies develops and maintains all infrastructure' },
    { feature: 'Crop & Agronomy Planning', traditional: 'Risk failure through trial & error agricultural science', purevegies: 'PureVegies agronomists plan & manage crop matrix' },
    { feature: 'Irrigation & Daily Supervision', traditional: 'Must visit or pay caretakers 365 days a year', purevegies: 'PureVegies manages automated precision drip irrigation' },
    { feature: 'Farm Monitoring', traditional: 'Drive hours to inspect or rely on secondhand reports', purevegies: 'PureVegies provides photos, videos & live portal updates' },
    { feature: 'Harvesting Management', traditional: 'Arrange manual labor and deal with harvest spoilage', purevegies: 'PureVegies harvests at peak ripeness' },
    { feature: 'Quality & Soil Testing', traditional: 'Send samples to private labs at personal cost', purevegies: 'PureVegies tests soil, water, and produce batches' },
    { feature: 'Packaging & Logistics', traditional: 'Arrange private transport to bring food to the city', purevegies: 'PureVegies packs in insulated crates & delivers home' },
    { feature: 'Your Actual Involvement', traditional: 'Heavy financial burden & full-time second job', purevegies: 'Simply choose your plan and what your family eats' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
      <Navbar />

      <main className="flex-1">
        {/* =========================================================================
            HERO: Core Concept
           ========================================================================= */}
        <section className="bg-[#102115] text-white py-20 px-4 sm:px-6 lg:px-8 border-b border-[#234531]">
          <div className="max-w-5xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1F3D2A] text-[#9EC9AB] text-xs font-mono font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-[#9EC9AB]" />
              <span>THE PUREVEGIES MANAGED FARMING MODEL</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl font-bold text-white tracking-tight leading-tight">
              Our Business Model
            </h1>

            <p className="font-serif text-2xl sm:text-3xl text-[#9EC9AB] italic font-normal">
              &ldquo;Your Farm. Without Owning Land.&rdquo;
            </p>

            <p className="text-base sm:text-xl text-zinc-300 max-w-3xl mx-auto leading-relaxed font-light">
              PureVegies provides the land, farmers, infrastructure and complete farm management.
              You simply choose what you want us to grow for your family.
            </p>

            {/* Quick 5-Second Takeaway Box */}
            <div className="mt-8 p-6 bg-[#172F1F]/90 border border-[#2D5A3C] rounded-3xl max-w-3xl mx-auto text-left shadow-xl">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#9EC9AB] block mb-2">
                The 5-Second Summary
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
                <div className="p-3 bg-[#102115] rounded-xl border border-[#234531]">
                  <span className="text-xl">🏞️</span>
                  <p className="text-xs font-bold text-white mt-1">1. We Provide Land</p>
                  <p className="text-[11px] text-zinc-400">No purchase needed</p>
                </div>
                <div className="p-3 bg-[#102115] rounded-xl border border-[#234531]">
                  <span className="text-xl">🥕</span>
                  <p className="text-xs font-bold text-white mt-1">2. You Choose Crops</p>
                  <p className="text-[11px] text-zinc-400">Tell us what to grow</p>
                </div>
                <div className="p-3 bg-[#102115] rounded-xl border border-[#234531]">
                  <span className="text-xl">🌱</span>
                  <p className="text-xs font-bold text-white mt-1">3. We Do The Farming</p>
                  <p className="text-[11px] text-zinc-400">Full expert management</p>
                </div>
                <div className="p-3 bg-[#102115] rounded-xl border border-[#234531]">
                  <span className="text-xl">🧺</span>
                  <p className="text-xs font-bold text-white mt-1">4. You Receive Harvest</p>
                  <p className="text-[11px] text-zinc-400">Weekly doorstep box</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION: WHAT YOU ARE ACTUALLY BUYING
           ========================================================================= */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-b border-[#E5E0D8]">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#628A6F]">
                Legal & Operational Clarity
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#102115]">
                You&rsquo;re Not Buying Land.
                <br />
                You&rsquo;re Buying a Managed Farming Service.
              </h2>
              <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
                When you subscribe to PureVegies, you are not purchasing agricultural land. You are purchasing
                access to a managed farming service where our land, infrastructure and farming team work
                together to grow produce for your family.
              </p>
            </div>

            {/* Five Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {[
                {
                  title: 'LAND',
                  desc: 'Provided and managed by PureVegies across verified rural agricultural parcels.',
                  icon: '🏞️',
                },
                {
                  title: 'FARMING',
                  desc: 'Managed by our full-time agricultural agronomy and cultivation teams.',
                  icon: '🧑‍🌾',
                },
                {
                  title: 'TRANSPARENCY',
                  desc: 'See exactly what is growing and how your allocated farm space is progressing.',
                  icon: '📱',
                },
                {
                  title: 'HARVEST',
                  desc: 'We manage all harvesting, sorting, and rigorous laboratory quality checks.',
                  icon: '🧺',
                },
                {
                  title: 'DELIVERY',
                  desc: 'We bring the farm-fresh produce in insulated crates directly to your home.',
                  icon: '🚚',
                },
              ].map((p, idx) => (
                <div
                  key={idx}
                  className="bg-[#FAF8F5] p-6 rounded-2xl border border-[#E5E0D8] text-center space-y-2.5 hover:border-[#172F1F] transition shadow-xs"
                >
                  <div className="text-3xl mb-1">{p.icon}</div>
                  <h3 className="font-serif font-bold text-lg text-[#102115]">{p.title}</h3>
                  <p className="text-xs text-zinc-600 leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION: THE VISUAL PROCESS FLOW (YOU CHOOSE vs WE DO THE FARMING)
           ========================================================================= */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5] border-b border-[#E5E0D8]">
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#628A6F]">
                Division of Responsibility
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#102115]">
                How The Relationship Works
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600">
                A clean boundary: You make the lifestyle choices, PureVegies executes the agricultural science.
              </p>
            </div>

            {/* Visual Architecture Diagram */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
              {/* Left Column: YOU CHOOSE */}
              <div className="bg-white rounded-3xl p-8 border-2 border-[#D8D1C5] shadow-sm flex flex-col justify-between">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F0EA] text-[#2D5A3C] text-xs font-bold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>YOU CHOOSE</span>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-[#102115]">
                    Customer Role: Preferences & Lifestyle
                  </h3>

                  <div className="space-y-4 text-xs text-zinc-700">
                    <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E5E0D8] space-y-1">
                      <strong className="block text-sm text-[#102115]">1. Choose Your Plan</strong>
                      <p className="text-zinc-600">
                        Pick a subscription tier matching your family’s size and preference (Family, Dedicated, or Private).
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E5E0D8] space-y-1">
                      <strong className="block text-sm text-[#102115]">2. Choose Your Crops</strong>
                      <p className="text-zinc-600">
                        Select what vegetables, greens, and seasonal staples your kitchen loves to cook.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E5E0D8] space-y-1">
                      <strong className="block text-sm text-[#102115]">3. Receive & Enjoy</strong>
                      <p className="text-zinc-600">
                        Receive regular fresh harvest crates at your doorstep and track field updates on your dashboard.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-zinc-100 text-xs text-emerald-800 font-medium">
                  ✓ Zero farming labour • Zero agricultural risk • Total peace of mind
                </div>
              </div>

              {/* Right Column: WE DO THE FARMING */}
              <div className="bg-[#172F1F] text-white rounded-3xl p-8 shadow-xl flex flex-col justify-between">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#20412B] text-[#9EC9AB] text-xs font-bold uppercase tracking-wider">
                    <Sprout className="w-3.5 h-3.5" />
                    <span>WE DO THE FARMING</span>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-white">
                    PureVegies Role: Complete Agricultural Execution
                  </h3>

                  <div className="space-y-2.5 text-xs text-zinc-300">
                    {[
                      'PureVegies allocates appropriate farm space from our managed estates',
                      'Land preparation, compost enrichment & soil revitalization',
                      'High-germination non-GMO seed selection & sowing',
                      'Automated drip irrigation & solar water pumping',
                      'Daily agronomy supervision & transparent bio-protection',
                      'Weekly photo, video & crop progress logging to your portal',
                      'Pre-dawn harvesting at peak nutritional maturity',
                      'Laboratory batch quality check & heavy metal testing',
                      'Eco-insulated packing & sanitized temperature-controlled delivery',
                    ].map((step, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#9EC9AB] shrink-0 mt-0.5" />
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-[#234531] text-xs text-[#9EC9AB]">
                  ★ Comprehensive farm management backed by certified agronomists
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION: THE 8-STEP COMPLETE MODEL
           ========================================================================= */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-b border-[#E5E0D8]">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#628A6F]">
                Step-by-Step Breakdown
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#102115]">
                How The 8 Steps Work
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600">
                From initial crop selection to weekly dinner tables, here is the complete operating model.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((s) => (
                <div
                  key={s.step}
                  className="bg-[#FAF8F5] p-6 rounded-3xl border border-[#E5E0D8] hover:border-[#172F1F] transition flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-2xl font-bold text-zinc-300 group-hover:text-[#172F1F] transition-colors">
                        {s.step}
                      </span>
                      <span className="text-2xl">{s.icon}</span>
                    </div>

                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#628A6F] block">
                      {s.tag}
                    </span>

                    <h3 className="font-serif text-base font-bold text-[#102115] leading-snug">
                      {s.title}
                    </h3>

                    <p className="text-xs text-zinc-600 leading-relaxed">{s.desc}</p>
                  </div>

                  <div className="mt-6 pt-3 border-t border-zinc-200/60 text-[11px] text-zinc-400">
                    {s.subtitle}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION: THREE LAYERS ARCHITECTURE VISUAL
           ========================================================================= */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F4EFE7] border-b border-[#E5E0D8]">
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#628A6F]">
                System Architecture
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#102115]">
                The Three Layers of PureVegies
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600">
                How customer lifestyle, technology coordination, and agricultural execution work in harmony.
              </p>
            </div>

            <div className="space-y-6">
              {/* Layer 1 */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#D8D1C5] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2 md:max-w-md">
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-mono font-bold uppercase">
                    LAYER 1 — CUSTOMER INTERFACE
                  </span>
                  <h3 className="font-serif text-xl font-bold text-[#102115]">
                    Your Family&rsquo;s Table & Preferences
                  </h3>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    You choose the subscription plan, specify household dietary requirements, select desired
                    vegetable varieties, and receive scheduled doorstep deliveries.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 text-xs font-semibold text-[#172F1F]">
                  <span className="px-3 py-1.5 rounded-xl bg-[#FAF8F5] border border-zinc-200">
                    Pays Monthly Subscription
                  </span>
                  <span className="px-3 py-1.5 rounded-xl bg-[#FAF8F5] border border-zinc-200">
                    Selects Crop Matrix
                  </span>
                  <span className="px-3 py-1.5 rounded-xl bg-[#FAF8F5] border border-zinc-200">
                    Receives Produce Box
                  </span>
                </div>
              </div>

              {/* Layer 2 */}
              <div className="bg-[#172F1F] text-white p-6 sm:p-8 rounded-3xl shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2 md:max-w-md">
                  <span className="px-3 py-1 rounded-full bg-[#20412B] text-[#9EC9AB] text-xs font-mono font-bold uppercase">
                    LAYER 2 — PUREVEGIES MANAGEMENT
                  </span>
                  <h3 className="font-serif text-xl font-bold text-white">
                    Platform, Agronomy & Operational Coordination
                  </h3>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    PureVegies operates as the orchestrator: developing farmland, hiring expert agronomists,
                    installing drip infrastructure, supervising cultivation, conducting lab tests, and managing cold chain.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 text-xs font-semibold text-[#A1D1AF]">
                  <span className="px-3 py-1.5 rounded-xl bg-[#102115] border border-[#234531]">
                    Land Development
                  </span>
                  <span className="px-3 py-1.5 rounded-xl bg-[#102115] border border-[#234531]">
                    Lead Agronomists
                  </span>
                  <span className="px-3 py-1.5 rounded-xl bg-[#102115] border border-[#234531]">
                    Cold-Chain Logistics
                  </span>
                </div>
              </div>

              {/* Layer 3 */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#D8D1C5] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2 md:max-w-md">
                  <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-mono font-bold uppercase">
                    LAYER 3 — THE PHYSICAL AGRO-ESTATE
                  </span>
                  <h3 className="font-serif text-xl font-bold text-[#102115]">
                    Soil, Crops, Sunlight & Cultivation
                  </h3>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    The biological process in the soil: Land → Soil Prep → Seed → Sowing → Growing → Monitoring
                    → Pre-dawn Harvest → Quality Check → Packing → Dispatch.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 text-xs font-semibold text-[#6E4B1F]">
                  <span className="px-3 py-1.5 rounded-xl bg-[#FAF8F5] border border-zinc-200">
                    Live Soil Biology
                  </span>
                  <span className="px-3 py-1.5 rounded-xl bg-[#FAF8F5] border border-zinc-200">
                    Precision Drip Lines
                  </span>
                  <span className="px-3 py-1.5 rounded-xl bg-[#FAF8F5] border border-zinc-200">
                    Zero Synthetic Chemicals
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION: WHY THIS MODEL EXISTS ("Why Don't We Ask You To Buy Land?")
           ========================================================================= */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-b border-[#E5E0D8]">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#628A6F]">
                The Fundamental Problem We Solve
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#102115]">
                Why Don&rsquo;t We Ask You to Buy Land?
              </h2>
            </div>

            <div className="prose prose-zinc max-w-none text-zinc-700 space-y-4 text-sm sm:text-base leading-relaxed bg-[#FAF8F5] p-8 sm:p-10 rounded-3xl border border-[#E5E0D8]">
              <p>
                Owning agricultural land in India is expensive, legally complex, and managing a farm requires
                time, knowledge, labour, water, equipment, and constant 365-day supervision.
              </p>
              <p>
                Most urban families who dream of eating clean, traceable food don&rsquo;t actually want to become
                farmers. They don&rsquo;t want to deal with borewell failures, power cuts, labor shortages, crop diseases,
                heavy monsoon damages, or weekly harvest logistics.
              </p>
              <p className="font-semibold text-[#102115]">
                PureVegies removes that entire complexity.
              </p>
              <p>
                You get the complete benefits of having pristine, healthy produce grown specifically for your family,
                traceable back to the exact bed and agronomist, without ever becoming a farmer yourself.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION: COMPARISON TABLE (Traditional Farm Ownership vs PureVegies)
           ========================================================================= */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5] border-b border-[#E5E0D8]">
          <div className="max-w-5xl mx-auto space-y-10">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#628A6F]">
                Side-by-Side Reality Check
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#102115]">
                Traditional Farm Ownership vs PureVegies
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600">
                Compare the immense burden of private land ownership with our managed farming subscription.
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-[#D8D1C5] shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-[#102115] text-white font-serif uppercase tracking-wider text-xs">
                    <tr>
                      <th className="py-4 px-6 font-semibold">Responsibility</th>
                      <th className="py-4 px-6 font-semibold text-red-200">Traditional Farm Ownership</th>
                      <th className="py-4 px-6 font-semibold text-[#9EC9AB]">PureVegies Managed Farming</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E0D8]">
                    {comparisonRows.map((row, idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-[#FAF8F5]'}>
                        <td className="py-4 px-6 font-semibold text-[#102115]">{row.feature}</td>
                        <td className="py-4 px-6 text-zinc-600 flex items-center gap-2">
                          <X className="w-4 h-4 text-red-500 shrink-0" />
                          <span>{row.traditional}</span>
                        </td>
                        <td className="py-4 px-6 text-[#172F1F] font-medium">
                          <div className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>{row.purevegies}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION: CTA
           ========================================================================= */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#172F1F] text-white text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white">
              Ready to experience farming without owning land?
            </h2>
            <p className="text-base sm:text-lg text-zinc-300 font-light">
              Choose your plan and select your crops today. Our agronomists handle everything else.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/build-your-farm"
                className="w-full sm:w-auto px-8 py-4 bg-[#FAF8F5] hover:bg-white text-[#102115] font-semibold text-xs uppercase tracking-wider rounded-full shadow-lg transition flex items-center justify-center gap-2"
              >
                <span>Build My Farm Plan</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/plans"
                className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-white/10 text-white font-semibold text-xs uppercase tracking-wider rounded-full border border-white/30 transition flex items-center justify-center"
              >
                <span>Compare Subscription Plans</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
