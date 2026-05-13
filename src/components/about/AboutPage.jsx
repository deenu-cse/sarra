'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
    Droplets, Mountain, Users, Calendar, ChevronRight,
    Leaf, FlaskConical, ShieldCheck, ArrowRight, Waves, TreePine, Network,
    Eye, Target
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
    collage1: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
    collage2: 'https://images.unsplash.com/photo-1542332213-31f87348057f?w=600&q=80',
    collage3: 'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=600&q=80',
    why1: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80',
    why2: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80',
    why3: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&q=80',
    vision: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=600&q=80',
    mission: 'https://images.unsplash.com/photo-1504567961542-e24d9439a724?w=600&q=80',
};

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

/* ─── Animated counter ─── */
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

/* ═══════════════════════════════════════════════════════
   SECTION 1 — HERO
   ═══════════════════════════════════════════════════════ */
function HeroSection() {
    return (
        <section id="about-hero" className="relative w-full overflow-hidden" style={{ minHeight: '420px' }}>
            <img
                src={IMG.hero}
                alt="Uttarakhand Himalayan river landscape"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ zIndex: 0 }}
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(15,23,42,0.88) 0%, rgba(30,58,95,0.82) 50%, rgba(10,48,85,0.75) 100%)', zIndex: 1 }} />
            <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5c8 0 15 12 15 25s-7 25-15 25S15 43 15 30 22 5 30 5z' fill='white' fill-opacity='0.4'/%3E%3C/svg%3E")`, backgroundSize: '80px 80px', zIndex: 2 }} />

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

