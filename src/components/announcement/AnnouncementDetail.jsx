'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, Share2, Printer, Megaphone } from 'lucide-react';

export default function AnnouncementDetail({ initialAnnouncement, initialError }) {
    const router = useRouter();
    const announcement = initialAnnouncement;
    const error = initialError;

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
        <main className="w-full bg-[#f8fafc] font-sans min-h-screen pb-24">
            <section className="relative w-full overflow-hidden" style={{ minHeight: '400px', maxHeight: '600px' }}>
                <img
                    src={announcement.image || '/assets/bhagirithi/banner.png'}
                    alt={announcement.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ zIndex: 0 }}
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(15,23,42,0.88) 0%, rgba(30,58,95,0.82) 50%, rgba(10,48,85,0.75) 100%)', zIndex: 1 }} />

                <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 py-24 md:py-32 h-full min-h-[400px]">
                    <span className="text-[#f59e0b] font-bold uppercase tracking-widest text-sm mb-4 block">
                        Official Announcement
                    </span>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 tracking-tight leading-tight max-w-5xl"
                        style={{ textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}>
                        {announcement.title}
                    </h1>
                    <div className="flex items-center gap-2 text-white/80 text-base font-medium bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                        <Calendar size={18} className="text-[#f59e0b]" />
                        <span>{formattedDate}</span>
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 z-10">
                    <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
                        <path d="M0 60V30C240 0 480 0 720 30C960 60 1200 60 1440 30V60H0Z" fill="white" />
                    </svg>
                </div>
            </section>

            <div className="md:max-w-4xl mx-auto px-4 md:px-8 mt-0 relative z-20">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-slate-500 hover:text-[#1e3a5f] transition-colors font-semibold mb-6 group w-fit"
                >
                    <ArrowLeft size={20} className="transform group-hover:-translate-x-1 transition-transform" />
                    Back
                </button>

                <article className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden print:shadow-none print:border-none">
                    <div className="p-4 md:p-6 border-b border-slate-100">
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

                    {announcement.image && (
                        <div className="w-full bg-slate-100 relative group overflow-hidden max-h-[500px]">
                            <img
                                src={announcement.image}
                                alt={announcement.title}
                                className="w-full h-full object-contain bg-[#1e3a5f]/5"
                            />
                        </div>
                    )}
                    <div className="p-4 md:p-8 prose prose-lg prose-slate max-w-none prose-headings:text-[#1e3a5f] prose-a:text-[#0056b3]">
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
