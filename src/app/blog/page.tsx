'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Search,
  Sparkles,
  ArrowRight,
  Clock,
  Tag,
  ChevronRight,
  Calendar,
  Compass,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import FarmStayInterestModal from '@/components/FarmStayInterestModal';
import { BLOG_POSTS, BlogPost } from '@/lib/blogData';

export default function BlogIndexPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const categories = [
    { id: 'all', label: 'All Articles' },
    { id: 'Retirement & Freedom', label: 'Retirement & Freedom' },
    { id: 'Weekend Getaways', label: 'Weekend Getaways' },
    { id: 'Family Vacations', label: 'Family Vacations' },
    { id: 'Couples & Anniversaries', label: 'Couples & Anniversaries' },
    { id: 'Slow Living & Agro-Tourism', label: 'Slow Living & Natural Farming' },
  ];

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCat =
      selectedCategory === 'all' || post.category === selectedCategory;
    const matchesQuery =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesQuery;
  });

  const featuredPost = BLOG_POSTS[0]; // Retirement Honeymoon Post

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
      <Navbar />

      <main className="flex-1 space-y-16 py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E2ECE5] text-[#20412B] text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>The PureVegies Journal</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[#102115]">
            Stories of Soil, Slow Living & Meaningful Travel
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 leading-relaxed">
            Inspiration and practical insights for weekend countryside getaways, family farm
            vacations, milestone retirement escapes, and living close to nature.
          </p>
        </div>

        {/* Featured Story Hero */}
        <div className="bg-white rounded-3xl overflow-hidden border border-[#D8D1C5] shadow-sm grid grid-cols-1 lg:grid-cols-12 items-center">
          <div className="lg:col-span-7 h-full min-h-[360px] aspect-16/10 lg:aspect-auto">
            <img
              src={featuredPost.image}
              alt={featuredPost.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="lg:col-span-5 p-8 sm:p-12 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#172F1F] text-[#A1D1AF] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#C48248]" />
              <span>Featured Story • Priority Campaign</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#102115] leading-snug">
              <Link href={`/blog/${featuredPost.slug}`} className="hover:text-[#2D5A3C] transition">
                {featuredPost.title}
              </Link>
            </h2>

            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
              {featuredPost.excerpt}
            </p>

            <div className="pt-2 flex items-center justify-between text-xs text-zinc-500 border-t border-zinc-100">
              <span>By {featuredPost.author.name}</span>
              <span>{featuredPost.readingTime}</span>
            </div>

            <div>
              <Link
                href={`/blog/${featuredPost.slug}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#172F1F] hover:bg-[#20412B] text-white text-xs font-semibold uppercase tracking-wider transition shadow-sm"
              >
                <span>Read Full Article</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="space-y-4 pt-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Category Pills */}
            <div className="flex items-center gap-2 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition ${
                    selectedCategory === cat.id
                      ? 'bg-[#172F1F] text-white shadow-xs'
                      : 'bg-white border border-[#D8D1C5] text-zinc-700 hover:bg-[#F4EFE7]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-9 pr-4 py-2 rounded-full border border-[#D8D1C5] bg-white text-xs focus:outline-hidden focus:border-[#172F1F]"
              />
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.slug}
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
                  <div className="flex items-center justify-between text-[10px] text-zinc-400 font-mono">
                    <span>{post.publishedDate}</span>
                    <span>{post.readingTime}</span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-[#102115] group-hover:text-[#2D5A3C] transition leading-snug">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>

                  <p className="text-xs text-zinc-600 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-zinc-100 flex items-center justify-between">
                  <span className="text-[11px] text-zinc-400">By {post.author.name}</span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#2D5A3C] group-hover:underline"
                  >
                    <span>Read</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-[#D8D1C5] space-y-3">
            <BookOpen className="w-8 h-8 text-zinc-400 mx-auto" />
            <h4 className="font-serif text-lg font-bold text-[#102115]">No matching articles found</h4>
            <p className="text-xs text-zinc-500">
              Try adjusting your search query or selecting a different category.
            </p>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="bg-[#172F1F] text-white rounded-3xl p-8 sm:p-12 border border-[#234531] shadow-xl text-center space-y-6">
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#A1D1AF]">
              Experience It In Person
            </span>
            <h3 className="font-serif text-3xl font-bold text-white">
              Looking for a Weekend Getaway or Retirement Escape?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              PureVegies Farm Stays are being developed to bring nature, living soil, and peaceful
              hospitality together. Register your interest for priority preview stays.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="px-8 py-3.5 rounded-full bg-[#C48248] hover:bg-[#b0733d] text-white text-xs font-semibold uppercase tracking-wider transition shadow-md"
            >
              Register Your Interest
            </button>
            <Link
              href="/farm-stays"
              className="px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold uppercase tracking-wider transition"
            >
              Explore Farm Stays
            </Link>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppFloat />

      <FarmStayInterestModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
