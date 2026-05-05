'use client';

import React, { useState, useRef, useEffect } from 'react';

const NotificationSection = () => {
    const [activeTab, setActiveTab] = useState('notifications');
    const [isPaused, setIsPaused] = useState(false);
    const scrollContainerRef = useRef(null);
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [zoomLevel, setZoomLevel] = useState(1);

    const notifications = [
        {
            title: "Publicity of enhancement of EWS income criteria to Rs. 5,00,000/- in compliance of High Court Order dated 02.01.2026",
            date: "17-Mar-2026",
            size: "189.5 KB"
        },
        {
            title: "NOTICE INVITING APPLICATIONS FROM CBC/DIP EMPANELLED AGENCIES BASED IN DELHI NCR FOR EMPANELMENT IN THE OFFICE OF CHIEF ELECTORAL OFFICER (CEO)-DELHI ...",
            date: "16-Mar-2026",
            size: "1.49 MB"
        },
        {
            title: "NOTICE INVITING APPLICATIONS FROM CBC/DIP EMPANELLED AGENCIES BASED IN DELHI NCR FOR EMPANELMENT IN THE OFFICE OF CHIEF ELECTORAL OFFICER CEO DELHI FO...",
            date: "16-Mar-2026",
            size: "1.4 MB"
        }
    ];

    const displayNotifications = [...notifications, ...notifications];

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        let animationFrameId;

        const scroll = () => {
            if (!isPaused) {
                container.scrollTop += 0.5; // Adjust speed here

                if (container.scrollTop >= container.scrollHeight / 2) {
                    container.scrollTop = 0;
                }
            }
            animationFrameId = requestAnimationFrame(scroll);
        };

        animationFrameId = requestAnimationFrame(scroll);

        return () => cancelAnimationFrame(animationFrameId);
    }, [isPaused]);

    const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.5, 4));
    const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.5, 0.5));
    const handleResetZoom = () => setZoomLevel(1);

    return (
        <div className="bg-[#e9f0f7] p-5 min-h-[90vh] font-sans">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6">

                <div className="flex-1 bg-white shadow-sm rounded-sm overflow-hidden flex flex-col relative">
                    <div className="flex justify-between items-center border-b">
                        <div className="flex">
                            <button
                                onClick={() => setActiveTab('notifications')}
                                className={`px-6 py-3 font-semibold text-sm transition-colors ${activeTab === 'notifications'
                                    ? 'bg-white text-[#0056b3] border-t-2 border-t-[#0056b3]'
                                    : 'bg-[#f8f9fa] text-gray-600 border-t-2 border-t-transparent'
                                    }`}
                            >
                                Notifications
                            </button>
                            <button
                                onClick={() => setActiveTab('tenders')}
                                className={`px-6 py-3 font-semibold text-sm transition-colors ${activeTab === 'tenders'
                                    ? 'bg-white text-[#0056b3] border-t-2 border-t-[#0056b3]'
                                    : 'bg-[#f8f9fa] text-gray-600 border-t-2 border-t-transparent'
                                    }`}
                            >
                                Tenders
                            </button>
                            <button
                                onClick={() => setActiveTab('ongoingprojects')}
                                className={`px-6 py-3 font-semibold text-sm transition-colors ${activeTab === 'ongoingprojects'
                                    ? 'bg-white text-[#0056b3] border-t-2 border-t-[#0056b3]'
                                    : 'bg-[#f8f9fa] text-gray-600 border-t-2 border-t-transparent'
                                    }`}
                            >
                                On Going Projects
                            </button>
                        </div>
                        <div className="pr-4 flex items-center">
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
                        {displayNotifications.map((item, index) => (
                            <div key={index} className="p-5 border-b flex justify-between items-start gap-4 hover:bg-gray-50 transition-colors">
                                <div className="space-y-2">
                                    <h3 className="text-[#1a1a1a] font-bold text-[15px] leading-tight">
                                        {item.title}
                                    </h3>
                                    <div className="flex items-center text-sm text-gray-600 gap-2">
                                        <span>Date : {item.date}</span>
                                        <span className="text-gray-300">|</span>
                                        <span className="flex items-center text-red-600">
                                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M4 18h12V6h-4V2H4v16zm2-2V4h4v4h4v8H6z" /></svg>
                                            {item.size}
                                        </span>
                                    </div>
                                </div>
                                <button className="border border-[#0056b3] text-[#0056b3] px-6 py-1 rounded-sm text-sm font-semibold hover:bg-[#0056b3] hover:text-white transition-all whitespace-nowrap">
                                    View
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="p-4 flex justify-between md:justify-end items-center bg-white border-t">
                        <button
                            onClick={() => setIsImageModalOpen(true)}
                            className="md:hidden text-[#0056b3] font-bold text-sm flex items-center gap-2 hover:underline"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z" clipRule="evenodd" />
                            </svg>
                            See River Map
                        </button>
                        <button className="bg-[#ffc107] hover:bg-[#e0a800] text-black font-bold px-8 py-2 rounded-sm text-sm transition-colors uppercase tracking-wider">
                            View All
                        </button>
                    </div>
                </div>

                {/* Right Section: Image */}
                <div
                    className="hidden md:block w-full md:w-[350px] bg-white rounded-lg shadow-md overflow-hidden relative min-h-[450px] cursor-pointer group"
                    onClick={() => setIsImageModalOpen(true)}
                >
                    <img
                        src="/assets/rivermap.png"
                        alt="Section Feature"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="text-white font-bold text-lg border-2 border-white px-4 py-2 rounded-md bg-black/30 backdrop-blur-sm transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                            Click to View
                        </span>
                    </div>
                </div>

            </div>

            {/* Image Modal */}
            {isImageModalOpen && (
                <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/90 backdrop-blur-sm transition-opacity">
                    {/* Modal Controls */}
                    <div className="absolute top-6 right-6 flex gap-4 z-[110]">
                        <div className="flex bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
                            <button
                                onClick={handleZoomOut}
                                className="text-white hover:bg-gray-700 p-3 transition-colors flex items-center justify-center"
                                title="Zoom Out"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM13.5 10.5h-6" />
                                </svg>
                            </button>
                            <div className="w-px bg-gray-700"></div>
                            <button
                                onClick={handleResetZoom}
                                className="text-white hover:bg-gray-700 p-3 transition-colors flex items-center justify-center text-sm font-semibold min-w-[60px]"
                                title="Reset Zoom"
                            >
                                {Math.round(zoomLevel * 100)}%
                            </button>
                            <div className="w-px bg-gray-700"></div>
                            <button
                                onClick={handleZoomIn}
                                className="text-white hover:bg-gray-700 p-3 transition-colors flex items-center justify-center"
                                title="Zoom In"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
                                </svg>
                            </button>
                        </div>
                        <button
                            onClick={() => { setIsImageModalOpen(false); handleResetZoom(); }}
                            className="text-white bg-red-600 hover:bg-red-700 p-3 rounded-lg transition-colors flex items-center justify-center"
                            title="Close"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Image Container with Scroll for Panning */}
                    <div className="w-full h-full overflow-auto flex items-center justify-center p-8 relative scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
                        <img
                            src="/assets/rivermap.png"
                            alt="Section Feature Full"
                            className="max-w-none transition-transform duration-300 ease-out origin-center"
                            style={{
                                transform: `scale(${zoomLevel})`,
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationSection;