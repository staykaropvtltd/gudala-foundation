'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

interface AdminSidebarProps {
  user: { name: string; email: string; role: string }
}

const NAV = [
  {
    label: 'Overview',
    items: [
      { label: 'Dashboard', href: '/admin', icon: '◉' },
    ],
  },
  {
    label: 'Content',
    items: [
      { label: 'Programs', href: '/admin/programs', icon: '◈' },
      { label: 'Impact Stories', href: '/admin/stories', icon: '◎' },
      { label: 'Gallery', href: '/admin/gallery', icon: '◐' },
      { label: 'Settings / CMS', href: '/admin/settings', icon: '◌' },
    ],
  },
  {
    label: 'Events',
    items: [
      { label: 'All Events', href: '/admin/events', icon: '◆' },
      { label: 'Create Event', href: '/admin/events/create', icon: '◇' },
    ],
  },
  {
    label: 'Engagement',
    items: [
      { label: 'Volunteers', href: '/admin/volunteers', icon: '◉' },
      { label: 'Donations', href: '/admin/donations', icon: '◎' },
      { label: 'Messages', href: '/admin/messages', icon: '◈' },
    ],
  },
]

export default function AdminSidebar({ user }: AdminSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleLogout = async () => {
    await fetch('/api/auth', { method: 'DELETE' })
    router.push('/admin/login')
  }

  const isActive = (href: string) =>
    href === '/admin' ? pathname === '/admin' : pathname.startsWith(href)

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="p-5 border-b border-warmgray-100">
        <Link href="/admin" className="flex items-center justify-center">
          <Image
            src="/logo.jpeg"
            alt="Gudala Family Foundation"
            width={150}
            height={50}
            className="h-12 w-auto object-contain"
          />
        </Link>
        <p className="text-center text-xs text-warmgray-400 mt-2 font-medium uppercase tracking-wider">Admin Dashboard</p>
      </div>

      {/* Nav */}
      <div className="flex-1 overflow-y-auto py-4 px-3">
        {NAV.map((group) => (
          <div key={group.label} className="mb-6">
            <p className="text-xs font-bold text-warmgray-400 uppercase tracking-widest px-3 mb-2">
              {group.label}
            </p>
            {group.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`admin-nav-item mb-0.5 ${isActive(item.href) ? 'active' : ''}`}
              >
                <span className="text-base">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>
        ))}
      </div>

      {/* User + logout */}
      <div className="p-4 border-t border-warmgray-100">
        <div className="flex items-center gap-3 px-3 py-2 mb-2">
          <div className="w-8 h-8 bg-forest-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
            {user.name[0]}
          </div>
          <div className="min-w-0">
            <div className="text-xs font-semibold text-warmgray-800 truncate">{user.name}</div>
            <div className="text-xs text-warmgray-400 truncate">{user.email}</div>
          </div>
        </div>
        <Link href="/" className="admin-nav-item text-xs mb-1">
          &larr; View Website
        </Link>
        <button
          onClick={handleLogout}
          className="w-full admin-nav-item text-xs text-red-500 hover:text-red-600 hover:bg-red-50"
        >
          Sign Out
        </button>
      </div>
    </>
  )

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden w-10 h-10 bg-white shadow-warm rounded-full flex items-center justify-center text-forest-600"
      >
        &#9776;
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-warmgray-100 flex flex-col shadow-sm transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <SidebarContent />
      </aside>
    </>
  )
}
