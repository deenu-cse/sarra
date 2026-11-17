import React from 'react';

const STATUS = {
    open: { label: 'Open', badge: 'text-emerald-700 bg-emerald-50 border-emerald-200', dot: 'bg-emerald-500 animate-pulse' },
    upcoming: { label: 'Upcoming', badge: 'text-sky-700 bg-sky-50 border-sky-200', dot: 'bg-sky-500' },
    closed: { label: 'Closed', badge: 'text-rose-700 bg-rose-50 border-rose-200', dot: 'bg-rose-500' },
};

export default function JobStatusBadge({ status }) {
    const { label, badge, dot } = STATUS[status] || STATUS.closed;

    return (
        <span className={`text-[10px] font-bold border px-2.5 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5 ${badge}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${dot}`}></span> {label}
        </span>
    );
}
