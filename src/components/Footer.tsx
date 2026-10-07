'use client';

import React from 'react';
import Link from 'next/link';
import {
  Sprout,
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  ShieldCheck,
  HeartHandshake,
  ArrowUpRight,
} from 'lucide-react';
import { useFarmStore } from '@/lib/farmStore';

export default function Footer() {
  const { config } = useFarmStore();

  return (
    <footer className="bg-[#102115] text-[#E3EDE6] border-t border-[#1C3625]">
      {/* Upper Footer: Brand Manifesto & Trust */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#1F3D2A] flex items-center justify-center text-[#A1D1AF]">
                <Sprout className="w-7 h-7" />
              </div>
              <div>
                <span className="font-serif tracking-wider font-bold text-2xl text-white block">
                  FARM-TO-FAMILY
                </span>
                <span className="text-[10px] tracking-[0.25em] uppercase font-semibold text-[#8EB79C]">
                  Private Managed Farming
                </span>
              </div>
            </div>

            <p className="font-serif italic text-xl text-[#F2F7F4] font-light max-w-md">
              &ldquo;Your Family&rsquo;s Farm. We Grow It. You Enjoy It.&rdquo;
            </p>

            <p className="text-sm text-zinc-400 leading-relaxed max-w-md">
              Farm-to-Family is a technology-enabled managed farming service. We manage the land,
              agronomists, irrigation, cultivation, and doorstep delivery—so your family enjoys
              traceable, seasonal, and carefully grown produce without ever having to manage a farm.
            </p>

            <div className="p-4 rounded-xl bg-[#172F1F]/70 border border-[#234531] text-xs space-y-2">
              <div className="flex items-center gap-2 text-[#A1D1AF] font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>Our Trust & Integrity Commitment</span>
              </div>
              <p className="text-zinc-300 leading-normal">
                We believe in verifiable reality. We do not make untested chemical-free or organic
                claims without third-party lab verification. We provide batch-level traceability, soil
                lab reports, and open farm gates.
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-semibold tracking-wider uppercase text-[#8EB79C]">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/plans" className="text-zinc-300 hover:text-white transition">
                  Farming Plans
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-zinc-300 hover:text-white transition">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/build-your-farm" className="text-zinc-300 hover:text-white transition">
                  Build Your Farm
                </Link>
              </li>
              <li>
                <Link href="/farms" className="text-zinc-300 hover:text-white transition">
                  Our Estates & Plots
                </Link>
              </li>
              <li>
                <Link href="/produce" className="text-zinc-300 hover:text-white transition">
                  Vegetable Catalog
                </Link>
              </li>
              <li>
                <Link href="/transparency" className="text-zinc-300 hover:text-white transition">
                  Farm Transparency
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-zinc-300 hover:text-white transition">
                  About Our Team
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="text-zinc-300 hover:text-white transition">
                  Frequently Asked Questions
                </Link>
              </li>
            </ul>
          </div>

          {/* Portals & Services */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-semibold tracking-wider uppercase text-[#8EB79C]">
              Portals & Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/dashboard" className="text-zinc-300 hover:text-white transition flex items-center gap-1">
                  <span>Customer Dashboard</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-zinc-300 hover:text-white transition flex items-center gap-1">
                  <span>Farm Admin Console</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                </Link>
              </li>
              <li>
                <Link href="/farms" className="text-zinc-300 hover:text-white transition">
                  Book a Farm Visit
                </Link>
              </li>
              <li>
                <a
                  href={`https://wa.me/${config.whatsappNumber.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-300 hover:text-white transition flex items-center gap-1"
                >
                  <span>WhatsApp Farm Advisor</span>
                </a>
              </li>
              <li>
                <Link href="/social-media-kit" className="text-zinc-300 hover:text-white transition flex items-center gap-1 font-medium text-[#A1D1AF]">
                  <span>Social Media Kit (100 Posts)</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-semibold tracking-wider uppercase text-[#8EB79C]">
              Farm Concierge & Contact
            </h4>
            <ul className="space-y-3 text-sm text-zinc-300">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#A1D1AF] shrink-0 mt-1" />
                <span className="text-xs leading-relaxed text-zinc-400">
                  {config.headquartersAddress}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#A1D1AF] shrink-0" />
                <a href={`tel:${config.supportPhone}`} className="hover:text-white transition">
                  {config.supportPhone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle className="w-4 h-4 text-[#A1D1AF] shrink-0" />
                <a
                  href={`https://wa.me/${config.whatsappNumber.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition"
                >
                  WhatsApp: {config.whatsappNumber}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#A1D1AF] shrink-0" />
                <a href={`mailto:${config.supportEmail}`} className="hover:text-white transition">
                  {config.supportEmail}
                </a>
              </li>
            </ul>

            <div className="pt-2">
              <p className="text-xs text-zinc-400">Visiting Hours for Subscribed Families:</p>
              <p className="text-xs text-white font-medium">Saturday & Sunday: 7:00 AM – 4:00 PM (Prior Slot Required)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal & Copyright Bar */}
      <div className="border-t border-[#1C3625] bg-[#0A160E] py-6 text-xs text-zinc-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            © 2026 Farm-to-Family Agro Labs Pvt. Ltd. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/privacy" className="hover:text-zinc-200 transition">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-zinc-200 transition">
              Terms of Service
            </Link>
            <span>•</span>
            <Link href="/refund-policy" className="hover:text-zinc-200 transition">
              Subscription & Quality Policy
            </Link>
            <span>•</span>
            <span className="text-zinc-500">Soil, Water & Agronomy Audit: Regular Cycle 2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
