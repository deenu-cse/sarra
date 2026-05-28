import Image from "next/image";
import EventSlider from "@/components/constants/slider";
import MinimalAnnouncement from "@/components/announcement/MinimalAnnouncement";
import Department from "@/components/about/aboutDepartment";
import SarraBanner from "@/components/about/banner";
import ResearchSupport from "@/components/about/researchSupport";
import NotificationSection from "@/components/notification/notificationSection";
import GovLinks from "@/components/links/govLinks";
import CommunityEngagement from "@/components/community/CommunityEngagement";
import Dignitaries from "@/components/about/Dignitaries"
import MapCarousel from "@/components/MapCarousel"

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default async function Home() {
  let announcements = [];
  let news = [];

  try {
    const res = await fetch(`${API_BASE}/announcements`, { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      announcements = Array.isArray(data) ? data : (data?.data || []);
    }
  } catch (e) {
    console.error('Failed to fetch announcements:', e);
  }

  try {
    const res = await fetch(`${API_BASE}/news`, { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      news = Array.isArray(data) ? data : (data?.data || []);
    }
  } catch (e) {
    console.error('Failed to fetch news:', e);
  }

  return (
    <div>
      <EventSlider />
      <MinimalAnnouncement initialAnnouncements={announcements} />
      <Dignitaries />
      <SarraBanner />
      <Department initialAnnouncements={announcements} />
      <MapCarousel />
      <ResearchSupport />
      <NotificationSection initialNews={news} initialAnnouncements={announcements} />
      <CommunityEngagement />
      <GovLinks />
    </div>
  );
}
