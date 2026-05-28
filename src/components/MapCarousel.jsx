'use client';

import React, { useEffect, useState } from 'react';
import { ChevronRight, ChevronLeft, X } from 'lucide-react';

const mapImages = [
    { image: '/assets/maps/Bhagirath Map.jpeg', title: 'Water Sources Map' },
    { image: '/assets/maps/Districtwise.jpeg', title: 'District Administrative Map' },
    { image: '/assets/maps/Drainage Network.jpeg', title: 'River & Drainage Network Map' },
    { image: '/assets/maps/Major Watershed.jpeg', title: 'Major River Basin Map' },
    { image: '/assets/maps/Uttarakhand_LULC.jpeg', title: 'Land Use & Land Cover Map' },
];

export default function MapCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerView, setItemsPerView] = useState(3);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    useEffect(() => {
        const updateItemsPerView = () => {
            if (window.innerWidth < 640) setItemsPerView(1);
            else if (window.innerWidth < 1024) setItemsPerView(2);
            else setItemsPerView(3);
        };

        updateItemsPerView();
        window.addEventListener('resize', updateItemsPerView);

        return () => window.removeEventListener('resize', updateItemsPerView);
    }, []);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % mapImages.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + mapImages.length) % mapImages.length);
    };

    useEffect(() => {
        const interval = setInterval(nextSlide, 3000);
        return () => clearInterval(interval);
    }, []);

    const getVisibleImages = () => {
        return Array.from({ length: itemsPerView }).map((_, offset) => {
            const index = (currentIndex + offset) % mapImages.length;
            return { ...mapImages[index], index };
        });
    };

    const openLightbox = (index) => {
        setLightboxIndex(index);
        setIsLightboxOpen(true);
    };

    const closeLightbox = () => setIsLightboxOpen(false);

    const nextLightboxSlide = (e) => {
        e?.stopPropagation();
        setLightboxIndex((prev) => (prev + 1) % mapImages.length);
    };

    const prevLightboxSlide = (e) => {
        e?.stopPropagation();
        setLightboxIndex((prev) => (prev - 1 + mapImages.length) % mapImages.length);
    };

    return (
        <section className="w-full py-12 bg-white relative overflow-hidden">
            <div className="w-full px-4 md:px-8">
                <div className="relative group">
                    <div className="overflow-hidden">
                        <div
                            className="flex gap-5 transition-transform duration-700 ease-in-out"
                            style={{
                                transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
                            }}
                        >
                            {mapImages.concat(mapImages).map((item, index) => (
                                <div
                                    key={index}
                                    className={`
                    flex-shrink-0
                    ${itemsPerView === 1
                                            ? 'w-full'
                                            : itemsPerView === 2
                                                ? 'w-[calc(50%-10px)]'
                                                : 'w-[calc(33.333%-14px)]'
                                        }
                `}
                                    onClick={() => openLightbox(index % mapImages.length)}
                                >
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full object-contain transition-transform duration-500 hover:scale-105"
                                    />

                                    <h3 className="mt-3 text-left text-sm md:text-base font-semibold text-gray-800">
                                        {item.title}
                                    </h3>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={prevSlide}
                        className="absolute left-2 top-[42%] -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-black/50 hover:bg-[#f59e0b] text-white rounded-full flex items-center justify-center transition-all z-10"
                    >
                        <ChevronLeft size={24} />
                    </button>

                    <button
                        onClick={nextSlide}
                        className="absolute right-2 top-[42%] -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-black/50 hover:bg-[#f59e0b] text-white rounded-full flex items-center justify-center transition-all z-10"
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>

            </div>

            {isLightboxOpen && (
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

                        <div className="relative w-full h-[60vh] md:h-[72vh] bg-transparent">
                            <img
                                src={mapImages[lightboxIndex].image}
                                alt={mapImages[lightboxIndex].title}
                                className="w-full h-full object-contain"
                            />
                        </div>

                        <div className="absolute bottom-8 left-0 right-0 text-center">
                            <h3 className="text-white text-lg md:text-xl font-semibold bg-black/60 inline-block px-6 py-2 rounded-full backdrop-blur-md">
                                {mapImages[lightboxIndex].title}
                            </h3>
                        </div>
                    </div>
                </div>
            )}

            <style jsx global>{`
                .lightbox-fade-in {
                    animation: fadeIn 0.3s ease-out forwards;
                }

                .lightbox-slide-up {
                    animation: slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }

                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
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
            `}</style>
        </section>
    );
}