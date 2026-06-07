'use client';

import React, { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const navyBlue = '#1a365d';
const goldenYellow = '#f59e0b';


const sliderData = [
    {
        id: 1,
        image: "/assets/heroimg/1.jpeg",
        alt: "Hero Img",
    },
    {
        id: 2,
        image: "/assets/heroimg/12.jpeg",
        alt: "Hero Img",
    },
    {
        id: 3,
        image: "/assets/heroimg/2.jpeg",
        alt: "Hero Img",
    },
    {
        id: 4,
        image: "/assets/heroimg/3.jpeg",
        alt: "Hero Img",
    },
    {
        id: 5,
        image: "/assets/heroimg/4.jpeg",
        alt: "Hero Img",
    },
    {
        id: 6,
        image: "/assets/heroimg/5.jpeg",
        alt: "Hero Img",
    },
    {
        id: 7,
        image: "/assets/heroimg/6.jpeg",
        alt: "Hero Img",
    }
];

const EventSlider = () => {
    const swiperRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(true);

    // Custom Control Handlers
    const goNext = () => swiperRef.current?.swiper.slideNext();
    const goPrev = () => swiperRef.current?.swiper.slidePrev();

    const togglePlayPause = () => {
        if (swiperRef.current?.swiper.autoplay.running) {
            swiperRef.current.swiper.autoplay.stop();
            setIsPlaying(false);
        } else {
            swiperRef.current.swiper.autoplay.start();
            setIsPlaying(true);
        }
    };

    const buttonStyle = `
    absolute top-1/2 -translate-y-1/2 z-30
    flex items-center justify-center
    w-12 h-12 rounded-full shadow-2xl transition-all duration-300
    bg-white hover:bg-[#e2e8f0] 
    border-2 border-[#f59e0b] text-[#1a365d]
    hover:scale-105 active:scale-95
  `;

    return (
        <div className="w-full relative group">

            <Swiper
                ref={swiperRef}
                modules={[Navigation, Autoplay, Pagination]}
                spaceBetween={0} // Full-width flush slides
                slidesPerView={1}
                loop={true} // Crucial for INFINITE SCROLL
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                    el: '.custom-pagination',
                    bulletClass: 'custom-bullet',
                    bulletActiveClass: 'custom-bullet-active',
                }}
                className="w-full h-[550px] md:h-[650px]" // Responsive height
            >
                {sliderData.map((slide) => (
                    <SwiperSlide
                        key={slide.id}
                        className="w-full h-full relative cursor-pointer"
                        onClick={() => window.location.href = '/gallery'}
                    >
                        <img
                            src={slide.image}
                            alt={slide.alt}
                            className="w-full h-full object-cover"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

            <button onClick={goPrev} className={`${buttonStyle} left-3 md:left-10 w-5 h-5 md:w-12 md:h-12`} aria-label="Previous slide">
                <ChevronLeft size={24} className='md:w-8 md:h-8' />
            </button>
            <button onClick={goNext} className={`${buttonStyle} right-3 md:right-10 w-5 h-5 md:w-12 md:h-12`} aria-label="Next slide">
                <ChevronRight size={24} className='md:w-8 md:h-8' />
            </button>

            <div className="absolute bottom-8 right-12 z-30 flex items-center gap-6">
                <div className="custom-pagination flex gap-2.5"></div>
                <button
                    onClick={togglePlayPause}
                    className="flex items-center justify-center w-12 h-8 rounded-full shadow-lg bg-[#1a365d] border-2 border-[#f59e0b] text-white hover:bg-[#2a4d7d] transition-all"
                    aria-label={isPlaying ? 'Pause autoplay' : 'Play autoplay'}
                >
                    {isPlaying ? <Pause size={20} fill="white" /> : <Play size={20} fill="white" />}
                </button>
            </div>

            <style>{`
        .custom-bullet {
          display: block;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #e2e8f0; /* Light gray base */
          cursor: pointer;
          transition: all 0.3s;
          border: 2px solid white;
          box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        }
        .custom-bullet-active {
          background: #f59e0b; /* Thematic Golden Yellow */
          width: 32px; /* Stretched look for active state */
          border-radius: 20px;
          border-color: white;
        }
      `}</style>
        </div>
    );
};

export default EventSlider;