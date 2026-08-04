import React from 'react';
import NewsPage from '@/components/news/NewsPage';
import { generatePageMeta } from "@/lib/seo.config";

export const metadata = generatePageMeta({
    title: 'News & Updates | SARRA - Spring and River Rejuvenation Authority, Uttarakhand',
    description: 'Stay updated with the latest news, announcements, and developments in spring and river rejuvenation, water conservation, and Jal Sanrakshan Abhiyan by SARRA Uttarakhand.',
    keywords: 'SARRA news, Uttarakhand water conservation, spring rejuvenation updates, Jal Sanrakshan, river restoration India, SARRA announcements, Government of Uttarakhand',
    path: '/news',
});

const API_BASE = process.env.API_INTERNAL_URL || 'http://localhost:5000/api';

export default async function Page() {
    let articles = [];
    try {
        const res = await fetch(`${API_BASE}/news`, { cache: 'no-store' });
        if (res.ok) {
            const data = await res.json();
            articles = Array.isArray(data) ? data : (data?.data || []);
        }
    } catch (err) {
        console.error('Failed to fetch news:', err);
    }

    return (
        <NewsPage initialArticles={articles} />
    );
}
