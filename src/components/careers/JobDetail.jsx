import React from 'react';
import Link from 'next/link';
import { AlertTriangle, ArrowLeft, Briefcase, CalendarDays, CheckCircle2, Clock, ExternalLink, FileText, Upload } from 'lucide-react';
import ApplicationForm from '@/components/careers/ApplicationForm';
import JobStatusBadge from '@/components/careers/JobStatusBadge';
import { getMediaUrl } from '@/lib/getMediaUrl';
import { FILE_TYPES, formatJobDate } from '@/lib/jobs';

function BulletSection({ title, items }) {
    return (
        <section className="p-6 md:p-8 border-b border-slate-100 last:border-b-0">
            <h2 className="text-xl md:text-2xl font-serif font-bold text-[#1e3a5f] mb-4">{title}</h2>
            <ul className="space-y-3">
                {items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-slate-600 leading-relaxed">
                        <CheckCircle2 size={18} className="text-[#f59e0b] shrink-0 mt-1" />
                        <span>{item}</span>
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default function JobDetail({ job, error }) {
    if (error || !job) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center bg-[#f8fafc] px-4">
                <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-6">
                    <Briefcase className="w-10 h-10 text-red-300" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Job Not Found</h2>
                <p className="text-slate-500 mb-8 max-w-md text-center">{error}</p>
                <Link href="/careers" className="bg-[#1e3a5f] hover:bg-[#142844] text-white px-6 py-3 rounded-lg font-bold transition-colors flex items-center gap-2">
                    <ArrowLeft size={18} /> Back to Careers
                </Link>
            </div>
        );
    }

    const isOpen = job.status === 'open';
    const isClosed = job.status === 'closed';

    return (
        <main className="w-full bg-[#f8fafc] font-sans min-h-screen pb-24">
            <section className="relative w-full overflow-hidden">
                <img
                    src="/assets/about/hero-bg.png"
                    alt="Uttarakhand mountain landscape"
                    className="absolute inset-0 w-full h-full object-cover z-0"
                />
                <div className="absolute inset-0 z-10 bg-[linear-gradient(135deg,rgba(15,23,42,0.88)_0%,rgba(30,58,95,0.82)_50%,rgba(10,48,85,0.75)_100%)]" />

                <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 py-20 md:py-28">
                    <span className="text-[#f59e0b] font-bold uppercase tracking-widest text-sm mb-4 block">Recruitment</span>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white mb-6 tracking-tight leading-tight max-w-4xl [text-shadow:0_2px_20px_rgba(0,0,0,0.3)]">
                        {job.title}
                    </h1>
                    <JobStatusBadge status={job.status} />
                </div>

                <div className="absolute bottom-0 left-0 right-0 z-10">
                    <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
                        <path d="M0 60V30C240 0 480 0 720 30C960 60 1200 60 1440 30V60H0Z" fill="#f8fafc" />
                    </svg>
                </div>
            </section>

            <div className="max-w-6xl mx-auto px-4 md:px-8 mt-8">
                <Link href="/careers" className="flex items-center gap-2 text-slate-500 hover:text-[#1e3a5f] transition-colors font-semibold mb-6 group w-fit">
                    <ArrowLeft size={20} className="transform group-hover:-translate-x-1 transition-transform" />
                    All Openings
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    <aside className="lg:col-span-1 lg:order-2 lg:sticky lg:top-6 space-y-4">
                        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 space-y-5">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                                    <CalendarDays size={18} className="text-[#1e3a5f]" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Start Date</span>
                                    <span className="text-[#1e3a5f] font-semibold">{formatJobDate(job.startDate)}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${isClosed ? 'bg-rose-50' : 'bg-amber-50'}`}>
                                    <Clock size={18} className={isClosed ? 'text-rose-600' : 'text-amber-600'} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">{isClosed ? 'Closed On' : 'Last Date'}</span>
                                    <span className={`font-semibold ${isClosed ? 'text-rose-700' : 'text-[#1e3a5f]'}`}>{formatJobDate(job.endDate)}</span>
                                </div>
                            </div>

                            {isOpen && (
                                <a href="#apply" className="w-full inline-flex items-center justify-center gap-2 bg-[#1e3a5f] hover:bg-[#142844] text-white px-5 py-3 rounded-xl font-bold text-sm transition-colors shadow-sm">
                                    <Briefcase size={16} /> Apply Now
                                </a>
                            )}
                        </div>

                        {job.pdfUrl && (
                            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-11 h-11 rounded-2xl bg-red-50 flex items-center justify-center shrink-0 border border-red-100">
                                        <FileText size={22} className="text-red-500" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-[#1e3a5f] text-sm leading-tight">Official Notification</h3>
                                        <p className="text-slate-500 text-xs mt-0.5">Full job details (PDF)</p>
                                    </div>
                                </div>
                                <a
                                    href={getMediaUrl(job.pdfUrl)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full inline-flex items-center justify-center gap-2 border-2 border-[#1e3a5f] text-[#1e3a5f] hover:bg-[#1e3a5f] hover:text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-colors"
                                >
                                    <ExternalLink size={16} /> Open PDF
                                </a>
                            </div>
                        )}
                    </aside>

                    <div className="lg:col-span-2 lg:order-1 min-w-0 space-y-8">
                        {isClosed && (
                            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 flex items-start gap-3">
                                <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                                <div>
                                    <h2 className="font-bold text-sm text-rose-800">Applications are closed</h2>
                                    <p className="text-xs text-rose-700 mt-0.5 leading-relaxed">
                                        The last date to apply for this job was <strong>{formatJobDate(job.endDate)}</strong>.
                                    </p>
                                </div>
                            </div>
                        )}

                        {job.status === 'upcoming' && (
                            <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 flex items-start gap-3">
                                <Clock className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                                <div>
                                    <h2 className="font-bold text-sm text-sky-900">Applications open soon</h2>
                                    <p className="text-xs text-sky-800 mt-0.5 leading-relaxed">
                                        You can apply for this job from <strong>{formatJobDate(job.startDate)}</strong> to <strong>{formatJobDate(job.endDate)}</strong>.
                                    </p>
                                </div>
                            </div>
                        )}

                        <article className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                            <section className="p-6 md:p-8 border-b border-slate-100">
                                <h2 className="text-xl md:text-2xl font-serif font-bold text-[#1e3a5f] mb-4">Job Description</h2>
                                {job.description.split('\n').map((paragraph, idx) => (
                                    paragraph.trim() ? <p key={idx} className="mb-3 text-slate-600 leading-relaxed">{paragraph}</p> : <br key={idx} />
                                ))}
                            </section>

                            <BulletSection title="Responsibilities" items={job.responsibilities} />
                            <BulletSection title="Requirements" items={job.requirements} />

                            {job.documents.length > 0 && (
                                <section className="p-6 md:p-8">
                                    <h2 className="text-xl md:text-2xl font-serif font-bold text-[#1e3a5f] mb-4">Documents Needed</h2>
                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {job.documents.map((doc) => (
                                            <li key={doc._id} className="flex items-start gap-3 px-4 py-3 rounded-xl bg-slate-50 border border-slate-100">
                                                <Upload size={16} className="text-[#1e3a5f] shrink-0 mt-0.5" />
                                                <div className="min-w-0">
                                                    <span className="block text-sm font-bold text-[#1e3a5f] break-words">{doc.label}</span>
                                                    <span className="block text-xs text-slate-500 mt-0.5">
                                                        {FILE_TYPES[doc.fileType].label} · {doc.required ? 'Required' : 'Optional'}
                                                    </span>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            )}
                        </article>

                        {isOpen && <ApplicationForm job={job} />}
                    </div>
                </div>
            </div>
        </main>
    );
}
