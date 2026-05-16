'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const IMG = {
    hero: '/assets/images/banner.png',
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
    const [galleryItems, setGalleryItems] = useState([]);

    useEffect(() => {
        const fetchGlobalImages = async () => {
            try {
                const res = await axios.get(`${API_URL}/gallery?type=global`);
                setGalleryItems(res.data);
            } catch (err) {
                console.error('Failed to fetch global gallery:', err);
            }
        };
        fetchGlobalImages();
    }, []);

    // Don't render if no images from API
    if (galleryItems.length === 0) return null;

    return (
        <section className="w-full py-12 px-6 md:px-12 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-10">
                    <span className="text-[#f59e0b] font-sans font-bold uppercase tracking-widest text-sm mb-2 block">Our Impact</span>
                    <h2 className="text-2xl md:text-4xl font-serif font-bold text-[#1e3a5f] leading-relaxed max-w-4xl mx-auto">
                        At SARRA, we are passionate about creating exceptional environments and initiatives that elevate lifestyles and enrich the experience of Uttarakhand&apos;s natural heritage.
                    </h2>
                    <div className="w-24 h-1 bg-[#f59e0b] mx-auto mt-6 rounded-full"></div>
                </div>

                {/* Bento Grid for first 6 items */}
                {galleryItems.length >= 6 ? (
                    <div className="hidden md:grid grid-cols-4 gap-4 auto-rows-[250px]">
                        <div className="col-span-2 row-span-2 rounded-2xl overflow-hidden group shadow-lg relative">
                            <img src={galleryItems[0].image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={galleryItems[0].title} />
                            <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/80 to-transparent">
                                <p className="text-white font-bold text-lg leading-tight">{galleryItems[0].title}</p>
                            </div>
                        </div>
                        <div className="col-span-2 rounded-2xl overflow-hidden group shadow-lg relative">
                            <img src={galleryItems[1].image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={galleryItems[1].title} />
                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                                <p className="text-white font-semibold text-sm">{galleryItems[1].title}</p>
                            </div>
                        </div>
                        <div className="rounded-2xl overflow-hidden group shadow-lg relative">
                            <img src={galleryItems[2].image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={galleryItems[2].title} />
                            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                                <p className="text-white font-semibold text-xs">{galleryItems[2].title}</p>
                            </div>
                        </div>
                        <div className="rounded-2xl overflow-hidden group shadow-lg relative">
                            <img src={galleryItems[3].image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={galleryItems[3].title} />
                            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                                <p className="text-white font-semibold text-xs">{galleryItems[3].title}</p>
                            </div>
                        </div>
                        <div className="col-span-1 rounded-2xl overflow-hidden group shadow-lg relative">
                            <img src={galleryItems[4].image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={galleryItems[4].title} />
                            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                                <p className="text-white font-semibold text-xs">{galleryItems[4].title}</p>
                            </div>
                        </div>
                        <div className="col-span-3 rounded-2xl overflow-hidden group shadow-lg relative">
                            <img src={galleryItems[5].image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={galleryItems[5].title} />
                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                                <p className="text-white font-bold text-base">{galleryItems[5].title}</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    /* Standard grid for fewer items */
                    <div className="hidden md:grid grid-cols-2 md:grid-cols-3 gap-5">
                        {galleryItems.map((item, idx) => (
                            <div key={item._id || idx} className="rounded-2xl overflow-hidden group shadow-lg relative h-[300px]">
                                <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={item.title} />
                                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                                    <p className="text-white font-bold text-sm leading-tight">{item.title}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Mobile horizontal scroll */}
                <div className="md:hidden flex overflow-x-auto gap-4 pb-4 scrollbar-hide snap-x snap-mandatory -mx-6 px-6">
                    {galleryItems.map((item, idx) => (
                        <div key={item._id || idx} className="min-w-[80%] snap-center shrink-0 rounded-2xl overflow-hidden shadow-lg relative h-[280px]">
                            <img src={item.image} className="w-full h-full object-cover" alt={item.title} />
                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                                <p className="text-white font-bold text-sm leading-tight">{item.title}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Extra images beyond 6 */}
                {galleryItems.length > 6 && (
                    <div className="hidden md:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                        {galleryItems.slice(6).map((item, idx) => (
                            <div key={item._id || `extra-${idx}`} className="rounded-2xl overflow-hidden group shadow-lg h-[250px] relative">
                                <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={item.title} />
                                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                                    <p className="text-white font-semibold text-xs">{item.title}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
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

                <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-12">
                    {DISTRICTS.map((city, idx) => (
                        <DistrictCard key={idx} city={city} />
                    ))}
                </div>

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
