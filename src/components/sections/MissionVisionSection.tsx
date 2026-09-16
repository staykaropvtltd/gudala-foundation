'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { useIntersection } from '@/lib/hooks'

interface MissionVisionProps {
  settings: Record<string, string>
}

export default function MissionVisionSection({ settings }: MissionVisionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isVisible = useIntersection(ref)

  const mission =
    settings.mission ||
    'To empower underserved communities through sustainable programs in education, healthcare, and livelihood development.'
  const vision =
    settings.vision ||
    'A world where every individual has equal access to education, healthcare, and opportunity — and can live with dignity and purpose.'
  const missionImg =
    settings.mission_image ||
    'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=900&q=80'
  const visionImg =
    settings.vision_image ||
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=900&q=80'

  return (
    <section className="section-padding bg-warmgray-100" ref={ref}>
      <div className="container-wide">
        <div className="text-center mb-14">
          <p className="eyebrow mb-3">Our Purpose</p>
          <div className="divider-line mx-auto" />
          <h2 className="heading-lg text-warmgray-900 max-w-2xl mx-auto">
            Driven by Mission, Guided by Vision
          </h2>
        </div>

        <div className="space-y-0">
          {/* Mission */}
          <div
            className={`grid lg:grid-cols-2 items-stretch transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="relative h-72 md:h-96 overflow-hidden">
              <Image
                src={missionImg}
                alt="Our mission — education and community empowerment"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-forest-600/20" />
            </div>

            <div className="bg-forest-600 p-10 md:p-16 flex flex-col justify-center">
              <p className="eyebrow-light mb-4">Our Mission</p>
              <div className="divider-line-amber mb-6" />
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-white mb-6 leading-tight">
                What We Stand For
              </h3>
              <p className="text-white/85 text-base leading-relaxed">{mission}</p>

              <div className="mt-8 flex items-center gap-4">
                <div className="w-12 h-12 border-2 border-amber-400 flex items-center justify-center text-amber-400">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <p className="text-white/70 text-sm italic">
                  "Every act of compassion creates a ripple of change."
                </p>
              </div>
            </div>
          </div>

          {/* Vision */}
          <div
            className={`grid lg:grid-cols-2 items-stretch transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="bg-earth-600 p-10 md:p-16 flex flex-col justify-center order-2 lg:order-1">
              <p className="text-amber-300 text-xs font-bold uppercase tracking-[0.3em] mb-4">
                Our Vision
              </p>
              <div className="w-16 h-1 bg-amber-400 mb-6" />
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-white mb-6 leading-tight">
                The Future We're Building
              </h3>
              <p className="text-white/85 text-base leading-relaxed">{vision}</p>

              <div className="mt-8 flex items-center gap-4">
                <div className="w-12 h-12 border-2 border-amber-400 flex items-center justify-center text-amber-400">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-white/70 text-sm italic">
                  "A better world starts with one community at a time."
                </p>
              </div>
            </div>

            <div className="relative h-72 md:h-96 overflow-hidden order-1 lg:order-2">
              <Image
                src={visionImg}
                alt="Our vision — empowered communities"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-earth-600/20" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
