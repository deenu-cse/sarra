'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { X, ChevronLeft, ChevronRight, ImageIcon } from 'lucide-react';
import { getMediaUrl } from "@/lib/getMediaUrl";

export default function TranchesPondsGallery({ initialImages = [] }) {
    const [selectedImgIdx, setSelectedImgIdx] = useState(null);

    const openSlider = (idx) => setSelectedImgIdx(idx);
    const closeSlider = () => setSelectedImgIdx(null);

    const nextImg = (e) => {
        e.stopPropagation();
        setSelectedImgIdx((prev) => (prev + 1) % initialImages.length);
    };

    const prevImg = (e) => {
        e.stopPropagation();
        setSelectedImgIdx((prev) => (prev - 1 + initialImages.length) % initialImages.length);
    };

    return (
        <section className="w-full min-h-screen py-20 px-6 md:px-12 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b-2 border-gray-100 pb-8 gap-4">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#1e3a5f] mb-2">Water Source Intervention Initiatives</h1>
                        <p className="text-gray-500 font-sans tracking-widest uppercase text-sm">Water Conservation structures and rejuvenation initiatives</p>
                    </div>
                    <Link href="/gallery" className="text-[#f59e0b] font-bold flex items-center gap-2 hover:translate-x-1 transition-transform">
                        <ChevronLeft size={20} /> Back to Gallery
                    </Link>
                </div>

                {initialImages.length === 0 ? (
                    <div className="text-center py-20 bg-gray-50 rounded-3xl border border-gray-100">
                        <ImageIcon size={48} className="mx-auto text-gray-300 mb-4" />
                        <h3 className="text-xl font-bold text-[#1e3a5f] mb-2">No Images Available</h3>
                        <p className="text-gray-500 max-w-sm mx-auto">We are currently gathering images. Please check back later to view updates.</p>
                    </div>
                ) : (
                    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
                        {initialImages.map((item, idx) => (
                            <div
                                key={item._id || idx}
                                className="break-inside-avoid relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer"
                                onClick={() => openSlider(idx)}
                            >
                                <img
                                    src={getMediaUrl(item.image)}
                                    alt={item.label || `Tranches & Ponds ${idx + 1}`}
                                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <div className="bg-white/90 p-4 rounded-full text-[#1e3a5f] shadow-2xl">
                                        <ChevronRight size={24} />
                                    </div>
                                </div>
                                {item.label && (
                                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent text-white font-sans text-xs font-semibold leading-tight opacity-90 group-hover:opacity-100 transition-all duration-300">
                                        {item.label}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Slider / Lightbox Modal */}
            {selectedImgIdx !== null && initialImages.length > 0 && (
                <div
                    className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-12 animate-in fade-in duration-300"
                    onClick={closeSlider}
                >
                    <div
                        className="relative max-w-5xl w-full aspect-[4/3] md:aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={getMediaUrl(initialImages[selectedImgIdx].image)}
                            className="max-w-full max-h-full object-contain"
                            alt={initialImages[selectedImgIdx].label || "Slider View"}
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
                            <span className="text-[#f59e0b] font-bold text-sm tracking-widest uppercase">Tranches & Ponds</span>
                            <h4 className="text-white text-xl font-serif">
                                {initialImages[selectedImgIdx].label || `Image ${selectedImgIdx + 1} of ${initialImages.length}`}
                            </h4>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
