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

const STREAM_DETAILS = [
    'Main Stream', 'Tributaries-1', 'Tributaries-2', 'Tributaries-3'
];
const STREAM_NATURES = ['Perennial', 'Seasonal', 'Dried'];
const WATER_USES_STREAM = [
    'Drinking Water', 'Lifting Scheme for Drinking Water',
    'Irrigation Scheme', 'Lift Irrigation Scheme', 'Other', 'None'
];
const STREAM_ACTIVITIES = [
    { id: '1', label: 'DPR Preparation', unit: 'Rs. in Lakh', isDPR: true },
    { id: '2', label: 'Interventions/ Activities', isHeader: true },
    { id: '2.1', label: 'Contour Trenches', unit: 'No.' },
    { id: '2.2', label: 'Recharge Pit', unit: 'No.' },
    { id: '2.3', label: 'Dugout Ponds', unit: 'No.' },
    { id: '2.4', label: 'Chal-Khal', unit: 'No.' },
    { id: '2.5', label: 'Brushwood check dam', unit: 'No.' },
    { id: '2.6', label: 'Temporary check dam(Pirul etc.)', unit: 'No.' },
    { id: '2.7', label: 'Loose Boulder check dam', unit: 'No.' },
    { id: '2.8', label: 'RR Dry Check Dam', unit: 'No.' },
    { id: '2.9', label: 'Gabion/ Crate wire check dam', unit: 'No.' },
    { id: '2.10', label: 'Cemented check dam', unit: 'No.' },
    { id: '2.11', label: 'Vegetative Treatment', unit: 'Ha.' },
    { id: '2.12', label: 'Fodder/ Grass Plantation', unit: 'Ha.' },
    { id: '2.13', label: 'Forestry Plantation', unit: 'Ha.' },
    { id: '2.14', label: 'ANR Activities', unit: 'Ha.' },
    { id: '2.15', label: 'Plantation Activities', unit: 'Ha.' },
    { id: '2.17', label: 'Estimated Area of Catchment Treated by above Activities', unit: 'Ha.' },
    { id: '3', label: 'Monitoring & Evaluation **', unit: 'Rs. in Lakh', isMonitoring: true }
];
const LAND_COVER_FIELDS = ['Agriculture', 'Reserve Forest', 'Van Panchayat', 'Pasture in non-forest / village Land', 'Settlement'];

const SECTIONS = [
    { id: 1, label: "Dept. Details", icon: "🏛️" },
    { id: 2, label: "Stream ID", icon: "🌊" },
    { id: 3, label: "Catchment", icon: "🏔️" },
    { id: 4, label: "Photos", icon: "📷" },
    { id: 5, label: "Recharge", icon: "💧" },
    { id: 6, label: "Maps", icon: "🗺️" },
    { id: 7, label: "Budget & Plan", icon: "💰" },
    { id: 8, label: "Geo Location", icon: "📍" }
];

// ─── STYLE HELPERS ────────────────────────────────────────────────────────────
const inp = "w-full px-4 py-3 text-base border-2 border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400 transition-all placeholder-slate-400";
const sel = inp + " cursor-pointer";
const tinp = "w-full px-3 py-3 text-sm border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-400 transition-all placeholder-slate-400 min-h-[46px]";
const tsel = "w-full px-3 py-3 text-sm border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-400 transition-all cursor-pointer min-h-[46px]";
const lbl = "block text-sm font-bold text-slate-600 mb-1.5 uppercase tracking-wide";
const secHead = "flex items-center gap-3 mb-6";
const secTitle = "text-xl font-bold text-slate-800";
const tableHead = "bg-gradient-to-r from-blue-700 to-blue-800 text-white text-[11px] font-bold uppercase tracking-wider px-2 py-3 whitespace-normal break-words text-center min-w-[80px]";
const tableCell = "px-2 py-2 text-sm border-b border-slate-100 align-top";
const card = "bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden";

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

