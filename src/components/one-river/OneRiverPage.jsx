'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Mountain, Droplet, MapPin, ChevronRight, ChevronLeft, X } from 'lucide-react';

const IMG = {
  hero: '/assets/one_river/banner.png',
};

const riverImages = [
  { image: '/assets/one_river/Jata Ganga.png', title: 'Jata Ganga' },
  { image: '/assets/one_river/gaur ganga.jpg.jpeg', title: 'Gaur Ganga' },
  { image: '/assets/one_river/Gaudi.png', title: 'Gaudi' },
  { image: '/assets/one_river/Shipra.jpg.jpeg', title: 'Shipra' },
  { image: '/assets/one_river/Poorvi Ramganga.webp', title: 'Poorvi Ramganga' },
  { image: '/assets/one_river/fika us nagar.jpeg', title: 'Fika Us Nagar' },
  { image: '/assets/one_river/chandrabhaga chmoli.jpeg', title: 'Chandrabhaga Chmoli' },
  { image: '/assets/one_river/Song.jpg.jpeg', title: 'Song' },
  { image: '/assets/one_river/pathari haridwar.jpeg', title: 'Pathari Haridwar' },
  { image: '/assets/one_river/Nayar.png', title: 'Nayar' },
  { image: '/assets/one_river/punaar rudraprayag.jpeg', title: 'Punaar Rudraprayag' },
  { image: '/assets/one_river/kamal ganga.jpg.jpeg', title: 'Kamal Ganga' },
];

const getRiverImage = (riverName) => {
  const mapping = {
    'Jata Ganga': 'Jata Ganga',
    'Garud Ganga': 'Gaur Ganga',
    'Gaudi River': 'Gaudi',
    'Shipra River': 'Shipra',
    'Purvi Ramganga': 'Poorvi Ramganga',
    'Fika River': 'Fika Us Nagar',
    'Chandra Bhaga': 'Chandrabhaga Chmoli',
    'Song River': 'Song',
    'Pathari River': 'Pathari Haridwar',
    'Nayar (East & West)': 'Nayar',
    'Punaar Nadi': 'Punaar Rudraprayag',
    'Kamal Nadi': 'Kamal Ganga',
  };
  const title = mapping[riverName] || riverName;
  return riverImages.find(img => img.title === title)?.image || null;
};

