'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useIntersection } from '@/lib/hooks'

interface GalleryImage {
  id: string
  url: string
  caption: string
  altText: string
  category: string
}

interface GalleryPreviewProps {
  images: GalleryImage[]
}

export default function GalleryPreviewSection({ images }: GalleryPreviewProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isVisible = useIntersection(ref)
  const [lightbox, setLightbox] = useState<GalleryImage | null>(null)

  const preview = images.slice(0, 8)

  return (
    <section className="section-padding bg-cream" ref={ref}>
      <div className="container-wide">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div
            className={`transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <p className="eyebrow mb-3">Our Work in Pictures</p>
            <div className="divider-line" />
            <h2 className="heading-lg text-warmgray-900">Gallery</h2>
          </div>
          <Link
            href="/gallery"
            className={`btn-secondary text-sm transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            View Full Gallery
          </Link>
        </div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {preview.map((img, i) => {
            const isLarge = i === 0 || i === 5
            return (
              <div
                key={img.id}
                className={`relative overflow-hidden cursor-pointer group ${
                  isLarge ? 'md:row-span-2' : ''
                } transition-all duration-500 ${
                  isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
                style={{
                  transitionDelay: `${i * 50}ms`,
                  height: isLarge ? undefined : '180px',
                }}
                onClick={() => setLightbox(img)}
              >
                <div
                  className="relative overflow-hidden"
                  style={{ height: isLarge ? '370px' : '180px' }}
                >
                  <Image
                    src={img.url}
                    alt={img.altText || img.caption}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300" />

                  {/* Caption on hover */}
                  <div className="absolute inset-0 flex items-end p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-xs font-medium leading-tight line-clamp-2">
                      {img.caption}
                    </p>
                  </div>

                  {/* Zoom icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="lightbox-overlay"
          onClick={() => setLightbox(null)}
        >
          <div className="relative max-w-5xl max-h-screen p-4 w-full">
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-2 right-2 z-10 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div
              className="relative bg-black"
              style={{ height: 'min(80vh, 600px)' }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={lightbox.url}
                alt={lightbox.altText || lightbox.caption}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>
            {lightbox.caption && (
              <p className="text-white/80 text-sm text-center mt-3">
                {lightbox.caption}
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
