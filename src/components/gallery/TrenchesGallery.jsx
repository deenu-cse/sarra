"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const trenchesData = Array.from({ length: 11 }, (_, i) => ({
  id: i + 1,
  image: `/assets/TRENCHES_PONDS_IMG/${i + 1}.jpeg`,
  title: `Trenches and Ponds ${i + 1}`,
}));

const TrenchesGallery = () => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => setIsLightboxOpen(false);
  const showNextImage = (e) => {
    e?.stopPropagation();
    setCurrentImageIndex((prev) => (prev === trenchesData.length - 1 ? 0 : prev + 1));
  };
  const showPrevImage = (e) => {
    e?.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? trenchesData.length - 1 : prev - 1));
  };

  return (
    <section className="py-12 bg-gray-50 overflow-hidden font-sans border-t border-gray-200">
      <div className="container mx-auto px-4 mb-8 text-center">
        <h2 className="text-3xl md:text-5xl font-bold font-serif text-[#1e3a5f] mb-4 tracking-tight uppercase">
          Trenches & Ponds
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium">
          Glimpses of our water conservation structures across the region.
        </p>
      </div>
      <div className="relative px-4 md:px-12 max-w-7xl mx-auto">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView="auto"
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true, el: ".trenches-pagination" }}
          navigation={{ nextEl: ".trenches-next", prevEl: ".trenches-prev" }}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          className="pb-12"
        >
          {trenchesData.map((item, index) => (
            <SwiperSlide key={item.id}>
              <div
                className="group relative bg-white rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl border border-gray-100 transition-all duration-300 cursor-pointer h-72 transform hover:-translate-y-1"
                onClick={() => openLightbox(index)}
              >
                <Image src={item.image} alt={item.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="trenches-pagination flex justify-center gap-2 mt-4"></div>
        <button className="trenches-prev absolute left-0 md:left-2 top-[40%] -translate-y-1/2 z-20 p-2 bg-white/90 backdrop-blur rounded-full shadow-lg text-[#1e3a5f] hover:bg-[#f59e0b] hover:text-white transition-all group hidden md:flex cursor-pointer">
          <ChevronLeft size={24} />
        </button>
        <button className="trenches-next absolute right-0 md:right-2 top-[40%] -translate-y-1/2 z-20 p-2 bg-white/90 backdrop-blur rounded-full shadow-lg text-[#1e3a5f] hover:bg-[#f59e0b] hover:text-white transition-all group hidden md:flex cursor-pointer">
          <ChevronRight size={24} />
        </button>
      </div>

      {isLightboxOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center backdrop-blur-sm p-4 lightbox-fade-in" onClick={closeLightbox}>
          <div className="absolute inset-0 bg-black/80" />
          <div className="relative w-full max-w-6xl max-h-[92vh] bg-transparent rounded-3xl overflow-hidden lightbox-slide-up" onClick={(e) => e.stopPropagation()}>
            <button onClick={closeLightbox} className="absolute top-4 right-4 z-30 w-11 h-11 rounded-full bg-black/60 hover:bg-[#f59e0b] text-white flex items-center justify-center transition-all cursor-pointer">
              <X size={24} />
            </button>
            <button onClick={showPrevImage} className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 md:w-14 md:h-14 rounded-full bg-black/60 hover:bg-[#f59e0b] text-white flex items-center justify-center transition-all cursor-pointer">
              <ChevronLeft size={30} />
            </button>
            <button onClick={showNextImage} className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 md:w-14 md:h-14 rounded-full bg-black/60 hover:bg-[#f59e0b] text-white flex items-center justify-center transition-all cursor-pointer">
              <ChevronRight size={30} />
            </button>
            <div className="relative w-full h-[60vh] md:h-[80vh] bg-transparent flex items-center justify-center">
              <img src={trenchesData[currentImageIndex].image} alt="Trench" className="max-w-full max-h-full object-contain" />
            </div>
          </div>
        </div>
      )}
      <style jsx global>{`
        .lightbox-fade-in { animation: fadeIn 0.3s ease-out forwards; }
        .lightbox-slide-up { animation: slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(30px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
        .trenches-pagination .swiper-pagination-bullet { width: 10px; height: 10px; background: #cbd5e1; opacity: 1; transition: all 0.3s; }
        .trenches-pagination .swiper-pagination-bullet-active { width: 30px; background: #f59e0b; border-radius: 5px; }
      `}</style>
    </section>
  );
};
export default TrenchesGallery;
