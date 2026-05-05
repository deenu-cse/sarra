import React from "react";

const SarraBanner = () => {
    return (
        <section className="w-full relative overflow-hidden bg-white shadow-sm border-b-4 border-[#f59e0b]">
            <img
                src="/assets/about/sarrabanner.png"
                alt="SARRA Uttarakhand"
                className="w-full h-auto min-h-[120px] object-cover object-center"
            />
        </section>
    );
};

export default SarraBanner;