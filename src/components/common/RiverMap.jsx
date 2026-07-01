'use client';

import React, { useEffect, useRef, useState } from 'react';
import { MapPin } from 'lucide-react';

const DISTRICT_DATA = [
  { region: 'KUMAON', sr: '1.', district: 'Almora', river: 'Jata Ganga', watershed: 'Jata Ganga Watershed', lat: 29.617788, lng: 79.884677, color: '#7280FB', fill: 'rgba(114,128,251,0.55)', description: 'Flows through the sacred hills of Almora district' },
  { region: 'KUMAON', sr: '2.', district: 'Bageshwar', river: 'Garud Ganga', watershed: 'Garud Ganga Watershed', lat: 29.886732, lng: 79.563495, color: '#B180BC', fill: 'rgba(177,128,188,0.55)', description: 'Sacred river of Bageshwar with perennial flow' },
  { region: 'KUMAON', sr: '3.', district: 'Champawat', river: 'Gaudi River', watershed: 'Gaudi River Watershed', lat: 29.322881, lng: 80.095356, color: '#69DEB3', fill: 'rgba(105,222,179,0.55)', description: 'River rejuvenation in eastern Kumaon' },
  { region: 'KUMAON', sr: '4.', district: 'Nainital', river: 'Shipra River', watershed: 'Shipra River Watershed', lat: 29.446003, lng: 79.478694, color: '#B3FFFF', fill: 'rgba(179,255,255,0.55)', description: 'Vital water source for Nainital district' },
  { region: 'KUMAON', sr: '5.', district: 'Pithoragarh', river: 'Purvi Ramganga', watershed: 'Ramganga East Watershed', lat: 29.845337, lng: 80.146835, color: '#C7D38D', fill: 'rgba(199,211,141,0.55)', description: 'Eastern Ramganga basin in high altitude terrain' },
  { region: 'KUMAON', sr: '6.', district: 'Udham Singh Nagar', river: 'Fika River', watershed: 'Fika River Watershed', lat: 29.3322, lng: 78.8664, color: '#BEBADA', fill: 'rgba(190,186,218,0.55)', description: 'The watershed supports agriculture, groundwater recharge, wetlands, and local biodiversity before contributing to the larger Ramganga river system.' },
  { region: 'GARHWAL', sr: '1.', district: 'Chamoli', river: 'Chandra Bhaga', watershed: 'Chandrabhaga River Watershed', lat: 30.296876, lng: 79.225259, color: '#0293F7', fill: 'rgba(2,147,247,0.35)', description: 'High altitude river in the Garhwal Himalayas' },
  { region: 'GARHWAL', sr: '2.', district: 'Dehradun', river: 'Song River', watershed: 'Song River Watershed', lat: 30.258948, lng: 78.140235, color: '#F7C262', fill: 'rgba(247,194,98,0.55)', description: 'Major tributary of the Ganges in Dehradun valley' },
  { region: 'GARHWAL', sr: '3.', district: 'Haridwar', river: 'Pathari River', watershed: 'Pathari River Watershed', lat: 29.941526, lng: 78.064637, color: '#DABABE', fill: 'rgba(218,186,190,0.55)', description: 'River conservation in the gateway to the Himalayas' },
  { region: 'GARHWAL', sr: '4.', district: 'Pauri Garhwal', river: 'Nayar (East & West)', watershed: 'Eastern Nayar Watershed', lat: 29.934517, lng: 78.968617, color: '#CCEBCC', fill: 'rgba(204,235,204,0.55)', description: 'Twin rivers rejuvenation project in Pauri' },
  { region: 'GARHWAL', sr: '5.', district: 'Rudraprayag', river: 'Punaar Nadi', watershed: 'Punad Gad Watershed', lat: 30.244734, lng: 79.008431, color: '#E5CDFC', fill: 'rgba(229,205,252,0.55)', description: 'Sacred waters of Rudraprayag district' },
  { region: 'GARHWAL', sr: '6.', district: 'Tehri', river: 'Song River', watershed: 'Song River Watershed', lat: 30.258948, lng: 78.140235, color: '#F7C262', fill: 'rgba(247,194,98,0.55)', description: 'Song River conservation in Tehri district' },
  { region: 'GARHWAL', sr: '7.', district: 'Uttarkashi', river: 'Kamal Nadi', watershed: 'Kamal Ganaga Watershed', lat: 30.875950, lng: 78.063113, color: '#80D3D3', fill: 'rgba(128,211,211,0.55)', description: 'River in the land of ancient temples' },
];

