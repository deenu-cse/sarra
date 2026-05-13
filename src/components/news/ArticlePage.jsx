'use client';

import React from 'react';
const FacebookIcon = ({ size = 24, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const TwitterIcon = ({ size = 24, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
);

const LinkedinIcon = ({ size = 24, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const ArticlePage = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 pt-8 md:pt-12 bg-white font-serif text-slate-900">
      <div className="flex flex-col lg:flex-row gap-12">

        <main className="lg:w-2/3">
          <span className="text-[#f59e0b] text-xs font-bold uppercase tracking-widest font-sans">Conservation</span>
          <h1 className="text-4xl md:text-5xl font-bold mt-2 leading-tight font-sans text-[#1e3a5f]">
            New Breakthrough in River Rejuvenation Shows Promise In Uttarakhand
          </h1>

          <div className="flex items-center justify-between mt-6 pb-4 border-b border-gray-100 font-sans">
            <div className="text-xs text-gray-500">
              <span>10 MAY 2026</span>
              <span className="mx-2">•</span>
              <span>4 min read</span>
            </div>
            <div className="flex gap-4 text-gray-600">
              <FacebookIcon size={18} className="cursor-pointer hover:text-[#f59e0b] transition-colors" />
              <TwitterIcon size={18} className="cursor-pointer hover:text-[#f59e0b] transition-colors" />
              <LinkedinIcon size={18} className="cursor-pointer hover:text-[#f59e0b] transition-colors" />
            </div>
          </div>

          <figure className="my-8">
            <img
              src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1200"
              alt="Water conservation efforts"
              className="w-full h-auto max-h-[400px] object-cover rounded-md"
            />
          </figure>

          <p className="text-xl font-bold font-sans leading-snug mb-8 text-[#1e3a5f]">
            Through the coordinated efforts of SARRA and local communities, multiple drying springs have shown increased discharge levels ahead of the monsoon season.
          </p>

          <div className="space-y-6 text-lg leading-relaxed text-gray-800">
            <p>
              In the context of accelerating climate change, the natural water sources of Uttarakhand — rivers, streams (Dhara), traditional step-wells (Naula), and seasonal rivulets (Gadhera) — are being severely impacted. Human lives, forests, and wildlife across the Himalayan state are all bearing the consequences.
            </p>
            <p>
              To address this critical challenge, the Government of Uttarakhand took an ambitious step and established the Spring and River Rejuvenation Authority (SARRA) — a pioneering initiative of its kind. Through this authority, a unified programme of restoration and management of all natural water sources has been launched, powered by public participation and coordinated effort across multiple government departments.
            </p>

            <figure className="my-10">
              <img
                src="https://images.unsplash.com/photo-1543872084-c7bd3822856f?auto=format&fit=crop&q=80&w=1200"
                alt="Community meeting"
                className="w-full h-auto max-h-[400px] object-cover rounded-md"
              />
              <figcaption className="text-xs text-gray-500 mt-2 italic font-sans">
                Local community members participate in a Jal Sanrakshan Abhiyan workshop • SARRA Media
              </figcaption>
            </figure>

            <p>
              Recent data collected from the pilot districts shows a remarkable recovery in the water table. "It was a combined effort," a local official stated. "The community's involvement in maintaining the trenches and check dams was crucial to capturing the winter precipitation."
            </p>
            <p>
              To transform this into a true people's movement, the "Jal Sanrakshan Abhiyan 2025" was launched under the theme "Dhara mera, Naula mera, Gaon mera, Prayas mera" — meaning "My stream, my step-well, my village, my effort." With these early successes, the initiative is now being expanded to all 13 districts of the state.
            </p>
          </div>
        </main>

        {/* --- SIDEBAR COLUMN (Right) --- */}
        <aside className="lg:w-1/3 space-y-12 font-sans mt-8 lg:mt-0">

          {/* Latest Reports Section */}
          <section>
            <h3 className="text-sm font-bold border-b-2 border-[#1e3a5f] pb-1 mb-4 flex justify-between items-center text-[#1e3a5f]">
              Latest Reports <span className="text-gray-400 font-normal">›</span>
            </h3>
            <div className="space-y-4">
              <SidebarTeaser
                title="Annual Water Resource Assessment 2025: Key Findings"
                img="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=150"
              />
              <SidebarTeaser
                title="Community Guidelines for Naula Restoration Projects"
                img="https://images.unsplash.com/photo-1505503462940-27ceaf9af8db?auto=format&fit=crop&q=80&w=150"
              />
            </div>
          </section>

          {/* District Progress Table Section */}
          <section>
            <h3 className="text-sm font-bold text-[#f59e0b] border-b-2 border-[#f59e0b] pb-1 mb-4">
              District Progress (Spring Mapping)
            </h3>
            <div className="text-[11px]">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-500 text-left">
                    <th className="py-1.5 font-normal">Rank</th>
                    <th className="py-1.5 font-normal">District</th>
                    <th className="py-1.5 text-right font-normal">Target</th>
                    <th className="py-1.5 text-right font-normal w-12">Done</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { pos: 1, name: 'Pauri Garhwal', p: '100%', pts: '100%' },
                    { pos: 2, name: 'Almora', p: '100%', pts: '95%' },
                    { pos: 3, name: 'Tehri Garhwal', p: '100%', pts: '92%' },
                    { pos: 4, name: 'Nainital', p: '100%', pts: '88%' },
                    { pos: 5, name: 'Dehradun', p: '100%', pts: '85%' },
                    { pos: 6, name: 'Champawat', p: '100%', pts: '82%' },
                    { pos: 7, name: 'Pithoragarh', p: '100%', pts: '79%' },
                  ].map((team) => (
                    <tr key={team.pos} className="border-b border-gray-50">
                      <td className="py-2 w-8 text-gray-400">{team.pos}</td>
                      <td className="py-2 font-bold text-[#1e3a5f]">{team.name}</td>
                      <td className="py-2 text-right text-gray-400">{team.p}</td>
                      <td className="py-2 text-right font-bold w-12 text-emerald-600">{team.pts}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Most Read Section */}
          <section>
            <h3 className="text-sm font-bold border-b-2 border-[#1e3a5f] pb-1 mb-4 text-[#1e3a5f]">
              Most read in Environment
            </h3>
            <div className="space-y-6">
              <MostReadItem
                category="Policies"
                title="State Government Unveils Comprehensive Water Security Plan"
                date="6 MAY 2026"
                read="2 min read"
              />
              <MostReadItem
                category="Technology"
                title="How Satellite Imaging Is Transforming Water Mapping In 2025"
                date="5 MAY 2026"
                read="7 min read"
              />
              <MostReadItem
                category="Community"
                title="Local Villages Participate in Naula Restoration"
                date="2 MAY 2026"
                read="5 min read"
              />
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
};

/* --- UI Components --- */

const SidebarTeaser = ({ title, img }) => (
  <div className="flex gap-3 group cursor-pointer">
    <img src={img} className="w-16 h-12 object-cover bg-gray-100 rounded-sm" alt="" />
    <h4 className="text-xs font-bold leading-snug text-slate-800 transition-colors group-hover:text-[#f59e0b]">{title}</h4>
  </div>
);

const MostReadItem = ({ category, title, date, read }) => (
  <div className="border-b border-gray-100 pb-4 last:border-0 group cursor-pointer">
    <span className="text-[10px] font-bold text-[#f59e0b] uppercase tracking-tighter">{category}</span>
    <h4 className="text-sm font-bold leading-tight mt-1 text-[#1e3a5f] transition-colors group-hover:text-[#f59e0b]">{title}</h4>
    <div className="text-[10px] text-gray-400 mt-2 flex gap-2">
      <span>{date}</span>
      <span>•</span>
      <span>{read}</span>
    </div>
  </div>
);

export default ArticlePage;
