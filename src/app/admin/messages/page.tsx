'use client'

import { useState, useEffect } from 'react'

interface Message {
  id: string
  name: string
  email: string
  phone: string
  subject: string
  message: string
  status: string
  createdAt: string
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<Message | null>(null)

  useEffect(() => {
    fetch('/api/contact')
      .then(r => r.json())
      .then(d => { setMessages(d.messages || []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const markRead = async (id: string) => {
    await fetch(`/api/contact/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'read' }),
    })
    setMessages(m => m.map(x => x.id === id ? { ...x, status: 'read' } : x))
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="font-serif text-2xl font-bold text-warmgray-900">Contact Messages</h1>
        <p className="text-warmgray-500 text-sm mt-1">
          {messages.filter(m => m.status === 'unread').length} unread messages
        </p>
      </div>

      {loading ? (
        <div className="bg-white shadow-card p-8 text-center text-warmgray-400">Loading...</div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white shadow-card overflow-hidden">
            {messages.length === 0 ? (
              <div className="p-8 text-center text-warmgray-400">No messages yet.</div>
            ) : (
              <div>
                {messages.map(msg => (
                  <div
                    key={msg.id}
                    onClick={() => { setSelected(msg); if (msg.status === 'unread') markRead(msg.id) }}
                    className={`p-4 border-b border-warmgray-50 cursor-pointer hover:bg-warmgray-50 transition-colors ${
                      selected?.id === msg.id ? 'bg-forest-50 border-l-2 border-l-forest-600' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className={`font-semibold text-sm ${msg.status === 'unread' ? 'text-warmgray-900' : 'text-warmgray-600'}`}>
                          {msg.name}
                        </div>
                        <div className="text-xs text-warmgray-500 truncate">{msg.subject}</div>
                      </div>
                      <div className="flex-shrink-0 flex flex-col items-end gap-1">
                        <span className={`badge ${msg.status === 'unread' ? 'badge-blue' : 'badge-gray'}`}>
                          {msg.status}
                        </span>
                        <span className="text-xs text-warmgray-400">
                          {new Date(msg.createdAt).toLocaleDateString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {selected ? (
            <div className="bg-white shadow-card p-6">
              <div className="mb-6 pb-4 border-b border-warmgray-100">
                <h3 className="font-serif text-lg font-bold text-warmgray-900 mb-1">{selected.subject}</h3>
                <div className="text-sm text-warmgray-600">
                  From: <strong>{selected.name}</strong> ({selected.email})
                </div>
                {selected.phone && <div className="text-sm text-warmgray-500">Phone: {selected.phone}</div>}
                <div className="text-xs text-warmgray-400 mt-1">
                  {new Date(selected.createdAt).toLocaleString('en-IN')}
                </div>
              </div>
              <div className="text-warmgray-700 text-sm leading-relaxed whitespace-pre-wrap">
                {selected.message}
              </div>
              <div className="mt-6 flex gap-3">
                <a
                  href={`mailto:${selected.email}?subject=Re: ${selected.subject}`}
                  className="btn-primary text-sm py-2"
                >
                  Reply via Email
                </a>
              </div>
            </div>
          ) : (
            <div className="bg-white shadow-card p-8 flex items-center justify-center text-warmgray-400">
              <p>Click a message to read it</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
