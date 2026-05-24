"use client";

import React, { useState } from 'react';
import {
    Calendar, Waves, Mountain, FlaskConical, CloudRain, Network,
    Activity, Layers, Shovel, TrendingUp, Trees, MapPin,
    AlertTriangle, Leaf, CheckCircle2, Download, Satellite, Map,
    ShieldCheck, Settings
} from 'lucide-react';

const IMG = {
    hero: '/assets/research-partners/iitroorke.png'
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
        <div className=" md:max-w-6xl w-full mx-auto p-4 pt-0 font-sans text-slate-800">
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
                        <div className="md:w-40 md:h-40 w-20 md:h-20 flex-shrink-0">
                            <img
                                src="/assets/icons/iitr.png"
                                alt="IIT Roorkee Logo"
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <div className="space-y-1">
                            <h1 className="text-3xl font-bold text-blue-900 leading-tight">IIT Roorkee</h1>
                            <p className="text-slate-600 font-medium">Indian Institute of Technology Roorkee</p>
                            <p className="text-slate-500 text-sm italic">Roorkee, Uttarakhand — 247667</p>
                        </div>
                    </div>

                    <div className="relative h-32 w-full md:w-72 rounded-xl overflow-hidden hidden lg:block">
                        <img
                            src="/assets/research-partners/iitroorke.png"
                            alt="IIT Campus"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white opacity-60"></div>
                    </div>

                    <div className="flex flex-col gap-3 w-full md:w-auto">
                        <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 flex items-center gap-3 min-w-[200px]">
                            <Calendar className="text-blue-700 w-6 h-6" />
                            <div>
                                <p className="text-xs text-slate-500 font-semibold uppercase">Research Support</p>
                                <p className="text-blue-900 font-bold">March 2025</p>
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
                            <div className="overflow-hidden">
                                <img
                                    src="/assets/research-partners/research.png"
                                    alt="Researcher"
                                    className="w-full h-auto aspect-square object-cover"
                                />
                            </div>
                        </div>

                        <div className="flex-1 space-y-6">
                            <p className="text-slate-700 leading-relaxed text-sm md:text-[1.05rem]">
                                <span className="font-semibold">IIT Roorkee</span> conducted scientific sub-basin prioritization studies for two Uttarakhand river basins — <span className="font-semibold italic">Shipra (Nainital)</span> and <span className="font-semibold italic">Gaudi (Champawat)</span> — using morphometric analysis, LULC change detection (1995–2024), and SWAT hydrological modelling, providing actionable frameworks for SARRA's river rejuvenation programme.
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

                                {/* Stat 2 */}
                                <div className="bg-white md:p-4 p-2 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
                                    <div className="bg-emerald-700 p-2 rounded-full text-white">
                                        <FlaskConical size={24} />
                                    </div>
                                    <div>
                                        <div className="text-3xl font-bold text-emerald-700">26</div>
                                        <div className="text-xs text-slate-500 font-medium leading-tight">Sub-basins<br />analyzed</div>
                                    </div>
                                </div>

                                {/* Stat 3 */}
                                <div className="bg-white md:p-4 p-2 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
                                    <div className="bg-blue-800 p-2 rounded-full text-white">
                                        <CloudRain size={24} />
                                    </div>
                                    <div>
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-3xl font-bold text-blue-800">37</span>
                                            <span className="text-sm font-bold text-blue-800">yrs</span>
                                        </div>
                                        <div className="text-xs text-slate-500 font-medium leading-tight text-nowrap">Rainfall data</div>
                                    </div>
                                </div>

                                {/* Stat 4 */}
                                <div className="bg-white md:p-4 p-2 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
                                    <div className="bg-green-700 p-2 rounded-full text-white">
                                        <Network size={24} />
                                    </div>
                                    <div>
                                        <div className="text-3xl font-bold text-green-700">393</div>
                                        <div className="text-xs text-slate-500 font-medium leading-tight">Total HRUs<br />modelled</div>
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
    const [activeTab, setActiveTab] = useState('shipra');

    const BASIN_DATA = {
        shipra: {
            title: "Shipra River Basin",
            subtitle: "Nainital District · ~33 km² · 4th order river",
            stats: [
                { icon: <Waves size={18} />, label: "13 sub-basins" },
                { icon: <Mountain size={18} />, label: "Elevation: 1000–2408 m" },
                { icon: <CloudRain size={18} />, label: "Rainfall: 1463–1829 mm/yr" },
                { icon: <Activity size={18} />, label: "132 streams · Dendritic pattern" },
                { icon: <Layers size={18} />, label: "Geology: 90% Quartzite" },
                { icon: <Shovel size={18} />, label: "Soil: Loamy + Sandy loam" },
                { icon: <TrendingUp size={18} />, label: "Slope: 15°–77°" }
            ],
            lulc: [
                { icon: <Trees className="text-green-800" />, label: "Dense forest", v1: "17.61", v2: "19.84", diff: "+2.23", pos: true },
                { icon: <Leaf className="text-lime-500" />, label: "Open forest", v1: "20.78", v2: "13.30", diff: "-7.48", pos: false },
                { icon: <div className="w-3 h-3 bg-orange-400 rounded-sm" />, label: "Cultivated", v1: "12.37", v2: "16.31", diff: "+3.94", pos: true },
                { icon: <div className="w-3 h-3 bg-red-600 rounded-sm" />, label: "Settlement", v1: "1.96", v2: "3.13", diff: "+1.17", pos: true }
            ],
            priorities: [
                { type: "HP", title: "High priority", subBasins: "1, 6, 10", meanCF: "4.01 · 5.39 · 4.32", desc: "Urgent reforestation & soil conservation needed", color: "red", icon: <AlertTriangle className="text-red-600" /> },
                { type: "MP", title: "Medium priority", subBasins: "2, 3, 4", meanCF: "5.70 · 6.08 · 6.55", desc: "Targeted management to prevent degradation", color: "amber", icon: <Leaf className="text-amber-600" /> },
                { type: "LP", title: "Low priority", subBasins: "5, 7, 8, 9, 11, 12, 13", meanCF: "7.02 — 8.49", desc: "Periodic monitoring sufficient", color: "green", icon: <CheckCircle2 className="text-green-600" /> }
            ]
        },
        gaudi: {
            title: "Gaudi River Basin",
            subtitle: "Champawat District · ~22 km² · 4th order river",
            stats: [
                { icon: <Waves size={18} />, label: "13 sub-basins" },
                { icon: <Mountain size={18} />, label: "Elevation: 1512–2118 m" },
                { icon: <CloudRain size={18} />, label: "Rainfall: 1264–1270 mm/yr" },
                { icon: <Activity size={18} />, label: "97 streams · Dendritic pattern" },
                { icon: <Layers size={18} />, label: "Geology: Granite & Gneiss" },
                { icon: <Shovel size={18} />, label: "Soil: Loamy (uniform)" },
                { icon: <TrendingUp size={18} />, label: "Slope: 7.7°–40°" }
            ],
            lulc: [
                { icon: <Trees className="text-green-800" />, label: "Dense forest", v1: "—", v2: "—", diff: "+0.54", pos: true },
                { icon: <Leaf className="text-lime-500" />, label: "Open forest", v1: "—", v2: "—", diff: "-0.94", pos: false },
                { icon: <div className="w-3 h-3 bg-orange-400 rounded-sm" />, label: "Cultivated", v1: "—", v2: "—", diff: "-1.07", pos: false },
                { icon: <div className="w-3 h-3 bg-red-600 rounded-sm" />, label: "Settlement", v1: "—", v2: "—", diff: "+1.46", pos: true }
            ],
            priorities: [
                { type: "HP", title: "High priority", subBasins: "5, 7, 9, 11, 12, 13", meanCF: "5.55–6.16", desc: "Urgent reforestation & conservation required", color: "red", icon: <AlertTriangle className="text-red-600" /> },
                { type: "MP", title: "Medium priority", subBasins: "10", meanCF: "6.34", desc: "Sustainable land management required", color: "amber", icon: <Leaf className="text-amber-600" /> },
                { type: "LP", title: "Low priority", subBasins: "1, 2, 3, 4, 6, 8", meanCF: "6.86–7.51", desc: "Routine monitoring only", color: "green", icon: <CheckCircle2 className="text-green-600" /> }
            ]
        }
    };

    const data = BASIN_DATA[activeTab];

    return (
        <div className="max-w-6xl mx-auto p-6 bg-slate-50 min-h-screen font-sans text-slate-800">
            <div className="flex items-center gap-2 mb-6">
                <div className="bg-blue-900 p-1.5 rounded-full">
                    <Waves size={16} className="text-white" />
                </div>
                <h2 className="text-blue-900 font-bold uppercase tracking-wider text-sm">River Basin Reports</h2>
            </div>

            <div className="flex gap-4 mb-4 ">
                <button
                    onClick={() => setActiveTab('shipra')}
                    className={`md:px-6 px-3 py-1 md:py-2 md:text-sm text-xs rounded-lg font-semibold transition-all ${activeTab === 'shipra'
                        ? 'bg-blue-900 text-white shadow-md'
                        : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                        }`}
                >
                    Shipra River — Nainital
                </button>
                <button
                    onClick={() => setActiveTab('gaudi')}
                    className={`md:px-6 px-3 py-1 md:py-2 md:text-sm text-xs rounded-lg font-semibold transition-all ${activeTab === 'gaudi'
                        ? 'bg-blue-900 text-white shadow-md'
                        : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                        }`}
                >
                    Gaudi River — Champawat
                </button>
            </div>

            <div className="bg-white rounded-3xl border border-blue-100 shadow-sm overflow-hidden md:p-6 p-3">

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">

                    <div className="lg:col-span-3">
                        <div className="rounded-2xl overflow-hidden h-full shadow-inner border border-slate-100">
                            <img
                                src={`/assets/research-partners/${activeTab === 'shipra' ? 'shipra-river.png' : 'gaudi-river.jpg'}`}
                                alt="River Basin View"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* 2. Basin Characteristics List */}
                    <div className="lg:col-span-4 space-y-4 pr-4">
                        <div>
                            <h1 className="text-2xl font-bold text-blue-900">{data.title}</h1>
                            <p className="text-slate-500 text-sm font-medium">{data.subtitle}</p>
                        </div>

                        <div className="space-y-3">
                            {data.stats.map((stat, i) => (
                                <StatRow key={i} icon={stat.icon} label={stat.label} />
                            ))}
                        </div>
                    </div>

                    {/* 3. LULC Change Table */}
                    <div className="lg:col-span-5 bg-slate-50/50 rounded-2xl border border-slate-100 p-5">
                        <h3 className="text-blue-900 font-bold mb-4 text-sm uppercase tracking-tight">
                            LULC change detection (1995–2024)
                        </h3>
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="text-slate-400 border-b border-slate-200">
                                    <th className="text-left font-medium pb-2">Land Use Class</th>
                                    <th className="font-medium pb-2">1995 (km²)</th>
                                    <th className="font-medium pb-2">2024 (km²)</th>
                                    <th className="text-right font-medium pb-2">Change (km²)</th>
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

                {/* Bottom Section: Prioritization */}
                <div className="mt-8">
                    <h3 className="text-blue-900 font-bold mb-4 text-base">Final integrated sub-basin prioritization</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                </div>
            </div>
        </div>
    );
};

