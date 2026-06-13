import React from 'react';
import OneRiverPage from '@/components/one-river/OneRiverPage';
import { generatePageMeta } from "@/lib/seo.config";
import JsonLd from "@/components/seo/JsonLd";
import { getGovernmentServiceSchema, getBreadcrumbSchema } from "@/lib/schemas";

export const metadata = generatePageMeta({
    title: 'One River One District | SARRA Uttarakhand',
    description: 'Explore the One River One District initiative by SARRA, aimed at rejuvenating at least one major river system in each of the 13 districts of Uttarakhand.',
    keywords: 'One River One District, SARRA initiative, Uttarakhand river rejuvenation, Jal Sanrakshan, district rivers Uttarakhand',
    path: '/one-river-one-district',
});

export default function Page() {
    return (
        <>
            <JsonLd data={getGovernmentServiceSchema({
                name: "One River One District Initiative",
                description: "Rejuvenating at least one major river system in each of the 13 districts of Uttarakhand.",
                url: "/one-river-one-district"
            })} />
            <JsonLd data={getBreadcrumbSchema([{ name: "Home", url: "/" }, { name: "One River One District", url: "/one-river-one-district" }])} />
            <OneRiverPage />
        </>
    );
}
