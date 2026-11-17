'use client';
import React, { useState } from 'react';
import { AlertTriangle, CheckCircle2, FileText, Send, Upload, X } from 'lucide-react';
import axiosInstance from '@/lib/axiosInstance';
import { FILE_TYPES, MAX_FILE_MB } from '@/lib/jobs';

const INPUT_CLASS = 'w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#f59e0b]/40 focus:border-[#f59e0b] outline-none transition-all bg-[#f8fafc] focus:bg-white hover:border-gray-300 text-sm';

const EMPTY_FORM = {
    fullName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    qualification: '',
    experience: '',
    additionalInfo: '',
};

function Field({ id, label, required, children }) {
    return (
        <div className="space-y-1.5">
            <label htmlFor={id} className="block text-sm font-medium text-gray-600">
                {label} {required && <span className="text-red-400">*</span>}
            </label>
            {children}
        </div>
    );
}

function DocumentField({ requirement, file, error, onSelect, onClear }) {
    const { accept, label: typeLabel } = FILE_TYPES[requirement.fileType];
    const inputId = `document-${requirement._id}`;

    return (
        <div className="space-y-1.5">
            <label htmlFor={inputId} className="block text-sm font-medium text-gray-600">
                {requirement.label} {requirement.required ? <span className="text-red-400">*</span> : <span className="text-gray-400 font-normal">(Optional)</span>}
            </label>

            {file ? (
                <div className="flex items-center justify-between gap-3 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
                    <div className="flex items-center gap-2 min-w-0 text-sm text-slate-700">
                        <FileText size={18} className="text-[#1e3a5f] shrink-0" />
                        <span className="font-semibold truncate">{file.name}</span>
                        <span className="text-slate-400 text-xs shrink-0">({(file.size / (1024 * 1024)).toFixed(2)} MB)</span>
                    </div>
                    <button type="button" onClick={onClear} aria-label={`Remove ${requirement.label}`} className="text-slate-400 hover:text-red-500 p-1 transition-colors shrink-0 cursor-pointer">
                        <X size={16} />
                    </button>
                </div>
            ) : (
                <label htmlFor={inputId} className={`flex items-center gap-3 border-2 border-dashed rounded-xl px-4 py-3 cursor-pointer transition-colors ${error ? 'border-red-300 bg-red-50/40' : 'border-slate-200 hover:border-[#f59e0b]/60'}`}>
                    <Upload size={18} className="text-[#1e3a5f] shrink-0" />
                    <span className="text-sm text-slate-500">
                        <span className="font-semibold text-[#1e3a5f]">Choose file</span> · {typeLabel}, up to {MAX_FILE_MB}MB
                    </span>
                </label>
            )}

            <input
                id={inputId}
                type="file"
                accept={accept}
                className="sr-only"
                onChange={(e) => {
                    const selected = e.target.files?.[0];
                    e.target.value = ''; // So picking the same file again after removing it still fires onChange
                    if (selected) onSelect(selected);
                }}
            />

            {error && <p className="text-xs font-medium text-red-600">{error}</p>}
        </div>
    );
}

