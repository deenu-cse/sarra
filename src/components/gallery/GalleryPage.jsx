'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const IMG = {
    hero: '/assets/images/banner.png',
    grid: [
        '/assets/images/1.jpg',
        '/assets/images/2.jpg',
        '/assets/images/3.jpg',
        '/assets/images/4.jpg',
        '/assets/images/5.jpg',
        '/assets/images/6.jpg',
    ]
};

const DISTRICTS = [
    { name: 'Almora', slug: 'almora', img: '/assets/images/1.jpg' },
    { name: 'Bageshwar', slug: 'bageshwar', img: '/assets/images/2.jpg' },
    { name: 'Chamoli', slug: 'chamoli', img: '/assets/images/3.jpg' },
    { name: 'Champawat', slug: 'champawat', img: '/assets/images/4.jpg' },
    { name: 'Dehradun', slug: 'dehradun', img: '/assets/images/5.jpg' },
    { name: 'Haridwar', slug: 'haridwar', img: '/assets/images/6.jpg' },
    { name: 'Nainital', slug: 'nainital', img: '/assets/images/7.jpeg' },
    { name: 'Pauri Garhwal', slug: 'pauri-garhwal', img: '/assets/images/8.jpg' },
    { name: 'Pithoragarh', slug: 'pithoragarh', img: '/assets/images/9.jpg' },
    { name: 'Tehri Garhwal', slug: 'tehri-garhwal', img: '/assets/images/10.jpg' },
    { name: 'Udham Singh Nagar', slug: 'udham-singh-nagar', img: '/assets/images/11.jpg' },
    { name: 'Uttarkashi', slug: 'uttarkashi', img: '/assets/images/12.jpg' },
];

function HeroSection() {
    return (
        <section className="relative w-full overflow-hidden" style={{ minHeight: '500px' }}>
            <img
                src={IMG.hero}
                alt="Gallery Banner"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ zIndex: 0 }}
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(15,23,42,0.85) 0%, rgba(30,58,95,0.8) 50%, rgba(10,48,85,0.7) 100%)', zIndex: 1 }} />

            <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 py-24 md:py-32">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white mb-4 tracking-tight leading-tight"
                    style={{ textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}>
                    Visual <span className="text-[#f59e0b]">Gallery</span>
                </h1>
                <p className="text-white/80 text-lg md:text-xl max-w-2xl mb-8 font-light leading-relaxed">
                    A window into our efforts for water rejuvenation across Uttarakhand.
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

function NextSpaceSection() {
    return (
        <section className="w-full py-8 px-6 md:px-12 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-xl md:text-3xl lg:text-4xl font-serif font-bold text-[#1e3a5f] text-center mb-8 leading-relaxed max-w-5xl mx-auto">
                    At SARRA, we are passionate about creating exceptional environments and initiatives that elevate lifestyles and enrich the experience of Uttarakhand&apos;s natural heritage.
                </h2>

                <div className="hidden md:grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[250px]">
                    <div className="md:col-span-2 md:row-span-2 rounded-2xl overflow-hidden group shadow-lg">
                        <img src={IMG.grid[0]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Gallery 1" />
                    </div>
                    <div className="md:col-span-2 rounded-2xl overflow-hidden group shadow-lg">
                        <img src={IMG.grid[1]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Gallery 2" />
                    </div>
                    <div className="rounded-2xl overflow-hidden group shadow-lg">
                        <img src={IMG.grid[2]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Gallery 3" />
                    </div>
                    <div className="rounded-2xl overflow-hidden group shadow-lg">
                        <img src={IMG.grid[3]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Gallery 4" />
                    </div>
                    <div className="md:col-span-1 rounded-2xl overflow-hidden group shadow-lg">
                        <img src={IMG.grid[4]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Gallery 5" />
                    </div>
                    <div className="md:col-span-3 rounded-2xl overflow-hidden group shadow-lg">
                        <img src={IMG.grid[5]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Gallery 6" />
                    </div>
                </div>
            </div>
        </section>
    );
}

function DistrictCard({ city }) {
    return (
        <Link
            href={`/gallery/${city.slug}`}
            target="_blank"
            className="group relative h-[380px] rounded-2xl overflow-hidden shadow-xl flex items-end p-6 transition-all duration-500 hover:-translate-y-2 block w-full"
        >
            <img
                src={city.img}
                alt={city.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

            <div className="relative z-10 w-full flex flex-col gap-1">
                <h3 className="text-2xl font-serif font-bold text-white tracking-wide">
                    {city.name}
                </h3>
                <div className="flex items-center justify-between w-full mt-2">
                    <span className="text-white/60 text-sm font-medium uppercase tracking-widest">Uttarakhand</span>
                    <div className="flex items-center gap-1.5 text-white bg-[#f59e0b] px-3 py-1.5 rounded-full text-xs font-bold transform translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
                        Explore <ArrowRight size={14} />
                    </div>
                </div>
            </div>
        </Link>
    );
}

function DistrictsGallery() {
    // Split into 3 chunks for carousels
    const chunks = [
        DISTRICTS.slice(0, 4),
        DISTRICTS.slice(4, 8),
        DISTRICTS.slice(8, 12)
    ];

    return (
        <section className="w-full py-10 px-6 md:px-12 bg-[#f8fafc]">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-5">
                    <span className="text-[#f59e0b] font-sans font-bold uppercase tracking-widest text-sm mb-2 block">District Archives</span>
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#1e3a5f]">Explore Uttarakhand</h2>
                </div>

                {/* Desktop Grid View */}
                <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-12">
                    {DISTRICTS.map((city, idx) => (
                        <DistrictCard key={idx} city={city} />
                    ))}
                </div>

                {/* Mobile Carousel View (3 carousels) */}
                <div className="md:hidden flex flex-col gap-12 mt-10">
                    {chunks.map((chunk, cIdx) => (
                        <div key={cIdx} className="w-full">
                            <div className="flex overflow-x-auto gap-5 pb-6 scrollbar-hide snap-x snap-mandatory -mx-6 px-6">
                                {chunk.map((city, idx) => (
                                    <div key={idx} className="min-w-[85%] snap-center shrink-0">
                                        <DistrictCard city={city} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default function GalleryPage() {
    return (
        <main className="w-full font-sans">
            <HeroSection />
            <NextSpaceSection />
            <DistrictsGallery />
        </main>
    );
}
