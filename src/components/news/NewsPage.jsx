'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const IMG = {
    hero: '/assets/news/newbanner.png',
};

function HeroSection() {
    return (
        <section className="relative w-full overflow-hidden" style={{ minHeight: '400px' }}>
            <img
                src={IMG.hero}
                alt="News Banner"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ zIndex: 0 }}
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(15,23,42,0.88) 0%, rgba(30,58,95,0.82) 50%, rgba(10,48,85,0.75) 100%)', zIndex: 1 }} />
            <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5c8 0 15 12 15 25s-7 25-15 25S15 43 15 30 22 5 30 5z' fill='white' fill-opacity='0.4'/%3E%3C/svg%3E")`, backgroundSize: '80px 80px', zIndex: 2 }} />

            <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 py-24 md:py-32 h-full">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white mb-4 tracking-tight leading-tight"
                    style={{ textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}>
                    SARRA <span className="text-[#f59e0b]">News</span>
                </h1>
                <p className="text-white/80 text-lg md:text-xl max-w-2xl mb-8 font-light leading-relaxed">
                    Stay updated with the latest news, announcements, and developments for Jal Sanrakshan.
                </p>
            </div>

            <div className="absolute bottom-0 left-0 right-0 z-10">
                <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
                    <path d="M0 60V30C240 0 480 0 720 30C960 60 1200 60 1440 30V60H0Z" fill="white" />
                </svg>
            </div>
        </section>
    );
}

// Image lightbox component
function ImageLightbox({ src, alt, onClose }) {
    return (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-12" onClick={onClose}>
            <div className="relative max-w-5xl w-full max-h-[90vh] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
                <img src={src} alt={alt} className="max-w-full max-h-[85vh] object-contain rounded-lg" />
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white/70 hover:text-white bg-black/40 hover:bg-black/60 p-2 rounded-full transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    );
}

const NewsLayout = () => {
    const [articles, setArticles] = useState([]);
    const [lightboxImg, setLightboxImg] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const res = await axios.get(`${API_URL}/news`);
                setArticles(res.data);
            } catch (err) {
                console.error('Failed to fetch news:', err);
            }
        };
        fetchNews();
    }, []);

    if (articles.length === 0) {
        return (
            <div className="max-w-7xl mx-auto p-4 md:p-8 bg-white text-slate-900 font-sans">
                <p className="text-center text-slate-500 py-12">No articles published yet.</p>
            </div>
        );
    }

    const featured = articles[0];
    const secondary = articles.slice(1, 3);
    const third = articles[3];
    const remaining = articles.slice(4);

    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    };

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-8 bg-white text-slate-900 font-sans">
            {/* Top Feature Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
                {/* Featured Article */}
                <Link href={`/news/${featured.slug || featured._id}`} className="md:col-span-2 relative group overflow-hidden rounded-lg h-[450px] block">
                    <img
                        src={featured.thumbnail || 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800'}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        alt={featured.title}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 p-6 text-white">
                        <div className="flex gap-2 mb-3">
                            <span className="bg-[#1e3a5f] text-[10px] px-2 py-0.5 rounded uppercase font-bold tracking-wider">SARRA News</span>
                            <span className="bg-[#f59e0b] text-[10px] px-2 py-0.5 rounded uppercase font-bold text-slate-900 tracking-wider">Latest</span>
                        </div>
                        <h2 className="text-2xl font-serif font-bold leading-tight mb-3">
                            {featured.title}
                        </h2>
                        <div className="flex items-center gap-2 text-xs opacity-80 font-medium">
                            <span>By SARRA Media</span>
                            <span>•</span>
                            <span>{formatDate(featured.createdAt)}</span>
                        </div>
                    </div>
                </Link>

                {/* Right Stack */}
                <div className="md:col-span-2 grid grid-rows-2 gap-4">
                    <div className="grid grid-cols-2 gap-4">
                        {secondary.map((article, idx) => (
                            <Link key={article._id} href={`/news/${article.slug || article._id}`} className="relative group overflow-hidden rounded-lg h-full min-h-[200px] block">
                                <img src={article.thumbnail || `https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=400`} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt={article.title} />
                                <div className="absolute inset-0 bg-black/40 transition-colors group-hover:bg-black/50" />
                                <div className="absolute bottom-0 p-3 text-white">
                                    <span className="bg-[#1e3a5f] text-[9px] px-2 py-0.5 rounded mb-2 inline-block tracking-wider uppercase font-semibold">Article</span>
                                    <h3 className="text-sm font-serif font-bold leading-snug line-clamp-2">{article.title}</h3>
                                </div>
                            </Link>
                        ))}
                        {secondary.length < 2 && Array.from({ length: 2 - secondary.length }).map((_, i) => (
                            <div key={`placeholder-${i}`} className="bg-slate-100 rounded-lg min-h-[200px]" />
                        ))}
                    </div>
                    {third ? (
                        <Link href={`/news/${third.slug || third._id}`} className="relative group overflow-hidden rounded-lg block">
                            <img
                                src={third.thumbnail || 'https://images.unsplash.com/photo-1543872084-c7bd3822856f?auto=format&fit=crop&q=80&w=800'}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                alt={third.title}
                            />
                            <div className="absolute inset-0 bg-black/50" />
                            <div className="absolute bottom-0 p-4 text-white">
                                <h3 className="text-lg font-serif font-bold text-white">{third.title}</h3>
                            </div>
                        </Link>
                    ) : (
                        <div className="bg-slate-100 rounded-lg" />
                    )}
                </div>
            </div>

            {/* All Articles Grid */}
            {remaining.length > 0 && (
                <div>
                    <div className="flex items-center justify-between border-b border-gray-200 pb-2 mb-6">
                        <h2 className="text-xl font-serif font-bold border-l-4 border-[#f59e0b] pl-3 text-[#1e3a5f]">All Articles</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {remaining.map((article) => (
                            <Link key={article._id} href={`/news/${article.slug || article._id}`} className="group block">
                                <div className="rounded-lg overflow-hidden shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                                    <div className="h-48 bg-slate-100 overflow-hidden">
                                        {article.thumbnail ? (
                                            <img
                                                src={article.thumbnail}
                                                alt={article.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                onClick={(e) => { e.preventDefault(); setLightboxImg({ src: article.thumbnail, alt: article.title }); }}
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-slate-300">
                                                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-4">
                                        <span className="text-[10px] font-bold text-[#f59e0b] uppercase tracking-wider">SARRA News</span>
                                        <h3 className="font-serif font-bold text-slate-800 mt-1 leading-tight line-clamp-2 group-hover:text-[#f59e0b] transition-colors">{article.title}</h3>
                                        <p className="text-xs text-slate-500 mt-2">{formatDate(article.createdAt)}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {lightboxImg && <ImageLightbox src={lightboxImg.src} alt={lightboxImg.alt} onClose={() => setLightboxImg(null)} />}
        </div>
    );
};

export default function NewsPage() {
    return (
        <main className="w-full bg-white">
            <HeroSection />
            <NewsLayout />
        </main>
    );
}
