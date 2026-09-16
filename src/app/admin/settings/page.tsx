'use client'

import { useState, useEffect } from 'react'

type Settings = Record<string, string>

interface Section {
  title: string
  keys: string[]
  labels: Record<string, string>
  types: Record<string, string>
}

const SECTIONS: Section[] = [
  {
    title: 'Hero Section',
    keys: ['hero_heading', 'hero_subheading', 'hero_image'],
    labels: { hero_heading: 'Hero Heading', hero_subheading: 'Hero Subheading', hero_image: 'Hero Image URL' },
    types: { hero_image: 'url' },
  },
  {
    title: 'About Section',
    keys: ['about_heading', 'about_content', 'about_image'],
    labels: { about_heading: 'About Heading', about_content: 'About Content', about_image: 'About Image URL' },
    types: { about_content: 'textarea', about_image: 'url' },
  },
  {
    title: 'Mission & Vision',
    keys: ['mission', 'vision', 'mission_image', 'vision_image'],
    labels: { mission: 'Mission Statement', vision: 'Vision Statement', mission_image: 'Mission Image URL', vision_image: 'Vision Image URL' },
    types: { mission: 'textarea', vision: 'textarea' },
  },
  {
    title: 'Impact Numbers',
    keys: ['impact_lives', 'impact_children', 'impact_programs', 'impact_volunteers'],
    labels: {
      impact_lives: 'Lives Impacted',
      impact_children: 'Children Supported',
      impact_programs: 'Community Programs',
      impact_volunteers: 'Volunteers',
    },
    types: {},
  },
  {
    title: 'Contact Details',
    keys: ['contact_address', 'contact_phone', 'contact_email', 'contact_whatsapp'],
    labels: {
      contact_address: 'Address',
      contact_phone: 'Phone Number',
      contact_email: 'Email Address',
      contact_whatsapp: 'WhatsApp',
    },
    types: {},
  },
  {
    title: 'Social Media',
    keys: ['social_facebook', 'social_instagram', 'social_twitter', 'social_youtube', 'social_linkedin'],
    labels: {
      social_facebook: 'Facebook URL',
      social_instagram: 'Instagram URL',
      social_twitter: 'Twitter/X URL',
      social_youtube: 'YouTube URL',
      social_linkedin: 'LinkedIn URL',
    },
    types: {},
  },
]

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Settings>({})
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/settings')
      .then(r => r.json())
      .then(d => { setSettings(d.settings || {}); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const handleChange = (key: string, value: string) => {
    setSettings(s => ({ ...s, [key]: value }))
  }

  const handleSave = async () => {
    setSaving(true)
    setSaved(false)
    await fetch('/api/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings),
    })
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  if (loading) {
    return <div className="p-8 text-warmgray-400">Loading settings...</div>
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-2xl font-bold text-warmgray-900">Website Settings / CMS</h1>
          <p className="text-warmgray-500 text-sm mt-1">
            Edit website content without modifying code.
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className={`btn-primary text-sm py-2.5 px-6 ${saved ? 'bg-green-600 hover:bg-green-700' : ''}`}
        >
          {saving ? 'Saving...' : saved ? '✓ Saved!' : 'Save Changes'}
        </button>
      </div>

      <div className="space-y-8 max-w-3xl">
        {SECTIONS.map(section => (
          <div key={section.title} className="bg-white shadow-card p-6">
            <h2 className="font-serif text-lg font-semibold text-warmgray-900 mb-5 pb-3 border-b border-warmgray-100">
              {section.title}
            </h2>
            <div className="space-y-4">
              {section.keys.map(key => {
                const type = section.types[key]
                return (
                  <div key={key}>
                    <label className="form-label">
                      {section.labels[key]}
                    </label>
                    {type === 'textarea' ? (
                      <textarea
                        value={settings[key] || ''}
                        onChange={e => handleChange(key, e.target.value)}
                        className="form-textarea"
                        rows={4}
                      />
                    ) : (
                      <input
                        type="text"
                        value={settings[key] || ''}
                        onChange={e => handleChange(key, e.target.value)}
                        className="form-input"
                        placeholder={type === 'url' ? 'https://...' : ''}
                      />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 max-w-3xl">
        <button
          onClick={handleSave}
          disabled={saving}
          className={`btn-primary ${saved ? 'bg-green-600 hover:bg-green-700' : ''}`}
        >
          {saving ? 'Saving...' : saved ? '✓ Saved!' : 'Save All Changes'}
        </button>
      </div>
    </div>
  )
}
