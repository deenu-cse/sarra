'use client';

import React, { useState, useRef } from 'react';
import { ChevronRight, ChevronLeft, Leaf, Sprout, Droplets, Settings, Wheat, ArrowUp } from 'lucide-react';

import Link from 'next/link';

const Department = ({ initialAnnouncements }) => {
    const announcements = initialAnnouncements || [];
    const [isModalOpen, setIsModalOpen] = useState(false);
    const carouselRef = useRef(null);

    const scrollNext = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: carouselRef.current.offsetWidth / 2, behavior: 'smooth' });
        }
    };

    const scrollPrev = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: -(carouselRef.current.offsetWidth / 2), behavior: 'smooth' });
        }
    };

    const dignitaries = [
        {
            name: "Shri Pushkar Singh Dhami",
            title: "Hon'ble Chief Minister",
            slogan: "“धारा मेरा, नौला मेरा, गांव मेरा, प्रयास मेरा”",
            img: "/assets/icons/Pushkar-Singh-Dhami.png"
        },
        {
            name: "Shri Ram Singh Kaira",
            title: "Hon'ble Minister",
            slogan: "“जल संरक्षण में भागीदारी, है हमारी जिम्मेदारी”",
            img: "/assets/icons/ram_singh_kaira.png" // Replace with Minister image
        },
        {
            name: "Shri Dilip Jawalkar, I.A.S",
            title: "CEO SARRA",
            slogan: "“पानी की रक्षा, भविष्य की सुरक्षा!”",
            img: "/assets/icons/CPDShriDJ.png" // Replace with CEO image
        },
        {
            name: "Mrs. Kahkashan Naseem, I.F.S",
            title: "ACEO SARRA",
            slogan: "“जल बचाओ! भविष्य बचाओ!”",
            img: "/assets/icons/kn_aceo-removebg-preview.png" // Replace with ACEO image
        }
    ];



    return (
        <section className="relative w-full min-h-screen bg-white overflow-hidden py-5 px-4 md:px-12 font-sans">

            <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
                <img src="your-terrace-bg-url.png" className="object-cover w-full h-full" alt="" />
            </div>

            <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                <div className="lg:col-span-3 space-y-3">
                    <h2 className="text-2xl font-serif font-bold text-[#1e3a5f] leading-tight">
                        ABOUT <br /> DEPARTMENT
                    </h2>
                    <div className="w-20 h-1 bg-[#f59e0b]"></div>
                    <p className="text-gray-700 leading-relaxed text-sm text-justify">
                        Uttarakhand Government has setup Spring and River Rejuvenation Authority (SARRA) in Nov. 2023 anchored in Watershed Department Govt. of Uttarakhand. In the light of the conditions becoming increasingly difficult day by day for local life due to global climate change and man-made factors and continuously drying up water sources in the state...
                    </p>
                    <Link href="/about" className="inline-flex items-center gap-2 bg-[#0a3055] text-white px-5 py-3 rounded shadow-lg hover:bg-[#154b7d] transition-all font-bold uppercase tracking-widest text-sm">
                        Read More <ChevronRight size={18} />
                    </Link>
                </div>

                <div className="lg:col-span-4 px-4 border-l border-gray-200 flex flex-col space-y-3">
                    <h2 className="text-2xl font-serif font-bold text-[#1e3a5f] leading-tight">
                        Districtwise Map
                    </h2>
                    <div className="w-20 h-1 bg-[#f59e0b]"></div>
                    <img
                        src="/assets/maps/Districtwise.jpeg"
                        alt="Districtwise Map"
                        className="w-full max-w-[390px] rounded-lg shadow-md cursor-pointer hover:scale-103 transition-transform border-4 border-gray-100 cursor-pointer"
                        onClick={() => setIsModalOpen(true)}
                    />
                </div>
                <div className="lg:col-span-5 relative">
                    <div className="bg-[#0a3055] rounded-2xl p-5 px-2 text-white shadow-2xl overflow-hidden relative border-t-4 border-[#f59e0b]">
                        <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>

                        <h3 className="text-center text-2xl font-serif font-bold mb-5 tracking-widest uppercase border-b border-white/10 pb-4">
                            Dignitary Circle
                        </h3>

                        <div className="hidden md:grid grid-cols-2 gap-x-8 gap-y-12">
                            {dignitaries.map((person, idx) => (
                                <div key={idx} className="flex flex-col items-center text-center">
                                    <div className="relative mb-4">
                                        <div className="w-28 h-28 rounded-full border-[3px] border-[#f59e0b] p-1 shadow-xl bg-[#154b7d]">
                                            <img src={person.img} alt={person.name} className="w-full h-full rounded-full object-cover" />
                                        </div>
                                    </div>
                                    <h4 className="font-bold text-base mb-1">{person.name}</h4>
                                    <p className="text-[#f59e0b] text-xs font-semibold mb-2">{person.title}</p>
                                    <p className="text-gray-300 italic text-[11px] leading-tight px-2">
                                        {person.slogan}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="md:hidden relative px-2 sm:px-4 group">
                            <div
                                ref={carouselRef}
                                className="flex overflow-x-auto snap-x snap-mandatory gap-3 sm:gap-4 pb-2 scroll-smooth"
                                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                            >
                                <style dangerouslySetInnerHTML={{
                                    __html: `
                                    .hide-scroll::-webkit-scrollbar { display: none; }
                                `}} />
                                {dignitaries.map((person, idx) => (
                                    <div key={idx} className="snap-center shrink-0 w-[46%] sm:w-[48%] flex flex-col items-center text-center hide-scroll">
                                        <div className="relative mb-3 w-full aspect-[4/5] sm:aspect-[3/4]">
                                            <img src={person.img} alt={person.name} className="w-full h-full rounded-xl border-[3px] border-[#f59e0b] object-cover shadow-lg bg-[#154b7d]" />
                                        </div>
                                        <h4 className="font-bold text-[13px] sm:text-sm mb-1 leading-tight">{person.name}</h4>
                                        <p className="text-[#f59e0b] text-[10px] sm:text-[11px] font-semibold mb-1">{person.title}</p>
                                        <p className="text-gray-300 italic text-[9px] sm:text-[10px] leading-tight px-1">
                                            {person.slogan}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <button onClick={scrollPrev} className="absolute left-0 top-1/3 -translate-y-1/2 -ml-2 bg-[#154b7d]/90 p-1.5 rounded-full text-white hover:bg-[#f59e0b] transition-colors shadow-lg backdrop-blur-sm z-10 border border-white/20">
                                <ChevronLeft size={18} />
                            </button>
                            <button onClick={scrollNext} className="absolute right-0 top-1/3 -translate-y-1/2 -mr-2 bg-[#154b7d]/90 p-1.5 rounded-full text-white hover:bg-[#f59e0b] transition-colors shadow-lg backdrop-blur-sm z-10 border border-white/20">
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {isModalOpen && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                    onClick={() => setIsModalOpen(false)}
                >
                    <div className="relative max-w-5xl w-full max-h-[90vh] flex justify-center">
                        <button
                            className="absolute -top-10 right-0 md:-right-10 text-white hover:text-[#f59e0b] text-4xl font-bold transition-colors"
                            onClick={() => setIsModalOpen(false)}
                        >
                            &times;
                        </button>
                        <img
                            src="/assets/maps/Districtwise.jpeg"
                            alt="Districtwise Map Large"
                            className="w-auto h-auto max-w-full max-h-[85vh] rounded-lg shadow-2xl object-contain border-2 border-white/20"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                </div>
            )}
        </section>
    );
};

export default Department;