'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const CATEGORIES = ['All', 'Events', 'Education', 'Healthcare', 'Volunteers', 'Community', 'Environment']

interface GalleryImage {
  id: string
  url: string
  caption: string
  altText: string
  category: string
}

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [active, setActive] = useState('All')
  const [lightbox, setLightbox] = useState<{ img: GalleryImage; idx: number } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/gallery')
      .then((r) => r.json())
      .then((d) => { setImages(d.images || []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const filtered = active === 'All' ? images : images.filter((i) => i.category === active)

  const navigate = (dir: 1 | -1) => {
    if (!lightbox) return
    const newIdx = (lightbox.idx + dir + filtered.length) % filtered.length
    setLightbox({ img: filtered[newIdx], idx: newIdx })
  }

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative h-72 md:h-96">
          <Image
            src="https://images.unsplash.com/photo-1593113598332-cd288d649433?w=1920&q=80"
            alt="Gallery"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-forest-600/75" />
          <div className="absolute inset-0 flex items-center">
            <div className="container-wide">
              <p className="eyebrow-light mb-3">Our Work in Pictures</p>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-white">Gallery</h1>
              <nav className="mt-4 text-white/70 text-sm flex items-center gap-2">
                <Link href="/" className="hover:text-white">Home</Link>
                <span>/</span>
                <span className="text-white">Gallery</span>
              </nav>
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="section-padding bg-cream">
          <div className="container-wide">
            <div className="text-center mb-10">
              <p className="eyebrow mb-3">Documentary Photography</p>
              <div className="divider-line mx-auto" />
              <h2 className="heading-lg mb-5">Field Documentation</h2>
              <p className="text-warmgray-500 max-w-2xl mx-auto">
                Real photographs from our programs and events — the authentic faces and stories of community impact.
              </p>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className={`px-5 py-2 text-sm font-semibold uppercase tracking-wide transition-all border ${
                    active === cat
                      ? 'bg-forest-600 text-white border-forest-600'
                      : 'bg-white text-warmgray-600 border-warmgray-200 hover:border-forest-600 hover:text-forest-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="h-56 bg-warmgray-200 animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="masonry-grid">
                {filtered.map((img, idx) => (
                  <div
                    key={img.id}
                    className="masonry-item relative overflow-hidden cursor-pointer group"
                    onClick={() => setLightbox({ img, idx })}
                  >
                    <div className="relative overflow-hidden">
                      <Image
                        src={img.url}
                        alt={img.altText || img.caption}
                        width={600}
                        height={400}
                        className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300" />
                      <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mb-2">
                          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                        </div>
                      </div>
                      {img.caption && (
                        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 opacity-0 group-hover:opacity-100 transition-opacity">
                          <p className="text-white text-xs">{img.caption}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {filtered.length === 0 && !loading && (
              <div className="text-center py-16 text-warmgray-400">
                <div className="text-5xl mb-4">📷</div>
                <p className="text-lg">No images in this category yet.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />

      {/* Lightbox */}
      {lightbox && (
        <div className="lightbox-overlay" onClick={() => setLightbox(null)}>
          <div className="relative w-full max-w-6xl max-h-screen p-4 flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-2 right-2 z-10 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20"
            >
              ✕
            </button>

            <div className="relative w-full" style={{ height: 'min(75vh, 600px)' }}>
              <Image
                src={lightbox.img.url}
                alt={lightbox.img.altText || lightbox.img.caption}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>

            {lightbox.img.caption && (
              <p className="text-white/80 text-sm mt-3 text-center">{lightbox.img.caption}</p>
            )}

            <div className="flex items-center gap-4 mt-4">
              <button
                onClick={() => navigate(-1)}
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20"
              >
                ←
              </button>
              <span className="text-white/60 text-sm">
                {lightbox.idx + 1} / {filtered.length}
              </span>
              <button
                onClick={() => navigate(1)}
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20"
              >
                →
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
