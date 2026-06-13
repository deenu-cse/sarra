import React from 'react';
import BhagirathPage from '@/components/bhagirath/BhagirathPage';
import { generatePageMeta } from "@/lib/seo.config";
import JsonLd from "@/components/seo/JsonLd";
import { getGovernmentServiceSchema, getBreadcrumbSchema } from "@/lib/schemas";

export const metadata = generatePageMeta({
    title: 'Bhagirath App | SARRA Uttarakhand',
    description: 'The Bhagirath App is the official spring mapping and monitoring application by SARRA, Government of Uttarakhand. Empowering citizens and officials to document water sources.',
    keywords: 'Bhagirath App, spring mapping app, SARRA app, Uttarakhand water monitoring, naula mapping, dhara mapping',
    path: '/bhagirath-app',
});

export default function Page() {
    return (
        <>
            <JsonLd data={getGovernmentServiceSchema({
                name: "Bhagirath App - Spring Mapping",
                description: "Official spring mapping and monitoring application by SARRA to document water sources across Uttarakhand.",
                url: "/bhagirath-app"
            })} />
            <JsonLd data={getBreadcrumbSchema([{ name: "Home", url: "/" }, { name: "Bhagirath App", url: "/bhagirath-app" }])} />
            <BhagirathPage />
        </>
    );
}
