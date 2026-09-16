'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { useEffect } from 'react'

const CATEGORIES = ['All', 'Education', 'Healthcare', 'Empowerment', 'Environment', 'Community']

interface Program {
  id: string
  title: string
  slug: string
  description: string
  coverImage: string
  category: string
}

export default function ProgramsPage() {
  const [programs, setPrograms] = useState<Program[]>([])
  const [activeCategory, setActiveCategory] = useState('All')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/programs')
      .then((r) => r.json())
      .then((data) => { setPrograms(data.programs || []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const filtered = activeCategory === 'All'
    ? programs
    : programs.filter((p) => p.category === activeCategory)

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative h-72 md:h-96">
          <Image
            src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1920&q=80"
            alt="Our Programs"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-forest-600/75" />
          <div className="absolute inset-0 flex items-center">
            <div className="container-wide">
              <p className="eyebrow-light mb-3">Our Work</p>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-white">
                What We Do
              </h1>
              <nav className="mt-4 text-white/70 text-sm flex items-center gap-2">
                <Link href="/" className="hover:text-white">Home</Link>
                <span>/</span>
                <span className="text-white">Programs</span>
              </nav>
            </div>
          </div>
        </section>

        {/* Intro */}
        <section className="section-padding-sm bg-cream">
          <div className="container-narrow text-center">
            <p className="eyebrow mb-3">Across Every Community</p>
            <div className="divider-line mx-auto" />
            <h2 className="heading-lg mb-5">Programs That Create Lasting Change</h2>
            <p className="text-warmgray-500 text-base leading-relaxed">
              Our programs are designed with communities, not just for them. Each initiative is rooted in deep understanding of local needs and sustained by local participation.
            </p>
          </div>
        </section>

        {/* Programs */}
        <section className="section-padding-sm bg-warmgray-100">
          <div className="container-wide">
            {/* Filters */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2 text-sm font-semibold uppercase tracking-wide transition-all border ${
                    activeCategory === cat
                      ? 'bg-forest-600 text-white border-forest-600'
                      : 'bg-white text-warmgray-600 border-warmgray-200 hover:border-forest-600 hover:text-forest-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white h-96 animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filtered.map((program) => (
                  <div key={program.id} className="card-base group overflow-hidden">
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={program.coverImage || 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80'}
                        alt={program.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-white/90 text-forest-600 text-xs font-bold uppercase px-3 py-1">
                          {program.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-7">
                      <h3 className="font-serif text-xl font-bold text-warmgray-900 mb-3 group-hover:text-forest-600 transition-colors">
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
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
