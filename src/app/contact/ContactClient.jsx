"use client";
import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Phone, Mail, Send, Clock, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import axiosInstance from '@/lib/axiosInstance';

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formRef, formVisible] = useReveal();
  const [mapRef, mapVisible] = useReveal();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone || !formData.subject || !formData.message) {
      toast.error('Please fill out all required fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axiosInstance.post('/contact', formData);
      toast.success(response.data.message || 'Your message has been sent successfully!');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Address',
      content: (
        <p className="text-white/70 leading-relaxed text-sm">
          SARRA, Watershed Management Directorate Indira Nagar,
          Forest Colony, Vasant Vihar Dehradun&nbsp;–&nbsp;248006 Uttarakhand, INDIA
        </p>
      ),
    },
    {
      icon: Phone,
      title: 'Phone',
      content: (
        <div className="space-y-0.5">
          <p className="text-white/70 text-sm">0135-2768712</p>
          <p className="text-white/70 text-sm">0135-2760312</p>
          <p className="text-white/70 text-sm">0135-2761002</p>
        </div>
      ),
    },
    {
      icon: Mail,
      title: 'Email',
      content: (
        <a href="mailto:sarrauttarakhand@gmail.com" className="text-[#f59e0b] hover:text-[#fbbf24] transition-colors text-sm font-medium">
          sarrauttarakhand@gmail.com
        </a>
      ),
    },
    {
      icon: Clock,
      title: 'Office Hours',
      content: (
        <div className="space-y-0.5">
          <p className="text-white/70 text-sm">Mon – Sat: 10:00 AM – 5:00 PM</p>
          <p className="text-white/70 text-sm">Sunday: Closed</p>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#f8fafc]">

      <section className="relative w-full overflow-hidden" style={{ minHeight: '380px' }}>
        <img
          src="/assets/about/hero-bg.png"
          alt="Uttarakhand mountain landscape"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ zIndex: 0 }}
        />

        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(15,23,42,0.92) 0%, rgba(30,58,95,0.85) 50%, rgba(10,48,85,0.80) 100%)',
            zIndex: 1,
          }}
        />

        <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 2 }}>
          <div className="absolute -top-16 -left-16 w-80 h-80 rounded-full opacity-[0.07]"
            style={{ background: 'radial-gradient(circle, #f59e0b 0%, transparent 70%)' }} />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full opacity-[0.06]"
            style={{ background: 'radial-gradient(circle, #38bdf8 0%, transparent 70%)' }} />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 py-20 md:py-28">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 text-white/80 px-5 py-2 rounded-full text-sm font-medium mb-6 tracking-wide">
            <Sparkles className="w-4 h-4 text-[#f59e0b]" />
            We&apos;d love to hear from you
          </div>

          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white mb-5 tracking-tight leading-tight"
            style={{ textShadow: '0 2px 24px rgba(0,0,0,0.3)' }}
          >
            Contact <span className="text-[#f59e0b]">Us</span>
          </h1>

          <p className="text-white/75 text-lg md:text-xl max-w-2xl font-light leading-relaxed">
            We are here to help and answer any question you might have. We look forward to hearing from you.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 60V30C240 0 480 0 720 30C960 60 1200 60 1440 30V60H0Z" fill="#f8fafc" />
          </svg>
        </div>
      </section>

      <main className="flex-grow container mx-auto px-4 py-12 md:py-16">
        <div
          ref={formRef}
          className={`grid grid-cols-1 lg:grid-cols-5 gap-0 rounded-3xl shadow-2xl shadow-slate-200/60 overflow-hidden transition-all duration-1000 ${formVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >

          <div
            className="lg:col-span-2 p-8 md:p-10 relative overflow-hidden"
            style={{
              background: 'linear-gradient(160deg, #0f172a 0%, #1e3a5f 50%, #0a3055 100%)',
            }}
          >
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cpath d='M30 5 Q35 15 30 25 Q25 35 30 45 Q35 55 30 55' stroke='white' fill='none' stroke-width='0.5'/%3E%3Cpath d='M10 0 Q15 10 10 20 Q5 30 10 40 Q15 50 10 60' stroke='white' fill='none' stroke-width='0.5'/%3E%3Cpath d='M50 0 Q55 10 50 20 Q45 30 50 40 Q55 50 50 60' stroke='white' fill='none' stroke-width='0.5'/%3E%3C/svg%3E")`,
                backgroundSize: '60px 60px',
              }}
            />
            <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full opacity-[0.08]"
              style={{ background: 'radial-gradient(circle, #f59e0b 0%, transparent 70%)' }} />

            <div className="relative z-10">
              <h2 className="text-2xl font-bold text-white mb-2 font-serif">Get In Touch</h2>
              <p className="text-white/50 text-sm mb-10">Reach out to us through any of these channels.</p>

              <div className="space-y-8">
                {contactInfo.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="flex items-start gap-4 group">
                      <div className="bg-white/10 backdrop-blur-sm border border-white/10 p-3 rounded-xl group-hover:bg-[#f59e0b]/20 group-hover:border-[#f59e0b]/30 transition-all duration-300">
                        <Icon className="w-5 h-5 text-[#f59e0b]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white mb-1 text-sm tracking-wide uppercase">{item.title}</h3>
                        {item.content}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-10 pt-8 border-t border-white/10">
                <p className="text-white/40 text-xs leading-relaxed">
                  Spring and River Rejuvenation Authority (SARRA), under the Watershed Management Directorate, Government of Uttarakhand.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 p-8 md:p-10 bg-white">
            <div className="mb-8">
              <span className="text-xs font-bold tracking-widest uppercase text-[#f59e0b] block mb-2">Send a message</span>
              <h2 className="text-2xl md:text-3xl font-bold text-[#1e3a5f] font-serif">How can we help you?</h2>
              <p className="text-gray-400 mt-2 text-sm">Fill out the form and our team will get back to you within 24 hours.</p>
            </div>

            <form className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label htmlFor="contact-name" className="block text-sm font-medium text-gray-600">Full Name <span className="text-red-400">*</span></label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#f59e0b]/40 focus:border-[#f59e0b] outline-none transition-all bg-[#f8fafc] focus:bg-white hover:border-gray-300 text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="contact-email" className="block text-sm font-medium text-gray-600">Email ID <span className="text-red-400">*</span></label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#f59e0b]/40 focus:border-[#f59e0b] outline-none transition-all bg-[#f8fafc] focus:bg-white hover:border-gray-300 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label htmlFor="contact-phone" className="block text-sm font-medium text-gray-600">Contact No <span className="text-red-400">*</span></label>
                  <input
                    type="tel"
                    id="contact-phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone number"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#f59e0b]/40 focus:border-[#f59e0b] outline-none transition-all bg-[#f8fafc] focus:bg-white hover:border-gray-300 text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="contact-subject" className="block text-sm font-medium text-gray-600">Subject <span className="text-red-400">*</span></label>
                  <input
                    type="text"
                    id="contact-subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Topic of inquiry"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#f59e0b]/40 focus:border-[#f59e0b] outline-none transition-all bg-[#f8fafc] focus:bg-white hover:border-gray-300 text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-message" className="block text-sm font-medium text-gray-600">Message <span className="text-red-400">*</span></label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#f59e0b]/40 focus:border-[#f59e0b] outline-none transition-all bg-[#f8fafc] focus:bg-white hover:border-gray-300 resize-none text-sm"
                ></textarea>
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full md:w-auto px-10 py-3.5 text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2.5 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-[#1e3a5f]/25 hover:shadow-xl hover:shadow-[#1e3a5f]/30 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, #1e3a5f 0%, #0a3055 100%)',
                }}
              >
                {isSubmitting ? (
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Submit Query
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        <div
          ref={mapRef}
          className={`mt-16 transition-all duration-1000 ${mapVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="text-center mb-8">
            <span className="text-xs font-bold tracking-widest uppercase text-[#f59e0b] block mb-2">Find Us</span>
            <h2 className="text-2xl md:text-3xl font-bold text-[#1e3a5f] font-serif">Our Location</h2>
          </div>

          <div className="rounded-3xl overflow-hidden shadow-2xl shadow-slate-200/60 border border-gray-100 relative group">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1544.896740616198!2d77.9987396!3d30.3190645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39092b960780896d%3A0xfdeb0e4d80ad4f96!2sOffice%20of%20the%20watershed%20project%20management%20unit%20%2C%20UTTARAKHAND!5e0!3m2!1sen!2sin!4v1715694240361!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="SARRA Office Location"
              className="w-full grayscale group-hover:grayscale-0 transition-all duration-700"
            ></iframe>
          </div>
        </div>
      </main>
    </div>
  );
}
