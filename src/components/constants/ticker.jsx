"use client";

import React from 'react';

const Ticker = () => {
    return (
        <div className="w-full bg-[#e8832a] text-white py-1.5 overflow-hidden flex items-center relative z-10 border-t border-[#d87219]">
            <div className="animate-ticker flex w-max hover:[animation-play-state:paused] cursor-default">
                {/* We use 2 identical blocks to create the seamless scrolling effect */}
                {[...Array(2)].map((_, groupIndex) => (
                    <div key={groupIndex} className="flex items-center whitespace-nowrap">
                        {[...Array(4)].map((_, itemIndex) => (
                            <React.Fragment key={itemIndex}>
                                <span className="text-[14.5px] font-medium tracking-wide px-6">Uttarakhand</span>
                                <span className="text-white/60 text-[11px] leading-none opacity-80 pt-0.5">◆</span>
                                <span className="text-[14.5px] font-medium tracking-wide px-6">Bhagirath App launched by CM Shri Pushkar Singh Dhami on March 28, 2025</span>
                                <span className="text-white/60 text-[11px] leading-none opacity-80 pt-0.5">◆</span>
                            </React.Fragment>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Ticker;
