'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useIntersection } from '@/lib/hooks'

interface AboutSectionProps {
  settings: Record<string, string>
}

export default function AboutSection({ settings }: AboutSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isVisible = useIntersection(ref)

  const heading =
    settings.about_heading ||
    'Serving Communities With Compassion, Dignity & Purpose'
  const content =
    settings.about_content ||
    'Gudala Family Foundation was established with a singular vision: to stand beside communities that have been left behind.'
  const image =
    settings.about_image ||
    'https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&q=80'

  const paragraphs = content.split('\n\n').filter(Boolean)

  return (
    <section className="section-padding bg-cream" ref={ref}>
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Images */}
          <div
            className={`relative transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            <div className="relative">
              {/* Main image */}
              <div className="relative h-[480px] md:h-[560px] overflow-hidden">
                <Image
                  src={image}
                  alt="Foundation community work"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              {/* Floating accent box */}
              <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-forest-600 hidden md:flex flex-col items-center justify-center text-white text-center p-6">
                <div className="font-serif text-4xl font-bold text-amber-400">
                  {new Date().getFullYear() - 2020}+
                </div>
                <div className="text-xs uppercase tracking-wider mt-1 text-white/80">
                  Years of Service
                </div>
              </div>

              {/* Second small image */}
              <div className="absolute -bottom-6 left-8 w-40 h-40 border-4 border-white shadow-warm-lg hidden md:block overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&q=80"
                  alt="Children in education program"
                  fill
                  className="object-cover"
                  sizes="160px"
                />
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            <p className="eyebrow mb-3">Who We Are</p>
            <div className="divider-line" />
            <h2 className="heading-lg mb-6 text-warmgray-900 leading-tight">
              {heading}
            </h2>

            <div className="space-y-4 text-warmgray-600 leading-relaxed text-base">
              {paragraphs.slice(0, 3).map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {/* Values */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                { icon: 'â¤', label: 'Compassion', desc: 'Community-first approach' },
                { icon: 'ðŸ¤', label: 'Integrity', desc: 'Transparent operations' },
                { icon: 'ðŸŒ±', label: 'Sustainability', desc: 'Long-term impact' },
                { icon: 'ðŸ‘¥', label: 'Inclusion', desc: 'Serving all equally' },
              ].map((val) => (
                <div key={val.label} className="flex items-start gap-3">
                  <span className="text-xl">{val.icon}</span>
                  <div>
                    <div className="font-semibold text-warmgray-800 text-sm">
                      {val.label}
                    </div>
                    <div className="text-xs text-warmgray-500">{val.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <Link href="/about" className="btn-primary">
                Learn Our Story
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
