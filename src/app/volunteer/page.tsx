'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const AREAS = [
  'Education & Tutoring',
  'Healthcare Support',
  'Women Empowerment',
  'Environmental Programs',
  'Food & Nutrition',
  'Community Outreach',
  'Event Management',
  'Photography / Media',
  'Fundraising',
  'Administrative Support',
  'Other',
]

export default function VolunteerPage() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', city: '',
    interest: '', availability: '', message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/volunteers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', phone: '', city: '', interest: '', availability: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative h-72 md:h-96">
          <Image
            src="https://images.unsplash.com/photo-1593113598332-cd288d649433?w=1920&q=80"
            alt="Volunteer with us"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-forest-600/75" />
          <div className="absolute inset-0 flex items-center">
            <div className="container-wide">
              <p className="eyebrow-light mb-3">Join Us</p>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-white">
                Volunteer With Us
              </h1>
              <nav className="mt-4 text-white/70 text-sm flex items-center gap-2">
                <Link href="/" className="hover:text-white">Home</Link>
                <span>/</span>
                <span className="text-white">Volunteer</span>
              </nav>
            </div>
          </div>
        </section>

        {/* Intro */}
        <section className="section-padding-sm bg-cream">
          <div className="container-narrow text-center">
            <p className="eyebrow mb-3">Be The Change</p>
            <div className="divider-line mx-auto" />
            <h2 className="heading-lg mb-5">
              Join Our Team of Changemakers
            </h2>
            <p className="text-warmgray-500 text-base leading-relaxed">
              Volunteering with Gudala Family Foundation means more than giving your time â€” it means becoming part of a movement that transforms communities. We welcome people from all walks of life.
            </p>
          </div>
        </section>

        {/* Why volunteer */}
        <section className="section-padding-sm bg-warmgray-100">
          <div className="container-wide">
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {[
                {
                  img: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80',
                  title: 'Make Real Impact',
                  desc: 'Your skills and time directly support programs in education, healthcare, and community development.',
                },
                {
                  img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80',
                  title: 'Grow & Learn',
                  desc: 'Volunteering opens doors to new perspectives, skills, and friendships that last a lifetime.',
                },
                {
                  img: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&q=80',
                  title: 'Build Community',
                  desc: 'Join a diverse community of individuals committed to service and social good.',
                },
              ].map((item) => (
                <div key={item.title} className="card-base group overflow-hidden">
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={item.img}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-lg font-bold text-warmgray-900 mb-2">{item.title}</h3>
                    <p className="text-warmgray-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Form */}
        <section className="section-padding bg-cream">
          <div className="container-wide">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* Left info */}
              <div>
                <p className="eyebrow mb-3">Get Started</p>
                <div className="divider-line" />
                <h2 className="heading-lg mb-6">Apply to Volunteer</h2>
                <p className="text-warmgray-500 mb-8">
                  Fill in the form and our team will get in touch with you within 2â€“3 business days.
                </p>

                <div className="space-y-6">
                  {[
                    { step: '1', title: 'Submit your application', desc: 'Fill in the form with your details and areas of interest.' },
                    { step: '2', title: 'We reach out to you', desc: 'Our volunteer coordinator contacts you to discuss opportunities.' },
                    { step: '3', title: 'Join an orientation', desc: 'Attend a brief orientation to understand our programs and processes.' },
                    { step: '4', title: 'Start making a difference', desc: 'Begin your volunteer journey and start creating real impact.' },
                  ].map((item) => (
                    <div key={item.step} className="flex items-start gap-5">
                      <div className="w-10 h-10 bg-forest-600 text-white flex items-center justify-center font-bold font-serif text-lg flex-shrink-0">
                        {item.step}
                      </div>
                      <div>
                        <h4 className="font-semibold text-warmgray-900 text-sm mb-1">{item.title}</h4>
                        <p className="text-warmgray-500 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-10 relative h-64 overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1593113598332-cd288d649433?w=700&q=80"
                    alt="Volunteers working together"
                    fill
                    className="object-cover"
                    sizes="50vw"
                  />
                </div>
              </div>

              {/* Form */}
              <div className="bg-warmgray-100 p-8 md:p-10">
                {status === 'success' ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">ðŸ™</div>
                    <h3 className="font-serif text-2xl font-bold text-forest-600 mb-3">
                      Thank You for Applying!
                    </h3>
                    <p className="text-warmgray-600">
                      We've received your application and our team will be in touch within 2â€“3 business days.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="form-label" htmlFor="name">Full Name *</label>
                        <input
                          id="name" name="name" required
                          value={form.name} onChange={handleChange}
                          className="form-input" placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label className="form-label" htmlFor="email">Email Address *</label>
                        <input
                          id="email" name="email" type="email" required
                          value={form.email} onChange={handleChange}
                          className="form-input" placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="form-label" htmlFor="phone">Phone Number *</label>
                        <input
                          id="phone" name="phone" required
                          value={form.phone} onChange={handleChange}
                          className="form-input" placeholder="+91 XXXXX XXXXX"
                        />
                      </div>
                      <div>
                        <label className="form-label" htmlFor="city">City *</label>
                        <input
                          id="city" name="city" required
                          value={form.city} onChange={handleChange}
                          className="form-input" placeholder="Your city"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="form-label" htmlFor="interest">Area of Interest *</label>
                      <select
                        id="interest" name="interest" required
                        value={form.interest} onChange={handleChange}
                        className="form-select"
                      >
                        <option value="">Select area of interest</option>
                        {AREAS.map((a) => <option key={a} value={a}>{a}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="form-label" htmlFor="availability">Availability *</label>
                      <select
                        id="availability" name="availability" required
                        value={form.availability} onChange={handleChange}
                        className="form-select"
                      >
                        <option value="">Select availability</option>
                        <option>Weekdays</option>
                        <option>Weekends</option>
                        <option>Both weekdays and weekends</option>
                        <option>Flexible / Remote only</option>
                        <option>Special occasions / Events only</option>
                      </select>
                    </div>

                    <div>
                      <label className="form-label" htmlFor="message">Message / Tell us about yourself</label>
                      <textarea
                        id="message" name="message" rows={4}
                        value={form.message} onChange={handleChange}
                        className="form-textarea"
                        placeholder="Tell us a bit about yourself, your skills, and why you'd like to volunteer..."
                      />
                    </div>

                    {status === 'error' && (
                      <p className="text-red-600 text-sm">
                        Something went wrong. Please try again or contact us directly.
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="btn-primary w-full justify-center"
                    >
                      {status === 'loading' ? 'Submitting...' : 'Submit Application'}
                    </button>
                  </form>
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
