import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo.config';
import { researchPartners } from '@/data/researchPartners';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const DISTRICTS = [
    'almora', 'bageshwar', 'chamoli', 'champawat', 'dehradun', 'haridwar',
    'nainital', 'pauri-garhwal', 'pithoragarh', 'tehri-garhwal', 'udham-singh-nagar', 'uttarkashi'
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        { url: SITE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
        { url: `${SITE_URL}/news`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
        { url: `${SITE_URL}/announcements`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
        { url: `${SITE_URL}/gallery`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
        { url: `${SITE_URL}/knowledge-hub`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
        { url: `${SITE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
        { url: `${SITE_URL}/video-gallery`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
        { url: `${SITE_URL}/bhagirath-app`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
        { url: `${SITE_URL}/research-partners`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
        { url: `${SITE_URL}/one-river-one-district`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
        { url: `${SITE_URL}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
        // GIGW 3.0 Compliance Pages
        { url: `${SITE_URL}/privacy-policy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.4 },
        { url: `${SITE_URL}/terms`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.4 },
        { url: `${SITE_URL}/copyright`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.4 },
        { url: `${SITE_URL}/accessibility`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.4 },
    ];

    // District gallery pages
    const districtPages: MetadataRoute.Sitemap = DISTRICTS.map((d) => ({
        url: `${SITE_URL}/gallery/${d}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.6,
    }));

    // Research partners pages
    const partnerPages: MetadataRoute.Sitemap = researchPartners.map((p) => ({
        url: `${SITE_URL}/research-partners/${p.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
    }));

    // Dynamic news pages
    let newsPages: MetadataRoute.Sitemap = [];
    try {
        const res = await fetch(`${API_BASE}/news`, { cache: 'no-store' });
        if (res.ok) {
            const data = await res.json();
            const articles = Array.isArray(data) ? data : (data?.data || []);
            newsPages = articles.map((article: any) => ({
                url: `${SITE_URL}/news/${article.slug || article._id}`,
                lastModified: new Date(article.updatedAt || article.createdAt),
                changeFrequency: 'weekly',
                priority: 0.8,
            }));
        }
    } catch (err) {
        console.error('Sitemap: Failed to fetch news for sitemap', err);
    }

    // Dynamic announcements pages
    let announcementPages: MetadataRoute.Sitemap = [];
    try {
        const res = await fetch(`${API_BASE}/announcements`, { cache: 'no-store' });
        if (res.ok) {
            const data = await res.json();
            const announcements = Array.isArray(data) ? data : (data?.data || []);
            announcementPages = announcements.map((item: any) => ({
                url: `${SITE_URL}/announcements/${item.slug || item._id}`,
                lastModified: new Date(item.date || item.createdAt),
                changeFrequency: 'weekly',
                priority: 0.8,
            }));
        }
    } catch (err) {
        console.error('Sitemap: Failed to fetch announcements for sitemap', err);
    }

    // Map all pages to include alternates (Hreflang)
    const allPages = [...staticPages, ...districtPages, ...partnerPages, ...newsPages, ...announcementPages];

    return allPages.map(page => ({
        ...page,
        alternates: {
            languages: {
                'en-IN': page.url,
            }
        }
    }));
}
