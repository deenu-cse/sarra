"use client";

import Link from "next/link";
const Header = () => {
    const handleResize = (step) => {
        const root = document.documentElement;
        const currentSize = parseFloat(getComputedStyle(root).fontSize);
        const newSize = Math.max(12, Math.min(20, currentSize + step));
        root.style.fontSize = `${newSize}px`;
    };


    return (
        <header className="w-full">
            <div className="bg-white p-3 sm:p-4 flex justify-between items-center border-b-[3px] border-[#1e3a5f]">
                <Link href="/" className="flex items-center gap-2 sm:gap-5 flex-1 hover:opacity-90 transition-opacity cursor-pointer">
                    <img src='/assets/nav/logo.png' alt="Logo" className="h-12 sm:h-16 w-auto" />

                    <div>
                        <h1 className="text-base sm:text-3xl font-bold leading-tight text-[#1e3a5f]">
                            <span className="hidden sm:inline italic">Spring and River Rejuvenation Authority</span>
                            <span className="sm:hidden text-sm italic">Spring and River Rejuvenation Authority</span>
                        </h1>
                        <p className="text-[#f59e0b] text-sm sm:text-base font-semibold mt-1 hidden sm:block ">
                            Anchored in Watershed Management Directorate, Government of Uttarakhand
                        </p>
                    </div>
                </Link>

                <div className="flex items-center gap-2 sm:gap-4">
                    <Link href={'https://uk.gov.in'}>
                        <img src='/assets/icons/ukgov.png' alt="Emblem" className="h-10 sm:h-20 w-auto" />
                    </Link>
                    <Link href={'https://wmduk.gov.in'}>
                        <img src="/assets/icons/WMD_LOGO.jpg" alt="UCRRFP" className='h-10 sm:h-20 w-auto' />
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;