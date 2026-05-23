"use client";

import React from 'react';
import Link from 'next/link';

const Ticker = ({ initialTickerItems }) => {
    const tickerItems = (initialTickerItems || []).filter(item => item.isActive);

    const displayItems = tickerItems.length > 0 ? tickerItems : [
        { text: "Bhagirath App launched by CM Shri Pushkar Singh Dhami on March 28, 2025", link: "" }
    ];

    return (
        <div className="w-full bg-[#e8832a] text-white py-1.5 overflow-hidden flex items-center relative z-10 border-t border-[#d87219]">
            <div className="animate-ticker flex w-max hover:[animation-play-state:paused] cursor-default">
                {[...Array(3)].map((_, groupIndex) => (
                    <div key={groupIndex} className="flex items-center whitespace-nowrap">
                        {displayItems.map((item, itemIndex) => (
                            <React.Fragment key={itemIndex}>
                                <span className="text-[14.5px] font-medium tracking-wide px-6">
                                    {item.link ? (
                                        <Link href={item.link} className="hover:underline">
                                            {item.text}
                                        </Link>
                                    ) : (
                                        item.text
                                    )}
                                </span>
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
