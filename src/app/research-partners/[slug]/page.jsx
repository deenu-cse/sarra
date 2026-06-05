import { notFound } from "next/navigation";
import { getPartnerBySlug } from "@/data/researchPartners";
import PartnerDetailPanel from "@/components/about/PartnerDetailPanel";
import PartnerDetailPanelNIH from "@/components/about/PartnerDetailPanelNIH";
import PartnerDetailPanelCGWB from "@/components/about/PartnerDetailPanelCGWB";
import PartnerDetailPanelFRI from "@/components/about/PartnerDetailPanelFRI";
import PartnerDetailPanelIISWC from "@/components/about/PartnerDetailPanelIISWC";
import PartnerDetailPanelEarthScience from "@/components/about/PartnerDetailPanelEarthScience";
import PartnerDetailPanelWII from "@/components/about/PartnerDetailPanelWII";
import PartnerDetailPanelGPPNIHE from "@/components/about/PartnerDetailPanelGPPNIHE";
import PartnerDetailPanelNABCONS from "@/components/about/PartnerDetailPanelNABCONS";

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const partner = getPartnerBySlug(slug);
    if (!partner) return {};
    return {
        title: `${partner.fullName} — Research Partners | SARRA Uttarakhand`,
        description: partner.intro,
    };
}

export default async function ResearchPartnerPage({ params }) {
    const { slug } = await params;
    const partner = getPartnerBySlug(slug);
    if (!partner) notFound();

    if (slug === 'nih') return <PartnerDetailPanelNIH partner={partner} />;
    if (slug === 'cgwb') return <PartnerDetailPanelCGWB partner={partner} />;
    if (slug === 'fri') return <PartnerDetailPanelFRI partner={partner} />;
    if (slug === 'iiswc') return <PartnerDetailPanelIISWC partner={partner} />;
    if (slug === 'earth-science') return <PartnerDetailPanelEarthScience partner={partner} />;
    if (slug === 'wii') return <PartnerDetailPanelWII partner={partner} />;
    if (slug === 'gppnihe') return <PartnerDetailPanelGPPNIHE partner={partner} />;
    if (slug === 'nabcons') return <PartnerDetailPanelNABCONS partner={partner} />;

    return <PartnerDetailPanel partner={partner} />;
}
