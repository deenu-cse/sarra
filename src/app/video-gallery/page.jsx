import React from 'react';
import VideoGalleryPage from '@/components/gallery/VideoGalleryPage';
import { generatePageMeta } from "@/lib/seo.config";

export const metadata = generatePageMeta({
    title: 'Video Gallery | SARRA',
    description: 'Watch videos documenting SARRA\'s spring and river rejuvenation projects, awareness campaigns, and community engagement in Uttarakhand.',
    keywords: 'SARRA videos, water conservation videos, Uttarakhand river rejuvenation documentary, Jal Sanrakshan videos',
    path: '/video-gallery',
});

export default function Page() {
    return (
        <VideoGalleryPage />
    );
}
