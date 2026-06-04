"use client";

import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const communityData = [
  {
    id: 1,
    title: "Jal Utsav Pakhwada",
    description: "Jal utasw pakhwada at Ghamsali, Chamoli",
    image: "/assets/homeimgslider/Jal utasw pakhwada at ghamsali, chamoli.jpeg",
  },
  {
    id: 2,
    title: "Jal Utsav 2025",
    description: "Jal Utsav 2025 at Tehri Garhwal",
    image: "/assets/homeimgslider/Jal utsav 25 tehri.jpg",
  },
  {
    id: 3,
    title: "Nadi Mahotsav",
    description: "Nadi Mahotsav at Pati Jairoli, Champawat",
    image: "/assets/homeimgslider/nadi mahotsaw at Pati Jairoli, champawat.jpeg",
  },
  {
    id: 4,
    title: "Plantation Drive",
    description: "Plantation Drive at Pithoragarh",
    image: "/assets/homeimgslider/Plantation drive at Pithoragarh.jpg",
  },
  {
    id: 5,
    title: "Harela at WMD",
    description: "Harela Festival 2025 at WMD, Dehradun",
    image: "/assets/homeimgslider/Hrela at wmd.jpg",
  },
];

const CommunityEngagement: React.FC = () => {
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
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % communityData.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const next = () => setCurrentIndex((prev) => (prev + 1) % communityData.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + communityData.length) % communityData.length);

  const openLightbox = (index: number) => {
    setLightboxIndex(index % communityData.length);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => setIsLightboxOpen(false);

  const nextLightbox = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setLightboxIndex((prev) => (prev + 1) % communityData.length);
  };

  const prevLightbox = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setLightboxIndex((prev) => (prev - 1 + communityData.length) % communityData.length);
  };

  return (
    <section className="py-8 bg-white relative overflow-hidden">
      <div className="w-full px-4 md:px-8">
        <div className="container mx-auto text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-[#1e3a5f] mb-2 tracking-tight uppercase">Community Engagement</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Witness our collective journey towards sustainable water management and environmental conservation.</p>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex gap-6 transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
            >
              {communityData.concat(communityData).map((item, idx) => (
                <div
                  key={idx}
                  className={
                    `flex-shrink-0 pb-2 ${itemsPerView === 1 ? 'w-full' : itemsPerView === 2 ? 'w-[calc(50%-12px)]' : 'w-[calc(33.333%-16px)]'}`
                  }
                  onClick={() => openLightbox(idx)}
                >
                  <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 border border-slate-100 flex flex-col h-full">
                    <div className="relative h-64 md:h-72 overflow-hidden bg-gray-100 flex items-center justify-center">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    </div>

                    <div className="p-4 md:p-5 bg-white">
                      <h3 className="text-lg md:text-xl font-bold text-[#1e3a5f] mb-2 leading-tight">{item.title}</h3>
                      <p className="text-gray-600 text-sm md:text-base">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button onClick={prev} className="absolute left-2 top-[45%] -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 bg-black/50 hover:bg-[#f59e0b] text-white rounded-full flex items-center justify-center transition-all">
            <ChevronLeft size={20} />
          </button>

          <button onClick={next} className="absolute right-2 top-[45%] -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 bg-black/50 hover:bg-[#f59e0b] text-white rounded-full flex items-center justify-center transition-all">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {isLightboxOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 lightbox-fade-in" onClick={closeLightbox}>
          <div className="relative w-full max-w-6xl max-h-[92vh] bg-transparent rounded-3xl overflow-hidden lightbox-slide-up" onClick={(e) => e.stopPropagation()}>
            <button onClick={closeLightbox} className="absolute top-4 right-4 z-30 w-11 h-11 rounded-full bg-black/60 hover:bg-[#f59e0b] text-white flex items-center justify-center transition-all">
              <X size={24} />
            </button>

            <button onClick={prevLightbox} className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 md:w-14 md:h-14 rounded-full bg-black/60 hover:bg-[#f59e0b] text-white flex items-center justify-center transition-all">
              <ChevronLeft size={30} />
            </button>

            <button onClick={nextLightbox} className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 md:w-14 md:h-14 rounded-full bg-black/60 hover:bg-[#f59e0b] text-white flex items-center justify-center transition-all">
              <ChevronRight size={30} />
            </button>

            <div className="relative w-full h-[60vh] md:h-[72vh] bg-transparent">
              <img src={communityData[lightboxIndex].image} alt={communityData[lightboxIndex].title} className="w-full h-full object-contain" />
            </div>

            <div className="p-5 md:p-7 bg-white">
              <div className="flex items-center justify-between gap-4 mb-2">
                <h3 className="text-2xl md:text-3xl font-bold font-serif text-[#1e3a5f]">{communityData[lightboxIndex].title}</h3>

                <span className="text-sm font-semibold text-gray-500 whitespace-nowrap">{lightboxIndex + 1} / {communityData.length}</span>
              </div>

              <p className="text-gray-600 text-base md:text-lg font-medium leading-relaxed">{communityData[lightboxIndex].description}</p>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .lightbox-fade-in { animation: fadeIn 0.3s ease-out forwards; }
        .lightbox-slide-up { animation: slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(30px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
      `}</style>
    </section>
  );
};

export default CommunityEngagement;