'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useIntersection } from '@/lib/hooks'
import { formatDateShort } from '@/lib/utils'

interface Story {
  id: string
  title: string
  slug: string
  excerpt: string
  coverImage: string
  location: string
  date: Date | string
}

interface StoriesSectionProps {
  stories: Story[]
}

export default function StoriesSection({ stories }: StoriesSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isVisible = useIntersection(ref)

  if (stories.length === 0) return null

  const [featured, ...rest] = stories

  return (
    <section className="section-padding bg-warmgray-100" ref={ref}>
      <div className="container-wide">
        {/* Header */}
        <div
          className={`text-center mb-14 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <p className="eyebrow mb-3">Real People. Real Change.</p>
          <div className="divider-line mx-auto" />
          <h2 className="heading-lg text-warmgray-900 mb-4">Impact Stories</h2>
          <p className="text-warmgray-500 max-w-2xl mx-auto">
            Every story is a reminder of why we do what we do. These are the faces behind our work.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Featured story */}
          {featured && (
            <div
              className={`card-base group overflow-hidden transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="relative h-80 overflow-hidden">
                <Image
                  src={featured.coverImage || 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80'}
                  alt={featured.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="inline-block bg-forest-600 text-white text-xs font-bold uppercase tracking-wide px-3 py-1 mb-3">
                    Featured Story
                  </span>
                  <h3 className="font-serif text-xl md:text-2xl font-bold text-white leading-tight">
                    {featured.title}
                  </h3>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 text-xs text-warmgray-400 mb-4">
                  <span>{featured.location || 'India'}</span>
                  <span>•</span>
                  <span>{formatDateShort(featured.date)}</span>
                </div>
                <p className="text-warmgray-600 text-sm leading-relaxed mb-5 line-clamp-3">
                  {featured.excerpt}
                </p>
                <Link
                  href={`/stories/${featured.slug}`}
                  className="inline-flex items-center gap-2 text-forest-600 font-semibold text-sm uppercase tracking-wide hover:gap-3 transition-all"
                >
                  Read Full Story
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          )}

          {/* Other stories */}
          <div className="flex flex-col gap-6">
            {rest.map((story, i) => (
              <div
                key={story.id}
                className={`card-base group overflow-hidden flex gap-0 h-44 transition-all duration-700 ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${(i + 1) * 100}ms` }}
              >
                <div className="relative w-44 flex-shrink-0 overflow-hidden">
                  <Image
                    src={story.coverImage || 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&q=80'}
                    alt={story.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="176px"
                  />
                </div>
                <div className="p-5 flex flex-col justify-center">
                  <div className="text-xs text-warmgray-400 mb-2">
                    {story.location || 'India'} • {formatDateShort(story.date)}
                  </div>
                  <h3 className="font-serif text-base font-bold text-warmgray-900 mb-2 line-clamp-2 group-hover:text-forest-600 transition-colors">
                    {story.title}
                  </h3>
                  <p className="text-warmgray-500 text-xs leading-relaxed line-clamp-2 mb-3">
                    {story.excerpt}
                  </p>
                  <Link
                    href={`/stories/${story.slug}`}
                    className="inline-flex items-center gap-1 text-forest-600 font-semibold text-xs uppercase tracking-wide hover:gap-2 transition-all"
                  >
                    Read More
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-10">
          <Link href="/stories" className="btn-secondary">
            Read All Stories
          </Link>
        </div>
      </div>
    </section>
  )
}
