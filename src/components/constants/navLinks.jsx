"use client";

import { useState } from 'react';
import { ChevronDown, ChevronRight, Menu, X } from 'lucide-react';

const NavLinks = () => {
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navItems = [
        { title: 'Home', type: 'link', href: '/' },
        {
            title: 'About SARRA',
            type: 'dropdown',
            options: [
                { label: 'Overview', href: '/about' },
                { label: 'Organization Structure', href: '#' },
                { label: 'Our Vision & Mission', href: '#' },
                { label: 'Contact Us', href: '#' }
            ]
        },
        {
            title: 'Initiatives',
            type: 'dropdown',
            options: [
                { label: 'Spring Rejuvenation', href: '#' },
                { label: 'River Conservation', href: '#' },
                { label: 'Watershed Management', href: '#' }
            ]
        },
        {
            title: 'Projects',
            type: 'dropdown',
            options: [
                { label: 'Ongoing Projects', href: '#' },
                { label: 'Central Schemes', href: '#' },
                { label: 'State Schemes', href: '#' }
            ]
        },
        // {
        //     title: 'DPR',
        //     type: 'dropdown',
        //     options: [
        //         { label: 'Spring Shed DPR', href: '/springsheddpr' },
        //         { label: 'Stream Shed DPR', href: '/streamsheddpr' }
        //     ]
        // },
        // {
        //     title: 'MPR',
        //     type: 'dropdown',
        //     options: [
        //         { label: 'Abstract 55', href: '/mpr/abstract55' },
        //         { label: 'Head 55-01', href: '/mpr/head55-01' },
        //         { label: 'Head 55-02', href: '/mpr/head55-02' }
        //     ]
        // },
        {
            title: 'Resources',
            type: 'dropdown',
            options: [
                { label: 'Research Papers', href: '#' },
                { label: 'Case Studies', href: '#' },
                { label: 'Training Modules', href: '#' },
                { label: 'Downloads', href: '#' },
                { label: 'FAQs', href: '#' }
            ]
        },
        {
            title: 'Notices & Tenders',
            type: 'dropdown',
            options: [
                { label: 'Tender Notices', href: '#' },
                { label: 'Notifications', href: '#' },
                { label: 'Guidelines', href: '#' }
            ]
        },
        { title: 'Knowledge Hub', type: 'link', href: '/knowledge-hub' },
        { title: 'Bhagirath App', type: 'link', href: '/bhagirath-app' },
        { title: 'One River One District', type: 'link', href: '/one-river-one-district' },
        { title: 'Gallery', type: 'link', href: '/gallery' },
        { title: 'News & Events', type: 'link', href: '#' },
    ];

    return (
        <nav className="w-full bg-[#0a3055] shadow-lg border-t-2 border-[#f59e0b]">
            <div className="max-w-[98%] mx-auto">
                <div className="hidden lg:flex flex-wrap">
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
                                <span className="max-w-[130px] leading-tight text-sm">
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
                                            className={`flex items-center justify-between px-4 py-3 border-b border-black/30 hover:bg-[#154b7d] cursor-pointer transition-colors text-[13px]
                                                ${option.isBold ? 'font-bold bg-[#0a3055] text-[#f59e0b]' : 'font-semibold'}
                                            `}
                                        >
                                            <a href={option.href} className="w-full">
                                                {option.label}
                                            </a>
                                            {!option.isBold && <ChevronRight size={14} className="opacity-40 ml-2" />}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </div>

                {/* Mobile Navigation */}
                <div className="lg:hidden flex justify-between items-center px-4 py-3">
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="text-white hover:text-[#f59e0b] transition"
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="lg:hidden bg-[#0a3055] border-t border-blue-900/50">
                        {navItems.map((item, index) => (
                            <div key={index}>
                                {item.type === 'link' ? (
                                    <a
                                        href={item.href}
                                        className={`block px-4 py-3 text-sm font-medium transition-all duration-200 border-b border-blue-900/30
                        ${item.title === 'Home' ? 'bg-[#f59e0b] text-white' : 'text-gray-100 hover:bg-[#154b7d]'}
                      `}
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {item.title}
                                    </a>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => {
                                                if (activeDropdown === index) {
                                                    setActiveDropdown(null);
                                                } else {
                                                    setActiveDropdown(index);
                                                }
                                            }}
                                            className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-100 hover:bg-[#154b7d] transition-all duration-200 border-b border-blue-900/30"
                                        >
                                            <span>{item.title}</span>
                                            <ChevronDown
                                                size={16}
                                                className={`transition-transform duration-200 ${activeDropdown === index ? 'rotate-180' : ''
                                                    }`}
                                            />
                                        </button>

                                        {activeDropdown === index && (
                                            <ul className="bg-[#062a45] border-l-4 border-[#f59e0b]">
                                                {item.options.map((option, idx) => (
                                                    <li key={idx}>
                                                        <a
                                                            href={option.href}
                                                            className={`block px-6 py-2.5 text-xs transition-colors border-b border-black/20
                                                                ${option.isBold ? 'font-bold text-[#f59e0b] bg-[#0a3055] hover:bg-[#0a3055]' : 'font-semibold text-gray-100 hover:bg-[#154b7d]'}
                                                            `}
                                                            onClick={() => {
                                                                setActiveDropdown(null);
                                                                setMobileMenuOpen(false);
                                                            }}
                                                        >
                                                            {option.label}
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default NavLinks;