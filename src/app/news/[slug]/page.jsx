import React from 'react';
import ArticlePage from '@/components/news/ArticlePage';
import { generatePageMeta } from "@/lib/seo.config";
import JsonLd from "@/components/seo/JsonLd";
import { getArticleSchema, getBreadcrumbSchema } from "@/lib/schemas";

const API_BASE = process.env.API_INTERNAL_URL || 'http://localhost:5000/api';

export async function generateMetadata({ params }) {
    const { slug } = await params;

    try {
        const res = await fetch(`${API_BASE}/news/slug/${slug}`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Not found');
        const article = await res.json();

        const description = article.sections?.[0]?.description?.slice(0, 160) ||
            `Read the latest SARRA news article: ${article.title}. Water conservation and spring rejuvenation updates from Uttarakhand.`;

        return generatePageMeta({
            title: `${article.title} | SARRA News`,
            description,
            keywords: [
                'SARRA', 'Uttarakhand', 'spring rejuvenation', 'river conservation',
                'water management', 'Jal Sanrakshan', article.title,
                'Government of Uttarakhand', 'SARRA news', 'water conservation India'
            ].join(', '),
            path: `/news/${slug}`,
            openGraph: {
                type: 'article',
                images: article.thumbnail ? [{ url: article.thumbnail, width: 1200, height: 630, alt: article.title }] : [],
                publishedTime: article.createdAt,
            },
            twitter: {
                images: article.thumbnail ? [article.thumbnail] : [],
            }
        });
    } catch {
        return generatePageMeta({
            title: 'News Article | SARRA',
            description: 'Read the latest news and updates about water conservation and spring rejuvenation from SARRA Uttarakhand.',
            path: `/news/${slug}`,
        });
    }
}

export default async function NewsArticle({ params }) {
    const { slug } = await params;
    let article = null;
    let relatedArticles = [];
    let notFound = false;

    try {
        const res = await fetch(`${API_BASE}/news/slug/${slug}`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Not found');
        const data = await res.json();
        article = data?.data ? data.data : data;
    } catch {
        notFound = true;
    }

    try {
        const res = await fetch(`${API_BASE}/news`, { cache: 'no-store' });
        if (res.ok) {
            const allNewsData = await res.json();
            const allNews = Array.isArray(allNewsData) ? allNewsData : (allNewsData?.data || []);
            relatedArticles = allNews.filter(a => a.slug !== slug).slice(0, 5);
        }
    } catch (err) {
        console.error('Failed to fetch related:', err);
    }

    return (
        <main className="min-h-screen bg-white">
            {article && (
                <JsonLd data={getArticleSchema({
                    title: article.title,
                    description: article.sections?.[0]?.description?.slice(0, 160) || article.title,
                    url: `/news/${slug}`,
                    image: article.thumbnail,
                    datePublished: article.createdAt || new Date().toISOString(),
                })} />
            )}
            <JsonLd data={getBreadcrumbSchema([{ name: "Home", url: "/" }, { name: "News", url: "/news" }, { name: article?.title || "Article", url: `/news/${slug}` }])} />
            <ArticlePage
                initialArticle={article}
                initialRelatedArticles={relatedArticles}
                initialNotFound={notFound}
            />
        </main>
    );
}
