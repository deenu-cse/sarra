import React from 'react';
import AnnouncementDetail from '@/components/announcement/AnnouncementDetail';
import { generatePageMeta } from "@/lib/seo.config";
import JsonLd from "@/components/seo/JsonLd";
import { getArticleSchema, getBreadcrumbSchema } from "@/lib/schemas";
import { getMediaUrl } from "@/lib/getMediaUrl";

const API_BASE = process.env.API_INTERNAL_URL || 'http://localhost:5000/api';

export async function generateMetadata({ params }) {
    const { slug } = await params;

    try {
        const res = await fetch(`${API_BASE}/announcements/slug/${slug}`, { next: { revalidate: 60 } });
        if (!res.ok) return generatePageMeta({ title: 'Announcement Not Found | SARRA' });

        const data = await res.json();
        const imageList = data.images && data.images.length > 0 
            ? data.images.map(img => getMediaUrl(img)) 
            : (data.image ? [getMediaUrl(data.image)] : []);

        return generatePageMeta({
            title: `${data.title} | SARRA Announcements`,
            description: data.description?.substring(0, 160) + '...',
            keywords: `SARRA, announcement, ${data.title.split(' ').join(', ')}, uttarakhand`,
            path: `/announcements/${slug}`,
            openGraph: {
                type: 'article',
                images: imageList,
            },
            twitter: {
                images: imageList,
            }
        });
    } catch (error) {
        return generatePageMeta({
            title: 'Announcement | SARRA',
            description: 'Official announcements from SARRA.',
            path: `/announcements/${slug}`,
        });
    }
}

export default async function Page({ params }) {
    const { slug } = await params;
    let announcement = null;
    let error = null;

    try {
        const res = await fetch(`${API_BASE}/announcements/slug/${slug}`, { next: { revalidate: 60 } });
        if (!res.ok) {
            error = 'Announcement not found or has been removed.';
        } else {
            announcement = await res.json();
        }
    } catch (err) {
        error = 'Failed to fetch announcement.';
    }

    return (
        <>
            {announcement && (
                <JsonLd data={getArticleSchema({
                    title: announcement.title,
                    description: announcement.description?.substring(0, 160) || announcement.title,
                    url: `/announcements/${slug}`,
                    image: getMediaUrl(announcement.image || announcement.images?.[0]),
                    datePublished: announcement.date || announcement.createdAt || new Date().toISOString(),
                })} />
            )}
            <JsonLd data={getBreadcrumbSchema([{ name: "Home", url: "/" }, { name: "Announcements", url: "/announcements" }, { name: announcement?.title || "Announcement", url: `/announcements/${slug}` }])} />
            <AnnouncementDetail initialAnnouncement={announcement} initialError={error} />
        </>
    );
}
