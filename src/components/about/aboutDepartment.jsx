'use client';

import React, { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

const Department = ({ initialAnnouncements }) => {
    const announcements = initialAnnouncements || [];
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <section className="relative w-full bg-white overflow-hidden font-sans">

            <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start px-4 md:px-12 py-5 md:py-10">

                <div className="space-y-4">
                    <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#1e3a5f] leading-tight">
                        ABOUT <br /> DEPARTMENT
                    </h2>
                    <div className="w-20 h-1 bg-[#1f4e79]"></div>
                    <p className="text-black leading-relaxed text-md md:text-xl text-justify">
                        Uttarakhand Government has setup Spring and River Rejuvenation Authority (SARRA) in Nov. 2023 anchored in Watershed Department Govt. of Uttarakhand. In the light of the conditions becoming increasingly difficult day by day for local life due to global climate change and man-made factors and continuously drying up water sources in the state...
                    </p>
                    <Link href="/about" className="inline-flex items-center gap-2 bg-[#0a3055] text-white px-5 py-3 rounded shadow-lg hover:bg-[#154b7d] transition-all font-bold uppercase tracking-widest text-sm">
                        Read More <ChevronRight size={18} />
                    </Link>
                </div>
                <div className="space-y-4 rounded-2xl">
                    <img
                        src="/assets/about/sarra-office1.jpeg"
                        alt="Districtwise Map"
                        className="w-full max-h-[420px] rounded-2xl shadow-md cursor-pointer hover:scale-[1.02] transition-transform duration-500 border-4 border-gray-100 object-cover"
                        onClick={() => setIsModalOpen(true)}
                    />
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
                            src="/assets/about/sarra-office1.jpeg"
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