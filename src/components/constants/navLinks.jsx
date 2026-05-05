"use client";

import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

const NavLinks = () => {
    const [activeDropdown, setActiveDropdown] = useState(null);

    const navItems = [
        { title: 'Home', type: 'link' },
        {
            title: 'About SARRA',
            type: 'dropdown',
            options: ['Overview', 'Our Vision', 'Organization Structure', 'Contact Us']
        },
        {
            title: 'Ongoing Projects',
            type: 'dropdown',
            options: ['Central Schemes', 'State Schemes', 'Externally Aided']
        },
        { title: 'Spring Rejuvenation', type: 'link' },
        { title: 'River Conservation', type: 'link' },
        {
            title: 'Knowledge Hub',
            type: 'dropdown',
            options: ['Research Papers', 'Case Studies', 'Training Modules']
        },
        { title: 'DPR / MPR Forms', type: 'link' },
        { title: 'Gallery', type: 'link' },
        { title: 'News & Event', type: 'link' },
    ];

    return (
        <nav className="w-full bg-[#0a3055] shadow-lg border-t-2 border-[#f59e0b]">
            <div className="max-w-[98%] mx-auto flex flex-wrap">
                {navItems.map((item, index) => (
                    <div
                        key={index}
                        className="relative group border-r border-blue-900/50 last:border-r-0"
                        onMouseEnter={() => setActiveDropdown(index)}
                        onMouseLeave={() => setActiveDropdown(null)}
                    >
                        <button
                            className={`flex items-center justify-center px-5 py-4 text-sm font-medium transition-all duration-200 min-h-[64px] text-center
                ${item.title === 'Home' ? 'bg-[#f59e0b] text-white' : 'text-gray-100 hover:bg-[#154b7d]'}
              `}
                        >
                            <span className="max-w-[100px] leading-tight text-base">
                                {item.title}
                            </span>
                            {item.type === 'dropdown' && (
                                <ChevronDown size={14} className="ml-2 opacity-70" />
                            )}
                        </button>

                        {item.type === 'dropdown' && activeDropdown === index && (
                            <ul className="absolute left-0 w-64 bg-[#0a3055] text-gray-100 z-50 shadow-xl border-t-2 border-[#f59e0b]">
                                {item.options.map((option, idx) => (
                                    <li
                                        key={idx}
                                        className="flex items-center justify-between px-4 py-3 border-b border-black/30 hover:bg-[#154b7d] cursor-pointer transition-colors font-semibold text-[13px]"
                                    >
                                        {option}
                                        <ChevronRight size={14} className="opacity-40" />
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))}
            </div>
        </nav>
    );
};

export default NavLinks;