const upd = k => v => setData(d => ({ ...d, [k]: v }));

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
            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${done ? 'bg-green-500 border-green-500 text-white' : active ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-200' : 'bg-white border-slate-200 text-slate-400'}`}>
                {done ? '✓' : step.icon}
            </div>
            <span className={`text-[10px] font-semibold hidden sm:block ${active ? 'text-blue-600' : done ? 'text-green-600' : 'text-slate-400'}`}>{step.label}</span>
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
        <button type="button" onClick={onClick} className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${primary ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-200' : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'}`}>
            {!primary && icon} {label} {primary && icon}
        </button>
    );
}

function TableWrapper({ title, subtitle, children }) {
    return (
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xl shadow-slate-100/50 mb-8">
            <div className="inline-block min-w-full align-middle">
                <div className="bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 px-6 py-4 flex items-center justify-between border-b border-blue-900/20">
                    <div className="flex items-center gap-3">
                        <span className="text-white font-extrabold text-sm tracking-wide uppercase">{title}</span>
                    </div>
                    {subtitle && <span className="text-blue-100 text-[10px] font-bold uppercase tracking-widest bg-blue-900/40 px-3 py-1 rounded-full">{subtitle}</span>}
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

function InfoBadge({ text }) {
    return (
        <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-700 mb-4">
            <span className="text-amber-500 mt-0.5">ℹ</span>
            <span>{text}</span>
        </div>
    );
}

// ─── SECTIONS ─────────────────────────────────────────────────────────────────

function Section1({ data, setData }) {
    const upd = k => v => setData(d => ({ ...d, [k]: v }));
    const blocks = data.district ? (BLOCKS_BY_DISTRICT[data.district] || []) : [];
    return (
        <div className="space-y-6">
            <div className={secHead}>
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">🏛️</div>
                <div><p className={secTitle}>Department / Organization Details</p><p className="text-xs text-slate-400">Section 1 of 8</p></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FloatSelect label="Department/Organization" value={data.department} onChange={upd("department")} options={DEPARTMENTS} required />
                {data.department === 'Other' && <FloatInput label="Other Department Name" value={data.deptOther || ""} onChange={upd("deptOther")} required />}
                <FloatSelect label="District" value={data.district} onChange={v => { setData(d => ({ ...d, district: v, block: "" })); }} options={DISTRICTS} required />
                <FloatSelect label="Block" value={data.block} onChange={upd("block")} options={blocks} />
                <FloatInput label="Address of Department/Organization" value={data.address} onChange={upd("address")} />
                <FloatInput label="Key Nodal Officer for Stream Rejuvenation Activities" value={data.nodalOfficer} onChange={upd("nodalOfficer")} required />
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

    const addTributary = () => {
        setData(d => {
            const nextIdx = d.table21.length;
            const detail = nextIdx === 0 ? "Main Stream" : `Tributary-${nextIdx}`;
            return {
                ...d, table21: [...d.table21, {
                    sn: nextIdx + 1, detail, name: "", streamOrder: "",
                    startPoint: { lat: { dd: "", mm: "", ss: "" }, lng: { dd: "", mm: "", ss: "" } },
                    endPoint: { lat: { dd: "", mm: "", ss: "" }, lng: { dd: "", mm: "", ss: "" } },
                    lengthKm: "", altitudeMtr: ""
                }]
            };
        });
    };

    const removeTributary = (idx) => {
        setData(d => {
            if (idx === 0) {
                toast.error("Main Stream cannot be removed");
                return d;
            }
            const filtered = d.table21.filter((_, i) => i !== idx);
            const reindexed = filtered.map((item, i) => ({
                ...item,
                sn: i + 1,
                detail: i === 0 ? "Main Stream" : `Tributary-${i}`
            }));
            return { ...d, table21: reindexed };
        });
    };

    const upd21 = (i, k, v) => setData(d => ({ ...d, table21: d.table21.map((r, idx) => idx === i ? { ...r, [k]: v } : r) }));
    const updCoord21 = (i, point, coord, part, v) => {
        const cleanV = v.replace(/[^0-9]/g, '').slice(0, 2);
        setData(d => ({ ...d, table21: d.table21.map((r, idx) => idx === i ? { ...r, [point]: { ...r[point], [coord]: { ...r[point][coord], [part]: cleanV } } } : r) }));
        if (cleanV.length === 2) {
            const el = document.activeElement;
            const next = el?.nextElementSibling || el?.closest('div')?.nextElementSibling?.querySelector('input');
            if (next) next.focus();
        }
    };

    const syncRows = (source, target, mapper) => {
        return source.map(s => {
            const existing = target.find(t => t.detail === s.detail) || {};
            return mapper(s, existing);
        });
    };

    useEffect(() => {
        setData(d => ({
            ...d,
            table22: syncRows(d.table21, d.table22, (s, e) => ({ ...e, detail: s.detail, name: s.name, streamOrder: s.streamOrder, streamNature: e.streamNature || "", ifSeasonalMonths: e.ifSeasonalMonths || "", dischargeDecJanLPM: e.dischargeDecJanLPM || "", dischargeMayJuneLPM: e.dischargeMayJuneLPM || "", decreaseInDischarge15YrsPercent: e.decreaseInDischarge15YrsPercent || "" })),
            table23: syncRows(d.table21, d.table23, (s, e) => ({ ...e, detail: s.detail, name: s.name, streamOrder: s.streamOrder, waterUse: e.waterUse || "", noOfSchemes: e.noOfSchemes || "", benefitedPopulation: e.benefitedPopulation || "", irrigationCommandAreaHa: e.irrigationCommandAreaHa || "" }))
        }));
    }, [data.table21]);

    const upd22 = (i, k, v) => setData(d => ({ ...d, table22: d.table22.map((r, idx) => idx === i ? { ...r, [k]: v } : r) }));
    const upd23 = (i, k, v) => setData(d => ({ ...d, table23: d.table23.map((r, idx) => idx === i ? { ...r, [k]: v } : r) }));

    return (
        <div className="space-y-6">
            <div className={secHead}>
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-xl">🌊</div>
                <div><p className={secTitle}>Stream Identification Particulars</p><p className="text-sm text-slate-400">Section 2 of 8</p></div>
            </div>

            <InfoBadge text="Please fill the information as mentioned in DPR. For Discharge, provide values for both Lean Season windows." />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <FloatInput label="Name of identified Stream for treatment" value={data.streamName || ""} onChange={upd("streamName")} required />
                <FloatInput label="Stream Order" value={data.streamOrder || ""} onChange={upd("streamOrder")} />
                <FloatSelect label="District" value={effectiveDistrict} onChange={v => setData(d => ({ ...d, district: v, blockTown: "" }))} options={DISTRICTS} required />
                <FloatSelect label="Block/Town" value={effectiveBlock} onChange={upd("blockTown")} options={blocks} required />
                <FloatInput label="Length of Stream (Km)" value={data.lengthOfStreamKm || ""} onChange={upd("lengthOfStreamKm")} type="number" />
                <FloatInput label="Sub Watershed Name" value={data.subWatershedName || ""} onChange={upd("subWatershedName")} />
                <FloatInput label="Micro Watershed Name" value={data.microWatershedName || ""} onChange={upd("microWatershedName")} />
                <FloatInput label="No. of Villages/Habitation" value={data.noOfVillagesHabitation || ""} onChange={upd("noOfVillagesHabitation")} type="number" />
            </div>
            <div className="mt-4">
                <label className={lbl}>Villages/Habitation Names</label>
                <textarea className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl bg-white focus:outline-none focus:border-blue-400" rows={3} value={data.villagesHabitationNames || ""} onChange={e => upd("villagesHabitationNames")(e.target.value)}></textarea>
            </div>

            <TableWrapper title="Table 2.1 — Stream Tributaries Detail">
                <thead>
                    <tr>{["S.N.", "Detail", "Name", "Stream Order", "Start Lat (DD/MM/SS)", "Start Long (DD/MM/SS)", "End Lat (DD/MM/SS)", "End Long (DD/MM/SS)", "Length (Km)", "Altitude (Mtr)", "Action"].map(h => <th key={h} className={tableHead}>{h}</th>)}</tr>
                </thead>
                <tbody>
                    {data.table21.map((s, i) => (
                        <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                            <td className={tableCell + " font-bold text-center"}>{s.sn}</td>
                            <td className={tableCell + " font-semibold text-slate-600"}>{s.detail}</td>
                            <td className={tableCell}><input className={tinp} value={s.name} onChange={e => upd21(i, "name", e.target.value)} /></td>
                            <td className={tableCell}><input className={tinp} value={s.streamOrder} onChange={e => upd21(i, "streamOrder", e.target.value)} /></td>
                            <td className={tableCell}>
                                <div className="flex gap-1">
                                    {["dd", "mm", "ss"].map(p => {
                                        const err = validateCoord("lat", p, s.startPoint.lat[p]);
                                        return (
                                            <div key={p} className="flex flex-col">
                                                <input className={`${tinp} w-8 text-center px-1 ${err ? 'border-red-400 bg-red-50' : ''}`} value={s.startPoint.lat[p]} onChange={e => updCoord21(i, "startPoint", "lat", p, e.target.value)} placeholder={p.toUpperCase()} maxLength={2} />
                                                {err && <span className="text-[8px] text-red-500 leading-tight mt-0.5">{err}</span>}
                                            </div>
                                        );
                                    })}
                                </div>
                            </td>
                            <td className={tableCell}>
                                <div className="flex gap-1">
                                    {["dd", "mm", "ss"].map(p => {
                                        const err = validateCoord("lng", p, s.startPoint.lng[p]);
                                        return (
                                            <div key={p} className="flex flex-col">
                                                <input className={`${tinp} w-8 text-center px-1 ${err ? 'border-red-400 bg-red-50' : ''}`} value={s.startPoint.lng[p]} onChange={e => updCoord21(i, "startPoint", "lng", p, e.target.value)} placeholder={p.toUpperCase()} maxLength={2} />
                                                {err && <span className="text-[8px] text-red-500 leading-tight mt-0.5">{err}</span>}
                                            </div>
                                        );
                                    })}
                                </div>
                            </td>
                            <td className={tableCell}>
                                <div className="flex gap-1">
                                    {["dd", "mm", "ss"].map(p => {
                                        const err = validateCoord("lat", p, s.endPoint.lat[p]);
                                        return (
                                            <div key={p} className="flex flex-col">
                                                <input className={`${tinp} w-8 text-center px-1 ${err ? 'border-red-400 bg-red-50' : ''}`} value={s.endPoint.lat[p]} onChange={e => updCoord21(i, "endPoint", "lat", p, e.target.value)} placeholder={p.toUpperCase()} maxLength={2} />
                                                {err && <span className="text-[8px] text-red-500 leading-tight mt-0.5">{err}</span>}
                                            </div>
                                        );
                                    })}
                                </div>
                            </td>
                            <td className={tableCell}>
                                <div className="flex gap-1">
                                    {["dd", "mm", "ss"].map(p => {
                                        const err = validateCoord("lng", p, s.endPoint.lng[p]);
                                        return (
                                            <div key={p} className="flex flex-col">
                                                <input className={`${tinp} w-8 text-center px-1 ${err ? 'border-red-400 bg-red-50' : ''}`} value={s.endPoint.lng[p]} onChange={e => updCoord21(i, "endPoint", "lng", p, e.target.value)} placeholder={p.toUpperCase()} maxLength={2} />
                                                {err && <span className="text-[8px] text-red-500 leading-tight mt-0.5">{err}</span>}
                                            </div>
                                        );
                                    })}
                                </div>
                            </td>
                            <td className={tableCell}><input className={tinp + " w-16"} type="number" value={s.lengthKm} onChange={e => upd21(i, "lengthKm", e.target.value)} /></td>
                            <td className={tableCell}><input className={tinp + " w-16"} type="number" value={s.altitudeMtr} onChange={e => upd21(i, "altitudeMtr", e.target.value)} /></td>
                            <td className={tableCell + " text-center"}>
                                {i > 0 && (
                                    <button type="button" onClick={() => removeTributary(i)} className="p-1.5 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition-colors" title="Remove tributary">
                                        🗑️
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr><td colSpan={11} className="px-4 py-3">
                        <button type="button" onClick={addTributary} className="text-sm px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-semibold shadow-md shadow-blue-100 transition-all">+ Add New Tributary</button>
                    </td></tr>
                </tfoot>
            </TableWrapper>

            <TableWrapper title="Table 2.2 — Detail of Stream discharge of identified Stream Stretch">
                <thead>
                    <tr>
                        <th rowSpan={2} className={tableHead}>S.N.</th>
                        <th rowSpan={2} className={tableHead}>Detail of Main Stream/ Tributaries</th>
                        <th rowSpan={2} className={tableHead}>Name</th>
                        <th rowSpan={2} className={tableHead}>Stream Order</th>
                        <th rowSpan={2} className={tableHead}>Stream/Tributaries Nature</th>
                        <th rowSpan={2} className={tableHead}>If Seasonal<br />(No. of Months)</th>
                        <th colSpan={2} className={tableHead + " border-b border-blue-600/50 text-center"}>Discharge in Lean Season (LPM)</th>
                        <th rowSpan={2} className={tableHead}>Decrease in Discharge in last 15 Years (%)</th>
                    </tr>
                    <tr>
                        <th className={tableHead + " text-center"}>Dec-Jan</th>
                        <th className={tableHead + " text-center"}>May-June</th>
                    </tr>
                </thead>
                <tbody>
                    {data.table22.map((row, i) => (
                        <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                            <td className={tableCell + " font-bold text-center"}>{i + 1}</td>
                            <td className={tableCell + " font-semibold text-slate-600"}>{row.detail}</td>
                            <td className={tableCell}><span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-lg border border-blue-200">{row.name || "—"}</span></td>
                            <td className={tableCell}><span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-lg border border-blue-200">{row.streamOrder || "—"}</span></td>
                            <td className={tableCell}>
                                <select className={tsel + " w-full"} value={row.streamNature} onChange={e => upd22(i, "streamNature", e.target.value)}>
                                    <option value="">— Select —</option>
                                    <option value="Perennial">Perennial (1)</option>
                                    <option value="Seasonal">Seasonal (2)</option>
                                    <option value="Dried">Dried (3)</option>
                                </select>
                            </td>
                            <td className={tableCell}><input className={tinp + " w-full"} type="number" value={row.ifSeasonalMonths} onChange={e => upd22(i, "ifSeasonalMonths", e.target.value)} placeholder="No." /></td>
                            <td className={tableCell}><input className={tinp + " w-full"} type="number" value={row.dischargeDecJanLPM} onChange={e => upd22(i, "dischargeDecJanLPM", e.target.value)} /></td>
                            <td className={tableCell}><input className={tinp + " w-full"} type="number" value={row.dischargeMayJuneLPM} onChange={e => upd22(i, "dischargeMayJuneLPM", e.target.value)} /></td>
                            <td className={tableCell}><input className={tinp + " w-full"} type="number" value={row.decreaseInDischarge15YrsPercent} onChange={e => upd22(i, "decreaseInDischarge15YrsPercent", e.target.value)} /></td>
                        </tr>
                    ))}
                </tbody>
            </TableWrapper>

            <TableWrapper title="Table 2.3 — Detail of Water usage of identified Stream Stretch">
                <thead>
                    <tr>
                        <th className={tableHead}>S.N.</th>
                        <th className={tableHead}>Detail of Main Stream/ Tributaries</th>
                        <th className={tableHead}>Name</th>
                        <th className={tableHead}>Stream Order</th>
                        <th className={tableHead}>Use of available water</th>
                        <th className={tableHead}>No. of schemes</th>
                        <th className={tableHead}>No. of benefited population</th>
                        <th className={tableHead}>In case of water used for irrigation-net command area (in Ha.)</th>
                    </tr>
                </thead>
                <tbody>
                    {data.table23.map((row, i) => (
                        <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                            <td className={tableCell + " font-bold text-center"}>{i + 1}</td>
                            <td className={tableCell + " font-semibold text-slate-600"}>{row.detail}</td>
                            <td className={tableCell}><span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-lg border border-blue-200">{row.name || "—"}</span></td>
                            <td className={tableCell}><span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-lg border border-blue-200">{row.streamOrder || "—"}</span></td>
                            <td className={tableCell}>
                                <select className={tsel + " w-full"} value={row.waterUse} onChange={e => upd23(i, "waterUse", e.target.value)}>
                                    <option value="">— Select —</option>
                                    <option value="Drinking Water">Drinking Water (1)</option>
                                    <option value="Lifting Scheme for Drinking Water">Lifting Scheme (Drinking) (2)</option>
                                    <option value="Irrigation Scheme">Irrigation Scheme (3)</option>
                                    <option value="Lift Irrigation Scheme">Lift Irrigation Scheme (4)</option>
                                    <option value="Other">Other (5)</option>
                                    <option value="None">None (6)</option>
                                </select>
                            </td>
                            <td className={tableCell}><input className={tinp + " w-full"} type="number" value={row.noOfSchemes} onChange={e => upd23(i, "noOfSchemes", e.target.value)} /></td>
                            <td className={tableCell}><input className={tinp + " w-full"} type="number" value={row.benefitedPopulation} onChange={e => upd23(i, "benefitedPopulation", e.target.value)} /></td>
                            <td className={tableCell}><input className={tinp + " w-full"} type="number" value={row.irrigationCommandAreaHa} onChange={e => upd23(i, "irrigationCommandAreaHa", e.target.value)} /></td>
                        </tr>
                    ))}
                </tbody>
            </TableWrapper>

        </div>
    );
}

function Section3({ data, setData, table21 }) {
    const syncRows = (source, target, mapper) => source.map(s => mapper(s, target.find(t => t.detail === s.detail) || {}));

    useEffect(() => {
        setData(d => ({
            ...d,
            table31: syncRows(table21, d.table31, (s, e) => ({ ...e, detail: s.detail, name: s.name, streamOrder: s.streamOrder, catchmentAreaHa: e.catchmentAreaHa || "", landCoverPercent: e.landCoverPercent || { agriculture: "", reserveForest: "", vanPanchayat: "", pastureNonForest: "", settlement: "" } })),
            table32: syncRows(table21, d.table32, (s, e) => ({ ...e, detail: s.detail, name: s.name, streamOrder: s.streamOrder, catchmentTreatmentDoneLast3Yrs: e.catchmentTreatmentDoneLast3Yrs || "", permanentFunctionalStructure: e.permanentFunctionalStructure || "" }))
        }));
    }, [table21]);

    const upd31 = (i, k, v) => setData(d => ({ ...d, table31: d.table31.map((r, idx) => idx === i ? { ...r, [k]: v } : r) }));
    const upd31LC = (i, k, v) => setData(d => ({ ...d, table31: d.table31.map((r, idx) => idx === i ? { ...r, landCoverPercent: { ...r.landCoverPercent, [k]: v } } : r) }));
    const upd32 = (i, k, v) => setData(d => ({ ...d, table32: d.table32.map((r, idx) => idx === i ? { ...r, [k]: v } : r) }));

    const getSum = (lc) => (Number(lc.agriculture) || 0) + (Number(lc.reserveForest) || 0) + (Number(lc.vanPanchayat) || 0) + (Number(lc.pastureNonForest) || 0) + (Number(lc.settlement) || 0);

    const handleFile = (file) => {
        if (!file) return;
        const reader = new FileReader();
        reader.onload = e => setData(d => ({ ...d, attachLandCoverMapPreview: e.target.result, attachLandCoverMapFile: file }));
        reader.readAsDataURL(file);
    };

    return (
        <div className="space-y-6">
            <div className={secHead}>
                <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-xl">🏔️</div>
                <div><p className={secTitle}>Physical Description of Stream Catchment Area</p><p className="text-sm text-slate-400">Section 3 of 8</p></div>
            </div>

            <TableWrapper title="Table 3.1 — Details of Stream catchment area">
                <thead>
                    <tr>
                        <th rowSpan={2} className={tableHead}>S.N.</th>
                        <th rowSpan={2} className={tableHead}>Detail of Main Stream/ Tributaries</th>
                        <th rowSpan={2} className={tableHead}>Name</th>
                        <th rowSpan={2} className={tableHead}>Stream Order</th>
                        <th rowSpan={2} className={tableHead}>Catchment area (in Ha.)</th>
                        <th colSpan={5} className={tableHead + " border-b border-blue-600/50 text-center"}>Land cover of catchment area (in %)*</th>
                        <th rowSpan={2} className={tableHead}>Total %</th>
                    </tr>
                    <tr>
                        <th className={tableHead + " text-center"}>Agriculture</th>
                        <th className={tableHead + " text-center"}>Reserve Forest</th>
                        <th className={tableHead + " text-center"}>Van Panchayat</th>
                        <th className={tableHead + " text-center text-[10px]"}>Pasture in non-forest / village Land</th>
                        <th className={tableHead + " text-center"}>Settlement</th>
                    </tr>
                </thead>
                <tbody>
                    {data.table31.map((row, i) => {
                        const sum = getSum(row.landCoverPercent);
                        const valid = sum === 100;
                        return (
                            <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                                <td className={tableCell + " font-bold text-center"}>{i + 1}</td>
                                <td className={tableCell + " font-semibold text-slate-600"}>{row.detail}</td>
                                <td className={tableCell}><span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-lg border border-blue-200">{row.name || "—"}</span></td>
                                <td className={tableCell}><span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-lg border border-blue-200">{row.streamOrder || "—"}</span></td>
                                <td className={tableCell}><input className={tinp + " w-full"} type="number" value={row.catchmentAreaHa} onChange={e => upd31(i, "catchmentAreaHa", e.target.value)} /></td>
                                <td className={tableCell}><input className={tinp + " w-full"} type="number" value={row.landCoverPercent.agriculture} onChange={e => upd31LC(i, "agriculture", e.target.value)} /></td>
                                <td className={tableCell}><input className={tinp + " w-full"} type="number" value={row.landCoverPercent.reserveForest} onChange={e => upd31LC(i, "reserveForest", e.target.value)} /></td>
                                <td className={tableCell}><input className={tinp + " w-full"} type="number" value={row.landCoverPercent.vanPanchayat} onChange={e => upd31LC(i, "vanPanchayat", e.target.value)} /></td>
                                <td className={tableCell}><input className={tinp + " w-full"} type="number" value={row.landCoverPercent.pastureNonForest} onChange={e => upd31LC(i, "pastureNonForest", e.target.value)} /></td>
                                <td className={tableCell}><input className={tinp + " w-full"} type="number" value={row.landCoverPercent.settlement} onChange={e => upd31LC(i, "settlement", e.target.value)} /></td>
                                <td className={tableCell}>
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${valid ? 'bg-green-100 text-green-700' : sum > 0 ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-500'}`} title="Must sum to 100%">{sum}%</span>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </TableWrapper>

            <div className="mb-6 p-4 border border-slate-200 rounded-xl bg-slate-50 flex items-center justify-between">
                <div>
                    <label className={lbl}>Attach Land Cover Map of stream catchment areas</label>
                    <input type="file" onChange={e => handleFile(e.target.files[0])} className="text-sm file:mr-3 file:py-1.5 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700" />
                </div>
                {data.attachLandCoverMapPreview && <span className="text-green-600 font-bold text-sm">File Selected ✓</span>}
            </div>

            <TableWrapper title="Table 3.2 — Catchment treatment activities details">
                <thead>
                    <tr>
                        <th className={tableHead}>S.N.</th>
                        <th className={tableHead}>Detail of Main Stream/ Tributaries</th>
                        <th className={tableHead}>Name</th>
                        <th className={tableHead}>Stream Order</th>
                        <th className={tableHead}>Whether there is any catchment treatment activities* done in the identified stream stretch in last 3 years? (Yes-1, No-2)</th>
                        <th className={tableHead}>Any permanent functional structure on Stream/ Tributaries? (Yes-1, No-2)</th>
                    </tr>
                </thead>
                <tbody>
                    {data.table32.map((row, i) => (
                        <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                            <td className={tableCell + " font-bold text-center"}>{i + 1}</td>
                            <td className={tableCell + " font-semibold text-slate-600"}>{row.detail}</td>
                            <td className={tableCell}><span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-lg border border-blue-200">{row.name || "—"}</span></td>
                            <td className={tableCell}><span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-lg border border-blue-200">{row.streamOrder || "—"}</span></td>
                            <td className={tableCell}>
                                <select className={tsel + " w-full"} value={row.catchmentTreatmentDoneLast3Yrs} onChange={e => upd32(i, "catchmentTreatmentDoneLast3Yrs", e.target.value)}>
                                    <option value="">— Select —</option>
                                    <option value="true">Yes (1)</option>
                                    <option value="false">No (2)</option>
                                </select>
                            </td>
                            <td className={tableCell}>
                                <select className={tsel + " w-full"} value={row.permanentFunctionalStructure} onChange={e => upd32(i, "permanentFunctionalStructure", e.target.value)}>
                                    <option value="">— Select —</option>
                                    <option value="true">Yes (1)</option>
                                    <option value="false">No (2)</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </TableWrapper>

        </div>
    );
}

function Section4({ data, setData }) {
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
                <div><p className={secTitle}>Capture photographs for additional details</p><p className="text-sm text-slate-400">Section 4 of 8</p></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 border-2 border-dashed border-slate-200 rounded-2xl text-center">
                    <p className={lbl}>(a) Wide angle photograph of main stream</p>
                    <input type="file" onChange={e => handleFile("mainStreamPhoto", e.target.files[0])} className="mt-2 text-sm file:mr-3 file:py-1.5 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700" />
                    {data.mainStreamPhotoPreview && <img src={data.mainStreamPhotoPreview} className="mt-4 rounded-xl w-full h-40 object-cover border" />}
                </div>
                <div className="p-4 border-2 border-dashed border-slate-200 rounded-2xl text-center">
                    <p className={lbl}>(b) Wide angle photograph of Tributaries at confluence point</p>
                    <input type="file" onChange={e => handleFile("tributariesConfluencePhoto", e.target.files[0])} className="mt-2 text-sm file:mr-3 file:py-1.5 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700" />
                    {data.tributariesConfluencePhotoPreview && <img src={data.tributariesConfluencePhotoPreview} className="mt-4 rounded-xl w-full h-4 0 object-cover border" />}
                </div>
            </div>
        </div>
    );
}

