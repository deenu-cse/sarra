import React from 'react';
import CityGallery from '@/components/gallery/CityGallery';

export default async function Page({ params }) {
    const { city } = await params;
    
    return (
        <CityGallery citySlug={city} />
    );
}
