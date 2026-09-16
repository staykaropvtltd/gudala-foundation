'use client'

import { useState, useEffect } from 'react'

interface Volunteer {
  id: string
  name: string
  email: string
  phone: string
  city: string
  interest: string
  availability: string
  message: string
  status: string
  createdAt: string
}

export default function AdminVolunteersPage() {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([])
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch('/api/volunteers')
      .then(r => r.json())
      .then(d => { setVolunteers(d.volunteers || []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/volunteers/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    setVolunteers(v => v.map(x => x.id === id ? { ...x, status } : x))
  }

  const filtered = volunteers.filter(v => {
    const matchesFilter = filter === 'all' || v.status === filter
    const matchesSearch = !search || v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.email.toLowerCase().includes(search.toLowerCase()) ||
      v.city.toLowerCase().includes(search.toLowerCase())
    return matchesFilter && matchesSearch
  })

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-2xl font-bold text-warmgray-900">Volunteers</h1>
          <p className="text-warmgray-500 text-sm mt-1">{volunteers.length} applications received</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name, email, city..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="form-input max-w-xs"
        />
        <div className="flex gap-2">
          {['all', 'pending', 'contacted', 'approved', 'archived'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wide border transition-all ${
                filter === f ? 'bg-forest-600 text-white border-forest-600' : 'bg-white text-warmgray-600 border-warmgray-200 hover:border-forest-600'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="bg-white shadow-card p-8 text-center text-warmgray-400">Loading...</div>
      ) : filtered.length === 0 ? (
        <div className="bg-white shadow-card p-8 text-center text-warmgray-400">
          No volunteers found.
        </div>
      ) : (
        <div className="bg-white shadow-card overflow-hidden">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Contact</th>
                <th>City</th>
                <th>Interest</th>
                <th>Availability</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(v => (
                <tr key={v.id}>
                  <td>
                    <div className="font-semibold text-warmgray-800 text-sm">{v.name}</div>
                    <div className="text-xs text-warmgray-400">
                      {new Date(v.createdAt).toLocaleDateString('en-IN')}
                    </div>
                  </td>
                  <td>
                    <div className="text-sm">{v.email}</div>
                    <div className="text-xs text-warmgray-400">{v.phone}</div>
                  </td>
                  <td className="text-sm">{v.city}</td>
                  <td className="text-sm max-w-32 truncate">{v.interest}</td>
                  <td className="text-sm text-warmgray-500 max-w-28 truncate">{v.availability}</td>
                  <td>
                    <span className={`badge ${
                      v.status === 'approved' ? 'badge-green' :
                      v.status === 'contacted' ? 'badge-blue' :
                      v.status === 'pending' ? 'badge-yellow' :
                      'badge-gray'
                    }`}>
                      {v.status}
                    </span>
                  </td>
                  <td>
                    <select
                      value={v.status}
                      onChange={e => updateStatus(v.id, e.target.value)}
                      className="text-xs border border-warmgray-200 px-2 py-1 text-warmgray-600"
                    >
                      <option value="pending">Pending</option>
                      <option value="contacted">Contacted</option>
                      <option value="approved">Approved</option>
                      <option value="archived">Archived</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
