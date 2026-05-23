'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const FacebookIcon = ({ size = 24, className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
    </svg>
);

const TwitterIcon = ({ size = 24, className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
    </svg>
);

const LinkedinIcon = ({ size = 24, className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
        <rect x="2" y="9" width="4" height="12"></rect>
        <circle cx="4" cy="4" r="2"></circle>
    </svg>
);

// Image lightbox
function ImageLightbox({ src, alt, onClose }) {
    return (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-12" onClick={onClose}>
            <div className="relative max-w-5xl w-full max-h-[90vh] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
                <img src={src} alt={alt} className="max-w-full max-h-[85vh] object-contain rounded-lg" />
                <button onClick={onClose} className="absolute top-4 right-4 text-white/70 hover:text-white bg-black/40 hover:bg-black/60 p-2 rounded-full transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    );
}

const ArticlePage = ({ initialArticle, initialRelatedArticles, initialNotFound }) => {
    const article = initialArticle;
    const relatedArticles = initialRelatedArticles || [];
    const notFound = initialNotFound;
    const [lightboxImg, setLightboxImg] = useState(null);

    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }).toUpperCase();
    };

    const estimateReadTime = (article) => {
        if (!article?.sections) return '2 min read';
        const totalWords = article.sections.reduce((acc, s) => acc + (s.description || '').split(/\s+/).length, 0);
        const mins = Math.max(1, Math.ceil(totalWords / 200));
        return `${mins} min read`;
    };

    if (notFound || !article) {
        return (
            <div className="max-w-6xl mx-auto px-4 py-20 text-center">
                <h1 className="text-3xl font-bold text-slate-800 mb-4">Article Not Found</h1>
                <p className="text-slate-500 mb-8">The article you&apos;re looking for doesn&apos;t exist or may have been removed.</p>
                <Link href="/news" className="text-[#f59e0b] font-bold hover:underline">← Back to News</Link>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8 pt-8 md:pt-12 bg-white font-serif text-slate-900">
            <div className="flex flex-col lg:flex-row gap-12">
                <main className="lg:w-2/3">
                    <span className="text-[#f59e0b] text-xs font-bold uppercase tracking-widest font-sans">SARRA News</span>
                    <h1 className="text-4xl md:text-5xl font-bold mt-2 leading-tight font-sans text-[#1e3a5f]">
                        {article.title}
                    </h1>

                    <div className="flex items-center justify-between mt-6 pb-4 border-b border-gray-100 font-sans">
                        <div className="text-xs text-gray-500">
                            <span>{formatDate(article.createdAt)}</span>
                            <span className="mx-2">•</span>
                            <span>{estimateReadTime(article)}</span>
                        </div>
                        <div className="flex gap-4 text-gray-600">
                            <FacebookIcon size={18} className="cursor-pointer hover:text-[#f59e0b] transition-colors" />
                            <TwitterIcon size={18} className="cursor-pointer hover:text-[#f59e0b] transition-colors" />
                            <LinkedinIcon size={18} className="cursor-pointer hover:text-[#f59e0b] transition-colors" />
                        </div>
                    </div>

                    {/* Thumbnail */}
                    {article.thumbnail && (
                        <figure className="my-8">
                            <img
                                src={article.thumbnail}
                                alt={article.title}
                                className="w-full h-auto max-h-[400px] object-cover rounded-md cursor-pointer hover:opacity-90 transition-opacity"
                                onClick={() => setLightboxImg({ src: article.thumbnail, alt: article.title })}
                            />
                        </figure>
                    )}

                    {/* Article Sections */}
                    <div className="space-y-8 text-lg leading-relaxed text-gray-800">
                        {article.sections?.map((section, idx) => (
                            <div key={idx}>
                                {section.title && (
                                    <h2 className="text-2xl font-bold font-sans text-[#1e3a5f] mt-8 mb-4">{section.title}</h2>
                                )}
                                {section.image && (
                                    <figure className="my-6">
                                        <img
                                            src={section.image}
                                            alt={section.title || `Section ${idx + 1}`}
                                            className="w-full h-auto max-h-[400px] object-cover rounded-md cursor-pointer hover:opacity-90 transition-opacity"
                                            onClick={() => setLightboxImg({ src: section.image, alt: section.title || 'Section image' })}
                                        />
                                        {section.title && (
                                            <figcaption className="text-xs text-gray-500 mt-2 italic font-sans">
                                                {section.title} • SARRA Media
                                            </figcaption>
                                        )}
                                    </figure>
                                )}
                                {section.description && (
                                    <p className="whitespace-pre-wrap">{section.description}</p>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Extra images gallery */}
                    {article.images?.length > 0 && (
                        <div className="mt-12">
                            <h3 className="text-xl font-bold font-sans text-[#1e3a5f] mb-4">Photo Gallery</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {article.images.map((img, idx) => (
                                    <div key={idx} className="rounded-lg overflow-hidden cursor-pointer group" onClick={() => setLightboxImg({ src: img, alt: `Photo ${idx + 1}` })}>
                                        <img src={img} alt={`Photo ${idx + 1}`} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </main>

                {/* Sidebar */}
                <aside className="lg:w-1/3 space-y-12 font-sans mt-8 lg:mt-0">
                    <section>
                        <h3 className="text-sm font-bold border-b-2 border-[#1e3a5f] pb-1 mb-4 text-[#1e3a5f]">
                            Latest Articles
                        </h3>
                        <div className="space-y-4">
                            {relatedArticles.slice(0, 2).map((a) => (
                                <Link key={a._id} href={`/news/${a.slug || a._id}`} className="flex gap-3 group cursor-pointer">
                                    <img src={a.thumbnail || '/assets/news/newbanner.png'} className="w-16 h-12 object-cover bg-gray-100 rounded-sm" alt="" />
                                    <h4 className="text-xs font-bold leading-snug text-slate-800 transition-colors group-hover:text-[#f59e0b] line-clamp-2">{a.title}</h4>
                                </Link>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h3 className="text-sm font-bold border-b-2 border-[#1e3a5f] pb-1 mb-4 text-[#1e3a5f]">
                            More from SARRA
                        </h3>
                        <div className="space-y-6">
                            {relatedArticles.slice(2, 5).map((a) => (
                                <Link key={a._id} href={`/news/${a.slug || a._id}`} className="border-b border-gray-100 pb-4 last:border-0 group cursor-pointer block">
                                    <span className="text-[10px] font-bold text-[#f59e0b] uppercase tracking-tighter">SARRA News</span>
                                    <h4 className="text-sm font-bold leading-tight mt-1 text-[#1e3a5f] transition-colors group-hover:text-[#f59e0b] line-clamp-2">{a.title}</h4>
                                    <div className="text-[10px] text-gray-400 mt-2">
                                        <span>{formatDate(a.createdAt)}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                </aside>
            </div>

            {lightboxImg && <ImageLightbox src={lightboxImg.src} alt={lightboxImg.alt} onClose={() => setLightboxImg(null)} />}
        </div>
    );
};

export default ArticlePage;
