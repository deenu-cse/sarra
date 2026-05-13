'use client';

import React from 'react';
import Link from 'next/link';

const IMG = {
    hero: '/assets/news/newbanner.png',
};

function HeroSection() {
    return (
        <section className="relative w-full overflow-hidden" style={{ minHeight: '400px' }}>
            <img
                src={IMG.hero}
                alt="News Banner"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ zIndex: 0 }}
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(15,23,42,0.88) 0%, rgba(30,58,95,0.82) 50%, rgba(10,48,85,0.75) 100%)', zIndex: 1 }} />
            <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5c8 0 15 12 15 25s-7 25-15 25S15 43 15 30 22 5 30 5z' fill='white' fill-opacity='0.4'/%3E%3C/svg%3E")`, backgroundSize: '80px 80px', zIndex: 2 }} />

            <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 py-24 md:py-32 h-full">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white mb-4 tracking-tight leading-tight"
                    style={{ textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}>
                    SARRA <span className="text-[#f59e0b]">News</span>
                </h1>
                <p className="text-white/80 text-lg md:text-xl max-w-2xl mb-8 font-light leading-relaxed">
                    Stay updated with the latest news, announcements, and developments for Jal Sanrakshan.
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

const NewsLayout = () => {
    return (
        <div className="max-w-7xl mx-auto p-4 md:p-8 bg-white text-slate-900 font-sans">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
                <Link href="/news/river-rejuvenation-breakthrough" className="md:col-span-2 relative group overflow-hidden rounded-lg h-[450px] block">
                    <img
                        src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        alt="Water conservation"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 p-6 text-white">
                        <div className="flex gap-2 mb-3">
                            <span className="bg-[#1e3a5f] text-[10px] px-2 py-0.5 rounded uppercase font-bold tracking-wider">Environment</span>
                            <span className="bg-[#f59e0b] text-[10px] px-2 py-0.5 rounded uppercase font-bold text-slate-900 tracking-wider">Conservation</span>
                        </div>
                        <h2 className="text-2xl font-serif font-bold leading-tight mb-3">
                            New Breakthrough in River Rejuvenation Shows Promise In Uttarakhand
                        </h2>
                        <div className="flex items-center gap-2 text-xs opacity-80 font-medium">
                            <span>By SARRA Media</span>
                            <span>•</span>
                            <span>May 10, 2026</span>
                        </div>
                    </div>
                </Link>

                {/* Right Stack */}
                <div className="md:col-span-2 grid grid-rows-2 gap-4">
                    {/* Top Right Cards */}
                    <div className="grid grid-cols-2 gap-4">
                        <SmallFeatureCard
                            category="Initiative"
                            title="Spring Mapping Project Completed in Pauri Garhwal"
                            img="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=400"
                        />
                        <SmallFeatureCard
                            category="Community"
                            title="Local Villages Participate in Naula Restoration"
                            img="https://images.unsplash.com/photo-1505503462940-27ceaf9af8db?auto=format&fit=crop&q=80&w=400"
                        />
                    </div>
                    {/* Bottom Wide Card */}
                    <Link href="/news/jal-sanrakshan-targets" className="relative group overflow-hidden rounded-lg block">
                        <img
                            src="https://images.unsplash.com/photo-1543872084-c7bd3822856f?auto=format&fit=crop&q=80&w=800"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            alt="Jal Sanrakshan"
                        />
                        <div className="absolute inset-0 bg-black/50" />
                        <div className="absolute bottom-0 p-4 text-white">
                            <div className="flex gap-2 mb-2">
                                <span className="bg-[#1e3a5f] text-[10px] px-2 py-0.5 rounded tracking-wider">Campaign</span>
                                <span className="bg-[#f59e0b] text-slate-900 font-semibold text-[10px] px-2 py-0.5 rounded tracking-wider">Update</span>
                            </div>
                            <h3 className="text-lg font-serif font-bold text-white">Jal Sanrakshan Abhiyan 2025 Targets Reached Ahead of Schedule</h3>
                        </div>
                    </Link>
                </div>
            </div>

            {/* --- BOTTOM SECTION: CATEGORIES & POPULAR --- */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Categories Section */}
                <div className="lg:col-span-2">
                    <div className="flex items-center justify-between border-b border-gray-200 pb-2 mb-6">
                        <h2 className="text-xl font-serif font-bold border-l-4 border-[#f59e0b] pl-3 text-[#1e3a5f]">Categories</h2>
                        <nav className="flex gap-4 text-xs font-bold text-gray-500 uppercase tracking-wider overflow-x-auto">
                            <span className="text-[#f59e0b] cursor-pointer whitespace-nowrap">All</span>
                            <span className="hover:text-[#f59e0b] transition-colors cursor-pointer whitespace-nowrap">Water News</span>
                            <span className="hover:text-[#f59e0b] transition-colors cursor-pointer whitespace-nowrap">Policies</span>
                            <span className="hover:text-[#f59e0b] transition-colors cursor-pointer whitespace-nowrap">Community</span>
                        </nav>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Left Large Category Card */}
                        <Link href="/news/satellite-imaging" className="relative group rounded-lg overflow-hidden h-[400px] block">
                            <img src="https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="Technology" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
                            <div className="absolute bottom-0 p-4 text-white">
                                <div className="flex gap-2 mb-2">
                                    <span className="bg-[#1e3a5f] text-[10px] px-2 py-0.5 rounded tracking-wider">Technology</span>
                                    <span className="bg-[#f59e0b] text-slate-900 font-semibold text-[10px] px-2 py-0.5 rounded tracking-wider">Innovation</span>
                                </div>
                                <h3 className="text-xl font-serif font-bold mb-2">How Satellite Imaging Is Transforming Water Mapping In 2025</h3>
                                <div className="flex items-center gap-2 text-[10px] opacity-80 font-medium">
                                    <span>Dr. Anil Joshi</span> <span>•</span> <span>May 05, 2026</span>
                                </div>
                            </div>
                        </Link>

                        {/* Right List of Category Cards */}
                        <div className="flex flex-col gap-4">
                            <CategoryListItem
                                title="Historic Agreement Signed for Inter-District River Basin Management"
                                img="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=200"
                                category="Policies"
                            />
                            <CategoryListItem
                                title="State Government Unveils Comprehensive Water Security Plan"
                                img="https://images.unsplash.com/photo-1541888086925-0c13d4cc8e13?auto=format&fit=crop&q=80&w=200"
                                category="Government"
                            />
                            <CategoryListItem
                                title="National Climate Summit Concludes With Ambitious Goals for Uttarakhand"
                                img="https://images.unsplash.com/photo-1516962126636-27ad08874e20?auto=format&fit=crop&q=80&w=200"
                                category="Environment"
                            />
                        </div>
                    </div>
                </div>

                {/* Popular News Sidebar */}
                <div className="lg:col-span-1">
                    <h2 className="text-xl font-serif font-bold border-l-4 border-[#f59e0b] pl-3 mb-6 text-[#1e3a5f]">Popular News</h2>
                    <div className="space-y-6">
                        <Link href="/news/micro-irrigation-success" className="relative rounded-lg overflow-hidden h-48 group block">
                            <img src="https://images.unsplash.com/photo-1600861194942-f883de0dfe96?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="Agriculture" />
                            <div className="absolute inset-0 bg-black/40 p-4 flex flex-col justify-end transition-colors group-hover:bg-black/50">
                                <span className="bg-[#1e3a5f] w-fit text-[10px] px-2 py-0.5 rounded text-white mb-2 uppercase tracking-wider">Spotlight</span>
                                <h3 className="text-white font-serif font-bold leading-tight">Unveiling The Success of Micro-Irrigation Projects in Tehri</h3>
                            </div>
                        </Link>

                        <div className="space-y-4">
                            <SidebarItem title="The Environmental Impact of Deforestation on Local Springs" img="https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&q=80&w=100" />
                            <SidebarItem title="Major Funding Allocated for Check Dams Across Kumaon Region" img="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=100" />
                            <SidebarItem title="Innovative Startups Disrupting Traditional Water Purification" img="https://images.unsplash.com/photo-1542361345-89ce1d111bd2?auto=format&fit=crop&q=80&w=100" />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

/* --- Sub-Components --- */

const SmallFeatureCard = ({ category, title, img }) => (
    <Link href="/news/article-stub" className="relative group overflow-hidden rounded-lg h-full min-h-[200px] block">
        <img src={img} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt={title} />
        <div className="absolute inset-0 bg-black/40 transition-colors group-hover:bg-black/50" />
        <div className="absolute bottom-0 p-3 text-white">
            <span className="bg-[#1e3a5f] text-[9px] px-2 py-0.5 rounded mb-2 inline-block tracking-wider uppercase font-semibold">{category}</span>
            <h3 className="text-sm font-serif font-bold leading-snug line-clamp-2">{title}</h3>
        </div>
    </Link>
);

const CategoryListItem = ({ title, img, category }) => (
    <Link href="/news/article-stub" className="flex gap-4 items-center group">
        <div className="overflow-hidden rounded shadow-sm shrink-0">
            <img src={img} className="w-24 h-24 object-cover transition-transform duration-500 group-hover:scale-105" alt="" />
        </div>
        <div>
            <span className="text-[10px] font-bold text-[#f59e0b] uppercase mb-1 block tracking-wider">{category}</span>
            <h4 className="text-sm font-serif font-bold leading-tight text-slate-800 transition-colors group-hover:text-[#f59e0b] cursor-pointer line-clamp-2">{title}</h4>
            <div className="flex items-center gap-2 text-[10px] text-gray-500 mt-2 font-medium">
                <span>SARRA Desk</span>
            </div>
        </div>
    </Link>
);

const SidebarItem = ({ title, img }) => (
    <Link href="/news/article-stub" className="flex gap-3 items-center border-b border-gray-100 pb-3 group">
        <div className="overflow-hidden rounded shadow-sm shrink-0">
            <img src={img} className="w-16 h-16 object-cover transition-transform duration-500 group-hover:scale-105" alt="" />
        </div>
        <div>
            <h4 className="text-xs font-serif font-bold text-slate-800 leading-tight transition-colors group-hover:text-[#f59e0b] cursor-pointer line-clamp-2">{title}</h4>
            <span className="text-[9px] text-gray-400 mt-1.5 block font-medium">SARRA Updates</span>
        </div>
    </Link>
);

export default function NewsPage() {
    return (
        <main className="w-full bg-white">
            <HeroSection />
            <NewsLayout />
        </main>
    );
}
