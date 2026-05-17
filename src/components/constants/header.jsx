"use client";
import React, { useEffect } from 'react';
import { Lock } from 'lucide-react';
import Link from 'next/link';

const Header = () => {
    // Font resize logic
    const handleResize = (step) => {
        const root = document.documentElement;
        const currentSize = parseFloat(getComputedStyle(root).fontSize);
        // Base size is usually 16px. Limit range: 12px to 20px
        const newSize = Math.max(12, Math.min(20, currentSize + step));
        root.style.fontSize = `${newSize}px`;
    };

    const resetResize = () => {
        document.documentElement.style.fontSize = '16px';
    };

    return (
        <header className="w-full font-sans">
            {/* Top Bar - Responsive */}
            <div className="bg-[#0f172a] text-gray-300 py-2 px-3 sm:px-4 flex justify-between items-center text-xs border-b border-[#f59e0b]">
                <div className="hidden sm:flex gap-2 sm:gap-4 items-center">
                    <button className="hover:text-white transition text-sm">Skip to main content</button>
                    <button className="hover:text-white transition text-sm">Screen Reader</button>
                    <div className="flex gap-2 ml-2 border-l border-gray-600 pl-4">
                        <button onClick={() => handleResize(-1)} className="hover:text-white text-sm">A-</button>
                        <button onClick={resetResize} className="hover:text-white text-sm">A</button>
                        <button onClick={() => handleResize(1)} className="hover:text-white text-sm">A+</button>
                    </div>
                    <button className="ml-2 font-semibold text-sm">हिंदी</button>
                </div>

                <div className="flex gap-2 sm:gap-6 items-center w-full sm:w-auto justify-end">
                    <Link href="/sitemap.xml" className="hover:text-white transition text-xs sm:text-sm">Sitemap</Link>
                    <button className="hover:text-white transition text-xs sm:text-sm">RTI</button>
                    <Link href="/contact" className="hover:text-white transition text-xs sm:text-sm">Contact</Link>
                    <Link href="/login" className="flex items-center gap-1 text-[#f59e0b] font-medium text-xs sm:text-sm whitespace-nowrap">
                        <button className="flex items-center gap-1 text-[#f59e0b] font-medium text-xs sm:text-sm whitespace-nowrap cursor-pointer">
                            <Lock size={14} fill="#f59e0b" />
                            <span className="hidden sm:inline">Officer Login</span>
                            <span className="sm:hidden">Login</span>
                        </button>
                    </Link>
                </div>
            </div>

            {/* Main Header - Responsive */}
            <div className="bg-[#1e3a5f] p-3 sm:p-6 flex justify-between items-center border-b-[3px] border-[#f59e0b]">
                <div className="flex items-center gap-2 sm:gap-6 flex-1">
                    <img src='assets/nav/logo.png' alt="Logo" className="h-12 sm:h-16 w-auto" />

                    <div className="text-white">
                        <h1 className="text-sm sm:text-2xl font-serif font-bold leading-tight">
                            <span className="hidden sm:inline">Spring and River Rejuvenation Authority</span>
                            <span className="sm:hidden">SARRA</span>
                        </h1>
                        <p className="text-xs sm:text-lg text-gray-300 mt-1 hidden sm:block">
                            स्प्रिंग एवं नदी पुनर्जीवन प्राधिकरण (SARRA)
                        </p>
                        <p className="text-[#f59e0b] text-xs sm:text-sm font-semibold mt-1 hidden sm:block">
                            Watershed Management Directorate, Government of Uttarakhand
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-4">
                    <img src='https://cdnbbsr.s3waas.gov.in/s30fe473396242072e84af286632d3f0ff/uploads/2025/01/20250121957905580.png' alt="Emblem" className="h-10 sm:h-20 w-auto" />
                    <img src="/assets/nav/flag.png" alt="Flag" className='h-10 sm:h-20 w-auto' />
                </div>
            </div>
        </header>
    );
};

export default Header;