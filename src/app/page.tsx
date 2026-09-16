import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import MissionVisionSection from '@/components/sections/MissionVisionSection'
import ProgramsSection from '@/components/sections/ProgramsSection'
import ImpactSection from '@/components/sections/ImpactSection'
import GetInvolvedSection from '@/components/sections/GetInvolvedSection'
import EventsSection from '@/components/sections/EventsSection'
import StoriesSection from '@/components/sections/StoriesSection'
import GalleryPreviewSection from '@/components/sections/GalleryPreviewSection'
import VolunteerBannerSection from '@/components/sections/VolunteerBannerSection'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

async function getHomeData() {
  const [settings, programs, events, stories, gallery] = await Promise.all([
    prisma.siteSetting.findMany(),
    prisma.program.findMany({
      where: { status: 'published' },
      orderBy: { order: 'asc' },
      take: 6,
    }),
    prisma.event.findMany({
      where: { status: 'published', date: { gte: new Date() } },
      orderBy: { date: 'asc' },
      take: 3,
    }),
    prisma.impactStory.findMany({
      where: { status: 'published' },
      orderBy: { createdAt: 'desc' },
      take: 3,
    }),
    prisma.galleryImage.findMany({
      where: { status: 'published' },
      orderBy: { order: 'asc' },
      take: 8,
    }),
  ])

  const settingsMap: Record<string, string> = {}
  settings.forEach((s) => (settingsMap[s.key] = s.value))

  return { settingsMap, programs, events, stories, gallery }
}

export default async function HomePage() {
  const { settingsMap, programs, events, stories, gallery } = await getHomeData()

  return (
    <>
      <Header />
      <main>
        <HeroSection settings={settingsMap} />
        <AboutSection settings={settingsMap} />
        <MissionVisionSection settings={settingsMap} />
        <ProgramsSection programs={programs} />
        <ImpactSection settings={settingsMap} />
        <GetInvolvedSection />
        <EventsSection events={events} />
        <StoriesSection stories={stories} />
        <GalleryPreviewSection images={gallery} />
        <VolunteerBannerSection />
      </main>
      <Footer />
    </>
  )
}
