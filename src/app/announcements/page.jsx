'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Megaphone, Calendar, ArrowRight, FileText } from 'lucide-react';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function AnnouncementsListPage() {
    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const res = await axios.get(`${API_URL}/announcements`);
                setAnnouncements(res.data);
            } catch (err) {
                console.error('Failed to fetch announcements:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchAnnouncements();
    }, []);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            day: 'numeric', month: 'long', year: 'numeric'
        });
    };

    return (
        <main className="w-full bg-[#f8fafc] font-sans min-h-screen pt-12 pb-24">
            <div className="max-w-6xl mx-auto px-4 md:px-8">
                <div className="text-center mb-16">
                    <span className="text-[#f59e0b] font-bold uppercase tracking-widest text-sm mb-3 block">Stay Updated</span>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#1e3a5f] mb-4">Official Announcements</h1>
                    <p className="text-slate-500 max-w-2xl mx-auto text-lg">Latest updates, notices, and important information from SARRA.</p>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-12 h-12 border-4 border-slate-200 border-t-[#1e3a5f] rounded-full animate-spin"></div>
                    </div>
                ) : announcements.length > 0 ? (
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