// --- Helper Components ---

const StatRow = ({ icon, label }) => (
    <div className="flex items-center gap-3 text-slate-700">
        <span className="text-blue-400">{icon}</span>
        <span className="text-[15px] font-medium">{label}</span>
    </div>
);

const TableRow = ({ icon, label, v1, v2, diff, pos }) => (
    <tr className="hover:bg-white/50 transition-colors">
        <td className="py-3 flex items-center gap-2 font-semibold">
            {icon} {label}
        </td>
        <td className="py-3 text-center text-slate-600">{v1}</td>
        <td className="py-3 text-center text-slate-600">{v2}</td>
        <td className={`py-3 text-right font-bold ${pos ? 'text-green-600' : 'text-red-600'}`}>
            {diff} km²
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
        <div className={`p-5 rounded-2xl border ${bgColors[color]} flex flex-col justify-between`}>
            <div className="flex gap-4 mb-4">
                <div className={`${tagColors[color]} text-white font-bold w-10 h-10 flex items-center justify-center rounded-lg shadow-sm`}>
                    {type}
                </div>
                <div>
                    <h4 className={`font-bold ${color === 'red' ? 'text-red-700' : color === 'amber' ? 'text-amber-700' : 'text-green-800'}`}>
                        {title}
                    </h4>
                    <p className="text-xs font-semibold text-slate-600">Sub-basins {subBasins}</p>
                    <p className="text-xs text-slate-500">Mean CF: {meanCF}</p>
                </div>
            </div>
            <div className="flex items-center gap-3 mt-2">
                <div className="p-2 bg-white rounded-full border border-inherit">
                    {icon}
                </div>
                <p className="text-xs font-bold text-slate-700 leading-tight">{desc}</p>
            </div>
        </div>
    );
};

