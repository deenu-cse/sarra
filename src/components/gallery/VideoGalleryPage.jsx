'use client';

import React from 'react';
import { Play } from 'lucide-react';

const IMG = {
    hero: '/assets/images/banner.png',
};

const VIDEOS = [
    {
        iframe: <iframe src="https://www.youtube.com/embed/PIN1M1UFr6w?si=rKlVsl1V_VzgoLbK" className="w-full h-full rounded-2xl" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
    },
    {
        iframe: <iframe src="https://www.youtube.com/embed/-F2JnUuXkEw?si=nDc24v2DUlIyXB66" className="w-full h-full rounded-2xl" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
    },
    {
        iframe: <iframe src="https://www.youtube.com/embed/gCFs8nd_ROc?si=lypo5QPk1BoweEG2" className="w-full h-full rounded-2xl" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
    },
    {
        iframe: <iframe src="https://www.youtube.com/embed/lUPouTxRRrc?si=jglRM_-8MVb_h_3_" className="w-full h-full rounded-2xl" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
    },
    {
        iframe: <iframe src="https://www.youtube.com/embed/cIkAQkgoDfA?si=WaZX2SRFwdWnM4DJ" className="w-full h-full rounded-2xl" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
    }
];

function HeroSection() {
    return (
        <section className="relative w-full overflow-hidden" style={{ minHeight: '500px' }}>
            <img
                src={IMG.hero}
                alt="Video Gallery Banner"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ zIndex: 0 }}
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(15,23,42,0.85) 0%, rgba(30,58,95,0.8) 50%, rgba(10,48,85,0.7) 100%)', zIndex: 1 }} />

            <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 py-24 md:py-32">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white mb-4 tracking-tight leading-tight"
                    style={{ textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}>
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

function VideosSection() {
    return (
        <section className="w-full py-8 px-6 md:px-12 bg-[#f8fafc]">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <span className="text-[#f59e0b] font-sans font-bold uppercase tracking-widest text-sm mb-2 block">Our Stories</span>
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#1e3a5f]">Visual Documentation</h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
                    {VIDEOS.map((vid, idx) => (
                        <div key={idx} className="flex flex-col gap-4">
                            <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl bg-black group">
                                {vid.iframe}
                                <div className="absolute inset-0 pointer-events-none border-4 border-white/10 rounded-3xl" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default function VideoGalleryPage() {
    return (
        <main className="w-full font-sans">
            <HeroSection />
            <VideosSection />
        </main>
    );
}
