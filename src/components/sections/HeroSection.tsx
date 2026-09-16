'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface HeroSectionProps {
  settings: Record<string, string>
}

export default function HeroSection({ settings }: HeroSectionProps) {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const heroImage =
    settings.hero_image ||
    'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1920&q=80'
  const heading =
    settings.hero_heading || 'Together, We Can Build a Better Tomorrow'
  const subheading =
    settings.hero_subheading ||
    'Gudala Family Foundation works at the grassroots level, bringing education, healthcare, and hope to communities that need it most.'

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          alt="Community members served by Gudala Family Foundation"
          fill
          className={`object-cover transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          priority
          sizes="100vw"
        />
        {/* Multi-layer overlay for drama + readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-wide py-32 md:py-40">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div
            className={`flex items-center gap-3 mb-6 transition-all duration-700 delay-200 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <div className="w-10 h-0.5 bg-amber-400" />
            <span className="text-amber-400 text-xs font-bold uppercase tracking-[0.3em]">
              Gudala Family Foundation
            </span>
          </div>

          {/* Heading */}
          <h1
            className={`font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] mb-6 transition-all duration-700 delay-300 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {heading}
          </h1>

          {/* Subheading */}
          <p
            className={`text-base md:text-lg text-white/80 leading-relaxed max-w-xl mb-10 transition-all duration-700 delay-400 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {subheading}
          </p>

          {/* CTAs */}
          <div
            className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 delay-500 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <Link href="/donate" className="btn-amber text-center">
              â™¥ Donate Now
            </Link>
            <Link href="/volunteer" className="btn-outline-white text-center">
              Get Involved
            </Link>
          </div>

          {/* Stats bar */}
          <div
            className={`mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 transition-all duration-700 delay-700 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {[
              { number: '10,000+', label: 'Lives Impacted' },
              { number: '2,500+', label: 'Children Supported' },
              { number: '150+', label: 'Programs Run' },
              { number: '500+', label: 'Volunteers' },
            ].map((stat) => (
              <div key={stat.label} className="border-l-2 border-amber-400 pl-4">
                <div className="font-serif text-2xl md:text-3xl font-bold text-white">
                  {stat.number}
                </div>
                <div className="text-white/70 text-xs uppercase tracking-wide mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
        <div className="flex flex-col items-center gap-2 text-white/60">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-5 h-8 border-2 border-white/40 rounded-full flex items-start justify-center pt-1.5">
            <div className="w-1 h-2 bg-white/60 rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  )
}
