'use client';

import React from 'react';
import { Mountain, Droplet } from 'lucide-react';

const IMG = {
    hero: '/assets/one_river/banner.png',
};

const KUMAON_DATA = [
    { sr: '1.', district: 'Almora', river: 'Jata Ganga' },
    { sr: '2.', district: 'Bageshwar', river: 'Garud Ganga' },
    { sr: '3.', district: 'Champawat', river: 'Gaudi River' },
    { sr: '4.', district: 'Nainital', river: 'Shipra River' },
    { sr: '5.', district: 'Pithoragarh', river: 'Purvi Ramganga' },
];

const GARHWAL_DATA = [
    { sr: '1.', district: 'Chamoli', river: 'Chandra Bhaga' },
    { sr: '2.', district: 'Dehradun', river: 'Song River' },
    { sr: '3.', district: 'Haridwar', river: 'Pathari River' },
    { sr: '4.', district: 'Pauri Garhwal', river: 'Nayar (East & West)' },
    { sr: '5.', district: 'Rudraprayag', river: 'Punaar Nadi' },
    { sr: '6.', district: 'Tehri', river: 'Song River' },
    { sr: '7.', district: 'Uttarkashi', river: 'Kamal Nadi' },
];

function HeroSection() {
    return (
        <section className="relative w-full overflow-hidden" style={{ minHeight: '450px' }}>
            <img
                src={IMG.hero}
                alt="One River One District Banner"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ zIndex: 0 }}
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(15,23,42,0.88) 0%, rgba(30,58,95,0.82) 50%, rgba(10,48,85,0.75) 100%)', zIndex: 1 }} />
            <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5c8 0 15 12 15 25s-7 25-15 25S15 43 15 30 22 5 30 5z' fill='white' fill-opacity='0.4'/%3E%3C/svg%3E")`, backgroundSize: '80px 80px', zIndex: 2 }} />

            <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 py-24 md:py-32">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white mb-4 tracking-tight leading-tight"
                    style={{ textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}>
                    One River <span className="text-[#f59e0b]">One District</span>
                </h1>
                <p className="text-white/80 text-lg md:text-xl max-w-2xl mb-8 font-light leading-relaxed">
                    A flagship initiative for holistic rejuvenation and sustainable management of rivers.
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

function ContentSection() {
    return (
        <section className="w-full py-8 px-4 md:px-8 lg:px-12 bg-white">
            <div className="max-w-[1100px] mx-auto flex flex-col xl:flex-row gap-6">
                <div className="w-full flex flex-col">
                    <div className="bg-[#f8fafc] rounded-[24px] shadow-sm border border-blue-100 overflow-hidden flex-grow flex flex-col relative pb-8">
                        <div className="p-8 relative z-10">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-14 h-14 rounded-full bg-[#0a3055] flex items-center justify-center text-white shrink-0 shadow-inner">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7"><path d="M2 12h4l3-9 5 18 3-9h5" /></svg>
                                </div>
                                <h2 className="text-[22px] font-bold text-[#0a3055] leading-tight">
                                    About One River<br />One District
                                </h2>
                            </div>

                            <div className="w-20 h-[3px] bg-[#5c8a3f] mb-6"></div>

                            <div className="flex flex-col lg:flex-row gap-6 items-center">
                                <div className="w-full lg:w-3/5 space-y-4 text-[15px] lg:text-[22px] text-gray-700 leading-relaxed font-medium">
                                    <p>
                                        The One District-One River Scheme is a flagship initiative aimed at holistic rejuvenation, conservation, and sustainable management of rivers at the district level.
                                    </p>
                                    <p>
                                        Under this scheme, each district has identified a priority river based on local hydrological significance, socio-economic dependence, and ecological value.
                                    </p>
                                    <p>
                                        The scheme emphasizes river-centric planning supported by scientific, data-driven assessments.
                                    </p>
                                </div>

                                <div className="hidden lg:flex w-full lg:w-[45%] justify-center -mr-8">
                                    <img
                                        src="/assets/one_river/aboutimg2.png"
                                        alt="About Scheme"
                                        className="max-w-full h-auto object-contain"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 opacity-30 z-0">
                            <svg viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                                <path fill="#3b82f6" fillOpacity="1" d="M0,160L48,176C96,192,192,224,288,208C384,192,480,128,576,128C672,128,768,192,864,213.3C960,235,1056,213,1152,186.7C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                            </svg>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 opacity-40 z-0">
                            <svg viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                                <path fill="#0ea5e9" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,181.3C384,203,480,213,576,192C672,171,768,117,864,112C960,107,1056,149,1152,170.7C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full flex flex-col gap-6 mt-10">
                <div className="w-full flex flex-col lg:flex-row gap-6 h-full">
                    <div className="w-full lg:w-1/2 flex flex-col">
                        <div className="bg-[#4a7c29] rounded-t-xl py-6 flex items-center justify-center gap-3 relative overflow-hidden">
                            <div className="absolute inset-0 opacity-20 bg-[url('/assets/one_river/banner.png')] bg-cover bg-center mix-blend-overlay"></div>
                            <h3 className="text-[19px] font-bold text-white z-10 tracking-widest">KUMAON REGION</h3>
                        </div>
                        <div className="bg-white border-x border-b border-[#4a7c29]/30 rounded-b-xl overflow-hidden shadow-sm h-full flex flex-col">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-[#e9f1e1]">
                                        <th className="py-3.5 px-4 text-[#4a7c29] font-bold text-[15px] text-center border-r border-white/60 w-20">Sr. No</th>
                                        <th className="py-3.5 px-4 text-[#4a7c29] font-bold text-[15px] border-r border-white/60 w-40">District Name</th>
                                        <th className="py-3.5 px-4 text-[#4a7c29] font-bold text-[15px]">Name of River</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    {KUMAON_DATA.map((row, idx) => (
                                        <tr key={idx} className="border-b border-gray-100 last:border-none hover:bg-gray-50 transition-colors">
                                            <td className="py-3.5 px-4 text-center font-bold text-gray-800 border-r border-gray-100">{row.sr}</td>
                                            <td className="py-3.5 px-4 text-gray-700 font-medium border-r border-gray-100">{row.district}</td>
                                            <td className="py-3.5 px-4 text-gray-700 font-medium">{row.river}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="w-full lg:w-1/2 flex flex-col">
                        <div className="bg-[#05417b] rounded-t-xl py-6 flex items-center justify-center gap-3 relative overflow-hidden">
                            <div className="absolute inset-0 opacity-20 bg-[url('/assets/one_river/banner.png')] bg-cover bg-center mix-blend-overlay"></div>
                            <h3 className="text-[19px] font-bold text-white z-10 tracking-widest">GARHWAL REGION</h3>
                        </div>
                        <div className="bg-white border-x border-b border-[#05417b]/30 rounded-b-xl overflow-hidden shadow-sm h-full flex flex-col">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-[#e0effe]">
                                        <th className="py-3.5 px-4 text-[#05417b] font-bold text-[15px] text-center border-r border-white/60 w-20">Sr. No</th>
                                        <th className="py-3.5 px-4 text-[#05417b] font-bold text-[15px] border-r border-white/60 w-40">District Name</th>
                                        <th className="py-3.5 px-4 text-[#05417b] font-bold text-[15px]">Name of River</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    {GARHWAL_DATA.map((row, idx) => (
                                        <tr key={idx} className="border-b border-gray-100 last:border-none hover:bg-gray-50 transition-colors">
                                            <td className="py-3.5 px-4 text-center font-bold text-gray-800 border-r border-gray-100">{row.sr}</td>
                                            <td className="py-3.5 px-4 text-gray-700 font-medium border-r border-gray-100">{row.district}</td>
                                            <td className="py-3.5 px-4 text-gray-700 font-medium">{row.river}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="bg-[#97c0e6] rounded-[16px] p-5 flex flex-col sm:flex-row items-center gap-5 text-white shadow-md border border-[#1a5b9e] w-[80%] mx-auto">
                    <div className="w-[52px] h-[52px] rounded-full bg-white flex items-center justify-center shrink-0 shadow-inner">
                        <Droplet size={26} className="text-[#0f4b89]" fill="#0f4b89" />
                    </div>
                    <div className="text-center sm:text-left">
                        <p className="font-semibold text-blue-500 text-[15px]">Our rivers are our lifelines.</p>
                        <p className="font-bold text-[17px] tracking-wide mt-0.5">
                            Let's protect, restore and rejuvenate them – <span className="text-[#57ba47]">Together.</span>
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
}

export default function OneRiverPage() {
    return (
        <main className="w-full font-sans">
            <HeroSection />
            <ContentSection />
        </main>
    );
}
