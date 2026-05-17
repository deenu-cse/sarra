"use client";
import React, { useState } from 'react';
import Header from "@/components/constants/header";
import Footer from "@/components/constants/footer";
import { MapPin, Phone, Mail, Send, Clock } from 'lucide-react';
import { toast } from 'sonner';
import axiosInstance from '@/lib/axiosInstance';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();

    // Manual validation because type="button" does not trigger HTML5 validation
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

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50">
      <div className="bg-[#1e3a5f] text-white py-12 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-amber-500 rounded-full mix-blend-multiply filter blur-2xl animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-2xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-teal-500 rounded-full mix-blend-multiply filter blur-2xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-serif text-[#f59e0b]">Contact Us</h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            We are here to help and answer any question you might have. We look forward to hearing from you.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 bg-white rounded-2xl shadow-xl overflow-hidden">

          {/* Contact Information (Left Sidebar) */}
          <div className="lg:col-span-2 bg-[#f8fafc] p-8 md:p-10 border-r border-gray-100">
            <h2 className="text-2xl font-bold text-[#1e3a5f] mb-8 font-serif">Get In Touch</h2>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="bg-[#e0f2fe] p-3 rounded-xl text-[#0284c7]">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Address</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    SARRA, Watershed Management Directorate Indira Nagar,
                    Forest Colony, Vasant Vihar Dehradun – 248006 Uttarakhand, INDIA
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#ecfdf5] p-3 rounded-xl text-[#059669]">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                  <p className="text-gray-600 text-sm">0135-2768712</p>
                  <p className="text-gray-600 text-sm">0135-2760312</p>
                  <p className="text-gray-600 text-sm">0135-2761002</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#fef3c7] p-3 rounded-xl text-[#d97706]">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                  <a href="mailto:sarrauttarakhand@gmail.com" className="text-[#0284c7] hover:underline text-sm">
                    sarrauttarakhand@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#f3e8ff] p-3 rounded-xl text-[#7e22ce]">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Office Hours</h3>
                  <p className="text-gray-600 text-sm">Mon - Sat: 10:00 AM - 5:00 PM</p>
                  <p className="text-gray-600 text-sm">Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form (Right Area) */}
          <div className="lg:col-span-3 p-8 md:p-10">
            <h2 className="text-2xl font-bold text-[#1e3a5f] mb-2 font-serif">Send us a Message</h2>
            <p className="text-gray-500 mb-8 text-sm">Please fill out the form below and our team will get back to you shortly.</p>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#f59e0b] focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email ID <span className="text-red-500">*</span></label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#f59e0b] focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Contact No <span className="text-red-500">*</span></label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone number"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#f59e0b] focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Topic of inquiry"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#f59e0b] focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message <span className="text-red-500">*</span></label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#f59e0b] focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white resize-none"
                ></textarea>
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full md:w-auto px-8 py-3 bg-[#1e3a5f] hover:bg-[#152943] text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-md shadow-[#1e3a5f]/20"
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

        {/* Map Section */}
        <div className="mt-12 rounded-2xl overflow-hidden shadow-xl border border-gray-100">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1544.896740616198!2d77.9987396!3d30.3190645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39092b960780896d%3A0xfdeb0e4d80ad4f96!2sOffice%20of%20the%20watershed%20project%20management%20unit%20%2C%20UTTARAKHAND!5e0!3m2!1sen!2sin!4v1715694240361!5m2!1sen!2sin"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="SARRA Office Location"
            className="w-full grayscale hover:grayscale-0 transition-all duration-500"
          ></iframe>
        </div>
      </main>

    </div>
  );
}
