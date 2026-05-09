'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';

const IMG = {
    hero: '/assets/books/banner.png',
    promo: '/assets/books/promo.png',
};

const BOOKS = [
    '/assets/books/T0.jpg',
    '/assets/books/T1.jpg',
    '/assets/books/T2.jpg',
    '/assets/books/T3.jpg',
    '/assets/books/T4.jpg',
    '/assets/books/T5.jpg',
    '/assets/books/T6.jpg',
    '/assets/books/T8.jpeg'
];

function HeroSection() {
    return (
        <section className="relative w-full overflow-hidden" style={{ minHeight: '450px' }}>
            <img
                src={IMG.hero}
                alt="Knowledge Hub Banner"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ zIndex: 0 }}
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(15,23,42,0.88) 0%, rgba(30,58,95,0.82) 50%, rgba(10,48,85,0.75) 100%)', zIndex: 1 }} />
            <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5c8 0 15 12 15 25s-7 25-15 25S15 43 15 30 22 5 30 5z' fill='white' fill-opacity='0.4'/%3E%3C/svg%3E")`, backgroundSize: '80px 80px', zIndex: 2 }} />

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

function BooksSection() {
    return (
        <section className="w-full py-6 px-6 md:px-12 pb-15">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12 text-center">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1e3a5f]">Our Publications</h2>
                    <div className="w-24 h-1 bg-[#f59e0b] mx-auto mt-4 rounded-full"></div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 sm:gap-x-8 gap-y-8 sm:gap-y-12">
                    {BOOKS.map((book, idx) => (
                        <div key={idx} className="flex flex-col items-end group">
                            <div className="w-full aspect-[3/4] overflow-hidden cursor-pointer rounded-sm">
                                <img src={book} alt={`Book ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500" />
                            </div>

                            <button className="flex items-center gap-1.5 text-sm font-semibold text-[#1e3a5f] hover:text-[#f59e0b] transition-colors cursor-pointer">
                                Explore <ArrowRight size={16} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default function KnowledgePage() {
    return (
        <main className="w-full font-sans">
            <HeroSection />
            <PromoSection />
            <BooksSection />
        </main>
    );
}
