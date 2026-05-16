'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const DISTRICT_NAMES = {
    'almora': 'Almora',
    'bageshwar': 'Bageshwar',
    'chamoli': 'Chamoli',
    'champawat': 'Champawat',
    'dehradun': 'Dehradun',
    'haridwar': 'Haridwar',
    'nainital': 'Nainital',
    'pauri-garhwal': 'Pauri Garhwal',
    'pithoragarh': 'Pithoragarh',
    'tehri-garhwal': 'Tehri Garhwal',
    'udham-singh-nagar': 'Udham Singh Nagar',
    'uttarkashi': 'Uttarkashi'
};

const CITY_CONFIG = {
    'almora': { count: 10, ext: 'jpg' },
    'bageshwar': { count: 11, ext: 'jpg' },
    'chamoli': { count: 9, ext: 'jpg' },
    'champawat': { count: 9, ext: 'jpg' },
    'dehradun': { count: 5, ext: 'jpg' },
    'haridwar': { count: 9, ext: 'jpg' },
    'nainital': { count: 8, ext: 'jpeg' },
    'pauri-garhwal': { count: 8, ext: 'jpg' },
    'pithoragarh': { count: 10, ext: 'jpg' },
    'tehri-garhwal': { count: 10, ext: 'jpg' },
    'udham-singh-nagar': { count: 5, ext: 'jpg' },
    'uttarkashi': { count: 6, ext: 'jpg' }
};

export default function CityGallery({ citySlug }) {
    const [selectedImgIdx, setSelectedImgIdx] = useState(null);
    const [dynamicImages, setDynamicImages] = useState([]);

    const cityName = DISTRICT_NAMES[citySlug] || citySlug;
    const config = CITY_CONFIG[citySlug] || { count: 5, ext: 'jpg' };

    // Static images first
    const staticImages = Array.from({ length: config.count }, (_, i) => `/assets/images/${citySlug}/${i + 1}.${config.ext}`);

    // Fetch dynamic district images from API
    useEffect(() => {
        const fetchDistrictImages = async () => {
            try {
                const res = await axios.get(`${API_URL}/gallery?type=district&district=${cityName}`);
                setDynamicImages(res.data.map(item => item.image));
            } catch (err) {
                console.error('Failed to fetch district gallery:', err);
            }
        };
        fetchDistrictImages();
    }, [cityName]);

    // Static first, then dynamic
    const images = [...staticImages, ...dynamicImages];

    const openSlider = (idx) => setSelectedImgIdx(idx);
    const closeSlider = () => setSelectedImgIdx(null);

    const nextImg = (e) => {
        e.stopPropagation();
        setSelectedImgIdx((prev) => (prev + 1) % images.length);
    };

    const prevImg = (e) => {
        e.stopPropagation();
        setSelectedImgIdx((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <section className="w-full min-h-screen py-20 px-6 md:px-12 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b-2 border-gray-100 pb-8 gap-4">
                    <div>
                        <h1 className="text-4xl md:text-6xl font-serif font-bold text-[#1e3a5f] mb-2">{cityName}</h1>
                        <p className="text-gray-500 font-sans tracking-widest uppercase text-sm">District Gallery Archive</p>
                    </div>
                    <Link href="/gallery" className="text-[#f59e0b] font-bold flex items-center gap-2 hover:translate-x-1 transition-transform">
                        <ChevronLeft size={20} /> Back to Gallery
                    </Link>
                </div>

                {/* Show a divider between static and dynamic if both exist */}
                <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
                    {images.map((img, idx) => (
                        <div
                            key={idx}
                            className="break-inside-avoid relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer"
                            onClick={() => openSlider(idx)}
                        >
                            <img
                                src={img}
                                alt={`${cityName} ${idx + 1}`}
                                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <div className="bg-white/90 p-4 rounded-full text-[#1e3a5f] shadow-2xl">
                                    <ChevronRight size={24} />
                                </div>
                            </div>
                            {/* Badge for dynamic images */}
                            {idx >= staticImages.length && (
                                <div className="absolute top-3 left-3 bg-[#f59e0b] text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                                    New
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Slider / Lightbox Modal */}
            {selectedImgIdx !== null && (
                <div
                    className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-12 animate-in fade-in duration-300"
                    onClick={closeSlider}
                >
                    <div
                        className="relative max-w-5xl w-full aspect-[4/3] md:aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={images[selectedImgIdx]}
                            className="max-w-full max-h-full object-contain"
                            alt="Slider View"
                        />

                        <button
                            className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors bg-black/20 p-2 rounded-full hover:bg-black/50"
                            onClick={closeSlider}
                        >
                            <X size={32} />
                        </button>

                        <button
                            className="absolute left-6 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-all bg-black/20 hover:bg-black/50 p-4 rounded-full hover:scale-110"
                            onClick={prevImg}
                        >
                            <ChevronLeft size={48} />
                        </button>

                        <button
                            className="absolute right-6 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-all bg-black/20 hover:bg-black/50 p-4 rounded-full hover:scale-110"
                            onClick={nextImg}
                        >
                            <ChevronRight size={48} />
                        </button>

                        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black to-transparent">
                            <span className="text-[#f59e0b] font-bold text-sm tracking-widest uppercase">{cityName}</span>
                            <h4 className="text-white text-xl font-serif">Image {selectedImgIdx + 1} of {images.length}</h4>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
