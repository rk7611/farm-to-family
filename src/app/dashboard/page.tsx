'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sprout,
  MapPin,
  Calendar,
  Layers,
  Clock,
  Truck,
  CheckCircle2,
  Camera,
  MessageCircle,
  FileText,
  CreditCard,
  User,
  Phone,
  AlertCircle,
  ChevronRight,
  TrendingUp,
  Droplet,
  Sun,
  ShieldCheck,
  Video,
  Download,
  Share2,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LiveFarmCamera from '@/components/LiveFarmCamera';
import { useFarmStore } from '@/lib/farmStore';
import { CropStage } from '@/lib/types';

export default function CustomerDashboardPage() {
  const {
    currentUserId,
    setCurrentUser,
    customers,
    currentCustomer,
    currentFarm,
    currentPlot,
    customerCrops,
    customerDeliveries,
    customerUpdates,
    config,
  } = useFarmStore();

  const [activeTab, setActiveTab] = useState<'overview' | 'crops' | 'delivery' | 'updates' | 'camera' | 'billing'>('overview');

  const upcomingDelivery = customerDeliveries[0] || null;

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
      <Navbar />

      <main className="flex-1 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-8">
        {/* Top User Persona Switcher (For Demo & Testing) */}
        <div className="bg-[#172F1F] text-white p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 border border-[#234531]">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-wider text-[#A1D1AF]">
              Live Customer Portal Simulation
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-zinc-300">Switch Demo Account:</span>
            <select
              value={currentUserId}
              onChange={(e) => setCurrentUser(e.target.value)}
              className="bg-[#0D1B11] text-white border border-[#2D5A3C] px-3 py-1.5 rounded-lg text-xs font-semibold focus:outline-none"
            >
              {customers.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.fullName} — {c.planName} ({c.city})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Welcome Banner */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E5E0D8] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-0.5 rounded-full bg-[#E2ECE5] text-[#20412B] text-xs font-bold font-mono">
                {currentCustomer.planName.toUpperCase()}
              </span>
              <span className="text-xs text-zinc-500 font-medium">
                Active Member since {currentCustomer.subscriptionStartDate}
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#102115]">
              Good morning, {currentCustomer.fullName.split(' ')[0]}.
            </h1>
            <p className="text-xs sm:text-sm text-zinc-600">
              Your allocated farm space at{' '}
              <strong className="text-zinc-900">{currentFarm.name}</strong> is in prime vegetative
              balance today.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`https://wa.me/${config.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                `Hi ${currentCustomer.dedicatedFarmManager || 'Farm Manager'}, this is ${currentCustomer.fullName} regarding Plot ${currentPlot?.plotNumber}.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#25D366] text-white text-xs font-semibold rounded-full shadow-xs hover:bg-[#20BA5A] transition"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Contact Farm Manager</span>
            </a>

            <button
              type="button"
              onClick={() => setActiveTab('camera')}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#172F1F] text-white text-xs font-semibold rounded-full shadow-xs hover:bg-[#20412B] transition"
            >
              <Camera className="w-4 h-4 text-[#A1D1AF]" />
              <span>View Farm Cam</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#E5E0D8]">
          {[
            { id: 'overview', label: 'My Farm & Crops' },
            { id: 'delivery', label: 'Upcoming Delivery' },
            { id: 'updates', label: 'Field Notes & Media' },
            { id: 'camera', label: 'Live Farm Camera' },
            { id: 'billing', label: 'Subscription & Invoices' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-2.5 text-xs font-bold rounded-full transition whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-[#172F1F] text-white shadow-xs'
                  : 'bg-white border border-[#D8D1C5] text-zinc-700 hover:bg-[#F4EFE7]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: OVERVIEW & MY FARM */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* MY FARM METADATA CARD */}
            <div className="bg-[#102115] text-white rounded-3xl p-6 sm:p-8 border border-[#234531] shadow-xl">
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#1B3626] border border-[#2D5A3C] flex items-center justify-center text-[#A1D1AF]">
                    <Sprout className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-white">
                      {currentFarm.name}
                    </h2>
                    <p className="text-xs text-zinc-400">
                      {currentFarm.location} • {currentFarm.state}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="px-3 py-1 rounded-full bg-[#20412B] text-[#9EC9AB] text-xs font-mono font-bold">
                    {currentPlot?.plotNumber || 'Plot Allocated'}
                  </span>
                  <p className="text-[11px] text-zinc-400 mt-1">Status: Active Cultivation</p>
                </div>
              </div>

              {/* Farm Spec Matrix */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 text-xs font-mono">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[10px] text-zinc-400 block uppercase">Allocated Space</span>
                  <span className="font-bold text-sm text-white">
                    {currentPlot?.sizeSqFt.toLocaleString()} sq.ft
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[10px] text-zinc-400 block uppercase">Soil Index</span>
                  <span className="font-bold text-sm text-white">{currentPlot?.soilQualityIndex}</span>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[10px] text-zinc-400 block uppercase">Water Purity</span>
                  <span className="font-bold text-sm text-white">
                    TDS {currentFarm.waterTds} mg/L (RO Filtered)
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[10px] text-zinc-400 block uppercase">Chief Agronomist</span>
                  <span className="font-bold text-sm text-white">{currentFarm.agronomistName}</span>
                </div>
              </div>
            </div>

            {/* CROP STATUS SECTION */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#102115]">
                    Current Crops in Soil
                  </h3>
                  <p className="text-xs text-zinc-600">
                    Live growth metrics from your assigned farming beds.
                  </p>
                </div>
                <span className="text-xs font-semibold text-[#2D5A3C]">
                  {customerCrops.length} Active Crops
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {customerCrops.map((crop) => (
                  <div
                    key={crop.id}
                    className="bg-white rounded-3xl border border-[#D8D1C5] p-5 shadow-xs flex flex-col justify-between hover:shadow-md transition space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="aspect-video rounded-2xl overflow-hidden relative">
                        <img
                          src={crop.imageUrl}
                          alt={crop.name}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-[#172F1F]/90 text-[10px] font-mono text-[#A1D1AF] backdrop-blur-sm">
                          {crop.currentStage.replace('_', ' ').toUpperCase()}
                        </span>
                      </div>

                      <div>
                        <h4 className="font-serif text-lg font-bold text-[#102115]">{crop.name}</h4>
                        <p className="text-xs text-zinc-500">{crop.variety}</p>
                      </div>

                      <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#E8E2D8] text-xs space-y-1">
                        <div className="flex justify-between text-zinc-500 text-[11px]">
                          <span>Sown Date:</span>
                          <span className="font-medium text-zinc-800">{crop.sowingDate}</span>
                        </div>
                        <div className="flex justify-between text-zinc-500 text-[11px]">
                          <span>Expected Harvest:</span>
                          <span className="font-bold text-[#2D5A3C]">
                            {crop.expectedHarvestDate}
                          </span>
                        </div>
                        <div className="flex justify-between text-zinc-500 text-[11px]">
                          <span>Est. Yield:</span>
                          <span className="font-bold text-zinc-800">{crop.expectedYieldKg} kg</span>
                        </div>
                      </div>

                      {/* Progress bar */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-[11px] text-zinc-500">
                          <span>Growth Lifecycle</span>
                          <span className="font-bold text-zinc-800">{crop.progressPercent}%</span>
                        </div>
                        <div className="w-full h-2 bg-[#EAE4D9] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#2D5A3C] rounded-full transition-all"
                            style={{ width: `${crop.progressPercent}%` }}
                          />
                        </div>
                      </div>

                      <p className="text-[11px] text-zinc-600 leading-normal line-clamp-2">
                        {crop.notes}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-zinc-100 flex items-center justify-between text-[11px]">
                      <span className="text-emerald-700 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Health: Optimal
                      </span>
                      <span className="text-zinc-400">Zero Synthetic</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* UPCOMING DELIVERY TEASER */}
            {upcomingDelivery && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D8D1C5] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[11px] font-bold uppercase tracking-wider">
                      Upcoming Doorstep Dispatch
                    </span>
                    <span className="text-xs text-zinc-500">
                      Tracking Code: {upcomingDelivery.deliveryCode}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#102115]">
                    Scheduled Delivery: {upcomingDelivery.scheduledDate}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-600">
                    Est. weight: <strong>{upcomingDelivery.totalWeightKg} kg</strong> • Status:{' '}
                    <strong className="text-[#2D5A3C] uppercase">
                      {upcomingDelivery.status.replace('_', ' ')}
                    </strong>
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveTab('delivery')}
                  className="px-6 py-3 bg-[#172F1F] hover:bg-[#20412B] text-white text-xs font-semibold rounded-full transition flex items-center gap-2 self-start md:self-center"
                >
                  <Truck className="w-4 h-4" />
                  <span>Track Cold Chain Delivery</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: UPCOMING DELIVERY */}
        {activeTab === 'delivery' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {upcomingDelivery ? (
              <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#D8D1C5] shadow-sm space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-zinc-100 gap-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#628A6F]">
                      Delivery Manifest
                    </span>
                    <h3 className="font-serif text-3xl font-bold text-[#102115] mt-1">
                      Batch #{upcomingDelivery.deliveryCode}
                    </h3>
                    <p className="text-xs text-zinc-500 mt-0.5">
                      Target Date: {upcomingDelivery.scheduledDate} • Doorstep Address:{' '}
                      {currentCustomer.address}
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="px-4 py-1.5 rounded-full bg-[#E2ECE5] text-[#20412B] text-xs font-bold uppercase tracking-wider">
                      {upcomingDelivery.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>

                {/* Delivery Progress Bar */}
                <div className="p-6 bg-[#FAF8F5] rounded-2xl border border-[#E5E0D8]">
                  <p className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-4">
                    Cold-Chain Lifecycle
                  </p>
                  <div className="grid grid-cols-5 gap-2 text-center text-xs">
                    {[
                      { id: 'harvested', label: 'Harvested' },
                      { id: 'quality_checked', label: 'QC Passed' },
                      { id: 'packed', label: 'Pre-Chilled' },
                      { id: 'dispatched', label: 'Dispatched' },
                      { id: 'delivered', label: 'Delivered' },
                    ].map((step, idx) => {
                      const stages = ['harvested', 'quality_checked', 'packed', 'dispatched', 'delivered'];
                      const currentIdx = stages.indexOf(upcomingDelivery.status);
                      const isComplete = idx <= currentIdx;

                      return (
                        <div key={step.id} className="space-y-2">
                          <div
                            className={`h-2 rounded-full transition ${
                              isComplete ? 'bg-[#2D5A3C]' : 'bg-[#E5E0D8]'
                            }`}
                          />
                          <span
                            className={`block font-medium text-[11px] ${
                              isComplete ? 'text-[#172F1F] font-bold' : 'text-zinc-400'
                            }`}
                          >
                            {step.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  <p className="text-xs text-zinc-600 mt-4 italic text-center">
                    {upcomingDelivery.trackingNotes || 'Cold-chain dispatch running on schedule.'}
                  </p>
                </div>

                {/* Items in crate */}
                <div className="space-y-4">
                  <h4 className="font-serif text-xl font-bold text-[#102115]">Produce In This Box</h4>
                  <div className="divide-y divide-zinc-100 border border-[#E5E0D8] rounded-2xl overflow-hidden">
                    {upcomingDelivery.items.map((item, idx) => (
                      <div key={idx} className="p-4 bg-white flex items-center justify-between text-xs">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#E2ECE5] flex items-center justify-center text-[#20412B] font-bold">
                            {idx + 1}
                          </div>
                          <div>
                            <span className="font-bold text-sm text-zinc-900 block">
                              {item.cropName}
                            </span>
                            <span className="text-zinc-500 text-[11px]">{item.variety}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-6">
                          <span className="px-2.5 py-0.5 rounded-full bg-[#F4EFE7] text-zinc-700 font-mono font-semibold">
                            Grade: {item.qualityGrade}
                          </span>
                          <span className="font-bold text-sm text-zinc-900 font-mono">
                            {item.quantityKg} kg
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end pt-2 text-sm">
                    <span className="text-zinc-500 mr-2">Total Harvest Box Weight:</span>
                    <strong className="font-bold text-zinc-900">
                      {upcomingDelivery.totalWeightKg} kg
                    </strong>
                  </div>
                </div>

                {/* Quality certificate */}
                <div className="p-4 bg-white rounded-2xl border border-[#D8D1C5] text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-6 h-6 text-[#2D5A3C] shrink-0" />
                    <div>
                      <span className="font-bold text-zinc-900 block">
                        Multi-Stage Quality Protocol Passed
                      </span>
                      <span className="text-zinc-500 text-[11px]">
                        Inspected by {upcomingDelivery.qcInspector} • Dispatch temp:{' '}
                        {upcomingDelivery.temperatureAtDispatch}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => alert('Harvest batch certificate downloaded!')}
                    className="inline-flex items-center gap-1.5 px-4 py-2 border border-[#D8D1C5] rounded-full text-zinc-700 hover:bg-zinc-50 text-xs font-semibold"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Batch Pass</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white p-12 text-center rounded-3xl border border-[#D8D1C5]">
                <p className="text-sm text-zinc-500">No scheduled deliveries currently in transit.</p>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: FIELD NOTES & MEDIA */}
        {activeTab === 'updates' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h3 className="font-serif text-2xl font-bold text-[#102115]">
                Field Updates & Agronomy Diary
              </h3>
              <p className="text-xs text-zinc-600">
                Direct journal logs from your farm cultivators and agronomists.
              </p>
            </div>

            <div className="space-y-6">
              {customerUpdates.map((upd) => (
                <div
                  key={upd.id}
                  className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D8D1C5] shadow-xs space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-zinc-100 gap-2">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#628A6F]">
                        {upd.category.toUpperCase()} UPDATE
                      </span>
                      <h4 className="font-serif text-xl font-bold text-[#102115] mt-0.5">
                        {upd.title}
                      </h4>
                    </div>
                    <span className="text-xs font-mono text-zinc-400">{upd.date}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed">{upd.content}</p>

                  {upd.mediaUrls && upd.mediaUrls.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      {upd.mediaUrls.map((url, i) => (
                        <div key={i} className="aspect-video rounded-2xl overflow-hidden border">
                          <img src={url} alt="Field photo" className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="pt-2 flex items-center justify-between text-xs text-zinc-500">
                    <span className="font-medium text-zinc-800">
                      Logged by {upd.author} ({upd.authorRole})
                    </span>
                    <span className="text-[11px] text-[#2D5A3C] font-semibold">Verified Log</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: LIVE FARM CAMERA */}
        {activeTab === 'camera' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h3 className="font-serif text-2xl font-bold text-[#102115]">
                Plot Video Monitoring & Telemetry
              </h3>
              <p className="text-xs text-zinc-600">
                Real-time optical view into your growing bed canopy and irrigation emitters.
              </p>
            </div>

            <LiveFarmCamera
              farmName={currentFarm.name}
              plotNumber={currentPlot?.plotNumber}
              isPremium={currentCustomer.hasLiveCameraAccess}
            />
          </div>
        )}

        {/* TAB 5: BILLING & SUBSCRIPTION */}
        {activeTab === 'billing' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#D8D1C5] shadow-xs space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-zinc-100 gap-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#628A6F]">
                    Subscription Details
                  </span>
                  <h3 className="font-serif text-3xl font-bold text-[#102115] mt-1">
                    {currentCustomer.planName}
                  </h3>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    Monthly Produce Value: ₹{currentCustomer.monthlyAmount.toLocaleString()} / month
                  </p>
                </div>

                <div className="text-right">
                  <span className="px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                    {currentCustomer.subscriptionStatus}
                  </span>
                  <p className="text-[11px] text-zinc-400 mt-1">
                    Renewal Due: {currentCustomer.renewalDate}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#E8E2D8]">
                  <span className="text-[11px] text-zinc-500 block uppercase">Total Paid To Date</span>
                  <span className="font-serif text-2xl font-bold text-[#102115]">
                    ₹{currentCustomer.totalPaid.toLocaleString()}
                  </span>
                </div>

                <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#E8E2D8]">
                  <span className="text-[11px] text-zinc-500 block uppercase">Payment Mode</span>
                  <span className="font-serif text-xl font-bold text-[#102115]">
                    Razorpay Auto-Debit (Active)
                  </span>
                </div>

                <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#E8E2D8]">
                  <span className="text-[11px] text-zinc-500 block uppercase">Farm Concierge</span>
                  <span className="font-serif text-xl font-bold text-[#102115]">
                    {currentCustomer.dedicatedFarmManager || 'Agronomy Desk'}
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-100 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => alert('GST invoice downloaded for latest renewal period.')}
                  className="px-5 py-2.5 bg-white border border-[#D8D1C5] hover:bg-zinc-50 text-zinc-800 text-xs font-semibold rounded-full transition flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Latest GST Invoice</span>
                </button>

                <Link
                  href="/plans"
                  className="px-5 py-2.5 bg-[#172F1F] hover:bg-[#20412B] text-white text-xs font-semibold rounded-full transition flex items-center gap-2"
                >
                  <span>Explore Plan Upgrades</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
