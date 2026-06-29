import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/constants/header";
import NavLinks from "../components/constants/navLinks";
import Ticker from "../components/constants/ticker";
import Footer from "../components/constants/footer";
import Providers from "../components/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { DEFAULT_SEO, SITE_URL } from "@/lib/seo.config";

export const metadata: Metadata = {
  ...DEFAULT_SEO,
  metadataBase: new URL(SITE_URL),
};

import { headers } from "next/headers";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const nonce = (await headers()).get("x-nonce") || "";

  let tickerItems = [];
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
    const res = await fetch(`${API_URL}/ticker`, { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      tickerItems = Array.isArray(data) ? data : (data?.data || []);
    }
  } catch (err) {
    console.error('Failed to fetch ticker:', err);
  }

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://sarrabackend.onrender.com" crossOrigin="anonymous" />
        <meta name="geo.region" content="IN-UK" />
        <meta name="geo.placename" content="Dehradun, Uttarakhand" />
      </head>
      <body className="min-h-full flex flex-col">
        <Providers>
          <Header />
          <NavLinks />
          {/* <Ticker initialTickerItems={tickerItems} /> */}
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