// Full watershed data from KMZ (ODOR05062026.kmz → doc.kml)
const WATERSHED_DATA = {
  'Jata Ganga Watershed': {
    code: '2B3G5', surfaceArea: '88.247 sq km', subCatchment: '2B3G',
    swsNo: 3, mwsNo: 16,
    swsCodes: '2B3G5k, 2B3G5j',
    ongoingWorks: 1, ongoingNames: 'Jata Ganga SWS',
    minElev: 599, avgElev: 1721.51, maxElev: 2336,
    minElevCoord: '79.9712°E, 29.6409°N',
    maxElevCoord: '79.8695°E, 29.6512°N',
    maxSlopeDeg: 61.04, maxSlopePct: 180.69,
    avgSlopeDeg: 22.59, avgSlopePct: 41.61,
    avgAspect: 'SE (136°)', closed: 'YES',
  },
  'Garud Ganga Watershed': {
    code: '2B3G6', surfaceArea: '88.746 sq km', subCatchment: '2B3G',
    swsNo: 2, mwsNo: 10,
    swsCodes: '2B3G6v',
    ongoingWorks: 0, ongoingNames: '—',
    minElev: 1074, avgElev: 1601.66, maxElev: 2466,
    minElevCoord: '79.6269°E, 29.9027°N',
    maxElevCoord: '79.5108°E, 29.8733°N',
    maxSlopeDeg: 60.99, maxSlopePct: 180.34,
    avgSlopeDeg: 21.23, avgSlopePct: 38.84,
    avgAspect: 'NE (52°)', closed: 'YES',
  },
  'Shipra River Watershed': {
    code: '2B7B8', surfaceArea: '93.633 sq km', subCatchment: '2B7B',
    swsNo: 2, mwsNo: 15,
    swsCodes: '2B7B8n, 2B7B8m, 2B7B8p',
    ongoingWorks: 2, ongoingNames: 'Shipra River SWS, 1 Amrit Sarovar',
    minElev: 844, avgElev: 1683.33, maxElev: 2623,
    minElevCoord: '79.4811°E, 29.5039°N',
    maxElevCoord: '79.4374°E, 29.4077°N',
    maxSlopeDeg: 63.61, maxSlopePct: 201.58,
    avgSlopeDeg: 27.47, avgSlopePct: 51.99,
    avgAspect: 'N (20°)', closed: 'YES',
  },
  'Gaudi River Watershed': {
    code: '2B3G3', surfaceArea: '43.439 sq km', subCatchment: '2B3G',
    swsNo: 1, mwsNo: 6,
    swsCodes: '2B3G3m',
    ongoingWorks: 2, ongoingNames: 'Gaudi SWS, Kalsan SWS',
    minElev: 1358, avgElev: 1706.71, maxElev: 2159,
    minElevCoord: '80.1289°E, 29.3572°N',
    maxElevCoord: '80.1300°E, 29.3071°N',
    maxSlopeDeg: 54.28, maxSlopePct: 139.06,
    avgSlopeDeg: 15.50, avgSlopePct: 27.74,
    avgAspect: 'E (79°)', closed: 'YES',
  },
  'Ramganga East Watershed': {
    code: '2B3G9, 2B3G8', surfaceArea: '1609.8 sq km', subCatchment: '2B3G',
    swsNo: 34, mwsNo: 273,
    swsCodes: '2B3G9p, 2B3G9h, 2B3G9k, 2B3G9j, 2B3G9n … (34 SWS)',
    ongoingWorks: 3, ongoingNames: 'Titar Gad, Ghati Gad, Gurghatiya Gad',
    minElev: 477, avgElev: 1785.20, maxElev: 6006,
    minElevCoord: '80.1079°E, 29.5316°N',
    maxElevCoord: '80.0968°E, 30.2262°N',
    maxSlopeDeg: 74.81, maxSlopePct: 368.23,
    avgSlopeDeg: 28.48, avgSlopePct: 54.24,
    avgAspect: 'SE (155°)', closed: 'YES',
  },
  'Eastern Nayar Watershed': {
    code: '2B6E3', surfaceArea: '1107.6 sq km', subCatchment: '2B6E',
    swsNo: 26, mwsNo: 147,
    swsCodes: '2B6E3d, 2B6E3u, 2B6E3m, 2B6E3n … (26 SWS)',
    ongoingWorks: 0, ongoingNames: '—',
    minElev: 541, avgElev: 1646.35, maxElev: 3082,
    minElevCoord: '78.7078°E, 29.9265°N',
    maxElevCoord: '79.1931°E, 30.0801°N',
    maxSlopeDeg: 68.69, maxSlopePct: 256.33,
    avgSlopeDeg: 26.39, avgSlopePct: 49.61,
    avgAspect: 'W (266°)', closed: 'YES',
  },
  'Western Nayar Watershed': {
    code: '2B6E2', surfaceArea: '850.69 sq km', subCatchment: '2B6E',
    swsNo: 21, mwsNo: 115,
    swsCodes: '2B6E2n, 2B6E2v, 2B6E2r … (21 SWS)',
    ongoingWorks: 2, ongoingNames: 'Ir Gad, Siul Gad',
    minElev: 549, avgElev: 1652.44, maxElev: 3004,
    minElevCoord: '78.7131°E, 29.9311°N',
    maxElevCoord: '79.1005°E, 30.2110°N',
    maxSlopeDeg: 66.29, maxSlopePct: 227.75,
    avgSlopeDeg: 26.04, avgSlopePct: 48.86,
    avgAspect: 'NW (294°)', closed: 'YES',
  },
  'Song River Watershed': {
    code: '2B6D8, 2C7A4', surfaceArea: '1118.5 sq km', subCatchment: '2B6D, 2C7A',
    swsNo: 29, mwsNo: 148,
    swsCodes: '2B6D8d, 2B6D8h, 2B6D8x … (29 SWS)',
    ongoingWorks: 2, ongoingNames: 'Song SWS (Tehri), Gadool River',
    minElev: 281, avgElev: 902.23, maxElev: 2747,
    minElevCoord: '78.2448°E, 30.0251°N',
    maxElevCoord: '78.2879°E, 30.4113°N',
    maxSlopeDeg: 68.31, maxSlopePct: 251.37,
    avgSlopeDeg: 14.83, avgSlopePct: 26.47,
    avgAspect: 'S (178°)', closed: 'YES',
  },
  'Pathari River Watershed': {
    code: '2B6D5, 2B6D3', surfaceArea: '259.78 sq km', subCatchment: '2B6D',
    swsNo: 8, mwsNo: 45,
    swsCodes: '2B6D5k, 2B6D3d, 2B6D5n … (8 SWS)',
    ongoingWorks: 0, ongoingNames: '—',
    minElev: 211, avgElev: 304.95, maxElev: 734,
    minElevCoord: '78.0614°E, 29.7430°N',
    maxElevCoord: '78.0954°E, 30.0125°N',
    maxSlopeDeg: 48.02, maxSlopePct: 111.13,
    avgSlopeDeg: 7.25, avgSlopePct: 12.73,
    avgAspect: 'S (194°)', closed: 'YES',
  },
  'Kamal Ganaga Watershed': {
    code: '2C7A6', surfaceArea: '246.18 sq km', subCatchment: '2C7A',
    swsNo: 10, mwsNo: 39,
    swsCodes: '2C7A6f, 2C7A6h, 2C7A6g, 2C7A6j, 2C7A6k',
    ongoingWorks: 0, ongoingNames: '—',
    minElev: 1022, avgElev: 1893.88, maxElev: 3184,
    minElevCoord: '78.1219°E, 30.7864°N',
    maxElevCoord: '78.1802°E, 30.9666°N',
    maxSlopeDeg: 65.91, maxSlopePct: 223.66,
    avgSlopeDeg: 25.09, avgSlopePct: 46.82,
    avgAspect: 'N (2°)', closed: 'YES',
  },
  'Chandrabhaga River Watershed': {
    code: '2B6H1', surfaceArea: '21.212 sq km', subCatchment: '2B6H',
    swsNo: 1, mwsNo: 3,
    swsCodes: '2B6H1c',
    ongoingWorks: 1, ongoingNames: 'Chandrabhaga WS',
    minElev: 744, avgElev: 1366.12, maxElev: 2109,
    minElevCoord: '79.2314°E, 30.2767°N',
    maxElevCoord: '79.2174°E, 30.3221°N',
    maxSlopeDeg: 62.14, maxSlopePct: 189.22,
    avgSlopeDeg: 31.02, avgSlopePct: 60.13,
    avgAspect: 'SE (149°)', closed: 'YES',
  },
  'Punad Gad Watershed': {
    code: '2B6G4', surfaceArea: '50.98 sq km', subCatchment: '2B6G',
    swsNo: 1, mwsNo: 5,
    swsCodes: '2B6G4a',
    ongoingWorks: 1, ongoingNames: 'Punad WS',
    minElev: 609, avgElev: 1701.89, maxElev: 2833,
    minElevCoord: '78.9822°E, 30.2880°N',
    maxElevCoord: '79.0372°E, 30.2457°N',
    maxSlopeDeg: 66.47, maxSlopePct: 229.66,
    avgSlopeDeg: 31.88, avgSlopePct: 62.19,
    avgAspect: 'NW (316°)', closed: 'YES',
  },
  'Fika River Watershed': {
    code: '2B7C4, 2B7B5, 2B7B6, 2B7C3', surfaceArea: '213.58 sq km', subCatchment: '2B7C, 2B7B',
    swsNo: 20, mwsNo: 68,
    swsCodes: '2B7C4u, 2B7B5n, 2B7B6p … (20 SWS)',
    ongoingWorks: 0, ongoingNames: '—',
    minElev: 210, avgElev: 334.58, maxElev: 908,
    minElevCoord: '78.7740°E, 29.2643°N',
    maxElevCoord: '79.0049°E, 29.5150°N',
    maxSlopeDeg: 46.98, maxSlopePct: 107.16,
    avgSlopeDeg: 7.06, avgSlopePct: 12.39,
    avgAspect: 'S (194°)', closed: 'YES',
  },
};

