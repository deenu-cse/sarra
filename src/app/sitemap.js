const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const DISTRICTS = [
    'almora', 'bageshwar', 'chamoli', 'champawat', 'dehradun', 'haridwar',
    'nainital', 'pauri-garhwal', 'pithoragarh', 'tehri-garhwal', 'udham-singh-nagar', 'uttarkashi'
];

export default async function sitemap() {
    const baseUrl = 'https://sarra.uk.gov.in';

    // Static pages
    const staticPages = [
        { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
        { url: `${baseUrl}/news`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
        { url: `${baseUrl}/gallery`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
        { url: `${baseUrl}/knowledge-hub`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
        { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
        { url: `${baseUrl}/video-gallery`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
        { url: `${baseUrl}/bhagirath-app`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
        { url: `${baseUrl}/research-partners`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
        { url: `${baseUrl}/one-river-one-district`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    ];

    // District gallery pages
    const districtPages = DISTRICTS.map((d) => ({
        url: `${baseUrl}/gallery/${d}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.6,
    }));

    // Dynamic news pages
    let newsPages = [];
    try {
        const res = await fetch(`${API_BASE}/news`, { cache: 'no-store' });
        if (res.ok) {
            const articles = await res.json();
            newsPages = articles.map((article) => ({
                url: `${baseUrl}/news/${article.slug || article._id}`,
                lastModified: new Date(article.updatedAt || article.createdAt),
                changeFrequency: 'weekly',
                priority: 0.8,
            }));
        }
    } catch (err) {
        console.error('Sitemap: Failed to fetch news for sitemap', err);
    }

    return [...staticPages, ...districtPages, ...newsPages];
}
