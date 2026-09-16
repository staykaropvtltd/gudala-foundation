'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useIntersection } from '@/lib/hooks'

interface Program {
  id: string
  title: string
  slug: string
  description: string
  coverImage: string
  category: string
}

interface ProgramsSectionProps {
  programs: Program[]
}

const CATEGORIES = ['All', 'Education', 'Healthcare', 'Empowerment', 'Environment', 'Community']

export default function ProgramsSection({ programs }: ProgramsSectionProps) {
  const [activeCategory, setActiveCategory] = useState('All')
  const ref = useRef<HTMLDivElement>(null)
  const isVisible = useIntersection(ref)

  const filtered =
    activeCategory === 'All'
      ? programs
      : programs.filter((p) => p.category === activeCategory)

  return (
    <section className="section-padding bg-cream" ref={ref}>
      <div className="container-wide">
        {/* Header */}
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <p className="eyebrow mb-3">Our Work</p>
          <div className="divider-line mx-auto" />
          <h2 className="heading-lg text-warmgray-900 mb-4">What We Do</h2>
          <p className="text-warmgray-500 max-w-2xl mx-auto text-base">
            Across every program, our commitment remains constant: real people, real change, real hope.
            Every initiative is designed to create lasting impact.
          </p>
        </div>

        {/* Filter tabs */}
        <div
          className={`flex flex-wrap justify-center gap-2 mb-12 transition-all duration-700 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 text-sm font-medium uppercase tracking-wide transition-all duration-200 border ${
                activeCategory === cat
                  ? 'bg-forest-600 text-white border-forest-600'
                  : 'bg-transparent text-warmgray-600 border-warmgray-200 hover:border-forest-600 hover:text-forest-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Programs grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((program, i) => (
            <div
              key={program.id}
              className={`program-card card-base group transition-all duration-500 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {/* Image */}
              <div className="relative h-60 overflow-hidden">
                <Image
                  src={program.coverImage || 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80'}
                  alt={program.title}
                  fill
                  className="program-card-img"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Category badge */}
                <span className="absolute top-4 left-4 bg-white/90 text-forest-600 text-xs font-bold uppercase tracking-wide px-3 py-1">
                  {program.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-serif text-xl font-semibold text-warmgray-900 mb-3 group-hover:text-forest-600 transition-colors">
                  {program.title}
                </h3>
                <p className="text-warmgray-500 text-sm leading-relaxed mb-5 line-clamp-3">
                  {program.description}
                </p>
                <Link
                  href={`/programs/${program.slug}`}
                  className="inline-flex items-center gap-2 text-forest-600 font-semibold text-sm uppercase tracking-wide hover:gap-3 transition-all"
                >
                  Learn More
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View all */}
        <div className="text-center mt-12">
          <Link href="/programs" className="btn-secondary">
            View All Programs
          </Link>
        </div>
      </div>
    </section>
  )
}
