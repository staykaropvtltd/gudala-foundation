'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface GalleryImage {
  id: string
  url: string
  caption: string
  altText: string
  category: string
  status: string
}

const CATEGORIES = ['Events', 'Education', 'Healthcare', 'Volunteers', 'Community', 'Environment']

export default function AdminGalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [showAdd, setShowAdd] = useState(false)
  const [form, setForm] = useState({ url: '', caption: '', altText: '', category: 'Events' })
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    fetch('/api/gallery')
      .then(r => r.json())
      .then(d => { setImages(d.images || []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    setUploading(true)
    const res = await fetch('/api/gallery', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, order: images.length + 1 }),
    })
    const data = await res.json()
    if (data.image) {
      setImages(prev => [...prev, data.image])
      setForm({ url: '', caption: '', altText: '', category: 'Events' })
      setShowAdd(false)
    }
    setUploading(false)
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-2xl font-bold text-warmgray-900">Gallery</h1>
          <p className="text-warmgray-500 text-sm mt-1">{images.length} images</p>
        </div>
        <button onClick={() => setShowAdd(!showAdd)} className="btn-primary text-sm py-2.5 px-6">
          + Add Image
        </button>
      </div>

      {/* Add form */}
      {showAdd && (
        <div className="bg-white shadow-card p-6 mb-8">
          <h3 className="font-serif text-lg font-semibold text-warmgray-900 mb-4">Add Gallery Image</h3>
          <form onSubmit={handleAdd} className="grid md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="form-label">Image URL *</label>
              <input required value={form.url} onChange={e => setForm(f => ({ ...f, url: e.target.value }))} className="form-input" placeholder="https://images.unsplash.com/..." />
            </div>
            <div>
              <label className="form-label">Caption</label>
              <input value={form.caption} onChange={e => setForm(f => ({ ...f, caption: e.target.value }))} className="form-input" />
            </div>
            <div>
              <label className="form-label">Alt Text</label>
              <input value={form.altText} onChange={e => setForm(f => ({ ...f, altText: e.target.value }))} className="form-input" />
            </div>
            <div>
              <label className="form-label">Category</label>
              <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className="form-select">
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="flex items-end gap-3">
              <button type="submit" disabled={uploading} className="btn-primary text-sm py-3 px-6">
                {uploading ? 'Adding...' : 'Add Image'}
              </button>
              <button type="button" onClick={() => setShowAdd(false)} className="btn-secondary text-sm py-3 px-6">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Gallery grid */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[...Array(8)].map((_, i) => <div key={i} className="h-48 bg-warmgray-200 animate-pulse" />)}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {images.map(img => (
            <div key={img.id} className="relative group">
              <div className="relative h-48 overflow-hidden bg-warmgray-100">
                <Image
                  src={img.url}
                  alt={img.altText || img.caption}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                  onError={() => {}}
                />
              </div>
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="text-white text-center p-2">
                  <p className="text-xs font-medium">{img.caption || 'No caption'}</p>
                  <p className="text-xs opacity-70">{img.category}</p>
                </div>
              </div>
              <div className="absolute top-2 left-2">
                <span className="bg-black/60 text-white text-xs px-2 py-0.5">{img.category}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