const DISTRICT_DATA = [
  {
    region: 'KUMAON',
    sr: '1.', district: 'Almora', river: 'Jata Ganga',
    watershed: 'Jata Ganga Watershed',
    lat: 29.617788, lng: 79.884677,
    color: '#7280FB', fill: 'rgba(114,128,251,0.55)',
    description: 'Flows through the sacred hills of Almora district'
  },
  {
    region: 'KUMAON',
    sr: '2.', district: 'Bageshwar', river: 'Garud Ganga',
    watershed: 'Garud Ganga Watershed',
    lat: 29.886732, lng: 79.563495,
    color: '#B180BC', fill: 'rgba(177,128,188,0.55)',
    description: 'Sacred river of Bageshwar with perennial flow'
  },
  {
    region: 'KUMAON',
    sr: '3.', district: 'Champawat', river: 'Gaudi River',
    watershed: 'Gaudi River Watershed',
    lat: 29.322881, lng: 80.095356,
    color: '#69DEB3', fill: 'rgba(105,222,179,0.55)',
    description: 'River rejuvenation in eastern Kumaon'
  },
  {
    region: 'KUMAON',
    sr: '4.', district: 'Nainital', river: 'Shipra River',
    watershed: 'Shipra River Watershed',
    lat: 29.446003, lng: 79.478694,
    color: '#B3FFFF', fill: 'rgba(179,255,255,0.55)',
    description: 'Vital water source for Nainital district'
  },
  {
    region: 'KUMAON',
    sr: '5.', district: 'Pithoragarh', river: 'Purvi Ramganga',
    watershed: 'Ramganga East Watershed',
    lat: 29.845337, lng: 80.146835,
    color: '#C7D38D', fill: 'rgba(199,211,141,0.55)',
    description: 'Eastern Ramganga basin in high altitude terrain'
  },
  {
    region: 'KUMAON',
    sr: '6.',
    district: 'Udham Singh Nagar',
    river: 'Fika River',
    watershed: 'Fika River Watershed',
    lat: 29.3322,
    lng: 78.8664,
    color: '#BEBADA',
    fill: 'rgba(190,186,218,0.55)',
    description: 'The watershed supports agriculture, groundwater recharge, wetlands, and local biodiversity before contributing to the larger Ramganga river system.'
  },
  // GARHWAL
  {
    region: 'GARHWAL',
    sr: '1.', district: 'Chamoli', river: 'Chandra Bhaga',
    watershed: 'Chandrabhaga River Watershed',
    lat: 30.296876, lng: 79.225259,
    color: '#0293F7', fill: 'rgba(2,147,247,0.35)',
    description: 'High altitude river in the Garhwal Himalayas'
  },
  {
    region: 'GARHWAL',
    sr: '2.', district: 'Dehradun', river: 'Song River',
    watershed: 'Song River Watershed',
    lat: 30.258948, lng: 78.140235,
    color: '#F7C262', fill: 'rgba(247,194,98,0.55)',
    description: 'Major tributary of the Ganges in Dehradun valley'
  },
  {
    region: 'GARHWAL',
    sr: '3.', district: 'Haridwar', river: 'Pathari River',
    watershed: 'Pathari River Watershed',
    lat: 29.941526, lng: 78.064637,
    color: '#DABABE', fill: 'rgba(218,186,190,0.55)',
    description: 'River conservation in the gateway to the Himalayas'
  },
  {
    region: 'GARHWAL',
    sr: '4.', district: 'Pauri Garhwal', river: 'Nayar (East & West)',
    watershed: 'Eastern Nayar Watershed',
    lat: 29.934517, lng: 78.968617,
    color: '#CCEBCC', fill: 'rgba(204,235,204,0.55)',
    description: 'Twin rivers rejuvenation project in Pauri'
  },
  {
    region: 'GARHWAL',
    sr: '5.', district: 'Rudraprayag', river: 'Punaar Nadi',
    watershed: 'Punad Gad Watershed',
    lat: 30.244734, lng: 79.008431,
    color: '#E5CDFC', fill: 'rgba(229,205,252,0.55)',
    description: 'Sacred waters of Rudraprayag district'
  },
  {
    region: 'GARHWAL',
    sr: '6.', district: 'Tehri', river: 'Song River',
    watershed: 'Song River Watershed',
    lat: 30.258948, lng: 78.140235,
    color: '#F7C262', fill: 'rgba(247,194,98,0.55)',
    description: 'Song River conservation in Tehri district'
  },
  {
    region: 'GARHWAL',
    sr: '7.', district: 'Uttarkashi', river: 'Kamal Nadi',
    watershed: 'Kamal Ganaga Watershed',
    lat: 30.875950, lng: 78.063113,
    color: '#80D3D3', fill: 'rgba(128,211,211,0.55)',
    description: 'River in the land of ancient temples'
  },
];

const KUMAON_DATA = DISTRICT_DATA.filter(d => d.region === 'KUMAON');
const GARHWAL_DATA = DISTRICT_DATA.filter(d => d.region === 'GARHWAL');

const WATERSHED_ALIASES = {
  'Fika River Watershed': ['Phica River Watershed', 'Fika River WS', 'Phica River WS'],
};

const MAP_DISTRICT_DATA = DISTRICT_DATA.flatMap((data) => {
  if (data.watershed !== 'Eastern Nayar Watershed') return [data];

  return [
    data,
    {
      ...data,
      watershed: 'Western Nayar Watershed',
      lat: 30.064782,
      lng: 78.915604,
      description: 'Western Nayar watershed conservation project in Pauri Garhwal.',
    },
  ];
});

const normalizeMapText = (value = '') => value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

const getWatershedCodes = (data) => {
  const ws = WATERSHED_DATA[data.watershed];
  return [ws?.code, ws?.swsCodes]
    .filter(Boolean)
    .flatMap(value => value.split(','))
    .map(value => value.trim().toLowerCase())
    .filter(Boolean);
};

