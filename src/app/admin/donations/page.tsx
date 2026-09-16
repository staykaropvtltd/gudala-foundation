'use client'

import { useState, useEffect } from 'react'

interface Donation {
  id: string
  donorName: string
  email: string
  phone: string
  amount: number
  status: string
  panNumber: string
  createdAt: string
}

export default function AdminDonationsPage() {
  const [donations, setDonations] = useState<Donation[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/donations')
      .then(r => r.json())
      .then(d => { setDonations(d.donations || []); setTotal(d.total || 0); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/donations/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    setDonations(d => d.map(x => x.id === id ? { ...x, status } : x))
  }

  const pending = donations.filter(d => d.status === 'pending').length
  const successful = donations.filter(d => d.status === 'successful').length

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="font-serif text-2xl font-bold text-warmgray-900">Donations</h1>
        <p className="text-warmgray-500 text-sm mt-1">{donations.length} donation records</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white shadow-card p-5">
          <div className="text-2xl font-bold font-serif text-forest-600">
            ₹{total.toLocaleString('en-IN')}
          </div>
          <div className="text-xs text-warmgray-500 mt-1">Total Received</div>
        </div>
        <div className="bg-white shadow-card p-5">
          <div className="text-2xl font-bold font-serif text-amber-600">{pending}</div>
          <div className="text-xs text-warmgray-500 mt-1">Pending</div>
        </div>
        <div className="bg-white shadow-card p-5">
          <div className="text-2xl font-bold font-serif text-green-600">{successful}</div>
          <div className="text-xs text-warmgray-500 mt-1">Successful</div>
        </div>
      </div>

      {loading ? (
        <div className="bg-white shadow-card p-8 text-center text-warmgray-400">Loading...</div>
      ) : (
        <div className="bg-white shadow-card overflow-hidden">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Donor</th>
                <th>Contact</th>
                <th>Amount</th>
                <th>PAN</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {donations.map(d => (
                <tr key={d.id}>
                  <td>
                    <div className="font-semibold text-warmgray-800 text-sm">{d.donorName}</div>
                  </td>
                  <td>
                    <div className="text-sm">{d.email}</div>
                    <div className="text-xs text-warmgray-400">{d.phone}</div>
                  </td>
                  <td>
                    <div className="font-bold text-forest-600">₹{d.amount.toLocaleString('en-IN')}</div>
                  </td>
                  <td className="text-sm text-warmgray-500">{d.panNumber || '—'}</td>
                  <td>
                    <span className={`badge ${
                      d.status === 'successful' ? 'badge-green' :
                      d.status === 'pending' ? 'badge-yellow' :
                      d.status === 'failed' ? 'badge-red' :
                      'badge-gray'
                    }`}>
                      {d.status}
                    </span>
                  </td>
                  <td className="text-xs text-warmgray-400">
                    {new Date(d.createdAt).toLocaleDateString('en-IN')}
                  </td>
                  <td>
                    <select
                      value={d.status}
                      onChange={e => updateStatus(d.id, e.target.value)}
                      className="text-xs border border-warmgray-200 px-2 py-1 text-warmgray-600"
                    >
                      <option value="pending">Pending</option>
                      <option value="successful">Successful</option>
                      <option value="failed">Failed</option>
                      <option value="refunded">Refunded</option>
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
