'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

/* ─── Animate-on-scroll hook ─── */
function useReveal() {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
            { threshold: 0.15 }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);
    return [ref, visible];
}

const Department = ({ initialAnnouncements }) => {
    const announcements = initialAnnouncements || [];
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [revealRef, revealVisible] = useReveal();
    const [cardsRef, cardsVisible] = useReveal();

    const dignitaries = [
        {
            name: "Shri Pushkar Singh Dhami",
            title: "Hon'ble Chief Minister",
            subtitle: "Government of Uttarakhand",
            img: "/assets/icons/Pushkar-Singh-Dhami.png"
        },
        {
            name: "Shri Ram Singh Kaira",
            title: "Hon'ble Minister",
            subtitle: "Watershed Department",
            img: "/assets/icons/ram_singh_kaira.png"
        },
        {
            name: "Shri Dilip Jawalkar, I.A.S",
            title: "CEO SARRA",
            subtitle: "Chief Executive Officer",
            img: "/assets/icons/CPDShriDJ.png"
        },
        {
            name: "Mrs. Kahkashan Naseem, I.F.S",
            title: "ACEO SARRA",
            subtitle: "Addl. Chief Executive Officer",
            img: "/assets/icons/kn_aceo-removebg-preview.png"
        }
    ];

    return (
        <section className="relative w-full bg-white overflow-hidden font-sans">

            <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start px-4 md:px-12 py-8 md:py-14">

                <div className="space-y-4">
                    <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#1e3a5f] leading-tight">
                        ABOUT <br /> DEPARTMENT
                    </h2>
                    <div className="w-20 h-1 bg-[#f59e0b]"></div>
                    <p className="text-gray-700 leading-relaxed text-sm md:text-base text-justify">
                        Uttarakhand Government has setup Spring and River Rejuvenation Authority (SARRA) in Nov. 2023 anchored in Watershed Department Govt. of Uttarakhand. In the light of the conditions becoming increasingly difficult day by day for local life due to global climate change and man-made factors and continuously drying up water sources in the state...
                    </p>
                    <Link href="/about" className="inline-flex items-center gap-2 bg-[#0a3055] text-white px-5 py-3 rounded shadow-lg hover:bg-[#154b7d] transition-all font-bold uppercase tracking-widest text-sm">
                        Read More <ChevronRight size={18} />
                    </Link>
                </div>
                <div className="space-y-4">
                    <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#1e3a5f] leading-tight">
                        Districtwise Map
                    </h2>
                    <div className="w-20 h-1 bg-[#f59e0b]"></div>
                    <img
                        src="/assets/maps/Districtwise.jpeg"
                        alt="Districtwise Map"
                        className="w-full max-h-[420px] object-contain rounded-lg shadow-md cursor-pointer hover:scale-[1.02] transition-transform duration-500 border-4 border-gray-100"
                        onClick={() => setIsModalOpen(true)}
                    />
                </div>
            </div>

            <div className="relative w-full overflow-hidden"
                style={{
                    background: 'linear-gradient(135deg, #0a3055 0%, #122d4d 40%, #1a3f62 70%, #0f2942 100%)'
                }}
            >
                <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-[0.07]"
                    style={{ background: 'radial-gradient(circle, #f59e0b 0%, transparent 70%)' }}
                />
                <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full opacity-[0.05]"
                    style={{ background: 'radial-gradient(circle, #ffffff 0%, transparent 70%)' }}
                />
                <div className="absolute top-0 left-0 w-full h-[1px]"
                    style={{ background: 'linear-gradient(90deg, transparent 0%, #f59e0b 50%, transparent 100%)' }}
                />

                <div className="relative z-10 max-w-[1440px] mx-auto px-4 md:px-12 py-4 md:py-6">
                    <div
                        ref={revealRef}
                        className={`text-center mb-6 md:mb-8 transition-all duration-700 ${revealVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                    >
                    </div>

                    <div
                        ref={cardsRef}
                        className={`grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 lg:gap-7 transition-all duration-1000 ${cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                    >
                        {dignitaries.map((person, idx) => (
                            <div
                                key={idx}
                                className="group relative flex flex-col rounded-2xl overflow-hidden shadow-2xl"
                                style={{
                                    transitionDelay: `${idx * 150}ms`,
                                    animation: cardsVisible ? `fadeSlideUp 0.7s ${idx * 0.15}s both` : 'none'
                                }}
                            >
                                <div className="relative w-full aspect-[4/5] sm:aspect-square overflow-hidden bg-[#154b7d]">
                                    <img
                                        src={person.img}
                                        alt={person.name}
                                        className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    <div className="absolute top-0 left-0 w-10 h-10 md:w-14 md:h-14">
                                        <div className="absolute top-0 left-0 w-full h-[2px] bg-[#f59e0b]"></div>
                                        <div className="absolute top-0 left-0 h-full w-[2px] bg-[#f59e0b]"></div>
                                    </div>
                                    <div className="absolute top-0 right-0 w-10 h-10 md:w-14 md:h-14">
                                        <div className="absolute top-0 right-0 w-full h-[2px] bg-[#f59e0b]"></div>
                                        <div className="absolute top-0 right-0 h-full w-[2px] bg-[#f59e0b]"></div>
                                    </div>
                                </div>

                                {/* Info section under the image */}
                                <div className="relative flex-grow flex flex-col items-center justify-center text-center p-4 bg-[#0a1e33] z-10 border-t-2 border-[#0a1e33] group-hover:border-[#f59e0b] transition-colors duration-500">
                                    <h4 className="font-bold text-white text-sm md:text-base lg:text-lg leading-tight mb-1 drop-shadow-lg group-hover:text-[#f59e0b] transition-colors">
                                        {person.name}
                                    </h4>
                                    <p className="text-[#f59e0b] text-xs md:text-sm font-semibold tracking-wide">
                                        {person.title}
                                    </p>
                                    <p className="text-white/60 text-[10px] md:text-xs mt-1 font-light uppercase tracking-wider">
                                        {person.subtitle}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 w-full h-[1px]"
                    style={{ background: 'linear-gradient(90deg, transparent 0%, #f59e0b 50%, transparent 100%)' }}
                />
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

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes fadeSlideUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}} />
        </section>
    );
};

export default Department;