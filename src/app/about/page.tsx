import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { prisma } from '@/lib/prisma'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about Gudala Family Foundation — our story, mission, vision, and the team driving community transformation.',
}

async function getAboutData() {
  const settings = await prisma.siteSetting.findMany()
  const map: Record<string, string> = {}
  settings.forEach((s) => (map[s.key] = s.value))
  return map
}

export default async function AboutPage() {
  const settings = await getAboutData()

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative h-72 md:h-96">
          <Image
            src="https://images.unsplash.com/photo-1544717305-2782549b5136?w=1920&q=80"
            alt="About Gudala Family Foundation"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-forest-600/75" />
          <div className="absolute inset-0 flex items-center">
            <div className="container-wide">
              <p className="eyebrow-light mb-3">Our Foundation</p>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-white">
                About Us
              </h1>
              <nav className="mt-4 text-white/70 text-sm flex items-center gap-2">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <span>/</span>
                <span className="text-white">About Us</span>
              </nav>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="section-padding bg-cream">
          <div className="container-wide">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <p className="eyebrow mb-3">Our Story</p>
                <div className="divider-line" />
                <h2 className="heading-lg mb-6">
                  {settings.about_heading || 'Serving Communities With Compassion, Dignity & Purpose'}
                </h2>
                <div className="space-y-4 text-warmgray-600 leading-relaxed">
                  {(settings.about_content || 'Foundation story to be provided by client.')
                    .split('\n\n')
                    .filter(Boolean)
                    .map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src={settings.about_image || 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&q=80'}
                    alt="Foundation community work"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative h-44 overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&q=80"
                      alt="Education program"
                      fill
                      className="object-cover"
                      sizes="200px"
                    />
                  </div>
                  <div className="relative h-44 overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1584515933487-779824d29309?w=400&q=80"
                      alt="Healthcare camp"
                      fill
                      className="object-cover"
                      sizes="200px"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Vision */}
        <section className="section-padding bg-warmgray-100">
          <div className="container-wide">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-forest-600 p-10 text-white">
                <div className="w-12 h-12 border-2 border-amber-400 flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="font-serif text-2xl font-bold mb-4">Our Mission</h3>
                <div className="w-12 h-1 bg-amber-400 mb-5" />
                <p className="text-white/85 leading-relaxed">
                  {settings.mission || 'To empower underserved communities through sustainable programs.'}
                </p>
              </div>

              <div className="bg-earth-600 p-10 text-white">
                <div className="w-12 h-12 border-2 border-amber-400 flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-serif text-2xl font-bold mb-4">Our Vision</h3>
                <div className="w-12 h-1 bg-amber-400 mb-5" />
                <p className="text-white/85 leading-relaxed">
                  {settings.vision || 'A world where every individual has equal access to dignity, education, and opportunity.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="section-padding bg-cream">
          <div className="container-wide">
            <div className="text-center mb-12">
              <p className="eyebrow mb-3">What Guides Us</p>
              <div className="divider-line mx-auto" />
              <h2 className="heading-lg">Our Core Values</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                {
                  icon: (
                    <svg className="w-8 h-8 text-forest-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  ),
                  title: 'Compassion',
                  desc: 'We lead with empathy, placing people and their dignity at the center of everything we do.',
                },
                {
                  icon: (
                    <svg className="w-8 h-8 text-forest-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  ),
                  title: 'Sustainability',
                  desc: 'We build programs that create lasting change and do not create dependency.',
                },
                {
                  icon: (
                    <svg className="w-8 h-8 text-forest-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  ),
                  title: 'Integrity',
                  desc: 'We operate with full transparency, accountability, and honest communication.',
                },
                {
                  icon: (
                    <svg className="w-8 h-8 text-forest-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  ),
                  title: 'Inclusion',
                  desc: 'We serve all communities equally, with no discrimination of any kind.',
                },
              ].map((value) => (
                <div key={value.title} className="text-center">
                  <div className="flex justify-center mb-4">{value.icon}</div>
                  <h3 className="font-serif text-lg font-semibold text-warmgray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-warmgray-500 text-sm leading-relaxed">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Photo montage */}
        <section className="section-padding-sm bg-warmgray-100">
          <div className="container-wide">
            <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
              {[
                'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80',
                'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&q=80',
                'https://images.unsplash.com/photo-1584515933487-779824d29309?w=400&q=80',
                'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80',
                'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=400&q=80',
              ].map((src, i) => (
                <div key={i} className="relative h-40 md:h-56 overflow-hidden">
                  <Image
                    src={src}
                    alt={`Foundation work in community ${i + 1}`}
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 33vw, 20vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding-sm bg-forest-600">
          <div className="container-wide text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-6">
              Be Part of the Change
            </h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">
              Whether you choose to donate, volunteer, or partner with us &mdash; your involvement makes a real difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/donate" className="btn-amber">&#9829; Donate Now</Link>
              <Link href="/volunteer" className="btn-outline-white">Volunteer</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
