import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const sans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const serif = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Farm-to-Family | Premium Managed Farming for Families",
  description:
    "You choose what your family eats. We take care of how it is grown. Traceable, managed farming delivered to your doorstep.",
  keywords: [
    "managed farming",
    "private farm",
    "fresh vegetables subscription",
    "traceable farming",
    "farm to family",
    "family farming service",
  ],
  authors: [{ name: "Farm-to-Family" }],
  openGraph: {
    title: "Farm-to-Family | Your Family's Private Farm",
    description: "Premium managed farming for families who want to know where their food comes from.",
    type: "website",
  },
  robots: {
    index: process.env.NEXT_PUBLIC_ENABLE_INDEXING === 'true',
    follow: process.env.NEXT_PUBLIC_ENABLE_INDEXING === 'true',
    nocache: true,
    googleBot: {
      index: process.env.NEXT_PUBLIC_ENABLE_INDEXING === 'true',
      follow: process.env.NEXT_PUBLIC_ENABLE_INDEXING === 'true',
    },
  },
};

import AnalyticsTracker from "@/components/AnalyticsTracker";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${serif.variable} scroll-smooth`}
    >
      <body className="min-h-screen flex flex-col font-sans bg-[#FAF8F5] text-[#1C211D] antialiased selection:bg-[#234531] selection:text-white">
        <AnalyticsTracker />
        {children}
      </body>
    </html>
  );
}
