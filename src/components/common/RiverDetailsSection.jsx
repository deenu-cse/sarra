"use client";

import React, { useState } from 'react';
import RiverMap from './RiverMap';
import { Waves, ChevronRight, ChevronLeft, X, MapPin } from 'lucide-react';

const RiverDetailsSection = ({ title = "Rivers Assigned", data, highlightedRivers = [] }) => {
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    const tableImages = data?.filter(row => row.image).map(row => ({
        image: row.image,
        title: row.name || row.river || 'River'
    })) || [];

    const openLightbox = (index) => {
        setLightboxIndex(index);
        setIsLightboxOpen(true);
    };

    const closeLightbox = () => setIsLightboxOpen(false);

    const nextLightboxSlide = (e) => {
        e?.stopPropagation();
        setLightboxIndex((prev) => (prev + 1) % tableImages.length);
    };

    const prevLightboxSlide = (e) => {
        e?.stopPropagation();
        setLightboxIndex((prev) => (prev - 1 + tableImages.length) % tableImages.length);
    };

    return (
        <div className="md:max-w-6xl w-full mx-auto p-4 md:p-6 mb-8 font-sans">
            {data && data.length > 0 && (
                <div className="mb-8">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="bg-blue-900 p-1.5 rounded-lg text-white">
                            <Waves size={24} />
                        </div>
                        <h3 className="text-2xl font-bold text-blue-900">{title}</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {data.map((row, rowIdx) => {
                            const riverName = row.name || row.river || 'Unnamed River';
                            const district = row.district || '';
                            const hasImage = !!row.image;

                            return (
                                <div
                                    key={rowIdx}
                                    className="relative w-full h-[320px] md:h-[420px] rounded-3xl overflow-hidden group cursor-pointer shadow-xl border border-white/10"
                                    onClick={() => {
                                        if (hasImage) {
                                            const idx = tableImages.findIndex(img => img.image === row.image);
                                            if (idx !== -1) openLightbox(idx);
                                        }
                                    }}
                                >
                                    {hasImage ? (
                                        <img
                                            src={row.image}
                                            alt={riverName}
                                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a5f] to-[#0f172a] flex items-center justify-center">
                                            <Waves size={80} className="text-white/10" />
                                        </div>
                                    )}

                                    {/* Majestic Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f] via-[#0a192f]/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent opacity-50" />

                                    {/* Content Overlay */}
                                    <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                                        <div className="transform transition-transform duration-500 translate-y-4 group-hover:translate-y-0">
                                            <div className="w-12 h-1.5 bg-[#f59e0b] mb-4 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
                                            <h4 className="text-2xl md:text-3xl font-serif font-bold text-white mb-3 tracking-tight drop-shadow-lg leading-tight">
                                                {riverName}
                                            </h4>
                                            {district && (
                                                <div className="flex items-center">
                                                    <span className="bg-white/20 backdrop-blur-md text-white px-3 py-1.5 rounded-full border border-white/20 text-sm md:text-base font-semibold shadow-sm flex items-center gap-1">
                                                        <MapPin size={20} color="#3b82f6" /> {district}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_0%,transparent_60%)]" />
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {highlightedRivers.length > 0 && (
                <div className="mt-8">
                    <RiverMap highlightedRivers={highlightedRivers} height="450px" />
                </div>
            )}

            {isLightboxOpen && tableImages.length > 0 && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 lightbox-fade-in"
                    onClick={closeLightbox}
                >
                    <div
                        className="relative w-full max-w-6xl max-h-[92vh] bg-transparent rounded-3xl overflow-hidden lightbox-slide-up"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={closeLightbox}
                            className="absolute top-4 right-4 z-30 w-11 h-11 rounded-full bg-black/60 hover:bg-[#f59e0b] text-white flex items-center justify-center transition-all"
                        >
                            <X size={24} />
                        </button>

                        {tableImages.length > 1 && (
                            <>
                                <button
                                    onClick={prevLightboxSlide}
                                    className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 md:w-14 md:h-14 rounded-full bg-black/60 hover:bg-[#f59e0b] text-white flex items-center justify-center transition-all"
                                >
                                    <ChevronLeft size={30} />
                                </button>

                                <button
                                    onClick={nextLightboxSlide}
                                    className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 md:w-14 md:h-14 rounded-full bg-black/60 hover:bg-[#f59e0b] text-white flex items-center justify-center transition-all"
                                >
                                    <ChevronRight size={30} />
                                </button>
                            </>
                        )}

                        <div className="relative w-full h-[60vh] md:h-[72vh] bg-transparent">
                            <img
                                src={tableImages[lightboxIndex].image}
                                alt={tableImages[lightboxIndex].title}
                                className="w-full h-full object-contain"
                            />
                        </div>

                        <div className="absolute bottom-8 left-0 right-0 text-center">
                            <h3 className="text-white text-lg md:text-xl font-semibold bg-black/60 inline-block px-6 py-2 rounded-full backdrop-blur-md z-50">
                                {tableImages[lightboxIndex].title}
                            </h3>
                        </div>
                    </div>
                </div>
            )}

            <style dangerouslySetInnerHTML={{
                __html: `
                .lightbox-fade-in {
                    animation: fadeIn 0.3s ease-out forwards;
                }

                .lightbox-slide-up {
                    animation: slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }

                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px) scale(0.97);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }
            `}} />
        </div>
    );
};

export default RiverDetailsSection;
