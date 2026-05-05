"use client";

import { useState, useCallback, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import axiosInstance from "../../lib/axiosInstance";
import { toast } from "sonner";

// ─── CONSTANTS ───────────────────────────────────────────────────────────────
const DISTRICTS = [
    "Almora", "Bageshwar", "Chamoli", "Champawat", "Dehradun",
    "Haridwar", "Nainital", "Pauri Garhwal", "Pithoragarh",
    "Rudra Prayag", "Tehri Garhwal", "Udam Singh Nagar", "Uttarkashi"
];
const DEPARTMENTS = [
    "Forest Department", "Minor Irrigation", "Irrigation Department",
    "Rural Development", "Urban Development", "UCRRFP", "Jal Sansthan",
    "Peyjal", "Other Department/Organization"
];
const BLOCKS_BY_DISTRICT = {
    "Dehradun": ["Chakrata", "Vikasnagar", "Sahaspur", "Raipur", "Doiwala", "Rishikesh", "Kalsi"],
    "Pauri Garhwal": ["Pauri", "Kot", "Srikot", "Ekeshwar", "Pabau", "Bironkhal", "Thalisain", "Dwarikhal", "Jaykhandani", "Nainidanda", "Yamkeshwar", "Pokhara", "Rikhnikhal", "Kaljikhal"],
    "Tehri Garhwal": ["Tehri", "Devprayag", "Dhanolti", "Chamba", "Jakhnidhar", "Narendra Nagar", "Bhilangana", "Pratapnagar"],
    "Uttarkashi": ["Bhatwari", "Chinyalisaur", "Dunda", "Mori", "Naugaon", "Purola"],
    "Almora": ["Almora", "Bhikiasain", "Dhauladevi", "Hawalbagh", "Lamgara", "Salt", "Syaldeh", "Takula"],
    "Nainital": ["Betalghat", "Bhimtal", "Dhari", "Haldwani", "Kotabagh", "Okhalkanda", "Ramnagar", "Ramgarh"],
    "Chamoli": ["Gairsain", "Gharat", "Joshimath", "Karnprayag", "Narayanbagar", "Pokhari", "Tharali"],
    "Bageshwar": ["Bageshwar", "Garur", "Kapkot"],
    "Champawat": ["Barakot", "Champawat", "Lohaghat", "Pati"],
    "Pithoragarh": ["Berinag", "Dharchula", "Gangolihat", "Kanalichhina", "Munsiari", "Pithoragarh"],
    "Rudra Prayag": ["Augustmuni", "Jakoli", "Rudraprayag", "Ukhimath"],
    "Haridwar": ["Bahadrabad", "Bhagwanpur", "Haridwar", "Khanpur", "Laksar", "Narsan", "Roorkee"],
    "Udam Singh Nagar": ["Bazpur", "Gadarpur", "Jaspur", "Kashipur", "Khatima", "Kichha", "Rudrapur", "Sitarganj"],
};

const ARS_DETAILS = ['ARS-1', 'ARS-2', 'ARS-3', 'ARS-4'];
const LAND_OWNERSHIPS = ['Government', 'Private', 'Community', 'Mixed'];
const LAND_TYPE_DESIGNATIONS = ['Revenue', 'Agricultural', 'Grazing', 'Forest', 'Urban', 'Barren', 'Other'];
const GW_AVAILABILITY = ['Safe', 'Semi-Critical', 'Critical', 'Over-exploited'];
const WATER_SOURCES = ['Canal', 'River', 'Rainwater Runoff', 'Other'];
const GW_USES = ['Domestic', 'Irrigation', 'Industrial', 'Other'];
const VULNERABILITY = ['Low', 'Medium', 'High'];

const GW_ACTIVITIES = [
    { id: 'dpr_preparation', label: 'DPR Preparation', unit: '' },
    { id: 'interventions', label: 'Interventions/ Activities', isHeader: true },
    { id: 'recharge_shaft', label: 'Recharge Shaft', unit: 'No.' },
    { id: 'recharge_pit', label: 'Recharge Pit', unit: 'No.' },
    { id: 'dugout_ponds', label: 'Dugout Ponds', unit: 'No.' },
    { id: 'catchment_treated', label: 'Estimated Area of Catchment Treated by above Activities', unit: 'Ha.' },
    { id: 'monitoring_evaluation', label: 'Monitoring & Evaluation', unit: '' }
];

const SECTIONS = [
    { id: 1, label: "Dept. Details", icon: "🏛️" },
    { id: 2, label: "Aquifer ID", icon: "💧" },
    { id: 3, label: "Photos", icon: "📷" },
    { id: 4, label: "Risk Assessment", icon: "⚠️" },
    { id: 5, label: "Budget & Plan", icon: "💰" }
];

// ─── STYLE HELPERS ────────────────────────────────────────────────────────────
const inp = "w-full px-4 py-3 text-base border-2 border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400 transition-all placeholder-slate-400";
const sel = inp + " cursor-pointer";
const tinp = "w-full px-3 py-3 text-sm border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-400 transition-all placeholder-slate-400 min-h-[46px]";
const tsel = "w-full px-3 py-3 text-sm border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-400 transition-all cursor-pointer min-h-[46px]";
const lbl = "block text-sm font-bold text-slate-600 mb-1.5 uppercase tracking-wide";
const secHead = "flex items-center gap-3 mb-6";
const secTitle = "text-xl font-bold text-slate-800";
const tableHead = "bg-gradient-to-r from-cyan-600 to-blue-700 text-white text-[11px] font-bold uppercase tracking-wider px-2 py-3 whitespace-normal break-words text-center min-w-[80px]";
const tableCell = "px-2 py-2 text-sm border-b border-slate-100 align-top";
const card = "bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden";

// ─── REUSABLE COMPONENTS ──────────────────────────────────────────────────────
function FloatSelect({ label, value, onChange, options, required }) {
    return (
        <div className="relative">
            <label className={lbl}>{label}{required && <span className="text-red-400 ml-0.5">*</span>}</label>
            <select value={value} onChange={e => onChange(e.target.value)} className={sel}>
                <option value="">— Select —</option>
                {options.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
        </div>
    );
}

function FloatInput({ label, value, onChange, type = "text", required, placeholder, maxLength, min }) {
    return (
        <div className="relative">
            <label className={lbl}>{label}{required && <span className="text-red-400 ml-0.5">*</span>}</label>
            <input
                type={type} value={value} onChange={e => onChange(e.target.value)}
                className={inp} placeholder={placeholder || label}
                maxLength={maxLength} min={min}
            />
        </div>
    );
}

function SectionTag({ step, current }) {
    const done = current > step.id;
    const active = current === step.id;
    return (
        <div className="flex flex-col items-center gap-1 cursor-default transition-all">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${done ? 'bg-green-500 border-green-500 text-white' : active ? 'bg-cyan-600 border-cyan-600 text-white shadow-md shadow-cyan-200' : 'bg-white border-slate-200 text-slate-400'}`}>
                {done ? '✓' : step.icon}
            </div>
            <span className={`text-[10px] font-semibold hidden sm:block ${active ? 'text-cyan-600' : done ? 'text-green-600' : 'text-slate-400'}`}>{step.label}</span>
        </div>
    );
}

function SaveDraftBtn({ onClick }) {
    return (
        <button type="button" onClick={onClick} className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded-lg transition-all border border-slate-200">
            💾 Save as Draft
        </button>
    );
}

function NavBtn({ onClick, label, primary, icon }) {
    return (
        <button type="button" onClick={onClick} className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${primary ? 'bg-cyan-600 hover:bg-cyan-700 text-white shadow-md shadow-cyan-200' : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'}`}>
            {!primary && icon} {label} {primary && icon}
        </button>
    );
}

function TableWrapper({ title, subtitle, children }) {
    return (
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xl shadow-slate-100/50 mb-8">
            <div className="inline-block min-w-full align-middle">
                <div className="bg-gradient-to-r from-cyan-700 via-blue-700 to-blue-800 px-6 py-4 flex items-center justify-between border-b border-blue-900/20">
                    <div className="flex items-center gap-3">
                        <span className="text-white font-extrabold text-sm tracking-wide uppercase">{title}</span>
                    </div>
                    {subtitle && <span className="text-cyan-100 text-[10px] font-bold uppercase tracking-widest bg-blue-900/40 px-3 py-1 rounded-full">{subtitle}</span>}
                </div>
                <div className="min-w-full overflow-hidden">
                    <table className="min-w-full border-collapse">
                        {children}
                    </table>
                </div>
            </div>
        </div>
    );
}

function InfoBadge({ text, isWarning = false }) {
    return (
        <div className={`flex items-start gap-2 p-3 ${isWarning ? 'bg-amber-50 border-amber-200 text-amber-700' : 'bg-cyan-50 border-cyan-200 text-cyan-700'} border rounded-lg text-xs mb-4`}>
            <span className={`${isWarning ? 'text-amber-500' : 'text-cyan-500'} mt-0.5`}>{isWarning ? '⚠' : 'ℹ'}</span>
            <span>{text}</span>
        </div>
    );
}

// ─── COORDINATE VALIDATION ───────────────────────────────────────────────────
function validateCoord(type, part, value) {
    if (value === "") return "";
    const v = parseInt(value, 10);
    if (isNaN(v)) return "Invalid";
    if (type === "lat") {
        if (part === "dd" && (v < 28 || v > 31)) return "28-31";
        if (part === "mm" && (v < 0 || v > 59)) return "0-59";
        if (part === "ss" && (v < 0 || v > 59)) return "0-59";
    }
    if (type === "lng") {
        if (part === "dd" && (v < 76 || v > 81)) return "76-81";
        if (part === "mm" && (v < 0 || v > 59)) return "0-59";
        if (part === "ss" && (v < 0 || v > 59)) return "0-59";
    }
    return "";
}

// ─── SECTIONS ─────────────────────────────────────────────────────────────────

function Section1({ data, setData }) {
    const upd = k => v => setData(d => ({ ...d, [k]: v }));
    const blocks = data.district ? (BLOCKS_BY_DISTRICT[data.district] || []) : [];
    return (
        <div className="space-y-6">
            <div className={secHead}>
                <div className="w-8 h-8 rounded-lg bg-cyan-100 flex items-center justify-center">🏛️</div>
                <div><p className={secTitle}>Department / Organization Details</p><p className="text-xs text-slate-400">Section 1 of 5</p></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FloatSelect label="Department/Organization" value={data.department} onChange={upd("department")} options={DEPARTMENTS} required />
                {data.department === "Other Department/Organization" && <FloatInput label="Specify Other Department" value={data.departmentOther} onChange={upd("departmentOther")} required />}
                <FloatSelect label="District" value={data.district} onChange={v => { setData(d => ({ ...d, district: v, block: "" })); }} options={DISTRICTS} required />
                <FloatSelect label="Block" value={data.block} onChange={upd("block")} options={blocks} />
                <FloatInput label="Address of Department/Organization" value={data.address} onChange={upd("address")} />
                <FloatInput label="Key Nodal Officer for Ground water Rejuvenation Activities" value={data.nodalOfficer} onChange={upd("nodalOfficer")} required />
                <FloatInput label="Contact No" value={data.contactNo} onChange={upd("contactNo")} type="tel" maxLength={10} required placeholder="10-digit mobile number" />
                <FloatInput label="Email ID" value={data.email} onChange={upd("email")} type="email" required />
            </div>
        </div>
    );
}

function Section2({ data, setData, sec1 }) {
    const upd = k => v => setData(d => ({ ...d, [k]: v }));
    const effectiveDistrict = data.district || sec1?.district || "";
    const effectiveBlock = data.blockTown || sec1?.block || "";
    const blocks = effectiveDistrict ? (BLOCKS_BY_DISTRICT[effectiveDistrict] || []) : [];

    useEffect(() => {
        if (sec1?.district && !data.district) setData(d => ({ ...d, district: sec1.district }));
        if (sec1?.block && !data.blockTown) setData(d => ({ ...d, blockTown: sec1.block }));
    }, [sec1?.district, sec1?.block]);

    const addARS = () => {
        setData(d => {
            const nextIdx = d.arsDetails.length;
            const newARSLabel = `ARS-${nextIdx + 1}`;
            return {
                ...d,
                arsDetails: [...d.arsDetails, {
                    sn: nextIdx + 1,
                    arsDetail: newARSLabel,
                    name: "",
                    latitude: { dd: "", mm: "", ss: "" },
                    longitude: { dd: "", mm: "", ss: "" },
                    altitudeMasl: "",
                    approxRechargeAreaHa: "",
                    landOwnership: "",
                    landTypeDesignation: "",
                    landTypeOther: ""
                }]
            };
        });
    };

    const removeARS = (idx) => {
        setData(d => {
            if (d.arsDetails.length <= 1) {
                toast.error("At least one ARS is required");
                return d;
            }
            const filtered = d.arsDetails.filter((_, i) => i !== idx);
            // Re-index SN and labels
            const reindexed = filtered.map((item, i) => ({
                ...item,
                sn: i + 1,
                arsDetail: `ARS-${i + 1}`
            }));
            return { ...d, arsDetails: reindexed };
        });
    };

    const updARS = (i, k, v) => setData(d => ({ ...d, arsDetails: d.arsDetails.map((r, idx) => idx === i ? { ...r, [k]: v } : r) }));
    const updCoordARS = (i, coord, part, v) => {
        const cleanV = v.replace(/[^0-9]/g, '').slice(0, 2);
        setData(d => ({ ...d, arsDetails: d.arsDetails.map((r, idx) => idx === i ? { ...r, [coord]: { ...r[coord], [part]: cleanV } } : r) }));
        if (cleanV.length === 2) {
            const el = document.activeElement;
            const next = el?.nextElementSibling || el?.closest('div')?.nextElementSibling?.querySelector('input');
            if (next) next.focus();
        }
    };

    const syncRows = (source, target, mapper) => {
        return source.map(s => {
            const existing = target.find(t => t.arsDetail === s.arsDetail) || {};
            return mapper(s, existing);
        });
    };

    useEffect(() => {
        setData(d => ({
            ...d,
            hydrologicalDetails: syncRows(d.arsDetails, d.hydrologicalDetails, (s, e) => ({
                ...e,
                arsDetail: s.arsDetail,
                name: s.name,
                depthToWaterTablePreMonsoon: e.depthToWaterTablePreMonsoon || "",
                depthToWaterTablePostMonsoon: e.depthToWaterTablePostMonsoon || "",
                depthToWaterTable10YrsAgo: e.depthToWaterTable10YrsAgo || ""
            }))
        }));
    }, [data.arsDetails]);

    const updHydro = (i, k, v) => setData(d => ({ ...d, hydrologicalDetails: d.hydrologicalDetails.map((r, idx) => idx === i ? { ...r, [k]: v } : r) }));

    const toggleUsage = (use) => {
        setData(d => {
            const current = d.primaryGroundwaterUses || [];
            if (current.includes(use)) return { ...d, primaryGroundwaterUses: current.filter(u => u !== use) };
            if (current.length >= 3) {
                toast.error("You can select up to 3 uses");
                return d;
            }
            return { ...d, primaryGroundwaterUses: [...current, use] };
        });
    };

    return (
        <div className="space-y-6">
            <div className={secHead}>
                <div className="w-10 h-10 rounded-xl bg-cyan-100 flex items-center justify-center text-xl">💧</div>
                <div><p className={secTitle}>Aquifer Identification Particulars</p><p className="text-sm text-slate-400">Section 2 of 5</p></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                    <FloatInput label="Sub Watershed Name" value={data.subWatershedName || ""} onChange={upd("subWatershedName")} />
                </div>
                <FloatInput label="Micro Watershed Name" value={data.microWatershedName || ""} onChange={upd("microWatershedName")} />
                <FloatInput label="Micro Watershed Code" value={data.microWatershedCode || ""} onChange={upd("microWatershedCode")} />
                <div className="md:col-span-2">
                    <FloatInput label="Name of identified Aquifer for treatment" value={data.aquiferName || ""} onChange={upd("aquiferName")} required />
                </div>
                <FloatSelect label="District" value={effectiveDistrict} onChange={v => setData(d => ({ ...d, district: v, blockTown: "" }))} options={DISTRICTS} required />
                <FloatSelect label="Block/Town" value={effectiveBlock} onChange={upd("blockTown")} options={blocks} required />
                <div className="md:col-span-2">
                    <label className={lbl}>Villages</label>
                    <textarea className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl bg-white focus:outline-none focus:border-cyan-400" rows={2} value={data.villages || ""} onChange={e => upd("villages")(e.target.value)}></textarea>
                </div>
                <FloatInput label="Name of Aquifer Recharge Site" value={data.aquiferRechargeSiteName || ""} onChange={upd("aquiferRechargeSiteName")} />
                <FloatInput label="Unique Code*" value={data.aquiferRechargeSiteUniqueCode || ""} onChange={upd("aquiferRechargeSiteUniqueCode")} />
                <FloatInput label="No. of Villages/Habitation" value={data.noOfVillagesHabitation || ""} onChange={upd("noOfVillagesHabitation")} type="number" />
            </div>
            <div className="mt-4">
                <label className={lbl}>Villages/Habitation Names</label>
                <textarea className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl bg-white focus:outline-none focus:border-cyan-400" rows={3} value={data.villagesHabitationNames || ""} onChange={e => upd("villagesHabitationNames")(e.target.value)}></textarea>
            </div>

            <TableWrapper title="Table 2.1 — Aquifer Recharge Site (ARS) Details">
                <thead>
                    <tr>{["S.N.", "ARS Detail", "Name", "Latitude (DMS)", "Longitude (DMS)", "Altitude (masl)", "Recharge Area (Ha)", "Land Ownership", "Land Type", "Action"].map(h => <th key={h} className={tableHead}>{h}</th>)}</tr>
                </thead>
                <tbody>
                    {data.arsDetails.map((s, i) => (
                        <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                            <td className={tableCell + " font-bold text-center"}>{s.sn}</td>
                            <td className={tableCell + " font-semibold text-slate-600"}>{s.arsDetail}</td>
                            <td className={tableCell}><input className={tinp} value={s.name} onChange={e => updARS(i, "name", e.target.value)} /></td>
                            <td className={tableCell}>
                                <div className="flex gap-1">
                                    {["dd", "mm", "ss"].map(p => {
                                        const err = validateCoord("lat", p, s.latitude[p]);
                                        return (
                                            <div key={p} className="flex flex-col items-center">
                                                <input className={`${tinp} w-8 text-center px-1 ${err ? 'border-red-400 bg-red-50' : ''}`} value={s.latitude[p]} onChange={e => updCoordARS(i, "latitude", p, e.target.value)} placeholder={p.toUpperCase()} maxLength={2} />
                                                {err && <span className="text-[8px] text-red-500 leading-tight mt-0.5">{err}</span>}
                                            </div>
                                        );
                                    })}
                                </div>
                            </td>
                            <td className={tableCell}>
                                <div className="flex gap-1">
                                    {["dd", "mm", "ss"].map(p => {
                                        const err = validateCoord("lng", p, s.longitude[p]);
                                        return (
                                            <div key={p} className="flex flex-col">
                                                <input className={`${tinp} w-8 text-center px-1 ${err ? 'border-red-400 bg-red-50' : ''}`} value={s.longitude[p]} onChange={e => updCoordARS(i, "longitude", p, e.target.value)} placeholder={p.toUpperCase()} maxLength={2} />
                                            </div>
                                        );
                                    })}
                                </div>
                            </td>
                            <td className={tableCell}><input className={tinp + " w-16"} type="number" value={s.altitudeMasl} onChange={e => updARS(i, "altitudeMasl", e.target.value)} /></td>
                            <td className={tableCell}><input className={tinp + " w-16"} type="number" value={s.approxRechargeAreaHa} onChange={e => updARS(i, "approxRechargeAreaHa", e.target.value)} /></td>
                            <td className={tableCell}>
                                <select className={tsel + " w-full"} value={s.landOwnership} onChange={e => updARS(i, "landOwnership", e.target.value)}>
                                    <option value="">— Select —</option>
                                    {LAND_OWNERSHIPS.map(o => <option key={o} value={o}>{o}</option>)}
                                </select>
                            </td>
                            <td className={tableCell}>
                                <select className={tsel + " w-full mb-1"} value={s.landTypeDesignation} onChange={e => updARS(i, "landTypeDesignation", e.target.value)}>
                                    <option value="">— Select —</option>
                                    {LAND_TYPE_DESIGNATIONS.map(o => <option key={o} value={o}>{o}</option>)}
                                </select>
                                {s.landTypeDesignation === 'Other' && <input className={tinp + " mt-1"} placeholder="Specify Other" value={s.landTypeOther} onChange={e => updARS(i, "landTypeOther", e.target.value)} />}
                            </td>
                            <td className={tableCell + " text-center"}>
                                <button type="button" onClick={() => removeARS(i)} className="p-1.5 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition-colors" title="Remove row">
                                    🗑️
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr><td colSpan={10} className="px-4 py-3">
                        <button type="button" onClick={addARS} className="text-sm px-4 py-2 bg-cyan-600 text-white rounded-xl hover:bg-cyan-700 font-semibold shadow-md shadow-cyan-100 transition-all">+ Add New ARS Site</button>
                    </td></tr>
                </tfoot>
            </TableWrapper>

            <TableWrapper title="Table 2.2 — Hydrological Details per ARS">
                <thead>
                    <tr>
                        <th className={tableHead}>S.N.</th>
                        <th className={tableHead}>ARS Detail</th>
                        <th className={tableHead}>Name*</th>
                        <th className={tableHead}>Depth Pre-Monsoon (m)</th>
                        <th className={tableHead}>Depth Post-Monsoon (m)</th>
                        <th className={tableHead}>Depth 10 Years Ago (m)</th>
                    </tr>
                </thead>
                <tbody>
                    {data.hydrologicalDetails.map((row, i) => (
                        <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                            <td className={tableCell + " font-bold text-center"}>{i + 1}</td>
                            <td className={tableCell + " font-semibold text-slate-600"}>{row.arsDetail}</td>
                            <td className={tableCell}><span className="bg-cyan-100 text-cyan-800 text-xs px-2 py-1 rounded-lg border border-cyan-200">{row.name || "—"}</span></td>
                            <td className={tableCell}><input className={tinp + " w-full"} type="number" value={row.depthToWaterTablePreMonsoon} onChange={e => updHydro(i, "depthToWaterTablePreMonsoon", e.target.value)} /></td>
                            <td className={tableCell}><input className={tinp + " w-full"} type="number" value={row.depthToWaterTablePostMonsoon} onChange={e => updHydro(i, "depthToWaterTablePostMonsoon", e.target.value)} /></td>
                            <td className={tableCell}><input className={tinp + " w-full"} type="number" value={row.depthToWaterTable10YrsAgo} onChange={e => updHydro(i, "depthToWaterTable10YrsAgo", e.target.value)} /></td>
                        </tr>
                    ))}
                </tbody>
            </TableWrapper>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                <h3 className="font-bold text-slate-800 border-b pb-2">Additional Hydrological Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <FloatSelect label="Source of water for recharge" value={data.sourceOfWaterForRecharge} onChange={upd("sourceOfWaterForRecharge")} options={WATER_SOURCES} required />
                    {data.sourceOfWaterForRecharge === 'Other' && <FloatInput label="Specify Other Source" value={data.sourceOfWaterOther} onChange={upd("sourceOfWaterOther")} required />}
                    <FloatInput label="Avg availability period (months/season)" value={data.avgAvailabilityPeriodMonths} onChange={upd("avgAvailabilityPeriodMonths")} type="number" required />

                    <div className="relative">
                        <label className={lbl}>Groundwater availability status<span className="text-red-400 ml-0.5">*</span></label>
                        <select value={data.groundwaterAvailabilityStatus} onChange={e => upd("groundwaterAvailabilityStatus")(e.target.value)} className={`${sel} ${data.groundwaterAvailabilityStatus === 'Safe' ? 'text-green-700 bg-green-50' : data.groundwaterAvailabilityStatus === 'Semi-Critical' ? 'text-amber-700 bg-amber-50' : data.groundwaterAvailabilityStatus === 'Critical' ? 'text-orange-700 bg-orange-50' : data.groundwaterAvailabilityStatus === 'Over-exploited' ? 'text-red-700 bg-red-50' : ''}`}>
                            <option value="">— Select —</option>
                            {GW_AVAILABILITY.map(o => <option key={o} value={o}>{o}</option>)}
                        </select>
                    </div>
                </div>

                <div>
                    <label className={lbl}>Primary groundwater uses (Max 3)<span className="text-red-400 ml-0.5">*</span></label>
                    <div className="flex flex-wrap gap-3 mt-2">
                        {GW_USES.map(use => (
                            <label key={use} className={`flex items-center gap-2 px-4 py-2 rounded-xl border cursor-pointer transition-all ${data.primaryGroundwaterUses?.includes(use) ? 'bg-cyan-50 border-cyan-500 text-cyan-700' : 'bg-white border-slate-200 hover:bg-slate-50'}`}>
                                <input type="checkbox" checked={data.primaryGroundwaterUses?.includes(use)} onChange={() => toggleUsage(use)} className="rounded text-cyan-600 focus:ring-cyan-500" />
                                <span className="text-sm font-medium">{use}</span>
                            </label>
                        ))}
                    </div>
                    {data.primaryGroundwaterUses?.includes('Other') && (
                        <div className="mt-3">
                            <FloatInput label="Specify Other Use" value={data.primaryGroundwaterUsesOther} onChange={upd("primaryGroundwaterUsesOther")} required />
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
}

function Section3({ data, setData }) {
    const handleFile = (k, file) => {
        if (!file) return;
        const reader = new FileReader();
        reader.onload = e => setData(d => ({ ...d, [`${k}Preview`]: e.target.result, [`${k}File`]: file }));
        reader.readAsDataURL(file);
    };

    return (
        <div className="space-y-6">
            <div className={secHead}>
                <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-xl">📸</div>
                <div><p className={secTitle}>Photographs</p><p className="text-sm text-slate-400">Section 3 of 5</p></div>
            </div>

            <InfoBadge isWarning text="Important: Use GPS-enabled camera app to ensure geo-coordinates are embedded in the photographs." />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 border-2 border-dashed border-slate-200 rounded-2xl text-center">
                    <p className={lbl}>Wide angle photograph of proposed groundwater recharge site</p>
                    <p className="text-xs text-slate-500 mb-4">(with GPS enabled camera app)</p>
                    <input type="file" onChange={e => handleFile("rechargeSitePhoto", e.target.files[0])} className="mt-2 text-sm file:mr-3 file:py-1.5 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-cyan-50 file:text-cyan-700" />
                    {data.rechargeSitePhotoPreview && <img src={data.rechargeSitePhotoPreview} className="mt-4 rounded-xl w-full h-40 object-cover border" />}
                </div>
                <div className="p-4 border-2 border-dashed border-slate-200 rounded-2xl text-center">
                    <p className={lbl}>Wide angle photographs of proposed interventions sites for recharge</p>
                    <p className="text-xs text-slate-500 mb-4">(with GPS enabled camera app)</p>
                    <input type="file" onChange={e => handleFile("interventionSitePhoto", e.target.files[0])} className="mt-2 text-sm file:mr-3 file:py-1.5 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-cyan-50 file:text-cyan-700" />
                    {data.interventionSitePhotoPreview && <img src={data.interventionSitePhotoPreview} className="mt-4 rounded-xl w-full h-40 object-cover border" />}
                </div>
            </div>
        </div>
    );
}

function Section4({ data, setData }) {
    const upd = k => v => setData(d => ({ ...d, [k]: v }));

    return (
        <div className="space-y-6">
            <div className={secHead}>
                <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center text-xl">⚠️</div>
                <div><p className={secTitle}>Risk and Vulnerability Assessment</p><p className="text-sm text-slate-400">Section 4 of 5</p></div>
            </div>

            <div>
                <label className={lbl}>Potential Risks to Recharge Area<span className="text-red-400 ml-0.5">*</span></label>
                <p className="text-xs text-slate-500 mb-2">Identify all environmental and anthropogenic risks that may affect the groundwater recharge area</p>
                <textarea className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl bg-white focus:outline-none focus:border-cyan-400" rows={4} value={data.potentialRisks || ""} onChange={e => upd("potentialRisks")(e.target.value)} placeholder="Describe potential risks such as: Pollution, Urban encroachment, Land degradation, Drains nearby, Industrial activities, etc."></textarea>
            </div>

            <div>
                <label className={lbl}>Level of vulnerability due to environmental or anthropogenic factors<span className="text-red-400 ml-0.5">*</span></label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                    <div onClick={() => upd("vulnerabilityLevel")("Low")} className={`cursor-pointer p-4 rounded-2xl border-2 transition-all ${data.vulnerabilityLevel === 'Low' ? 'border-green-500 bg-green-50 shadow-md shadow-green-100' : 'border-slate-200 hover:border-green-300'}`}>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-xl">🟢</span>
                            <span className="font-bold text-green-800">LOW</span>
                        </div>
                        <p className="text-xs text-green-700/80 leading-relaxed">Minimal environmental or anthropogenic threats. Recharge area is secure.</p>
                    </div>

                    <div onClick={() => upd("vulnerabilityLevel")("Medium")} className={`cursor-pointer p-4 rounded-2xl border-2 transition-all ${data.vulnerabilityLevel === 'Medium' ? 'border-amber-500 bg-amber-50 shadow-md shadow-amber-100' : 'border-slate-200 hover:border-amber-300'}`}>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-xl">🟡</span>
                            <span className="font-bold text-amber-800">MEDIUM</span>
                        </div>
                        <p className="text-xs text-amber-700/80 leading-relaxed">Moderate threats present. Some mitigation measures needed.</p>
                    </div>

                    <div onClick={() => upd("vulnerabilityLevel")("High")} className={`cursor-pointer p-4 rounded-2xl border-2 transition-all ${data.vulnerabilityLevel === 'High' ? 'border-red-500 bg-red-50 shadow-md shadow-red-100' : 'border-slate-200 hover:border-red-300'}`}>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-xl">🔴</span>
                            <span className="font-bold text-red-800">HIGH</span>
                        </div>
                        <p className="text-xs text-red-700/80 leading-relaxed">Severe threats. Immediate intervention and protective measures required.</p>
                    </div>
                </div>
            </div>

            {data.vulnerabilityLevel === 'High' && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 flex gap-3 animate-fade-in">
                    <span className="text-xl">🚨</span>
                    <p className="text-sm font-medium pt-0.5">High vulnerability level selected. Please detail specific risks in the text area above and include mitigation strategies in the DPR.</p>
                </div>
            )}
        </div>
    );
}

function Section5({ data, setData, arsDetails }) {
    const upd = k => v => setData(d => ({ ...d, [k]: v }));
    const updResp = k => v => setData(d => ({ ...d, responsibleOfficer: { ...d.responsibleOfficer, [k]: v } }));
    const upd51 = k => v => setData(d => ({ ...d, table51: { ...d.table51, [k]: v } }));
    const upd83 = k => v => setData(d => ({ ...d, table83: { ...d.table83, [k]: v } }));
    const upd74 = k => v => setData(d => ({ ...d, table74: { ...d.table74, [k]: v } }));

    useEffect(() => {
        setData(d => {
            const updatedTable52 = GW_ACTIVITIES.map(a => {
                const existing = d.table52.find(t => t.activityId === a.id);
                const updatedTargets = arsDetails.map(s => {
                    const prevTarget = existing?.arsTargets?.find(st => st.arsDetail === s.arsDetail);
                    return { arsDetail: s.arsDetail, target: prevTarget?.target || "" };
                });

                return {
                    activityId: a.id,
                    activityLabel: a.label,
                    isHeader: a.isHeader || false,
                    unit: a.unit || "",
                    arsTargets: updatedTargets,
                    financialAmountLakh: existing?.financialAmountLakh || "",
                    totalPhysicalTarget: updatedTargets.reduce((sum, t) => sum + (Number(t.target) || 0), 0)
                };
            });
            return { ...d, table52: updatedTable52 };
        });
    }, [arsDetails.map(s => s.arsDetail).join(',')]);

    useEffect(() => {
        const dprFin = Number(data.table52.find(r => r.activityId === 'dpr_preparation')?.financialAmountLakh) || 0;
        const monFin = Number(data.table52.find(r => r.activityId === 'monitoring_evaluation')?.financialAmountLakh) || 0;
        const interventionsFin = data.table52.reduce((sum, r) => (r.activityId !== 'dpr_preparation' && r.activityId !== 'monitoring_evaluation' && !r.isHeader) ? sum + (Number(r.financialAmountLakh) || 0) : sum, 0);
        const total = dprFin + monFin + interventionsFin;

        const currentTotal = Number(data.table51.totalBudgetLakh) || 0;
        const fundA = Number(data.table74.fundFromPIADeptLakh) || 0;
        const fundB = Number(data.table74.fundFromOtherSourcesLakh) || 0;
        const fundC = Number(data.table74.fundFromSARRAConvergenceLakh) || 0;
        const grandTotal = fundA + fundB + fundC;

        if (total !== currentTotal || grandTotal !== Number(data.table74.grandTotalLakh)) {
            setData(d => ({
                ...d,
                table51: { ...d.table51, dprPreparationBudgetLakh: dprFin, monitoringEvaluationBudgetLakh: monFin, totalInterventionsCostLakh: interventionsFin, totalBudgetLakh: total },
                table83: { ...d.table83, totalProjectCostLakh: total, waterRechargePercentage: total > 0 ? (((Number(d.table83.waterRechargeBudgetLakh) || 0) / total) * 100).toFixed(2) : 0 },
                table74: { ...d.table74, totalFinancialAmountLakh: total, grandTotalLakh: grandTotal }
            }));
        }
    }, [data.table52, data.table83.waterRechargeBudgetLakh, data.table74.fundFromPIADeptLakh, data.table74.fundFromOtherSourcesLakh, data.table74.fundFromSARRAConvergenceLakh]);

    const upd52Target = (actIdx, arsDetail, val) => setData(d => ({
        ...d, table52: d.table52.map((r, i) => i === actIdx ? { ...r, arsTargets: r.arsTargets.map(st => st.arsDetail === arsDetail ? { ...st, target: val } : st) } : r)
    }));

    useEffect(() => {
        setData(d => ({
            ...d, table52: d.table52.map(r => {
                if (r.isHeader || r.activityId === 'dpr_preparation' || r.activityId === 'monitoring_evaluation') return r;
                const tot = r.arsTargets.reduce((s, t) => s + (Number(t.target) || 0), 0);
                return { ...r, totalPhysicalTarget: tot };
            })
        }));
    }, [data.table52.map(r => r.arsTargets.map(t => t.target).join()).join()]);

    // Auto-sync DPR Preparation & Monitoring amounts from Table 5.1 into Table 5.2
    useEffect(() => {
        setData(d => ({
            ...d, table52: d.table52.map(r => {
                if (r.activityId === 'dpr_preparation')
                    return { ...r, financialAmountLakh: Number(d.table51.dprPreparationBudgetLakh) || 0 };
                if (r.activityId === 'monitoring_evaluation')
                    return { ...r, financialAmountLakh: Number(d.table51.monitoringEvaluationBudgetLakh) || 0 };
                return r;
            })
        }));
    }, [data.table51.dprPreparationBudgetLakh, data.table51.monitoringEvaluationBudgetLakh]);

    const upd52Fin = (actIdx, val) => setData(d => ({ ...d, table52: d.table52.map((r, i) => i === actIdx ? { ...r, financialAmountLakh: val } : r) }));

    const handleFile = (key, file) => {
        if (!file) return;
        const reader = new FileReader();
        reader.onload = e => setData(d => ({ ...d, annexures: { ...d.annexures, [key + "Preview"]: e.target.result, [key + "File"]: file } }));
        reader.readAsDataURL(file);
    };

    const handleSigFile = (file) => {
        if (!file) return;
        const reader = new FileReader();
        reader.onload = e => setData(d => ({ ...d, signaturePreview: e.target.result, signatureFile: file }));
        reader.readAsDataURL(file);
    };

    const totalCostLakh = (Number(data.table51.dprPreparationBudgetLakh) || 0) + (Number(data.table51.totalInterventionsCostLakh) || 0) + (Number(data.table51.monitoringEvaluationBudgetLakh) || 0);
    const rechargePct = totalCostLakh > 0 ? (((Number(data.table83.waterRechargeBudgetLakh) || 0) / totalCostLakh) * 100).toFixed(2) : 0;
    const grandTotal = (Number(data.table74.fundFromPIADeptLakh) || 0) + (Number(data.table74.fundFromOtherSourcesLakh) || 0) + (Number(data.table74.fundFromSARRAConvergenceLakh) || 0);

    // Auto-fill responsible officer from Section 1 data
    useEffect(() => {
        setData(d => ({
            ...d,
            responsibleOfficer: {
                ...d.responsibleOfficer,
                department: d.responsibleOfficer.department || d.department || "",
                district: d.responsibleOfficer.district || d.district || "",
                block: d.responsibleOfficer.block || d.block || "",
                nodalOfficerName: d.responsibleOfficer.nodalOfficerName || d.nodalOfficer || "",
                contactNo: d.responsibleOfficer.contactNo || d.contactNo || "",
                email: d.responsibleOfficer.email || d.email || ""
            }
        }));
    }, []);

    const blocks = data.responsibleOfficer.district ? (BLOCKS_BY_DISTRICT[data.responsibleOfficer.district] || []) : [];

    return (
        <div className="space-y-6">
            <div className={secHead}>
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-xl">💰</div>
                <div><p className={secTitle}>Summary of Proposed Groundwater Recharge Plan</p><p className="text-sm text-slate-400">Section 5 of 5</p></div>
            </div>

            <h3 className="font-bold text-slate-700 mt-6 mb-2">Responsible Officer Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <FloatSelect label="Department" value={data.responsibleOfficer.department} onChange={updResp("department")} options={DEPARTMENTS} required />
                {data.responsibleOfficer.department === 'Other Department/Organization' && <FloatInput label="Specify Department" value={data.responsibleOfficer.departmentOther || ""} onChange={updResp("departmentOther")} />}
                <FloatSelect label="District" value={data.responsibleOfficer.district} onChange={updResp("district")} options={DISTRICTS} required />
                <FloatSelect label="Block" value={data.responsibleOfficer.block} onChange={updResp("block")} options={blocks} required />
                <FloatInput label="Gram Panchayat" value={data.responsibleOfficer.gramPanchayat} onChange={updResp("gramPanchayat")} />
                <FloatInput label="Nodal Officer Name" value={data.responsibleOfficer.nodalOfficerName} onChange={updResp("nodalOfficerName")} required />
                <FloatInput label="Designation" value={data.responsibleOfficer.designation} onChange={updResp("designation")} required />
                <FloatInput label="Contact No" value={data.responsibleOfficer.contactNo} onChange={updResp("contactNo")} required />
                <FloatInput label="Email" value={data.responsibleOfficer.email} onChange={updResp("email")} required />
            </div>

            <TableWrapper title="Table 5.1 — Budget Allocation">
                <thead><tr>{["Budget Component", "Amount (Rs. in Lakh)"].map(h => <th key={h} className={tableHead}>{h}</th>)}</tr></thead>
                <tbody>
                    <tr className="bg-white"><td className={tableCell}>1. DPR Preparation (1-2%)</td><td className={tableCell}><input className={tinp + " w-40"} type="number" value={data.table51.dprPreparationBudgetLakh} onChange={e => upd51("dprPreparationBudgetLakh")(e.target.value)} /></td></tr>
                    <tr className="bg-slate-50"><td className={tableCell}>2. Interventions/Activities Cost</td><td className={tableCell}><input className={tinp + " w-40"} type="number" value={data.table51.totalInterventionsCostLakh} onChange={e => upd51("totalInterventionsCostLakh")(e.target.value)} /></td></tr>
                    <tr className="bg-white"><td className={tableCell}>3. Monitoring & Evaluation (2%)</td><td className={tableCell}><input className={tinp + " w-40"} type="number" value={data.table51.monitoringEvaluationBudgetLakh} onChange={e => upd51("monitoringEvaluationBudgetLakh")(e.target.value)} /></td></tr>
                    <tr className="bg-cyan-50 font-bold"><td className={tableCell}>Total</td><td className={tableCell}><span className="px-2">{totalCostLakh.toFixed(2)}</span></td></tr>
                </tbody>
            </TableWrapper>

            <div className="mt-8 mb-4">
                <h2 className="text-xl font-bold text-slate-800 border-b-2 border-cyan-600 pb-1 inline-block">Table No. 5.2</h2>
                <p className="text-slate-500 text-sm mt-1">Physical and Financial activities for Treatment of Aquifer Recharge Sites</p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xl shadow-slate-100/50 mb-8">
                <div className="inline-block min-w-full align-middle">
                    <div className="bg-gradient-to-r from-cyan-700 via-blue-700 to-blue-800 px-6 py-4 flex items-center justify-between border-b border-cyan-900/20">
                        <span className="text-white font-extrabold text-sm tracking-wide uppercase">Table 5.2 — Proposed Activities</span>
                    </div>
                    <div className="min-w-full overflow-hidden">
                        <table className="min-w-full border-collapse">
                            <thead>
                                <tr>
                                    <th className={tableHead + " w-12"}>S.N.</th>
                                    <th className={tableHead + " min-w-[200px]"}>Activities Name</th>
                                    <th className={tableHead + " w-20"}>Unit</th>
                                    {arsDetails.map(s => (
                                        <th key={s.arsDetail} className={tableHead}>{s.name || s.arsDetail}</th>
                                    ))}
                                    <th className={tableHead + " w-24"}>Total Physical Targets</th>
                                    <th className={tableHead + " w-32"}>Financial Amount (Rs. in Lakh)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.table52.map((act, i) => {
                                    if (act.isHeader) {
                                        return (
                                            <tr key={i} className="bg-slate-200/70 border-y border-slate-300">
                                                <td className={tableCell + " font-bold text-center"}>2</td>
                                                <td colSpan={3 + arsDetails.length} className="px-3 py-2 font-bold text-slate-700">{act.activityLabel}</td>
                                            </tr>
                                        );
                                    }
                                    const isSummaryRow = act.activityId === 'dpr_preparation' || act.activityId === 'monitoring_evaluation';
                                    const displayIndex = act.activityId === 'dpr_preparation' ? '1' : (act.activityId === 'monitoring_evaluation' ? '3' : `2.${i - 1}`);

                                    return (
                                        <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50 hover:bg-slate-50"}>
                                            <td className={tableCell + " font-semibold text-center"}>{displayIndex}</td>
                                            <td className={tableCell + " font-medium text-slate-700"}>{act.activityLabel}</td>
                                            <td className={tableCell + " text-center text-xs text-slate-500"}>{act.unit}</td>

                                            {isSummaryRow ? (
                                                <td colSpan={arsDetails.length + 1} className={tableCell + " text-center text-slate-400 text-xs bg-slate-50/50"}>
                                                    Calculated automatically in Table 5.1
                                                </td>
                                            ) : (
                                                <>
                                                    {arsDetails.map(s => {
                                                        const targetVal = act.arsTargets?.find(st => st.arsDetail === s.arsDetail)?.target || "";
                                                        return (
                                                            <td key={s.arsDetail} className={tableCell}>
                                                                <input className={tinp + " text-center w-full min-w-[60px]"} type="number" value={targetVal} onChange={e => upd52Target(i, s.arsDetail, e.target.value)} />
                                                            </td>
                                                        );
                                                    })}
                                                    <td className={tableCell + " text-center font-bold text-cyan-700 bg-cyan-50/30"}>{act.totalPhysicalTarget}</td>
                                                </>
                                            )}

                                            <td className={tableCell}>
                                                {isSummaryRow ? (
                                                    <div className="px-3 py-2 text-sm font-bold text-cyan-700 bg-cyan-50 rounded-lg border border-cyan-100 text-center">
                                                        ₹ {Number(act.financialAmountLakh).toFixed(2)} L
                                                        <div className="text-[9px] text-cyan-400 font-normal mt-0.5">Auto from Table 5.1</div>
                                                    </div>
                                                ) : (
                                                    <input className={tinp + " w-full font-semibold"} type="number" value={act.financialAmountLakh} onChange={e => upd52Fin(i, e.target.value)} />
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                                <tr className="bg-cyan-50 border-t-2 border-cyan-200">
                                    <td colSpan={3 + arsDetails.length} className="px-4 py-3 font-bold text-right text-cyan-800">Total Interventions Cost (Rs. in Lakh)</td>
                                    <td className="px-4 py-3 font-bold text-cyan-800 text-lg">{data.table51?.totalInterventionsCostLakh || 0}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm mb-6">
                <h3 className="text-base font-bold text-slate-800 mb-4">Table 8.3 — Water Recharge Compliance</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <span className="block text-xs text-slate-500 uppercase font-bold mb-1">Total Project Cost (A)</span>
                        <span className="text-xl font-black text-slate-700">₹ {totalCostLakh.toFixed(2)} L</span>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                        <span className="block text-xs text-blue-500 uppercase font-bold mb-1">Budget for Water Recharge (B)</span>
                        <input className={tinp + " font-bold text-blue-700 bg-white"} type="number" value={data.table83.waterRechargeBudgetLakh} onChange={e => upd83("waterRechargeBudgetLakh")(e.target.value)} placeholder="0.00" />
                    </div>
                    <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                        <span className="block text-xs text-emerald-600 uppercase font-bold mb-1">% of Water Recharge (B/A*100)</span>
                        <span className="text-2xl font-black text-emerald-600">{rechargePct}%</span>
                    </div>
                </div>
            </div>

            <TableWrapper title="Table 7.4 — Financial Convergence">
                <thead><tr>{["Total Financial Amount", "Fund expected from PIA Dept", "Fund expected from other sources", "Fund expected from SARRA Convergence", "Grand Total"].map(h => <th key={h} className={tableHead}>{h}</th>)}</tr></thead>
                <tbody>
                    <tr className="bg-white">
                        <td className={tableCell + " font-bold text-lg text-center"}>{totalCostLakh.toFixed(2)}</td>
                        <td className={tableCell}><input className={tinp + " w-full"} type="number" value={data.table74.fundFromPIADeptLakh} onChange={e => upd74("fundFromPIADeptLakh")(e.target.value)} /></td>
                        <td className={tableCell}><input className={tinp + " w-full"} type="number" value={data.table74.fundFromOtherSourcesLakh} onChange={e => upd74("fundFromOtherSourcesLakh")(e.target.value)} /></td>
                        <td className={tableCell}><input className={tinp + " w-full"} type="number" value={data.table74.fundFromSARRAConvergenceLakh} onChange={e => upd74("fundFromSARRAConvergenceLakh")(e.target.value)} /></td>
                        <td className={tableCell + " font-bold text-lg text-center"}>{grandTotal.toFixed(2)}</td>
                    </tr>
                </tbody>
            </TableWrapper>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <div>
                    <label className={lbl}>Detail Project Report (PDF)</label>
                    <input type="file" accept=".pdf" onChange={e => handleFile("detailProjectReport", e.target.files[0])} className="text-sm file:mr-3 file:py-1.5 file:px-4 file:rounded-lg file:border-0 file:bg-blue-100 file:text-blue-700 mt-2" />
                    {data.annexures.detailProjectReportPreview && <span className="block mt-2 text-green-600 text-xs font-bold">✓ Selected</span>}
                </div>
                <div>
                    <label className={lbl}>Any other relevant documents (PDF)</label>
                    <input type="file" accept=".pdf" onChange={e => handleFile("otherDocuments", e.target.files[0])} className="text-sm file:mr-3 file:py-1.5 file:px-4 file:rounded-lg file:border-0 file:bg-blue-100 file:text-blue-700 mt-2" />
                    {data.annexures.otherDocumentsPreview && <span className="block mt-2 text-green-600 text-xs font-bold">✓ Selected</span>}
                </div>
            </div>

            <div className="bg-cyan-50 border border-cyan-200 p-6 rounded-2xl mt-8">
                <p className="text-sm text-cyan-800 font-medium mb-6 italic text-center">"The above format could be further modified with technical and scientific inputs from different departments/organisations."</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                    <FloatInput label="Date of Proposal Submission" value={data.submissionDate} onChange={upd("submissionDate")} type="date" />
                    <FloatInput label="Submitted By (Name)" value={data.submittedByName} onChange={upd("submittedByName")} />
                    <div>
                        <label className={lbl}>Signature with Stamp (JPG/PNG)</label>
                        <input type="file" accept="image/*" onChange={e => handleSigFile(e.target.files[0])} className="w-full text-sm file:mr-3 file:py-1.5 file:px-4 file:rounded-lg file:border-0 file:bg-white file:border-slate-200 file:text-slate-700 mt-1" />
                        {data.signaturePreview && <img src={data.signaturePreview} className="mt-2 h-16 object-contain border rounded bg-white p-1" />}
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function GroundwaterDPRForm() {
    const { user, loading } = useAuth();
    const router = useRouter();

    const [step, setStep] = useState(1);
    const [submitting, setSubmitting] = useState(false);
    const [successMsg, setSuccessMsg] = useState(null);

    const [data, setData] = useState(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("groundwater_dpr_draft");
            if (saved) return JSON.parse(saved);
        }
        return {
            department: "", departmentOther: "", district: "", block: "", address: "", nodalOfficer: "", contactNo: "", email: "",
            subWatershedName: "", microWatershedName: "", microWatershedCode: "", aquiferName: "", blockTown: "", villages: "", aquiferRechargeSiteName: "", aquiferRechargeSiteUniqueCode: "", noOfVillagesHabitation: "", villagesHabitationNames: "",
            arsDetails: [
                { sn: 1, arsDetail: "ARS-1", name: "", latitude: { dd: "", mm: "", ss: "" }, longitude: { dd: "", mm: "", ss: "" }, altitudeMasl: "", approxRechargeAreaHa: "", landOwnership: "", landTypeDesignation: "", landTypeOther: "" }
            ],
            hydrologicalDetails: [], sourceOfWaterForRecharge: "", sourceOfWaterOther: "", avgAvailabilityPeriodMonths: "", groundwaterAvailabilityStatus: "", primaryGroundwaterUses: [], primaryGroundwaterUsesOther: "",
            potentialRisks: "", vulnerabilityLevel: "",
            responsibleOfficer: { department: "", district: "", block: "", gramPanchayat: "", nodalOfficerName: "", designation: "", contactNo: "", email: "" },
            table51: { dprPreparationBudgetLakh: "", totalInterventionsCostLakh: "", monitoringEvaluationBudgetLakh: "", totalBudgetLakh: "" },
            table52: [],
            table83: { totalProjectCostLakh: "", waterRechargeBudgetLakh: "", waterRechargePercentage: "" },
            table74: { totalFinancialAmountLakh: "", fundFromPIADeptLakh: "", fundFromOtherSourcesLakh: "", fundFromSARRAConvergenceLakh: "", grandTotalLakh: "" },
            annexures: {},
            submissionDate: new Date().toISOString().split('T')[0],
            submittedByName: ""
        };
    });

    useEffect(() => {
        if (!loading && !user) router.push("/login");
    }, [user, loading, router]);

    useEffect(() => {
        try {
            const { rechargeSiteFile, rechargeSitePreview, interventionSiteFile, interventionSitePreview, signatureFile, signaturePreview, ...safeData } = data;
            const safeAnnexures = { ...data.annexures };
            delete safeAnnexures.detailProjectReportFile;
            delete safeAnnexures.otherDocumentsFile;
            localStorage.setItem("groundwater_dpr_draft", JSON.stringify({ ...safeData, annexures: safeAnnexures }));
        } catch (e) {
        }
    }, [data]);

    useEffect(() => {
        if (user && !data.email) {
            setData(d => ({ ...d, email: user.email, district: user.district || d.district, block: user.block || d.block, department: user.department || d.department }));
        }
    }, [user]);

    const handleSaveDraft = async () => {
        try {
            const formData = new FormData();
            formData.append("data", JSON.stringify(data));

            if (data.rechargeSiteFile) formData.append("rechargeSitePhoto", data.rechargeSiteFile);
            if (data.interventionSiteFile) formData.append("interventionSitePhoto", data.interventionSiteFile);
            if (data.annexures.detailProjectReportFile) formData.append("detailProjectReport", data.annexures.detailProjectReportFile);
            if (data.annexures.otherDocumentsFile) formData.append("otherDocuments", data.annexures.otherDocumentsFile);
            if (data.signatureFile) formData.append("signatureWithStamp", data.signatureFile);

            await axiosInstance.post("/dpr/groundwater/draft", formData, { headers: { "Content-Type": "multipart/form-data" } });
            toast.success("Draft saved successfully to server.");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to save draft.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const formData = new FormData();

            // Format data for backend
            const payload = {
                isDraft: false,
                section1_deptDetails: {
                    department: data.department,
                    departmentOther: data.departmentOther,
                    district: data.district,
                    block: data.block,
                    address: data.address,
                    nodalOfficer: data.nodalOfficer,
                    contactNo: data.contactNo,
                    email: data.email
                },
                section2_aquiferIdentification: {
                    subWatershedName: data.subWatershedName,
                    microWatershedName: data.microWatershedName,
                    microWatershedCode: data.microWatershedCode,
                    aquiferName: data.aquiferName,
                    district: data.district,
                    blockTown: data.blockTown,
                    villages: data.villages,
                    aquiferRechargeSiteName: data.aquiferRechargeSiteName,
                    aquiferRechargeSiteUniqueCode: data.aquiferRechargeSiteUniqueCode,
                    noOfVillagesHabitation: Number(data.noOfVillagesHabitation) || 0,
                    villagesHabitationNames: data.villagesHabitationNames,
                    arsDetails: data.arsDetails.map(a => ({ ...a, sn: Number(a.sn), altitudeMasl: Number(a.altitudeMasl) || 0, approxRechargeAreaHa: Number(a.approxRechargeAreaHa) || 0 })),
                    hydrologicalDetails: data.hydrologicalDetails.map(h => ({ ...h, depthToWaterTablePreMonsoon: Number(h.depthToWaterTablePreMonsoon) || 0, depthToWaterTablePostMonsoon: Number(h.depthToWaterTablePostMonsoon) || 0, depthToWaterTable10YrsAgo: Number(h.depthToWaterTable10YrsAgo) || 0 })),
                    sourceOfWaterForRecharge: data.sourceOfWaterForRecharge,
                    sourceOfWaterOther: data.sourceOfWaterOther,
                    avgAvailabilityPeriodMonths: Number(data.avgAvailabilityPeriodMonths) || 0,
                    groundwaterAvailabilityStatus: data.groundwaterAvailabilityStatus,
                    primaryGroundwaterUses: data.primaryGroundwaterUses,
                    primaryGroundwaterUsesOther: data.primaryGroundwaterUsesOther
                },
                section3_photographs: {},
                section4_riskAssessment: {
                    potentialRisks: data.potentialRisks,
                    vulnerabilityLevel: data.vulnerabilityLevel
                },
                section5_budgetAndPlan: {
                    responsibleOfficer: data.responsibleOfficer,
                    table51: {
                        dprPreparationBudgetLakh: Number(data.table51.dprPreparationBudgetLakh) || 0,
                        totalInterventionsCostLakh: Number(data.table51.totalInterventionsCostLakh) || 0,
                        monitoringEvaluationBudgetLakh: Number(data.table51.monitoringEvaluationBudgetLakh) || 0,
                        totalBudgetLakh: Number(data.table51.totalBudgetLakh) || 0
                    },
                    table52: data.table52.map(act => ({
                        activityId: act.activityId,
                        activityLabel: act.activityLabel,
                        isHeader: act.isHeader,
                        unit: act.unit,
                        arsTargets: act.arsTargets?.map(t => ({ arsDetail: t.arsDetail, target: Number(t.target) || 0 })),
                        totalPhysicalTarget: Number(act.totalPhysicalTarget) || 0,
                        financialAmountLakh: Number(act.financialAmountLakh) || 0
                    })),
                    dprFinancialAmountLakh: Number(data.table52.find(r => r.activityId === 'dpr_preparation')?.financialAmountLakh) || 0,
                    monitoringFinancialAmountLakh: Number(data.table52.find(r => r.activityId === 'monitoring_evaluation')?.financialAmountLakh) || 0,
                    table83: {
                        totalProjectCostLakh: Number(data.table83.totalProjectCostLakh) || 0,
                        waterRechargeBudgetLakh: Number(data.table83.waterRechargeBudgetLakh) || 0,
                        waterRechargePercentage: Number(data.table83.waterRechargePercentage) || 0
                    },
                    table74: {
                        totalFinancialAmountLakh: Number(data.table74.totalFinancialAmountLakh) || 0,
                        fundFromPIADeptLakh: Number(data.table74.fundFromPIADeptLakh) || 0,
                        fundFromOtherSourcesLakh: Number(data.table74.fundFromOtherSourcesLakh) || 0,
                        fundFromSARRAConvergenceLakh: Number(data.table74.fundFromSARRAConvergenceLakh) || 0,
                        grandTotalLakh: Number(data.table74.grandTotalLakh) || 0
                    },
                    submissionDate: data.submissionDate,
                    submittedByName: data.submittedByName
                }
            };

            formData.append("data", JSON.stringify(payload));

            if (data.rechargeSiteFile) formData.append("rechargeSitePhoto", data.rechargeSiteFile);
            if (data.interventionSiteFile) formData.append("interventionSitePhoto", data.interventionSiteFile);
            if (data.annexures.detailProjectReportFile) formData.append("detailProjectReport", data.annexures.detailProjectReportFile);
            if (data.annexures.otherDocumentsFile) formData.append("otherDocuments", data.annexures.otherDocumentsFile);
            if (data.signatureFile) formData.append("signatureWithStamp", data.signatureFile);

            const res = await axiosInstance.post("/dpr/groundwater/submit", formData, { headers: { "Content-Type": "multipart/form-data" } });

            localStorage.removeItem("groundwater_dpr_draft");
            setSuccessMsg({ appNo: res.data.data.applicationNo, arsCount: data.arsDetails.filter(a => a.name).length });
            toast.success("Groundwater DPR Submitted Successfully!");

        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to submit form. Please check all required fields.");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center text-cyan-600 font-bold">Loading form...</div>;
    if (!user) return null;

    if (successMsg) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl p-8 max-w-lg w-full text-center shadow-2xl border border-slate-100">
                    <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center text-5xl mx-auto mb-6 shadow-inner">💧</div>
                    <h1 className="text-3xl font-black text-slate-800 mb-2">Submitted Successfully!</h1>
                    <p className="text-slate-500 mb-8">Your Groundwater DPR has been sent for DD level review.</p>

                    <div className="bg-slate-50 rounded-2xl p-6 mb-8 border border-slate-100 text-left">
                        <p className="text-sm text-slate-500 font-bold uppercase tracking-wider mb-1">Application No.</p>
                        <p className="text-xl font-mono font-bold text-slate-800 mb-4 bg-white py-2 px-3 rounded-lg border">{successMsg.appNo}</p>

                        <div className="flex justify-between items-center bg-white p-3 rounded-lg border">
                            <span className="text-sm font-semibold text-slate-600">Aquifer Recharge Sites (ARS)</span>
                            <span className="px-3 py-1 bg-cyan-100 text-cyan-800 rounded-full font-bold text-sm">{successMsg.arsCount} identified</span>
                        </div>
                    </div>

                    <div className="flex gap-4 justify-center">
                        <button onClick={() => window.location.reload()} className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-xl shadow-lg shadow-cyan-200 transition-all">Start New DPR</button>
                        <button onClick={() => router.push("/dashboard")} className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-all">Go to Dashboard</button>
                    </div>
                </div>
            </div>
        );
    }

    const namedARS = data.arsDetails.filter(a => a.name.trim() !== "");

    const handleStepChange = (newStep) => {
        setStep(newStep);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-slate-50/50 pb-20">
            <div className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-slate-200 shadow-sm">
                {namedARS.length > 0 && (
                    <div className="bg-cyan-50/50 border-b border-slate-100 py-2">
                        <div className="max-w-[98%] lg:max-w-7xl mx-auto px-4 lg:px-8 flex items-center gap-2 overflow-x-auto no-scrollbar">
                            <span className="text-[10px] font-black text-cyan-700 uppercase tracking-tighter shrink-0">ARS Sites:</span>
                            {namedARS.map((s, idx) => (
                                <span key={idx} className="shrink-0 bg-white border border-cyan-100 text-cyan-600 text-[11px] px-3 py-0.5 rounded-full font-bold shadow-sm">{s.arsDetail}: {s.name}</span>
                            ))}
                        </div>
                    </div>
                )}

                <div className="max-w-[98%] lg:max-w-7xl mx-auto px-4 lg:px-8 py-4 overflow-x-auto no-scrollbar">
                    <div className="flex items-center justify-between min-w-[650px]">
                        {SECTIONS.map((s, i) => (
                            <div key={s.id} className="flex-1 flex items-center">
                                <SectionTag step={s} current={step} />
                                {i < SECTIONS.length - 1 && (
                                    <div className="flex-1 px-4">
                                        <div className={`h-1.5 rounded-full transition-all duration-500 ${step > s.id ? 'bg-gradient-to-r from-green-400 to-green-600 shadow-sm shadow-green-100' : 'bg-slate-100'}`} />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="max-w-[95%] lg:max-w-7xl mx-auto px-4 lg:px-8 mt-5">
                <h1 className="text-2xl md:text-2xl font-black text-slate-800 leading-tight uppercase tracking-tight">Groundwater (Aquifer Recharge)</h1>
                <p className="text-md md:text-lg font-bold text-cyan-600 uppercase tracking-widest">DPR Preparation Form</p>
            </div>

            <div className="max-w-[98%] lg:max-w-7xl mx-auto px-4 lg:px-8 mt-5">
                <form onSubmit={handleSubmit} className={card + " p-2 md:p-6 shadow-2xl border-white ring-1 ring-slate-200/50"}>

                    <div className={step === 1 ? 'block animate-fade-in' : 'hidden'}><Section1 data={data} setData={setData} /></div>
                    <div className={step === 2 ? 'block animate-fade-in' : 'hidden'}><Section2 data={data} setData={setData} sec1={data} /></div>
                    <div className={step === 3 ? 'block animate-fade-in' : 'hidden'}><Section3 data={data} setData={setData} /></div>
                    <div className={step === 4 ? 'block animate-fade-in' : 'hidden'}><Section4 data={data} setData={setData} /></div>
                    <div className={step === 5 ? 'block animate-fade-in' : 'hidden'}><Section5 data={data} setData={setData} arsDetails={data.arsDetails} /></div>

                    <div className="mt-16 pt-8 border-t border-slate-100 flex justify-between items-center -mx-8 md:-mx-12 -mb-8 md:-mb-12 p-8 md:p-12 bg-slate-50/80 rounded-b-[40px]">
                        <div>
                            {step > 1 && (
                                <NavBtn onClick={() => handleStepChange(step - 1)} label="Previous Step" icon="←" />
                            )}
                        </div>

                        <div className="flex items-center gap-4">
                            <SaveDraftBtn onClick={handleSaveDraft} />
                            {step < 5 ? (
                                <NavBtn primary onClick={() => handleStepChange(step + 1)} label="Continue to Next Step" icon="→" />
                            ) : (
                                <button type="submit" disabled={submitting} className={`inline-flex items-center gap-3 px-10 py-4 rounded-2xl text-lg font-black transition-all shadow-2xl shadow-cyan-200/50 ${submitting ? 'bg-slate-400 text-white cursor-not-allowed' : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white hover:scale-[1.02] active:scale-95'}`}>
                                    {submitting ? (
                                        <span className="flex items-center gap-2"><div className="w-5 h-5 border-4 border-white/30 border-t-white rounded-full animate-spin"></div> Submitting...</span>
                                    ) : (
                                        <>✓ Submit Groundwater DPR</>
                                    )}
                                </button>
                            )}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
