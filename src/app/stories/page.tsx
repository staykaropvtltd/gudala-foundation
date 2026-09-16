import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { prisma } from '@/lib/prisma'
import { formatDateShort } from '@/lib/utils'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Impact Stories',
  description: 'Real stories of transformation from communities served by Gudala Family Foundation.',
}

export default async function StoriesPage() {
  const stories = await prisma.impactStory.findMany({
    where: { status: 'published' },
    orderBy: { createdAt: 'desc' },
    include: { program: true },
  }).catch(() => [] as Awaited<ReturnType<typeof prisma.impactStory.findMany<{ include: { program: true } }>>>)

  const [featured, ...rest] = stories

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative h-72 md:h-96">
          <Image
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1920&q=80"
            alt="Impact stories"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-forest-600/70" />
          <div className="absolute inset-0 flex items-center">
            <div className="container-wide">
              <p className="eyebrow-light mb-3">Real People. Real Change.</p>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-white">
                Impact Stories
              </h1>
              <nav className="mt-4 text-white/70 text-sm flex items-center gap-2">
                <Link href="/" className="hover:text-white">Home</Link>
                <span>/</span>
                <span className="text-white">Stories</span>
              </nav>
            </div>
          </div>
        </section>

        {/* Intro */}
        <section className="section-padding-sm bg-cream">
          <div className="container-narrow text-center">
            <p className="eyebrow mb-3">Behind Every Number</p>
            <div className="divider-line mx-auto" />
            <h2 className="heading-lg mb-5">Stories of Real Transformation</h2>
            <p className="text-warmgray-500">
              These are the faces and journeys that give our work meaning. Every story is a reminder of why community-centred development matters.
            </p>
            <p className="text-xs text-warmgray-400 mt-3">
              Note: Stories below contain representative narratives. Real stories from beneficiaries will be shared with their consent.
            </p>
          </div>
        </section>

        {/* Featured */}
        {featured && (
          <section className="section-padding-sm bg-warmgray-100">
            <div className="container-wide">
              <div className="grid lg:grid-cols-2 gap-0 card-base overflow-hidden">
                <div className="relative h-80 md:h-auto min-h-64">
                  <Image
                    src={featured.coverImage || 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80'}
                    alt={featured.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="p-10 md:p-12 flex flex-col justify-center">
                  <span className="inline-block bg-forest-600 text-white text-xs font-bold uppercase px-3 py-1 mb-5 self-start">
                    Featured Story
                  </span>
                  <p className="font-serif text-xl md:text-2xl italic text-warmgray-400 mb-4">
                    &ldquo;Real People. Real Change. Real Hope.&rdquo;
                  </p>
                  <h2 className="font-serif text-2xl md:text-3xl font-bold text-warmgray-900 mb-4 leading-tight">
                    {featured.title}
                  </h2>
                  <div className="flex items-center gap-3 text-xs text-warmgray-400 mb-5">
                    <span>{featured.location || 'India'}</span>
                    <span>&bull;</span>
                    <span>{formatDateShort(featured.date)}</span>
                    {featured.program && <><span>&bull;</span><span>{featured.program.title}</span></>}
                  </div>
                  <p className="text-warmgray-600 leading-relaxed mb-6 line-clamp-4">
                    {featured.excerpt}
                  </p>
                  <Link href={`/stories/${featured.slug}`} className="btn-primary self-start">
                    Read Full Story &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Other stories */}
        {rest.length > 0 && (
          <section className="section-padding bg-cream">
            <div className="container-wide">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {rest.map((story) => (
                  <div key={story.id} className="card-base group overflow-hidden">
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={story.coverImage || 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80'}
                        alt={story.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      {story.program && (
                        <span className="absolute top-4 left-4 bg-forest-600 text-white text-xs font-bold uppercase px-2 py-1">
                          {story.program.title}
                        </span>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="text-xs text-warmgray-400 mb-3">
                        {story.location || 'India'} &bull; {formatDateShort(story.date)}
                      </div>
                      <h3 className="font-serif text-xl font-bold text-warmgray-900 mb-3 group-hover:text-forest-600 transition-colors leading-snug">
                        {story.title}
                      </h3>
                      <p className="text-warmgray-500 text-sm leading-relaxed mb-5 line-clamp-3">
                        {story.excerpt}
                      </p>
                      <Link
                        href={`/stories/${story.slug}`}
                        className="inline-flex items-center gap-2 text-forest-600 font-semibold text-sm uppercase tracking-wide hover:gap-3 transition-all"
                      >
                        Read More &rarr;
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  )
}