const ReportFooterSection = () => {
    return (
        <div className="max-w-6xl mx-auto p-6 font-sans text-slate-800">
            <div className="flex flex-col lg:flex-row gap-6">

                <div className="lg:w-5/12 bg-[#f1f6f2] rounded-3xl p-6 border border-slate-200">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="bg-emerald-800 p-1 rounded-md text-white">
                            <ShieldCheck size={18} />
                        </div>
                        <h2 className="text-emerald-900 font-bold text-lg">Key Recommendations</h2>
                    </div>

                    <div className="space-y-6">
                        <RecommendationItem
                            imgSrc="/assets/research-partners/Gabion-check-dams.png"
                            title="Gabion check dams"
                            desc="Control erosion, reduce flow velocity, enhance groundwater recharge in steep terrain"
                        />
                        <RecommendationItem
                            imgSrc="/assets/research-partners/staggered-trenches.png"
                            title="Contour & staggered trenches"
                            desc="Slow runoff, prevent soil loss, improve water retention on sloping lands"
                        />
                        <RecommendationItem
                            imgSrc="/assets/research-partners/Spring-shed.png"
                            title="Spring-shed management"
                            desc="Protect and rejuvenate natural springs, sustain baseflow in river systems"
                        />
                        <RecommendationItem
                            imgSrc="/assets/research-partners/Vegetative.png"
                            title="Vegetative & bioengineering measures"
                            desc="Afforestation and grass strips to stabilize slopes and enhance groundwater infiltration"
                        />
                    </div>
                </div>

                {/* Right Column: Methodology */}
                <div className="lg:w-7/12 bg-white rounded-3xl p-6 border border-blue-100 shadow-sm">
                    <div className="flex items-center gap-2 mb-10">
                        <div className="bg-blue-800 p-1.5 rounded-full text-white">
                            <Settings size={16} />
                        </div>
                        <h2 className="text-blue-900 font-bold text-lg">Methodology</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 gap-x-4">
                        <MethodologyItem
                            icon={<Waves className="text-blue-900" size={28} />}
                            title="SWAT"
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
                            title="CHIRPS"
                            sub="climate data"
                        />
                        <MethodologyItem
                            icon={<Network className="text-blue-900" size={28} />}
                            title="Morphometric analysis"
                            sub="Strahler stream ordering"
                            alignLeft
                        />
                    </div>
                </div>
            </div>

            {/* Footer Buttons */}
            <div className="mt-8 flex flex-wrap justify-center gap-4">
                <button className="flex items-center gap-2 bg-blue-900 hover:bg-blue-800 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-md">
                    <Download size={20} />
                    Download Shipra report (PDF)
                </button>
                <button className="flex items-center gap-2 bg-emerald-800 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-md">
                    <Download size={20} />
                    Download Gaudi report (PDF)
                </button>
            </div>
        </div>
    );
};

