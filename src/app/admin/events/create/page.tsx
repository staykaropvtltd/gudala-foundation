'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { slugify } from '@/lib/utils'

export default function CreateEventPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    title: '', slug: '', description: '', content: '',
    coverImage: '', date: '', startTime: '', endTime: '',
    location: '', address: '', registrationLink: '',
    contactInfo: '', status: 'published',
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'title' ? { slug: slugify(value) } : {}),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')

    try {
      const payload = { ...form, date: form.date ? new Date(form.date).toISOString() : null }
      const res = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        router.push('/admin/events')
      } else {
        const data = await res.json()
        setError(data.error || 'Failed to create event')
      }
    } catch {
      setError('An error occurred')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/events" className="text-warmgray-500 hover:text-forest-600 text-sm">
          ← Events
        </Link>
        <h1 className="font-serif text-2xl font-bold text-warmgray-900">Create New Event</h1>
      </div>

      <form onSubmit={handleSubmit} className="max-w-3xl">
        <div className="bg-white shadow-card p-8 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="form-label">Event Title *</label>
              <input name="title" required value={form.title} onChange={handleChange} className="form-input" placeholder="e.g. Annual Health Camp 2025" />
            </div>

            <div>
              <label className="form-label">Slug (URL)</label>
              <input name="slug" value={form.slug} onChange={handleChange} className="form-input font-mono text-sm" />
            </div>

            <div>
              <label className="form-label">Status</label>
              <select name="status" value={form.status} onChange={handleChange} className="form-select">
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div>
              <label className="form-label">Event Date *</label>
              <input type="date" name="date" required value={form.date} onChange={handleChange} className="form-input" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="form-label">Start Time</label>
                <input name="startTime" value={form.startTime} onChange={handleChange} className="form-input" placeholder="09:00 AM" />
              </div>
              <div>
                <label className="form-label">End Time</label>
                <input name="endTime" value={form.endTime} onChange={handleChange} className="form-input" placeholder="05:00 PM" />
              </div>
            </div>

            <div>
              <label className="form-label">Location *</label>
              <input name="location" required value={form.location} onChange={handleChange} className="form-input" placeholder="Venue / City" />
            </div>

            <div>
              <label className="form-label">Full Address</label>
              <input name="address" value={form.address} onChange={handleChange} className="form-input" placeholder="Street address" />
            </div>

            <div>
              <label className="form-label">Cover Image URL</label>
              <input name="coverImage" value={form.coverImage} onChange={handleChange} className="form-input" placeholder="https://..." />
            </div>

            <div>
              <label className="form-label">Registration Link</label>
              <input name="registrationLink" value={form.registrationLink} onChange={handleChange} className="form-input" placeholder="https://..." />
            </div>

            <div className="md:col-span-2">
              <label className="form-label">Short Description *</label>
              <textarea name="description" required rows={3} value={form.description} onChange={handleChange} className="form-textarea" placeholder="Brief overview of the event..." />
            </div>

            <div className="md:col-span-2">
              <label className="form-label">Full Content</label>
              <textarea name="content" rows={8} value={form.content} onChange={handleChange} className="form-textarea" placeholder="Detailed event description, agenda, etc..." />
            </div>
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <div className="flex gap-4 pt-2">
            <button type="submit" disabled={saving} className="btn-primary">
              {saving ? 'Creating...' : 'Create Event'}
            </button>
            <Link href="/admin/events" className="btn-secondary">
              Cancel
            </Link>
          </div>
        </div>
      </form>
    </div>
  )
}
