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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-white font-bold text-lg mb-4 tracking-wide">FIND US</h3>
            <a
              href="https://www.google.com/maps/place/Office+of+the+watershed+project+management+unit+,+UTTARAKHAND/@30.3190645,77.9987396,602m/data=!3m2!1e3!4b1!4m6!3m5!1s0x39092b960780896d:0xfdeb0e4d80ad4f96!8m2!3d30.3190645!4d77.9987396!16s%2Fg%2F11j7vcy_hv"
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-xl overflow-hidden border border-gray-700 hover:border-amber-500 transition-colors"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1544.896740616198!2d77.9987396!3d30.3190645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39092b960780896d%3A0xfdeb0e4d80ad4f96!2sOffice%20of%20the%20watershed%20project%20management%20unit%20%2C%20UTTARAKHAND!5e0!3m2!1sen!2sin!4v1715694240361!5m2!1sen!2sin"
                width="100%"
                height="180"
                style={{ border: 0, pointerEvents: 'none' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="SARRA Office Location"
                className="w-full"
              ></iframe>
            </a>
            <p className="text-xs text-gray-400 mt-2">Click map to open in Google Maps</p>
          </div>

          <div className="flex flex-row gap-8 col-span-1 md:col-span-2">
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-bold text-lg mb-6 tracking-wide">PAGES</h3>
              <ul className="space-y-3 text-sm font-medium">
                <li>
                  <Link href="/about" className="hover:text-amber-500 transition-colors">About SARRA</Link>
                </li>
                <li>
                  <Link href="/knowledge-hub" className="hover:text-amber-500 transition-colors">Knowledge Hub</Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-amber-500 transition-colors">Contact Us</Link>
                </li>
                <li>
                  <Link href="/gallery" className="hover:text-amber-500 transition-colors">Image Gallery</Link>
                </li>
                <li>
                  <Link href="/video-gallery" className="hover:text-amber-500 transition-colors">Video Gallery</Link>
                </li>
              </ul>
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-white font-bold text-lg mb-6 tracking-wide">OTHER LINKS</h3>
              <ul className="space-y-3 text-sm font-medium">
                <li>
                  <Link href="https://apunisarkar.uk.gov.in" target="_blank" className="hover:text-amber-500 transition-colors">Apuni Sarkar</Link>
                </li>
                <li>
                  <Link href="https://wmduk.gov.in" target="_blank" className="hover:text-amber-500 transition-colors">Watershed Management Directorate</Link>
                </li>
              </ul>
            </div>
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
            <Link href="/terms" className="hover:text-white transition-colors">Website Policies</Link>
            <span className="text-gray-600">|</span>
            <Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link>
            <span className="text-gray-600">|</span>
            <Link href="/help" className="hover:text-white transition-colors">Help</Link>
            <span className="text-gray-600">|</span>
            <Link href="/feedback" className="hover:text-white transition-colors">Feedback</Link>
            <span className="text-gray-600">|</span>
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
          </div>

          <div className="text-xs text-gray-400 space-y-1 mt-4">
            <p>Content Owned by <Link href="3" target="_blank" className="text-blue-400 hover:underline">Spring and River Rejuvenation Authority
            </Link>, Government of Uttarakhand</p>
            <p>
              SARRA — State Aquifer Recharge & River Rejuvenation Agency, Dehradun
            </p>
            <p>
              Under the aegis of <Link href="https://uk.gov.in" target="_blank" className="text-blue-400 hover:underline">Government of Uttarakhand</Link>
            </p>
            <p className="pt-2 text-gray-300 font-medium">Last Updated: May 2026</p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-6 mt-5 pt-2">
            <img src="/assets/icons/ukgov.png" alt="ukgov Logo" className="h-10 opacity-80 hover:opacity-100 transition-opacity" />
            <div className="w-px h-10 bg-gray-700 hidden md:block"></div>
            <img src="/assets/icons/logo.png" alt="sarra Logo" className="h-10 opacity-80 hover:opacity-100 transition-opacity" />
            <div className="w-px h-10 bg-gray-700 hidden md:block"></div>
            <img src="/assets/icons/make-iinindia.png" alt="makeinindia Logo" className="h-10 opacity-80 hover:opacity-100 transition-opacity" />
          </div>
        </div>

      </div>
    </footer>
  );
}
