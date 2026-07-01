"use client";

import React from 'react';
import { Calendar, Waves, Building2, Info } from 'lucide-react';
import RiverDetailsSection from '../common/RiverDetailsSection';

const IMG = {
    hero: '/assets/research-partners/cgwoffice.avif'
};

function HeroSection() {
    return (
        <section className="relative w-full overflow-hidden min-h-[300px]">
            <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a5f] to-[#0f172a] z-10" />
            <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 py-16 md:py-20">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white mb-4 tracking-tight leading-tight">
                    Research <span className="text-[#f59e0b]">Partners</span>
                </h1>
            </div>
            <div className="absolute bottom-0 left-0 right-0 z-10">
                <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
                    <path d="M0 60V30C240 0 480 0 720 30C960 60 1200 60 1440 30V60H0Z" fill="white" />
                </svg>
            </div>
        </section>
    );
}

export default function PartnerDetailPanelCGWB() {
    const tableColumns = [
        { header: 'River Name', key: 'name' },
        { header: 'District', key: 'district' },
        { header: 'Date of MOU', key: 'mou' },
        { header: 'Inception Report Deadline', key: 'deadline' },
        {
            header: 'Inception Report Received', key: 'received', render: (val) => (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${val === 'Yes (Received)' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                    {val}
                </span>
            )
        },
        { header: 'Final Timeline', key: 'timeline' },
    ];

    const tableData = [];

    return (
        <main className="min-h-screen bg-slate-50 font-sans pb-16">
            <HeroSection />

            <div className="md:max-w-6xl w-full mx-auto p-4 pt-0 font-sans text-slate-800 -mt-12 relative z-20">
                <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
                    <div className="p-4 md:p-8 flex flex-col md:flex-row gap-8 items-center md:items-start">
                        <div className="w-32 h-32 md:w-40 md:h-40 flex-shrink-0 bg-white rounded-xl border border-slate-100 p-2 flex items-center justify-center shadow-sm">
                            <img
                                src="/assets/icons/cgwb.png"
                                alt="CGWB Logo"
                                className="max-w-full max-h-full object-contain"
                            />
                        </div>
                        <div className="space-y-4 flex-1 text-center md:text-left">
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold text-blue-900 leading-tight">Central Ground Water Board</h1>
                                <p className="text-[#f59e0b] font-bold uppercase tracking-wide mt-2 text-sm">Research Support Partner</p>
                            </div>
                            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-slate-700 leading-relaxed text-sm md:text-base">
                                <p>Central Ground Water Board (CGWB) conducted detailed hydrogeological assessments for artificial groundwater recharge across Dehradun, Haridwar, Nainital, and Udham Singh Nagar districts. The study evaluated 170+ proposed sites for recharge shafts, analyzing aquifer disposition, water levels, and recommending feasibility criteria for sustainable groundwater management under the SARRA initiative.</p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <RiverDetailsSection columns={tableColumns} data={tableData} highlightedRivers={[]} />
        </main>
    );
}
