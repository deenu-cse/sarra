'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Calendar, ArrowRight, Search, Newspaper } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const IMG = {
    hero: '/assets/news/newbanner.png',
};

function HeroSection() {
    return (
        <section className="relative w-full overflow-hidden" style={{ minHeight: '480px' }}>
            <img
                src={IMG.hero}
                alt="News Banner"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ zIndex: 0 }}
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(15,23,42,0.88) 0%, rgba(30,58,95,0.82) 50%, rgba(10,48,85,0.75) 100%)', zIndex: 1 }} />

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

function NewsCard({ article, formatDate, onImageClick }) {
    return (
        <Link href={`/news/${article.slug || article._id}`} className="group block h-full">
            <div className="rounded-2xl overflow-hidden bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                <div className="h-52 bg-slate-100 overflow-hidden relative">
                    {article.thumbnail ? (
                        <img
                            src={article.thumbnail}
                            alt={article.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            onClick={(e) => { e.preventDefault(); onImageClick({ src: article.thumbnail, alt: article.title }); }}
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 text-slate-300">
                            <Newspaper size={40} strokeWidth={1} />
                        </div>
                    )}
                    <div className="absolute top-3 left-3">
                        <span className="bg-[#1e3a5f] text-[10px] text-white px-2.5 py-1 rounded-full uppercase font-bold tracking-wider shadow-sm">
                            SARRA News
                        </span>
                    </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-serif font-bold text-[#1e3a5f] text-base leading-snug line-clamp-2 group-hover:text-[#f59e0b] transition-colors duration-300 mb-3">
                        {article.title}
                    </h3>
                    <div className="mt-auto flex items-center justify-between pt-3 border-t border-slate-100">
                        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                            <Calendar size={13} />
                            <span>{formatDate(article.createdAt)}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs font-bold text-[#f59e0b] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            Read <ArrowRight size={13} />
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

const NewsLayout = ({ initialArticles }) => {
    const articles = initialArticles || [];
    const [lightboxImg, setLightboxImg] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    };

    const filteredArticles = articles.filter(article =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (articles.length === 0) {
        return (
            <div className="max-w-7xl mx-auto p-4 md:p-8 bg-white text-slate-900 font-sans">
                <p className="text-center text-slate-500 py-12">No articles published yet.</p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 bg-white text-slate-900 font-sans">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-3">
                    <div className="w-1 h-8 bg-[#f59e0b] rounded-full"></div>
                    <h2 className="text-2xl font-serif font-bold text-[#1e3a5f]">All News</h2>
                    <span className="bg-[#1e3a5f] text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
                        {filteredArticles.length}
                    </span>
                </div>
                <div className="relative w-full sm:w-72">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search articles..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#f59e0b] focus:ring-1 focus:ring-[#f59e0b]/30 transition-all bg-slate-50"
                    />
                </div>
            </div>

            {/* Uniform Cards Grid */}
            {filteredArticles.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredArticles.map((article) => (
                        <NewsCard
                            key={article._id}
                            article={article}
                            formatDate={formatDate}
                            onImageClick={setLightboxImg}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16">
                    <Search size={40} className="mx-auto text-slate-300 mb-4" />
                    <p className="text-slate-500 text-lg font-medium">No articles match your search.</p>
                    <button
                        onClick={() => setSearchQuery('')}
                        className="mt-3 text-[#f59e0b] text-sm font-semibold hover:underline"
                    >
                        Clear search
                    </button>
                </div>
            )}

            {lightboxImg && <ImageLightbox src={lightboxImg.src} alt={lightboxImg.alt} onClose={() => setLightboxImg(null)} />}
        </div>
    );
};

export default function NewsPage({ initialArticles }) {
    return (
        <main className="w-full bg-white">
            <HeroSection />
            <NewsLayout initialArticles={initialArticles} />
        </main>
    );
}