export default function ApplicationForm({ job }) {
    const [form, setForm] = useState(EMPTY_FORM);
    const [files, setFiles] = useState({});
    const [fileErrors, setFileErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [submitError, setSubmitError] = useState('');
    const [applicationNumber, setApplicationNumber] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const selectFile = (requirement, file) => {
        const { accept, label } = FILE_TYPES[requirement.fileType];

        let error = '';
        if (!accept.split(',').includes(file.type)) {
            error = `${requirement.label} must be ${label}.`;
        } else if (file.size > MAX_FILE_MB * 1024 * 1024) {
            error = `File is too large. The limit is ${MAX_FILE_MB}MB.`;
        }

        setFileErrors({ ...fileErrors, [requirement._id]: error });
        if (!error) setFiles({ ...files, [requirement._id]: file });
    };

    const clearFile = (requirement) => {
        const remaining = { ...files };
        delete remaining[requirement._id];
        setFiles(remaining);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const missing = job.documents.filter((doc) => doc.required && !files[doc._id]);
        if (missing.length > 0) {
            setFileErrors(Object.fromEntries(missing.map((doc) => [doc._id, `${doc.label} is required.`])));
            setSubmitError('Please upload all required documents.');
            return;
        }

        const data = new FormData();
        Object.entries(form).forEach(([key, value]) => data.append(key, value));
        Object.entries(files).forEach(([requirementId, file]) => data.append(requirementId, file));

        setIsSubmitting(true);
        setUploadProgress(0);
        setSubmitError('');

        try {
            const response = await axiosInstance.post(`/jobs/${job._id}/apply`, data, {
                timeout: 5 * 60 * 1000, // Several documents can take a while on a mobile connection
                onUploadProgress: (event) => {
                    if (event.total) setUploadProgress(Math.round((event.loaded * 100) / event.total));
                },
            });
            setApplicationNumber(response.data.data.applicationNumber);
        } catch (error) {
            // Shown inline, not as a toast: the site's CSP blocks sonner's styles in production
            setSubmitError(error.response?.data?.message || 'Failed to submit your application. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (applicationNumber) {
        return (
            <section id="apply" className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 md:p-10 text-center scroll-mt-6">
                <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                </div>
                <h2 className="text-2xl font-serif font-bold text-[#1e3a5f] mb-2">Application Submitted</h2>
                <p className="text-slate-500 text-sm mb-6">
                    Thank you for applying for <strong>{job.title}</strong>. Please keep this number for your records.
                </p>
                <div className="inline-block px-6 py-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="block text-[10px] uppercase font-bold tracking-widest text-slate-400 mb-1">Application Number</span>
                    <span className="text-lg font-bold text-[#1e3a5f] tracking-wider">{applicationNumber}</span>
                </div>
            </section>
        );
    }

    return (
        <section id="apply" className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8 scroll-mt-6">
            <div className="mb-8">
                <span className="text-xs font-bold tracking-widest uppercase text-[#f59e0b] block mb-2">Apply Online</span>
                <h2 className="text-2xl md:text-3xl font-bold text-[#1e3a5f] font-serif">Application Form</h2>
                <p className="text-gray-400 mt-2 text-sm">Fields marked with <span className="text-red-400">*</span> are required.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                <fieldset className="space-y-5">
                    <legend className="text-base font-bold text-[#1e3a5f] mb-4">Personal Details</legend>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <Field id="fullName" label="Full Name" required>
                            <input id="fullName" name="fullName" type="text" required minLength={2} maxLength={100} autoComplete="name" value={form.fullName} onChange={handleChange} placeholder="As per your certificates" className={INPUT_CLASS} />
                        </Field>
                        <Field id="email" label="Email ID" required>
                            <input id="email" name="email" type="email" required maxLength={254} autoComplete="email" value={form.email} onChange={handleChange} placeholder="name@example.com" className={INPUT_CLASS} />
                        </Field>
                        <Field id="phone" label="Contact No" required>
                            <input id="phone" name="phone" type="tel" required maxLength={20} autoComplete="tel" value={form.phone} onChange={handleChange} placeholder="10 digit mobile number" className={INPUT_CLASS} />
                        </Field>
                        <Field id="dateOfBirth" label="Date of Birth" required>
                            <input id="dateOfBirth" name="dateOfBirth" type="date" required autoComplete="bday" value={form.dateOfBirth} onChange={handleChange} className={INPUT_CLASS} />
                        </Field>
                        <Field id="gender" label="Gender" required>
                            <select id="gender" name="gender" required value={form.gender} onChange={handleChange} className={INPUT_CLASS}>
                                <option value="">Select</option>
                                <option value="female">Female</option>
                                <option value="male">Male</option>
                                <option value="other">Other</option>
                            </select>
                        </Field>
                        <Field id="qualification" label="Highest Qualification" required>
                            <input id="qualification" name="qualification" type="text" required minLength={2} maxLength={200} value={form.qualification} onChange={handleChange} placeholder="e.g. M.Sc Hydrology" className={INPUT_CLASS} />
                        </Field>
                    </div>

                    <Field id="address" label="Address" required>
                        <textarea id="address" name="address" required minLength={5} maxLength={500} rows={2} autoComplete="street-address" value={form.address} onChange={handleChange} placeholder="Full postal address" className={`${INPUT_CLASS} resize-none`}></textarea>
                    </Field>
                    <Field id="experience" label="Work Experience">
                        <textarea id="experience" name="experience" maxLength={500} rows={2} value={form.experience} onChange={handleChange} placeholder="Total experience and most recent role" className={`${INPUT_CLASS} resize-none`}></textarea>
                    </Field>
                    <Field id="additionalInfo" label="Additional Information">
                        <textarea id="additionalInfo" name="additionalInfo" maxLength={2000} rows={3} value={form.additionalInfo} onChange={handleChange} placeholder="Anything else you would like us to know" className={`${INPUT_CLASS} resize-none`}></textarea>
                    </Field>
                </fieldset>

                {job.documents.length > 0 && (
                    <fieldset className="space-y-5">
                        <legend className="text-base font-bold text-[#1e3a5f] mb-4">Documents</legend>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {job.documents.map((requirement) => (
                                <DocumentField
                                    key={requirement._id}
                                    requirement={requirement}
                                    file={files[requirement._id]}
                                    error={fileErrors[requirement._id]}
                                    onSelect={(file) => selectFile(requirement, file)}
                                    onClear={() => clearFile(requirement)}
                                />
                            ))}
                        </div>
                    </fieldset>
                )}

                <label className="flex items-start gap-3 text-sm text-gray-600 cursor-pointer">
                    <input type="checkbox" required className="mt-0.5 w-4 h-4 accent-[#1e3a5f] shrink-0" />
                    <span>I declare that the information given here is true, and I agree to SARRA using it to process this application.</span>
                </label>

                <div>
                    {submitError && (
                        <div role="alert" className="mb-4 p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-3 text-sm font-medium text-rose-800">
                            <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
                            <span>{submitError}</span>
                        </div>
                    )}

                    {isSubmitting && (
                        <div className="mb-4" role="status">
                            <div className="flex justify-between text-xs font-semibold text-slate-500 mb-1">
                                <span>{uploadProgress < 100 ? 'Uploading your documents...' : 'Saving your application...'}</span>
                                <span>{uploadProgress}%</span>
                            </div>
                            <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                                <div className="h-full bg-[#f59e0b] transition-[width] duration-200" style={{ width: `${uploadProgress}%` }}></div>
                            </div>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full md:w-auto px-10 py-3.5 text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2.5 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-[#1e3a5f]/25 hover:shadow-xl hover:shadow-[#1e3a5f]/30 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer bg-[linear-gradient(135deg,#1e3a5f_0%,#0a3055_100%)]"
                    >
                        {isSubmitting ? (
                            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                        ) : (
                            <>
                                <Send className="w-4 h-4" />
                                Submit Application
                            </>
                        )}
                    </button>
                </div>
            </form>
        </section>
    );
}
