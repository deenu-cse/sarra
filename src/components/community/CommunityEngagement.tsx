"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectCoverflow } from "swiper/modules";
import Image from "next/image";
import { Maximize2, X, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

const communityData = [
  {
    id: 1,
    title: "Community Engagement",
    description: "Explore our initiatives for spring and river conservation efforts.",
    image: "/community/engagement.png",
    link: "#",
  },
  {
    id: 2,
    title: "Checkdam on Song River",
    description: "Checkdam on Song River at Tehri Garhwal",
    image: "/community/checkdam.png",
    link: "#",
  },
  {
    id: 3,
    title: "Jal Utsav Pakhwada",
    description: "Jal utasw pakhwada at Ghamsali, Chamoli",
    image: "/community/festival.png",
    link: "#",
  },
  {
    id: 4,
    title: "Jal Utsav 2025",
    description: "Jal Utsav 2025 at Tehri Garhwa",
    image: "/community/festival.png",
    link: "#",
  },
  {
    id: 5,
    title: "Nadi Mahotsav",
    description: "Nadi Mahotsav at Pati Jairoli, Champawat",
    image: "/community/festival.png",
    link: "#",
  },
  {
    id: 6,
    title: "Plantation Drive",
    description: "Plantation Drive at Pithoragarh",
    image: "/community/engagement.png",
    link: "#",
  },
  {
    id: 7,
    title: "Harela at WMD",
    description: "Harela Festival 2025 at WMD, Dehradun",
    image: "/community/engagement.png",
    link: "#",
  },
];

const CommunityEngagement = () => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  return (
    <section className="py-5 bg-gradient-to-b from-white to-gray-50 overflow-hidden font-sans">
      <div className="container mx-auto px-1 mb-3 text-center">
        <h2 className="text-3xl md:text-5xl font-bold font-serif text-[#1e3a5f] mb-4 tracking-tight uppercase">
          Community Engagement
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium">
          Witness our collective journey towards sustainable water management and environmental conservation.
        </p>
      </div>

      <div className="relative px-2 md:px-8">
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
            slideShadows: false,
          }}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
            el: ".custom-pagination",
          }}
          navigation={{
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom",
          }}
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 30 },
            1024: { slidesPerView: 3, spaceBetween: 40 },
            1440: { slidesPerView: 4, spaceBetween: 50 },
          }}
          className="community-swiper !pb-20"
        >
          {communityData.map((item, index) => (
            <SwiperSlide key={item.id} className="w-[320px] md:w-[400px]">
              <div className="group relative bg-white rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_60px_rgba(245,158,11,0.15)] transition-all duration-500 border border-slate-100 flex flex-col h-full transform hover:-translate-y-2">
                <div className="relative h-72 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openLightbox(index);
                    }}
                    className="absolute top-6 right-6 p-3 bg-white/90 backdrop-blur-md rounded-2xl text-[#1e3a5f] opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0 hover:bg-[#f59e0b] hover:text-white shadow-lg"
                  >
                    <Maximize2 size={20} />
                  </button>
                </div>

                <div
                  className="p-5 py-2 flex flex-col flex-grow cursor-pointer"
                  onClick={() => window.location.href = item.link}
                >
                  <h3 className="text-2xl font-bold font-serif text-[#1e3a5f] mb-3 group-hover:text-[#f59e0b] transition-colors leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-base leading-relaxed mb-8 font-medium">
                    {item.description}
                  </p>

                  <div className="mt-auto flex items-center justify-between">
                    <span className="flex items-center text-[#f59e0b] font-bold text-sm tracking-wide group-hover:gap-2 transition-all">
                      VIEW DETAILS <ExternalLink size={16} className="ml-2" />
                    </span>
                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-[#f59e0b]/10 transition-colors">
                      <ChevronRight size={20} className="text-gray-400 group-hover:text-[#f59e0b]" />
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Pagination Container */}
        <div className="custom-pagination !bottom-4 flex justify-center gap-2"></div>

        {/* Custom Navigation Buttons */}
        <button className="swiper-button-prev-custom absolute left-4 md:left-8 top-[45%] -translate-y-1/2 z-20 p-1 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl text-[#1e3a5f] hover:bg-[#f59e0b] hover:text-white transition-all duration-300 group hidden xl:flex cursor-pointer">
          <ChevronLeft size={28} className="group-hover:-translate-x-1 transition-transform group-hover:text-white text-[#1e3a5f]" />
        </button>
        <button className="swiper-button-next-custom absolute right-4 md:right-8 top-[45%] -translate-y-1/2 z-20 p-1 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl text-[#1e3a5f] hover:bg-[#f59e0b] hover:text-white transition-all duration-300 group hidden xl:flex cursor-pointer">
          <ChevronRight size={28} className="group-hover:translate-x-1 transition-transform group-hover:text-white text-[#1e3a5f]" />
        </button>
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-[999] bg-[#0f172a]/95 flex items-center justify-center p-6 backdrop-blur-lg lightbox-fade-in">
          <button
            onClick={closeLightbox}
            className="absolute top-8 right-8 p-4 bg-white/10 text-white rounded-2xl hover:bg-white/20 transition-all hover:rotate-90 duration-300 z-[1000]"
          >
            <X size={28} />
          </button>

          <div className="relative w-full max-w-6xl h-[80vh] flex flex-col items-center justify-center lightbox-slide-up">
            <div className="relative w-full h-full">
              <Image
                src={communityData[currentImageIndex].image}
                alt={communityData[currentImageIndex].title}
                fill
                className="object-contain"
                priority
              />
            </div>

            <div className="mt-8 text-center max-w-3xl">
              <h4 className="text-white text-3xl font-bold font-serif mb-2 tracking-tight uppercase">{communityData[currentImageIndex].title}</h4>
              <p className="text-gray-300 text-lg font-medium">{communityData[currentImageIndex].description}</p>
            </div>

            {/* Lightbox Navigation */}
            <button
              onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? communityData.length - 1 : prev - 1))}
              className="absolute left-0 md:-left-20 top-1/2 -translate-y-1/2 p-4 text-white/40 hover:text-white transition-all transform hover:scale-110 active:scale-95"
            >
              <ChevronLeft size={64} strokeWidth={1} />
            </button>
            <button
              onClick={() => setCurrentImageIndex((prev) => (prev === communityData.length - 1 ? 0 : prev + 1))}
              className="absolute right-0 md:-right-20 top-1/2 -translate-y-1/2 p-4 text-white/40 hover:text-white transition-all transform hover:scale-110 active:scale-95"
            >
              <ChevronRight size={64} strokeWidth={1} />
            </button>
          </div>
        </div>
      )}

      <style jsx global>{`
        .community-swiper .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: #cbd5e1;
          opacity: 1;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: 2px solid transparent;
        }
        .community-swiper .swiper-pagination-bullet-active {
          width: 45px;
          background: #f59e0b;
          border-radius: 8px;
          box-shadow: 0 4px 10px rgba(245, 158, 11, 0.2);
        }
        .lightbox-fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }
        .lightbox-slide-up {
          animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </section>
  );
};

export default CommunityEngagement;
