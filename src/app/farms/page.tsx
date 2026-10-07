'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  MapPin,
  Calendar,
  Layers,
  Droplet,
  Compass,
  User,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import LeadModal from '@/components/LeadModal';
import { useFarmStore } from '@/lib/farmStore';

export default function FarmsPage() {
  const { farms } = useFarmStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedFarmId, setSelectedFarmId] = useState('farm-anekal');

  const handleBookVisit = (farmId: string) => {
    setSelectedFarmId(farmId);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
      <Navbar />

      <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#628A6F]">
            Participating Agro-Estates
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[#102115]">
            Our Participating Farms
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 leading-relaxed">
            Every Farm-to-Family parcel is located in ecologically isolated rural belts with verified
            unpolluted aquifers, rich topsoil, and responsible cultivation protocols.
          </p>
        </div>

        {/* Farm Cards Grid */}
        <div className="space-y-12">
          {farms.map((farm, idx) => (
            <div
              key={farm.id}
              className="bg-white rounded-3xl overflow-hidden border border-[#D8D1C5] shadow-sm hover:shadow-md transition grid grid-cols-1 lg:grid-cols-12 gap-0"
            >
              {/* Image Carousel / Hero */}
              <div className="lg:col-span-5 relative aspect-video lg:aspect-auto">
                <img
                  src={farm.images[0]}
                  alt={farm.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#172F1F]/90 text-[#A1D1AF] text-xs font-mono font-bold backdrop-blur-sm">
                    {farm.code}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/90 text-zinc-800 text-xs font-semibold backdrop-blur-sm">
                    Est. {farm.establishedYear}
                  </span>
                </div>
              </div>

              {/* Farm Details */}
              <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#2D5A3C]">
                      <MapPin className="w-4 h-4" />
                      <span>
                        {farm.location}, {farm.state}
                      </span>
                    </div>
                    <h3 className="font-serif text-3xl font-bold text-[#102115] mt-1">
                      {farm.name}
                    </h3>
                    <p className="text-xs text-zinc-500 mt-1">{farm.climateZone}</p>
                  </div>

                  {/* Scientific Data Matrix */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                    <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E8E2D8]">
                      <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">
                        Estate Acreage
                      </span>
                      <strong className="text-sm text-zinc-900 block mt-0.5">
                        {farm.totalAreaAcres} Acres Total
                      </strong>
                      <span className="text-[11px] text-emerald-700 font-medium">
                        {farm.availableAreaAcres} Acres available
                      </span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E8E2D8]">
                      <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">
                        Soil Biology & pH
                      </span>
                      <strong className="text-sm text-zinc-900 block mt-0.5">pH {farm.soilPh}</strong>
                      <span className="text-[11px] text-zinc-600 truncate block">
                        {farm.soilType}
                      </span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E8E2D8] col-span-2 sm:col-span-1">
                      <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">
                        Water Aquifer TDS
                      </span>
                      <strong className="text-sm text-zinc-900 block mt-0.5">
                        {farm.waterTds} mg/L
                      </strong>
                      <span className="text-[11px] text-zinc-600 truncate block">
                        Deep Borewell + Lake
                      </span>
                    </div>
                  </div>

                  <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#E8E2D8] flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#172F1F] text-[#A1D1AF] flex items-center justify-center font-bold">
                        <User className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="font-bold text-zinc-900 block">{farm.agronomistName}</span>
                        <span className="text-zinc-500 text-[11px]">
                          Resident Lead Agronomist • {farm.agronomistContact}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs text-zinc-500">
                    <ShieldCheck className="w-4 h-4 text-[#2D5A3C]" />
                    <span>Open weekend visiting slots available</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleBookVisit(farm.id)}
                    className="w-full sm:w-auto px-6 py-3 bg-[#172F1F] hover:bg-[#20412B] text-white text-xs font-semibold uppercase tracking-wider rounded-full transition shadow-xs flex items-center justify-center gap-2"
                  >
                    <span>Book a Visit to This Farm</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
      <WhatsAppFloat />
      <LeadModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        isVisitBooking={true}
        defaultTitle="Schedule an Estate Visit"
      />
    </div>
  );
}