export default function RiverMap({ highlightedRivers = [], height = '400px' }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const layersRef = useRef({});
  const [mapLoaded, setMapLoaded] = useState(false);

  // Normalize highlightedRivers strings for easier matching
  const normalizedHighlights = highlightedRivers.map(r => r.toLowerCase().trim());

  const isRiverHighlighted = (match) => {
    if (normalizedHighlights.length === 0) return true; // If no rivers specified, highlight none? Or highlight all? The user requested "only highlight the rivers assigned to the partner".
    const riverName = match.river.toLowerCase().trim();
    const watershedName = match.watershed.toLowerCase().trim();
    return normalizedHighlights.some(h => riverName.includes(h) || watershedName.includes(h));
  };

  const createPopupHTML = (data) => `
    <div class="min-w-[210px] max-w-[270px] font-sans">
      <div class="bg-gradient-to-br from-[#0a3055] to-[#1e3a5f] text-white px-3.5 py-2.5 rounded-t-md -mx-5 -mt-3.5 mb-2.5">
        <div class="text-[10px] opacity-70 uppercase tracking-[1.5px] mb-0.5">${data.region} Region</div>
        <div class="text-base font-extrabold tracking-wide">${data.district}</div>
      </div>
      <div class="pt-0.5">
        <div class="flex items-center gap-1.5 mb-1.5">
          <span class="text-sky-500 font-bold text-sm">🌊 ${data.river}</span>
        </div>
        <div class="text-[11px] text-gray-500 mb-1.5 flex items-center gap-1">
          📍 ${data.watershed}
        </div>
        <div class="text-[11px] text-gray-400 leading-relaxed">${data.description}</div>
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
      .catch((e) => {
        console.error('KML Parse Error:', e);
      });

    setMapLoaded(true);
  };

  const parseAndRenderKML = (kmlText, map, L) => {
    const parser = new DOMParser();
    const kmlDoc = parser.parseFromString(kmlText, 'text/xml');
    const placemarks = kmlDoc.querySelectorAll('Placemark');

    // Only collect bounds for highlighted rivers so we can auto-zoom
    const highlightedBounds = L.latLngBounds([]);

    placemarks.forEach((placemark) => {
      const name = placemark.querySelector('name')?.textContent?.trim() || '';

      const match = DISTRICT_DATA.find(d =>
        d.watershed.toLowerCase() === name.toLowerCase() ||
        name.toLowerCase().includes(d.river.toLowerCase().split(' ')[0])
      );

      const isHighlighted = match && isRiverHighlighted(match);

      // If highlightedRivers is provided, only draw the highlighted ones
      // Or we can draw others with very low opacity. Let's just draw highlighted ones
      if (normalizedHighlights.length > 0 && !isHighlighted) return;

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
          color: '#0ea5e9',
          weight: 2,
          fillColor: '#0ea5e9',
          fillOpacity: 0.45,
          opacity: 0.8,
        });

        if (match) {
          polygon.bindTooltip(
            `<div class="font-sans py-0.5"><b class="text-[13px] text-[#0a3055]">${match.district}</b><br/><span class="text-sky-500 text-xs">🌊 ${match.river}</span><br/><span class="text-[10px] text-gray-400">${match.watershed}</span></div>`,
            { sticky: true, direction: 'top', offset: [0, -10], className: 'district-tooltip' }
          );
          polygon.bindPopup(createPopupHTML(match), {
            maxWidth: 280,
            className: 'district-info-popup',
            closeButton: true,
          });
        }

        polygon.on('mouseover', function () {
          this.setStyle({ weight: 3, fillOpacity: 0.7 });
        });
        polygon.on('mouseout', function () {
          this.setStyle({ weight: 2, fillOpacity: 0.45 });
        });

        polygon.addTo(map);
        if (isHighlighted) {
          latlngs.forEach(ll => highlightedBounds.extend(ll));
        }
      });

      const pointEl = placemark.querySelector('Point coordinates');
      if (pointEl && match && isHighlighted) {
        const pts = pointEl.textContent.trim().split(',');
        const lat = parseFloat(pts[1]);
        const lng = parseFloat(pts[0]);
        if (!isNaN(lat) && !isNaN(lng)) {
          const icon = L.divIcon({
            html: `<div class="bg-white border-[1.5px] border-[#0a3055] rounded-full px-2 py-1 text-[10px] font-bold text-[#0a3055] whitespace-nowrap shadow-sm cursor-pointer flex items-center gap-1"><img src="/assets/icons/location.png" alt="River Icon" class="w-3 h-3 object-contain"/>${match.river.split(' ')[0]}</div>`,
            className: '',
            iconAnchor: [40, 10],
          });
          const marker = L.marker([lat, lng], { icon });
          marker.bindPopup(createPopupHTML(match), {
            maxWidth: 280,
            className: 'district-info-popup',
            closeButton: true,
          });
          marker.addTo(map);
        }
      }
    });

    if (normalizedHighlights.length > 0 && highlightedBounds.isValid()) {
      map.fitBounds(highlightedBounds, { padding: [50, 50] });
    }
  };

  return (
    <div ref={el => { if (el) el.style.height = height; }} className="relative w-full rounded-[24px] overflow-hidden shadow-sm border border-blue-100 mt-6">
      <div ref={mapRef} className="absolute inset-0 z-10" />




      {!mapLoaded && (
        <div className="absolute inset-0 z-[500] bg-[#f8fafc] flex items-center justify-center">
          <div className="text-center">
            <div className="w-10 h-10 border-4 border-blue-200 border-t-[#0a3055] rounded-full animate-spin mx-auto mb-3" />
            <p className="text-sm text-[#0a3055] font-medium">Loading interactive map…</p>
          </div>
        </div>
      )}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-[400]">
        <div className="bg-[#0a3055]/90 backdrop-blur-sm text-white text-[11px] font-bold px-4 py-1.5 rounded-full shadow-lg tracking-wide whitespace-nowrap">
          🗺 River Map Locations
        </div>
      </div>
    </div>
  );
}
