"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectCoverflow } from "swiper/modules";
import Image from "next/image";
import { Maximize2, X, ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

const communityData = [
  {
    id: 1,
    title: "Community Engagement",
    description: "Explore our initiatives for spring and river conservation efforts.",
    image: "/assets/homeimgslider/Ck dame on song river at tehrie.jpeg",
    link: "#",
  },
  {
    id: 2,
    title: "Checkdam on Song River",
    description: "Checkdam on Song River at Tehri Garhwal",
    image: "/assets/homeimgslider/Jal utasw pakhwada at ghamsali, chamoli.jpeg",
    link: "#",
  },
  {
    id: 3,
    title: "Jal Utsav Pakhwada",
    description: "Jal utasw pakhwada at Ghamsali, Chamoli",
    image: "/assets/homeimgslider/Jal utsav 25 tehri.jpg",
    link: "#",
  },
  {
    id: 4,
    title: "Jal Utsav 2025",
    description: "Jal Utsav 2025 at Tehri Garhwa",
    image: "/assets/homeimgslider/nadi mahotsaw at Pati Jairoli, champawat.jpeg",
    link: "#",
  },
  {
    id: 5,
    title: "Nadi Mahotsav",
    description: "Nadi Mahotsav at Pati Jairoli, Champawat",
    image: "/assets/homeimgslider/nadi mahotsaw at Pati Jairoli, champawat.jpeg",
    link: "#",
  },
  {
    id: 6,
    title: "Plantation Drive",
    description: "Plantation Drive at Pithoragarh",
    image: "/assets/homeimgslider/Plantation drive at Pithoragarh.jpg",
    link: "#",
  },
  {
    id: 7,
    title: "Harela at WMD",
    description: "Harela Festival 2025 at WMD, Dehradun",
    image: "/assets/homeimgslider/Hrela at wmd.jpg",
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

  const showNextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentImageIndex((prev) =>
      prev === communityData.length - 1 ? 0 : prev + 1
    );
  };

  const showPrevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentImageIndex((prev) =>
      prev === 0 ? communityData.length - 1 : prev - 1
    );
  };

  const currentImage = communityData[currentImageIndex];

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
          effect="coverflow"
          centeredSlides={true}
          slidesPerView="auto"
          onClick={(swiper) => {
            if (typeof swiper.clickedIndex === 'number' && swiper.clickedIndex >= 0) {
              openLightbox(swiper.clickedIndex);
            }
          }}
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
          className="community-swiper !pb-8 cursor-pointer"
        >
          {communityData.map((item, index) => (
            <SwiperSlide key={item.id} className="w-[320px] md:w-[400px]">
              <div
                className="group relative bg-white rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_60px_rgba(245,158,11,0.15)] transition-all duration-500 border border-slate-100 flex flex-col h-full transform hover:-translate-y-2"
              >
                <div className="relative h-72 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                </div>

                <div className="p-5 py-2 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold font-serif text-[#1e3a5f] mb-3 group-hover:text-[#f59e0b] transition-colors leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-base leading-relaxed mb-8 font-medium">
                    {item.description}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="custom-pagination !bottom-4 flex justify-center gap-2"></div>

        <button className="swiper-button-prev-custom absolute left-4 md:left-8 top-[45%] -translate-y-1/2 z-20 p-1 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl text-[#1e3a5f] hover:bg-[#f59e0b] hover:text-white transition-all duration-300 group hidden xl:flex cursor-pointer">
          <ChevronLeft size={28} />
        </button>

        <button className="swiper-button-next-custom absolute right-4 md:right-8 top-[45%] -translate-y-1/2 z-20 p-1 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl text-[#1e3a5f] hover:bg-[#f59e0b] hover:text-white transition-all duration-300 group hidden xl:flex cursor-pointer">
          <ChevronRight size={28} />
        </button>
      </div>

      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center backdrop-blur-sm p-4 lightbox-fade-in"
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
              onClick={showPrevImage}
              className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 md:w-14 md:h-14 rounded-full bg-black/60 hover:bg-[#f59e0b] text-white flex items-center justify-center transition-all"
            >
              <ChevronLeft size={30} />
            </button>

            <button
              onClick={showNextImage}
              className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 md:w-14 md:h-14 rounded-full bg-black/60 hover:bg-[#f59e0b] text-white flex items-center justify-center transition-all"
            >
              <ChevronRight size={30} />
            </button>

            <div className="relative w-full h-[60vh] md:h-[72vh] bg-transparent">
              <img
                src={currentImage.image}
                alt={currentImage.title}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="p-5 md:p-7 bg-white">
              <div className="flex items-center justify-between gap-4 mb-2">
                <h3 className="text-2xl md:text-3xl font-bold font-serif text-[#1e3a5f]">
                  {currentImage.title}
                </h3>

                <span className="text-sm font-semibold text-gray-500 whitespace-nowrap">
                  {currentImageIndex + 1} / {communityData.length}
                </span>
              </div>

              <p className="text-gray-600 text-base md:text-lg font-medium leading-relaxed">
                {currentImage.description}
              </p>
            </div>
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
};

export default CommunityEngagement;