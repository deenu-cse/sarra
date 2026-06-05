export const researchPartners = [
    {
        slug: "iit-roorkee",
        name: "IIT Roorkee",
        fullName: "Indian Institute of Technology Roorkee",
        logo: "/assets/icons/iitr.png",
        role: "Research Support By",
        location: "Roorkee, Uttarakhand — 247667",
        chips: [
            { label: "Research Support", color: "blue" },
            { label: "March 2025", color: "gray" },
            { label: "2 River Basins", color: "green" },
        ],
        intro:
            "IIT Roorkee conducted scientific sub-basin prioritization studies for two Uttarakhand river basins — Shipra (Nainital) and Gaudi (Champawat) — using morphometric analysis, LULC change detection (1995–2024), and SWAT hydrological modelling, providing actionable frameworks for SARRA's river rejuvenation programme.",
        stats: [
            { value: "2", label: "River basins studied" },
            { value: "26", label: "Sub-basins analyzed" },
            { value: "37 yrs", label: "Rainfall data" },
            { value: "393", label: "Total HRUs modelled" },
        ],
        methodology: [
            "SWAT hydrological model",
            "ALOS PALSAR DEM 12.5m",
            "SENTINEL-2 10m (2024)",
            "LANDSAT (1995–2015)",
            "CHIRPS climate data",
            "Morphometric analysis",
            "Strahler stream ordering",
        ],
        recommendations: [
            {
                color: "blue",
                title: "Gabion check dams",
                desc: "Control erosion, reduce flow velocity, enhance groundwater recharge in steep terrain",
            },
            {
                color: "green",
                title: "Contour & staggered trenches",
                desc: "Slow runoff, prevent soil loss, improve water retention on sloping lands",
            },
            {
                color: "teal",
                title: "Spring-shed management",
                desc: "Protect and rejuvenate natural springs, sustain baseflow in river systems",
            },
            {
                color: "purple",
                title: "Vegetative & bioengineering measures",
                desc: "Afforestation and grass strips to stabilize slopes and enhance groundwater infiltration",
            },
        ],
        reports: [
            {
                label: "Download Shipra report (PDF)",
                href: "/assets/reports/shipra-watershed-iitr.pdf",
            },
            {
                label: "Download Gaudi report (PDF)",
                href: "/assets/reports/gaudi-watershed-iitr.pdf",
            },
        ],
        basins: [
            {
                id: "shipra",
                tabLabel: "Shipra River — Nainital",
                name: "Shipra River Basin",
                subtitle: "Nainital District · ~33 km² · 4th order river",
                chip: "13 sub-basins",
                facts: [
                    { icon: "mountain", text: "Elevation: 1000–2408 m" },
                    { icon: "cloud-rain", text: "Rainfall: 1463–1829 mm/yr" },
                    { icon: "network", text: "132 streams · Dendritic pattern" },
                    { icon: "layers", text: "Geology: 90% Quartzite" },
                    { icon: "leaf", text: "Soil: Loamy + Sandy loam" },
                    { icon: "waves", text: "Slope: 15°–77°" },
                ],
                lulcTitle: "LULC change detection (1995–2024)",
                lulc: [
                    { label: "Dense forest", widthPct: 40, change: "+2.23 km²", positive: true },
                    { label: "Open forest", widthPct: 85, change: "−7.48 km²", positive: false },
                    { label: "Cultivated", widthPct: 55, change: "+3.94 km²", positive: true },
                    { label: "Settlement", widthPct: 20, change: "+1.17 km²", positive: false },
                ],
                priorityTitle: "Final integrated sub-basin prioritization",
                priorities: [
                    {
                        level: "HP",
                        color: "red",
                        subbasins: "Sub-basins 1, 6, 10",
                        cf: "Mean CF: 4.01 · 5.39 · 4.32",
                        chip: "High priority",
                        note: "Urgent reforestation & soil conservation needed",
                    },
                    {
                        level: "MP",
                        color: "amber",
                        subbasins: "Sub-basins 2, 3, 4",
                        cf: "Mean CF: 5.70 · 6.08 · 6.55",
                        chip: "Medium priority",
                        note: "Targeted management to prevent degradation",
                    },
                    {
                        level: "LP",
                        color: "green",
                        subbasins: "Sub-basins 5, 7, 8, 9, 11, 12, 13",
                        cf: "Mean CF: 7.02–8.49",
                        chip: "Low priority",
                        note: "Periodic monitoring sufficient",
                    },
                ],
            },
            {
                id: "gaudi",
                tabLabel: "Gaudi River — Champawat",
                name: "Gaudi River Basin",
                subtitle: "Champawat District · ~22 km² · 4th order river",
                chip: "13 sub-basins",
                facts: [
                    { icon: "mountain", text: "Elevation: 1512–2118 m" },
                    { icon: "cloud-rain", text: "Rainfall: 1264–1270 mm/yr" },
                    { icon: "network", text: "97 streams" },
                    { icon: "layers", text: "Geology: Granite & Gneiss" },
                    { icon: "leaf", text: "Soil: Loamy" },
                    { icon: "waves", text: "Slope: 7.7°–40°" },
                ],
                lulcTitle: "LULC change detection (1995–2024)",
                lulc: [
                    { label: "Dense forest", widthPct: 15, change: "+0.54 km²", positive: true },
                    { label: "Open forest", widthPct: 30, change: "−0.94 km²", positive: false },
                    { label: "Cultivated", widthPct: 35, change: "−1.07 km²", positive: false },
                    { label: "Settlement", widthPct: 50, change: "+1.46 km²", positive: true },
                ],
                priorityTitle: "Final integrated sub-basin prioritization",
                priorities: [
                    {
                        level: "HP",
                        color: "red",
                        subbasins: "Sub-basins 5, 7, 9, 11, 12, 13",
                        cf: "CF: 5.55–6.16",
                        chip: "High priority",
                        note: "Urgent reforestation & conservation",
                    },
                    {
                        level: "MP",
                        color: "amber",
                        subbasins: "Sub-basin 10",
                        cf: "CF: 6.34",
                        chip: "Medium priority",
                        note: "Sustainable land management",
                    },
                    {
                        level: "LP",
                        color: "green",
                        subbasins: "Sub-basins 1, 2, 3, 4, 6, 8",
                        cf: "CF: 6.86–7.51",
                        chip: "Low priority",
                        note: "Routine monitoring only",
                    },
                ],
            },
        ],
    },
    {
        slug: "nih",
        name: "NIH",
        fullName: "National Institute of Hydrology",
        logo: "/assets/icons/nih.png",
        role: "Research Support By",
        location: "Roorkee, Uttarakhand",
        chips: [
            { label: "Research Support", color: "blue" },
        ],
        intro: "National Institute of Hydrology provides hydrological research support for SARRA's river rejuvenation programme.",
        stats: [],
        methodology: [],
        recommendations: [],
        reports: [],
        basins: [],
    },
    {
        slug: "cgwb",
        name: "CGWB",
        fullName: "Central Ground Water Board",
        logo: "/assets/icons/cgwb.png",
        role: "Research Support By",
        location: "New Delhi",
        chips: [
            { label: "Research Support", color: "blue" },
        ],
        intro: "Central Ground Water Board provides groundwater assessment and monitoring support for SARRA's spring and river rejuvenation initiatives.",
        stats: [],
        methodology: [],
        recommendations: [],
        reports: [],
        basins: [],
    },
    {
        slug: "fri",
        name: "FRI",
        fullName: "Forest Research Institute",
        logo: "/assets/icons/fri.png",
        role: "Research Support Partner",
        intro: "FRI Dehradun is responsible for sub-catchment prioritisation and river rejuvenation planning for rivers Chandrabhaga (Chamoli) and Punar (Rudraprayag)."
    },
    {
        slug: "iiswc",
        name: "IISWC",
        fullName: "Indian Institute of Soil and Water Conservation",
        logo: "/assets/icons/iswc.png",
        role: "Research Support Partner",
        intro: "IISWC Dehradun has been assigned river Kamal Ganga in Uttarkashi district for sub-catchment prioritisation and rejuvenation planning."
    },
    {
        slug: "earth-science",
        name: "Earth Science",
        fullName: "Department of Earth Sciences, IIT Roorkee",
        logo: "/assets/icons/earth_science.jpeg",
        role: "Research Support Partner",
        intro: "The Department of Earth Sciences at IIT Roorkee has been assigned the Fika River in Udham Singh Nagar district for scientific sub-catchment analysis and river rejuvenation planning."
    },
    {
        slug: "wii",
        name: "WII",
        fullName: "Wildlife Institute of India",
        logo: "/assets/icons/wii.png",
        role: "Research Support Partner",
        intro: "WII has been engaged under the SARRA program for scientific planning and sub-catchment prioritisation of the Pathri River in Haridwar district."
    },
    {
        slug: "gppnihe",
        name: "GPPNIHE",
        fullName: "G.B. Pant National Institute of Himalayan Environment",
        logo: "/assets/icons/gbpant.jpeg",
        role: "Research Support By",
        intro: "GBPNIHE is responsible for sub-catchment prioritisation and river rejuvenation planning for three rivers across the Kumaon Himalayan region."
    },
    {
        slug: "nabcons",
        name: "NABCONS",
        fullName: "NABARD Consultancy Services",
        logo: "/assets/icons/nabcons.jpeg",
        role: "Carbon Credit Study By",
        intro: "NABCONS has been engaged for a Carbon Credit Feasibility Study under the Voluntary Carbon Market (VCM) project for the Song River catchment area."
    }
];

export function getPartnerBySlug(slug) {
    return researchPartners.find((p) => p.slug === slug) || null;
}
