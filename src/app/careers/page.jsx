import React from 'react';
import Link from 'next/link';
import { ArrowRight, Briefcase, CalendarDays, Clock, FileText } from 'lucide-react';
import JobStatusBadge from '@/components/careers/JobStatusBadge';
import { formatJobDate } from '@/lib/jobs';
import { generatePageMeta } from "@/lib/seo.config";

const API_URL = process.env.API_INTERNAL_URL || 'http://localhost:5000/api';

export const metadata = generatePageMeta({
    title: 'Careers | SARRA',
    description: 'Current job openings and recruitment notifications from the Spring and River Rejuvenation Authority (SARRA), Government of Uttarakhand.',
    keywords: 'SARRA careers, SARRA recruitment, Uttarakhand government jobs, water conservation jobs',
    path: '/careers',
});

function JobCard({ job }) {
    return (
        <Link
            href={`/careers/${job.slug}`}
            className="group flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-xl border border-slate-100 transition-all duration-300 p-6"
        >
            <div className="mb-3 flex items-center justify-between gap-2 flex-wrap">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#f59e0b] bg-[#f59e0b]/10 px-2 py-1 rounded">
                    Recruitment
                </span>
                <JobStatusBadge status={job.status} />
            </div>

            <h3 className="text-xl font-bold text-[#1e3a5f] mb-3 line-clamp-2 group-hover:text-[#f59e0b] transition-colors leading-tight">
                {job.title}
            </h3>
            <p className="text-slate-500 text-sm line-clamp-3 mb-4">
                {job.description}
            </p>

            <div className="mt-auto grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4 text-xs">
                <div className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-100 text-slate-600">
                    <span className="font-semibold flex items-center gap-1.5 mb-0.5">
                        <CalendarDays size={13} className="text-[#1e3a5f]" /> Start Date
                    </span>
                    <span className="font-bold text-[#1e3a5f]">{formatJobDate(job.startDate)}</span>
                </div>
                <div className={`px-3 py-2 rounded-xl border ${job.status === 'closed'
                    ? 'bg-rose-50/80 border-rose-200 text-rose-800'
                    : 'bg-amber-50/80 border-amber-200 text-amber-900'
                    }`}>
                    <span className="font-semibold flex items-center gap-1.5 mb-0.5">
                        <Clock size={13} className={job.status === 'closed' ? 'text-rose-500' : 'text-amber-600'} />
                        {job.status === 'closed' ? 'Closed On' : 'Last Date'}
                    </span>
                    <span className="font-bold">{formatJobDate(job.endDate)}</span>
                </div>
            </div>

            <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className="flex items-center text-sm font-bold text-[#1e3a5f] group-hover:text-[#f59e0b] transition-colors">
                    {job.status === 'open' ? 'View Details & Apply' : 'View Details'}
                    <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                </span>
                {job.pdfUrl && (
                    <span className="flex items-center gap-1.5 text-xs text-red-600 font-bold">
                        <FileText size={14} /> PDF Attached
                    </span>
                )}
            </div>
        </Link>
    );
}

export default async function CareersPage() {
    let jobs = [];
    try {
        const res = await fetch(`${API_URL}/jobs?limit=100`, { cache: 'no-store' });
        if (res.ok) {
            const data = await res.json();
            jobs = data.data || [];
        }
    } catch (err) {
        console.error('Failed to fetch jobs:', err);
    }

    const currentJobs = jobs.filter((job) => job.status !== 'closed');
    const closedJobs = jobs.filter((job) => job.status === 'closed');

    return (
        <main className="w-full bg-[#f8fafc] font-sans min-h-screen pb-24">
            <section className="relative w-full overflow-hidden min-h-[400px]">
                <img
                    src="/assets/about/hero-bg.png"
                    alt="Uttarakhand mountain landscape"
                    className="absolute inset-0 w-full h-full object-cover z-0"
                />
                <div className="absolute inset-0 z-10 bg-[linear-gradient(135deg,rgba(15,23,42,0.88)_0%,rgba(30,58,95,0.82)_50%,rgba(10,48,85,0.75)_100%)]" />

                <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 py-24 md:py-32 h-full min-h-[400px]">
                    <span className="text-[#f59e0b] font-bold uppercase tracking-widest text-sm mb-4 block">Join SARRA</span>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white mb-6 tracking-tight leading-tight [text-shadow:0_2px_20px_rgba(0,0,0,0.3)]">
                        Careers
                    </h1>
                    <p className="text-white/80 text-lg md:text-xl max-w-2xl font-light leading-relaxed">
                        Current openings and recruitment notifications from the Spring and River Rejuvenation Authority.
                    </p>
                </div>

                <div className="absolute bottom-0 left-0 right-0 z-10">
                    <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
                        <path d="M0 60V30C240 0 480 0 720 30C960 60 1200 60 1440 30V60H0Z" fill="#f8fafc" />
                    </svg>
                </div>
            </section>

            <div className="max-w-6xl mx-auto px-4 md:px-8 mt-12 space-y-14">
                {jobs.length === 0 && (
                    <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm max-w-2xl mx-auto">
                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Briefcase className="w-10 h-10 text-slate-300" />
                        </div>
                        <h2 className="text-2xl font-bold text-[#1e3a5f] mb-2">No Openings Right Now</h2>
                        <p className="text-slate-500">There are no recruitment notifications at this time. Please check back later.</p>
                    </div>
                )}

                {currentJobs.length > 0 && (
                    <section>
                        <h2 className="text-2xl md:text-3xl font-bold text-[#1e3a5f] font-serif mb-6">Current Openings</h2>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {currentJobs.map((job) => <JobCard key={job._id} job={job} />)}
                        </div>
                    </section>
                )}

                {closedJobs.length > 0 && (
                    <section>
                        <h2 className="text-2xl md:text-3xl font-bold text-[#1e3a5f] font-serif mb-6">Closed Openings</h2>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {closedJobs.map((job) => <JobCard key={job._id} job={job} />)}
                        </div>
                    </section>
                )}
            </div>
        </main>
    );
}
