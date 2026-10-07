'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Users,
  Sprout,
  Layers,
  Truck,
  DollarSign,
  TrendingUp,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  AlertTriangle,
  RefreshCw,
  Search,
  Filter,
  Eye,
  Camera,
  Calendar,
  MessageCircle,
  Save,
  Check,
  X,
  FileText,
  Sliders,
  Settings,
  ShieldCheck,
  Activity,
  BarChart3,
  Globe,
  Compass,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useFarmStore } from '@/lib/farmStore';
import { CropStage, DeliveryStatus, PlanTier, Customer } from '@/lib/types';
import { getAppConfig } from '@/lib/envConfig';

export default function AdminDashboardPage() {
  const {
    customers,
    farms,
    plots,
    crops,
    deliveries,
    updates,
    leads,
    visits,
    config,
    updateCropStage,
    updateDeliveryStatus,
    createCustomerSubscription,
    addFarmUpdate,
    updateConfig,
  } = useFarmStore();

  const appConfig = getAppConfig();
  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [isLoadingAnalytics, setIsLoadingAnalytics] = useState(false);

  const fetchAnalytics = async () => {
    setIsLoadingAnalytics(true);
    try {
      const res = await fetch('/api/analytics');
      const json = await res.json();
      setAnalyticsData(json);
    } catch (err) {
      console.error('Failed to load analytics', err);
    } finally {
      setIsLoadingAnalytics(false);
    }
  };

  React.useEffect(() => {
    fetchAnalytics();
  }, []);

  const [activeTab, setActiveTab] = useState<
    'overview' | 'analytics' | 'customers' | 'farms' | 'plots' | 'crops' | 'deliveries' | 'leads' | 'settings'
  >('overview');

  // Customer modal / creation state
  const [showAddCustomerModal, setShowAddCustomerModal] = useState(false);
  const [newCustName, setNewCustName] = useState('');
  const [newCustEmail, setNewCustEmail] = useState('');
  const [newCustPhone, setNewCustPhone] = useState('');
  const [newCustPlan, setNewCustPlan] = useState<PlanTier>('dedicated');
  const [newCustCity, setNewCustCity] = useState('Bengaluru');

  // Delivery status update inline
  const handleDeliveryStatusChange = (delId: string, newStatus: DeliveryStatus) => {
    updateDeliveryStatus(delId, newStatus, `Status updated to ${newStatus} by Operations Admin`);
  };

  // Crop stage update inline
  const handleCropStageChange = (cropId: string, newStage: CropStage) => {
    const progressMap: Record<CropStage, number> = {
      seed: 5,
      germination: 15,
      growing: 45,
      flowering: 70,
      harvest: 95,
      quality_check: 98,
      packing: 99,
      delivery: 100,
    };
    updateCropStage(cropId, newStage, progressMap[newStage], `Stage updated to ${newStage}`);
  };

  // Quick New Customer Submit
  const handleCreateCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustName || !newCustPhone) return;

    createCustomerSubscription({
      fullName: newCustName,
      email: newCustEmail || `${newCustPhone.slice(-4)}@example.com`,
      phone: newCustPhone,
      whatsapp: newCustPhone,
      city: newCustCity,
      planId: newCustPlan,
      planName:
        newCustPlan === 'family'
          ? "My Family's Farm"
          : newCustPlan === 'dedicated'
          ? 'My Dedicated Farm'
          : 'My Private Farm',
      monthlyAmount: newCustPlan === 'family' ? 10000 : newCustPlan === 'dedicated' ? 20000 : 58333,
    });

    setNewCustName('');
    setNewCustEmail('');
    setNewCustPhone('');
    setShowAddCustomerModal(false);
  };

  // Stats calculation
  const totalSubscribers = customers.length;
  const activeSubscribers = customers.filter((c) => c.subscriptionStatus === 'active').length;
  const totalFarmArea = farms.reduce((acc, f) => acc + f.totalAreaAcres, 0);
  const availableFarmArea = farms.reduce((acc, f) => acc + f.availableAreaAcres, 0);
  const totalRevenueMonth = customers.reduce((acc, c) => acc + c.monthlyAmount, 0);
  const pendingDeliveries = deliveries.filter((d) => d.status !== 'delivered').length;

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
      <Navbar />

      <main className="flex-1 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-8">
        {/* TEST MODE / STAGING BANNER */}
        <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 text-amber-950 shadow-sm">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-200/70 border border-amber-300 flex items-center justify-center text-amber-800 font-bold text-lg shrink-0">
              ⚠️
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-[11px] uppercase px-2.5 py-0.5 rounded-full bg-amber-200 text-amber-900 font-bold tracking-wide">
                  INTERNAL TEST MODE ACTIVE
                </span>
                <span className="text-xs text-amber-900 font-semibold">
                  Temporary Subdomain: <code className="font-mono bg-white px-2 py-0.5 rounded border border-amber-200 text-amber-900">{appConfig.siteDomain}</code>
                </span>
              </div>
              <p className="text-xs text-amber-800 mt-1">
                Notice: This domain is for temporary public staging only. Search engines are blocked (<code className="font-mono text-[11px]">noindex, nofollow</code>). Final domain will be chosen after 11 October.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 text-xs font-semibold shrink-0">
            <span className="px-3 py-1 bg-white rounded-full border border-amber-300 text-amber-800 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              SEO: Blocked
            </span>
            <span className="px-3 py-1 bg-emerald-100 text-emerald-900 rounded-full border border-emerald-300 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Telemetry: Live
            </span>
          </div>
        </div>

        {/* Top Header */}
        <div className="bg-[#102115] text-white rounded-3xl p-6 sm:p-8 border border-[#234531] shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#1F3D2A] text-[#9EC9AB] text-xs font-mono font-bold uppercase tracking-wider">
                Farm-to-Family Ops
              </span>
              <span className="text-xs text-zinc-400">Master Operations Control</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              Operations & Agronomy Console
            </h1>
            <p className="text-xs text-zinc-400">
              Manage participating estates, plot allocations, crop growth lifecycles, and cold-chain
              deliveries.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAddCustomerModal(true)}
              className="px-5 py-2.5 bg-[#FAF8F5] hover:bg-white text-[#102115] text-xs font-semibold rounded-full transition shadow-xs flex items-center gap-2"
            >
              <Plus className="w-4 h-4 text-[#2D5A3C]" />
              <span>Enroll New Subscriber</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#E5E0D8]">
          {[
            { id: 'overview', label: 'Operations Overview' },
            { id: 'analytics', label: '📊 Staging Traffic & Analytics' },
            { id: 'customers', label: `Customers (${customers.length})` },
            { id: 'farms', label: `Farms (${farms.length})` },
            { id: 'plots', label: `Plots (${plots.length})` },
            { id: 'crops', label: `Crops (${crops.length})` },
            { id: 'deliveries', label: `Deliveries (${deliveries.length})` },
            { id: 'leads', label: `Inbound Leads (${leads.length + visits.length})` },
            { id: 'settings', label: 'Pricing & WhatsApp Settings' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 text-xs font-bold rounded-full transition whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-[#172F1F] text-white shadow-xs'
                  : 'bg-white border border-[#D8D1C5] text-zinc-700 hover:bg-[#F4EFE7]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-[#D8D1C5] shadow-xs space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                  Total Subscribers
                </span>
                <p className="font-serif text-3xl font-bold text-[#102115]">{totalSubscribers}</p>
                <span className="text-[10px] text-emerald-700 font-medium">
                  {activeSubscribers} Active Plans
                </span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#D8D1C5] shadow-xs space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                  Monthly Run Rate
                </span>
                <p className="font-serif text-3xl font-bold text-[#102115]">
                  ₹{(totalRevenueMonth / 1000).toFixed(0)}k
                </p>
                <span className="text-[10px] text-zinc-500 font-medium">Billed regular cycle</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#D8D1C5] shadow-xs space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                  Managed Acreage
                </span>
                <p className="font-serif text-3xl font-bold text-[#102115]">
                  {totalFarmArea.toFixed(0)} <span className="text-sm font-sans">Acres</span>
                </p>
                <span className="text-[10px] text-zinc-500 font-medium">
                  {availableFarmArea} Acres available
                </span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#D8D1C5] shadow-xs space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                  Allocated Plots
                </span>
                <p className="font-serif text-3xl font-bold text-[#102115]">{plots.length}</p>
                <span className="text-[10px] text-emerald-700 font-medium">
                  {plots.filter((p) => p.status === 'growing').length} In Cultivation
                </span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#D8D1C5] shadow-xs space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                  Growing Crops
                </span>
                <p className="font-serif text-3xl font-bold text-[#102115]">{crops.length}</p>
                <span className="text-[10px] text-zinc-500 font-medium">
                  {crops.filter((c) => c.currentStage === 'harvest').length} Ready for Harvest
                </span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#D8D1C5] shadow-xs space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                  Deliveries in transit
                </span>
                <p className="font-serif text-3xl font-bold text-[#102115]">{pendingDeliveries}</p>
                <span className="text-[10px] text-amber-700 font-medium">Cold chain active</span>
              </div>
            </div>

            {/* Quick Operations Action Rows */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Deliveries */}
              <div className="bg-white rounded-3xl p-6 border border-[#D8D1C5] shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-xl font-bold text-[#102115]">
                    Recent Harvest Deliveries
                  </h3>
                  <button
                    onClick={() => setActiveTab('deliveries')}
                    className="text-xs font-semibold text-[#2D5A3C] hover:underline"
                  >
                    View All ({deliveries.length})
                  </button>
                </div>

                <div className="divide-y divide-zinc-100">
                  {deliveries.slice(0, 3).map((del) => (
                    <div key={del.id} className="py-3 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-zinc-900 block">{del.customerName}</span>
                        <span className="text-zinc-500 text-[11px]">
                          Code: {del.deliveryCode} • Date: {del.scheduledDate}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#FAF8F5] border text-zinc-700 font-mono text-[11px]">
                          {del.totalWeightKg} kg
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-[#E2ECE5] text-[#20412B] font-bold text-[11px] uppercase">
                          {del.status.replace('_', ' ')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Inbound Leads */}
              <div className="bg-white rounded-3xl p-6 border border-[#D8D1C5] shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-xl font-bold text-[#102115]">
                    Fresh Inbound Consultations
                  </h3>
                  <button
                    onClick={() => setActiveTab('leads')}
                    className="text-xs font-semibold text-[#2D5A3C] hover:underline"
                  >
                    View Leads ({leads.length})
                  </button>
                </div>

                <div className="divide-y divide-zinc-100">
                  {leads.map((lead) => (
                    <div key={lead.id} className="py-3 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-zinc-900 block">{lead.fullName}</span>
                        <span className="text-zinc-500 text-[11px]">
                          {lead.phone} • City: {lead.city} • Family: {lead.familySize}
                        </span>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 font-semibold text-[11px]">
                        Plan: {lead.interestedPlan}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: ANALYTICS & TRAFFIC */}
        {activeTab === 'analytics' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Analytics Header */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D8D1C5] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-xs font-mono font-bold uppercase tracking-wider">
                    Telemetry Active
                  </span>
                  <span className="text-xs text-zinc-500">Live Staging Data</span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#102115] mt-1">
                  Staging Traffic & Conversion Metrics
                </h3>
                <p className="text-xs text-zinc-500">
                  Real-time telemetry captured on <code className="bg-zinc-100 px-1 py-0.5 rounded">{appConfig.siteDomain}</code> while search crawler indexing remains strictly blocked.
                </p>
              </div>

              <button
                onClick={fetchAnalytics}
                disabled={isLoadingAnalytics}
                className="px-4 py-2 bg-[#172F1F] hover:bg-[#20412B] text-white text-xs font-semibold rounded-full flex items-center gap-2 self-start sm:self-auto disabled:opacity-50 transition"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoadingAnalytics ? 'animate-spin' : ''}`} />
                <span>Refresh Live Data</span>
              </button>
            </div>

            {/* Core Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-[#D8D1C5] shadow-xs space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                  Unique Visitors
                </span>
                <p className="font-serif text-3xl font-bold text-[#102115]">
                  {analyticsData?.metrics?.uniqueVisitors ?? 0}
                </p>
                <span className="text-[10px] text-zinc-500 font-medium">Distinct browser sessions</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#D8D1C5] shadow-xs space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                  Total Telemetry Events
                </span>
                <p className="font-serif text-3xl font-bold text-[#102115]">
                  {analyticsData?.metrics?.totalEvents ?? 0}
                </p>
                <span className="text-[10px] text-emerald-700 font-medium">Recorded interactions</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#D8D1C5] shadow-xs space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                  Farm Builder Starts
                </span>
                <p className="font-serif text-3xl font-bold text-[#102115]">
                  {analyticsData?.metrics?.eventCounts?.build_farm_start ?? 0}
                </p>
                <span className="text-[10px] text-zinc-500 font-medium">
                  {analyticsData?.metrics?.eventCounts?.build_farm_complete ?? 0} Completed ({
                    analyticsData?.metrics?.eventCounts?.build_farm_start
                      ? Math.round(
                          ((analyticsData?.metrics?.eventCounts?.build_farm_complete ?? 0) /
                            analyticsData?.metrics?.eventCounts?.build_farm_start) *
                            100
                        )
                      : 0
                  }% Funnel)
                </span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#D8D1C5] shadow-xs space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                  Direct Inbound Leads
                </span>
                <p className="font-serif text-3xl font-bold text-[#102115]">
                  {(analyticsData?.metrics?.eventCounts?.lead_submission ?? 0) +
                    (analyticsData?.metrics?.eventCounts?.visit_enquiry ?? 0)}
                </p>
                <span className="text-[10px] text-emerald-700 font-medium">
                  {analyticsData?.metrics?.eventCounts?.whatsapp_click ?? 0} WhatsApp clicks
                </span>
              </div>
            </div>

            {/* Plan Interest Breakdown Cards */}
            <div className="bg-white rounded-3xl p-6 border border-[#D8D1C5] shadow-xs space-y-4">
              <h4 className="font-serif text-lg font-bold text-[#102115]">
                Plan Interest & Pricing Elasticity Breakdown
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E5E0D8] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#172F1F]">My Family&rsquo;s Farm</span>
                    <span className="text-xs font-mono bg-white px-2 py-0.5 rounded border border-zinc-200">
                      ₹10,000/mo
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-[#102115]">
                    {analyticsData?.metrics?.eventCounts?.plan_interest_10k ?? 0}
                  </p>
                  <p className="text-[11px] text-zinc-500">
                    Clicks on 10k CTAs, calculator results & cards
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF8F5] border-2 border-[#172F1F] space-y-2 relative">
                  <span className="absolute -top-2.5 right-4 bg-[#172F1F] text-[#9EC9AB] text-[10px] uppercase font-bold px-2 py-0.5 rounded-full">
                    Most Popular
                  </span>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#172F1F]">My Dedicated Farm</span>
                    <span className="text-xs font-mono bg-white px-2 py-0.5 rounded border border-zinc-200">
                      ₹20,000/mo
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-[#102115]">
                    {analyticsData?.metrics?.eventCounts?.plan_interest_20k ?? 0}
                  </p>
                  <p className="text-[11px] text-zinc-500">
                    Clicks on 20k dedicated plot offerings
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#102115] text-white space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#D8E6DC]">My Private Farm (HNI)</span>
                    <span className="text-xs font-mono bg-[#1F3D2A] px-2 py-0.5 rounded text-[#A3D4B3]">
                      ₹7,00,000/yr
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-white">
                    {analyticsData?.metrics?.eventCounts?.plan_interest_700k ?? 0}
                  </p>
                  <p className="text-[11px] text-zinc-400">
                    HNI manager consultation requests (~₹58.3k/mo)
                  </p>
                </div>
              </div>
            </div>

            {/* Geo Distribution & High-Intent Conversion Metrics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Top Geo Locations */}
              <div className="bg-white rounded-3xl p-6 border border-[#D8D1C5] shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif text-lg font-bold text-[#102115]">
                    Visitor Geographic Distribution
                  </h4>
                  <Globe className="w-4 h-4 text-[#2D5A3C]" />
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                    Top Cities
                  </p>
                  {analyticsData?.metrics?.topCities && analyticsData.metrics.topCities.length > 0 ? (
                    <div className="space-y-1.5">
                      {analyticsData.metrics.topCities.slice(0, 5).map((c: any, idx: number) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-2.5 rounded-xl bg-[#FAF8F5] border border-zinc-100 text-xs"
                        >
                          <span className="font-medium text-zinc-800">{c.name}</span>
                          <span className="font-mono bg-white px-2 py-0.5 rounded border border-zinc-200 font-bold">
                            {c.count} visits
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-zinc-400 italic">No city traffic recorded yet.</p>
                  )}

                  <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider pt-2">
                    Top Countries
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {analyticsData?.metrics?.topCountries?.map((cntry: any, idx: number) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-zinc-100 rounded-full text-xs font-medium text-zinc-700"
                      >
                        {cntry.name}: <strong>{cntry.count}</strong>
                      </span>
                    )) || <span className="text-xs text-zinc-400">None yet</span>}
                  </div>
                </div>
              </div>

              {/* Conversion Touchpoints */}
              <div className="bg-white rounded-3xl p-6 border border-[#D8D1C5] shadow-xs space-y-4">
                <h4 className="font-serif text-lg font-bold text-[#102115]">
                  High-Intent Conversion Touchpoints
                </h4>
                <div className="space-y-2.5">
                  <div className="p-3 bg-[#FAF8F5] rounded-xl border border-zinc-200 flex items-center justify-between text-xs">
                    <div>
                      <strong className="text-zinc-900 block">Farm Advisor Inquiries</strong>
                      <span className="text-zinc-500 text-[11px]">Direct concierge callbacks requested</span>
                    </div>
                    <span className="font-mono text-sm font-bold text-[#172F1F]">
                      {analyticsData?.metrics?.eventCounts?.advisor_enquiry ?? 0}
                    </span>
                  </div>

                  <div className="p-3 bg-[#FAF8F5] rounded-xl border border-zinc-200 flex items-center justify-between text-xs">
                    <div>
                      <strong className="text-zinc-900 block">Weekend Farm Visits Booked</strong>
                      <span className="text-zinc-500 text-[11px]">On-site farm walkthrough requests</span>
                    </div>
                    <span className="font-mono text-sm font-bold text-[#172F1F]">
                      {analyticsData?.metrics?.eventCounts?.visit_enquiry ?? 0}
                    </span>
                  </div>

                  <div className="p-3 bg-[#FAF8F5] rounded-xl border border-zinc-200 flex items-center justify-between text-xs">
                    <div>
                      <strong className="text-zinc-900 block">WhatsApp Quick Inquiries</strong>
                      <span className="text-zinc-500 text-[11px]">Chat triggers via concierge widget</span>
                    </div>
                    <span className="font-mono text-sm font-bold text-[#172F1F]">
                      {analyticsData?.metrics?.eventCounts?.whatsapp_click ?? 0}
                    </span>
                  </div>

                  <div className="p-3 bg-[#FAF8F5] rounded-xl border border-zinc-200 flex items-center justify-between text-xs">
                    <div>
                      <strong className="text-zinc-900 block">Full Lead Registrations</strong>
                      <span className="text-zinc-500 text-[11px]">Forms submitted with family size & crops</span>
                    </div>
                    <span className="font-mono text-sm font-bold text-[#172F1F]">
                      {analyticsData?.metrics?.eventCounts?.lead_submission ?? 0}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Telemetry Stream */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D8D1C5] shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-lg font-bold text-[#102115]">
                    Recent Telemetry Events Stream
                  </h4>
                  <p className="text-xs text-zinc-500">Live feed of visitor events</p>
                </div>
                <span className="text-xs font-mono text-zinc-400">
                  Showing last {analyticsData?.recentEvents?.length ?? 0} events
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-zinc-700">
                  <thead className="bg-[#FAF8F5] text-zinc-500 uppercase font-mono text-[11px] border-y border-[#E5E0D8]">
                    <tr>
                      <th className="py-2.5 px-3">Event Name</th>
                      <th className="py-2.5 px-3">Path</th>
                      <th className="py-2.5 px-3">Location</th>
                      <th className="py-2.5 px-3">Visitor ID</th>
                      <th className="py-2.5 px-3">Details</th>
                      <th className="py-2.5 px-3 text-right">Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100 font-mono text-[11px]">
                    {analyticsData?.recentEvents && analyticsData.recentEvents.length > 0 ? (
                      analyticsData.recentEvents.slice(0, 15).map((evt: any) => (
                        <tr key={evt.id} className="hover:bg-zinc-50">
                          <td className="py-2.5 px-3 font-semibold text-[#172F1F]">
                            {evt.event}
                          </td>
                          <td className="py-2.5 px-3 text-zinc-600">{evt.path}</td>
                          <td className="py-2.5 px-3 text-zinc-600">
                            {evt.city}, {evt.country}
                          </td>
                          <td className="py-2.5 px-3 text-zinc-400">{evt.visitorId}</td>
                          <td className="py-2.5 px-3 text-zinc-600 max-w-xs truncate font-sans text-xs">
                            {evt.metadata ? JSON.stringify(evt.metadata).slice(0, 50) : '-'}
                          </td>
                          <td className="py-2.5 px-3 text-right text-zinc-400">
                            {new Date(evt.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="py-6 text-center text-zinc-400 font-sans italic">
                          No events recorded yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CUSTOMERS */}
        {activeTab === 'customers' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D8D1C5] shadow-xs space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-serif text-2xl font-bold text-[#102115]">
                  Enrolled Subscribers
                </h3>
                <p className="text-xs text-zinc-500">
                  Active household farming accounts and assigned agro-estates.
                </p>
              </div>

              <button
                onClick={() => setShowAddCustomerModal(true)}
                className="px-4 py-2 bg-[#172F1F] hover:bg-[#20412B] text-white text-xs font-semibold rounded-full flex items-center gap-1.5 self-start sm:self-auto"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Customer</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-zinc-700">
                <thead className="bg-[#FAF8F5] text-zinc-500 uppercase font-mono text-[11px] border-y border-[#E5E0D8]">
                  <tr>
                    <th className="py-3 px-4">Customer</th>
                    <th className="py-3 px-4">Plan & Billing</th>
                    <th className="py-3 px-4">Assigned Farm & Plot</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Renewal Date</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {customers.map((c) => (
                    <tr key={c.id} className="hover:bg-zinc-50">
                      <td className="py-3 px-4">
                        <strong className="text-zinc-900 block text-sm">{c.fullName}</strong>
                        <span className="text-[11px] text-zinc-500">{c.email}</span>
                        <span className="text-[11px] text-zinc-500 block">{c.phone}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-semibold text-zinc-900 block">{c.planName}</span>
                        <span className="font-mono text-zinc-500">
                          ₹{c.monthlyAmount.toLocaleString()} / mo
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-medium text-zinc-900 block">{c.farmName}</span>
                        <span className="text-[11px] font-mono text-[#2D5A3C] font-semibold">
                          {c.plotNumber}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px] uppercase">
                          {c.subscriptionStatus}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono text-zinc-600">{c.renewalDate}</td>
                      <td className="py-3 px-4 text-right">
                        <button
                          type="button"
                          onClick={() => alert(`Details for ${c.fullName}`)}
                          className="px-3 py-1 bg-white border border-[#D8D1C5] rounded-lg text-xs font-semibold hover:bg-zinc-50"
                        >
                          Manage
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: FARMS */}
        {activeTab === 'farms' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-2xl font-bold text-[#102115]">
                  Participating Agro-Estates
                </h3>
                <p className="text-xs text-zinc-500">
                  Centrally managed locations with soil pH and deep water lab assays.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {farms.map((f) => (
                <div
                  key={f.id}
                  className="bg-white rounded-3xl overflow-hidden border border-[#D8D1C5] shadow-xs flex flex-col justify-between"
                >
                  <div className="aspect-video relative">
                    <img src={f.images[0]} alt={f.name} className="w-full h-full object-cover" />
                    <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-black/70 text-white font-mono text-[10px]">
                      {f.code}
                    </span>
                  </div>

                  <div className="p-6 space-y-4">
                    <div>
                      <h4 className="font-serif text-xl font-bold text-[#102115]">{f.name}</h4>
                      <p className="text-xs text-zinc-500">
                        {f.location}, {f.state}
                      </p>
                    </div>

                    <div className="space-y-1.5 text-xs text-zinc-600 border-t border-zinc-100 pt-3">
                      <div className="flex justify-between">
                        <span>Total Area:</span>
                        <strong className="text-zinc-900">{f.totalAreaAcres} Acres</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Available Space:</span>
                        <strong className="text-emerald-700">{f.availableAreaAcres} Acres</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Soil Type:</span>
                        <span className="text-zinc-700 font-medium truncate max-w-[150px]">
                          {f.soilType}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Water TDS:</span>
                        <strong className="text-zinc-900">{f.waterTds} mg/L</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Lead Agronomist:</span>
                        <span className="font-medium text-zinc-800">{f.agronomistName}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-[#FAF8F5] border-t border-[#E5E0D8] text-right">
                    <button
                      type="button"
                      onClick={() => alert(`Editing farm details for ${f.name}`)}
                      className="px-4 py-1.5 bg-white border border-[#D8D1C5] rounded-full text-xs font-semibold hover:bg-zinc-50"
                    >
                      Configure Estate
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: PLOTS */}
        {activeTab === 'plots' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D8D1C5] shadow-xs space-y-6 animate-in fade-in duration-200">
            <div>
              <h3 className="font-serif text-2xl font-bold text-[#102115]">Allocated Plot Grid</h3>
              <p className="text-xs text-zinc-500">
                Assigned household sectors and soil moisture readiness.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-zinc-700">
                <thead className="bg-[#FAF8F5] text-zinc-500 uppercase font-mono text-[11px] border-y border-[#E5E0D8]">
                  <tr>
                    <th className="py-3 px-4">Plot ID</th>
                    <th className="py-3 px-4">Farm</th>
                    <th className="py-3 px-4">Area (sq.ft)</th>
                    <th className="py-3 px-4">Assigned Household</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Irrigation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {plots.map((p) => (
                    <tr key={p.id} className="hover:bg-zinc-50">
                      <td className="py-3 px-4 font-mono font-bold text-zinc-900">{p.plotNumber}</td>
                      <td className="py-3 px-4">{p.farmName}</td>
                      <td className="py-3 px-4 font-mono">{p.sizeSqFt.toLocaleString()}</td>
                      <td className="py-3 px-4">
                        {p.assignedCustomerName ? (
                          <strong className="text-[#172F1F]">{p.assignedCustomerName}</strong>
                        ) : (
                          <span className="text-zinc-400 italic">Unassigned (Reserve)</span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] uppercase ${
                            p.status === 'growing'
                              ? 'bg-emerald-100 text-emerald-800'
                              : p.status === 'available'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {p.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-zinc-600">{p.irrigationType}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: CROPS & LIFECYCLE CONTROLLER */}
        {activeTab === 'crops' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D8D1C5] shadow-xs space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-serif text-2xl font-bold text-[#102115]">
                  Crop Growth Lifecycle Manager
                </h3>
                <p className="text-xs text-zinc-500">
                  Transition growing stages from seedbed to pre-dawn harvest.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {crops.map((crop) => (
                <div
                  key={crop.id}
                  className="p-5 rounded-2xl border border-[#E5E0D8] bg-[#FAF8F5] flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={crop.imageUrl}
                      alt={crop.name}
                      className="w-16 h-16 rounded-xl object-cover shrink-0"
                    />
                    <div>
                      <h4 className="font-serif font-bold text-base text-zinc-900">{crop.name}</h4>
                      <p className="text-xs text-zinc-500">
                        {crop.variety} • Sown: {crop.sowingDate} • Target Harvest:{' '}
                        <strong className="text-zinc-800">{crop.expectedHarvestDate}</strong>
                      </p>
                      <p className="text-[11px] text-zinc-600 mt-1">{crop.notes}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <div className="text-right mr-2">
                      <span className="text-[10px] text-zinc-400 block uppercase">
                        Current Stage
                      </span>
                      <span className="font-bold text-xs uppercase text-[#2D5A3C]">
                        {crop.currentStage}
                      </span>
                    </div>

                    <select
                      value={crop.currentStage}
                      onChange={(e) =>
                        handleCropStageChange(crop.id, e.target.value as CropStage)
                      }
                      className="px-3 py-1.5 rounded-lg border border-[#D8D1C5] bg-white text-xs font-semibold text-zinc-800 focus:outline-none focus:ring-2 focus:ring-[#172F1F]"
                    >
                      <option value="seed">Seed Selection</option>
                      <option value="germination">Germination</option>
                      <option value="growing">Vegetative Growing</option>
                      <option value="flowering">Flowering</option>
                      <option value="harvest">Harvest Ready</option>
                      <option value="quality_check">Quality Check</option>
                      <option value="packing">Packing</option>
                      <option value="delivery">Delivered</option>
                    </select>

                    <button
                      type="button"
                      onClick={() => alert(`Logged agronomist note for ${crop.name}`)}
                      className="px-3 py-1.5 bg-[#172F1F] text-white rounded-lg text-xs font-semibold hover:bg-[#20412B]"
                    >
                      Add Note
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: DELIVERIES */}
        {activeTab === 'deliveries' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D8D1C5] shadow-xs space-y-6 animate-in fade-in duration-200">
            <div>
              <h3 className="font-serif text-2xl font-bold text-[#102115]">
                Doorstep Cold Chain Logistics
              </h3>
              <p className="text-xs text-zinc-500">
                Track and progress orders: Harvested → Quality Checked → Packed → Dispatched →
                Delivered.
              </p>
            </div>

            <div className="space-y-4">
              {deliveries.map((del) => (
                <div
                  key={del.id}
                  className="p-5 rounded-2xl border border-[#E5E0D8] bg-[#FAF8F5] flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xs text-[#172F1F]">
                        {del.deliveryCode}
                      </span>
                      <span className="text-xs text-zinc-400">•</span>
                      <span className="font-bold text-sm text-zinc-900">{del.customerName}</span>
                    </div>
                    <p className="text-xs text-zinc-500 mt-0.5">
                      Scheduled: {del.scheduledDate} • Total Weight: {del.totalWeightKg} kg •
                      Inspector: {del.qcInspector}
                    </p>
                    <p className="text-[11px] text-zinc-600 mt-1 italic">
                      Tracking: {del.trackingNotes}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <div className="text-right mr-2">
                      <span className="text-[10px] text-zinc-400 block uppercase">
                        Current Status
                      </span>
                      <span className="font-bold text-xs uppercase text-[#2D5A3C]">
                        {del.status.replace('_', ' ')}
                      </span>
                    </div>

                    <select
                      value={del.status}
                      onChange={(e) =>
                        handleDeliveryStatusChange(del.id, e.target.value as DeliveryStatus)
                      }
                      className="px-3 py-1.5 rounded-lg border border-[#D8D1C5] bg-white text-xs font-semibold text-zinc-800 focus:outline-none focus:ring-2 focus:ring-[#172F1F]"
                    >
                      <option value="harvested">Harvested</option>
                      <option value="quality_checked">Quality Checked</option>
                      <option value="packed">Packed (Chilled)</option>
                      <option value="dispatched">Dispatched</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: INBOUND LEADS */}
        {activeTab === 'leads' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D8D1C5] shadow-xs space-y-6 animate-in fade-in duration-200">
            <div>
              <h3 className="font-serif text-2xl font-bold text-[#102115]">
                Inbound Leads & Farm Visit Inquiries
              </h3>
              <p className="text-xs text-zinc-500">
                Prospective subscribers who completed the farm builder wizard or booked an estate
                visit.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-zinc-700">
                <thead className="bg-[#FAF8F5] text-zinc-500 uppercase font-mono text-[11px] border-y border-[#E5E0D8]">
                  <tr>
                    <th className="py-3 px-4">Visitor Name</th>
                    <th className="py-3 px-4">Phone / WhatsApp</th>
                    <th className="py-3 px-4">City</th>
                    <th className="py-3 px-4">Family Size</th>
                    <th className="py-3 px-4">Interested Plan</th>
                    <th className="py-3 px-4">Inquiry Time</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {leads.map((l) => (
                    <tr key={l.id} className="hover:bg-zinc-50">
                      <td className="py-3 px-4 font-bold text-zinc-900">{l.fullName}</td>
                      <td className="py-3 px-4 font-mono">{l.phone}</td>
                      <td className="py-3 px-4">{l.city}</td>
                      <td className="py-3 px-4">{l.familySize}</td>
                      <td className="py-3 px-4 font-semibold text-[#2D5A3C] uppercase">
                        {l.interestedPlan}
                      </td>
                      <td className="py-3 px-4 text-zinc-500">
                        {new Date(l.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <a
                          href={`https://wa.me/${l.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                            `Hi ${l.fullName}, this is Farm-to-Family following up on your farm plan inquiry.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-3 py-1 bg-[#25D366] text-white rounded-lg text-xs font-semibold"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>WhatsApp</span>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 8: SETTINGS & CONFIG */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#D8D1C5] shadow-xs space-y-8 animate-in fade-in duration-200">
            <div>
              <h3 className="font-serif text-2xl font-bold text-[#102115]">
                System Configuration
              </h3>
              <p className="text-xs text-zinc-500">
                Update global WhatsApp contact numbers, customer care lines, and pricing.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">
                  Official WhatsApp Contact Number
                </label>
                <input
                  type="text"
                  value={config.whatsappNumber}
                  onChange={(e) => updateConfig({ whatsappNumber: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8D1C5] text-sm focus:outline-none focus:ring-2 focus:ring-[#172F1F]"
                />
                <p className="text-[11px] text-zinc-500 mt-1">
                  Appears across all floating widgets, footers, and direct click-to-chat links.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">
                  Customer Care Phone Line
                </label>
                <input
                  type="text"
                  value={config.supportPhone}
                  onChange={(e) => updateConfig({ supportPhone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8D1C5] text-sm focus:outline-none focus:ring-2 focus:ring-[#172F1F]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">
                  Support Email Address
                </label>
                <input
                  type="email"
                  value={config.supportEmail}
                  onChange={(e) => updateConfig({ supportEmail: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8D1C5] text-sm focus:outline-none focus:ring-2 focus:ring-[#172F1F]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">
                  Agronomy Headquarters Address
                </label>
                <input
                  type="text"
                  value={config.headquartersAddress}
                  onChange={(e) => updateConfig({ headquartersAddress: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8D1C5] text-sm focus:outline-none focus:ring-2 focus:ring-[#172F1F]"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-100 flex items-center gap-2 text-xs text-emerald-700 font-semibold">
              <CheckCircle className="w-4 h-4" />
              <span>All changes automatically persist to local storage and sync in real-time.</span>
            </div>
          </div>
        )}
      </main>

      {/* Modal: Enroll New Subscriber */}
      {showAddCustomerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-[#D8D1C5] shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-zinc-100">
              <h3 className="font-serif text-2xl font-bold text-[#102115]">
                Enroll New Subscriber
              </h3>
              <button
                onClick={() => setShowAddCustomerModal(false)}
                className="p-1 text-zinc-400 hover:text-zinc-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCustomer} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={newCustName}
                  onChange={(e) => setNewCustName(e.target.value)}
                  placeholder="e.g. Anjali Nair"
                  className="w-full px-3.5 py-2 rounded-xl border border-[#D8D1C5] text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">Mobile Phone</label>
                <input
                  type="tel"
                  required
                  value={newCustPhone}
                  onChange={(e) => setNewCustPhone(e.target.value)}
                  placeholder="e.g. 98450 99881"
                  className="w-full px-3.5 py-2 rounded-xl border border-[#D8D1C5] text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">Email</label>
                <input
                  type="email"
                  value={newCustEmail}
                  onChange={(e) => setNewCustEmail(e.target.value)}
                  placeholder="e.g. anjali@example.com"
                  className="w-full px-3.5 py-2 rounded-xl border border-[#D8D1C5] text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">Plan</label>
                <select
                  value={newCustPlan}
                  onChange={(e) => setNewCustPlan(e.target.value as PlanTier)}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#D8D1C5] text-sm"
                >
                  <option value="family">My Family's Farm (₹10k/mo)</option>
                  <option value="dedicated">My Dedicated Farm (₹20k/mo)</option>
                  <option value="private">My Private Farm (₹7L/yr)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">City</label>
                <input
                  type="text"
                  value={newCustCity}
                  onChange={(e) => setNewCustCity(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#D8D1C5] text-sm"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddCustomerModal(false)}
                  className="px-4 py-2 border rounded-full text-xs font-semibold text-zinc-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#172F1F] text-white rounded-full text-xs font-semibold hover:bg-[#20412B]"
                >
                  Confirm & Allocate Plot
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
