import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { prisma } from '@/lib/prisma'
import { formatDate, isUpcoming } from '@/lib/utils'

interface Props { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const event = await prisma.event.findUnique({ where: { slug: params.slug } })
  if (!event) return { title: 'Event Not Found' }
  return { title: event.title, description: event.description }
}

export default async function EventDetailPage({ params }: Props) {
  const event = await prisma.event.findUnique({
    where: { slug: params.slug },
    include: { images: { orderBy: { order: 'asc' } }, program: true },
  })

  if (!event) notFound()

  const upcoming = isUpcoming(event.date)
  const contentParagraphs = event.content.split('\n\n').filter(Boolean)

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative h-80 md:h-[500px]">
          <Image
            src={event.coverImage || 'https://images.unsplash.com/photo-1509099863731-ef4bff19e808?w=1920&q=80'}
            alt={event.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
          <div className="absolute bottom-0 left-0 right-0 pb-12">
            <div className="container-wide">
              <div className="flex items-center gap-3 mb-4">
                <span className={`text-xs font-bold uppercase px-3 py-1 ${
                  upcoming ? 'bg-amber-400 text-black' : 'bg-warmgray-600 text-white'
                }`}>
                  {upcoming ? 'Upcoming' : 'Past Event'}
                </span>
                {event.program && (
                  <span className="bg-forest-600 text-white text-xs font-bold uppercase px-3 py-1">
                    {event.program.title}
                  </span>
                )}
              </div>
              <h1 className="font-serif text-3xl md:text-5xl font-bold text-white max-w-4xl leading-tight">
                {event.title}
              </h1>
              <nav className="mt-4 text-white/60 text-sm flex items-center gap-2">
                <Link href="/" className="hover:text-white">Home</Link>
                <span>/</span>
                <Link href="/events" className="hover:text-white">Events</Link>
                <span>/</span>
                <span className="text-white">{event.title}</span>
              </nav>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="section-padding bg-cream">
          <div className="container-wide">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Main */}
              <div className="lg:col-span-2">
                <p className="text-warmgray-500 text-lg leading-relaxed mb-8 font-light">
                  {event.description}
                </p>
                <div className="space-y-4 text-warmgray-600 leading-relaxed">
                  {contentParagraphs.map((p, i) => <p key={i}>{p}</p>)}
                </div>

                {/* Gallery */}
                {event.images.length > 0 && (
                  <div className="mt-12">
                    <h3 className="font-serif text-xl font-bold text-warmgray-900 mb-6">
                      Event Gallery
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {event.images.map((img) => (
                        <div key={img.id} className="relative h-48 overflow-hidden group">
                          <Image
                            src={img.url}
                            alt={img.caption || event.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 768px) 50vw, 33vw"
                          />
                          {img.caption && (
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                              <p className="text-white text-xs">{img.caption}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div>
                <div className="bg-warmgray-100 p-6 mb-6">
                  <h3 className="font-serif text-lg font-bold text-warmgray-900 mb-5">
                    Event Details
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <svg className="w-4 h-4 text-forest-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <div>
                        <div className="text-xs text-warmgray-500 uppercase tracking-wide mb-0.5">Date</div>
                        <div className="font-medium text-warmgray-800 text-sm">{formatDate(event.date)}</div>
                      </div>
                    </li>
                    {event.startTime && (
                      <li className="flex items-start gap-3">
                        <svg className="w-4 h-4 text-forest-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                          <div className="text-xs text-warmgray-500 uppercase tracking-wide mb-0.5">Time</div>
                          <div className="font-medium text-warmgray-800 text-sm">
                            {event.startTime} {event.endTime ? `— ${event.endTime}` : ''}
                          </div>
                        </div>
                      </li>
                    )}
                    <li className="flex items-start gap-3">
                      <svg className="w-4 h-4 text-forest-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                      </svg>
                      <div>
                        <div className="text-xs text-warmgray-500 uppercase tracking-wide mb-0.5">Location</div>
                        <div className="font-medium text-warmgray-800 text-sm">{event.location}</div>
                        {event.address && <div className="text-warmgray-500 text-xs mt-0.5">{event.address}</div>}
                      </div>
                    </li>
                  </ul>
                </div>

                {upcoming && (
                  <div className="bg-forest-600 p-6 text-white mb-6">
                    <h3 className="font-serif text-lg font-bold mb-3">Register / Attend</h3>
                    <p className="text-white/80 text-sm mb-5">
                      Join us for this event. For registration or more information, please get in touch.
                    </p>
                    {event.registrationLink ? (
                      <a href={event.registrationLink} target="_blank" rel="noopener noreferrer" className="btn-amber w-full text-center block">
                        Register Now
                      </a>
                    ) : (
                      <Link href="/contact" className="btn-amber w-full text-center block">
                        Contact Us
                      </Link>
                    )}
                  </div>
                )}

                <div className="bg-warmgray-100 p-6">
                  <h3 className="font-serif text-base font-bold text-warmgray-900 mb-3">
                    Share This Event
                  </h3>
                  <div className="flex gap-2">
                    {['Facebook', 'Twitter', 'WhatsApp'].map((s) => (
                      <button key={s} className="flex-1 py-2 text-xs font-semibold text-warmgray-600 border border-warmgray-200 hover:border-forest-600 hover:text-forest-600 transition-colors">
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
