export default function robots() {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/login', '/api/'],
            },
        ],
        sitemap: 'https://sarra.uk.gov.in/sitemap.xml',
    };
}
