'use client';

import React, { useState, useEffect } from 'react';
import { ArrowRight, Download } from 'lucide-react';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const IMG = {
    hero: '/assets/books/banner.png',
    promo: '/assets/books/promo.png',
};

function HeroSection() {
    return (
        <section className="relative w-full overflow-hidden" style={{ minHeight: '480px' }}>
            <img
                src={IMG.hero}
                alt="Knowledge Hub Banner"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ zIndex: 0 }}
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(15,23,42,0.88) 0%, rgba(30,58,95,0.82) 50%, rgba(10,48,85,0.75) 100%)', zIndex: 1 }} />

            <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 py-24 md:py-32">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white mb-4 tracking-tight leading-tight"
                    style={{ textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}>
                    Knowledge <span className="text-[#f59e0b]">Hub</span>
                </h1>
                <p className="text-white/80 text-lg md:text-xl max-w-2xl mb-8 font-light leading-relaxed">
                    Explore our comprehensive collection of books, guidelines, and resources.
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

function PromoSection() {
    return (
        <section className="w-full py-6 px-6 md:px-6 flex justify-center">
            <div className="max-w-6xl w-full">
                <img src={IMG.promo} alt="Promo" className="w-full h-auto" />
            </div>
        </section>
    );
}

function BooksSection({ initialPublications = [] }) {
    const [dynamicBooks, setDynamicBooks] = useState(initialPublications);

    useEffect(() => {
        // Only fetch if no initial data provided
        if (initialPublications.length === 0) {
            const fetchPublications = async () => {
                try {
                    const res = await axios.get(`${API_URL}/publications`);
                    setDynamicBooks(res.data.data || []);
                } catch (err) {
                    console.error('Failed to fetch publications:', err);
                }
            };
            fetchPublications();
        } else {
            setDynamicBooks(initialPublications);
        }
    }, [initialPublications]);

    return (
        <section className="w-full py-6 px-6 md:px-12 pb-15">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12 text-center">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1e3a5f]">Our Publications</h2>
                    <div className="w-24 h-1 bg-[#f59e0b] mx-auto mt-4 rounded-full"></div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 sm:gap-x-8 gap-y-8 sm:gap-y-12">
                    {dynamicBooks.map((pub) => (
                        <div key={pub._id} className="flex flex-col items-end group">
                            <div className="w-full aspect-[3/4] overflow-hidden cursor-pointer rounded-sm bg-slate-100">
                                {pub.coverImage ? (
                                    <img src={pub.coverImage} alt={pub.title} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500" />
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-[#1e3a5f] to-[#0a2540] text-white p-4">
                                        <span className="text-4xl mb-3">📖</span>
                                        <p className="text-center text-sm font-serif font-bold leading-tight line-clamp-3">{pub.title}</p>
                                        {pub.author && <p className="text-center text-xs mt-2 opacity-70">{pub.author}</p>}
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col items-end gap-0.5">
                                <p className="text-xs font-medium text-slate-600 truncate max-w-full text-right">{pub.title}</p>
                                {pub.pdfUrl ? (
                                    <a
                                        href={pub.pdfUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex items-center gap-1.5 text-sm font-semibold text-[#1e3a5f] hover:text-[#f59e0b] transition-colors cursor-pointer"
                                    >
                                        <Download size={14} /> Download PDF
                                    </a>
                                ) : (
                                    <button className="flex items-center gap-1.5 text-sm font-semibold text-[#1e3a5f] hover:text-[#f59e0b] transition-colors cursor-pointer">
                                        Explore <ArrowRight size={16} />
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default function KnowledgePage({ initialPublications = [] }) {
    return (
        <main className="w-full font-sans">
            <HeroSection />
            <PromoSection />
            <BooksSection initialPublications={initialPublications} />
        </main>
    );
}
