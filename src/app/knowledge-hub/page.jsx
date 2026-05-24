import React from 'react';
import KnowledgePage from '@/components/knowledge/KnowledgePage';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const metadata = {
    title: 'Knowledge Hub | SARRA - Spring and River Rejuvenation Authority, Uttarakhand',
    description: 'Access publications, research papers, books, and guidelines on spring rejuvenation, water conservation, and river management from SARRA Uttarakhand.',
    keywords: 'SARRA publications, water conservation books, spring rejuvenation research, Uttarakhand water management, Jal Sanrakshan resources, SARRA knowledge hub, river restoration guidelines',
    openGraph: {
        title: 'Knowledge Hub - SARRA Publications & Resources',
        description: 'Comprehensive collection of books, guidelines, and research on water conservation by SARRA Uttarakhand.',
        type: 'website',
        siteName: 'SARRA - Spring and River Rejuvenation Authority',
    },
    alternates: {
        canonical: 'https://sarra.uk.gov.in/knowledge-hub',
    },
};

export default async function Page() {
    let publications = [];
    try {
        const res = await fetch(`${API_URL}/publications`, { cache: 'no-store' });
        if (res.ok) {
            const data = await res.json();
            publications = data.data || [];
        }
    } catch (err) {
        console.error('Failed to fetch publications:', err);
    }

    return (
        <KnowledgePage initialPublications={publications} />
    );
}
