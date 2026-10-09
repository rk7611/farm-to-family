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
  title: "PureVegies | Your Family's Farm. Our Natural Farming. Fresh Food at Your Door.",
  description:
    "PureVegies provides the farmland and manages cultivation using natural farming practices. Choose your preferred crops and receive naturally grown vegetables delivered to your home without owning or managing a farm.",
  keywords: [
    "Natural farming vegetables",
    "Natural farming subscription",
    "Managed farming for families",
    "Family vegetable farming service",
    "Natural farming produce delivery",
    "Farm-to-family vegetables",
    "Farming without owning land",
    "Private managed farm",
    "Natural farming services in India",
    "PureVegies natural farming",
  ],
  authors: [{ name: "PureVegies" }],
  openGraph: {
    title: "PureVegies | Naturally Grown. Thoughtfully Delivered.",
    description:
      "Your Family's Farm. Our Natural Farming. Fresh Food at Your Door. Managed farming without owning land.",
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
