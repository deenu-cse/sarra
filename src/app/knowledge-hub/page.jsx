import React from 'react';
import KnowledgePage from '@/components/knowledge/KnowledgePage';

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

export default function Page() {
    return (
        <KnowledgePage />
    );
}
