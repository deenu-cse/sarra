"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, ChevronRight, Menu, X } from 'lucide-react';

const NavLinks = () => {
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [visibleCount, setVisibleCount] = useState(5);
    const navContainerRef = useRef(null);
    const pathname = usePathname();

    useEffect(() => {
        const updateVisibleItems = () => {
            if (window.innerWidth >= 1024) return;
            if (!navContainerRef.current) return;

            const containerWidth = navContainerRef.current.offsetWidth;
            const availableWidth = containerWidth - 50;

            let currentWidth = 0;
            let maxItems = 0;

            for (let i = 0; i < navItems.length; i++) {
                const item = navItems[i];
                let estWidth = 30 + (item.title.length * 8.5);
                if (item.type === 'dropdown') estWidth += 24;

                if (currentWidth + estWidth > availableWidth) {
                    break;
                }
                currentWidth += estWidth;
                maxItems++;
            }

            maxItems = Math.max(1, Math.min(maxItems, navItems.length));
            setVisibleCount(maxItems);
        };

        updateVisibleItems();
        window.addEventListener('resize', updateVisibleItems);
        return () => window.removeEventListener('resize', updateVisibleItems);
    }, []);

    const navItems = [
        { title: 'Home', type: 'link', href: '/' },
        {
            title: 'About SARRA',
            type: 'dropdown',
            options: [
                { label: 'Overview', href: '/about' },
                { label: 'Contact Us', href: '/contact' }
            ]
        },
        { title: 'Knowledge Hub', type: 'link', href: '/knowledge-hub' },
        {
            title: 'Announcements',
            type: 'link', href: '/announcements'
        },
        { title: 'Bhagirath App', type: 'link', href: '/bhagirath-app' },
        { title: 'One River One District', type: 'link', href: '/one-river-one-district' },
        {
            title: 'Media Corner',
            type: 'dropdown',
            options: [
                { label: 'Photo Gallery', href: '/gallery' },
                { label: 'Video Gallery', href: '/video-gallery' }
            ]
        },
        { title: 'News & Events', type: 'link', href: '/news' },
        { title: 'Contact Us', type: 'link', href: '/contact' },
    ];

    const isActive = (item) => {
        if (item.type === 'link') {
            if (item.href === '/') return pathname === '/';
            return pathname.startsWith(item.href) && item.href !== '#';
        }
        if (item.type === 'dropdown') {
            return item.options.some(
                (opt) => opt.href !== '#' && pathname.startsWith(opt.href)
            );
        }
        return false;
    };

    const isOptionActive = (href) =>
        href !== '#' && pathname.startsWith(href);

    return (
        <nav className="w-full bg-white shadow-lg relative z-[100]">
            <div className="max-w-[100%] mx-auto px-1.5">
                <div className="hidden lg:flex flex-wrap justify-center">
                    {navItems.map((item, index) => {
                        const active = isActive(item);
                        return (
                            <div
                                key={index}
                                className="relative group border-r border-slate-200 last:border-r-0 "
                                onMouseEnter={() => setActiveDropdown(index)}
                                onMouseLeave={() => setActiveDropdown(null)}
                            >
                                {item.type === 'link' ? (
                                    <Link
                                        href={item.href}
                                        className={`flex items-center justify-center px-3 py-4 text-base font-bold transition-all duration-200 min-h-[64px] text-center
                                            ${active
                                                ? 'bg-[#1e3a5f] text-white'
                                                : 'text-[#1e3a5f] hover:bg-slate-50'
                                            }`}
                                    >
                                        <span className="max-w-[200px] leading-tight text-[16px] font-bold">
                                            {item.title}
                                        </span>
                                    </Link>
                                ) : (
                                    <button
                                        className={`flex items-center justify-center px-3 py-4 text-base font-bold transition-all duration-200 min-h-[64px] text-center w-full
                                            ${active
                                                ? 'bg-[#1e3a5f] text-white'
                                                : 'text-[#1e3a5f] hover:bg-slate-50'
                                            }`}
                                    >
                                        <span className="max-w-[200px] leading-tight text-[16px] font-bold">
                                            {item.title}
                                        </span>
                                        <ChevronDown size={18} className="ml-2 opacity-70" />
                                    </button>
                                )}

                                {item.type === 'dropdown' && activeDropdown === index && (
                                    <ul className="absolute left-0 w-64 bg-white text-[#1e3a5f] z-50 shadow-xl border-t-2 border-[#1e3a5f]">
                                        {item.options.map((option, idx) => (
                                            <li
                                                key={idx}
                                                className={`flex items-center justify-between border-b border-slate-100 transition-colors text-base
                                                    ${option.isBold ? 'font-bold text-[#f59e0b]' : 'font-semibold'}
                                                    ${isOptionActive(option.href) ? 'bg-slate-50 text-[#1e3a5f]' : 'hover:bg-slate-50'}
                                                `}
                                            >
                                                <Link
                                                    href={option.href}
                                                    className="flex items-center justify-between w-full px-4 py-3"
                                                    onClick={() => setActiveDropdown(null)}
                                                >
                                                    {option.label}
                                                    {!option.isBold && (
                                                        <ChevronRight size={16} className="opacity-40 ml-2" />
                                                    )}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        );
                    })}
                </div>

                <div className="lg:hidden flex items-stretch bg-white border-b border-slate-200 relative z-50">
                    <div ref={navContainerRef} className="flex flex-1 overflow-x-auto hide-scroll justify-center" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                        <style dangerouslySetInnerHTML={{ __html: `.hide-scroll::-webkit-scrollbar { display: none; }` }} />
                        {navItems.slice(0, visibleCount).map((item, index) => {
                            const active = isActive(item);
                            return (
                                <div key={index} className="relative flex-none min-w-[90px] border-r border-slate-200">
                                    {item.type === 'link' ? (
                                        <Link
                                            href={item.href}
                                            className={`flex items-center justify-center w-full h-full px-3 py-3 text-[16px] sm:text-base font-bold transition-all duration-200 text-center 
                                                ${active ? 'bg-[#1e3a5f] text-white' : 'text-[#1e3a5f] hover:bg-slate-50'}`}
                                        >
                                            {item.title}
                                        </Link>
                                    ) : (
                                        <button
                                            onClick={() => {
                                                setActiveDropdown(activeDropdown === index ? null : index);
                                                setMobileMenuOpen(false);
                                            }}
                                            className={`flex items-center justify-center w-full h-full px-3 py-3 text-[16px] sm:text-base font-bold transition-all duration-200 text-center
                                                ${active ? 'bg-[#1e3a5f] text-white' : 'text-[#1e3a5f] hover:bg-slate-50'}`}
                                        >
                                            {item.title}
                                            <ChevronDown size={14} className={`ml-1 opacity-70 transition-transform ${activeDropdown === index ? 'rotate-180' : ''}`} />
                                        </button>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                    <button
                        onClick={() => {
                            setMobileMenuOpen(!mobileMenuOpen);
                            setActiveDropdown(null);
                        }}
                        className={`flex-none flex items-center justify-center px-4 py-3 transition-colors ${mobileMenuOpen ? 'bg-slate-100 text-[#1e3a5f]' : 'text-[#1e3a5f] hover:bg-slate-50'}`}
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
                    </button>

                    {activeDropdown !== null && activeDropdown < visibleCount && !mobileMenuOpen && navItems[activeDropdown].type === 'dropdown' && (
                        <div className="absolute left-0 top-full w-full bg-white z-50 shadow-xl border-t-2 border-[#1e3a5f]">
                            <ul className="flex flex-col">
                                {navItems[activeDropdown].options?.map((option, idx) => (
                                    <li key={idx} className="border-b border-slate-100">
                                        <Link
                                            href={option.href}
                                            className="block px-6 py-4 text-base font-bold text-[#1e3a5f] hover:bg-slate-50"
                                            onClick={() => setActiveDropdown(null)}
                                        >
                                            {option.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {mobileMenuOpen && (
                    <div className="lg:hidden bg-white border-t border-slate-200 absolute top-full left-0 w-full z-50 shadow-xl ">
                        {navItems.slice(visibleCount).map((item, index) => {
                            const actualIndex = index + visibleCount;
                            const active = isActive(item);
                            return (
                                <div key={actualIndex}>
                                    {item.type === 'link' ? (
                                        <Link
                                            href={item.href}
                                            className={`block px-5 py-4 text-base font-bold transition-all duration-200 border-b border-slate-100
                                                ${active
                                                    ? 'bg-[#1e3a5f] text-white'
                                                    : 'text-[#1e3a5f] hover:bg-slate-50'
                                                }`}
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            {item.title}
                                        </Link>
                                    ) : (
                                        <>
                                            <button
                                                onClick={() => {
                                                    setActiveDropdown(
                                                        activeDropdown === actualIndex ? null : actualIndex
                                                    );
                                                }}
                                                className={`w-full flex items-center justify-between px-5 py-4 text-base font-bold transition-all duration-200 border-b border-slate-100
                                                    ${active
                                                        ? 'bg-[#1e3a5f] text-white'
                                                        : 'text-[#1e3a5f] hover:bg-slate-50'
                                                    }`}
                                            >
                                                <span>{item.title}</span>
                                                <ChevronDown
                                                    size={18}
                                                    className={`transition-transform duration-200 ${activeDropdown === actualIndex ? 'rotate-180' : ''}`}
                                                />
                                            </button>

                                            {activeDropdown === actualIndex && (
                                                <ul className="bg-slate-50 border-l-4 border-[#1e3a5f]">
                                                    {item.options.map((option, idx) => (
                                                        <li key={idx}>
                                                            <Link
                                                                href={option.href}
                                                                className={`block px-6 py-3.5 text-base transition-colors border-b border-slate-200
                                                                    ${option.isBold
                                                                        ? 'font-bold text-[#f59e0b] hover:bg-slate-100'
                                                                        : isOptionActive(option.href)
                                                                            ? 'font-bold text-[#1e3a5f] bg-slate-200'
                                                                            : 'font-semibold text-[#1e3a5f] hover:bg-slate-100'
                                                                    }`}
                                                                onClick={() => {
                                                                    setActiveDropdown(null);
                                                                    setMobileMenuOpen(false);
                                                                }}
                                                            >
                                                                {option.label}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default NavLinks;