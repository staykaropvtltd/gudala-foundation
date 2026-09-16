'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { slugify } from '@/lib/utils'

interface Props { params: { id: string } }

export default function EditEventPage({ params }: Props) {
  const router = useRouter()
  const [form, setForm] = useState({
    title: '', slug: '', description: '', content: '',
    coverImage: '', date: '', startTime: '', endTime: '',
    location: '', address: '', registrationLink: '',
    contactInfo: '', status: 'published',
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch(`/api/events/${params.id}`)
      .then(r => r.json())
      .then(d => {
        const event = d.event
        if (event) {
          setForm({
            title: event.title || '',
            slug: event.slug || '',
            description: event.description || '',
            content: event.content || '',
            coverImage: event.coverImage || '',
            date: event.date ? new Date(event.date).toISOString().split('T')[0] : '',
            startTime: event.startTime || '',
            endTime: event.endTime || '',
            location: event.location || '',
            address: event.address || '',
            registrationLink: event.registrationLink || '',
            contactInfo: event.contactInfo || '',
            status: event.status || 'published',
          })
        }
        setLoading(false)
      })
  }, [params.id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm(prev => ({
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
      const res = await fetch(`/api/events/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        router.push('/admin/events')
      } else {
        setError('Failed to update event')
      }
    } catch {
      setError('An error occurred')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Delete this event? This cannot be undone.')) return
    await fetch(`/api/events/${params.id}`, { method: 'DELETE' })
    router.push('/admin/events')
  }

  if (loading) return <div className="p-8 text-warmgray-400">Loading...</div>

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/admin/events" className="text-warmgray-500 hover:text-forest-600 text-sm">← Events</Link>
          <h1 className="font-serif text-2xl font-bold text-warmgray-900">Edit Event</h1>
        </div>
        <button onClick={handleDelete} className="text-red-500 hover:text-red-700 text-sm font-semibold">
          Delete Event
        </button>
      </div>

      <form onSubmit={handleSubmit} className="max-w-3xl">
        <div className="bg-white shadow-card p-8 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="form-label">Event Title *</label>
              <input name="title" required value={form.title} onChange={handleChange} className="form-input" />
            </div>
            <div>
              <label className="form-label">Slug</label>
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
                <input name="startTime" value={form.startTime} onChange={handleChange} className="form-input" />
              </div>
              <div>
                <label className="form-label">End Time</label>
                <input name="endTime" value={form.endTime} onChange={handleChange} className="form-input" />
              </div>
            </div>
            <div>
              <label className="form-label">Location *</label>
              <input name="location" required value={form.location} onChange={handleChange} className="form-input" />
            </div>
            <div>
              <label className="form-label">Full Address</label>
              <input name="address" value={form.address} onChange={handleChange} className="form-input" />
            </div>
            <div>
              <label className="form-label">Cover Image URL</label>
              <input name="coverImage" value={form.coverImage} onChange={handleChange} className="form-input" />
            </div>
            <div>
              <label className="form-label">Registration Link</label>
              <input name="registrationLink" value={form.registrationLink} onChange={handleChange} className="form-input" />
            </div>
            <div className="md:col-span-2">
              <label className="form-label">Short Description *</label>
              <textarea name="description" required rows={3} value={form.description} onChange={handleChange} className="form-textarea" />
            </div>
            <div className="md:col-span-2">
              <label className="form-label">Full Content</label>
              <textarea name="content" rows={8} value={form.content} onChange={handleChange} className="form-textarea" />
            </div>
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <div className="flex gap-4 pt-2">
            <button type="submit" disabled={saving} className="btn-primary">
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
            <Link href="/admin/events" className="btn-secondary">Cancel</Link>
          </div>
        </div>
      </form>
    </div>
  )
}
