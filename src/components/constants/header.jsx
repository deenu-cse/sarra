import React from 'react';
import { Lock } from 'lucide-react';

const Header = () => {
    return (
        <header className="w-full font-sans">
            <div className="bg-[#0f172a] text-gray-300 py-2 px-4 flex justify-between items-center text-xs border-b border-[#f59e0b]">
                <div className="flex gap-4 items-center">
                    <button className="hover:text-white transition text-sm">Skip to main content</button>
                    <button className="hover:text-white transition text-sm">Screen Reader</button>
                    <div className="flex gap-2 ml-2 border-l border-gray-600 pl-4">
                        <button className="hover:text-white text-sm">A-</button>
                        <button className="hover:text-white text-sm">A</button>
                        <button className="hover:text-white text-sm">A+</button>
                    </div>
                    <button className="ml-2 font-semibold text-sm">हिंदी</button>
                </div>

                <div className="flex gap-6 items-center">
                    <button className="hover:text-white transition text-sm">Sitemap</button>
                    <button className="hover:text-white transition text-sm">RTI</button>
                    <button className="hover:text-white transition text-sm">Contact</button>
                    <button className="flex items-center gap-1 text-[#f59e0b] font-medium text-sm">
                        <Lock size={14} fill="#f59e0b" />
                        Officer Login
                    </button>
                </div>
            </div>

            <div className="bg-[#1e3a5f] p-6 flex justify-between items-center border-b-[3px] border-[#f59e0b]">
                <div className="flex items-center gap-6">
                    <img src='assets/nav/logo.png' />

                    <div className="text-white">
                        <h1 className="text-2xl font-serif font-bold leading-tight">
                            Spring and River Rejuvenation <br /> Authority
                        </h1>
                        <p className="text-lg text-gray-300 mt-1">
                            स्प्रिंग एवं नदी पुनर्जीवन प्राधिकरण (SARRA)
                        </p>
                        <p className="text-[#f59e0b] text-sm font-semibold mt-1">
                            Watershed Management Directorate, Government of Uttarakhand
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <img src='https://cdnbbsr.s3waas.gov.in/s30fe473396242072e84af286632d3f0ff/uploads/2025/01/20250121957905580.png' />
                    <img src="/assets/nav/flag.png" className='h-20' />
                </div>
            </div>
        </header>
    );
};

export default Header;