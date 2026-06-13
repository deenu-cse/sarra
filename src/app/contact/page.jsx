import React from 'react';
import ContactClient from './ContactClient';
import { generatePageMeta } from "@/lib/seo.config";

export const metadata = generatePageMeta({
    title: 'Contact Us | SARRA - Spring and River Rejuvenation Authority',
    description: 'Get in touch with SARRA (Spring and River Rejuvenation Authority), Government of Uttarakhand. Contact us for queries regarding water conservation and river rejuvenation.',
    keywords: 'Contact SARRA, SARRA Uttarakhand contact, Watershed Management Directorate Dehradun, SARRA email, SARRA phone number',
    path: '/contact',
});

export default function ContactPage() {
    return <ContactClient />;
}
