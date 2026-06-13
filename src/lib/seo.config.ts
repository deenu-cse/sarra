import type { Metadata } from 'next';

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://sarra.uk.gov.in';

export const DEFAULT_SEO: Metadata = {
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
    url: SITE_URL,
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: 'SARRA - Government of Uttarakhand'
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "SARRA - Spring and River Rejuvenation Authority",
    description: "Official portal for water conservation & river rejuvenation in Uttarakhand.",
    images: [`${SITE_URL}/opengraph-image`],
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
    canonical: SITE_URL,
    languages: {
      'en-IN': SITE_URL,
    }
  },
  verification: {
    google: "M1kbnYfB9I9CIUpVUtu0tkUUYsmk9nhlTeCf33IBGu0",
    other: {
      'msvalidate.01': '[INSERT_BING_VERIFICATION]'
    }
  },
};

export type PageSEOConfig = {
  title: string;
  description: string;
  keywords?: string;
  path?: string;
  openGraph?: any;
  twitter?: any;
  robots?: any;
};

export function generatePageMeta(config: PageSEOConfig) {
  const url = config.path ? `${SITE_URL}${config.path}` : SITE_URL;

  return {
    title: config.title,
    description: config.description,
    keywords: config.keywords || DEFAULT_SEO.keywords,
    alternates: {
      canonical: url,
      languages: {
        'en-IN': url,
      }
    },
    robots: config.robots || DEFAULT_SEO.robots,
    openGraph: {
      ...DEFAULT_SEO.openGraph,
      title: config.title,
      description: config.description,
      url,
      ...config.openGraph,
    },
    twitter: {
      ...DEFAULT_SEO.twitter,
      title: config.title,
      description: config.description,
      ...config.twitter,
    },
  };
}
