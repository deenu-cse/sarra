import AboutPage from '@/components/about/AboutPage';
import { generatePageMeta } from "@/lib/seo.config";
import JsonLd from "@/components/seo/JsonLd";
import { getBreadcrumbSchema } from "@/lib/schemas";

export const metadata = generatePageMeta({
    title: 'About SARRA | Spring and River Rejuvenation Authority, Uttarakhand',
    description: 'Learn about SARRA – the Spring and River Rejuvenation Authority under the Watershed Management Directorate, Government of Uttarakhand. Protecting and reviving rivers, springs, and watersheds across 13 districts.',
    keywords: 'About SARRA, Watershed Management Directorate, Government of Uttarakhand, spring rejuvenation, river conservation, Jal Sanrakshan Abhiyan, Uttarakhand water resources',
    path: '/about',
});

export default function About() {
    return (
        <>
            <JsonLd data={getBreadcrumbSchema([{ name: "Home", url: "/" }, { name: "About", url: "/about" }])} />
            <AboutPage />
        </>
    );
}
