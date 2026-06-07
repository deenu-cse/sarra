'use client';

import React, { useState, useRef, useEffect } from 'react';

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

const Dignitaries = () => {
    const [revealRef, revealVisible] = useReveal();
    const [cardsRef, cardsVisible] = useReveal();

    const dignitaries = [
        {
            name: "Shri Pushkar Singh Dhami",
            title: "Hon'ble Chief Minister",
            subtitle: "धारा मेरा, नौला मेरा, गांव मेरा, प्रयास मेरा ",
            img: "/assets/icons/Pushkar-Singh-Dhami.png"
        },
        {
            name: "Shri Ram Singh Kaira",
            title: "Hon'ble Minister",
            subtitle: "जल संरक्षण में भागीदारी, है हमारी जिम्मेदारी",
            img: "/assets/icons/ram_singh_kaira.png"
        },
        {
            name: "Shri Dilip Jawalkar, I.A.S",
            title: "CEO SARRA",
            subtitle: "पानी की रक्षा, भविष्य की सुरक्षा!",
            img: "/assets/icons/CPDShriDJ.png"
        },
        {
            name: "Mrs. Kahkashan Naseem, I.F.S",
            title: "ACEO SARRA",
            subtitle: "जल बचाओ! भविष्य बचाओ!",
            img: "/assets/icons/kn_aceo-removebg-preview.png"
        }
    ];

    return (
        <>
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

                <div className="relative z-10 max-w-[1440px] mx-auto px-4 md:px-12 py-3 md:py-6 bg-white">
                    <div
                        ref={revealRef}
                        className={`text-center mb-6 md:mb-8 transition-all duration-700 ${revealVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                    >
                    </div>

                    <div
                        ref={cardsRef}
                        className={`grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 lg:gap-7 justify-items-center transition-all duration-1000 ${cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                    >
                        {dignitaries.map((person, idx) => (
                            <div
                                key={idx}
                                className="group relative flex flex-col rounded-2xl overflow-hidden shadow-lg w-full max-w-[220px]"
                                style={{
                                    transitionDelay: `${idx * 150}ms`,
                                    animation: cardsVisible ? `fadeSlideUp 0.7s ${idx * 0.15}s both` : 'none'
                                }}
                            >
                                <div className="relative w-full aspect-[4/5] sm:aspect-square overflow-hidden bg-white flex items-center justify-center p-4 shadow-xl">
                                    <img
                                        src={person.img}
                                        alt={person.name}
                                        className="max-w-[100%] max-h-[100%] object-contain transition-transform duration-700 ease-out group-hover:scale-105 dignitary-img"
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

                                <div className="relative flex-grow flex flex-col items-center justify-center text-center p-2 md:p-3 md:pt-1 bg-white z-10 border-t-2 border-white group-hover:border-[#f59e0b] transition-colors duration-500">
                                    <h4 className="font-bold text-[#0a1e33] text-sm md:text-base lg:text-lg leading-tight mb-1 drop-shadow-sm transition-colors">
                                        {person.name}
                                    </h4>
                                    <p className="text-[#f59e0b] text-xs md:text-sm font-semibold tracking-wide">
                                        {person.title}
                                    </p>
                                    <p className="text-[#374151] text-[12px] md:text-sm mt-1 font-light uppercase tracking-wider font-semibold">
                                        "{person.subtitle}"
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
                .dignitary-img {
                    image-rendering: -webkit-optimize-contrast;
                    image-rendering: crisp-edges;
                    image-rendering: pixelated;
                }
            `}} />
        </>
    );
};

export default Dignitaries;
