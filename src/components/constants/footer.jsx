"use client";

import React from "react";
import Link from "next/link";
import { ChevronUp } from "lucide-react";

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

            <div className="flex gap-5 mt-6 items-center">
              <a href="https://x.com/SARRA_UKGOV" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="X (Twitter)">
                <svg className="w-7 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="https://www.facebook.com/people/Sarra-Uttarakhand/61574227275874/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors" aria-label="Facebook">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="https://www.instagram.com/sarra_uttarakhand/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-500 transition-colors" aria-label="Instagram">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="https://www.youtube.com/@SARRA-UK" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-500 transition-colors" aria-label="YouTube">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
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

      <div className="border-t border-[#333333] w-full"></div>

      <div className="container mx-auto px-4 md:px-6 pt-6 relative">
        <div className="flex flex-col items-center text-center space-y-4">

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
              SARRA — Spring and River Rejuvenation Authority, Dehradun
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
