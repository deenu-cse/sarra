import React from 'react';
import ArticlePage from '@/components/news/ArticlePage';

export const metadata = {
    title: 'News Article | Spring and River Rejuvenation Authority, Uttarakhand',
    description: 'Read the full news article about the latest developments and breakthroughs in water conservation under SARRA.',
};

export default function Page({ params }) {
    // In a real application, you would fetch the article data based on params.slug here
    return (
        <main className="min-h-screen bg-white">
            <ArticlePage />
        </main>
    );
}
