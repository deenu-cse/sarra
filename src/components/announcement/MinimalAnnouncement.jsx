'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Megaphone, ChevronRight, X } from 'lucide-react';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const MinimalAnnouncement = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const res = await axios.get(`${API_URL}/announcements`);
                if (res.data && res.data.length > 0) {
                    setAnnouncements(res.data);
                }
            } catch (err) {
                console.error('Failed to fetch announcements:', err);
            }
        };
        fetchAnnouncements();
    }, []);

    useEffect(() => {
        if (announcements.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % announcements.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [announcements.length]);

    if (!isVisible || announcements.length === 0) return null;

    const current = announcements[currentIndex];

    return (
        <div className="w-full bg-gradient-to-r from-[#1e3a5f] to-[#142844] text-white py-3 px-4 border-l-4 border-[#f59e0b] shadow-md relative overflow-hidden font-sans group">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-6 relative z-10">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <div className="bg-[#f59e0b] p-2 rounded-full shrink-0 flex items-center justify-center shadow-lg animate-pulse">
                        <Megaphone size={16} className="text-[#1e3a5f]" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-[#f59e0b] block leading-none mb-1">Latest Announcement</span>
                        <h4 className="text-sm md:text-base font-bold truncate pr-4">{current.title}</h4>
                    </div>
                </div>

                <div className="flex items-center gap-4 w-full sm:w-auto shrink-0 self-start sm:self-center">
                    <Link
                        href={`/announcements/${current.slug || current._id}`}
                        className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-4 py-1.5 rounded-full transition-colors flex items-center gap-1 shrink-0"
                    >
                        View Details <ChevronRight size={14} />
                    </Link>

                    <button
                        onClick={() => setIsVisible(false)}
                        className="text-white/60 hover:text-white transition-colors p-1"
                        title="Dismiss"
                    >
                        <X size={16} />
                    </button>
                </div>
            </div>

            <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-white/5 to-transparent pointer-events-none transform skew-x-12 translate-x-10 group-hover:translate-x-4 transition-transform duration-700"></div>

            {announcements.length > 1 && (
                <div className="absolute bottom-0 left-0 h-[2px] bg-[#f59e0b] opacity-70"
                    style={{
                        width: '100%',
                        animation: 'progressBar 5s linear infinite'
                    }}>
                </div>
            )}

            <style jsx>{`
                @keyframes progressBar {
                    0% { width: 0%; }
                    100% { width: 100%; }
                }
            `}</style>
        </div>
    );
};

export default MinimalAnnouncement;
