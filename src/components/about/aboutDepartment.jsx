'use client';

import React, { useState, useRef } from 'react';
import { ChevronRight, ChevronLeft, Leaf, Sprout, Droplets, Settings, Wheat, ArrowUp } from 'lucide-react';

const Department = () => {
    const [activeTab, setActiveTab] = useState('schemes');
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

    const schemes = [
        { title: "Organic and Natural Farming" },
        { title: "Digital Agriculture Mission in Uttarakhand" },
        { title: "Food and Nutrition Security - Krishonnati Yojana" },
        { title: "Sub Mission on Agriculture Mechanization (SMAM)" },
        { title: "Agriculture Infrastructure Fund (AIF)" },
    ];

    return (
        <section className="relative w-full min-h-screen bg-white overflow-hidden py-5 px-4 md:px-12 font-sans">

            {/* Background Terrace Lines Effect */}
            <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
                <img src="your-terrace-bg-url.png" className="object-cover w-full h-full" alt="" />
            </div>

            <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                {/* Column 1: About Department */}
                <div className="lg:col-span-3 space-y-3">
                    <h2 className="text-2xl font-serif font-bold text-[#1e3a5f] leading-tight">
                        ABOUT <br /> DEPARTMENT
                    </h2>
                    <div className="w-20 h-1 bg-[#f59e0b]"></div>
                    <p className="text-gray-700 leading-relaxed text-lg">
                        The organizational set up of agriculture in India started with the Department of Revenue and Agriculture and commerce in 1871 during the period of Lord Mayo (Governor-General of India).
                    </p>
                    <button className="flex items-center gap-2 bg-[#0a3055] text-white px-5 py-3 rounded shadow-lg hover:bg-[#154b7d] transition-all font-bold uppercase tracking-widest text-sm">
                        Read More <ChevronRight size={18} />
                    </button>
                </div>

                <div className="lg:col-span-4 px-4 border-l border-gray-200">
                    <h3 className="text-2xl font-serif font-bold text-[#1e3a5f] mb-3 tracking-wider uppercase">Information Hub</h3>

                    <div className="flex gap-4 mb-6 border-b border-gray-200">
                        <button
                            onClick={() => setActiveTab('schemes')}
                            className={`flex flex-col items-center gap-2 group transition-all py-2 px-4 cursor-pointer border-b-2 ${activeTab === 'schemes' ? 'border-[#f59e0b]' : 'border-transparent hover:border-gray-300'}`}
                        >
                            <span className={`font-bold text-sm tracking-wider ${activeTab === 'schemes' ? 'text-[#1e3a5f]' : 'text-gray-400'}`}>SCHEMES</span>
                        </button>

                        <button
                            onClick={() => setActiveTab('notices')}
                            className={`flex flex-col items-center gap-2 group transition-all py-2 px-4 cursor-pointer border-b-2 ${activeTab === 'notices' ? 'border-[#f59e0b]' : 'border-transparent hover:border-gray-300'}`}
                        >
                            <span className={`font-bold text-sm tracking-wider ${activeTab === 'notices' ? 'text-[#1e3a5f]' : 'text-gray-400'}`}>NOTICES</span>
                        </button>
                    </div>

                    <ul className="space-y-6 list-disc pl-5">
                        {schemes.map((item, idx) => (
                            <li key={idx} className="cursor-pointer group text-[#f59e0b]">
                                <span className="text-[#1e3a5f] font-semibold text-lg border-b border-transparent group-hover:border-[#f59e0b] group-hover:text-[#0a3055] transition-all">
                                    {item.title}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="lg:col-span-5 relative">
                    <div className="bg-[#0a3055] rounded-2xl p-5 px-2 text-white shadow-2xl overflow-hidden relative border-t-4 border-[#f59e0b]">
                        <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>

                        <h3 className="text-center text-2xl font-serif font-bold mb-5 tracking-widest uppercase border-b border-white/10 pb-4">
                            Dignitary Circle
                        </h3>

                        {/* Desktop View */}
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

                        {/* Mobile View: Swipeable Carousel */}
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

                        <div className="mt-3 flex flex-col items-center opacity-70">
                            <img src="/assets/icons/uk-gov-logo.png" alt="" className='w-16 h-16 object-cover ' />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Department;