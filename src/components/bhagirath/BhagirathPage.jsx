'use client';

import React from 'react';

const IMG = {
    hero: '/assets/bhagirithi/SARRA_3.jpeg',
    infoImage: '/assets/bhagirithi/SARRA_3.jpeg',
    ui1: '/assets/bhagirithi/bhg1.jpeg',
    ui2: '/assets/bhagirithi/bhg2.jpeg',
};

function HeroSection() {
    return (
        <section className="relative w-full overflow-hidden min-h-[500px]">
            <img
                src={IMG.hero}
                alt="Bhagirath App Banner"
                className="absolute inset-0 w-full h-full object-cover z-0"
            />
            <div className="absolute inset-0 z-10 bg-[linear-gradient(135deg,rgba(15,23,42,0.88)_0%,rgba(30,58,95,0.82)_50%,rgba(10,48,85,0.75)_100%)]" />

            <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 py-24 md:py-32">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white mb-4 tracking-tight leading-tight [text-shadow:0_2px_20px_rgba(0,0,0,0.3)]">
                    Bhagirath <span className="text-[#f59e0b]">App</span>
                </h1>
                <p className="text-white/80 text-lg md:text-xl max-w-2xl mb-8 font-light leading-relaxed">
                    A QR Code-based digital initiative for Jal Sanrakshan Abhiyan 2025.
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

function InfoSection() {
    return (
        <section className="w-full py-7 px-6 md:px-12 bg-white">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 items-center">
                <div className="w-full lg:w-1/2 flex justify-center">
                    <div className="relative w-full overflow-hidden">
                        <img
                            src={IMG.infoImage}
                            alt="SARRA Action"
                            className="w-full h-auto object-cover"
                        />
                    </div>
                </div>

                <div className="w-full lg:w-1/2 space-y-6">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1e3a5f]">
                            Bhagirath Mobile App
                        </h2>
                        <h3 className="text-xl md:text-2xl font-sans font-semibold text-[#f59e0b] mt-3 italic">
                            "धारा मेरा, नौला मेरा, गांव मेरा, प्रयास मेरा"
                        </h3>
                    </div>

                    <div className="space-y-5 text-gray-700 text-[15px] md:text-base leading-relaxed text-justify">
                        <p>
                            In the context of accelerating climate change, the natural water sources of Uttarakhand — rivers, streams (Dhara), traditional step-wells (Naula), and seasonal rivulets (Gadhera) — are being severely impacted. Human lives, forests, and wildlife across the Himalayan state are all bearing the consequences.
                        </p>
                        <p>
                            To address this critical challenge, the Government of Uttarakhand took an ambitious step and established the Spring and River Rejuvenation Authority (SARRA) — a pioneering initiative of its kind. Through this authority, a unified programme of restoration and management of all natural water sources has been launched, powered by public participation and coordinated effort across multiple government departments.
                        </p>
                        <p>
                            To transform this into a true people's movement, the "Jal Sanrakshan Abhiyan 2025" was launched under the theme "Dhara mera, Naula mera, Gaon mera, Prayas mera" — meaning "My stream, my step-well, my village, my effort." To enable mass participation in this Bhagirath endeavour, the QR Code–based <strong>Bhagirath Mobile App</strong> was created.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

function LaunchPhotosSection() {
    const photos = [
        '/assets/bhagirithi/gal1.jpeg',
        '/assets/bhagirithi/gal2.jpeg',
        '/assets/bhagirithi/gal3.jpeg',
    ];

    return (
        <section className="w-full py-12 px-6 md:px-12 bg-gray-50 border-t border-gray-200">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1e3a5f]">
                        App Launch & Training Programs
                    </h2>
                    <p className="text-gray-600 mt-4 font-medium text-lg">
                        Glimpses from the official launch and training sessions of Bhagirath App
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {photos.map((img, idx) => (
                        <div key={idx} className="group relative rounded-2xl overflow-hidden shadow-xl border-4 border-white hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                            <img src={img} alt={`Launch Photo ${idx + 1}`} className="w-full h-[300px] object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function UISection() {
    return (
        <section className="w-full md:w-[68%] mx-auto bg-white flex flex-col items-center pb-20">
            <img src={IMG.ui1} alt="Bhagirath UI 1" className="w-full h-auto block" />
            <img src={IMG.ui2} alt="Bhagirath UI 2" className="w-full h-auto block" />
        </section>
    );
}

export default function BhagirathPage() {
    return (
        <main className="w-full font-sans">
            <HeroSection />
            <InfoSection />
            <LaunchPhotosSection />
            <UISection />
        </main>
    );
}
