import React from 'react';
import AnnouncementDetail from '@/components/announcement/AnnouncementDetail';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export async function generateMetadata({ params }) {
    const { slug } = await params;
    
    try {
        const res = await fetch(`${API_BASE}/announcements/slug/${slug}`, { next: { revalidate: 60 } });
        if (!res.ok) return { title: 'Announcement Not Found - SARRA' };
        
        const data = await res.json();
        
        return {
            title: `${data.title} | SARRA Announcements`,
            description: data.description?.substring(0, 160) + '...',
            keywords: `SARRA, announcement, ${data.title.split(' ').join(', ')}, uttarakhand`,
            openGraph: {
                title: data.title,
                description: data.description?.substring(0, 160) + '...',
                images: data.image ? [data.image] : [],
                type: 'article',
            },
            twitter: {
                card: 'summary_large_image',
                title: data.title,
                description: data.description?.substring(0, 160) + '...',
                images: data.image ? [data.image] : [],
            }
        };
    } catch (error) {
        return {
            title: 'Announcement - SARRA',
            description: 'Official announcements from SARRA.',
        };
    }
}

export default function Page() {
    return <AnnouncementDetail />;
}
