'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function AdminLoginPage() {
  const router = useRouter()
  const [form, setForm] = useState({ email: '', password: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        router.push('/admin')
        router.refresh()
      } else {
        const data = await res.json()
        setErrorMsg(data.error || 'Invalid credentials. Please try again.')
        setStatus('error')
      }
    } catch {
      setErrorMsg('Connection error. Please try again.')
      setStatus('error')
    }
  }

  return (
    <div className="min-h-screen bg-warmgray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Image
            src="/logo.jpeg"
            alt="Gudala Family Foundation"
            width={240}
            height={80}
            className="h-20 w-auto object-contain"
            priority
          />
        </div>

        <div className="bg-white p-8 shadow-card">
          <h2 className="font-serif text-xl font-semibold text-warmgray-900 mb-1">Admin Sign In</h2>
          <p className="text-sm text-warmgray-500 mb-6">Dashboard access for foundation staff</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="form-label" htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="form-input"
                placeholder="admin@gudalafoundation.org"
                autoComplete="email"
              />
            </div>

            <div>
              <label className="form-label" htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                required
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="form-input"
                placeholder="Enter your password"
                autoComplete="current-password"
              />
            </div>

            {status === 'error' && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-3">
                {errorMsg}
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="btn-primary w-full justify-center"
            >
              {status === 'loading' ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-warmgray-100 text-center">
            <a href="/" className="text-sm text-warmgray-500 hover:text-forest-600 transition-colors">
              &larr; Back to Website
            </a>
          </div>
        </div>

        <p className="text-center text-xs text-warmgray-400 mt-4">
          Gudala Family Foundation &mdash; Admin Portal
        </p>
      </div>
    </div>
  )
}
