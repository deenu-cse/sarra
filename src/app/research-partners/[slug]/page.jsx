import { notFound } from "next/navigation";
import { getPartnerBySlug } from "@/data/researchPartners";
import PartnerDetailPanel from "@/components/about/PartnerDetailPanel";
import PartnerDetailPanelNIH from "@/components/about/PartnerDetailPanelNIH";
import PartnerDetailPanelCGWB from "@/components/about/PartnerDetailPanelCGWB";

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

    if (slug === 'nih') {
        return <PartnerDetailPanelNIH partner={partner} />;
    }

    if (slug === 'cgwb') {
        return <PartnerDetailPanelCGWB partner={partner} />;
    }

    return <PartnerDetailPanel partner={partner} />;
}
