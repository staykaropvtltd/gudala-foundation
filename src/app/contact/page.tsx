'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', subject: '', message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', phone: '', subject: '', message: '' })
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
            src="https://images.unsplash.com/photo-1509099863731-ef4bff19e808?w=1920&q=80"
            alt="Contact Gudala Family Foundation"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-forest-600/75" />
          <div className="absolute inset-0 flex items-center">
            <div className="container-wide">
              <p className="eyebrow-light mb-3">Get In Touch</p>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-white">Contact Us</h1>
              <nav className="mt-4 text-white/70 text-sm flex items-center gap-2">
                <Link href="/" className="hover:text-white">Home</Link>
                <span>/</span>
                <span className="text-white">Contact</span>
              </nav>
            </div>
          </div>
        </section>

        {/* Contact content */}
        <section className="section-padding bg-cream">
          <div className="container-wide">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Left: Info */}
              <div>
                <p className="eyebrow mb-3">Reach Us</p>
                <div className="divider-line" />
                <h2 className="heading-md mb-6">We'd Love to Hear From You</h2>
                <p className="text-warmgray-500 mb-8">
                  Whether you want to partner with us, learn about our programs, or simply say hello â€” our team is here.
                </p>

                <div className="space-y-6">
                  {[
                    {
                      icon: (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                      ),
                      title: 'Our Address',
                      content: '[Foundation Address â€” To be provided by client]',
                    },
                    {
                      icon: (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                      ),
                      title: 'Phone',
                      content: '[Phone number â€” To be provided by client]',
                    },
                    {
                      icon: (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                      ),
                      title: 'Email',
                      content: '[Email â€” To be provided by client]',
                    },
                    {
                      icon: (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                      ),
                      title: 'WhatsApp',
                      content: '[WhatsApp â€” To be provided by client]',
                    },
                  ].map((item) => (
                    <div key={item.title} className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-forest-600 flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          {item.icon}
                        </svg>
                      </div>
                      <div>
                        <div className="font-semibold text-warmgray-900 text-sm mb-1">{item.title}</div>
                        <div className="text-warmgray-500 text-sm">{item.content}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Map placeholder */}
                <div className="mt-10 relative h-56 bg-warmgray-200 flex items-center justify-center overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&q=70"
                    alt="Foundation location map"
                    fill
                    className="object-cover opacity-60"
                    sizes="400px"
                  />
                  <div className="relative text-warmgray-600 text-sm font-medium bg-white/80 px-4 py-2">
                    Map to be added with foundation address
                  </div>
                </div>
              </div>

              {/* Right: Form */}
              <div className="lg:col-span-2">
                <div className="bg-warmgray-100 p-8 md:p-10">
                  <h3 className="font-serif text-xl font-bold text-warmgray-900 mb-6">
                    Send Us a Message
                  </h3>

                  {status === 'success' ? (
                    <div className="text-center py-12">
                      <div className="text-6xl mb-4">âœ‰ï¸</div>
                      <h3 className="font-serif text-xl font-bold text-forest-600 mb-3">
                        Message Sent!
                      </h3>
                      <p className="text-warmgray-600">
                        Thank you for reaching out. Our team will respond within 1â€“2 business days.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label className="form-label" htmlFor="name">Your Name *</label>
                          <input
                            id="name" name="name" required
                            value={form.name} onChange={handleChange}
                            className="form-input" placeholder="Full name"
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
                          <label className="form-label" htmlFor="phone">Phone Number</label>
                          <input
                            id="phone" name="phone"
                            value={form.phone} onChange={handleChange}
                            className="form-input" placeholder="+91 XXXXX XXXXX"
                          />
                        </div>
                        <div>
                          <label className="form-label" htmlFor="subject">Subject *</label>
                          <select
                            id="subject" name="subject" required
                            value={form.subject} onChange={handleChange}
                            className="form-select"
                          >
                            <option value="">Select subject</option>
                            <option>General Inquiry</option>
                            <option>Partnership / CSR</option>
                            <option>Donation Query</option>
                            <option>Volunteer Information</option>
                            <option>Media / Press</option>
                            <option>Other</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="form-label" htmlFor="message">Message *</label>
                        <textarea
                          id="message" name="message" required rows={6}
                          value={form.message} onChange={handleChange}
                          className="form-textarea"
                          placeholder="How can we help you?"
                        />
                      </div>

                      {status === 'error' && (
                        <p className="text-red-600 text-sm">
                          Something went wrong. Please try again.
                        </p>
                      )}

                      <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="btn-primary w-full justify-center"
                      >
                        {status === 'loading' ? 'Sending...' : 'Send Message'}
                      </button>
                    </form>
                  )}
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
