import React from 'react';
import CityGallery from '@/components/gallery/CityGallery';
import { generatePageMeta } from "@/lib/seo.config";

export async function generateMetadata({ params }) {
    const { city } = await params;
    const formattedCity = city.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    
    return generatePageMeta({
        title: `${formattedCity} Gallery | SARRA`,
        description: `Visual gallery showcasing SARRA's water rejuvenation projects and initiatives in ${formattedCity} district, Uttarakhand.`,
        keywords: `SARRA ${formattedCity}, ${formattedCity} water conservation, spring rejuvenation ${formattedCity}, Uttarakhand rivers`,
        path: `/gallery/${city}`,
    });
}

export default async function Page({ params }) {
    const { city } = await params;
    
    return (
        <CityGallery citySlug={city} />
    );
}
