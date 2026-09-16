import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { prisma } from '@/lib/prisma'
import { formatDate } from '@/lib/utils'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Events',
  description: 'Upcoming and past events by Gudala Family Foundation.',
}

async function getEvents() {
  try {
    const now = new Date()
    const [upcoming, past] = await Promise.all([
      prisma.event.findMany({
        where: { status: 'published', date: { gte: now } },
        orderBy: { date: 'asc' },
      }),
      prisma.event.findMany({
        where: { status: { in: ['completed', 'published'] }, date: { lt: now } },
        orderBy: { date: 'desc' },
      }),
    ])
    return { upcoming, past }
  } catch {
    return { upcoming: [], past: [] }
  }
}

export default async function EventsPage() {
  const { upcoming, past } = await getEvents()

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative h-72 md:h-96">
          <Image
            src="https://images.unsplash.com/photo-1509099863731-ef4bff19e808?w=1920&q=80"
            alt="Foundation events"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-forest-600/75" />
          <div className="absolute inset-0 flex items-center">
            <div className="container-wide">
              <p className="eyebrow-light mb-3">Community Calendar</p>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-white">Events</h1>
              <nav className="mt-4 text-white/70 text-sm flex items-center gap-2">
                <Link href="/" className="hover:text-white">Home</Link>
                <span>/</span>
                <span className="text-white">Events</span>
              </nav>
            </div>
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="section-padding bg-cream">
          <div className="container-wide">
            <div className="mb-12">
              <p className="eyebrow mb-3">What&apos;s Coming Up</p>
              <div className="divider-line" />
              <h2 className="heading-lg">Upcoming Events</h2>
            </div>

            {upcoming.length === 0 ? (
              <div className="text-center py-16 bg-warmgray-100">
                <div className="text-5xl mb-4 text-warmgray-300">
                  <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-serif text-xl font-semibold text-warmgray-700 mb-2">
                  No upcoming events at this time
                </h3>
                <p className="text-warmgray-500 text-sm">
                  Check back soon for new events and programs.
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {upcoming.map((event) => {
                  const d = new Date(event.date)
                  return (
                    <div key={event.id} className="card-base group overflow-hidden">
                      <div className="relative h-56 overflow-hidden">
                        <Image
                          src={event.coverImage || 'https://images.unsplash.com/photo-1509099863731-ef4bff19e808?w=600&q=80'}
                          alt={event.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        <div className="absolute top-4 left-4 bg-forest-600 text-white text-center px-3 py-2">
                          <div className="text-xl font-bold font-serif leading-none">{d.getDate()}</div>
                          <div className="text-xs uppercase tracking-wide opacity-90">
                            {d.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
                          </div>
                        </div>
                        <div className="absolute top-4 right-4 bg-amber-400 text-black text-xs font-bold uppercase px-2 py-1">
                          Upcoming
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="font-serif text-lg font-bold text-warmgray-900 mb-2 group-hover:text-forest-600 transition-colors">
                          {event.title}
                        </h3>
                        <div className="flex flex-col gap-1 mb-4 text-xs text-warmgray-500">
                          <div className="flex items-center gap-1.5">
                            <svg className="w-3.5 h-3.5 text-forest-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {event.startTime} {event.endTime ? `– ${event.endTime}` : ''}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <svg className="w-3.5 h-3.5 text-forest-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                            </svg>
                            {event.location}
                          </div>
                        </div>
                        <p className="text-warmgray-500 text-sm leading-relaxed mb-5 line-clamp-2">
                          {event.description}
                        </p>
                        <Link
                          href={`/events/${event.slug}`}
                          className="inline-flex items-center gap-2 text-forest-600 font-semibold text-sm uppercase tracking-wide hover:gap-3 transition-all"
                        >
                          View Event &rarr;
                        </Link>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </section>

        {/* Past Events */}
        {past.length > 0 && (
          <section className="section-padding bg-warmgray-100">
            <div className="container-wide">
              <div className="mb-12">
                <p className="eyebrow mb-3">What We&apos;ve Done</p>
                <div className="divider-line" />
                <h2 className="heading-lg">Past Events</h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {past.map((event) => (
                  <div key={event.id} className="card-base group overflow-hidden opacity-90">
                    <div className="relative h-52 overflow-hidden">
                      <Image
                        src={event.coverImage || 'https://images.unsplash.com/photo-1509099863731-ef4bff19e808?w=600&q=80'}
                        alt={event.title}
                        fill
                        className="object-cover grayscale-[30%] transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute top-4 right-4 bg-warmgray-600 text-white text-xs font-bold uppercase px-2 py-1">
                        Completed
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="text-xs text-warmgray-400 mb-2 font-medium">
                        {formatDate(event.date)} &bull; {event.location}
                      </div>
                      <h3 className="font-serif text-lg font-bold text-warmgray-800 mb-3 group-hover:text-forest-600 transition-colors">
                        {event.title}
                      </h3>
                      <p className="text-warmgray-500 text-sm leading-relaxed mb-4 line-clamp-2">
                        {event.description}
                      </p>
                      <Link
                        href={`/events/${event.slug}`}
                        className="inline-flex items-center gap-2 text-forest-600 font-semibold text-sm hover:gap-3 transition-all"
                      >
                        View Details &rarr;
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  )
}
