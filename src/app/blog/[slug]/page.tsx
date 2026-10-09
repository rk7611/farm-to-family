import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import {
  Calendar,
  Clock,
  ArrowLeft,
  ArrowRight,
  Share2,
  Sparkles,
  CheckCircle2,
  BookOpen,
  ChevronRight,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import { BLOG_POSTS, BlogPost } from '@/lib/blogData';
import ArticleClientActions from './ArticleClientActions';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: 'Article Not Found | PureVegies',
    };
  }

  const siteDomain = process.env.NEXT_PUBLIC_SITE_DOMAIN || 'purevegies.ethnicaa.com';
  const url = `https://${siteDomain}/blog/${post.slug}`;

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url,
      type: 'article',
      publishedTime: post.publishedDate,
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);
  const siteDomain = process.env.NEXT_PUBLIC_SITE_DOMAIN || 'purevegies.ethnicaa.com';

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.metaDescription,
    image: post.image,
    datePublished: post.publishedDate,
    author: {
      '@type': 'Person',
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: {
      '@type': 'Organization',
      name: 'PureVegies',
      logo: {
        '@type': 'ImageObject',
        url: `https://${siteDomain}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://${siteDomain}/blog/${post.slug}`,
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `https://${siteDomain}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Journal',
        item: `https://${siteDomain}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `https://${siteDomain}/blog/${post.slug}`,
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <Navbar />

      <main className="flex-1 py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full space-y-12">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-zinc-500">
          <Link href="/" className="hover:text-[#172F1F]">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/blog" className="hover:text-[#172F1F]">
            Journal
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-zinc-800 font-medium truncate max-w-xs">{post.category}</span>
        </nav>

        {/* Article Header */}
        <header className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E2ECE5] text-[#20412B] text-xs font-bold uppercase tracking-wider">
            <span>{post.category}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#102115] leading-tight">
            {post.title}
          </h1>

          {post.headlineSubtitle && (
            <p className="font-serif italic text-lg sm:text-xl text-zinc-600">
              {post.headlineSubtitle}
            </p>
          )}

          {/* Meta Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-[#E5E0D8] text-xs text-zinc-500">
            <div className="flex items-center gap-3">
              <div>
                <p className="font-semibold text-zinc-800">{post.author.name}</p>
                <p className="text-[11px] text-zinc-500">{post.author.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#2D5A3C]" />
                {post.publishedDate}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#2D5A3C]" />
                {post.readingTime}
              </span>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="aspect-16/9 rounded-3xl overflow-hidden shadow-md">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        </div>

        {/* Article Body */}
        <div className="prose prose-zinc prose-lg max-w-none space-y-6 font-sans text-sm sm:text-base leading-relaxed text-zinc-700">
          {post.content.map((paragraph, index) => {
            // Check if it's a short quote or list
            if (paragraph.startsWith('No meetings.')) {
              return (
                <div
                  key={index}
                  className="my-6 p-6 rounded-2xl bg-[#172F1F] text-[#A1D1AF] font-mono text-xs sm:text-sm whitespace-pre-line border border-[#234531]"
                >
                  {paragraph}
                </div>
              );
            }

            if (paragraph.startsWith('1.') || paragraph.startsWith('2.') || paragraph.startsWith('3.')) {
              return (
                <div key={index} className="p-4 rounded-xl bg-white border border-[#E8E2D8] text-sm">
                  <p className="font-medium text-zinc-800">{paragraph}</p>
                </div>
              );
            }

            return <p key={index}>{paragraph}</p>;
          })}
        </div>

        {/* Tags */}
        <div className="pt-6 border-t border-[#E5E0D8] flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-zinc-500 mr-2">Tags:</span>
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full bg-white border border-[#D8D1C5] text-[11px] font-medium text-zinc-700"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Interactive Client CTA Box */}
        <ArticleClientActions
          ctaText={post.ctaText || 'Register Your Interest in PureVegies Farm Stays'}
          ctaExperience={post.ctaExperience || 'weekend'}
        />

        {/* Related Articles */}
        <section className="pt-12 border-t border-[#E5E0D8] space-y-6">
          <h3 className="font-serif text-2xl font-bold text-[#102115]">
            Continue Reading
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((rel) => (
              <Link
                key={rel.slug}
                href={`/blog/${rel.slug}`}
                className="group bg-white rounded-2xl p-5 border border-[#D8D1C5] hover:shadow-sm transition flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold text-[#2D5A3C] uppercase tracking-wider">
                    {rel.category}
                  </span>
                  <h4 className="font-serif text-base font-bold text-[#102115] group-hover:text-[#2D5A3C] transition leading-snug">
                    {rel.title}
                  </h4>
                </div>
                <span className="text-xs font-semibold text-[#2D5A3C] flex items-center gap-1">
                  <span>Read Story</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