function IntroductionSection() {
    const [ref, visible] = useReveal();

    const stats = [
        { num: 500, suffix: '+', label: 'Springs Revived' },
        { num: 13, suffix: '', label: 'Districts' },
        { num: 2400, suffix: '+', label: 'Volunteers' },
        { num: 8, suffix: '+', label: 'Years' },
    ];

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

                    <div className="grid grid-cols-4 gap-y-8 gap-x-4 border-t border-gray-100 pt-8">
                        {stats.map((s, i) => (
                            <div key={i} className="flex flex-col">
                                <span className="text-2xl font-bold text-[#1e3a5f]">
                                    <Counter end={s.num} suffix={s.suffix} />
                                </span>
                                <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mt-1">
                                    {s.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Content / Collage */}
                <div className="relative h-[500px] flex items-center justify-center">
                    <div className="absolute top-0 left-0 w-[60%] h-[40%] rounded-2xl overflow-hidden shadow-xl z-10">
                        <img src={IMG.collage1} alt="Landscape" className="w-full h-full object-cover" />
                    </div>

                    <div className="absolute top-[20%] right-0 w-[65%] h-[55%] rounded-2xl overflow-hidden shadow-2xl z-20 border-[6px] border-white">
                        <img src={IMG.collage2} alt="Fieldwork" className="w-full h-full object-cover" />
                        <div className="absolute bottom-6 -left-4 bg-[#1e3a5f] border-b-4 border-[#f59e0b] p-4 rounded-xl shadow-xl flex flex-col items-center justify-center min-w-[120px] z-30">
                            <Leaf className="text-white mb-1" size={24} />
                            <p className="text-white text-[10px] font-bold uppercase text-center leading-tight">
                                Embrace <br /> the tradition
                            </p>
                        </div>
                    </div>

                    <div className="absolute bottom-0 left-10 w-[50%] h-[35%] rounded-2xl overflow-hidden shadow-xl z-10">
                        <img src={IMG.collage3} alt="Spring" className="w-full h-full object-cover" />
                    </div>
                </div>
            </div>
        </section>
    );
}

function NeedForRejuvenationSection() {
    const [ref, visible] = useReveal();

    return (
        <section className="w-full py-12 md:py-24 px-6 md:px-12 bg-white">
            <div ref={ref} className={`max-w-7xl mx-auto transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[450px] order-2 lg:order-1">
                        <img src={IMG.vision} alt="Need for Rejuvenation" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        <div className="absolute bottom-6 left-6 right-6">
                            <div className="bg-white/95 backdrop-blur px-6 py-4 rounded-2xl shadow-lg border-b-4 border-[#f59e0b]">
                                <p className="text-[#1e3a5f] font-semibold text-sm">Long-term sustainability of state's river systems.</p>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-6 order-1 lg:order-2 font-sans">
                        <div>
                            <span className="text-sm font-bold tracking-widest uppercase text-[#f59e0b] block mb-2 flex items-center gap-2">
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
function WhySarraSection() {
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
                    <div className="absolute -top-12 -left-4 w-56 h-44 rounded-2xl overflow-hidden shadow-lg z-20 hidden md:block">
                        <img src={IMG.why1} alt="Landscape" className="w-full h-full object-cover" />
                    </div>

                    <div className="relative w-[75%] mx-auto aspect-[5/4] rounded-3xl overflow-hidden shadow-2xl z-10">
                        <img src={IMG.why2} alt="Conservation" className="w-full h-full object-cover" />
                    </div>

                    <div className="absolute -bottom-10 right-0 md:right-10 bg-white/95 backdrop-blur-sm p-6 px-4 rounded-3xl shadow-xl z-30 w-[80%] md:w-[60%] border-b-4 border-[#f59e0b]">
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <h4 className="text-xl font-bold text-[#1e3a5f] mb-1">Serenity</h4>
                                <p className="text-xs text-gray-500 leading-relaxed">
                                    Preserving the quietude of Himalayan water sources.
                                </p>
                            </div>
                            <div className="border-l border-gray-200 pl-8">
                                <h4 className="text-xl font-bold text-[#1e3a5f] mb-1">Tranquility</h4>
                                <p className="text-xs text-gray-500 leading-relaxed">
                                    Ensuring sustainable flow for future generations.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-8 lg:pl-8 font-sans">
                    <div className="space-y-4">
                        <span className="text-sm font-bold text-[#f59e0b] tracking-widest uppercase">Why SARRA</span>
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
                        <span>ORGANIZATION</span>
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
                    {/* SVG Connector - Only visible on desktop */}
                    <svg
                        className="absolute top-0 left-0 w-full h-full z-0 hidden md:block"
                        preserveAspectRatio="none"
                    >
                        <path
                            d="M 340 170 L 340 670"
                            stroke="#1e3a5f"
                            strokeWidth="2"
                            strokeDasharray="6 6"
                            fill="none"
                        />
                        <path
                            d="M 930 70 L 930 730"
                            stroke="#1e3a5f"
                            strokeWidth="2"
                            strokeDasharray="6 6"
                            fill="none"
                        />
                        <path
                            d="M 340 300 C 500 300, 600 230, 930 230"
                            stroke="#1e3a5f"
                            strokeWidth="2"
                            strokeDasharray="6 6"
                            fill="none"
                        />
                    </svg>

                    {/* Desktop Layout (Absolute) vs Mobile Layout (Flex Stack) */}
                    <div className="flex flex-col md:block gap-8 relative z-10">
                        {/* RIGHT SIDE (Policy/State Level) - Shown first on mobile if needed, or structured */}
                        <div className="flex flex-col gap-6 md:contents">
                            {/* HPC */}
                            <div className="md:absolute md:top-[0px] md:right-[5%] relative w-full md:w-[460px] z-10">
                                <div className="bg-[#1e3a5f] border-b-[4px] border-[#f59e0b] rounded-3xl p-6 text-center shadow-2xl">
                                    <h4 className="font-bold text-white text-lg md:text-2xl uppercase leading-snug font-sans">
                                        High Power Committee (HPC)
                                    </h4>
                                    <p className="text-white/80 text-sm md:text-base mt-3">
                                        Chaired by Chief Secretary, Uttarakhand
                                    </p>
                                </div>
                            </div>

                            {/* SLEC */}
                            <div className="md:absolute md:top-[220px] md:right-[5%] relative w-full md:w-[460px] z-10">
                                <div className="bg-[#0f172a] border-b-[4px] border-[#f59e0b] rounded-3xl p-6 text-center shadow-2xl">
                                    <h4 className="font-bold text-white text-lg md:text-2xl uppercase leading-snug font-sans">
                                        State Level Executive Committee (SLEC)
                                    </h4>
                                    <p className="text-white/80 text-sm md:text-base mt-3">
                                        Chaired by Secretary, Watershed
                                    </p>
                                </div>
                            </div>

                            {/* DLEC */}
                            <div className="md:absolute md:top-[460px] md:right-[5%] relative w-full md:w-[460px] z-10">
                                <div className="bg-[#1e3a5f] opacity-95 border-b-[4px] border-[#f59e0b] rounded-3xl p-6 text-center shadow-2xl">
                                    <h4 className="font-bold text-white text-lg md:text-2xl uppercase leading-snug font-sans">
                                        District Level Executive Committee (DLEC)
                                    </h4>
                                    <p className="text-white/80 text-sm md:text-base mt-3">
                                        Chaired by District Magistrate Of Concerning Districts
                                    </p>
                                </div>
                            </div>

                            {/* DHARA */}
                            <div className="md:absolute md:top-[720px] md:right-[5%] relative w-full md:w-[460px] z-10">
                                <div className="bg-[#0f172a] border-b-[4px] border-[#f59e0b] rounded-3xl p-6 text-center shadow-2xl">
                                    <h4 className="font-bold text-white text-lg md:text-2xl uppercase leading-snug font-sans">
                                        Dhara-Naula Sanrakshan Samiti
                                    </h4>
                                    <p className="text-white/80 text-sm md:text-base mt-3">
                                        Anchored at Gram Panchayats
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* LEFT SIDE (Implementation Level) */}
                        <div className="flex flex-col gap-6 md:contents mt-8 md:mt-0">
                            {/* SARRA */}
                            <div className="md:absolute md:top-[170px] md:left-[8%] relative w-full md:w-[420px] z-10">
                                <div className="bg-[#1e3a5f] border-b-[4px] border-[#f59e0b] rounded-3xl p-6 text-center shadow-2xl">
                                    <h4 className="font-bold text-white text-lg md:text-2xl uppercase leading-snug font-sans">
                                        Spring and River Rejuvenation Authority (SARRA)
                                    </h4>
                                    <p className="text-white/80 text-sm md:text-base mt-3">
                                        Anchored at WMD, Uttarakhand
                                    </p>
                                </div>
                            </div>

                            {/* DSC */}
                            <div className="md:absolute md:top-[420px] md:left-[8%] relative w-full md:w-[420px] z-10">
                                <div className="bg-[#0f172a] border-b-[4px] border-[#f59e0b] rounded-3xl p-6 text-center shadow-2xl">
                                    <h4 className="font-bold text-white text-lg md:text-2xl uppercase leading-snug font-sans">
                                        District SARRA Centre (DSC)
                                    </h4>
                                    <p className="text-white/80 text-sm md:text-base mt-3">
                                        Nodal Office at District Level
                                    </p>
                                </div>
                            </div>

                            {/* PIA */}
                            <div className="md:absolute md:top-[670px] md:left-[8%] relative w-full md:w-[420px] z-10">
                                <div className="bg-[#1e3a5f] opacity-95 border-b-[4px] border-[#f59e0b] rounded-3xl p-6 text-center shadow-2xl">
                                    <h4 className="font-bold text-white text-lg md:text-2xl uppercase leading-snug font-sans">
                                        Project Implementation Agencies (PIA)
                                    </h4>
                                    <p className="text-white/80 text-sm md:text-base mt-3">
                                        Different Line Departments
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default function AboutPage() {
    return (
        <main className="w-full">
            <HeroSection />
            <IntroductionSection />
            <NeedForRejuvenationSection />
            <WhySarraSection />
            <OrganizationalStructureSection />
        </main>
    );
}