const RecommendationItem = ({ imgSrc, title, desc }) => (
    <div className="flex gap-4 items-start">
        <div className="w-20 h-16 flex-shrink-0 overflow-hidden ">
            <img src={imgSrc} alt={title} className="w-full h-full object-cover" />
        </div>
        <div className="space-y-0.5">
            <h4 className="text-emerald-900 font-bold text-[15px] leading-tight">{title}</h4>
            <p className="text-slate-600 text-xs leading-relaxed font-medium">{desc}</p>
        </div>
    </div>
);

const MethodologyItem = ({ icon, title, sub, alignLeft = false }) => (
    <div className="flex items-center gap-4">
        <div className="bg-blue-50 w-16 h-16 flex-shrink-0 rounded-full flex items-center justify-center border border-blue-100 shadow-sm">
            {icon}
        </div>
        <div className={alignLeft ? "" : "max-w-[120px]"}>
            <h4 className="text-blue-900 font-bold text-sm uppercase tracking-tight leading-tight">{title}</h4>
            <p className="text-slate-500 text-[11px] font-semibold leading-tight mt-0.5">{sub}</p>
        </div>
    </div>
);

export default function PartnerDetailPanel() {
    return (
        <main className="min-h-screen bg-slate-50 font-sans pb-16">
            <HeroSection />
            <ResearchPartnerCard />
            <RiverBasinReport />
            <ReportFooterSection />
        </main>
    );
}

