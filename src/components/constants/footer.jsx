"use client";

import React from "react";
import Link from "next/link";
import { ChevronUp } from "lucide-react";
// import { Twitter, Instagram, Youtube, ChevronUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-[#111111] text-gray-300 pt-12 pb-6 border-t-[6px] border-amber-500 font-sans mt-auto">
      <div className="container mx-auto px-4 md:px-6">
        {/* Top Section - 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1 */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4 tracking-wide">TOTAL VISITOR</h3>
            <p className="text-4xl font-bold text-white mb-4">20292</p>
            <p className="text-sm mb-6 leading-relaxed">
              Join us in preserving our natural resources.
            </p>
            {/* <div className="flex items-center gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube className="w-6 h-6" />
              </a>
            </div> */}
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 tracking-wide">PAGES</h3>
            <ul className="space-y-3 text-sm font-medium">
              <li>
                <Link href="#" className="hover:text-amber-500 transition-colors">About SARRA</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-amber-500 transition-colors">Knowledge Hub</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-amber-500 transition-colors">Contact Us</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-amber-500 transition-colors">Image Gallery</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-amber-500 transition-colors">Video Gallery</Link>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 tracking-wide">OTHER LINKS</h3>
            <ul className="space-y-3 text-sm font-medium">
              <li>
                <Link href="#" className="hover:text-amber-500 transition-colors">Apuni Sarkar</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-amber-500 transition-colors">Watershed Management Directorate</Link>
              </li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 tracking-wide">CONTACT US</h3>
            <div className="space-y-4 text-sm">
              <p className="leading-relaxed">
                <strong className="text-white">Address:</strong> SARRA, Watershed Management Directorate Indira Nagar, Forest Colony, Vasant Vihar Dehradun – 248006 Uttarakhand, INDIA
              </p>
              <p>
                <strong className="text-white">Phone:</strong> 0135-2768712, 2760312, 2761002
              </p>
              <p>
                <strong className="text-white">Email:</strong> sarrauttarakhand@gmail.com
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-[#333333] w-full"></div>

      {/* Bottom Section - Design from Image 2 */}
      <div className="container mx-auto px-4 md:px-6 pt-6 relative">
        <div className="flex flex-col items-center text-center space-y-4">

          {/* Horizontal Links */}
          <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-sm text-gray-300">
            <Link href="#" className="hover:text-white transition-colors">Website Policies</Link>
            <span className="text-gray-600">|</span>
            <Link href="#" className="hover:text-white transition-colors">Contact Us</Link>
            <span className="text-gray-600">|</span>
            <Link href="#" className="hover:text-white transition-colors">Help</Link>
            <span className="text-gray-600">|</span>
            <Link href="#" className="hover:text-white transition-colors">Feedback</Link>
            <span className="text-gray-600">|</span>
            <Link href="#" className="hover:text-white transition-colors">Web Information Manager</Link>
          </div>

          {/* Ownership & Development Text */}
          <div className="text-xs text-gray-400 space-y-1 mt-4">
            <p>Content Owned by Department of Agriculture Uttarakhand</p>
            <p>
              Developed and hosted by <Link href="#" className="text-blue-400 hover:underline">National Informatics Centre</Link>,
            </p>
            <p>
              <Link href="#" className="text-blue-400 hover:underline">Ministry of Electronics & Information Technology</Link>, Government of India
            </p>
            <p className="pt-2 text-gray-300 font-medium">Last Updated: December 15, 2025</p>
          </div>

          {/* Logos */}
          <div className="flex flex-wrap justify-center items-center gap-6 mt-8 pt-4">
            <img src="/assets/icons/swaas.png" alt="Swaas Logo" className="h-10 opacity-80 hover:opacity-100 transition-opacity" />
            <div className="w-px h-10 bg-gray-700 hidden md:block"></div>
            <img src="/assets/icons/nic.png" alt="NIC Logo" className="h-10 opacity-80 hover:opacity-100 transition-opacity" />
            <div className="w-px h-10 bg-gray-700 hidden md:block"></div>
            <img src="/assets/icons/digital-india.png" alt="Digital India Logo" className="h-10 opacity-80 hover:opacity-100 transition-opacity" />
          </div>
        </div>

      </div>
    </footer>
  );
}
