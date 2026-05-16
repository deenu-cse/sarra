import React from 'react';
import ArticlePage from '@/components/news/ArticlePage';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export async function generateMetadata({ params }) {
    const { slug } = await params;

    try {
        const res = await fetch(`${API_BASE}/news/slug/${slug}`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Not found');
        const article = await res.json();

        const description = article.sections?.[0]?.description?.slice(0, 160) ||
            `Read the latest SARRA news article: ${article.title}. Water conservation and spring rejuvenation updates from Uttarakhand.`;

        return {
            title: `${article.title} | SARRA News - Spring and River Rejuvenation Authority Uttarakhand`,
            description,
            keywords: [
                'SARRA', 'Uttarakhand', 'spring rejuvenation', 'river conservation',
                'water management', 'Jal Sanrakshan', article.title,
                'Government of Uttarakhand', 'SARRA news', 'water conservation India'
            ].join(', '),
            openGraph: {
                title: article.title,
                description,
                type: 'article',
                images: article.thumbnail ? [{ url: article.thumbnail, width: 1200, height: 630, alt: article.title }] : [],
                publishedTime: article.createdAt,
                siteName: 'SARRA - Spring and River Rejuvenation Authority',
            },
            twitter: {
                card: 'summary_large_image',
                title: article.title,
                description,
                images: article.thumbnail ? [article.thumbnail] : [],
            },
            alternates: {
                canonical: `https://sarra.uk.gov.in/news/${slug}`,
            },
        };
    } catch {
        return {
            title: 'News Article | SARRA - Spring and River Rejuvenation Authority',
            description: 'Read the latest news and updates about water conservation and spring rejuvenation from SARRA Uttarakhand.',
        };
    }
}

export default async function Page({ params }) {
    return (
        <main className="min-h-screen bg-white">
            <ArticlePage />
        </main>
    );
}
