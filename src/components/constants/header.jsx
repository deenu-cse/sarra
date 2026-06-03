"use client";

import Link from "next/link";
const Header = () => {
    const handleResize = (step) => {
        const root = document.documentElement;
        const currentSize = parseFloat(getComputedStyle(root).fontSize);
        const newSize = Math.max(12, Math.min(20, currentSize + step));
        root.style.fontSize = `${newSize}px`;
    };

    const resetResize = () => {
        document.documentElement.style.fontSize = '16px';
    };

    return (
        <header className="w-full font-sans">
            <div className="bg-[#1f4e79] p-3 sm:p-4 flex justify-between items-center border-b-[3px] border-[#f59e0b]">
                <Link href="/" className="flex items-center gap-2 sm:gap-6 flex-1 hover:opacity-90 transition-opacity cursor-pointer">
                    <img src='/assets/nav/logo.png' alt="Logo" className="h-12 sm:h-16 w-auto" />

                    <div className="text-white">
                        <h1 className="text-sm sm:text-2xl font-serif font-bold leading-tight">
                            <span className="hidden sm:inline">Spring and River Rejuvenation Authority</span>
                            <span className="sm:hidden text-xs">Spring and River Rejuvenation Authority</span>
                        </h1>                        
                        <p className="text-[#f59e0b] text-xs sm:text-sm font-semibold mt-1 hidden sm:block">
                            Anchored in Watershed Management Directorate, Government of Uttarakhand
                        </p>
                    </div>
                </Link>

                <div className="flex items-center gap-2 sm:gap-4">
                    <img src='/assets/icons/ukgov.png' alt="Emblem" className="h-10 sm:h-20 w-auto" />
                    <img src="/assets/nav/flag.png" alt="Flag" className='h-10 sm:h-20 w-auto' />
                </div>
            </div>
        </header>
    );
};

export default Header;