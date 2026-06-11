'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
    Droplets, Mountain, Users, Calendar, ChevronRight,
    Leaf, FlaskConical, ShieldCheck, ArrowRight, Waves, TreePine, Network,
    Eye, Target, X, ChevronLeft
} from 'lucide-react';

const C = {
    navy: '#0f172a',
    blue: '#1e3a5f',
    deepNav: '#0a3055',
    amber: '#f59e0b',
    green: '#166534',
    greenDk: '#14532d',
    greenLt: '#22c55e',
    greenPale: '#dcfce7',
    greenMid: '#15803d',
};

const IMG = {
    hero: '/assets/about/hero-bg.png',
    collage1: '/assets/about/5.jpeg',
    collage2: '/assets/about/sarra_front.jpeg',
    collage3: '/assets/about/wmd.jpg',
    why1: '/assets/about/DJI_20250411113213_0031_D.jpg',
    why2: '/assets/about/sarra_front.jpeg',
    vision: '/assets/about/office.jpeg',
};

const allImages = [
    { image: IMG.hero, title: "About SARRA Hero", description: "Uttarakhand Himalayan river landscape" },
    { image: IMG.collage1, title: "Introduction", description: "Landscape view" },
    { image: IMG.collage2, title: "Fieldwork", description: "Embrace the tradition" },
    { image: IMG.collage3, title: "Spring", description: "Natural spring" },
    { image: IMG.vision, title: "Need for Rejuvenation", description: "Long-term sustainability of state's river systems" },
    { image: IMG.why1, title: "Why SARRA", description: "Scenic Landscape" },
    { image: IMG.why2, title: "Conservation", description: "Perfect Destination for Peaceful Conservation" },
];

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

function Counter({ end, suffix = '' }) {
    const [count, setCount] = useState(0);
    const [ref, visible] = useReveal();
    useEffect(() => {
        if (!visible) return;
        let start = 0;
        const duration = 1600;
        const step = Math.ceil(end / (duration / 16));
        const id = setInterval(() => {
            start += step;
            if (start >= end) { setCount(end); clearInterval(id); }
            else setCount(start);
        }, 16);
        return () => clearInterval(id);
    }, [visible, end]);
    return <span ref={ref}>{count}{suffix}</span>;
}

function HeroSection({ openLightbox }) {
    return (
        <section id="about-hero" className="relative w-full overflow-hidden" style={{ minHeight: '480px' }}>
            <img
                src={IMG.hero}
                alt="Uttarakhand Himalayan river landscape"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ zIndex: 0 }}
            />
            <div
                className="absolute inset-0 cursor-pointer"
                style={{ background: 'linear-gradient(135deg, rgba(15,23,42,0.88) 0%, rgba(30,58,95,0.82) 50%, rgba(10,48,85,0.75) 100%)', zIndex: 1 }}
                onClick={() => openLightbox(0)}
            />

            <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 py-16 md:py-32">

                <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white mb-4 tracking-tight leading-tight"
                    style={{ textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}>
                    About <span className="text-[#f59e0b]">SARRA</span>
                </h1>
                <p className="text-white/80 text-lg md:text-xl max-w-2xl mb-8 font-light leading-relaxed">
                    Spring and River Rejuvenation Authority — Safeguarding Uttarakhand&apos;s lifelines through science, community, and governance.
                </p>
            </div>

            <div className="absolute bottom-0 left-0 right-0 z-10">
                <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
                    <path d="M0 60V30C240 0 480 0 720 30C960 60 1200 60 1440 30V60H0Z" fill="white" />
                </svg>
            </div>
        </section>
    );
}