function Section5({ data, setData, table21 }) {
    const syncRows = (source, target, mapper) => source.map(s => mapper(s, target.find(t => t.detail === s.detail) || {}));
    useEffect(() => {
        setData(d => ({
            ...d,
            table51: syncRows(table21, d.table51, (s, e) => ({ ...e, detail: s.detail, name: s.name, streamOrder: s.streamOrder, rechargeAreaDemarcated: e.rechargeAreaDemarcated || "", totalRechargeAreaHa: e.totalRechargeAreaHa || "", forestLandHa: e.forestLandHa || "", revenueLandHa: e.revenueLandHa || "", privateLandHa: e.privateLandHa || "" }))
        }));
    }, [table21]);

    const upd51 = (i, k, v) => setData(d => ({ ...d, table51: d.table51.map((r, idx) => idx === i ? { ...r, [k]: v } : r) }));

    return (
        <div className="space-y-6">
            <div className={secHead}>
                <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-xl">🗺️</div>
                <div><p className={secTitle}>Identification of Recharge Areas</p><p className="text-sm text-slate-400">Section 5 of 8</p></div>
            </div>

            <TableWrapper title="Table 5.1 — Location of Recharge Area">
                <thead>
                    <tr>
                        <th rowSpan={2} className={tableHead}>S.N.</th>
                        <th rowSpan={2} className={tableHead}>Detail of Main Stream/ Tributaries</th>
                        <th rowSpan={2} className={tableHead}>Name</th>
                        <th rowSpan={2} className={tableHead}>Stream Order</th>
                        <th rowSpan={2} className={tableHead}>Whether the recharge area of stream have been demarcated? (Yes/ No)</th>
                        <th rowSpan={2} className={tableHead}>Total Recharge area (in Ha.)</th>
                        <th colSpan={3} className={tableHead + " border-b border-blue-600/50 text-center"}>Location of Recharge Area (in Ha.)</th>
                    </tr>
                    <tr>
                        <th className={tableHead + " text-center"}>Forest Land</th>
                        <th className={tableHead + " text-center"}>Revenue Land</th>
                        <th className={tableHead + " text-center"}>Private Land</th>
                    </tr>
                </thead>
                <tbody>
                    {data.table51.map((row, i) => {
                        const total = (Number(row.forestLandHa) || 0) + (Number(row.revenueLandHa) || 0) + (Number(row.privateLandHa) || 0);
                        return (
                            <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                                <td className={tableCell + " font-bold text-center"}>{i + 1}</td>
                                <td className={tableCell + " font-semibold text-slate-600"}>{row.detail}</td>
                                <td className={tableCell}><span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-lg border border-blue-200">{row.name || "—"}</span></td>
                                <td className={tableCell}><span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-lg border border-blue-200">{row.streamOrder || "—"}</span></td>
                                <td className={tableCell}>
                                    <select className={tsel + " w-full"} value={row.rechargeAreaDemarcated} onChange={e => upd51(i, "rechargeAreaDemarcated", e.target.value)}>
                                        <option value="">— Select —</option>
                                        <option value="true">Yes</option>
                                        <option value="false">No</option>
                                    </select>
                                </td>
                                <td className={tableCell}><input className={tinp + " w-full font-bold text-blue-600"} type="number" value={row.totalRechargeAreaHa || total} onChange={e => upd51(i, "totalRechargeAreaHa", e.target.value)} /></td>
                                <td className={tableCell}><input className={tinp + " w-full"} type="number" value={row.forestLandHa} onChange={e => upd51(i, "forestLandHa", e.target.value)} /></td>
                                <td className={tableCell}><input className={tinp + " w-full"} type="number" value={row.revenueLandHa} onChange={e => upd51(i, "revenueLandHa", e.target.value)} /></td>
                                <td className={tableCell}><input className={tinp + " w-full"} type="number" value={row.privateLandHa} onChange={e => upd51(i, "privateLandHa", e.target.value)} /></td>
                            </tr>
                        );
                    })}
                </tbody>
            </TableWrapper>

        </div>
    );
}

