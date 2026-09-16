'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useIntersection } from '@/lib/hooks'
import { formatDate } from '@/lib/utils'

interface Event {
  id: string
  title: string
  slug: string
  description: string
  coverImage: string
  date: Date | string
  startTime: string
  location: string
}

interface EventsSectionProps {
  events: Event[]
}

export default function EventsSection({ events }: EventsSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isVisible = useIntersection(ref)

  if (events.length === 0) return null

  return (
    <section className="section-padding bg-cream" ref={ref}>
      <div className="container-wide">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div
            className={`transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <p className="eyebrow mb-3">Community Calendar</p>
            <div className="divider-line" />
            <h2 className="heading-lg text-warmgray-900">
              Upcoming Events
            </h2>
          </div>
          <Link
            href="/events"
            className={`btn-secondary text-sm transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            View All Events
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {events.map((event, i) => {
            const date = new Date(event.date)
            const day = date.getDate()
            const month = date.toLocaleDateString('en-IN', { month: 'short' })
            const year = date.getFullYear()

            return (
              <div
                key={event.id}
                className={`card-base group overflow-hidden transition-all duration-500 ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {/* Image with date badge */}
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={event.coverImage || 'https://images.unsplash.com/photo-1509099863731-ef4bff19e808?w=600&q=80'}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                  {/* Date badge */}
                  <div className="absolute top-4 left-4 bg-forest-600 text-white text-center px-3 py-2 min-w-16">
                    <div className="text-2xl font-bold leading-none font-serif">
                      {day}
                    </div>
                    <div className="text-xs uppercase tracking-wide opacity-90 mt-0.5">
                      {month} {year}
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-serif text-lg font-bold text-warmgray-900 mb-2 group-hover:text-forest-600 transition-colors line-clamp-2">
                    {event.title}
                  </h3>

                  {/* Meta */}
                  <div className="flex flex-col gap-1.5 mb-4">
                    <div className="flex items-center gap-2 text-warmgray-500 text-xs">
                      <svg className="w-3.5 h-3.5 text-forest-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {event.startTime || 'Time TBC'}
                    </div>
                    <div className="flex items-center gap-2 text-warmgray-500 text-xs">
                      <svg className="w-3.5 h-3.5 text-forest-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                    View Event
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
