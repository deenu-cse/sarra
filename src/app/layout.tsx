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

export const metadata: Metadata = {
  title: {
    default: "SARRA - Spring and River Rejuvenation Authority, Government of Uttarakhand",
    template: "%s | SARRA Uttarakhand",
  },
  description: "Official website of the Spring and River Rejuvenation Authority (SARRA), Government of Uttarakhand. Dedicated to water conservation, spring restoration, and river rejuvenation across the Himalayan state through Jal Sanrakshan Abhiyan.",
  keywords: "SARRA, Spring Rejuvenation, River Rejuvenation Authority, Uttarakhand, water conservation, Jal Sanrakshan Abhiyan, Government of Uttarakhand, spring mapping, naula restoration, Bhagirath App, Dhara restoration, Himalayan water sources",
  authors: [{ name: "SARRA - Government of Uttarakhand" }],
  creator: "Spring and River Rejuvenation Authority",
  publisher: "Government of Uttarakhand",
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "SARRA - Spring and River Rejuvenation Authority",
    title: "SARRA - Spring and River Rejuvenation Authority, Uttarakhand",
    description: "Official portal for water conservation, spring restoration, and river rejuvenation initiatives by SARRA Uttarakhand.",
  },
  twitter: {
    card: "summary_large_image",
    title: "SARRA - Spring and River Rejuvenation Authority",
    description: "Official portal for water conservation & river rejuvenation in Uttarakhand.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://sarra.uk.gov.in",
  },
  verification: {
    google: "M1kbnYfB9I9CIUpVUtu0tkUUYsmk9nhlTeCf33IBGu0",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
