import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { prisma } from '@/lib/prisma'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const program = await prisma.program.findUnique({ where: { slug: params.slug } })
  if (!program) return { title: 'Program Not Found' }
  return {
    title: program.title,
    description: program.description,
  }
}

export default async function ProgramDetailPage({ params }: Props) {
  const [program, related] = await Promise.all([
    prisma.program.findUnique({ where: { slug: params.slug } }),
    prisma.program.findMany({
      where: { status: 'published', NOT: { slug: params.slug } },
      take: 3,
      orderBy: { order: 'asc' },
    }),
  ])

  if (!program || program.status !== 'published') notFound()

  const contentParagraphs = program.content.split('\n\n').filter(Boolean)

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative h-80 md:h-[480px]">
          <Image
            src={program.coverImage || 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1920&q=80'}
            alt={program.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-forest-600/80 to-forest-600/40" />
          <div className="absolute inset-0 flex items-end pb-12">
            <div className="container-wide">
              <span className="inline-block bg-amber-400 text-black text-xs font-bold uppercase px-3 py-1 mb-4">
                {program.category}
              </span>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-white max-w-3xl">
                {program.title}
              </h1>
              <nav className="mt-4 text-white/70 text-sm flex items-center gap-2">
                <Link href="/" className="hover:text-white">Home</Link>
                <span>/</span>
                <Link href="/programs" className="hover:text-white">Programs</Link>
                <span>/</span>
                <span className="text-white">{program.title}</span>
              </nav>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="section-padding bg-cream">
          <div className="container-wide">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Main content */}
              <div className="lg:col-span-2">
                <p className="text-warmgray-500 text-lg leading-relaxed mb-8 font-light">
                  {program.description}
                </p>

                <div className="w-full h-80 md:h-96 relative overflow-hidden mb-8">
                  <Image
                    src={program.coverImage || 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80'}
                    alt={`${program.title} program in action`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 66vw"
                  />
                </div>

                <div className="prose prose-lg max-w-none">
                  {contentParagraphs.map((para, i) => (
                    <p key={i} className="text-warmgray-600 leading-relaxed mb-4">
                      {para}
                    </p>
                  ))}
                </div>

                {/* How to Help */}
                <div className="mt-12 bg-warmgray-100 p-8">
                  <h3 className="font-serif text-xl font-bold text-warmgray-900 mb-4">
                    Support This Program
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Link href="/donate" className="btn-primary text-center">
                      ♥ Donate to This Program
                    </Link>
                    <Link href="/volunteer" className="btn-secondary text-center">
                      Volunteer
                    </Link>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div>
                <div className="bg-warmgray-100 p-6 mb-6">
                  <h3 className="font-serif text-lg font-bold text-warmgray-900 mb-4">
                    Program Details
                  </h3>
                  <dl className="space-y-3 text-sm">
                    <div>
                      <dt className="text-warmgray-500 uppercase tracking-wide text-xs font-semibold mb-1">Category</dt>
                      <dd className="text-warmgray-800 font-medium">{program.category}</dd>
                    </div>
                    <div>
                      <dt className="text-warmgray-500 uppercase tracking-wide text-xs font-semibold mb-1">Status</dt>
                      <dd><span className="badge badge-green">Active</span></dd>
                    </div>
                  </dl>
                </div>

                <div className="bg-forest-600 p-6 text-white">
                  <h3 className="font-serif text-lg font-bold mb-3">Get Involved</h3>
                  <p className="text-white/80 text-sm mb-5">
                    Your support directly impacts this program. Every contribution matters.
                  </p>
                  <Link href="/donate" className="btn-amber w-full text-center">
                    Donate Now
                  </Link>
                </div>

                {/* Other programs */}
                <div className="mt-6">
                  <h3 className="font-serif text-lg font-bold text-warmgray-900 mb-4">
                    Other Programs
                  </h3>
                  <div className="space-y-4">
                    {related.map((r) => (
                      <Link
                        key={r.id}
                        href={`/programs/${r.slug}`}
                        className="flex items-center gap-3 group"
                      >
                        <div className="relative w-16 h-16 flex-shrink-0 overflow-hidden">
                          <Image
                            src={r.coverImage || 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=200&q=80'}
                            alt={r.title}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        </div>
                        <div>
                          <div className="font-semibold text-sm text-warmgray-800 group-hover:text-forest-600 transition-colors leading-tight">
                            {r.title}
                          </div>
                          <div className="text-xs text-warmgray-400 mt-0.5">{r.category}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
