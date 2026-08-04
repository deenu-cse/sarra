import React from 'react';
import KnowledgePage from '@/components/knowledge/KnowledgePage';
import { generatePageMeta } from "@/lib/seo.config";

const API_URL = process.env.API_INTERNAL_URL || 'http://localhost:5000/api';

export const metadata = generatePageMeta({
    title: 'Knowledge Hub | SARRA - Spring and River Rejuvenation Authority, Uttarakhand',
    description: 'Access publications, research papers, books, and guidelines on spring rejuvenation, water conservation, and river management from SARRA Uttarakhand.',
    keywords: 'SARRA publications, water conservation books, spring rejuvenation research, Uttarakhand water management, Jal Sanrakshan resources, SARRA knowledge hub, river restoration guidelines',
    path: '/knowledge-hub',
});

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
