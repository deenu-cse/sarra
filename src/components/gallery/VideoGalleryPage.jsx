'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Play } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const IMG = {
    hero: '/assets/images/banner.png',
};

const STATIC_VIDEOS = [
    {
        videoId: "PIN1M1UFr6w",
        title: "SARRA - Mission Overview & Water Conservation"
    },
    {
        videoId: "-F2JnUuXkEw",
        title: "Community Engagement & Fieldwork Uttarakhand"
    },
    {
        videoId: "gCFs8nd_ROc",
        title: "Spring & River Basin Rejuvenation Drive"
    },
    {
        videoId: "lUPouTxRRrc",
        title: "Field Progress & Community Action"
    },
    {
        videoId: "cIkAQkgoDfA",
        title: "Awareness Campaign & Ecological Restoration"
    }
];

function HeroSection() {
    return (
        <section className="relative w-full overflow-hidden min-h-[500px]">
            <img
                src={IMG.hero}
                alt="Video Gallery Banner"
                className="absolute inset-0 w-full h-full object-cover z-0"
            />
            <div className="absolute inset-0 z-10 bg-[linear-gradient(135deg,rgba(15,23,42,0.85)_0%,rgba(30,58,95,0.8)_50%,rgba(10,48,85,0.7)_100%)]" />

            <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 py-24 md:py-32">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white mb-4 tracking-tight leading-tight [text-shadow:0_2px_20px_rgba(0,0,0,0.3)]">
                    Video <span className="text-[#f59e0b]">Gallery</span>
                </h1>
                <p className="text-white/80 text-lg md:text-xl max-w-2xl mb-8 font-light leading-relaxed">
                    Watch our mission in action through documentary features and fieldwork reports.
                </p>
            </div>

            <div className="absolute bottom-0 left-0 right-0 z-10">
                <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
                    <path d="M0 60V30C240 0 480 0 720 30C960 60 1200 60 1440 30V60H0Z" fill="white" />
                </svg>
            </div>
        </section>
    );
}

export default function VideoGalleryPage() {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const res = await axios.get(`${API_URL}/videos`);
                const data = res.data.data || res.data || [];
                setVideos(data);
            } catch (err) {
                console.error("Failed to fetch gallery videos:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchVideos();
    }, []);

    const allVideos = [...videos, ...STATIC_VIDEOS];

    return (
        <main className="w-full font-sans">
            <HeroSection />
            
            <section className="w-full py-8 px-6 md:px-12 bg-[#f8fafc]">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <span className="text-[#f59e0b] font-sans font-bold uppercase tracking-widest text-sm mb-2 block">Our Stories</span>
                        <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#1e3a5f]">Visual Documentation</h2>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1e3a5f]"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
                            {allVideos.map((vid, idx) => (
                                <div key={vid._id || `static-${idx}`} className="flex flex-col gap-4">
                                    <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl bg-black group">
                                        <iframe
                                            src={`https://www.youtube.com/embed/${vid.videoId}`}
                                            className="w-full h-full rounded-2xl"
                                            title={vid.title || "YouTube video player"}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            allowFullScreen
                                        ></iframe>
                                        <div className="absolute inset-0 pointer-events-none border-4 border-white/10 rounded-3xl" />
                                    </div>
                                    {vid.title && (
                                        <h3 className="text-xl font-serif font-bold text-[#1e3a5f] px-2 leading-snug">
                                            {vid.title}
                                        </h3>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
