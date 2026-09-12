'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, Share2, Printer, Megaphone, FileText, Image as ImageIcon, ChevronLeft, ChevronRight, Download, ExternalLink, Clock, AlertTriangle } from 'lucide-react';
import { getMediaUrl } from '@/lib/getMediaUrl';

export default function AnnouncementDetail({ initialAnnouncement, initialError }) {
    const router = useRouter();
    const announcement = initialAnnouncement;
    const error = initialError;

    const [activeImgIdx, setActiveImgIdx] = useState(0);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);

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

    const isClosed = announcement.lastDate ? (() => {
        const d = new Date(announcement.lastDate);
        d.setHours(23, 59, 59, 999);
        return new Date() > d;
    })() : false;

    const formattedLastDate = announcement.lastDate ? new Date(announcement.lastDate).toLocaleDateString('en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    }) : null;

    return (
        <main className="w-full bg-[#f8fafc] font-sans min-h-screen pb-24">
            <section className="relative w-full overflow-hidden min-h-[400px] max-h-[600px]">
                <img
                    src={getMediaUrl(announcement.image || (announcement.images && announcement.images[0]) || '/assets/Announcement/banner.png')}
                    alt={announcement.title}
                    className="absolute inset-0 w-full h-full object-cover z-0"
                />
                <div className="absolute inset-0 z-10 bg-[linear-gradient(135deg,rgba(15,23,42,0.88)_0%,rgba(30,58,95,0.82)_50%,rgba(10,48,85,0.75)_100%)]" />

                <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 py-24 md:py-32 h-full min-h-[400px]">
                    <span className="text-[#f59e0b] font-bold uppercase tracking-widest text-sm mb-4 block">
                        Official Announcement
                    </span>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 tracking-tight leading-tight max-w-5xl [text-shadow:0_2px_20px_rgba(0,0,0,0.3)]">
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
                            <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-xs font-bold uppercase tracking-widest text-[#f59e0b] bg-[#f59e0b]/10 px-3 py-1.5 rounded-full">
                                    Official Announcement
                                </span>
                                {announcement.lastDate && (
                                    isClosed ? (
                                        <span className="text-xs font-bold uppercase tracking-wider text-rose-700 bg-rose-50 border border-rose-200 px-3 py-1.5 rounded-full flex items-center gap-1.5">
                                            <span className="w-2 h-2 rounded-full bg-rose-500"></span> Closed
                                        </span>
                                    ) : (
                                        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full flex items-center gap-1.5">
                                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Active
                                        </span>
                                    )
                                )}
                            </div>
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

                        <div className="flex flex-wrap items-center gap-6 text-slate-500 text-sm font-medium">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                                    <Calendar size={18} className="text-[#1e3a5f]" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Published On</span>
                                    <span className="text-[#1e3a5f] font-semibold">{formattedDate}</span>
                                </div>
                            </div>

                            {announcement.lastDate && (
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${isClosed ? 'bg-rose-50' : 'bg-amber-50'}`}>
                                        <Clock size={18} className={isClosed ? 'text-rose-600' : 'text-amber-600'} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
                                            {isClosed ? 'Closed On / Deadline' : 'Last Date / Deadline'}
                                        </span>
                                        <span className={`font-semibold ${isClosed ? 'text-rose-700' : 'text-[#1e3a5f]'}`}>
                                            {formattedLastDate}
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {announcement.lastDate && isClosed && (
                            <div className="mt-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 flex items-start gap-3 text-rose-900">
                                <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="font-bold text-sm text-rose-800">Notice: This announcement is closed</h4>
                                    <p className="text-xs text-rose-700 mt-0.5 leading-relaxed">
                                        The last date for this announcement was <strong>{formattedLastDate}</strong>. Submissions, applications, or actions related to this notice are no longer being accepted.
                                    </p>
                                </div>
                            </div>
                        )}

                        {announcement.lastDate && !isClosed && (
                            <div className="mt-6 p-4 rounded-2xl bg-amber-50/70 border border-amber-200 flex items-start gap-3 text-amber-950">
                                <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="font-bold text-sm text-amber-900">Important Deadline Notice</h4>
                                    <p className="text-xs text-amber-800 mt-0.5 leading-relaxed">
                                        The last date for submission/application is <strong>{formattedLastDate}</strong>. Please ensure all actions are completed before this deadline.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Image Gallery / Viewer */}
                    {((announcement.images && announcement.images.length > 0) || announcement.image) && (
                        <div className="w-full bg-slate-50 border-b border-slate-100 p-4 md:p-6 print:hidden">
                            {/* Main Active Image */}
                            <div className="relative group overflow-hidden rounded-2xl max-h-[500px] aspect-[16/9] bg-[#1e3a5f]/5 flex items-center justify-center border border-slate-200/50 shadow-inner">
                                <img
                                    src={getMediaUrl(announcement.images && announcement.images.length > 0 ? announcement.images[activeImgIdx] : announcement.image)}
                                    alt={announcement.title}
                                    className="max-w-full max-h-full object-contain cursor-zoom-in transition-transform duration-300 hover:scale-[1.02]"
                                    onClick={() => setIsLightboxOpen(true)}
                                />

                                {announcement.images && announcement.images.length > 1 && (
                                    <>
                                        <button
                                            onClick={() => setActiveImgIdx((prev) => (prev === 0 ? announcement.images.length - 1 : prev - 1))}
                                            className="absolute left-4 bg-white/90 hover:bg-white text-[#1e3a5f] p-2.5 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 backdrop-blur-sm"
                                            title="Previous Image"
                                        >
                                            <ChevronLeft size={20} />
                                        </button>
                                        <button
                                            onClick={() => setActiveImgIdx((prev) => (prev === announcement.images.length - 1 ? 0 : prev + 1))}
                                            className="absolute right-4 bg-white/90 hover:bg-white text-[#1e3a5f] p-2.5 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 backdrop-blur-sm"
                                            title="Next Image"
                                        >
                                            <ChevronRight size={20} />
                                        </button>

                                        {/* Image Counter Badge */}
                                        <span className="absolute bottom-4 right-4 bg-[#1e3a5f]/85 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1">
                                            <ImageIcon size={12} className="text-[#f59e0b]" /> {activeImgIdx + 1} / {announcement.images.length}
                                        </span>
                                    </>
                                )}
                            </div>

                            {/* Thumbnail Row */}
                            {announcement.images && announcement.images.length > 1 && (
                                <div className="mt-4 flex gap-2.5 overflow-x-auto py-2 no-scrollbar scroll-smooth">
                                    {announcement.images.map((img, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setActiveImgIdx(idx)}
                                            className={`relative w-20 h-14 rounded-lg overflow-hidden shrink-0 transition-all border-2 ${activeImgIdx === idx
                                                ? 'border-[#f59e0b] shadow-md scale-105'
                                                : 'border-slate-200 hover:border-slate-400 opacity-70 hover:opacity-100'
                                                }`}
                                        >
                                            <img src={getMediaUrl(img)} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                    <div className="p-4 md:p-8 prose prose-lg prose-slate max-w-none prose-headings:text-[#1e3a5f] prose-a:text-[#0056b3]">
                        {announcement.description.split('\n').map((paragraph, idx) => (
                            paragraph.trim() ? <p key={idx} className="mb-4 text-slate-600 leading-relaxed text-lg">{paragraph}</p> : <br key={idx} />
                        ))}
                    </div>
                </article>

                {/* PDF Document Attachment Section */}
                {announcement.pdfUrl && (
                    <div className="mt-8 p-6 bg-white border border-slate-100 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm print:hidden">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center shrink-0 border border-red-100">
                                <FileText size={24} className="text-red-500 animate-pulse" />
                            </div>
                            <div>
                                <h4 className="font-bold text-[#1e3a5f] text-base leading-tight">Official Attachment (PDF)</h4>
                                <p className="text-slate-500 text-xs mt-1">Official circular / notification document</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
                            <a
                                href={getMediaUrl(announcement.pdfUrl)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-[#1e3a5f] hover:bg-[#142844] text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-colors shadow-sm"
                            >
                                <ExternalLink size={16} /> Open PDF
                            </a>

                        </div>
                    </div>
                )}

                <div className="mt-12 text-center print:hidden">
                    <Link href="/announcements" className="inline-flex items-center gap-2 border-2 border-[#1e3a5f] text-[#1e3a5f] hover:bg-[#1e3a5f] hover:text-white px-8 py-3 rounded-xl font-bold transition-all">
                        View All Announcements
                    </Link>
                </div>
            </div>

            {/* Lightbox / Fullscreen Modal */}
            {isLightboxOpen && ((announcement.images && announcement.images.length > 0) || announcement.image) && (
                <div
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 backdrop-blur-sm p-4 animate-in fade-in duration-200 print:hidden"
                    onClick={() => setIsLightboxOpen(false)}
                >
                    <button
                        onClick={() => setIsLightboxOpen(false)}
                        className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white p-2.5 rounded-full backdrop-blur-sm transition-all cursor-pointer"
                        title="Close Modal"
                    >
                        <X size={24} />
                    </button>

                    <div
                        className="relative max-w-5xl max-h-[85vh] w-full flex items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={getMediaUrl(announcement.images && announcement.images.length > 0 ? announcement.images[activeImgIdx] : announcement.image)}
                            alt={announcement.title}
                            className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
                        />

                        {announcement.images && announcement.images.length > 1 && (
                            <>
                                <button
                                    onClick={() => setActiveImgIdx((prev) => (prev === 0 ? announcement.images.length - 1 : prev - 1))}
                                    className="absolute left-4 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full shadow-lg transition-colors"
                                    title="Previous Image"
                                >
                                    <ChevronLeft size={24} />
                                </button>
                                <button
                                    onClick={() => setActiveImgIdx((prev) => (prev === announcement.images.length - 1 ? 0 : prev + 1))}
                                    className="absolute right-4 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full shadow-lg transition-colors"
                                    title="Next Image"
                                >
                                    <ChevronRight size={24} />
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </main>
    );
}
