"use client";

import React, { useState } from 'react';
import RiverMap from './RiverMap';
import { Waves, ChevronRight, ChevronLeft, X } from 'lucide-react';

const RiverDetailsSection = ({ title = "Rivers Assigned", columns, data, highlightedRivers = [] }) => {
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
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mb-8">
                    <div className="p-4 md:p-6 bg-slate-50 border-b border-slate-100 flex items-center gap-2">
                        <div className="bg-blue-900 p-1.5 rounded-lg text-white">
                            <Waves size={18} />
                        </div>
                        <h3 className="text-xl font-bold text-blue-900">{title}</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-slate-700 border-collapse">
                            <thead className="bg-slate-50/80 text-slate-600 font-semibold border-b border-slate-200">
                                <tr>
                                    {columns.map((col, idx) => (
                                        <th key={idx} className="px-6 py-4 whitespace-nowrap">{col.header}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {data.map((row, rowIdx) => (
                                    <tr key={rowIdx} className="hover:bg-blue-50/50 transition-colors">
                                        {columns.map((col, colIdx) => {
                                            const isRiverName = col.key === 'name' || col.key === 'river';
                                            const hasImage = isRiverName && row.image;

                                            return (
                                                <td key={colIdx} className={`px-6 py-4 whitespace-nowrap ${colIdx === 0 ? 'font-bold text-blue-900' : ''}`}>
                                                    {hasImage ? (
                                                        <div className="flex items-center gap-3">
                                                            <div
                                                                className="w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-slate-200 cursor-pointer hover:opacity-80 transition-opacity"
                                                                onClick={() => {
                                                                    const idx = tableImages.findIndex(img => img.image === row.image);
                                                                    if (idx !== -1) openLightbox(idx);
                                                                }}
                                                            >
                                                                <img src={row.image} alt={row[col.key]} className="w-full h-full object-cover" />
                                                            </div>
                                                            {col.render ? col.render(row[col.key], row) : row[col.key]}
                                                        </div>
                                                    ) : (
                                                        col.render ? col.render(row[col.key], row) : row[col.key]
                                                    )}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
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
