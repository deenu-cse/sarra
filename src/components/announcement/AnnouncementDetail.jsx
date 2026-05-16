'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, Share2, Printer, Megaphone } from 'lucide-react';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function AnnouncementDetail() {
    const params = useParams();
    const router = useRouter();
    const [announcement, setAnnouncement] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!params?.slug) return;

        const fetchDetail = async () => {
            try {
                const res = await axios.get(`${API_URL}/announcements/slug/${params.slug}`);
                setAnnouncement(res.data);
            } catch (err) {
                console.error(err);
                setError('Announcement not found or has been removed.');
            } finally {
                setLoading(false);
            }
        };
        fetchDetail();
    }, [params?.slug]);

    const handlePrint = () => {
        window.print();
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: announcement?.title,
                    text: announcement?.description,
                    url: window.location.href,
                });
            } catch (err) {
                console.error('Error sharing:', err);
            }
        } else {
            alert('Sharing is not supported on this browser.');
        }
    };

    if (loading) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center bg-[#f8fafc]">
                <div className="w-12 h-12 border-4 border-slate-200 border-t-[#1e3a5f] rounded-full animate-spin mb-4"></div>
                <p className="text-slate-500 font-medium">Loading announcement details...</p>
            </div>
        );
    }

    if (error || !announcement) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center bg-[#f8fafc] px-4">
                <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-6">
                    <Megaphone className="w-10 h-10 text-red-300" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Announcement Not Found</h2>
                <p className="text-slate-500 mb-8 max-w-md text-center">{error}</p>
                <Link href="/announcements" className="bg-[#1e3a5f] hover:bg-[#142844] text-white px-6 py-3 rounded-lg font-bold transition-colors flex items-center gap-2">
                    <ArrowLeft size={18} /> Back to Announcements
                </Link>
            </div>
        );
    }

    const formattedDate = new Date(announcement.date).toLocaleDateString('en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });

    return (
        <main className="w-full bg-[#f8fafc] font-sans min-h-screen pt-12 pb-24">
            <div className="max-w-4xl mx-auto px-4 md:px-8">
                {/* Back button */}
                <button 
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-slate-500 hover:text-[#1e3a5f] transition-colors font-semibold mb-8 group"
                >
                    <ArrowLeft size={20} className="transform group-hover:-translate-x-1 transition-transform" />
                    Back
                </button>

                {/* Article Header */}
                <article className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden print:shadow-none print:border-none">
                    {/* Header Details */}
                    <div className="p-8 md:p-12 border-b border-slate-100">
                        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                            <span className="text-xs font-bold uppercase tracking-widest text-[#f59e0b] bg-[#f59e0b]/10 px-3 py-1.5 rounded-full">
                                Official Announcement
                            </span>
                            <div className="flex items-center gap-4">
                                <button onClick={handleShare} className="text-slate-400 hover:text-[#1e3a5f] transition-colors flex items-center gap-1.5 text-sm font-semibold print:hidden">
                                    <Share2 size={16} /> Share
                                </button>
                                <button onClick={handlePrint} className="text-slate-400 hover:text-[#1e3a5f] transition-colors flex items-center gap-1.5 text-sm font-semibold print:hidden">
                                    <Printer size={16} /> Print
                                </button>
                            </div>
                        </div>

                        <h1 className="text-3xl md:text-5xl font-serif font-bold text-[#1e3a5f] mb-6 leading-tight">
                            {announcement.title}
                        </h1>

                        <div className="flex items-center gap-3 text-slate-500 text-sm font-medium">
                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                                <Calendar size={18} className="text-[#1e3a5f]" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Published On</span>
                                <span className="text-[#1e3a5f] font-semibold">{formattedDate}</span>
                            </div>
                        </div>
                    </div>

                    {/* Featured Image */}
                    {announcement.image && (
                        <div className="w-full bg-slate-100 relative group overflow-hidden max-h-[500px]">
                            <img 
                                src={announcement.image} 
                                alt={announcement.title} 
                                className="w-full h-full object-contain bg-[#1e3a5f]/5"
                            />
                        </div>
                    )}

                    {/* Article Body */}
                    <div className="p-8 md:p-12 prose prose-lg prose-slate max-w-none prose-headings:text-[#1e3a5f] prose-a:text-[#0056b3]">
                        {/* We use basic splitting for paragraphs if it's plain text. If they input HTML, it should be parsed. Assuming plain text for now. */}
                        {announcement.description.split('\n').map((paragraph, idx) => (
                            paragraph.trim() ? <p key={idx} className="mb-4 text-slate-600 leading-relaxed text-lg">{paragraph}</p> : <br key={idx} />
                        ))}
                    </div>
                </article>

                <div className="mt-12 text-center print:hidden">
                    <Link href="/announcements" className="inline-flex items-center gap-2 border-2 border-[#1e3a5f] text-[#1e3a5f] hover:bg-[#1e3a5f] hover:text-white px-8 py-3 rounded-xl font-bold transition-all">
                        View All Announcements
                    </Link>
                </div>
            </div>
        </main>
    );
}
