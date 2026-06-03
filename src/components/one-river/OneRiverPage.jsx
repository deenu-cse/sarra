'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Mountain, Droplet, MapPin } from 'lucide-react';

const IMG = {
  hero: '/assets/one_river/banner.png',
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
    river: 'Phica River',
    watershed: 'Phica River Watershed',
    lat: 29.3322,
    lng: 78.8664,
    color: '#BEBADA',
    fill: 'rgba(190,186,218,0.55)',

    description:
      'The watershed supports agriculture, groundwater recharge, wetlands, and local biodiversity before contributing to the larger Ramganga river system.'
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

function InteractiveMap({ selectedDistrict, onDistrictSelect }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const layersRef = useRef({});
  const [mapLoaded, setMapLoaded] = useState(false);

  const createPopupHTML = (data) => `
    <div style="min-width:210px;max-width:270px;font-family:system-ui,-apple-system,sans-serif;">
      <div style="background:linear-gradient(135deg,#0a3055,#1e3a5f);color:white;padding:10px 14px;border-radius:6px 6px 0 0;margin:-14px -20px 10px -20px;">
        <div style="font-size:10px;opacity:0.7;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:2px;">${data.region} Region</div>
        <div style="font-size:16px;font-weight:800;letter-spacing:0.3px;">${data.district}</div>
      </div>
      <div style="padding:2px 0 0;">
        <div style="display:flex;align-items:center;gap:6px;margin-bottom:6px;">
          <span style="color:#0ea5e9;font-weight:700;font-size:14px;">🌊 ${data.river}</span>
        </div>
        <div style="font-size:11px;color:#666;margin-bottom:6px;display:flex;align-items:center;gap:4px;">
          📍 ${data.watershed}
        </div>
        <div style="font-size:11px;color:#888;line-height:1.4;">${data.description}</div>
        <div style="font-size:10px;color:#aaa;margin-top:8px;border-top:1px solid #eee;padding-top:6px;font-family:monospace;">
          ${data.lat.toFixed(4)}°N, ${data.lng.toFixed(4)}°E
        </div>
    </div>`;

  const addUttarakhandBoundary = (map, L) => {
    fetch('/assets/one_river/Uk_Boundary.kml')
      .then(r => {
        if (!r.ok) throw new Error('Boundary KML not found');
        return r.text();
      })
      .then(kmlText => {
        const parser = new DOMParser();
        const kmlDoc = parser.parseFromString(kmlText, 'text/xml');
        let placemarks = kmlDoc.getElementsByTagName('Placemark');
        if (!placemarks || placemarks.length === 0) {
          placemarks = kmlDoc.getElementsByTagNameNS('*', 'Placemark');
        }

        Array.from(placemarks).forEach((placemark) => {
          let coordsNodes = placemark.getElementsByTagName('coordinates');
          if (!coordsNodes || coordsNodes.length === 0) {
            coordsNodes = placemark.getElementsByTagNameNS('*', 'coordinates');
          }

          Array.from(coordsNodes).forEach(node => {
            const coordsText = node.textContent.trim();
            const coordPairs = coordsText.split(/\s+/);
            const latLngs = coordPairs.map(pair => {
              const [lng, lat] = pair.split(',');
              return [parseFloat(lat), parseFloat(lng)];
            }).filter(ll => !isNaN(ll[0]) && !isNaN(ll[1]));

            if (latLngs.length > 0) {
              L.polygon(latLngs, {
                color: '#0a3055',
                weight: 2.5,
                dashArray: '10, 5',
                fillColor: 'transparent',
                interactive: false,
              }).addTo(map);
            }
          });
        });
      })
      .catch(err => console.error('Error loading boundary:', err));
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (mapInstanceRef.current) return;

    if (!document.getElementById('leaflet-css')) {
      const link = document.createElement('link');
      link.id = 'leaflet-css';
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }

    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.onload = () => initMap();
    document.head.appendChild(script);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  const initMap = () => {
    if (!mapRef.current || !window.L) return;
    if (mapInstanceRef.current) return;

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

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
    }).addTo(map);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      opacity: 0.7,
    }).addTo(map);

    mapInstanceRef.current = map;

    // Add Uttarakhand state boundary highlight
    addUttarakhandBoundary(map, L);

    fetch('/assets/one_river/ODOR 13.kml')
      .then(r => {
        if (!r.ok) throw new Error('KML not found');
        return r.text();
      })
      .then(kmlText => parseAndRenderKML(kmlText, map, L))
      .catch(() => {
        renderFallbackMarkers(map, L);
      });

    setMapLoaded(true);
  };

  const parseAndRenderKML = (kmlText, map, L) => {
    const parser = new DOMParser();
    const kmlDoc = parser.parseFromString(kmlText, 'text/xml');
    const placemarks = kmlDoc.querySelectorAll('Placemark');

    const styleColors = {
      area1: { fill: 'rgba(247,2,147,0.35)', stroke: '#543070' },
      area2: { fill: 'rgba(251,114,128,0.45)', stroke: '#543070' },
      area3: { fill: 'rgba(128,177,211,0.45)', stroke: '#543070' },
      area4: { fill: 'rgba(190,186,218,0.45)', stroke: '#543070' },
      area5: { fill: 'rgba(253,180,98,0.45)', stroke: '#543070' },
      area6: { fill: 'rgba(217,217,217,0.45)', stroke: '#543070' },
      area7: { fill: 'rgba(204,235,197,0.45)', stroke: '#543070' },
      area8: { fill: 'rgba(188,128,189,0.45)', stroke: '#543070' },
      area9: { fill: 'rgba(179,222,105,0.45)', stroke: '#543070' },
      area10: { fill: 'rgba(255,255,179,0.45)', stroke: '#543070' },
      area11: { fill: 'rgba(141,211,199,0.45)', stroke: '#543070' },
      area12: { fill: 'rgba(106,61,154,0.45)', stroke: '#543070' },
      area13: { fill: 'rgba(252,205,229,0.45)', stroke: '#543070' },
    };

    placemarks.forEach((placemark) => {
      const name = placemark.querySelector('name')?.textContent?.trim() || '';
      const styleUrl = placemark.querySelector('styleUrl')?.textContent?.trim().replace('#', '') || 'area1';
      const style = styleColors[styleUrl] || styleColors.area1;

      const match = DISTRICT_DATA.find(d =>
        d.watershed.toLowerCase() === name.toLowerCase() ||
        name.toLowerCase().includes(d.river.toLowerCase().split(' ')[0])
      );

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
          fillColor: style.fill.replace('rgba', 'rgb').replace(/,[^,)]+\)/, ')'),
          fillOpacity: 0.45,
          opacity: 0.8,
        });

        if (match) {
          polygon.bindTooltip(
            `<div style="font-family:system-ui;padding:2px 0;"><b style="font-size:13px;color:#0a3055;">${match.district}</b><br/><span style="color:#0ea5e9;font-size:12px;">🌊 ${match.river}</span><br/><span style="font-size:10px;color:#888;">${match.watershed}</span></div>`,
            { sticky: true, direction: 'top', offset: [0, -10], className: 'district-tooltip' }
          );
          polygon.bindPopup(createPopupHTML(match), {
            maxWidth: 280,
            className: 'district-info-popup',
            closeButton: true,
          });
        }

        polygon.on('mouseover', function () {
          this.setStyle({ weight: 2.5, fillOpacity: 0.7 });
          if (match) onDistrictSelect(match);
        });
        polygon.on('mouseout', function () {
          this.setStyle({ weight: 1.5, fillOpacity: 0.45 });
        });
        polygon.on('click', function () {
          if (match) onDistrictSelect(match);
        });

        polygon.addTo(map);
        if (match) layersRef.current[match.district] = polygon;
      });

      const pointEl = placemark.querySelector('Point coordinates');
      if (pointEl && match) {
        const pts = pointEl.textContent.trim().split(',');
        const lat = parseFloat(pts[1]);
        const lng = parseFloat(pts[0]);
        if (!isNaN(lat) && !isNaN(lng)) {
          const icon = L.divIcon({
            html: `<div style="background:white;border:1.5px solid #0a3055;border-radius:20px;padding:3px 8px;font-size:10px;font-weight:700;color:#0a3055;white-space:nowrap;box-shadow:0 1px 4px rgba(0,0,0,0.15);cursor:pointer;display:flex;align-items:center;gap:4px;"><img src="/assets/icons/location.png" alt="River Icon" style="width:12px;height:12px;object-fit:contain;"/>${match.river.split(' ')[0]}</div>`,
            className: '',
            iconAnchor: [40, 10],
          });
          const marker = L.marker([lat, lng], { icon });
          marker.bindPopup(createPopupHTML(match), {
            maxWidth: 280,
            className: 'district-info-popup',
            closeButton: true,
          });
          marker.on('click', () => onDistrictSelect(match));
          marker.addTo(map);
        }
      }
    });
  };

  const renderFallbackMarkers = (map, L) => {
    DISTRICT_DATA.forEach(d => {
      const marker = L.circleMarker([d.lat, d.lng], {
        radius: 10,
        fillColor: d.color,
        color: '#0a3055',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8,
      });
      marker.bindTooltip(
        `<div style="font-family:system-ui;padding:2px 0;"><b style="font-size:13px;color:#0a3055;">${d.district}</b><br/><span style="color:#0ea5e9;font-size:12px;">🌊 ${d.river}</span></div>`,
        { permanent: false, direction: 'top', className: 'district-tooltip' }
      );
      marker.bindPopup(createPopupHTML(d), {
        maxWidth: 280,
        className: 'district-info-popup',
        closeButton: true,
      });
      marker.on('click', () => onDistrictSelect(d));
      marker.addTo(map);
      layersRef.current[d.district] = marker;
    });
  };

  useEffect(() => {
    if (!selectedDistrict || !mapInstanceRef.current) return;
    const map = mapInstanceRef.current;
    map.flyTo([selectedDistrict.lat, selectedDistrict.lng], 9, {
      duration: 1.2,
      easeLinearity: 0.25,
    });
  }, [selectedDistrict]);

  return (
    <div className="relative w-full rounded-[24px] overflow-hidden shadow-sm border border-blue-100" style={{ height: '500px' }}>
      <div ref={mapRef} className="absolute inset-0" style={{ zIndex: 1 }} />

      {/* Custom popup and tooltip styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .district-info-popup .leaflet-popup-content-wrapper {
          border-radius: 10px;
          padding: 0;
          overflow: hidden;
          box-shadow: 0 8px 30px rgba(0,0,0,0.18);
          border: 1px solid rgba(10,48,85,0.1);
        }
        .district-info-popup .leaflet-popup-content {
          margin: 14px 20px;
          line-height: 1.4;
        }
        .district-info-popup .leaflet-popup-tip {
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .district-info-popup .leaflet-popup-close-button {
          color: white !important;
          font-size: 18px;
          top: 6px !important;
          right: 8px !important;
          z-index: 10;
        }
        .district-info-popup .leaflet-popup-close-button:hover {
          color: #f59e0b !important;
        }
        .district-tooltip {
          background: white !important;
          border: 1px solid rgba(10,48,85,0.12) !important;
          border-radius: 10px !important;
          padding: 8px 12px !important;
          box-shadow: 0 4px 20px rgba(0,0,0,0.12) !important;
        }
        .district-tooltip::before {
          border-top-color: white !important;
        }
      `}} />

      <div className="absolute bottom-4 left-4 z-[400] bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-sm border border-blue-100">
        <div className="text-[11px] font-bold text-[#0a3055] mb-2 uppercase tracking-wide">Legend</div>
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <div className="w-4 h-3 rounded-sm border border-[#543070]" style={{ background: 'rgba(114,128,251,0.5)' }} />
            <span className="text-[10px] text-gray-600 font-medium">Kumaon Region</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-3 rounded-sm border border-[#543070]" style={{ background: 'rgba(2,147,247,0.35)' }} />
            <span className="text-[10px] text-gray-600 font-medium">Garhwal Region</span>
          </div>
          <div className="flex items-center gap-2 mt-1 pt-1 border-t border-gray-100">
            <div className="w-4 h-0 border-t-2 border-dashed border-[#0a3055]" />
            <span className="text-[10px] text-gray-600 font-medium">State Boundary</span>
          </div>
        </div>
      </div>
      {!mapLoaded && (
        <div className="absolute inset-0 z-[500] bg-[#f8fafc] flex items-center justify-center">
          <div className="text-center">
            <div className="w-10 h-10 border-4 border-blue-200 border-t-[#0a3055] rounded-full animate-spin mx-auto mb-3" />
            <p className="text-sm text-[#0a3055] font-medium">Loading interactive map…</p>
          </div>
        </div>
      )}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 z-[400]">
        <div className="bg-[#0a3055]/90 backdrop-blur-sm text-white text-[11px] font-bold px-4 py-1.5 rounded-full shadow-lg tracking-wide whitespace-nowrap">
          🗺 One District • One River
        </div>
      </div>
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden" style={{ minHeight: '480px' }}>
      <img
        src={IMG.hero}
        alt="One River One District Banner"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
      />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(15,23,42,0.88) 0%, rgba(30,58,95,0.82) 50%, rgba(10,48,85,0.75) 100%)', zIndex: 1 }} />

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

function ContentSection() {
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  return (
    <section className="w-full py-8 px-4 md:px-8 lg:px-12 bg-white">
      <div className="w-full flex flex-col gap-6 max-w-[1100px] mx-auto">
        <div className="w-full flex flex-col gap-4 mb-2">
          <div className="w-full">
            <InteractiveMap selectedDistrict={selectedDistrict} onDistrictSelect={setSelectedDistrict} />
          </div>

        </div>

        <div className="w-full flex flex-col lg:flex-row gap-6 h-full mt-4">
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
                      onClick={() => setSelectedDistrict(row)}
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
                      onClick={() => setSelectedDistrict(row)}
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
    </section>
  );
}

export default function OneRiverPage() {
  return (
    <main className="w-full font-sans">
      <HeroSection />
      <ContentSection />
    </main>
  );
}
