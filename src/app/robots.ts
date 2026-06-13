import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo.config';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/api/', '/admin', '/dashboard', '/login'],
            },
        ],
        sitemap: `${SITE_URL}/sitemap.xml`,
    };
}
