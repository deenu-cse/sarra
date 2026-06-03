'use client';

import React from 'react';
import Link from 'next/link';

const ResearchSupport = () => {
    const researchPartners = [
        { name: "IIT Roorkee", logo: "/assets/icons/iitr.png", role: "Research Support By" },
        { name: "NIH", logo: "/assets/icons/nih.png", role: "Research Support By" },
        { name: "CGWB", logo: "/assets/icons/cgwb.png", role: "Research Support By" },
    ];

    const departments = [
        { name: "Forest Department", logo: "/assets/icons/forest-logo.png", url: "https://forest.uk.gov.in" },
        { name: "Minor Irrigation", logo: "/assets/icons/Minor-Irrigation.png", url: "https://minorirrigation.uk.gov.in/" },
        { name: "Irrigation Department", logo: "/assets/icons/Irrigation.png", url: "https://irrigation.uk.gov.in/" },
        { name: "Rural Development", logo: "/assets/icons/uk-gov-logo.png", url: "https://ukrd.uk.gov.in/" },
        { name: "Urban Development", logo: "/assets/icons/uk-gov-logo.png", url: "https://udd.uk.gov.in/" },
        { name: "Peyjal Nigam", logo: "/assets/icons/peyjal.jpg", url: "https://peyjal.uk.gov.in/" },
        { name: "Uttarakhand Jal Sansthan", logo: "/assets/icons/jal-sansthan.png", url: "https://ujs.uk.gov.in/" },
        { name: "WMD", logo: "/assets/icons/WMD_LOGO.jpg", url: "https://wmduk.gov.in/" },
        { name: "Horticulture", logo: "/assets/icons/horticulture.png", url: "https://shm.uk.gov.in/" },
        { name: "Agriculture", logo: "/assets/icons/agriculture.jpg", url: "https://agriculture.uk.gov.in/" },
        { name: "FRI", logo: "/assets/icons/fri.png", url: "https://fridu.edu.in" },
        { name: "IISWC", logo: "/assets/icons/iswc.png", url: "#" },
        { name: "Earth Science", logo: "/assets/icons/earth_science.jpeg", url: "https://es.iitr.ac.in/" },
        { name: "WII", logo: "/assets/icons/wii.png", url: "https://wii.gov.in/" },
    ];

    return (
        <section className="w-full bg-[#f8fafc] py-8 px-4 md:px-12 font-sans border-t border-gray-200">
            <div className="max-w-[1200px] mx-auto">
                <div className="text-center mb-8 relative">
                    <h2 className="text-[32px] font-bold text-[#1e3a5f] tracking-tight">
                        Research Partners
                    </h2>

                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-blue-400/10 blur-3xl rounded-full pointer-events-none"></div>
                </div>

                <div className="flex overflow-x-auto md:grid md:grid-cols-3 gap-6 pb-2 pt-2 md:pb-0 mb-16 snap-x snap-mandatory" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    <style dangerouslySetInnerHTML={{
                        __html: `
                        .hide-scroll::-webkit-scrollbar { display: none; }
                    `}} />
                    {researchPartners.map((partner, idx) => {
                        const slug = partner.name.toLowerCase().replace(/\s+/g, '-');
                        return (
                            <Link
                                key={idx}
                                href={`/research-partners/${slug}`}
                                className="hide-scroll snap-center shrink-0 w-[85%] md:w-auto bg-white rounded-3xl p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-b-[5px] border-[#1e3a5f] hover:-translate-y-2 transition-transform duration-300 flex flex-col items-center text-center group cursor-pointer relative overflow-hidden"
                            >
                                <img src={partner.logo} alt={partner.name} className="w-full h-24 object-contain transition-all duration-300" onError={(e) => e.target.style.display = 'none'} />
                                <p className="text-xs text-[#f59e0b] font-bold uppercase tracking-widest mb-2 relative z-10">{partner.role}</p>
                                <h3 className="text-2xl font-bold text-[#1e3a5f] relative z-10">{partner.name}</h3>
                            </Link>
                        );
                    })}
                </div>

                <div className="w-full pb-2">
                    <div className="text-center mb-9">
                        <h3 className="text-[32px] font-bold text-[#1e3a5f] tracking-tight">
                            Departments
                        </h3>
                    </div>

                    <div className="hidden md:flex flex-wrap justify-center gap-x-12 gap-y-16 max-w-6xl mx-auto">
                        {departments.map((dept, idx) => (
                            <a href={dept.url} target="_blank" rel="noopener noreferrer" key={idx} className="flex flex-col items-center justify-start w-[150px] hover:-translate-y-2 transition-transform cursor-pointer">
                                <div className="h-[88px] mb-4 flex items-center justify-center w-full">
                                    <img
                                        src={dept.logo}
                                        alt={dept.name}
                                        className="max-h-full max-w-full object-contain"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = "https://via.placeholder.com/120x88?text=Logo";
                                        }}
                                    />
                                </div>
                                <p className="text-center text-gray-900 text-[15px] font-medium leading-snug px-1 hover:text-[#f59e0b] transition-colors">
                                    {dept.name}
                                </p>
                            </a>
                        ))}
                    </div>

                    {/* Mobile View: Marquee Carousel */}
                    <div className="md:hidden relative flex overflow-hidden w-full py-4">
                        <div className="flex animate-ticker gap-8 w-max hover:[animation-play-state:paused]">
                            {[...departments, ...departments].map((dept, idx) => (
                                <a href={dept.url} target="_blank" rel="noopener noreferrer" key={idx} className="flex flex-col items-center justify-start w-[130px] flex-shrink-0 cursor-pointer">
                                    <div className="h-16 mb-4 flex items-center justify-center w-full">
                                        <img
                                            src={dept.logo}
                                            alt={dept.name}
                                            className="max-h-full max-w-full object-contain"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = "https://via.placeholder.com/100x64?text=Logo";
                                            }}
                                        />
                                    </div>
                                    <p className="text-center text-gray-900 text-sm font-medium leading-snug px-1">
                                        {dept.name}
                                    </p>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ResearchSupport;