function Section6({ data, setData }) {
    const handleFile = (file) => {
        if (!file) return;
        const reader = new FileReader();
        reader.onload = e => setData(d => ({ ...d, geoCoordinatesFilePreview: e.target.result, geoCoordinatesFileFile: file }));
        reader.readAsDataURL(file);
    };
    return (
        <div className="space-y-6">
            <div className={secHead}>
                <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-xl">🗺️</div>
                <div><p className={secTitle}>Maps of Identified Recharge Areas</p><p className="text-sm text-slate-400">Section 6 of 8</p></div>
            </div>
            <InfoBadge text="Upload KML file showing identified recharge areas for main stream and all tributaries with geo coordinates" />

            <div className="mt-4">
                <label className={lbl}>Map description / notes</label>
                <textarea className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl bg-white focus:outline-none focus:border-blue-400" rows={4} value={data.mapDescription || ""} onChange={e => setData(d => ({ ...d, mapDescription: e.target.value }))} placeholder="Describe the geo-mapped recharge areas for main stream and tributaries"></textarea>
            </div>

            <div className="mb-8 p-4 border border-slate-200 rounded-xl">
                <label className={lbl}>Upload geo-coordinates file (KML/KMZ)</label>
                <input type="file" accept=".kml,.kmz" onChange={e => handleFile(e.target.files[0])} className="text-sm file:mr-3 file:py-1.5 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 mt-2" />
                {data.geoCoordinatesFilePreview && <span className="ml-4 text-sm text-green-600 font-semibold">File Selected ✓</span>}
            </div>
        </div>
    );
}

