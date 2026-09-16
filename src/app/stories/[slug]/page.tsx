import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { prisma } from '@/lib/prisma'
import { formatDate } from '@/lib/utils'

interface Props { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const story = await prisma.impactStory.findUnique({ where: { slug: params.slug } })
  if (!story) return { title: 'Story Not Found' }
  return { title: story.title, description: story.excerpt }
}

export default async function StoryDetailPage({ params }: Props) {
  const story = await prisma.impactStory.findUnique({
    where: { slug: params.slug },
    include: { images: { orderBy: { order: 'asc' } }, program: true },
  })

  if (!story || story.status !== 'published') notFound()

  const paragraphs = story.content.split('\n\n').filter(Boolean)

  const related = await prisma.impactStory.findMany({
    where: { status: 'published', NOT: { slug: params.slug } },
    take: 3,
    orderBy: { createdAt: 'desc' },
  })

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative h-80 md:h-[500px]">
          <Image
            src={story.coverImage || 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1920&q=80'}
            alt={story.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 pb-12">
            <div className="container-wide">
              {story.program && (
                <span className="inline-block bg-forest-600 text-white text-xs font-bold uppercase px-3 py-1 mb-4">
                  {story.program.title}
                </span>
              )}
              <h1 className="font-serif text-3xl md:text-5xl font-bold text-white max-w-4xl leading-tight mb-4">
                {story.title}
              </h1>
              <div className="flex items-center gap-4 text-white/70 text-sm">
                <span>{story.location || 'India'}</span>
                <span>•</span>
                <span>{formatDate(story.date)}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="section-padding bg-cream">
          <div className="container-wide">
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <blockquote className="border-l-4 border-forest-600 pl-6 mb-8">
                  <p className="font-serif text-xl md:text-2xl italic text-warmgray-700 leading-relaxed">
                    "{story.excerpt}"
                  </p>
                </blockquote>

                <div className="space-y-5">
                  {paragraphs.map((para, i) => (
                    <p key={i} className="text-warmgray-600 leading-relaxed text-base">
                      {para}
                    </p>
                  ))}
                </div>

                {/* Gallery */}
                {story.images.length > 0 && (
                  <div className="mt-12">
                    <h3 className="font-serif text-xl font-bold text-warmgray-900 mb-6">Gallery</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {story.images.map((img) => (
                        <div key={img.id} className="relative h-48 overflow-hidden">
                          <Image
                            src={img.url}
                            alt={img.caption || story.title}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 768px) 50vw, 33vw"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div>
                <div className="bg-forest-600 p-6 text-white mb-6">
                  <p className="text-white/80 text-sm mb-4">
                    Stories like this are made possible by donors, volunteers, and partners who believe in community transformation.
                  </p>
                  <Link href="/donate" className="btn-amber w-full text-center block mb-3">
                    ♥ Support Our Work
                  </Link>
                  <Link href="/volunteer" className="btn-outline-white w-full text-center block text-sm">
                    Volunteer
                  </Link>
                </div>

                {related.length > 0 && (
                  <div>
                    <h3 className="font-serif text-lg font-bold text-warmgray-900 mb-4">More Stories</h3>
                    <div className="space-y-4">
                      {related.map((r) => (
                        <Link key={r.id} href={`/stories/${r.slug}`} className="flex gap-3 group">
                          <div className="relative w-20 h-16 flex-shrink-0 overflow-hidden">
                            <Image
                              src={r.coverImage || 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=200&q=80'}
                              alt={r.title}
                              fill
                              className="object-cover"
                              sizes="80px"
                            />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-warmgray-800 group-hover:text-forest-600 transition-colors leading-tight line-clamp-2">
                              {r.title}
                            </p>
                            <p className="text-xs text-warmgray-400 mt-1">{r.location || 'India'}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
