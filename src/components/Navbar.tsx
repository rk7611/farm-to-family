'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sprout,
  Menu,
  X,
  Phone,
  MessageCircle,
  User,
  ShieldCheck,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';
import { useFarmStore } from '@/lib/farmStore';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { config, currentCustomer } = useFarmStore();

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'Our Business Model', href: '/business-model' },
    { label: 'Plans', href: '/plans' },
    { label: 'Build Your Farm', href: '/build-your-farm' },
    { label: 'Our Farms', href: '/farms' },
    { label: 'Produce', href: '/produce' },
    { label: 'Farm Transparency', href: '/transparency' },
    { label: 'About', href: '/about' },
    { label: 'FAQs', href: '/faqs' },
    { label: 'Media Kit (100 Posts)', href: '/social-media-kit' },
  ];

  return (
    <>
      {/* Top Trust & Announcement Bar */}
      <div className="bg-[#102115] text-[#E3EDE6] text-xs py-2 px-4 border-b border-[#20412b]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#20412b] text-[#9EC9AB] text-[11px] font-bold tracking-wide">
              <ShieldCheck className="w-3.5 h-3.5 text-[#9EC9AB]" />
              NO LAND REQUIRED
            </span>
            <span className="text-zinc-300">
              Your Family’s Farm. Our Natural Farming. Fresh Food at Your Door.
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-zinc-300">
            <a
              href={`https://wa.me/${config.whatsappNumber.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#9EC9AB] hover:text-white transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              WhatsApp: {config.whatsappNumber}
            </a>
            <span className="hidden md:inline text-zinc-600">|</span>
            <Link
              href="/admin"
              className="hidden md:inline hover:text-white transition-colors text-zinc-400"
            >
              Operations Admin
            </Link>
          </div>
        </div>
      </div>

      {/* Main Luxury Header */}
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#E5E0D8] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-full bg-[#172F1F] flex items-center justify-center text-[#E3EDE6] shadow-sm transition-transform group-hover:scale-105">
                <Sprout className="w-6 h-6 text-[#A1D1AF]" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif tracking-wider font-bold text-xl text-[#102115] leading-none">
                  PUREVEGIES
                </span>
                <span className="text-[10px] tracking-[0.12em] uppercase font-semibold text-[#628A6F] mt-1">
                  Naturally Grown • Thoughtfully Delivered
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center gap-6">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-sm font-medium transition-colors relative py-1 ${
                      isActive
                        ? 'text-[#172F1F] font-semibold'
                        : 'text-[#424D45] hover:text-[#172F1F]'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2D5A3C] rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right CTAs */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#172F1F] bg-white border border-[#D8D1C5] rounded-full hover:bg-[#F4EFE7] transition shadow-xs"
              >
                <User className="w-3.5 h-3.5 text-[#2D5A3C]" />
                <span>{currentCustomer?.fullName ? currentCustomer.fullName.split(' ')[0] : 'Portal'}</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse ml-0.5" />
              </Link>

              <Link
                href="/build-your-farm"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#172F1F] hover:bg-[#20412B] rounded-full transition shadow-sm group"
              >
                <span>Build My Farm Plan</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 xl:hidden">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-[#172F1F] bg-white border border-[#D8D1C5] rounded-full"
              >
                <User className="w-3.5 h-3.5 text-[#2D5A3C]" />
                <span>Dashboard</span>
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-[#172F1F] hover:bg-[#EAE4D9] rounded-lg transition"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Flyout Menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-[#FAF8F5] border-b border-[#D8D1C5] px-4 pt-4 pb-6 shadow-xl animate-in fade-in slide-in-from-top duration-200">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 text-sm rounded-lg flex items-center justify-between ${
                    pathname === link.href
                      ? 'bg-[#172F1F] text-white font-medium'
                      : 'text-[#202521] hover:bg-[#EAE4D9]'
                  }`}
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 opacity-50" />
                </Link>
              ))}

              <div className="pt-4 border-t border-[#E5E0D8] flex flex-col gap-2">
                <Link
                  href="/build-your-farm"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-3 bg-[#172F1F] text-white text-sm font-semibold rounded-full shadow-sm"
                >
                  Build My Farm Plan
                </Link>
                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 bg-white border border-[#D8D1C5] text-xs font-medium text-[#424D45] rounded-full"
                >
                  Operations Admin Console
                </Link>
                <a
                  href={`https://wa.me/${config.whatsappNumber.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 py-2 text-xs font-medium text-[#2D5A3C]"
                >
                  <MessageCircle className="w-4 h-4" />
                  Chat on WhatsApp: {config.whatsappNumber}
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
