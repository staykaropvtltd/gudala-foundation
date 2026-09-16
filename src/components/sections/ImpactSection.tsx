'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { useIntersection, useCounter } from '@/lib/hooks'

interface ImpactSectionProps {
  settings: Record<string, string>
}

function StatCounter({
  value,
  label,
  description,
  start,
}: {
  value: string
  label: string
  description: string
  start: boolean
}) {
  const numericPart = value.replace(/[^0-9]/g, '')
  const suffix = value.replace(/[0-9]/g, '')
  const numeric = parseInt(numericPart) || 0
  const count = useCounter(numeric, 2000, start)

  return (
    <div className="text-center group">
      <div className="impact-number text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-2 leading-none">
        {count.toLocaleString('en-IN')}
        <span className="text-amber-400">{suffix}</span>
      </div>
      <div className="font-serif text-lg md:text-xl font-semibold text-white/90 mb-2">
        {label}
      </div>
      <div className="text-white/60 text-sm">{description}</div>
    </div>
  )
}

export default function ImpactSection({ settings }: ImpactSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isVisible = useIntersection(ref, 0.3)

  const stats = [
    {
      value: settings.impact_lives || '10,000+',
      label: 'Lives Impacted',
      description: 'Across all our programs',
    },
    {
      value: settings.impact_children || '2,500+',
      label: 'Children Supported',
      description: 'Through education & nutrition',
    },
    {
      value: settings.impact_programs || '150+',
      label: 'Community Programs',
      description: 'Run since inception',
    },
    {
      value: settings.impact_volunteers || '500+',
      label: 'Dedicated Volunteers',
      description: 'Across the country',
    },
  ]

  return (
    <section className="relative section-padding overflow-hidden" ref={ref}>
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1593113598332-cd288d649433?w=1920&q=80"
          alt="Foundation impact — community volunteers working together"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-forest-600/88" />
        <div className="absolute inset-0 bg-warm-pattern opacity-30" />
      </div>

      <div className="relative z-10 container-wide">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-amber-400 text-xs font-bold uppercase tracking-[0.3em] mb-3">
            Our Impact
          </p>
          <div className="w-16 h-1 bg-amber-400 mx-auto mb-6" />
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Numbers That Tell the Story
          </h2>
          <p className="text-white/70 mt-4 max-w-xl mx-auto">
            Behind every number is a real person, a real family, a real story of transformation.
          </p>
        </div>

        {/* Stats grid */}
        <div
          className={`grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {stats.map((stat, i) => (
            <StatCounter
              key={i}
              value={stat.value}
              label={stat.label}
              description={stat.description}
              start={isVisible}
            />
          ))}
        </div>

        {/* Divider */}
        <div className="mt-16 border-t border-white/20" />

        {/* Program highlights */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Education', detail: 'Schools & Learning Centers' },
            { label: 'Healthcare', detail: 'Medical Camps & Outreach' },
            { label: 'Women', detail: 'Empowerment & Training' },
            { label: 'Environment', detail: 'Plantation & Awareness' },
          ].map((item) => (
            <div
              key={item.label}
              className={`text-center transition-all duration-700 delay-400 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="w-12 h-12 border-2 border-amber-400 mx-auto flex items-center justify-center mb-3">
                <div className="w-2 h-2 bg-amber-400 rounded-full" />
              </div>
              <div className="font-serif font-semibold text-white text-sm">
                {item.label}
              </div>
              <div className="text-white/50 text-xs mt-1">{item.detail}</div>
            </div>
          ))}
        </div>

        <p className="text-center text-white/30 text-xs mt-8">
          * All figures are representative placeholders. Actual impact data to be provided by the foundation.
        </p>
      </div>
    </section>
  )
}