function Section7({ data, setData, table21 }) {
    const upd = k => v => setData(d => ({ ...d, [k]: v }));
    const updResp = k => v => setData(d => ({ ...d, responsibleOfficer: { ...d.responsibleOfficer, [k]: v } }));
    const upd71 = k => v => setData(d => ({ ...d, table71: { ...d.table71, [k]: v } }));
    const upd73 = k => v => setData(d => ({ ...d, table73: { ...d.table73, [k]: v } }));
    const upd74 = k => v => setData(d => ({ ...d, table74: { ...d.table74, [k]: v } }));

    useEffect(() => {
        setData(d => {
            const updatedTable72 = STREAM_ACTIVITIES.map(a => {
                const existing = d.table72.find(t => t.activityId === a.id);
                const updatedTargets = table21.map(s => {
                    const prevTarget = existing?.streamTargets?.find(st => st.streamDetail === s.detail);
                    return { streamDetail: s.detail, target: prevTarget?.target || "" };
                });

                return {
                    activityId: a.id,
                    activityLabel: a.label,
                    isHeader: a.isHeader || false,
                    unit: a.unit || "",
                    streamTargets: updatedTargets,
                    financialAmountLakh: existing?.financialAmountLakh || "",
                    totalPhysicalTarget: updatedTargets.reduce((sum, t) => sum + (Number(t.target) || 0), 0)
                };
            });
            return { ...d, table72: updatedTable72 };
        });
    }, [table21.map(s => s.detail).join(',')]);

    useEffect(() => {
        const dprFin = Number(data.table72.find(r => r.activityId === '1')?.financialAmountLakh) || 0;
        const monFin = Number(data.table72.find(r => r.activityId === '3')?.financialAmountLakh) || 0;
        const interventionsFin = data.table72.reduce((sum, r) => (r.activityId !== '1' && r.activityId !== '3' && !r.isHeader) ? sum + (Number(r.financialAmountLakh) || 0) : sum, 0);
        const total = dprFin + monFin + interventionsFin;

        const currentTotal = Number(data.table71.totalBudgetLakh) || 0;
        const fundA = Number(data.table74.fundFromPIADeptLakh) || 0;
        const fundB = Number(data.table74.fundFromOtherSourcesLakh) || 0;
        const fundC = Number(data.table74.fundFromSARRAConvergenceLakh) || 0;
        const grandTotal = fundA + fundB + fundC;

        if (total !== currentTotal || grandTotal !== Number(data.table74.grandTotalLakh)) {
            setData(d => ({
                ...d,
                table71: { ...d.table71, dprPreparationBudgetLakh: dprFin, monitoringEvaluationBudgetLakh: monFin, totalInterventionsCostLakh: interventionsFin, totalBudgetLakh: total },
                table73: { ...d.table73, totalProjectCostLakh: total, waterRechargePercentage: total > 0 ? (((Number(d.table73.waterRechargeBudgetLakh) || 0) / total) * 100).toFixed(2) : 0 },
                table74: { ...d.table74, totalFinancialAmountLakh: total, grandTotalLakh: grandTotal }
            }));
        }
    }, [data.table72, data.table73.waterRechargeBudgetLakh, data.table74.fundFromPIADeptLakh, data.table74.fundFromOtherSourcesLakh, data.table74.fundFromSARRAConvergenceLakh]);

    const upd72Target = (actIdx, streamDetail, val) => setData(d => ({
        ...d, table72: d.table72.map((r, i) => i === actIdx ? { ...r, streamTargets: r.streamTargets.map(st => st.streamDetail === streamDetail ? { ...st, target: val } : st) } : r)
    }));
    const upd72Fin = (actIdx, val) => setData(d => ({ ...d, table72: d.table72.map((r, i) => i === actIdx ? { ...r, financialAmountLakh: val } : r) }));

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

    const totalCostLakh = (Number(data.table71.dprPreparationBudgetLakh) || 0) + (Number(data.table71.totalInterventionsCostLakh) || 0) + (Number(data.table71.monitoringEvaluationBudgetLakh) || 0);
    const rechargePct = totalCostLakh > 0 ? (((Number(data.table73.waterRechargeBudgetLakh) || 0) / totalCostLakh) * 100).toFixed(2) : 0;
    const grandTotal = (Number(data.table74.fundFromPIADeptLakh) || 0) + (Number(data.table74.fundFromOtherSourcesLakh) || 0) + (Number(data.table74.fundFromSARRAConvergenceLakh) || 0);

    return (
        <div className="space-y-6">
            <div className={secHead}>
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-xl">💰</div>
                <div><p className={secTitle}>Summary of Proposed Stream Rejuvenation Plan</p><p className="text-sm text-slate-400">Section 7 of 8</p></div>
            </div>

            <h3 className="font-bold text-slate-700 mt-6 mb-2">Responsible Officer Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <FloatInput label="Department" value={data.responsibleOfficer.department} onChange={updResp("department")} />
                <FloatInput label="District" value={data.responsibleOfficer.district} onChange={updResp("district")} />
                <FloatInput label="Block" value={data.responsibleOfficer.block} onChange={updResp("block")} />
                <FloatInput label="Gram Panchayat" value={data.responsibleOfficer.gramPanchayat} onChange={updResp("gramPanchayat")} />
                <FloatInput label="Nodal Officer Name" value={data.responsibleOfficer.nodalOfficerName} onChange={updResp("nodalOfficerName")} />
                <FloatInput label="Designation" value={data.responsibleOfficer.designation} onChange={updResp("designation")} />
                <FloatInput label="Contact No" value={data.responsibleOfficer.contactNo} onChange={updResp("contactNo")} />
                <FloatInput label="Email" value={data.responsibleOfficer.email} onChange={updResp("email")} />
            </div>

            <TableWrapper title="Table 7.1 — Budget Allocation">
                <thead><tr>{["Budget Component", "Amount (Rs. in Lakh)"].map(h => <th key={h} className={tableHead}>{h}</th>)}</tr></thead>
                <tbody>
                    <tr className="bg-white"><td className={tableCell}>1. DPR Preparation (1-2%)</td><td className={tableCell}><input className={tinp + " w-40"} type="number" value={data.table71.dprPreparationBudgetLakh} onChange={e => upd71("dprPreparationBudgetLakh")(e.target.value)} /></td></tr>
                    <tr className="bg-slate-50"><td className={tableCell}>2. Interventions/Activities Cost</td><td className={tableCell}><input className={tinp + " w-40"} type="number" value={data.table71.totalInterventionsCostLakh} onChange={e => upd71("totalInterventionsCostLakh")(e.target.value)} /></td></tr>
                    <tr className="bg-white"><td className={tableCell}>3. Monitoring & Evaluation (2%)</td><td className={tableCell}><input className={tinp + " w-40"} type="number" value={data.table71.monitoringEvaluationBudgetLakh} onChange={e => upd71("monitoringEvaluationBudgetLakh")(e.target.value)} /></td></tr>
                    <tr className="bg-blue-50 font-bold"><td className={tableCell}>Total</td><td className={tableCell}><span className="px-2">{totalCostLakh.toFixed(2)}</span></td></tr>
                </tbody>
            </TableWrapper>

            <div className="mt-8 mb-4">
                <h2 className="text-xl font-bold text-slate-800 border-b-2 border-blue-600 pb-1 inline-block">Table No. 7.2</h2>
                <p className="text-sm text-slate-600 mt-2 font-medium italic">Please fill the information (Year-wise) as mentioned in DPR-</p>
            </div>

            <TableWrapper title="Details of Physical & Financial Plan (Activity-wise)">
                <thead>
                    <tr>
                        <th rowSpan={2} className={tableHead}>S.N.</th>
                        <th rowSpan={2} className={tableHead}>Name of Activity</th>
                        <th rowSpan={2} className={tableHead}>Unit</th>
                        <th colSpan={table21.length} className={tableHead + " border-b border-blue-600/50"}>Physical Target in identified recharge zone *</th>
                        <th rowSpan={2} className={tableHead}>Total of physical targets</th>
                        <th rowSpan={2} className={tableHead}>Financial Amount</th>
                    </tr>
                    <tr>
                        {table21.map((s, i) => (
                            <th key={i} className={tableHead}>{s.detail}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.table72.map((row, i) => {
                        const total = row.streamTargets.reduce((sum, t) => sum + (Number(t.target) || 0), 0);
                        const isSpecial = row.activityId === '1' || row.activityId === '3';

                        if (row.isHeader) {
                            return (
                                <tr key={i} className="bg-slate-100 font-bold border-y border-slate-200">
                                    <td className={tableCell + " text-center"}>{row.activityId}</td>
                                    <td colSpan={table21.length + 4} className={tableCell}>{row.activityLabel}</td>
                                </tr>
                            );
                        }
                        return (
                            <tr key={i} className={`${i % 2 === 0 ? "bg-white" : "bg-slate-50/50"} ${isSpecial ? "font-bold bg-blue-50/30" : ""}`}>
                                <td className={tableCell + " text-center text-xs"}>{row.activityId}</td>
                                <td className={tableCell + (isSpecial ? " text-blue-900" : " font-medium text-slate-700")}>{row.activityLabel}</td>
                                <td className={tableCell + " text-xs"}>{row.unit}</td>
                                {row.streamTargets.map((st, j) => (
                                    <td key={j} className={tableCell}>
                                        {!isSpecial && <input className={tinp + " w-16"} type="number" value={st.target} onChange={e => upd72Target(i, st.streamDetail, e.target.value)} />}
                                    </td>
                                ))}
                                <td className={tableCell + " font-bold text-blue-700 text-center"}>{!isSpecial ? total : ""}</td>
                                <td className={tableCell}><input className={tinp + " w-24"} type="number" value={row.financialAmountLakh} onChange={e => upd72Fin(i, e.target.value)} /></td>
                            </tr>
                        );
                    })}
                    <tr className="bg-blue-50 font-bold border-t-2 border-blue-200">
                        <td className={tableCell}></td>
                        <td className={tableCell + " text-center"}>Total</td>
                        <td className={tableCell}></td>
                        {table21.map((_, i) => <td key={i} className={tableCell}></td>)}
                        <td className={tableCell}></td>
                        <td className={tableCell + " text-blue-700 text-center"}><span className="px-2">₹{data.table72.reduce((sum, r) => sum + (Number(r.financialAmountLakh) || 0), 0).toFixed(2)}L</span></td>
                    </tr>
                </tbody>
            </TableWrapper>

            <TableWrapper title="Table 7.3 — Water Recharge Provision">
                <thead><tr>{["Total Project Cost (₹L)", "Budget for Water Recharge (₹L)", "Percentage (not less than 10%)"].map(h => <th key={h} className={tableHead}>{h}</th>)}</tr></thead>
                <tbody>
                    <tr className="bg-white">
                        <td className={tableCell}><span className="px-2 font-bold">{totalCostLakh.toFixed(2)}</span></td>
                        <td className={tableCell}><input className={tinp + " w-40"} type="number" value={data.table73.waterRechargeBudgetLakh} onChange={e => upd73("waterRechargeBudgetLakh")(e.target.value)} /></td>
                        <td className={tableCell}>
                            <div className="flex items-center gap-2">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${rechargePct >= 10 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{rechargePct}%</span>
                                {rechargePct < 10 && <span className="text-[10px] text-red-500 font-bold uppercase tracking-tighter">Min 10% Required</span>}
                            </div>
                        </td>
                    </tr>
                </tbody>
            </TableWrapper>
            {rechargePct < 10 && <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-700 text-sm font-semibold mb-6">⚠ Water recharge provision must be at least 10% of total project cost as per SARRA guidelines</div>}

            <TableWrapper title="Table 7.4 — Financial Convergence">
                <thead><tr>{["Total Required (₹L)", "PIA Dept Fund (A)", "Other Sources (B)", "SARRA Fund (C)", "Grand Total (A+B+C)"].map(h => <th key={h} className={tableHead}>{h}</th>)}</tr></thead>
                <tbody>
                    <tr className="bg-white">
                        <td className={tableCell}><span className="px-2 font-bold">{totalCostLakh.toFixed(2)}</span></td>
                        <td className={tableCell}><input className={tinp + " w-32"} type="number" value={data.table74.fundFromPIADeptLakh} onChange={e => upd74("fundFromPIADeptLakh")(e.target.value)} /></td>
                        <td className={tableCell}><input className={tinp + " w-32"} type="number" value={data.table74.fundFromOtherSourcesLakh} onChange={e => upd74("fundFromOtherSourcesLakh")(e.target.value)} /></td>
                        <td className={tableCell}><input className={tinp + " w-32"} type="number" value={data.table74.fundFromSARRAConvergenceLakh} onChange={e => upd74("fundFromSARRAConvergenceLakh")(e.target.value)} /></td>
                        <td className={tableCell}><span className="px-2 font-bold text-blue-700">{grandTotal.toFixed(2)}</span></td>
                    </tr>
                </tbody>
            </TableWrapper>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-slate-200 p-4 rounded-xl">
                    <label className={lbl}>Detail Project Report (DPR)</label>
                    <input type="file" onChange={e => handleFile("detailProjectReport", e.target.files[0])} className="text-sm mt-2" />
                    {data.annexures.detailProjectReportPreview && <div className="text-green-600 text-xs mt-1">Uploaded</div>}
                </div>
                <div className="border border-slate-200 p-4 rounded-xl">
                    <label className={lbl}>Any other relevant documents</label>
                    <input type="file" onChange={e => handleFile("otherDocuments", e.target.files[0])} className="text-sm mt-2" />
                    {data.annexures.otherDocumentsPreview && <div className="text-green-600 text-xs mt-1">Uploaded</div>}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200 mt-6">
                <FloatInput label="Submission Date" type="date" value={data.submissionDate || ""} onChange={upd("submissionDate")} />
                <FloatInput label="Submitted By Name" value={data.submittedByName || ""} onChange={upd("submittedByName")} />
                <div>
                    <label className={lbl}>Signature with Stamp</label>
                    <input type="file" accept=".jpg,.jpeg" onChange={e => handleSigFile(e.target.files[0])} className="text-sm mt-2" />
                    {data.signaturePreview && <img src={data.signaturePreview} className="h-10 mt-2 border border-slate-200 bg-white" />}
                </div>
            </div>
        </div>
    );
}

function Section8({ data, setData }) {
    const handleFile = (file) => {
        if (!file) return;
        const reader = new FileReader();
        reader.onload = e => setData(d => ({ ...d, geoLocationFilePreview: e.target.result, geoLocationFileFile: file }));
        reader.readAsDataURL(file);
    };
    return (
        <div className="space-y-6">
            <div className={secHead}>
                <div className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center text-xl">📍</div>
                <div><p className={secTitle}>Geo Location of Proposed Activities (Main stream and Tributaries)</p><p className="text-sm text-slate-400">Section 8 of 8</p></div>
            </div>
            <InfoBadge text="Provide the geo-coordinates and specific locations for all proposed interventions across the streamshed." />

            <div className="mt-4">
                <label className={lbl}>Geo Location of above Proposed Activities (main stream and tributaries):</label>
                <textarea className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl bg-white focus:outline-none focus:border-blue-400" rows={6} value={data.geoLocationDescription || ""} onChange={e => setData(d => ({ ...d, geoLocationDescription: e.target.value }))} placeholder="Enter detailed geo-location information here..."></textarea>
            </div>

            <div className="mb-8 p-4 border border-slate-200 rounded-xl">
                <label className={lbl}>Upload geo location file (KML/PDF)</label>
                <input type="file" accept=".kml,.kmz,.pdf" onChange={e => handleFile(e.target.files[0])} className="text-sm file:mr-3 file:py-1.5 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 mt-2" />
                {data.geoLocationFilePreview && <span className="ml-4 text-sm text-green-600 font-semibold">File Selected ✓</span>}
            </div>
        </div>
    );
}


// ─── MAIN FORM CONTAINER ──────────────────────────────────────────────────────
export default function StreamshedDPRForm() {
    const { user } = useAuth();
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDrafting, setIsDrafting] = useState(false);

    const [data1, setData1] = useState({ department: "", deptOther: "", district: "", block: "", address: "", nodalOfficer: "", contactNo: "", email: "" });
    const [data2, setData2] = useState({ streamName: "", streamOrder: "", district: "", blockTown: "", lengthOfStreamKm: "", subWatershedName: "", microWatershedName: "", noOfVillagesHabitation: "", villagesHabitationNames: "", table21: [{ sn: 1, detail: "Main Stream", name: "", streamOrder: "", startPoint: { lat: { dd: "", mm: "", ss: "" }, lng: { dd: "", mm: "", ss: "" } }, endPoint: { lat: { dd: "", mm: "", ss: "" }, lng: { dd: "", mm: "", ss: "" } }, lengthKm: "", altitudeMtr: "" }], table22: [], table23: [] });
    const [data3, setData3] = useState({ table31: [], table32: [], attachLandCoverMapFile: null, attachLandCoverMapPreview: null });
    const [data4, setData4] = useState({ mainStreamFile: null, mainStreamPreview: null, tributariesConfluenceFile: null, tributariesConfluencePreview: null });
    const [data5, setData5] = useState({ table51: [] });
    const [data6, setData6] = useState({ mapDescription: "", geoCoordinatesFileFile: null, geoCoordinatesFilePreview: null });
    const [data7, setData7] = useState({ responsibleOfficer: { department: "", district: "", block: "", gramPanchayat: "", nodalOfficerName: "", designation: "", contactNo: "", email: "" }, table71: { dprPreparationBudgetLakh: "", totalInterventionsCostLakh: "", monitoringEvaluationBudgetLakh: "", totalBudgetLakh: "" }, table72: [], table73: { totalProjectCostLakh: "", waterRechargeBudgetLakh: "", waterRechargePercentage: "" }, table74: { totalFinancialAmountLakh: "", fundFromPIADeptLakh: "", fundFromOtherSourcesLakh: "", fundFromSARRAConvergenceLakh: "", grandTotalLakh: "" }, annexures: { detailProjectReportFile: null, otherDocumentsFile: null }, submissionDate: "", submittedByName: "", signatureFile: null, signaturePreview: null });
    const [data8, setData8] = useState({ geoLocationDescription: "", geoLocationFileFile: null, geoLocationFilePreview: null });

    const handleStepChange = (newStep) => {
        setStep(newStep);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const buildPayload = () => {
        return {
            formType: 'STREAMSHED',
            section1_deptDetails: { ...data1 },
            section2_streamIdentification: { ...data2, table21: data2.table21.map(r => ({ ...r, startPoint: { latitude: r.startPoint.lat, longitude: r.startPoint.lng }, endPoint: { latitude: r.endPoint.lat, longitude: r.endPoint.lng } })) },
            section3_catchmentArea: { table31: data3.table31, table32: data3.table32 },
            section4_photographs: {},
            section5_rechargeAreas: { table51: data5.table51 },
            section6_maps: { mapDescription: data6.mapDescription },
            section7_budgetAndPlan: {
                responsibleOfficer: data7.responsibleOfficer,
                table71: data7.table71,
                table72: data7.table72.map(row => ({
                    ...row,
                    totalPhysicalTarget: row.streamTargets.reduce((acc, curr) => acc + (Number(curr.target) || 0), 0)
                })),
                table73: data7.table73,
                table74: data7.table74,
                submissionDate: data7.submissionDate,
                submittedByName: data7.submittedByName
            },
            section8_geoLocation: { geoLocationDescription: data8.geoLocationDescription }
        };
    };

    const submitForm = async () => {
        if (user.role === 'PIA_OFFICER' && data1.district && user.district && data1.district !== user.district) {
            toast.error(`Unauthorized: You can only submit DPRs for your assigned district (${user.district})`);
            return;
        }
        setIsSubmitting(true);
        try {
            const formData = new FormData();
            const payload = buildPayload();
            formData.append('jsonData', JSON.stringify(payload));

            // Append files
            if (data3.attachLandCoverMapFile) formData.append('attachLandCoverMap', data3.attachLandCoverMapFile);
            if (data4.mainStreamFile) formData.append('mainStreamPhoto', data4.mainStreamFile);
            if (data4.tributariesConfluenceFile) formData.append('tributariesConfluencePhoto', data4.tributariesConfluenceFile);
            if (data6.geoCoordinatesFileFile) formData.append('geoCoordinatesFile', data6.geoCoordinatesFileFile);
            if (data7.annexures.detailProjectReportFile) formData.append('detailProjectReport', data7.annexures.detailProjectReportFile);
            if (data7.annexures.otherDocumentsFile) formData.append('otherDocuments', data7.annexures.otherDocumentsFile);
            if (data7.signatureFile) formData.append('signatureWithStamp', data7.signatureFile);
            if (data8.geoLocationFileFile) formData.append('geoLocationFile', data8.geoLocationFileFile);

            const res = await axiosInstance.post('/dpr/streamshed/submit', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (res.data.success) {
                toast.success('Streamshed DPR Submitted Successfully!');
                router.push('/dashboard/officer/forms');
            }
        } catch (e) {
            toast.error(e.response?.data?.message || 'Error submitting form');
        } finally {
            setIsSubmitting(false);
        }
    };

    const saveDraft = async () => {
        setIsDrafting(true);
        try {
            const formData = new FormData();
            const payload = buildPayload();
            formData.append('jsonData', JSON.stringify(payload));

            // Append files
            if (data3.attachLandCoverMapFile) formData.append('attachLandCoverMap', data3.attachLandCoverMapFile);
            if (data4.mainStreamFile) formData.append('mainStreamPhoto', data4.mainStreamFile);
            if (data4.tributariesConfluenceFile) formData.append('tributariesConfluencePhoto', data4.tributariesConfluenceFile);
            if (data6.geoCoordinatesFileFile) formData.append('geoCoordinatesFile', data6.geoCoordinatesFileFile);
            if (data7.annexures.detailProjectReportFile) formData.append('detailProjectReport', data7.annexures.detailProjectReportFile);
            if (data7.annexures.otherDocumentsFile) formData.append('otherDocuments', data7.annexures.otherDocumentsFile);
            if (data7.signatureFile) formData.append('signatureWithStamp', data7.signatureFile);
            if (data8.geoLocationFileFile) formData.append('geoLocationFile', data8.geoLocationFileFile);

            await axiosInstance.post('/dpr/streamshed/draft', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            toast.success('Draft saved successfully');
        } catch (e) {
            toast.error('Failed to save draft');
        } finally {
            setIsDrafting(false);
        }
    };


    const curStreamNames = data2.table21.map(s => s.name).filter(Boolean);

    return (
        <div className="min-h-screen bg-slate-50/50 pb-20">
            <div className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-slate-200 shadow-sm">
                {curStreamNames.length > 0 && (
                    <div className="bg-blue-50/50 border-b border-slate-100 py-2">
                        <div className="max-w-[95%] lg:max-w-7xl mx-auto px-4 lg:px-8 flex items-center gap-2 overflow-x-auto no-scrollbar">
                            <span className="text-[10px] font-black text-blue-700 uppercase tracking-tighter shrink-0">Streams in this DPR:</span>
                            {curStreamNames.map((n, i) => (
                                <span key={i} className="shrink-0 bg-white border border-blue-100 text-blue-600 text-[11px] px-3 py-0.5 rounded-full font-bold shadow-sm">{n}</span>
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

            <div className="max-w-[98%] lg:max-w-7xl mx-auto px-4 lg:px-8 mt-5">
                <h1 className="text-2xl md:text-2xl font-black text-slate-800 leading-tight uppercase tracking-tight">Streamshed Development</h1>
                <p className="text-md md:text-lg font-bold text-cyan-600 uppercase tracking-widest">DPR Preparation Form</p>
            </div>
            <div className="max-w-[98%] lg:max-w-7xl mx-auto px-2 lg:px-4 mt-5">
                <div className={card + " p-2 md:p-4 shadow-2xl border-white ring-1 ring-slate-200/50"}>
                    <div className="p-1 md:p-3">
                        {step === 1 && <Section1 data={data1} setData={setData1} />}
                        {step === 2 && <Section2 data={data2} setData={setData2} sec1={data1} />}
                        {step === 3 && <Section3 data={data3} setData={setData3} table21={data2.table21} />}
                        {step === 4 && <Section4 data={data4} setData={setData4} />}
                        {step === 5 && <Section5 data={data5} setData={setData5} table21={data2.table21} />}
                        {step === 6 && <Section6 data={data6} setData={setData6} />}
                        {step === 7 && <Section7 data={data7} setData={setData7} table21={data2.table21} />}
                        {step === 8 && <Section8 data={data8} setData={setData8} />}
                    </div>

                    {/* Navigation Footer */}
                    <div className="mt-16 pt-8 border-t border-slate-100 flex justify-between items-center -mx-8 md:-mx-12 -mb-8 md:-mb-12 p-8 md:p-12 bg-slate-50/80 rounded-b-[40px]">
                        <div>
                            {step > 1 && (
                                <NavBtn onClick={() => handleStepChange(step - 1)} label="Previous" icon="←" />
                            )}
                        </div>

                        <div className="flex items-center gap-4">
                            <SaveDraftBtn onClick={saveDraft} />
                            {step < 8 ? (
                                <NavBtn primary onClick={() => handleStepChange(step + 1)} label="Save & Next" icon="→" />
                            ) : (
                                <button onClick={submitForm} disabled={isSubmitting} className={`inline-flex items-center gap-3 px-10 py-4 rounded-2xl text-lg font-black transition-all shadow-2xl shadow-green-200/50 ${isSubmitting ? 'bg-slate-400 text-white cursor-not-allowed' : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white hover:scale-[1.02] active:scale-95'}`}>
                                    {isSubmitting ? 'Submitting...' : '✓ Submit Streamshed DPR'}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
