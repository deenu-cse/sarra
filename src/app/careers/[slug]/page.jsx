import React from 'react';
import JobDetail from '@/components/careers/JobDetail';
import { generatePageMeta } from "@/lib/seo.config";
import JsonLd from "@/components/seo/JsonLd";
import { getBreadcrumbSchema } from "@/lib/schemas";

const API_BASE = process.env.API_INTERNAL_URL || 'http://localhost:5000/api';

// Not cached: the page has to show the right status as soon as a job opens or closes
const fetchJob = (slug) => fetch(`${API_BASE}/jobs/slug/${slug}`, { cache: 'no-store' });

export async function generateMetadata({ params }) {
    const { slug } = await params;

    try {
        const res = await fetchJob(slug);
        if (!res.ok) return generatePageMeta({ title: 'Job Not Found | SARRA' });

        const data = await res.json();

        return generatePageMeta({
            title: `${data.title} | SARRA Careers`,
            description: data.description?.substring(0, 160) + '...',
            keywords: `SARRA, recruitment, careers, ${data.title.split(' ').join(', ')}, uttarakhand`,
            path: `/careers/${slug}`,
        });
    } catch {
        return generatePageMeta({
            title: 'Careers | SARRA',
            description: 'Current job openings from SARRA.',
            path: `/careers/${slug}`,
        });
    }
}

export default async function Page({ params }) {
    const { slug } = await params;
    let job = null;
    let error = null;

    try {
        const res = await fetchJob(slug);
        if (!res.ok) {
            error = 'This job was not found or has been removed.';
        } else {
            job = await res.json();
        }
    } catch {
        error = 'Failed to fetch job details.';
    }

    return (
        <>
            <JsonLd data={getBreadcrumbSchema([{ name: "Home", url: "/" }, { name: "Careers", url: "/careers" }, { name: job?.title || "Job", url: `/careers/${slug}` }])} />
            <JobDetail job={job} error={error} />
        </>
    );
}
