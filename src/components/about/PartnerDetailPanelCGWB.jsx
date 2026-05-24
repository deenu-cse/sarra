"use client";

import React, { useState } from 'react';
import {
    Calendar, Waves, Droplets, Mountain, FlaskConical, CloudRain, Network,
    Activity, Layers, Shovel, TrendingUp, Trees, MapPin,
    AlertTriangle, Leaf, CheckCircle2, Download, Satellite, Map,
    ShieldCheck, Settings, Building2, Factory, AlertCircle, CheckCheck,
    Ruler, Drill, Droplet, Sprout, Car, Hospital, Trash2
} from 'lucide-react';

const IMG = {
    hero: '/assets/research-partners/cgwoffice.avif'
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
                    Groundwater <span className="text-[#f59e0b]">Recharge</span>
                </h1>
                <p className="text-white/80 text-lg md:text-xl max-w-2xl mb-8 font-light leading-relaxed">
                    Feasibility assessment for artificial recharge structures across Uttarakhand.
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

const ResearchPartnerCardCGWB = () => {
    return (
        <div className="md:max-w-6xl w-full mx-auto p-4 pt-0 font-sans text-slate-800">
            <div className="flex items-center gap-2 mb-4 border-b border-blue-100 pb-2">
                <div className="bg-blue-900 p-1 rounded-full">
                    <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-blue-900 rounded-full" />
                    </div>
                </div>
                <h2 className="text-blue-900 font-bold uppercase tracking-wide text-sm">Research Partner</h2>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-4 md:p-6 flex flex-col md:flex-row gap-6 items-center">
                    <div className="flex items-center gap-6 flex-1">
                        <div className="w-20 h-20 md:w-40 md:h-40 flex-shrink-0">
                            <img
                                src="/assets/icons/cgwb.png"
                                alt="CGWB Logo"
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <div className="space-y-1">
                            <h1 className="text-3xl font-bold text-blue-900 leading-tight">CGWB</h1>
                            <p className="text-slate-600 font-medium">Central Ground Water Board</p>
                            <p className="text-slate-500 text-sm italic">Ministry of Jal Shakti, Govt. of India</p>
                        </div>
                    </div>

                    <div className="relative h-32 w-full md:w-72 rounded-xl overflow-hidden hidden lg:block">
                        <img
                            src="/assets/research-partners/cgwoffice.avif"
                            alt="CGWB Office"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white opacity-60"></div>
                    </div>

                    <div className="flex flex-col gap-3 w-full md:w-auto">
                        <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 flex items-center gap-3 min-w-[200px]">
                            <Calendar className="text-blue-700 w-6 h-6" />
                            <div>
                                <p className="text-xs text-slate-500 font-semibold uppercase">Report Period</p>
                                <p className="text-blue-900 font-bold">July – October 2024</p>
                            </div>
                        </div>
                        <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 flex items-center gap-3">
                            <Building2 className="text-blue-700 w-6 h-6" />
                            <p className="text-blue-900 font-bold uppercase tracking-tight">4 Districts</p>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-50/50 md:p-6 p-2 border-t border-slate-100">
                    <div className="flex flex-col lg:flex-row gap-8">
                        <div className="w-full lg:w-1/4">
                            <div className="overflow-hidden border-slate-200">
                                <img
                                    src="/assets/research-partners/research.png"
                                    alt="Research Process"
                                    className="w-full h-auto aspect-square object-cover"
                                />
                            </div>
                        </div>

                        <div className="flex-1 space-y-6">
                            <p className="text-slate-700 leading-relaxed text-sm md:text-[1.05rem]">
                                <span className="font-semibold">Central Ground Water Board (CGWB)</span> conducted detailed hydrogeological assessments for artificial groundwater recharge across <span className="font-semibold italic">Dehradun, Haridwar, Nainital, and Udham Singh Nagar</span> districts. The study evaluated 170+ proposed sites for recharge shafts, analyzing aquifer disposition, water levels, and recommending feasibility criteria for sustainable groundwater management under the SARRA initiative.
                            </p>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="bg-white md:p-4 p-2 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
                                    <div className="bg-blue-900 p-2 rounded-full text-white">
                                        <Building2 size={24} />
                                    </div>
                                    <div>
                                        <div className="text-3xl font-bold text-blue-900">4</div>
                                        <div className="text-xs text-slate-500 font-medium leading-tight">Districts<br />Assessed</div>
                                    </div>
                                </div>

                                <div className="bg-amber-700 md:p-4 p-2 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3 text-white">
                                    <div className="bg-amber-800 p-2 rounded-full">
                                        <Drill size={24} />
                                    </div>
                                    <div>
                                        <div className="text-3xl font-bold text-white">170+</div>
                                        <div className="text-xs text-amber-100 font-medium leading-tight">Sites<br />Evaluated</div>
                                    </div>
                                </div>

                                <div className="bg-white md:p-4 p-2 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
                                    <div className="bg-blue-800 p-2 rounded-full text-white">
                                        <Droplet size={24} />
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-blue-800 tracking-tight">5m</div>
                                        <div className="text-xs text-slate-500 font-medium leading-tight">Recharge<br />Criteria</div>
                                    </div>
                                </div>

                                <div className="bg-white md:p-4 p-2 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
                                    <div className="bg-blue-700 p-2 rounded-full text-white">
                                        <Waves size={24} />
                                    </div>
                                    <div>
                                        <div className="text-xl font-bold text-blue-700 leading-tight">Bhabar</div>
                                        <div className="text-[11px] text-slate-500 font-medium leading-tight">Tarai Zone</div>
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

const DistrictRechargeReport = () => {
    const [activeDistrict, setActiveDistrict] = useState('dehradun');

    const DISTRICT_DATA = {
        dehradun: {
            title: "Dehradun District",
            subtitle: "Raipur Block · 3,088 km² · Doon Valley",
            image: "cgwimg.png",
            totalSites: 51,
            feasibleSites: "All 51",
            notFeasible: 0,
            criteria: "Pre-monsoon WL >5m",
            stats: [
                { icon: <Building2 size={18} />, label: "51 Proposed Sites" },
                { icon: <Droplet size={18} />, label: "WL Range: 1-70 m bgl" },
                { icon: <Activity size={18} />, label: "Aquifer: Boulders & Gravel" },
                { icon: <Ruler size={18} />, label: "Recharge Well: 15-50 m depth" },
                { icon: <CloudRain size={18} />, label: "Rainfall: 2,500 mm/yr" },
                { icon: <ShieldCheck size={18} />, label: "Status: All Sites Feasible" }
            ],
            recommendations: [
                { type: "A", title: "Rooftop only recharge", desc: "Only non-polluted rainwater from rooftops to be diverted. Avoid runoff from open/paved areas near heavy traffic or medical facilities." },
                { type: "B", title: "First flush system", desc: "Install first rain separators to flush initial contaminants. Prevent sewage mixing into recharge structures." },
                { type: "C", title: "Well development", desc: "Use air compressor for development. Determine intake capacity via slug test post-construction." }
            ],
            siteCategories: [
                { label: "A - Rooftop only (no contamination risk)", count: 35, color: "green" },
                { label: "B - Rooftop priority (avoid open areas)", count: 16, color: "amber" }
            ],
            notableLocations: [
                "Minor Irrigation Dept Office",
                "Sanatan Dharma Inter College",
                "Rajkiya Lakshman Vidyalay",
                "ISBT Dehradun",
                "Forest Research Institute",
                "Secretariat Colony"
            ],
            designSpecs: {
                rechargeWellDepth: "50 m (6 inch dia)",
                rechargeCapacity: "15 m³/hr (25% of tubewell discharge)",
                storageTank: "2m x 1.5m x 1m (3 m³)",
                totalCapacity: "18 m³/hr",
                slottedPipe: "12m length, 1.58mm slots"
            }
        },
        haridwar: {
            title: "Haridwar District",
            subtitle: "Bahadrabad Block · 445.80 km² · Ganges Entry Point",
            image: "cgwimg.png",
            totalSites: 50,
            feasibleSites: 32,
            notFeasible: 18,
            criteria: "Post-monsoon WL >5m",
            stats: [
                { icon: <Building2 size={18} />, label: "50 Proposed Sites" },
                { icon: <Droplet size={18} />, label: "WL Range: Shallow to >5m" },
                { icon: <Activity size={18} />, label: "Aquifer: Bhabar (Boulders)" },
                { icon: <Ruler size={18} />, label: "Recharge Well: 15-25 m depth" },
                { icon: <CloudRain size={18} />, label: "Rainfall: ~1,396 mm/yr" },
                { icon: <AlertTriangle size={18} />, label: "Status: 18 Sites NOT Feasible" }
            ],
            recommendations: [
                { type: "A", title: "Feasibility zones", desc: "Recharge only where post-monsoon water level >5m. S.No 33-50 (18 sites) in Annexure-I are NOT feasible." },
                { type: "B", title: "Bhabar zone priority", desc: "Entire Bhabar foothill area suitable. Avoid active flood plains of Ganga where water levels are shallow." },
                { type: "C", title: "Design specification", desc: "Sites 1-22: 25m well depth. Sites 23-32: 15m depth. Use graded filter media." }
            ],
            siteCategories: [
                { label: "Feasible Sites", count: 32, color: "green" },
                { label: "Non-Feasible Sites (WL <5m)", count: 18, color: "red" }
            ],
            notableLocations: [
                "Nehru Park (Sector-7)",
                "LIC Office (Roshnabad)",
                "Rishikul Government College",
                "Gurukul Kangri University",
                "Police Lines Bahadrabad"
            ],
            designSpecs: {
                rechargeWellDepth: "15-25 m (site specific)",
                rechargeCapacity: "1.5 m³/hr (25% of 100 lpm discharge)",
                storageTank: "2m x 1m x 1m (2 m³)",
                totalCapacity: "3.1 m³/hr",
                filterMedia: "Boulder (0.5m) + Gravel (0.5m) + Sand (0.5m)"
            }
        },
        nainital: {
            title: "Nainital District",
            subtitle: "Haldwani & Ramnagar Blocks · Bhabar Zone",
            image: "cgwimg.png",
            totalSites: 23,
            feasibleSites: 23,
            notFeasible: 0,
            criteria: "Post-monsoon WL >5m & >10m",
            stats: [
                { icon: <Building2 size={18} />, label: "23 Proposed Sites" },
                { icon: <Droplet size={18} />, label: "WL: Haldwani >15m / Ramnagar ~10m" },
                { icon: <Activity size={18} />, label: "Aquifer: Boulders & Gravel" },
                { icon: <Ruler size={18} />, label: "Recharge Well: 50 m depth" },
                { icon: <CloudRain size={18} />, label: "Rainfall: 1,500-2,050 mm/yr" },
                { icon: <ShieldCheck size={18} />, label: "Status: All Sites Feasible" }
            ],
            recommendations: [
                { type: "A", title: "Multi-tiered aquifer system", desc: "Semi-confined to unconfined aquifers with boulders/gravel. Excellent recharge potential." },
                { type: "B", title: "3D aquifer model", desc: "Fence diagram and 3D model developed showing favorable conditions for recharge shafts." },
                { type: "C", title: "Spring line caution", desc: "Tarai zone auto-flow exists – avoid interference with natural artesian conditions." }
            ],
            siteCategories: [
                { label: "Ramnagar Block (WL ~10m)", count: 5, color: "green" },
                { label: "Haldwani Block (WL >15m)", count: 18, color: "green" }
            ],
            notableLocations: [
                "PNG Government College Ramnagar",
                "MP Hindu Inter College",
                "GGIC College Khatadi",
                "SDM Office Haldwani",
                "MB Inter College Haldwani",
                "Amrit Ashram Unchapul"
            ],
            designSpecs: {
                rechargeWellDepth: "50 m (6 inch dia)",
                rechargeCapacity: "18 m³/hr (25% of 1200 lpm)",
                storageTank: "2m x 2m x 1m (4 m³)",
                totalCapacity: "22 m³/hr",
                slottedPipe: "12m length, 1.58mm slots"
            }
        },
        udhamsinghnagar: {
            title: "Udham Singh Nagar District",
            subtitle: "Rudrapur Block · 2,908 km² · Terai Region",
            image: "cgwimg.png",
            totalSites: 48,
            feasibleSites: 0,
            notFeasible: 48,
            criteria: "Post-monsoon WL must be >5m",
            stats: [
                { icon: <Building2 size={18} />, label: "48 Proposed Sites" },
                { icon: <Droplet size={18} />, label: "WL Range: <5m (All sites)" },
                { icon: <Activity size={18} />, label: "Aquifer: Tarai (Clays/Silts)" },
                { icon: <AlertCircle size={18} />, label: "Recharge: NOT Feasible" },
                { icon: <CloudRain size={18} />, label: "Rainfall: 1,396 mm/yr (90% monsoon)" },
                { icon: <Trash2 size={18} />, label: "Status: Shift to Jaspur/Kashipur" }
            ],
            recommendations: [
                { type: "A", title: "NOT FEASIBLE – Water Level <5m", desc: "All 48 proposed sites in Rudrapur block have post-monsoon water levels below 5m, failing the mandatory recharge criterion." },
                { type: "B", title: "Alternative locations", desc: "Recharge schemes should be implemented in Jaspur Block and parts of Kashipur/Bazpur where water levels exceed 5m (marked in Figure-4)." },
                { type: "C", title: "Multi-tiered aquifers available", desc: "Kashipur/Jaspur blocks have favorable sand/gravel aquifers with good transmissivity (1180-2500 m²/day)." }
            ],
            siteCategories: [
                { label: "Not Suitable (WL <5m)", count: 48, color: "red" },
                { label: "Alternative Areas (Jaspur/Kashipur)", count: ">5m zone", color: "green" }
            ],
            notableLocations: [
                "Vikas Khand Colony",
                "Uttara 70 Gramin Vikas Sansthan",
                "District Animal Hospital",
                "Gandhi Park Maidan",
                "Jawahar Lal Nehru District Hospital",
                "46th Battalion PAC"
            ],
            designSpecs: {
                rechargeWellDepth: "10-12 m (in suitable areas)",
                rechargeCapacity: "18 m³/hr (25% of 1200 lpm)",
                storageTank: "2m x 2m x 1m (4 m³)",
                totalCapacity: "22 m³/hr",
                slottedPipe: "12m length (in feasible zones)"
            }
        }
    };

    const data = DISTRICT_DATA[activeDistrict];

    return (
        <div className="md:max-w-6xl w-full mx-auto p-3 md:p-6 bg-slate-50 min-h-screen font-sans text-slate-800">

            <div className="flex items-center gap-2 mb-6">
                <div className="bg-blue-900 p-1.5 rounded-full">
                    <Droplets size={16} className="text-white" />
                </div>
                <h2 className="text-blue-900 font-bold uppercase tracking-wider text-sm">District Reports – CGWB</h2>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
                {Object.keys(DISTRICT_DATA).map((dist) => (
                    <button
                        key={dist}
                        onClick={() => setActiveDistrict(dist)}
                        className={`md:px-6 px-3 py-1 md:py-2 md:text-sm text-xs rounded-lg font-semibold transition-all ${activeDistrict === dist
                            ? 'bg-blue-900 text-white shadow-md'
                            : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                            }`}
                    >
                        {DISTRICT_DATA[dist].title} ({DISTRICT_DATA[dist].totalSites} sites)
                    </button>
                ))}
            </div>

            <div className="bg-white rounded-3xl border border-blue-100 shadow-sm overflow-hidden md:p-6 p-3">

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">

                    <div className="lg:col-span-3">
                        <div className="rounded-2xl overflow-hidden h-full shadow-inner border border-slate-100">
                            <img
                                src={`/assets/research-partners/${data.image}`}
                                alt={`${activeDistrict} District`}
                                className="w-full h-full object-cover"
                                onError={(e) => { e.target.src = '/assets/research-partners/default-district.jpg'; }}
                            />
                        </div>
                    </div>

                    <div className="lg:col-span-4 space-y-4">
                        <div>
                            <h1 className="text-xl md:text-2xl font-bold text-blue-900">{data.title}</h1>
                            <p className="text-slate-500 text-xs md:text-sm font-medium">{data.subtitle}</p>
                        </div>

                        <div className="space-y-2">
                            {data.stats.map((stat, i) => (
                                <StatRowCGWB key={i} icon={stat.icon} label={stat.label} />
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-5 space-y-4">
                        <div className="bg-blue-50/50 rounded-2xl border border-blue-100 p-3 md:p-4">
                            <h3 className="text-blue-900 font-bold mb-3 text-sm uppercase tracking-tight flex items-center gap-2">
                                <CheckCircle2 size={16} /> Site Feasibility Summary
                            </h3>
                            <div className="grid grid-cols-3 gap-3 mb-4">
                                <div className="bg-white rounded-xl p-3 text-center border border-blue-100">
                                    <p className="text-2xl font-bold text-blue-900">{data.totalSites}</p>
                                    <p className="text-[11px] text-slate-500 font-medium">Total Sites</p>
                                </div>
                                <div className="bg-green-50 rounded-xl p-3 text-center border border-green-100">
                                    <p className="text-2xl font-bold text-green-700">{data.feasibleSites}</p>
                                    <p className="text-[11px] text-slate-500 font-medium">Feasible</p>
                                </div>
                                <div className={`${data.notFeasible > 0 ? 'bg-red-50' : 'bg-slate-100'} rounded-xl p-3 text-center border ${data.notFeasible > 0 ? 'border-red-100' : 'border-slate-200'}`}>
                                    <p className={`text-2xl font-bold ${data.notFeasible > 0 ? 'text-red-600' : 'text-slate-400'}`}>{data.notFeasible}</p>
                                    <p className="text-[11px] text-slate-500 font-medium">Not Feasible</p>
                                </div>
                            </div>
                            <div className="text-[10px] md:text-xs text-slate-600 bg-white rounded-lg p-2 leading-tight">
                                <span className="font-bold">Criteria:</span> Post-monsoon water level must be <span className="font-bold text-blue-700">&gt;5m below ground level</span>
                            </div>
                        </div>

                        <div className="bg-slate-50 rounded-2xl border border-slate-100 p-3 md:p-4">
                            <h3 className="text-blue-900 font-bold mb-2 text-sm uppercase tracking-tight flex items-center gap-2">
                                <MapPin size={14} /> Notable Locations
                            </h3>
                            <div className="flex flex-wrap gap-1.5">
                                {data.notableLocations.slice(0, 5).map((loc, i) => (
                                    <span key={i} className="text-[10px] md:text-xs bg-white px-2 py-1 rounded-full border border-slate-200 text-slate-600">
                                        {loc}
                                    </span>
                                ))}
                                {data.notableLocations.length > 5 && (
                                    <span className="text-[10px] md:text-xs bg-white px-2 py-1 rounded-full border border-slate-200 text-slate-400">
                                        +{data.notableLocations.length - 5} more
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <div className="bg-amber-50 border border-amber-100 rounded-2xl p-3 md:p-4">
                        <h3 className="text-amber-800 font-bold text-sm mb-3 flex items-center gap-2">
                            <ShieldCheck size={16} /> Key Recommendations
                        </h3>
                        <div className="space-y-3">
                            {data.recommendations.map((rec, i) => (
                                <div key={i} className="bg-white rounded-xl p-3 border border-amber-100">
                                    <div className="flex gap-2">
                                        <div className="bg-amber-600 text-white text-[10px] md:text-xs font-bold w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center shrink-0">
                                            {rec.type}
                                        </div>
                                        <div>
                                            <p className="font-bold text-xs md:text-sm text-slate-700">{rec.title}</p>
                                            <p className="text-[10px] md:text-xs text-slate-500 mt-1">{rec.desc}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-100 rounded-2xl p-3 md:p-4">
                        <h3 className="text-blue-900 font-bold text-sm mb-3 flex items-center gap-2">
                            <Ruler size={16} /> Recharge Structure Design
                        </h3>
                        <div className="space-y-2">
                            <DesignRow label="Recharge Well Depth" value={data.designSpecs.rechargeWellDepth} />
                            <DesignRow label="Recharge Capacity" value={data.designSpecs.rechargeCapacity} />
                            <DesignRow label="Storage Tank" value={data.designSpecs.storageTank} />
                            <DesignRow label="Total Capacity" value={data.designSpecs.totalCapacity} />
                            {data.designSpecs.slottedPipe && <DesignRow label="Slotted Pipe" value={data.designSpecs.slottedPipe} />}
                            {data.designSpecs.filterMedia && <DesignRow label="Filter Media" value={data.designSpecs.filterMedia} />}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                        <h4 className="font-bold text-slate-700 text-sm mb-3 flex items-center gap-2">
                            <AlertTriangle size={14} className="text-amber-600" />
                            Site Categorization
                        </h4>
                        <div className="space-y-2">
                            {data.siteCategories.map((cat, i) => (
                                <div key={i} className="flex justify-between items-center border-b border-slate-100 pb-2">
                                    <span className="text-xs md:text-sm text-slate-600">{cat.label}</span>
                                    <span className={`font-bold px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[10px] md:text-xs ${cat.color === 'green' ? 'bg-green-100 text-green-700' :
                                        cat.color === 'red' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                                        }`}>
                                        {cat.count}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4 border border-blue-100">
                        <h4 className="font-bold text-blue-800 text-sm mb-2 flex items-center gap-2">
                            <Droplet size={14} /> Hydrogeological Setting
                        </h4>
                        <p className="text-[10px] md:text-xs text-slate-600 leading-relaxed">
                            {activeDistrict === 'dehradun' && "Doon Gravels and Siwalik formations with boulders/gravel. Multi-tiered aquifer system (confined to unconfined). Transmissivity: 1,648-3,500 m²/day. Discharge up to 2,526 lpm at FRI."}
                            {activeDistrict === 'haridwar' && "Bhabar zone (boulders/pebbles) highly porous & permeable. Tarai zone with fine/medium sand. Tubewell yield: 1,500-4,000 lpm. Auto-flow conditions exist."}
                            {activeDistrict === 'nainital' && "Bhabar formation with poorly sorted unconsolidated sediments. Tarai with sand/clay/silt. Artesian conditions exist. Favorable for recharge shafts."}
                            {activeDistrict === 'udhamsinghnagar' && "Bhabar zone (recharge front) and Tarai zone (confined/unconfined). Transmissivity: 1,180-25,000 m²/day. Artesian wells historically flowed up to 8.69m above ground."}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Helper Components
const StatRowCGWB = ({ icon, label }) => (
    <div className="flex items-center gap-2 md:gap-3 text-slate-700">
        <span className="text-blue-500">{icon}</span>
        <span className="text-xs md:text-[15px] font-medium">{label}</span>
    </div>
);

const DesignRow = ({ label, value }) => (
    <div className="flex justify-between items-center border-b border-blue-100 pb-1.5">
        <span className="text-[10px] md:text-xs font-medium text-slate-600">{label}</span>
        <span className="text-[10px] md:text-xs font-bold text-blue-800 bg-white px-2 py-0.5 rounded">{value}</span>
    </div>
);

// Footer Section
const ReportFooterSectionCGWB = () => {
    return (
        <div className="md:max-w-6xl w-full mx-auto p-3 md:p-6 font-sans text-slate-800">
            <div className="bg-slate-100 rounded-3xl p-4 md:p-6 border border-slate-200">
                <div className="flex items-center gap-2 mb-4">
                    <div className="bg-blue-900 p-1 rounded-md text-white">
                        <ShieldCheck size={18} />
                    </div>
                    <h2 className="text-blue-900 font-bold text-lg">NGT & Quality Guidelines</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-xl p-4 border border-amber-100">
                        <h3 className="font-bold text-amber-700 text-sm mb-2 flex items-center gap-2"><AlertCircle size={14} /> Prohibited Areas</h3>
                        <p className="text-xs text-slate-600">Avoid RWH near sewerage components, landfill sites, hospitals, clinics, and heavy traffic zones (ISBT, transport offices) to prevent groundwater contamination.</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-green-100">
                        <h3 className="font-bold text-green-700 text-sm mb-2 flex items-center gap-2"><CheckCheck size={14} /> Mandatory Practices</h3>
                        <p className="text-xs text-slate-600">Use first flush system, UV-resistant HDPE/PVC pipes, wire mesh at drain mouths, periodic cleaning pre-monsoon. Only non-polluted rooftop rainwater to recharge structures.</p>
                    </div>
                </div>

                {/* Four Download Buttons */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <DownloadButton label="Dehradun Report" />
                    <DownloadButton label="Haridwar Report" />
                    <DownloadButton label="Nainital Report" />
                    <DownloadButton label="U.S. Nagar Report" />
                </div>

                <div className="mt-6 text-center text-[10px] md:text-xs text-slate-400 pt-4 border-t border-slate-200">
                    Source: Central Ground Water Board, Uttaranchal Region, Dehradun | Reports: July – October 2024
                </div>
            </div>
        </div>
    );
};

const DownloadButton = ({ label }) => (
    <button className="flex items-center justify-center gap-2 bg-blue-900 hover:bg-blue-800 text-white px-4 py-2.5 rounded-xl font-bold text-xs md:text-sm transition-all shadow-md w-full">
        <Download size={16} />
        <span>{label} (PDF)</span>
    </button>
);

// Main Export
export default function PartnerDetailPanelCGWB() {
    return (
        <main className="min-h-screen bg-slate-50 font-sans pb-16">
            <HeroSection />
            <ResearchPartnerCardCGWB />
            <DistrictRechargeReport />
            <ReportFooterSectionCGWB />
        </main>
    );
}
