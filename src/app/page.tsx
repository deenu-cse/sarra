import Image from "next/image";
import EventSlider from "@/components/constants/slider";
import Department from "@/components/about/aboutDepartment";
import SarraBanner from "@/components/about/banner";
import ResearchSupport from "@/components/about/researchSupport";
import NotificationSection from "@/components/notification/notificationSection";
import GovLinks from "@/components/links/govLinks";

export default function Home() {
  return (
    <div>
      <EventSlider />
      <SarraBanner />
      <Department />
      <ResearchSupport />
      <NotificationSection />
      <GovLinks />
    </div>
  );
}
