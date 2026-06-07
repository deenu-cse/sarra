'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

const NotificationSection = ({ initialNews, initialAnnouncements }) => {
    const [activeTab, setActiveTab] = useState('notifications');
    const [isPaused, setIsPaused] = useState(false);
    const scrollContainerRef = useRef(null);
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);

    const newsItems = initialNews || [];
    const announcements = initialAnnouncements || [];

    let notificationsToDisplay = [];

    // Combine news and announcements
    const mappedNews = newsItems.map((item) => ({
        title: item.title,
        date: new Date(item.createdAt || item.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        slug: item.slug || item._id,
        isArticle: true,
    }));

    const mappedAnnouncements = announcements.map(item => ({
        title: item.title,
        date: new Date(item.date || item.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        slug: item.slug || item._id,
        isAnnouncement: true
    }));

    notificationsToDisplay = [...mappedNews, ...mappedAnnouncements];

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        let animationFrameId;

        const scroll = () => {
            if (!isPaused) {
                container.scrollTop += 0.5;
                if (container.scrollTop >= container.scrollHeight / 2) {
                    container.scrollTop = 0;
                }
            }
            animationFrameId = requestAnimationFrame(scroll);
        };

        animationFrameId = requestAnimationFrame(scroll);
        return () => cancelAnimationFrame(animationFrameId);
    }, [isPaused, activeTab]);


    return (
        <div className="bg-[#e9f0f7] px-5 py-10 md:py-16 font-sans">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6">

                <div className="flex-1 bg-white shadow-sm rounded-sm overflow-hidden flex flex-col relative">
                    <div className="flex justify-between items-center border-b overflow-x-auto no-scrollbar">
                        <div className="flex whitespace-nowrap">
                            <button
                                onClick={() => setActiveTab('news_announcements')}
                                className={`px-6 py-3 font-semibold text-[24px] transition-colors ${activeTab === 'news_announcements' || activeTab === 'notifications' || activeTab === 'announcements'
                                    ? 'bg-white text-[#0056b3] border-t-2 border-t-[#0056b3]'
                                    : 'bg-[#f8f9fa] text-gray-600 border-t-2 border-t-transparent hover:bg-gray-100'
                                    }`}
                            >
                                News & Announcements
                            </button>

                        </div>
                        <div className="pr-4 flex items-center shrink-0">
                            <button
                                onClick={() => setIsPaused(!isPaused)}
                                className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-600 focus:outline-none"
                                title={isPaused ? "Play Scroll" : "Pause Scroll"}
                            >
                                {isPaused ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    <div
                        ref={scrollContainerRef}
                        className="flex-1 max-h-[400px] overflow-y-auto scrollbar scrollbar-thumb-gray-400"
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                    >
                        {notificationsToDisplay.length === 0 ? (
                            <div className="p-8 text-center text-gray-500 font-medium">
                                No news or announcements at this time.
                            </div>
                        ) : (
                            notificationsToDisplay.map((item, index) => (
                                <div key={index} className="p-5 border-b flex justify-between items-start gap-4 hover:bg-gray-50 transition-colors">
                                    <div className="space-y-2">
                                        <h3 className="text-[#1a1a1a] font-bold text-[15px] leading-tight">
                                            {item.title}
                                        </h3>
                                        <div className="flex items-center text-sm text-gray-600 gap-2">
                                            <span>Date : {item.date}</span>
                                            {item.size && (
                                                <>
                                                    <span className="text-gray-300">|</span>
                                                    <span className="flex items-center text-red-600">
                                                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M4 18h12V6h-4V2H4v16zm2-2V4h4v4h4v8H6z" /></svg>
                                                        {item.size}
                                                    </span>
                                                </>
                                            )}
                                            {item.isArticle && (
                                                <>
                                                    <span className="text-gray-300">|</span>
                                                    <span className="text-[#0056b3] text-xs font-semibold"></span>
                                                </>
                                            )}
                                            {item.isAnnouncement && (
                                                <>
                                                    <span className="text-gray-300">|</span>
                                                    <span className="text-orange-500 text-xs font-bold uppercase">📢 Announcement</span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    {item.isArticle ? (
                                        <Link
                                            href={`/news/${item.slug}`}
                                            className="border border-[#0056b3] text-[#0056b3] px-6 py-1 rounded-sm text-sm font-semibold hover:bg-[#0056b3] hover:text-white transition-all whitespace-nowrap"
                                        >
                                            Read
                                        </Link>
                                    ) : item.isAnnouncement ? (
                                        <Link
                                            href={`/announcements/${item.slug}`}
                                            className="border border-orange-500 text-orange-500 px-6 py-1 rounded-sm text-sm font-bold hover:bg-orange-500 hover:text-white transition-all whitespace-nowrap"
                                        >
                                            View
                                        </Link>
                                    ) : (
                                        <button className="border border-[#0056b3] text-[#0056b3] px-6 py-1 rounded-sm text-sm font-semibold hover:bg-[#0056b3] hover:text-white transition-all whitespace-nowrap">
                                            View
                                        </button>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                    <div className="p-4 flex justify-between md:justify-end items-center bg-white border-t">
                        <Link
                            href="/news"
                            className="bg-[#ffc107] hover:bg-[#e0a800] text-black font-bold px-8 py-2 rounded-sm text-sm transition-colors uppercase tracking-wider"
                        >
                            View All News
                        </Link>
                    </div>
                </div>

                {/* <div
                    className="hidden md:block w-full md:w-[350px] bg-white rounded-lg shadow-md overflow-hidden relative min-h-[450px] cursor-pointer group"
                    onClick={() => setIsImageModalOpen(true)}
                >
                    <img
                        src="/assets/maps/Major Watershed.jpeg"
                        alt="Section Feature"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="text-white font-bold text-lg border-2 border-white px-4 py-2 rounded-md bg-black/30 backdrop-blur-sm transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                            Click to View
                        </span>
                    </div>
                </div> */}

            </div>
            {/* {isImageModalOpen && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center backdrop-blur-sm p-4 bg-black/80"
                    onClick={() => setIsImageModalOpen(false)}
                >
                    <div
                        className="relative w-full max-w-6xl max-h-[92vh] bg-transparent rounded-3xl overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setIsImageModalOpen(false)}
                            className="absolute top-4 right-4 z-30 w-11 h-11 rounded-full bg-black/60 hover:bg-[#f59e0b] text-white flex items-center justify-center transition-all cursor-pointer"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>

                        <div className="relative w-full h-[60vh] md:h-[80vh] bg-transparent flex items-center justify-center">
                            <img
                                src="/assets/maps/Major Watershed.jpeg"
                                alt="Section Feature Full"
                                className="max-w-full max-h-full object-contain"
                            />
                        </div>
                    </div>
                </div>
            )} */}
        </div>
    );
};

export default NotificationSection;