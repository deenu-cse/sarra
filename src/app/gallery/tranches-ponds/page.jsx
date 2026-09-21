import React from 'react';
import TranchesPondsGallery from '@/components/gallery/TranchesPondsGallery';
import { generatePageMeta } from "@/lib/seo.config";

const API_URL = process.env.API_INTERNAL_URL || 'http://localhost:5000/api';

export const metadata = generatePageMeta({
    title: 'Water Source Interventions Gallery | SARRA',
    description: 'Visual gallery showcasing water conservation structures, trenches, and ponds rejuvenation projects by SARRA in Uttarakhand.',
    keywords: 'SARRA tranches, water ponds Uttarakhand, spring rejuvenation, water conservation structures, Uttarakhand jal sanrakshan',
    path: '/gallery/tranches-ponds',
});

export default async function Page() {
    let galleryItems = [];
    try {
        const res = await fetch(`${API_URL}/trench-ponds?limit=100`, { cache: 'no-store' });
        if (res.ok) {
            const data = await res.json();
            galleryItems = data.data || [];
        }
    } catch (err) {
        console.error('Failed to fetch trench ponds:', err);
    }

    return (
        <TranchesPondsGallery initialImages={galleryItems} />
    );
}
