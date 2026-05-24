import React from 'react';
import GalleryPage from '@/components/gallery/GalleryPage';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const metadata = {
    title: 'Gallery | SARRA',
    description: 'Visual gallery showcasing SARRA\'s water rejuvenation projects and initiatives across Uttarakhand.',
};

export default async function Page() {
    let galleryItems = [];
    try {
        const res = await fetch(`${API_URL}/gallery?type=global`, { cache: 'no-store' });
        if (res.ok) {
            const data = await res.json();
            galleryItems = data.data || [];
        }
    } catch (err) {
        console.error('Failed to fetch gallery:', err);
    }

    return (
        <GalleryPage initialGalleryItems={galleryItems} />
    );
}