// ─── Watershed Info Modal ─────────────────────────────────────────────────────
function WatershedModal({ districtData, onClose }) {
  const ws = WATERSHED_DATA[districtData.watershed] || null;
  const riverImgUrl = getRiverImage(districtData.river);
  const [isImageEnlarged, setIsImageEnlarged] = useState(false);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') {
        if (isImageEnlarged) setIsImageEnlarged(false);
        else onClose();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose, isImageEnlarged]);

  const StatBox = ({ label, value, unit }) => (
    <div className="flex flex-col gap-0.5 bg-white/60 rounded-xl p-3 border border-blue-100">
      <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">{label}</span>
      <span className="text-[15px] font-bold text-[#0a3055]">{value}<span className="text-[11px] font-normal text-gray-500 ml-1">{unit}</span></span>
    </div>
  );

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ background: 'rgba(10,48,85,0.55)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl"
        style={{
          background: 'linear-gradient(145deg, #f0f7ff 0%, #ffffff 60%, #f5f0ff 100%)',
          border: '1.5px solid rgba(10,48,85,0.12)',
          animation: 'wsModalIn 0.28s cubic-bezier(0.16,1,0.3,1) forwards',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="relative px-7 pt-7 pb-5 rounded-t-3xl overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #0a3055 0%, #1e4d8c 60%, #0f6b9e 100%)' }}
        >
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'radial-gradient(circle at 70% 50%, #60a5fa 0%, transparent 60%)' }} />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-all"
            style={{ background: 'rgba(255,255,255,0.15)' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(245,158,11,0.8)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
          >
            <X size={18} className="text-white" />
          </button>

          <div className="flex items-start gap-4">
            {riverImgUrl ? (
              <div
                className="w-16 h-16 rounded-xl overflow-hidden shrink-0 mt-1 cursor-pointer border-2 border-white/20 hover:border-white/50 transition-all shadow-md group relative"
                onClick={() => setIsImageEnlarged(true)}
              >
                <img src={riverImgUrl} alt={districtData.river} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
              </div>
            ) : (
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 mt-1"
                style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)' }}>
                <Droplet size={22} className="text-[#60d8f5]" fill="rgba(96,216,245,0.5)" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="text-[11px] font-bold uppercase tracking-[2px] text-blue-200 mb-1">{districtData.region} Region</div>
              <h2 className="text-2xl font-bold text-white leading-tight mb-1">{districtData.river}</h2>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="inline-flex items-center gap-1.5 text-[11px] bg-white/15 text-blue-100 rounded-full px-3 py-1 font-medium">
                  <MapPin size={10} /> {districtData.district}
                </span>
                <span className="inline-flex items-center gap-1.5 text-[11px] bg-white/15 text-blue-100 rounded-full px-3 py-1 font-medium">
                  {districtData.watershed}
                </span>
                {ws && (
                  <span className="inline-flex items-center gap-1.5 text-[11px] bg-[#f59e0b]/30 text-yellow-200 rounded-full px-3 py-1 font-medium border border-yellow-300/20">
                    Code: {ws.code}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="px-7 py-5 flex flex-col gap-5">
          <p className="text-[13px] text-gray-600 leading-relaxed bg-blue-50 rounded-2xl px-4 py-3 border border-blue-100">
            {districtData.description}
          </p>

          {ws ? (
            <>
              {/* Key Stats Grid */}
              <div>
                <div className="text-[11px] font-bold uppercase tracking-widest text-[#0a3055] mb-3 flex items-center gap-2">
                  <div className="w-4 h-0.5 bg-[#0a3055] rounded" />
                  Key Statistics
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <StatBox label="Surface Area" value={ws.surfaceArea.split(' ')[0]} unit="sq km" />
                  <StatBox label="SWS Count" value={ws.swsNo} unit="units" />
                  <StatBox label="MWS Count" value={ws.mwsNo} unit="units" />
                  <StatBox label="Ongoing Works" value={ws.ongoingWorks} unit="projects" />
                </div>
              </div>

              {/* Elevation */}
              <div>
                <div className="text-[11px] font-bold uppercase tracking-widest text-[#0a3055] mb-3 flex items-center gap-2">
                  <div className="w-4 h-0.5 bg-[#0a3055] rounded" />
                  Elevation Profile
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4 border border-blue-100">
                  <div className="flex items-end gap-3 mb-4">
                    {[
                      { label: 'Min', value: ws.minElev, color: '#34d399', h: '30%' },
                      { label: 'Avg', value: Math.round(ws.avgElev), color: '#60a5fa', h: '60%' },
                      { label: 'Max', value: ws.maxElev, color: '#f87171', h: '100%' },
                    ].map(({ label, value, color, h }) => (
                      <div key={label} className="flex-1 flex flex-col items-center gap-1">
                        <span className="text-[13px] font-bold text-[#0a3055]">{value.toLocaleString()} m</span>
                        <div className="w-full rounded-t-lg transition-all"
                          style={{ height: `${parseInt(h) * 0.5}px`, background: color, opacity: 0.85 }} />
                        <span className="text-[10px] text-gray-500 font-medium">{label}</span>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-gray-500">
                    <div className="flex flex-col gap-0.5">
                      <span className="font-semibold text-gray-600">Min Elev. Location</span>
                      <span className="font-mono text-[10px]">{ws.minElevCoord}</span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="font-semibold text-gray-600">Max Elev. Location</span>
                      <span className="font-mono text-[10px]">{ws.maxElevCoord}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Slope & Aspect */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-widest text-[#0a3055] mb-3 flex items-center gap-2">
                    <div className="w-4 h-0.5 bg-[#0a3055] rounded" />
                    Slope Data
                  </div>
                  <div className="bg-white/60 rounded-2xl p-4 border border-blue-100 flex flex-col gap-3">
                    {[
                      { label: 'Max Slope', deg: ws.maxSlopeDeg, pct: ws.maxSlopePct },
                      { label: 'Avg Slope', deg: ws.avgSlopeDeg, pct: ws.avgSlopePct },
                    ].map(({ label, deg, pct }) => (
                      <div key={label}>
                        <div className="flex justify-between text-[11px] mb-1">
                          <span className="font-semibold text-gray-600">{label}</span>
                          <span className="font-bold text-[#0a3055]">{deg}° / {pct}%</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-blue-100 overflow-hidden">
                          <div className="h-full rounded-full bg-gradient-to-r from-[#0a3055] to-[#0f6b9e]"
                            style={{ width: `${Math.min((deg / 90) * 100, 100)}%` }} />
                        </div>
                      </div>
                    ))}
                    <div className="flex items-center gap-2 mt-1 pt-1 border-t border-gray-100">
                      <Mountain size={14} className="text-[#0a3055]" />
                      <span className="text-[12px] font-medium text-gray-700">
                        Avg Aspect: <strong>{ws.avgAspect}</strong>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Sub-catchment & Codes */}
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-widest text-[#0a3055] mb-3 flex items-center gap-2">
                    <div className="w-4 h-0.5 bg-[#0a3055] rounded" />
                    Catchment Info
                  </div>
                  <div className="bg-white/60 rounded-2xl p-4 border border-blue-100 flex flex-col gap-2.5 h-full">
                    <div>
                      <span className="text-[10px] text-gray-400 uppercase font-semibold tracking-wider">Sub-Catchment</span>
                      <p className="text-[13px] font-bold text-[#0a3055] font-mono mt-0.5">{ws.subCatchment}</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400 uppercase font-semibold tracking-wider">SWS Codes</span>
                      <p className="text-[11px] text-gray-600 mt-0.5 leading-relaxed font-mono break-all">{ws.swsCodes}</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400 uppercase font-semibold tracking-wider">Closed Watershed</span>
                      <span className={`inline-block mt-0.5 text-[11px] font-bold px-2 py-0.5 rounded-full ${ws.closed === 'YES' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                        {ws.closed}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ongoing Works */}
              {ws.ongoingWorks > 0 && (
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-4 border border-emerald-100 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500 flex items-center justify-center shrink-0">
                    <span className="text-white font-bold text-[13px]">{ws.ongoingWorks}</span>
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">Ongoing Works</div>
                    <div className="text-[13px] text-gray-700 mt-0.5 font-medium">{ws.ongoingNames}</div>
                  </div>
                </div>
              )}

              {/* Coordinates */}
              <div className="flex items-center gap-2 text-[11px] text-gray-400 font-mono bg-gray-50 rounded-xl px-4 py-2.5 border border-gray-100">
                <MapPin size={12} className="text-gray-400 shrink-0" />
                Label Position: {districtData.lat.toFixed(4)}°N, {districtData.lng.toFixed(4)}°E
              </div>
            </>
          ) : (
            <div className="text-center py-8 text-gray-400 text-sm">
              Detailed watershed data not available
            </div>
          )}
        </div>
      </div>

      {/* Enlarged Image Lightbox */}
      {isImageEnlarged && riverImgUrl && (
        <div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 transition-all"
          onClick={(e) => { e.stopPropagation(); setIsImageEnlarged(false); }}
        >
          <button
            className="absolute top-4 right-4 md:top-8 md:right-8 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
            onClick={(e) => { e.stopPropagation(); setIsImageEnlarged(false); }}
          >
            <X size={24} />
          </button>
          <img
            src={riverImgUrl}
            alt={districtData.river}
            className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl scale-in-center"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <style>{`
        @keyframes wsModalIn {
          from { opacity: 0; transform: scale(0.94) translateY(16px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes scaleInCenter {
          from { opacity: 0; transform: scale(0.95); }
          to   { opacity: 1; transform: scale(1); }
        }
        .scale-in-center { animation: scaleInCenter 0.25s cubic-bezier(0.16,1,0.3,1) forwards; }
      `}</style>
    </div>
  );
}

// ─── Interactive Map ──────────────────────────────────────────────────────────
function InteractiveMap({ focusDistrict, onDistrictSelect }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const layersRef = useRef({});
  const [mapLoaded, setMapLoaded] = useState(false);

  // Tooltip HTML (lightweight, no popup)
  const createTooltipHTML = (data) => `
    <div style="font-family:system-ui;padding:2px 0;">
      <b style="font-size:13px;color:#0a3055;">${data.district}</b><br/>
      <span style="color:#0ea5e9;font-size:12px;">🌊 ${data.river}</span><br/>
      <span style="font-size:10px;color:#888;">${data.watershed}</span>
    </div>`;

  const addUttarakhandBoundary = (map, L) => {
    fetch('/assets/one_river/Uk_Boundary.kml')
      .then(r => { if (!r.ok) throw new Error('Boundary KML not found'); return r.text(); })
      .then(kmlText => {
        const parser = new DOMParser();
        const kmlDoc = parser.parseFromString(kmlText, 'text/xml');
        let placemarks = kmlDoc.getElementsByTagName('Placemark');
        if (!placemarks || placemarks.length === 0)
          placemarks = kmlDoc.getElementsByTagNameNS('*', 'Placemark');

        Array.from(placemarks).forEach((placemark) => {
          let coordsNodes = placemark.getElementsByTagName('coordinates');
          if (!coordsNodes || coordsNodes.length === 0)
            coordsNodes = placemark.getElementsByTagNameNS('*', 'coordinates');

          Array.from(coordsNodes).forEach(node => {
            const coordsText = node.textContent.trim();
            const coordPairs = coordsText.split(/\s+/);
            const latLngs = coordPairs.map(pair => {
              const [lng, lat] = pair.split(',');
              return [parseFloat(lat), parseFloat(lng)];
            }).filter(ll => !isNaN(ll[0]) && !isNaN(ll[1]));

            if (latLngs.length > 0) {
              L.polygon(latLngs, {
                color: '#0a3055', weight: 2.5, dashArray: '10, 5',
                fillColor: 'transparent', interactive: false,
              }).addTo(map);
            }
          });
        });
      })
      .catch(err => console.error('Error loading boundary:', err));
  };

  const loadKMZ = async (map, L) => {
    try {
      const response = await fetch('/assets/one_river/ODOR05062026.kmz');
      if (!response.ok) throw new Error('KMZ fetch failed');
      const arrayBuffer = await response.arrayBuffer();

      const JSZip = window.JSZip;
      const zip = new JSZip();
      await zip.loadAsync(arrayBuffer);

      let kmlContent = null;
      for (const filename of Object.keys(zip.files)) {
        if (filename.endsWith('.kml')) {
          kmlContent = await zip.files[filename].async('string');
          break;
        }
      }

      if (!kmlContent) throw new Error('No KML found inside KMZ');
      parseAndRenderKML(kmlContent, map, L);
    } catch (err) {
      console.error('KMZ load error:', err);
      renderFallbackMarkers(map, L);
    }
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let isMounted = true;

    const loadDependencies = async () => {
      try {
        const L_module = await import('leaflet');
        const L = L_module.default || L_module;
        await import('leaflet/dist/leaflet.css');

        const JSZip_module = await import('jszip');
        const JSZip = JSZip_module.default || JSZip_module;

        if (!isMounted) return;

        window.L = L;
        window.JSZip = JSZip;
        initMap();
      } catch (err) {
        console.error('Failed to load map modules:', err);
        if (isMounted) setMapLoaded(true);
      }
    };

    loadDependencies();

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  const initMap = () => {
    if (!mapRef.current || !window.L) return;
    if (mapInstanceRef.current) {
      setMapLoaded(true);
      return;
    }

    const L = window.L;
    const map = L.map(mapRef.current, {
      center: [30.1, 79.0],
      zoom: 8,
      zoomControl: false,
      attributionControl: false,
      maxBounds: [[27.5, 76.0], [32.5, 82.0]],
      minZoom: 7,
    });

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', { maxZoom: 19 }).addTo(map);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png', { maxZoom: 19, opacity: 0.7 }).addTo(map);

    mapInstanceRef.current = map;
    addUttarakhandBoundary(map, L);
    loadKMZ(map, L);
    setMapLoaded(true);
  };

  const styleColors = {
    'area1': { fill: 'rgba(114,128,251,0.45)', stroke: '#543070' },
    'area2': { fill: 'rgba(211,177,128,0.45)', stroke: '#543070' },
    'area3': { fill: 'rgba(218,186,190,0.45)', stroke: '#543070' },
    'area4': { fill: 'rgba(98,180,253,0.45)', stroke: '#543070' },
    'area5': { fill: 'rgba(217,217,217,0.45)', stroke: '#543070' },
    'area6': { fill: 'rgba(197,235,204,0.45)', stroke: '#543070' },
    'area7': { fill: 'rgba(189,128,188,0.45)', stroke: '#543070' },
    'area8': { fill: 'rgba(105,222,179,0.45)', stroke: '#543070' },
    'area9': { fill: 'rgba(179,255,255,0.45)', stroke: '#543070' },
    'area10': { fill: 'rgba(199,211,141,0.45)', stroke: '#543070' },
    'area11': { fill: 'rgba(154,61,106,0.40)', stroke: '#543070' },
    'area12': { fill: 'rgba(229,205,252,0.45)', stroke: '#543070' },
    'area13': { fill: 'rgba(192,128,192,0.40)', stroke: '#543070' },
  };

  const parseAndRenderKML = (kmlText, map, L) => {
    const parser = new DOMParser();
    const kmlDoc = parser.parseFromString(kmlText, 'text/xml');
    const placemarks = kmlDoc.querySelectorAll('Placemark');
    const renderedLabels = new Set();

    const addRiverLabel = (data, lat, lng) => {
      const labelKey = `${data?.district}-${data?.watershed}`;
      if (!data || renderedLabels.has(labelKey)) return;

      const icon = L.divIcon({
        html: `<div style="font-size:11px;font-weight:800;color:#0a3055;text-shadow: 1px 1px 0 #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff;white-space:nowrap;cursor:pointer;display:flex;align-items:center;gap:4px;width:max-content;"><img src="/assets/icons/location.png" alt="" style="width:16px;height:16px;object-fit:contain;flex:0 0 auto;"/>${data.river}</div>`,
        className: '',
        iconSize: [180, 24],
        iconAnchor: [8, 16],
      });
      const marker = L.marker([lat, lng], { icon, interactive: true });
      marker.on('click', () => onDistrictSelect({ ...data, _openModal: true }));
      marker.addTo(map);
      renderedLabels.add(labelKey);
    };

    const findDistrictMatch = (placemark, name) => {
      const description = placemark.querySelector('description')?.textContent || '';
      const haystack = normalizeMapText(`${name} ${description}`);

      return MAP_DISTRICT_DATA.find(d => {
        const watershedNames = [d.watershed, ...(WATERSHED_ALIASES[d.watershed] || [])];
        const hasNameMatch = watershedNames.some(watershedName => haystack.includes(normalizeMapText(watershedName)));
        const hasRiverMatch = d.river !== 'Nayar (East & West)' && haystack.includes(normalizeMapText(d.river));
        const hasCodeMatch = getWatershedCodes(d).some(code => haystack.includes(normalizeMapText(code)));

        return hasNameMatch || hasRiverMatch || hasCodeMatch;
      });
    };

    placemarks.forEach((placemark) => {
      const name = placemark.querySelector('name')?.textContent?.trim() || '';
      const rawStyle = placemark.querySelector('styleUrl')?.textContent?.trim().replace('#', '') || 'area1';
      // handle stylemap (area13 → area13 normal style)
      const style = styleColors[rawStyle] || styleColors['area1'];

      const match = findDistrictMatch(placemark, name);

      const coordEls = placemark.querySelectorAll('Polygon outerBoundaryIs LinearRing coordinates');
      coordEls.forEach(coordEl => {
        const raw = coordEl.textContent.trim();
        const latlngs = raw.split(/\s+/).map(pt => {
          const parts = pt.split(',');
          if (parts.length >= 2) {
            const lng = parseFloat(parts[0]);
            const lat = parseFloat(parts[1]);
            if (!isNaN(lat) && !isNaN(lng)) return [lat, lng];
          }
          return null;
        }).filter(Boolean);

        if (latlngs.length < 3) return;

        const polygon = L.polygon(latlngs, {
          color: style.stroke,
          weight: 1.5,
          fillColor: style.fill.replace(/,\s*[\d.]+\)$/, ')').replace('rgba', 'rgb'),
          fillOpacity: 0.45,
          opacity: 0.85,
        });

        if (match) {
          polygon.bindTooltip(createTooltipHTML(match), {
            sticky: true, direction: 'top', offset: [0, -10],
            className: 'district-tooltip',
          });
        }

        polygon.on('mouseover', function () {
          this.setStyle({ weight: 2.5, fillOpacity: 0.68 });
          if (match) onDistrictSelect(match);
        });
        polygon.on('mouseout', function () {
          this.setStyle({ weight: 1.5, fillOpacity: 0.45 });
        });
        polygon.on('click', function () {
          if (match) onDistrictSelect({ ...match, _openModal: true });
        });

        polygon.addTo(map);
        if (match) layersRef.current[`${match.district}-${match.watershed}`] = polygon;
      });

      const pointEl = placemark.querySelector('Point coordinates');
      if (pointEl && match) {
        const pts = pointEl.textContent.trim().split(',');
        const lat = parseFloat(pts[1]);
        const lng = parseFloat(pts[0]);
        if (!isNaN(lat) && !isNaN(lng)) {
          addRiverLabel(match, lat, lng);
        }
      }

      if (match) addRiverLabel(match, match.lat, match.lng);
    });
  };

  const renderFallbackMarkers = (map, L) => {
    MAP_DISTRICT_DATA.forEach(d => {
      const marker = L.circleMarker([d.lat, d.lng], {
        radius: 10, fillColor: d.color, color: '#0a3055',
        weight: 2, opacity: 1, fillOpacity: 0.8,
      });
      marker.bindTooltip(createTooltipHTML(d), {
        permanent: false, direction: 'top', className: 'district-tooltip',
      });
      marker.on('click', () => onDistrictSelect({ ...d, _openModal: true }));
      marker.addTo(map);
      layersRef.current[`${d.district}-${d.watershed}`] = marker;
    });
  };

  useEffect(() => {
    if (!focusDistrict || !mapInstanceRef.current) return;

    mapInstanceRef.current.flyTo([focusDistrict.lat, focusDistrict.lng], 9, {
      duration: 1.2,
      easeLinearity: 0.25,
    });
  }, [focusDistrict]);

  return (
    <div className="relative w-[95%] mx-auto overflow-hidden border-y border-blue-100 rounded-2xl" style={{ height: '75vh', minHeight: '600px' }}>
      <div ref={mapRef} className="absolute inset-0 rounded-2xl" style={{ zIndex: 1 }} />

      <style dangerouslySetInnerHTML={{
        __html: `
          .district-tooltip {
            background: white !important;
            border: 1px solid rgba(10,48,85,0.12) !important;
            border-radius: 10px !important;
            padding: 8px 12px !important;
            box-shadow: 0 4px 20px rgba(0,0,0,0.12) !important;
          }
          .district-tooltip::before { border-top-color: white !important; }
        `,
      }} />


      <div className="absolute bottom-4 right-14 z-[400] bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2 shadow-sm border border-blue-100">
        <span className="text-[10px] text-gray-500 font-medium">🖱 Click a watershed for details</span>
      </div>

      {!mapLoaded && (
        <div className="absolute inset-0 z-[500] bg-[#f8fafc] flex items-center justify-center">
          <div className="text-center">
            <div className="w-10 h-10 border-4 border-blue-200 border-t-[#0a3055] rounded-full animate-spin mx-auto mb-3" />
            <p className="text-sm text-[#0a3055] font-medium">Loading interactive map…</p>
          </div>
        </div>
      )}

      {/* Title badge */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 z-[400]">
        <div className="bg-[#0a3055]/90 backdrop-blur-sm text-white text-[11px] font-bold px-4 py-1.5 rounded-full shadow-lg tracking-wide whitespace-nowrap">
          🗺 One District • One River
        </div>
      </div>
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden" style={{ minHeight: '480px' }}>
      <img src={IMG.hero} alt="One River One District Banner"
        className="absolute inset-0 w-full h-full object-cover" style={{ zIndex: 0 }} />
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(135deg, rgba(15,23,42,0.88) 0%, rgba(30,58,95,0.82) 50%, rgba(10,48,85,0.75) 100%)', zIndex: 1
      }} />
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 py-24 md:py-32">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white mb-4 tracking-tight leading-tight"
          style={{ textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}>
          One River <span className="text-[#f59e0b]">One District</span>
        </h1>
        <p className="text-white/80 text-lg md:text-xl max-w-2xl mb-8 font-light leading-relaxed">
          A flagship initiative for holistic rejuvenation and sustainable management of rivers.
        </p>
      </div>
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 60V30C240 0 480 0 720 30C960 60 1200 60 1440 30V60H0Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}

// ─── Content Section ──────────────────────────────────────────────────────────
function ContentSection() {
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [mapFocusDistrict, setMapFocusDistrict] = useState(null);
  const [modalDistrict, setModalDistrict] = useState(null);

  // When click (with _openModal flag) → open modal; hover → just highlight
  const handleDistrictSelect = (d) => {
    if (d && d._openModal) {
      const clean = { ...d };
      delete clean._openModal;
      setModalDistrict(clean);
      setSelectedDistrict(clean);
    } else {
      setSelectedDistrict(d);
    }
  };

  // Table row click → open modal
  const handleRowClick = (row) => {
    setSelectedDistrict(row);
    setMapFocusDistrict({ ...row });
    setModalDistrict(row);
  };

  return (
    <section className="w-full py-8 bg-white">
      <div className="w-full mb-8">
        <InteractiveMap focusDistrict={mapFocusDistrict} onDistrictSelect={handleDistrictSelect} />
      </div>

      <div className="w-full flex flex-col gap-6 max-w-[1100px] mx-auto px-4 md:px-8 lg:px-12">
        <div className="w-full flex flex-col lg:flex-row gap-6 h-full mt-4">
          {/* Kumaon Table */}
          <div className="w-full lg:w-1/2 flex flex-col">
            <div className="bg-[#4a7c29] rounded-t-xl py-6 flex items-center justify-center gap-3 relative overflow-hidden">
              <div className="absolute inset-0 opacity-20 bg-[url('/assets/one_river/banner.png')] bg-cover bg-center mix-blend-overlay"></div>
              <h3 className="text-[19px] font-bold text-white z-10 tracking-widest">KUMAON REGION</h3>
            </div>
            <div className="bg-white border-x border-b border-[#4a7c29]/30 rounded-b-xl overflow-hidden shadow-sm h-full flex flex-col">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#e9f1e1]">
                    <th className="py-3.5 px-4 text-[#4a7c29] font-bold text-[15px] text-center border-r border-white/60 w-20">Sr. No</th>
                    <th className="py-3.5 px-4 text-[#4a7c29] font-bold text-[15px] border-r border-white/60 w-40">District Name</th>
                    <th className="py-3.5 px-4 text-[#4a7c29] font-bold text-[15px]">Name of River</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {KUMAON_DATA.map((row, idx) => (
                    <tr key={idx}
                      onClick={() => handleRowClick(row)}
                      className={`border-b border-gray-100 last:border-none cursor-pointer transition-colors ${selectedDistrict?.district === row.district ? 'bg-[#e9f1e1]' : 'hover:bg-gray-50'}`}>
                      <td className="py-3.5 px-4 text-center font-bold text-gray-800 border-r border-gray-100">{row.sr}</td>
                      <td className="py-3.5 px-4 text-gray-700 font-medium border-r border-gray-100">{row.district}</td>
                      <td className="py-3.5 px-4 text-gray-700 font-medium">{row.river}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Garhwal Table */}
          <div className="w-full lg:w-1/2 flex flex-col">
            <div className="bg-[#05417b] rounded-t-xl py-6 flex items-center justify-center gap-3 relative overflow-hidden">
              <div className="absolute inset-0 opacity-20 bg-[url('/assets/one_river/banner.png')] bg-cover bg-center mix-blend-overlay"></div>
              <h3 className="text-[19px] font-bold text-white z-10 tracking-widest">GARHWAL REGION</h3>
            </div>
            <div className="bg-white border-x border-b border-[#05417b]/30 rounded-b-xl overflow-hidden shadow-sm h-full flex flex-col">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#e0effe]">
                    <th className="py-3.5 px-4 text-[#05417b] font-bold text-[15px] text-center border-r border-white/60 w-20">Sr. No</th>
                    <th className="py-3.5 px-4 text-[#05417b] font-bold text-[15px] border-r border-white/60 w-40">District Name</th>
                    <th className="py-3.5 px-4 text-[#05417b] font-bold text-[15px]">Name of River</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {GARHWAL_DATA.map((row, idx) => (
                    <tr key={idx}
                      onClick={() => handleRowClick(row)}
                      className={`border-b border-gray-100 last:border-none cursor-pointer transition-colors ${selectedDistrict?.district === row.district ? 'bg-[#e0effe]' : 'hover:bg-gray-50'}`}>
                      <td className="py-3.5 px-4 text-center font-bold text-gray-800 border-r border-gray-100">{row.sr}</td>
                      <td className="py-3.5 px-4 text-gray-700 font-medium border-r border-gray-100">{row.district}</td>
                      <td className="py-3.5 px-4 text-gray-700 font-medium">{row.river}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <img src="/assets/one_river/staticMap.jpeg" alt="Tagline" className="w-full h-auto mt-6" />
        <div className="bg-[#97c0e6] rounded-[16px] p-5 flex flex-col sm:flex-row items-center gap-5 text-white shadow-md border border-[#1a5b9e] w-[80%] mx-auto mt-6">
          <div className="w-[52px] h-[52px] rounded-full bg-white flex items-center justify-center shrink-0 shadow-inner">
            <Droplet size={26} className="text-[#0f4b89]" fill="#0f4b89" />
          </div>
          <div className="text-center sm:text-left">
            <p className="font-semibold text-blue-500 text-[15px]">Our rivers are our lifelines.</p>
            <p className="font-bold text-[17px] tracking-wide mt-0.5">
              Let's protect, restore and rejuvenate them – <span className="text-[#57ba47]">Together.</span>
            </p>
          </div>
        </div>
      </div>

      {/* Watershed Modal */}
      {modalDistrict && (
        <WatershedModal
          districtData={modalDistrict}
          onClose={() => setModalDistrict(null)}
        />
      )}
    </section>
  );
}

// ─── Carousel (unchanged) ─────────────────────────────────────────────────────
function RiverImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 640) setItemsPerView(1);
      else if (window.innerWidth < 1024) setItemsPerView(2);
      else setItemsPerView(3);
    };
    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % riverImages.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + riverImages.length) % riverImages.length);

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, []);

  const openLightbox = (index) => { setLightboxIndex(index); setIsLightboxOpen(true); };
  const closeLightbox = () => setIsLightboxOpen(false);
  const nextLightboxSlide = (e) => { e?.stopPropagation(); setLightboxIndex((prev) => (prev + 1) % riverImages.length); };
  const prevLightboxSlide = (e) => { e?.stopPropagation(); setLightboxIndex((prev) => (prev - 1 + riverImages.length) % riverImages.length); };

  return (
    <section className="w-full py-12 bg-white relative overflow-hidden">
      <div className="w-full px-4 md:px-8">
        <div className="relative group">
          <div className="overflow-hidden">
            <div className="flex gap-5 transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}>
              {riverImages.concat(riverImages).map((item, index) => (
                <div key={index}
                  className={`flex-shrink-0 ${itemsPerView === 1 ? 'w-full' : itemsPerView === 2 ? 'w-[calc(50%-10px)]' : 'w-[calc(33.333%-14px)]'}`}
                  onClick={() => openLightbox(index % riverImages.length)}>
                  <div className="w-full h-[280px] overflow-hidden rounded-lg">
                    <img src={item.image} alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                  </div>
                  <h3 className="mt-3 text-left text-sm md:text-base font-semibold text-gray-800">{item.title}</h3>
                </div>
              ))}
            </div>
          </div>
          <button onClick={prevSlide} className="absolute left-2 top-[42%] -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-black/50 hover:bg-[#f59e0b] text-white rounded-full flex items-center justify-center transition-all z-10">
            <ChevronLeft size={24} />
          </button>
          <button onClick={nextSlide} className="absolute right-2 top-[42%] -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-black/50 hover:bg-[#f59e0b] text-white rounded-full flex items-center justify-center transition-all z-10">
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      {isLightboxOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 river-lightbox-fade-in"
          onClick={closeLightbox}>
          <div className="relative w-full max-w-6xl max-h-[92vh] bg-transparent rounded-3xl overflow-hidden river-lightbox-slide-up"
            onClick={(e) => e.stopPropagation()}>
            <button onClick={closeLightbox} className="absolute top-4 right-4 z-30 w-11 h-11 rounded-full bg-black/60 hover:bg-[#f59e0b] text-white flex items-center justify-center transition-all">
              <X size={24} />
            </button>
            <button onClick={prevLightboxSlide} className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 md:w-14 md:h-14 rounded-full bg-black/60 hover:bg-[#f59e0b] text-white flex items-center justify-center transition-all">
              <ChevronLeft size={30} />
            </button>
            <button onClick={nextLightboxSlide} className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 md:w-14 md:h-14 rounded-full bg-black/60 hover:bg-[#f59e0b] text-white flex items-center justify-center transition-all">
              <ChevronRight size={30} />
            </button>
            <div className="relative w-full h-[60vh] md:h-[72vh] bg-transparent">
              <img src={riverImages[lightboxIndex].image} alt={riverImages[lightboxIndex].title}
                className="w-full h-full object-contain" />
            </div>
            <div className="absolute bottom-8 left-0 right-0 text-center">
              <h3 className="text-white text-lg md:text-xl font-semibold bg-black/60 inline-block px-6 py-2 rounded-full backdrop-blur-md">
                {riverImages[lightboxIndex].title}
              </h3>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .river-lightbox-fade-in { animation: riverFadeIn 0.3s ease-out forwards; }
        .river-lightbox-slide-up { animation: riverSlideUp 0.35s cubic-bezier(0.16,1,0.3,1) forwards; }
        @keyframes riverFadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes riverSlideUp {
          from { opacity: 0; transform: translateY(30px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function OneRiverPage() {
  return (
    <main className="w-full font-sans">
      <HeroSection />
      <ContentSection />
      <RiverImageCarousel />
    </main>
  );
}
