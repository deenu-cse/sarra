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
            <div className="bg-[#1e3a5f] p-3 sm:p-4 flex justify-between items-center border-b-[3px] border-[#f59e0b]">
                <div className="flex items-center gap-2 sm:gap-6 flex-1">
                    <img src='/assets/nav/logo.png' alt="Logo" className="h-12 sm:h-16 w-auto" />

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
                    <img src='/assets/icons/ukgov.png' alt="Emblem" className="h-10 sm:h-20 w-auto" />
                    <img src="/assets/nav/flag.png" alt="Flag" className='h-10 sm:h-20 w-auto' />
                </div>
            </div>
        </header>
    );
};

export default Header;