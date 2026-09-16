'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useIntersection } from '@/lib/hooks'

const actions = [
  {
    number: '01',
    title: 'Partner With Us',
    description:
      'We collaborate with corporate partners on CSR initiatives that create measurable community impact. Together, we can scale our programs to reach more families.',
    cta: 'Explore Partnership',
    href: '/contact',
    image:
      'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&q=80',
    imageAlt: 'Corporate partnership and CSR collaboration',
  },
  {
    number: '02',
    title: 'Donate',
    description:
      'Your donation directly supports education, healthcare, and livelihoods for families in need. Every rupee creates a ripple of lasting change in communities.',
    cta: '♥ Donate Now',
    href: '/donate',
    image:
      'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=600&q=80',
    imageAlt: 'Donation helps community food distribution',
    featured: true,
  },
  {
    number: '03',
    title: 'Volunteer',
    description:
      'Join a growing community of changemakers. Whether for a day or long-term, your time and skills can transform lives. No experience necessary — only heart.',
    cta: 'Join as Volunteer',
    href: '/volunteer',
    image:
      'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&q=80',
    imageAlt: 'Volunteers working together with community',
  },
]

export default function GetInvolvedSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isVisible = useIntersection(ref)

  return (
    <section className="section-padding bg-warmgray-100" ref={ref}>
      <div className="container-wide">
        <div
          className={`text-center mb-14 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <p className="eyebrow mb-3">Take Action</p>
          <div className="divider-line mx-auto" />
          <h2 className="heading-lg text-warmgray-900 mb-4">
            How You Can Help
          </h2>
          <p className="text-warmgray-500 max-w-2xl mx-auto">
            There are many ways to be part of the change. Choose how you'd like to contribute to building stronger communities.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {actions.map((action, i) => (
            <div
              key={action.number}
              className={`group relative card-base overflow-hidden transition-all duration-700 ${
                action.featured
                  ? 'ring-2 ring-forest-600'
                  : ''
              } ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={action.image}
                  alt={action.imageAlt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                {action.featured && (
                  <div className="absolute top-4 right-4 bg-amber-400 text-black text-xs font-bold uppercase px-3 py-1">
                    Most Impactful
                  </div>
                )}
              </div>

              <div className="p-8">
                {/* Number */}
                <div className="font-serif text-6xl font-bold text-warmgray-100 leading-none absolute top-52 right-6">
                  {action.number}
                </div>

                <div className="relative">
                  <div className="font-serif text-4xl font-bold text-warmgray-200 leading-none mb-4">
                    {action.number}
                  </div>
                  <h3 className="font-serif text-xl font-bold text-warmgray-900 mb-3 group-hover:text-forest-600 transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-warmgray-500 text-sm leading-relaxed mb-6">
                    {action.description}
                  </p>
                  <Link
                    href={action.href}
                    className={`inline-flex items-center gap-2 font-semibold text-sm uppercase tracking-wide transition-all hover:gap-3 ${
                      action.featured
                        ? 'text-amber-600 hover:text-amber-700'
                        : 'text-forest-600 hover:text-forest-700'
                    }`}
                  >
                    {action.cta}
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
