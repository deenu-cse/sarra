import React from 'react';
import NewsPage from '@/components/news/NewsPage';

export const metadata = {
    title: 'News & Updates | SARRA - Spring and River Rejuvenation Authority, Uttarakhand',
    description: 'Stay updated with the latest news, announcements, and developments in spring and river rejuvenation, water conservation, and Jal Sanrakshan Abhiyan by SARRA Uttarakhand.',
    keywords: 'SARRA news, Uttarakhand water conservation, spring rejuvenation updates, Jal Sanrakshan, river restoration India, SARRA announcements, Government of Uttarakhand',
    openGraph: {
        title: 'SARRA News - Spring and River Rejuvenation Authority',
        description: 'Latest news from SARRA Uttarakhand on water conservation, spring mapping, and river rejuvenation projects.',
        type: 'website',
        siteName: 'SARRA - Spring and River Rejuvenation Authority',
    },
    alternates: {
        canonical: 'https://sarra.uk.gov.in/news',
    },
};

export default function Page() {
    return (
        <NewsPage />
    );
}
