import React from 'react';
import Link from 'next/link';
import { Megaphone, Calendar, ArrowRight, FileText } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

import { generatePageMeta } from "@/lib/seo.config";

export const metadata = generatePageMeta({
    title: 'Announcements | SARRA',
    description: 'Latest official updates, notices, and important information from SARRA.',
    keywords: 'SARRA announcements, official notices, Uttarakhand government updates, Jal Sanrakshan Abhiyan news',
    path: '/announcements',
});

export default async function AnnouncementsListPage() {
    let announcements = [];
    try {
        const res = await fetch(`${API_URL}/announcements`, { cache: 'no-store' });
        if (res.ok) {
            const data = await res.json();
            announcements = data.data || [];
        }
    } catch (err) {
        console.error('Failed to fetch announcements:', err);
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            day: 'numeric', month: 'long', year: 'numeric'
        });
    };

    return (
        <main className="w-full bg-[#f8fafc] font-sans min-h-screen pb-24">
            <section className="relative w-full overflow-hidden min-h-[400px]">
                <img
                    src="/assets/Announcement/banner.png"
                    alt="Announcements Banner"
                    className="absolute inset-0 w-full h-full object-cover z-0"
                />
                <div className="absolute inset-0 z-10 bg-[linear-gradient(135deg,rgba(15,23,42,0.88)_0%,rgba(30,58,95,0.82)_50%,rgba(10,48,85,0.75)_100%)]" />

                <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 py-24 md:py-32 h-full min-h-[400px]">
                    <span className="text-[#f59e0b] font-bold uppercase tracking-widest text-sm mb-4 block">Stay Updated</span>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white mb-6 tracking-tight leading-tight [text-shadow:0_2px_20px_rgba(0,0,0,0.3)]">
                        Official Announcements
                    </h1>
                    <p className="text-white/80 text-lg md:text-xl max-w-2xl font-light leading-relaxed">
                        Latest updates, notices, and important information from SARRA.
                    </p>
                </div>

                <div className="absolute bottom-0 left-0 right-0 z-10">
                    <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
                        <path d="M0 60V30C240 0 480 0 720 30C960 60 1200 60 1440 30V60H0Z" fill="white" />
                    </svg>
                </div>
            </section>

            <div className="max-w-6xl mx-auto px-4 md:px-8 mt-12">

                {announcements.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {announcements.map((item, idx) => (
                            <Link
                                href={`/announcements/${item.slug || item._id}`}
                                key={item._id || idx}
                                className="group flex flex-col sm:flex-row bg-white rounded-2xl shadow-sm hover:shadow-xl border border-slate-100 transition-all duration-300 overflow-hidden"
                            >
                                <div className="sm:w-2/5 h-48 sm:h-auto bg-slate-100 relative overflow-hidden shrink-0">
                                    {item.image ? (
                                        <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-[#1e3a5f]/10 to-[#1e3a5f]/5 flex items-center justify-center">
                                            <Megaphone className="w-16 h-16 text-[#1e3a5f]/20" />
                                        </div>
                                    )}
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-sm flex items-center gap-2">
                                        <Calendar size={14} className="text-[#f59e0b]" />
                                        <span className="text-xs font-bold text-[#1e3a5f]">{formatDate(item.date)}</span>
                                    </div>
                                </div>
                                <div className="p-6 sm:w-3/5 flex flex-col">
                                    <div className="mb-2">
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#f59e0b] bg-[#f59e0b]/10 px-2 py-1 rounded">
                                            Announcement
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-[#1e3a5f] mb-3 line-clamp-2 group-hover:text-[#f59e0b] transition-colors leading-tight">
                                        {item.title}
                                    </h3>
                                    <p className="text-slate-500 text-sm line-clamp-3 mb-6 flex-1">
                                        {item.description}
                                    </p>
                                    <div className="mt-auto flex items-center text-sm font-bold text-[#1e3a5f] group-hover:text-[#f59e0b] transition-colors">
                                        Read Details <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm max-w-2xl mx-auto">
                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <FileText className="w-10 h-10 text-slate-300" />
                        </div>
                        <h2 className="text-2xl font-bold text-[#1e3a5f] mb-2">No Announcements</h2>
                        <p className="text-slate-500">There are no official announcements published at this time.</p>
                    </div>
                )}
            </div>
        </main>
    );
}
