"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, ChevronRight, Menu, X } from 'lucide-react';

const NavLinks = () => {
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();

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
            title: 'Notices & Tenders',
            type: 'dropdown',
            options: [
                { label: 'Announcements', href: '/announcements' },
                { label: 'Tender Notices', href: '#' },
                { label: 'Notifications', href: '#' },
                { label: 'Guidelines', href: '#' }
            ]
        },
        { title: 'Knowledge Hub', type: 'link', href: '/knowledge-hub' },
        { title: 'Bhagirath App', type: 'link', href: '/bhagirath-app' },
        { title: 'One River One District', type: 'link', href: '/one-river-one-district' },
        {
            title: 'Gallery',
            type: 'dropdown',
            options: [
                { label: 'Photo Gallery', href: '/gallery' },
                { label: 'Video Gallery', href: '/video-gallery' }
            ]
        },
        { title: 'News & Events', type: 'link', href: '/news' },
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
        <nav className="w-full bg-[#0a3055] shadow-lg border-t-2 border-[#f59e0b]">
            <div className="max-w-[98%] mx-auto">
                {/* Desktop Navigation */}
                <div className="hidden lg:flex flex-wrap">
                    {navItems.map((item, index) => {
                        const active = isActive(item);
                        return (
                            <div
                                key={index}
                                className="relative group border-r border-blue-900/50 last:border-r-0"
                                onMouseEnter={() => setActiveDropdown(index)}
                                onMouseLeave={() => setActiveDropdown(null)}
                            >
                                {item.type === 'link' ? (
                                    <Link
                                        href={item.href}
                                        className={`flex items-center justify-center px-5 py-4 text-sm font-medium transition-all duration-200 min-h-[64px] text-center
                                            ${active
                                                ? 'bg-[#f59e0b] text-white'
                                                : 'text-gray-100 hover:bg-[#154b7d]'
                                            }`}
                                    >
                                        <span className="max-w-[130px] leading-tight text-sm">
                                            {item.title}
                                        </span>
                                    </Link>
                                ) : (
                                    <button
                                        className={`flex items-center justify-center px-5 py-4 text-sm font-medium transition-all duration-200 min-h-[64px] text-center w-full
                                            ${active
                                                ? 'bg-[#f59e0b] text-white'
                                                : 'text-gray-100 hover:bg-[#154b7d]'
                                            }`}
                                    >
                                        <span className="max-w-[130px] leading-tight text-sm">
                                            {item.title}
                                        </span>
                                        <ChevronDown size={14} className="ml-2 opacity-70" />
                                    </button>
                                )}

                                {item.type === 'dropdown' && activeDropdown === index && (
                                    <ul className="absolute left-0 w-64 bg-[#0a3055] text-gray-100 z-50 shadow-xl border-t-2 border-[#f59e0b]">
                                        {item.options.map((option, idx) => (
                                            <li
                                                key={idx}
                                                className={`flex items-center justify-between border-b border-black/30 transition-colors text-[13px]
                                                    ${option.isBold ? 'font-bold bg-[#0a3055] text-[#f59e0b]' : 'font-semibold'}
                                                    ${isOptionActive(option.href) ? 'bg-[#154b7d]' : 'hover:bg-[#154b7d]'}
                                                `}
                                            >
                                                <Link
                                                    href={option.href}
                                                    className="flex items-center justify-between w-full px-4 py-3"
                                                    onClick={() => setActiveDropdown(null)}
                                                >
                                                    {option.label}
                                                    {!option.isBold && (
                                                        <ChevronRight size={14} className="opacity-40 ml-2" />
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

                {/* Mobile Navigation Toggle */}
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
                        {navItems.map((item, index) => {
                            const active = isActive(item);
                            return (
                                <div key={index}>
                                    {item.type === 'link' ? (
                                        <Link
                                            href={item.href}
                                            className={`block px-4 py-3 text-sm font-medium transition-all duration-200 border-b border-blue-900/30
                                                ${active
                                                    ? 'bg-[#f59e0b] text-white'
                                                    : 'text-gray-100 hover:bg-[#154b7d]'
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
                                                        activeDropdown === index ? null : index
                                                    );
                                                }}
                                                className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium transition-all duration-200 border-b border-blue-900/30
                                                    ${active
                                                        ? 'bg-[#f59e0b] text-white'
                                                        : 'text-gray-100 hover:bg-[#154b7d]'
                                                    }`}
                                            >
                                                <span>{item.title}</span>
                                                <ChevronDown
                                                    size={16}
                                                    className={`transition-transform duration-200 ${activeDropdown === index ? 'rotate-180' : ''}`}
                                                />
                                            </button>

                                            {activeDropdown === index && (
                                                <ul className="bg-[#062a45] border-l-4 border-[#f59e0b]">
                                                    {item.options.map((option, idx) => (
                                                        <li key={idx}>
                                                            <Link
                                                                href={option.href}
                                                                className={`block px-6 py-2.5 text-xs transition-colors border-b border-black/20
                                                                    ${option.isBold
                                                                        ? 'font-bold text-[#f59e0b] bg-[#0a3055] hover:bg-[#0a3055]'
                                                                        : isOptionActive(option.href)
                                                                            ? 'font-semibold text-[#f59e0b] bg-[#154b7d]'
                                                                            : 'font-semibold text-gray-100 hover:bg-[#154b7d]'
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