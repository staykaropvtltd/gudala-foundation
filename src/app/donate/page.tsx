'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const PRESETS = [500, 1000, 2000, 5000]

export default function DonatePage() {
  const [amount, setAmount] = useState<number | ''>('')
  const [customAmount, setCustomAmount] = useState('')
  const [form, setForm] = useState({
    donorName: '', email: '', phone: '', panNumber: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const finalAmount = amount !== '' ? amount : parseInt(customAmount) || 0

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (finalAmount < 1) return
    setStatus('loading')
    try {
      const res = await fetch('/api/donations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, amount: finalAmount }),
      })
      if (res.ok) {
        setStatus('success')
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
            src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=1920&q=80"
            alt="Donate to Gudala Family Foundation"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-forest-600/80" />
          <div className="absolute inset-0 flex items-center">
            <div className="container-wide">
              <p className="eyebrow-light mb-3">Make A Difference</p>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-white">
                Donate
              </h1>
              <p className="text-white/80 text-base mt-3 max-w-lg">
                Your contribution directly funds education, healthcare, and community programs.
              </p>
              <nav className="mt-4 text-white/70 text-sm flex items-center gap-2">
                <Link href="/" className="hover:text-white">Home</Link>
                <span>/</span>
                <span className="text-white">Donate</span>
              </nav>
            </div>
          </div>
        </section>

        {/* Impact message */}
        <section className="bg-amber-400 py-6">
          <div className="container-wide">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-16 text-center">
              {[
                { amount: 'â‚¹500', desc: 'Provides school supplies for a child for a year' },
                { amount: 'â‚¹1,000', desc: 'Funds a medical camp for 5 people' },
                { amount: 'â‚¹5,000', desc: 'Supports a family for a month with food & essentials' },
              ].map((item) => (
                <div key={item.amount}>
                  <div className="font-serif font-bold text-2xl text-forest-600">{item.amount}</div>
                  <div className="text-xs text-forest-700 mt-1">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Donation form */}
        <section className="section-padding bg-cream">
          <div className="container-wide">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* Left */}
              <div>
                <p className="eyebrow mb-3">Your Generosity Matters</p>
                <div className="divider-line" />
                <h2 className="heading-lg mb-6">Every Rupee Creates Change</h2>
                <p className="text-warmgray-500 mb-8 leading-relaxed">
                  Gudala Family Foundation is committed to ensuring that every donation reaches communities in need. Your contribution is handled with complete transparency and accountability.
                </p>

                {/* Program impact list */}
                <div className="space-y-4 mb-8">
                  {[
                    { icon: 'ðŸ“š', title: 'Education', desc: 'School support, scholarships, learning materials' },
                    { icon: 'ðŸ¥', title: 'Healthcare', desc: 'Medical camps, medicines, health awareness' },
                    { icon: 'ðŸ‘©', title: 'Women Empowerment', desc: 'Vocational training, entrepreneurship' },
                    { icon: 'ðŸŒ±', title: 'Community', desc: 'Food programs, skill development, environment' },
                  ].map((item) => (
                    <div key={item.title} className="flex items-center gap-4 p-4 bg-warmgray-50 border border-warmgray-100">
                      <span className="text-2xl">{item.icon}</span>
                      <div>
                        <div className="font-semibold text-warmgray-800 text-sm">{item.title}</div>
                        <div className="text-xs text-warmgray-500">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="relative h-56 overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=700&q=80"
                    alt="Children supported through donations"
                    fill
                    className="object-cover"
                    sizes="50vw"
                  />
                </div>
              </div>

              {/* Form */}
              <div>
                {status === 'success' ? (
                  <div className="bg-forest-50 border border-forest-200 p-10 text-center">
                    <div className="text-6xl mb-4">ðŸ™</div>
                    <h3 className="font-serif text-2xl font-bold text-forest-600 mb-3">
                      Thank You for Your Donation!
                    </h3>
                    <p className="text-warmgray-600 mb-6">
                      We've received your donation request of <strong>â‚¹{finalAmount.toLocaleString('en-IN')}</strong>. Our team will process your contribution and reach out with payment details.
                    </p>
                    <p className="text-warmgray-500 text-sm">
                      For immediate payment or UPI transfer, please contact us at the details listed on our Contact page.
                    </p>
                  </div>
                ) : (
                  <div className="bg-warmgray-100 p-8 md:p-10">
                    <h3 className="font-serif text-xl font-bold text-warmgray-900 mb-6">
                      Donate to Gudala Family Foundation
                    </h3>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      {/* Amount presets */}
                      <div>
                        <label className="form-label">Select Amount (â‚¹)</label>
                        <div className="grid grid-cols-4 gap-2 mb-3">
                          {PRESETS.map((p) => (
                            <button
                              key={p}
                              type="button"
                              onClick={() => { setAmount(p); setCustomAmount('') }}
                              className={`py-3 text-sm font-bold border-2 transition-all ${
                                amount === p
                                  ? 'bg-forest-600 text-white border-forest-600'
                                  : 'bg-white text-warmgray-700 border-warmgray-200 hover:border-forest-600'
                              }`}
                            >
                              â‚¹{p.toLocaleString('en-IN')}
                            </button>
                          ))}
                        </div>
                        <input
                          type="number"
                          placeholder="Or enter custom amount (â‚¹)"
                          value={customAmount}
                          onChange={(e) => { setCustomAmount(e.target.value); setAmount('') }}
                          className="form-input"
                          min="1"
                        />
                        {finalAmount > 0 && (
                          <p className="text-forest-600 font-semibold text-sm mt-2">
                            Donating: â‚¹{finalAmount.toLocaleString('en-IN')}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="form-label" htmlFor="donorName">Full Name *</label>
                        <input
                          id="donorName" name="donorName" required
                          value={form.donorName} onChange={handleChange}
                          className="form-input" placeholder="Your full name"
                        />
                      </div>

                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label className="form-label" htmlFor="email">Email *</label>
                          <input
                            id="email" name="email" type="email" required
                            value={form.email} onChange={handleChange}
                            className="form-input" placeholder="email@example.com"
                          />
                        </div>
                        <div>
                          <label className="form-label" htmlFor="phone">Phone *</label>
                          <input
                            id="phone" name="phone" required
                            value={form.phone} onChange={handleChange}
                            className="form-input" placeholder="+91 XXXXX XXXXX"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="form-label" htmlFor="panNumber">
                          PAN Number <span className="text-warmgray-400 font-normal">(Optional â€” for 80G tax benefit)</span>
                        </label>
                        <input
                          id="panNumber" name="panNumber"
                          value={form.panNumber} onChange={handleChange}
                          className="form-input" placeholder="AAAAA0000A"
                        />
                      </div>

                      {status === 'error' && (
                        <p className="text-red-600 text-sm">
                          Something went wrong. Please try again or contact us directly.
                        </p>
                      )}

                      <div className="bg-amber-50 border border-amber-200 p-4 text-xs text-amber-800">
                        <strong>Payment Note:</strong> After submitting this form, our team will contact you with payment instructions (UPI/bank transfer). Online payment gateway integration can be enabled with a payment provider of your choice.
                      </div>

                      <button
                        type="submit"
                        disabled={status === 'loading' || finalAmount < 1}
                        className="btn-amber w-full justify-center text-base py-4 disabled:opacity-50"
                      >
                        {status === 'loading' ? 'Processing...' : `â™¥ Donate â‚¹${finalAmount > 0 ? finalAmount.toLocaleString('en-IN') : 'â€”'}`}
                      </button>
                    </form>
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
