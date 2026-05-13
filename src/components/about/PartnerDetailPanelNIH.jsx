"use client";

import React, { useState } from 'react';
import {
    Calendar, Waves, Mountain, FlaskConical, CloudRain, Network,
    Activity, Layers, Shovel, TrendingUp, Trees, MapPin,
    AlertTriangle, Leaf, CheckCircle2, Download, Satellite, Map,
    ShieldCheck, Settings
} from 'lucide-react';

const IMG = {
    hero: '/assets/research-partners/nihbanner.png'
};

function HeroSection() {
    return (
        <section className="relative w-full overflow-hidden" style={{ minHeight: '500px' }}>
            <img
                src={IMG.hero}
                alt="Research Partner Banner"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ zIndex: 0 }}
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(15,23,42,0.88) 0%, rgba(30,58,95,0.82) 50%, rgba(10,48,85,0.75) 100%)', zIndex: 1 }} />
            <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5c8 0 15 12 15 25s-7 25-15 25S15 43 15 30 22 5 30 5z' fill='white' fill-opacity='0.4'/%3E%3C/svg%3E")`, backgroundSize: '80px 80px', zIndex: 2 }} />

            <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 py-24 md:py-32">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white mb-4 tracking-tight leading-tight"
                    style={{ textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}>
                    Research <span className="text-[#f59e0b]">Partners</span>
                </h1>
                <p className="text-white/80 text-lg md:text-xl max-w-2xl mb-8 font-light leading-relaxed">
                    Collaborating with leading institutions to bring scientific rigor to river rejuvenation.
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

const ResearchPartnerCard = () => {
    return (
        <div className="md:max-w-6xl w-full mx-auto p-4 pt-0 font-sans text-slate-800">
            <div className="flex items-center gap-2 mb-4 border-b border-blue-100 pb-2">
                <div className="bg-blue-900 p-1 rounded-full">
                    <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-blue-900 rounded-full" />
                    </div>
                </div>
                <h2 className="text-blue-900 font-bold uppercase tracking-wide text-sm">Research Partners</h2>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">

                <div className="p-4 md:p-6 flex flex-col md:flex-row gap-6 items-center">
                    <div className="flex items-center gap-6 flex-1">
                        <div className="w-20 h-20 md:w-40 md:h-40 flex-shrink-0">
                            <img
                                src="/assets/icons/nih.png"
                                alt="NIH Logo"
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <div className="space-y-1">
                            <h1 className="text-3xl font-bold text-blue-900 leading-tight">NIH</h1>
                            <p className="text-slate-600 font-medium">National Institute of Hydrology</p>
                            <p className="text-slate-500 text-sm italic">Roorkee, Uttarakhand</p>
                        </div>
                    </div>

                    <div className="relative h-32 w-full md:w-72 rounded-xl overflow-hidden hidden lg:block">
                        <img
                            src="/assets/research-partners/nihimg.jpg"
                            alt="NIH Campus"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white opacity-60"></div>
                    </div>

                    <div className="flex flex-col gap-3 w-full md:w-auto">
                        <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 flex items-center gap-3 min-w-[200px]">
                            <Calendar className="text-blue-700 w-6 h-6" />
                            <div>
                                <p className="text-xs text-slate-500 font-semibold uppercase">Research Support</p>
                                <p className="text-blue-900 font-bold">August 2025</p>
                            </div>
                        </div>
                        <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 flex items-center gap-3">
                            <Waves className="text-blue-700 w-6 h-6" />
                            <p className="text-blue-900 font-bold uppercase tracking-tight">2 River Basins</p>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-50/50 md:p-6 p-2 border-t border-slate-100">
                    <div className="flex flex-col lg:flex-row gap-8">
                        <div className="w-full lg:w-1/4">
                            <div className="overflow-hidden border-slate-200">
                                <img
                                    src="/assets/research-partners/research.png"
                                    alt="Researcher"
                                    className="w-full h-auto aspect-square object-cover"
                                />
                            </div>
                        </div>

                        <div className="flex-1 space-y-6">
                            <p className="text-slate-700 leading-relaxed text-sm md:text-[1.05rem]">
                                <span className="font-semibold">National Institute of Hydrology (NIH)</span> conducted scientific sub-basin prioritization studies for two spring-fed Uttarakhand river basins — <span className="font-semibold italic">Song (Dehradun)</span> and <span className="font-semibold italic">Nayar (Pauri Garhwal)</span> — using morphometric analysis, LULC change detection (1995–2024), and detailed rainfall trend assessments to provide actionable frameworks for SARRA's river rejuvenation programme.
                            </p>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="bg-white md:p-4 p-2 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
                                    <div className="bg-blue-900 p-2 rounded-full text-white">
                                        <Mountain size={24} />
                                    </div>
                                    <div>
                                        <div className="text-3xl font-bold text-blue-900">2</div>
                                        <div className="text-xs text-slate-500 font-medium leading-tight">River basins<br />studied</div>
                                    </div>
                                </div>

                                <div className="bg-emerald-700 md:p-4 p-2 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3 text-white">
                                    <div className="bg-emerald-800 p-2 rounded-full">
                                        <FlaskConical size={24} />
                                    </div>
                                    <div>
                                        <div className="text-3xl font-bold text-white">76</div>
                                        <div className="text-xs text-emerald-100 font-medium leading-tight">Micro-watersheds<br />analyzed</div>
                                    </div>
                                </div>

                                <div className="bg-white md:p-4 p-2 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
                                    <div className="bg-blue-800 p-2 rounded-full text-white">
                                        <Activity size={24} />
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-blue-800 tracking-tight">Top 5</div>
                                        <div className="text-xs text-slate-500 font-medium leading-tight text-nowrap">Priority<br />Identified</div>
                                    </div>
                                </div>

                                <div className="bg-white md:p-4 p-2 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
                                    <div className="bg-amber-600 p-2 rounded-full text-white">
                                        <CloudRain size={24} />
                                    </div>
                                    <div>
                                        <div className="text-xl font-bold text-amber-600 leading-tight">Trend</div>
                                        <div className="text-[11px] text-slate-500 font-medium leading-tight">Rainfall Analysis</div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const RiverBasinReport = () => {
    const [activeTab, setActiveTab] = useState('song');

    const BASIN_DATA = {
        song: {
            title: "Song River Catchment",
            subtitle: "Dehradun District · ~572 km² · Spring-fed (Ganga Tributary)",
            image: "song-river.png",
            stats: [
                { icon: <Waves size={18} />, label: "29 Micro-watersheds" },
                { icon: <Mountain size={18} />, label: "Elevation: 428 – 2,500 m" },
                { icon: <CloudRain size={18} />, label: "Rainfall: 1,451 mm/yr (81% Monsoon)" },
                { icon: <Activity size={18} />, label: "Priority Area: 64.85% High" },
                { icon: <Layers size={18} />, label: "Geology: Blaini, Tal, Shivalik" },
                { icon: <Shovel size={18} />, label: "Soil: Silty loam / Loamy" },
                { icon: <TrendingUp size={18} />, label: "Slope: 0 – 85%" }
            ],
            lulc: [
                { icon: <Trees className="text-green-800" />, label: "Forest", v1: "624.34", v2: "728.93", diff: "+104.59", pos: true },
                { icon: <div className="w-3 h-3 bg-blue-500 rounded-sm" />, label: "Water bodies", v1: "48.22", v2: "19.93", diff: "-28.29", pos: false },
                { icon: <div className="w-3 h-3 bg-orange-400 rounded-sm" />, label: "Crop land", v1: "114.28", v2: "92.87", diff: "-21.41", pos: false },
                { icon: <div className="w-3 h-3 bg-red-600 rounded-sm" />, label: "Built-up", v1: "77.66", v2: "115.79", diff: "+38.13", pos: true },
                { icon: <Leaf className="text-lime-500" />, label: "Shrub", v1: "103.65", v2: "10.62", diff: "-93.03", pos: false }
            ],
            rainfall: {
                monsoon: "Mixed (Declining at some stations, -420 mm)",
                annual: "Spatially variable (-409 mm to +169 mm)",
                days: "Mixed (-15 to +8 days)"
            },
            priorities: [
                { type: "HP", title: "High Priority (64.85%)", subBasins: "Rispana Rao, Song Nadi, Balawala, Golapani, Bandal Nadi", meanCF: "Rank 1-10", desc: "Urgent intervention needed: Urban runoff, erosion control & recharge structures.", color: "red", icon: <AlertTriangle className="text-red-600" /> },
                { type: "MP", title: "Medium Priority (24.57%)", subBasins: "Jakhan Rao 1, Churpanirao, Chiphaldi Nadi", meanCF: "Rank 11-20", desc: "Targeted conservation & sustainable land management.", color: "amber", icon: <Leaf className="text-amber-600" /> },
                { type: "LP", title: "Low Priority (10.57%)", subBasins: "Kansrao 1, Jakhan Rao 2, Ramgarh Rao", meanCF: "Rank 21-29", desc: "Periodic monitoring & maintenance.", color: "green", icon: <CheckCircle2 className="text-green-600" /> }
            ],
            topPriorities: [
                { name: "Rispana Rao", area: "117.54 km²", desc: "Carries urban sewage from Dehradun" },
                { name: "Song Nadi", area: "86.33 km²", desc: "Critical baseflow contribution" },
                { name: "Bandal Nadi", area: "83.75 km²", desc: "High conservation priority" },
                { name: "Balawala", area: "63.88 km²", desc: "Significant runoff area" },
                { name: "Golapani Rao", area: "59.18 km²", desc: "Erosion risk zone" },
            ]
        },
        nayar: {
            title: "Nayar River Catchment",
            subtitle: "Pauri Garhwal · ~1,956 km² · 2nd largest spring-fed river",
            image: "nayar-river.jpg", // Will default
            stats: [
                { icon: <Waves size={18} />, label: "47 Micro-watersheds" },
                { icon: <Mountain size={18} />, label: "Elevation: 428 – 3,102 m" },
                { icon: <CloudRain size={18} />, label: "Rainfall: 1,700 mm/yr" },
                { icon: <Activity size={18} />, label: "Priority Area: 48.78% High" },
                { icon: <Layers size={18} />, label: "Geology: Deoban, Tal, Krol" },
                { icon: <Shovel size={18} />, label: "Soil: Deep Silty loam" },
                { icon: <TrendingUp size={18} />, label: "Slope: 0 – 89%" }
            ],
            lulc: [
                { icon: <Trees className="text-green-800" />, label: "Forest", v1: "852.72", v2: "938.60", diff: "+85.88", pos: true },
                { icon: <div className="w-3 h-3 bg-blue-500 rounded-sm" />, label: "Water bodies", v1: "46.03", v2: "51.13", diff: "+5.10", pos: true },
                { icon: <div className="w-3 h-3 bg-orange-400 rounded-sm" />, label: "Crop land", v1: "134.94", v2: "87.78", diff: "-47.16", pos: false },
                { icon: <div className="w-3 h-3 bg-red-600 rounded-sm" />, label: "Built-up", v1: "180.85", v2: "274.23", diff: "+93.38", pos: true },
                { icon: <div className="w-3 h-3 bg-amber-700 rounded-sm" />, label: "Wasteland", v1: "31.21", v2: "15.33", diff: "-15.88", pos: false }
            ],
            rainfall: {
                monsoon: "Significant Declining Trend (-512 mm total)",
                annual: "Substantial Decline (-557 mm total)",
                days: "Declining (-27 days total)"
            },
            priorities: [
                { type: "HP", title: "High Priority (48.78%)", subBasins: "Chargad, Medigad, Irgad, Sidhkhal, Dudhatoligad", meanCF: "Rank 1-16", desc: "Urgent: Declining rainfall + forest degradation control.", color: "red", icon: <AlertTriangle className="text-red-600" /> },
                { type: "MP", title: "Medium Priority (32.43%)", subBasins: "Kaligad, Baligad, Kandali Nadi, Machhigad", meanCF: "Rank 17-32", desc: "Manage sedimentation & maintain baseflow.", color: "amber", icon: <Leaf className="text-amber-600" /> },
                { type: "LP", title: "Low Priority (18.79%)", subBasins: "Patisain, Chandol, Panchard, Choya", meanCF: "Rank 33-47", desc: "Protection & preservation.", color: "green", icon: <CheckCircle2 className="text-green-600" /> }
            ],
            topPriorities: [
                { name: "Chargad", area: "67.88 km²", desc: "Highest overall priority" },
                { name: "Medigad", area: "65.73 km²", desc: "Severe rainfall decline zone" },
                { name: "Sidhkhal", area: "62.11 km²", desc: "Significant forest degradation" },
                { name: "Irgad", area: "61.44 km²", desc: "High erosion potential" },
                { name: "Dudhatoligad", area: "56.25 km²", desc: "Needs urgent conservation" },
            ]
        }
    };

    const data = BASIN_DATA[activeTab];

    return (
        <div className="md:max-w-6xl w-full mx-auto p-3 md:p-6 bg-slate-50 min-h-screen font-sans text-slate-800">
            {/* Header */}
            <div className="flex items-center gap-2 mb-6">
                <div className="bg-blue-900 p-1.5 rounded-full">
                    <Waves size={16} className="text-white" />
                </div>
                <h2 className="text-blue-900 font-bold uppercase tracking-wider text-sm">River Basin Reports</h2>
            </div>

            <div className="flex gap-4 mb-4">
                <button
                    onClick={() => setActiveTab('song')}
                    className={`md:px-6 px-3 py-1 md:py-2 md:text-sm text-xs rounded-lg font-semibold transition-all ${activeTab === 'song'
                        ? 'bg-blue-900 text-white shadow-md'
                        : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                        }`}
                >
                    Song River — Dehradun
                </button>
                <button
                    onClick={() => setActiveTab('nayar')}
                    className={`md:px-6 px-3 py-1 md:py-2 md:text-sm text-xs rounded-lg font-semibold transition-all ${activeTab === 'nayar'
                        ? 'bg-blue-900 text-white shadow-md'
                        : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                        }`}
                >
                    Nayar River — Pauri Garhwal
                </button>
            </div>

            <div className="bg-white rounded-3xl border border-blue-100 shadow-sm overflow-hidden md:p-6 p-3">

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">

                    <div className="lg:col-span-3">
                        <div className="rounded-2xl overflow-hidden h-full shadow-inner border border-slate-100 flex flex-col gap-4">
                            <img
                                src={`/assets/research-partners/${activeTab === 'song' ? 'song-river.jpeg' : 'nayar.jpeg'}`}
                                alt="River Basin View"
                                className="w-full h-full object-cover rounded-2xl"
                            />
                        </div>
                    </div>

                    <div className="lg:col-span-4 space-y-4 pr-0 md:pr-4">
                        <div>
                            <h1 className="text-xl md:text-2xl font-bold text-blue-900">{data.title}</h1>
                            <p className="text-slate-500 text-xs md:text-sm font-medium">{data.subtitle}</p>
                        </div>

                        <div className="space-y-3">
                            {data.stats.map((stat, i) => (
                                <StatRow key={i} icon={stat.icon} label={stat.label} />
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-5 space-y-4">
                        <div className="bg-slate-50/50 rounded-2xl border border-slate-100 p-3 md:p-5">
                            <h3 className="text-blue-900 font-bold mb-4 text-sm uppercase tracking-tight">
                                LULC change detection (1995–2024)
                            </h3>
                            <table className="w-full text-xs md:text-sm">
                                <thead>
                                    <tr className="text-slate-400 border-b border-slate-200">
                                        <th className="text-left font-medium pb-2">Land Use</th>
                                        <th className="font-medium pb-2 text-center">1995</th>
                                        <th className="font-medium pb-2 text-center">2024</th>
                                        <th className="text-right font-medium pb-2">Change</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {data.lulc.map((item, i) => (
                                        <TableRow key={i} icon={item.icon} label={item.label} v1={item.v1} v2={item.v2} diff={item.diff} pos={item.pos} />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-3 md:p-4 flex-1">
                    <h4 className="text-blue-900 font-bold text-sm mb-3 flex items-center gap-2">
                        <CloudRain size={16} /> Rainfall Trends
                    </h4>
                    <div className="space-y-3">
                        <div>
                            <p className="text-xs font-bold text-slate-500 uppercase">Monsoon</p>
                            <p className="text-sm font-semibold text-slate-700">{data.rainfall.monsoon}</p>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-slate-500 uppercase">Annual</p>
                            <p className="text-sm font-semibold text-slate-700">{data.rainfall.annual}</p>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-slate-500 uppercase">Rainy Days</p>
                            <p className="text-sm font-semibold text-slate-700">{data.rainfall.days}</p>
                        </div>
                    </div>
                </div>
                <div className="mt-8">
                    <h3 className="text-blue-900 font-bold mb-4 text-sm md:text-base">Final integrated sub-basin prioritization</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        {data.priorities.map((p, i) => (
                            <PriorityCard
                                key={i}
                                type={p.type}
                                title={p.title}
                                subBasins={p.subBasins}
                                meanCF={p.meanCF}
                                desc={p.desc}
                                color={p.color}
                                icon={p.icon}
                            />
                        ))}
                    </div>

                    <div className="bg-red-50/50 border border-red-100 rounded-2xl p-3 md:p-5">
                        <h4 className="text-red-800 font-bold text-xs md:text-sm uppercase tracking-tight mb-4 flex items-center gap-2">
                            <AlertTriangle size={16} className="text-red-600" />
                            Top 5 High Priority Micro-watersheds
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                            {data.topPriorities.map((tp, i) => (
                                <div key={i} className="bg-white p-2 md:p-3 rounded-xl border border-red-100 shadow-sm">
                                    <div className="text-lg md:text-xl font-black text-red-900/10 float-right leading-none">#{i + 1}</div>
                                    <h5 className="font-bold text-slate-800 text-xs md:text-sm mb-1">{tp.name}</h5>
                                    <p className="text-red-600 font-bold text-[10px] md:text-xs mb-1 md:mb-2">{tp.area}</p>
                                    <p className="text-slate-500 text-[10px] md:text-[11px] leading-tight font-medium">{tp.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Helper Components ---

const StatRow = ({ icon, label }) => (
    <div className="flex items-center gap-2 md:gap-3 text-slate-700">
        <span className="text-blue-400">{icon}</span>
        <span className="text-xs md:text-[15px] font-medium">{label}</span>
    </div>
);

const TableRow = ({ icon, label, v1, v2, diff, pos }) => (
    <tr className="hover:bg-white/50 transition-colors">
        <td className="py-2.5 flex items-center gap-2 font-semibold">
            {icon} {label}
        </td>
        <td className="py-2.5 text-center text-slate-600">{v1}</td>
        <td className="py-2.5 text-center text-slate-600">{v2}</td>
        <td className={`py-2.5 text-right font-bold ${pos ? 'text-green-600' : 'text-red-600'}`}>
            {diff}
        </td>
    </tr>
);

const PriorityCard = ({ type, title, subBasins, meanCF, desc, color, icon }) => {
    const bgColors = {
        red: 'bg-red-50 border-red-100',
        amber: 'bg-amber-50 border-amber-100',
        green: 'bg-green-50 border-green-100',
    };

    const tagColors = {
        red: 'bg-red-600',
        amber: 'bg-amber-500',
        green: 'bg-green-700',
    };

    return (
        <div className={`p-3 md:p-5 rounded-2xl border ${bgColors[color]} flex flex-col justify-between`}>
            <div className="flex gap-3 md:gap-4 mb-3 md:mb-4">
                <div className={`${tagColors[color]} text-white font-bold w-8 h-8 md:w-10 md:h-10 text-xs md:text-sm flex items-center justify-center rounded-lg shadow-sm shrink-0`}>
                    {type}
                </div>
                <div>
                    <h4 className={`font-bold text-sm md:text-base ${color === 'red' ? 'text-red-700' : color === 'amber' ? 'text-amber-700' : 'text-green-800'}`}>
                        {title}
                    </h4>
                    <p className="text-[11px] font-semibold text-slate-600 mt-1 line-clamp-2" title={subBasins}>{subBasins}</p>
                    <p className="text-xs text-slate-500 mt-1 font-bold">{meanCF}</p>
                </div>
            </div>
            <div className="flex items-center gap-3 mt-2">
                <div className="p-2 bg-white rounded-full border border-inherit shrink-0">
                    {icon}
                </div>
                <p className="text-xs font-bold text-slate-700 leading-tight">{desc}</p>
            </div>
        </div>
    );
};

const ReportFooterSection = () => {
    return (
        <div className="md:max-w-6xl w-full mx-auto p-3 md:p-6 font-sans text-slate-800">
            <div className="flex flex-col lg:flex-row gap-4 md:gap-6">

                <div className="lg:w-6/12 bg-[#f1f6f2] rounded-3xl p-4 md:p-6 border border-slate-200">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="bg-emerald-800 p-1 rounded-md text-white">
                            <ShieldCheck size={18} />
                        </div>
                        <h2 className="text-emerald-900 font-bold text-lg">Key Engineering Recommendations</h2>
                    </div>

                    <div className="space-y-6">
                        <RecommendationItem
                            imgSrc="/assets/research-partners/Gabion-check-dams.png"
                            title="Loose Boulder Check Dams"
                            desc="For 1st order streams & small gullies (<100m length, <2ha catchment)."
                        />
                        <RecommendationItem
                            imgSrc="/assets/research-partners/staggered-trenches.png"
                            title="Gabion Structures (Wire Crate)"
                            desc="For 2nd & 3rd order streams with moderate slopes (up to 10%)."
                        />
                        <RecommendationItem
                            imgSrc="/assets/research-partners/Spring-shed.png"
                            title="Staggered Trenches"
                            desc="Excavating shallow pits (0.3m depth) across slopes in upper reaches to break runoff velocity."
                        />
                        <RecommendationItem
                            imgSrc="/assets/research-partners/Vegetative.png"
                            title="Percolation Ponds/Tanks"
                            desc="Constructed at natural depressions in forested hilly areas to facilitate groundwater recharge."
                        />
                        <RecommendationItem
                            imgSrc="/assets/research-partners/Gabion-check-dams.png"
                            title="RCC Check Dams"
                            desc="For 3rd/4th order streams requiring permanent, high-strength structures (height <2m)."
                        />
                    </div>
                </div>

                {/* Right Column: Methodology */}
                <div className="lg:w-6/12 bg-white rounded-3xl p-4 md:p-6 border border-blue-100 shadow-sm">
                    <div className="flex items-center gap-2 mb-6 md:mb-10">
                        <div className="bg-blue-800 p-1.5 rounded-full text-white">
                            <Settings size={16} />
                        </div>
                        <h2 className="text-blue-900 font-bold text-lg">Methodology (August 2025 Final)</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4">
                        <MethodologyItem
                            icon={<Waves className="text-blue-900" size={28} />}
                            title="SWAT Model"
                            sub="hydrological model"
                        />
                        <MethodologyItem
                            icon={<Satellite className="text-blue-900" size={28} />}
                            title="ALOS PALSAR"
                            sub="DEM 12.5m"
                        />
                        <MethodologyItem
                            icon={<Satellite className="text-blue-900" size={28} />}
                            title="SENTINEL-2"
                            sub="10m (2024)"
                        />
                        <MethodologyItem
                            icon={<Map className="text-blue-900" size={28} />}
                            title="LANDSAT"
                            sub="(1995–2015)"
                        />
                        <MethodologyItem
                            icon={<CloudRain className="text-blue-900" size={28} />}
                            title="Rainfall Trend"
                            sub="Definitive Analysis"
                        />
                        <MethodologyItem
                            icon={<Network className="text-blue-900" size={28} />}
                            title="Morphometric"
                            sub="Strahler stream ordering"
                            alignLeft
                        />
                    </div>
                </div>
            </div>

            {/* Footer Buttons */}
            <div className="mt-6 md:mt-8 flex flex-wrap justify-center gap-3 md:gap-4">
                <button className="flex items-center gap-2 bg-blue-900 hover:bg-blue-800 text-white px-4 md:px-8 py-2 md:py-3 rounded-xl font-bold text-sm md:text-base transition-all shadow-md w-full md:w-auto justify-center">
                    <Download size={18} />
                    Download Song report (PDF)
                </button>
                <button className="flex items-center gap-2 bg-emerald-800 hover:bg-emerald-700 text-white px-4 md:px-8 py-2 md:py-3 rounded-xl font-bold text-sm md:text-base transition-all shadow-md w-full md:w-auto justify-center">
                    <Download size={18} />
                    Download Nayar report (PDF)
                </button>
            </div>
        </div>
    );
};

const RecommendationItem = ({ imgSrc, title, desc }) => (
    <div className="flex gap-4 items-start">
        <div className="w-20 h-16 flex-shrink-0 overflow-hidden rounded-lg bg-slate-200">
            <img src={imgSrc} alt={title} className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.classList.add('bg-slate-300'); }} />
        </div>
        <div className="space-y-0.5">
            <h4 className="text-emerald-900 font-bold text-[15px] leading-tight">{title}</h4>
            <p className="text-slate-600 text-xs leading-relaxed font-medium">{desc}</p>
        </div>
    </div>
);

const MethodologyItem = ({ icon, title, sub, alignLeft = false }) => (
    <div className="flex items-center gap-3 md:gap-4">
        <div className="bg-blue-50 w-12 h-12 md:w-16 md:h-16 flex-shrink-0 rounded-full flex items-center justify-center border border-blue-100 shadow-sm">
            {icon}
        </div>
        <div className={alignLeft ? "" : "max-w-[120px]"}>
            <h4 className="text-blue-900 font-bold text-sm uppercase tracking-tight leading-tight">{title}</h4>
            <p className="text-slate-500 text-[11px] font-semibold leading-tight mt-0.5">{sub}</p>
        </div>
    </div>
);

export default function PartnerDetailPanelNIH() {
    return (
        <main className="min-h-screen bg-slate-50 font-sans pb-16">
            <HeroSection />
            <ResearchPartnerCard />
            <RiverBasinReport />
            <ReportFooterSection />
        </main>
    );
}
