"use client";

import React, { useRef } from 'react';

export default function GovLinks() {
  const marqueeRef = useRef(null);

  return (
    <div className="container mx-auto px-4 bg-white border-y border-gray-200">
      <div className="w-full py-6 pb-5">
        <marquee
          ref={marqueeRef}
          id="myMarquee"
          onMouseOver={() => marqueeRef.current?.stop()}
          onMouseOut={() => marqueeRef.current?.start()}
          scrollamount="5"
          className="w-full flex items-center"
        >
          <div className="w-full flex items-center justify-center gap-10 whitespace-nowrap">
            <a href="https://www.pmindia.gov.in/en/" target="_blank" rel="noopener noreferrer" className="inline-block">
              <img src="/assets/icons/pm-india.png" className="mx-3 inline-block h-12 md:h-16 object-contain" alt="pm india" />
            </a>
            <a href="https://www.mygov.in" target="_blank" rel="noopener noreferrer" className="inline-block">
              <img src="/assets/icons/Mygov.png" className="mx-3 inline-block h-12 md:h-16 object-contain" alt="Mygov" />
            </a>
            <a href="https://pmnrf.gov.in/en/" target="_blank" rel="noopener noreferrer" className="inline-block">
              <img src="/assets/icons/pmnrf.png" className="mx-3 inline-block h-12 md:h-16 object-contain" alt="pmnrf" />
            </a>
            <a href="https://www.data.gov.in" target="_blank" rel="noopener noreferrer" className="inline-block">
              <img src="/assets/icons/data_gov_logo.png" className="mx-3 inline-block h-12 md:h-16 object-contain" alt="data_gov_logo" />
            </a>
            <a href="https://www.digitalindia.gov.in" target="_blank" rel="noopener noreferrer" className="inline-block">
              <img src="/assets/icons/digitial-india.png" className="mx-3 inline-block h-12 md:h-16 object-contain" alt="digitial-india" />
            </a>
            <a href="https://www.incredible-india.org" target="_blank" rel="noopener noreferrer" className="inline-block">
              <img src="/assets/icons/IcredibleIndia.png" className="mx-3 inline-block h-12 md:h-16 object-contain" alt="IcredibleIndia" />
            </a>
            <a href="https://www.makeinindia.com" target="_blank" rel="noopener noreferrer" className="inline-block">
              <img src="/assets/icons/make-iinindia.png" className="mx-3 inline-block h-12 md:h-16 object-contain" alt="make-iinindia" />
            </a>
          </div>
        </marquee>
      </div>
    </div>
  );
}