function IntroductionSection({ openLightbox }) {
    const [ref, visible] = useReveal();


    return (
        <section id="about-intro" className="w-full py-12 md:py-24 px-6 md:px-12 bg-white">
            <div ref={ref} className={`max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="space-y-8">
                    <div>
                        <span className="text-sm font-bold tracking-widest uppercase text-[#f59e0b] block mb-2 font-sans">An introduction about SARRA</span>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold leading-tight text-[#1e3a5f]">
                            Welcome to <span style={{ color: C.amber }}>SARRA</span>
                        </h2>
                    </div>
                    <div className="space-y-4 text-gray-600 text-base leading-relaxed text-justify">
                        <p>
                            Uttarakhand Government has setup Spring and River Rejuvenation Authority (SARRA) in Nov. 2023 anchored in Watershed Department Govt. of Uttarakhand. In the light of the conditions becoming increasingly difficult day by day for local life due to global climate change and man-made factors and continuously drying up water sources in the state of Uttarakhand in the last few decades, there is a need to identify the natural water sources and rain-fed rivers of the state using scientific methods and achieve the goal of revitalization of rivers and continuous flow in water sources by treating them in a phased manner through various soil and moisture conservation interventions like-check dams, contour trenches, recharge pits etc.
                        </p>
                        <p>
                            The purpose of establishment of Spring and River Rejuvenation Authority (SARRA) at State level is to identify all the water sources of the state which need to be rejuvenated on priority to ensure increase in water discharge and perennially of the spring and rain-fed rivers measurement and monitoring by ensuring community participation of local people for sustainable flow of rain-fed rivers etc.
                        </p>
                    </div>
                </div>

                <div className="relative h-[500px] flex items-center justify-center">
                    <div className="absolute top-0 left-0 w-[60%] h-[40%] rounded-2xl overflow-hidden shadow-xl z-10 cursor-pointer" onClick={() => openLightbox(1)}>
                        <img src={IMG.collage1} alt="Landscape" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    </div>

                    <div className="absolute top-[20%] right-0 w-[65%] h-[55%] rounded-2xl overflow-hidden shadow-2xl z-20 border-[6px] border-white cursor-pointer" onClick={() => openLightbox(2)}>
                        <img src={IMG.collage2} alt="Fieldwork" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    </div>

                    <div className="absolute bottom-0 left-10 w-[50%] h-[35%] rounded-2xl overflow-hidden shadow-xl z-10 cursor-pointer" onClick={() => openLightbox(3)}>
                        <img src={IMG.collage3} alt="Spring" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    </div>
                </div>
            </div>
        </section>
    );
}

function NeedForRejuvenationSection({ openLightbox }) {
    const [ref, visible] = useReveal();

    return (
        <section className="w-full py-12 md:py-24 px-6 md:px-12 bg-white">
            <div ref={ref} className={`max-w-7xl mx-auto transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[450px] order-2 lg:order-1 cursor-pointer" onClick={() => openLightbox(4)}>
                        <img src={IMG.vision} alt="Need for Rejuvenation" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                        <div className="absolute bottom-6 left-6 right-6 pointer-events-none">
                            <div className="bg-white/95 backdrop-blur px-6 py-4 rounded-2xl shadow-lg border-b-4 border-[#f59e0b]">
                                <p className="text-[#1e3a5f] font-semibold text-sm">Long-term sustainability of state's river systems.</p>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-6 order-1 lg:order-2 font-sans">
                        <div>
                            <span className="text-xl font-bold tracking-widest uppercase text-[#f59e0b] block mb-2 flex items-center gap-2">
                                <Users size={16} /> Community Engagement
                            </span>
                            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1e3a5f] mb-6 leading-tight">Need for Rejuvenation</h2>
                        </div>
                        <div className="space-y-5 text-slate-600 text-lg leading-relaxed text-justify">
                            <p>
                                The springs and water sources nestled in the mountainous regions of Uttarakhand play a vital role in sustaining the perennial flow of rivers and maintaining ecological balance. However, the availability of water in these sources directly influences river discharge. Over the years, both human activities and natural processes have significantly reduced the mountain's ability to retain water, highlighting the urgent need for rejuvenation and conservation efforts.
                            </p>
                            <p>
                                To achieve this, the interventions of various line departments needs to be integrated. In view of the, after due consideration, the government has decided to establish <span className="font-semibold text-slate-800">Spring and River Rejuvenation Authority (SARRA)</span> under the Watershed Management Directorate. SARRA address these challenges through scientific planning, community participation and nature-based solutions. SARRA aims to revive critical springs, enhance ground water recharge and long-term sustainability of state's river systems.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function GreenBanner() {
    const [ref, visible] = useReveal();
    return (
        <section id="about-banner" className="relative w-full overflow-hidden" style={{ background: `linear-gradient(135deg, ${C.greenDk} 0%, ${C.green} 50%, ${C.greenMid} 100%)` }}>
            <div className="absolute inset-0 opacity-[0.06]"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cpath d='M50 10 Q60 30 50 50 Q40 70 50 90' stroke='white' fill='none' stroke-width='0.5'/%3E%3Cpath d='M20 0 Q30 25 20 50 Q10 75 20 100' stroke='white' fill='none' stroke-width='0.5'/%3E%3Cpath d='M80 0 Q90 25 80 50 Q70 75 80 100' stroke='white' fill='none' stroke-width='0.5'/%3E%3C/svg%3E")`, backgroundSize: '100px 100px' }} />
            <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, white 0%, transparent 70%)' }} />
            <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, white 0%, transparent 70%)' }} />

            <div ref={ref} className={`relative z-10 max-w-4xl mx-auto text-center py-8 md:py-16 px-6 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6 leading-tight" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.2)' }}>
                    Conserving Water, <br className="hidden md:block" />Sustaining Life
                </h2>
                <p className="text-white/75 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-light">
                    From the glacial rivers of Garhwal to the springs of Kumaon, SARRA is building a water-secure future for every village, every family, every generation.
                </p>
                <a href="#" className="inline-flex items-center gap-2 border-2 border-white text-white font-semibold px-8 py-3.5 rounded-lg hover:bg-white hover:text-green-800 transition-all duration-300 group">
                    Explore Initiatives <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </a>
            </div>
        </section>
    );
}
function WhySarraSection({ openLightbox }) {
    const [ref, visible] = useReveal(); // Assuming custom hook

    const features = [
        {
            icon: Users,
            title: 'Community-Led',
            desc: 'Engaging over 2,400 trained volunteers and local Jal Mitras leading spring protection.'
        },
        {
            icon: FlaskConical,
            title: 'Science-Backed',
            desc: 'Interventions grounded in hydro-geological surveys and GIS mapping.'
        },
        {
            icon: ShieldCheck,
            title: 'Government Backed',
            desc: 'Operating under the Watershed Management Directorate with statutory authority.'
        },
    ];

    return (
        <section id="why-sarra" className="w-full bg-white py-12 md:py-24 px-6 md:px-12 overflow-hidden">
            <div
                ref={ref}
                className={`max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
            >

                <div className="relative">
                    <div className="relative w-[75%] mx-auto aspect-[5/4] rounded-3xl overflow-hidden shadow-2xl z-10 cursor-pointer" onClick={() => openLightbox(6)}>
                        <img src={IMG.why2} alt="Conservation" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    </div>

                </div>

                <div className="space-y-8 lg:pl-8 font-sans">
                    <div className="space-y-4">
                        <span className="text-xl font-bold text-[#f59e0b] tracking-widest uppercase">Why SARRA</span>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1e3a5f] leading-[1.15]">
                            Perfect Destination <br /> for Peaceful <br /> Conservation
                        </h2>
                    </div>

                    <div className="space-y-8">
                        {features.map((f, i) => {
                            const Icon = f.icon;
                            return (
                                <div key={i} className="flex items-start gap-5">
                                    {/* Icon Container */}
                                    <div className="bg-[#1e3a5f] border-b-[3px] border-[#f59e0b] p-4 rounded-2xl shadow-lg shrink-0">
                                        <Icon className="text-white" size={24} />
                                    </div>

                                    <div className="space-y-1">
                                        <h3 className="text-lg font-bold text-[#1e3a5f]">{f.title}</h3>
                                        <p className="text-sm text-gray-500 leading-relaxed max-w-md">
                                            {f.desc}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </section>
    );
}


function OrganizationalStructureSection() {
    const [ref, visible] = useReveal();

    return (
        <section
            className="py-12 md:py-24 px-4 relative overflow-hidden bg-[#fafdfa] w-full"
            ref={ref}
        >
            <div
                className={`max-w-7xl mx-auto relative z-10 transition-all duration-1000 ${visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                    }`}
            >
                <div className="text-center md:text-left mb-16 relative z-20 font-sans">
                    <div className="inline-flex items-center space-x-2 bg-amber-50 text-[#f59e0b] px-4 py-1 rounded-full text-sm font-semibold mb-4 border border-[#f59e0b]/20">
                        <Network size={16} />
                        <span className='text-xl'>ORGANIZATION</span>
                    </div>

                    <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1e3a5f]">
                        Structure of SARRA
                    </h2>

                    <p className="text-[#666666] mt-4 max-w-2xl">
                        A multi-tiered approach ensuring effective governance
                        from the state level down to the grassroots.
                    </p>
                </div>

                <div className="relative w-full mt-10 md:min-h-[850px]">
                    <img src="/assets/structure.png" alt="structure" className="w-full h-full object-cover" />
                </div>
            </div>
        </section>
    );
}

export default function AboutPage() {
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const openLightbox = (index) => {
        setCurrentImageIndex(index);
        setIsLightboxOpen(true);
    };

    const closeLightbox = () => {
        setIsLightboxOpen(false);
    };

    const showNextImage = (e) => {
        e?.stopPropagation();
        setCurrentImageIndex((prev) =>
            prev === allImages.length - 1 ? 0 : prev + 1
        );
    };

    const showPrevImage = (e) => {
        e?.stopPropagation();
        setCurrentImageIndex((prev) =>
            prev === 0 ? allImages.length - 1 : prev - 1
        );
    };

    const currentImage = allImages[currentImageIndex];

    return (
        <main className="w-full relative">
            <HeroSection openLightbox={openLightbox} />
            <IntroductionSection openLightbox={openLightbox} />
            <NeedForRejuvenationSection openLightbox={openLightbox} />
            <WhySarraSection openLightbox={openLightbox} />
            <OrganizationalStructureSection />

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
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(30px) scale(0.97); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
            `}</style>
        </main>
    );
}
