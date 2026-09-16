import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { getAuthUser } from '@/lib/auth'

async function getDashboardStats() {
  const now = new Date()
  const [
    totalDonations,
    successfulDonations,
    volunteers,
    upcomingEvents,
    pastEvents,
    messages,
    programs,
    stories,
    gallery,
  ] = await Promise.all([
    prisma.donation.count(),
    prisma.donation.aggregate({
      _sum: { amount: true },
      where: { status: 'successful' },
    }),
    prisma.volunteer.count(),
    prisma.event.count({ where: { date: { gte: now }, status: 'published' } }),
    prisma.event.count({ where: { date: { lt: now } } }),
    prisma.contactMessage.count({ where: { status: 'unread' } }),
    prisma.program.count({ where: { status: 'published' } }),
    prisma.impactStory.count({ where: { status: 'published' } }),
    prisma.galleryImage.count(),
  ])

  const recentVolunteers = await prisma.volunteer.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
  })

  const recentMessages = await prisma.contactMessage.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
  })

  const recentDonations = await prisma.donation.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
  })

  const upcomingEventsList = await prisma.event.findMany({
    where: { date: { gte: now }, status: 'published' },
    orderBy: { date: 'asc' },
    take: 3,
  })

  return {
    totalDonations,
    successfulDonationsAmount: successfulDonations._sum.amount || 0,
    volunteers,
    upcomingEvents,
    pastEvents,
    messages,
    programs,
    stories,
    gallery,
    recentVolunteers,
    recentMessages,
    recentDonations,
    upcomingEventsList,
  }
}

export default async function AdminDashboard() {
  const user = await getAuthUser()
  const stats = await getDashboardStats()

  const statCards = [
    { label: 'Total Volunteers', value: stats.volunteers, href: '/admin/volunteers', color: 'bg-forest-600', icon: '👥' },
    { label: 'Upcoming Events', value: stats.upcomingEvents, href: '/admin/events', color: 'bg-earth-600', icon: '📅' },
    { label: 'Published Programs', value: stats.programs, href: '/admin/programs', color: 'bg-amber-500', icon: '◈' },
    { label: 'Unread Messages', value: stats.messages, href: '/admin/messages', color: 'bg-warmgray-700', icon: '✉' },
    { label: 'Impact Stories', value: stats.stories, href: '/admin/stories', color: 'bg-forest-500', icon: '📖' },
    { label: 'Gallery Images', value: stats.gallery, href: '/admin/gallery', color: 'bg-earth-500', icon: '🖼' },
    { label: 'Donation Records', value: stats.totalDonations, href: '/admin/donations', color: 'bg-amber-600', icon: '♥' },
    { label: 'Past Events', value: stats.pastEvents, href: '/admin/events', color: 'bg-warmgray-600', icon: '✓' },
  ]

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-serif text-2xl font-bold text-warmgray-900">
          Welcome back, {user?.name}
        </h1>
        <p className="text-warmgray-500 text-sm mt-1">
          Here's an overview of your foundation's activity.
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {statCards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="bg-white p-5 shadow-card hover:shadow-card-hover transition-shadow group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 ${card.color} flex items-center justify-center text-white text-lg`}>
                {card.icon}
              </div>
            </div>
            <div className="text-2xl font-bold font-serif text-warmgray-900 mb-1">
              {card.value}
            </div>
            <div className="text-xs text-warmgray-500 font-medium">{card.label}</div>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Volunteers */}
        <div className="bg-white shadow-card p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-serif text-lg font-semibold text-warmgray-900">
              Recent Volunteers
            </h2>
            <Link href="/admin/volunteers" className="text-xs text-forest-600 font-semibold hover:underline">
              View All →
            </Link>
          </div>
          {stats.recentVolunteers.length === 0 ? (
            <p className="text-warmgray-400 text-sm">No volunteer applications yet.</p>
          ) : (
            <div className="space-y-3">
              {stats.recentVolunteers.map((v) => (
                <div key={v.id} className="flex items-center justify-between py-2 border-b border-warmgray-50 last:border-0">
                  <div>
                    <div className="font-semibold text-warmgray-800 text-sm">{v.name}</div>
                    <div className="text-xs text-warmgray-400">{v.interest} • {v.city}</div>
                  </div>
                  <span className={`badge ${v.status === 'approved' ? 'badge-green' : v.status === 'pending' ? 'badge-yellow' : 'badge-gray'}`}>
                    {v.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Upcoming events */}
        <div className="bg-white shadow-card p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-serif text-lg font-semibold text-warmgray-900">
              Upcoming Events
            </h2>
            <Link href="/admin/events" className="text-xs text-forest-600 font-semibold hover:underline">
              Manage →
            </Link>
          </div>
          {stats.upcomingEventsList.length === 0 ? (
            <div className="text-center py-4">
              <p className="text-warmgray-400 text-sm mb-3">No upcoming events.</p>
              <Link href="/admin/events/create" className="btn-primary text-xs py-2 px-4">
                + Create Event
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {stats.upcomingEventsList.map((event) => (
                <div key={event.id} className="flex items-start gap-3 py-2 border-b border-warmgray-50 last:border-0">
                  <div className="bg-forest-600 text-white text-center px-2 py-1.5 min-w-14 flex-shrink-0">
                    <div className="text-lg font-bold font-serif leading-none">
                      {new Date(event.date).getDate()}
                    </div>
                    <div className="text-xs opacity-80">
                      {new Date(event.date).toLocaleDateString('en-IN', { month: 'short' })}
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold text-warmgray-800 text-sm leading-tight">{event.title}</div>
                    <div className="text-xs text-warmgray-400 mt-0.5">{event.location}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent messages */}
        <div className="bg-white shadow-card p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-serif text-lg font-semibold text-warmgray-900">
              Recent Messages
            </h2>
            <Link href="/admin/messages" className="text-xs text-forest-600 font-semibold hover:underline">
              View All →
            </Link>
          </div>
          {stats.recentMessages.length === 0 ? (
            <p className="text-warmgray-400 text-sm">No messages yet.</p>
          ) : (
            <div className="space-y-3">
              {stats.recentMessages.map((msg) => (
                <div key={msg.id} className="flex items-start justify-between py-2 border-b border-warmgray-50 last:border-0">
                  <div>
                    <div className="font-semibold text-warmgray-800 text-sm">{msg.name}</div>
                    <div className="text-xs text-warmgray-400 line-clamp-1">{msg.subject}</div>
                  </div>
                  <span className={`badge ${msg.status === 'unread' ? 'badge-blue' : 'badge-gray'} flex-shrink-0 ml-2`}>
                    {msg.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent donations */}
        <div className="bg-white shadow-card p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-serif text-lg font-semibold text-warmgray-900">
              Recent Donations
            </h2>
            <Link href="/admin/donations" className="text-xs text-forest-600 font-semibold hover:underline">
              View All →
            </Link>
          </div>
          {stats.recentDonations.length === 0 ? (
            <p className="text-warmgray-400 text-sm">No donations recorded yet.</p>
          ) : (
            <div className="space-y-3">
              {stats.recentDonations.map((d) => (
                <div key={d.id} className="flex items-center justify-between py-2 border-b border-warmgray-50 last:border-0">
                  <div>
                    <div className="font-semibold text-warmgray-800 text-sm">{d.donorName}</div>
                    <div className="text-xs text-warmgray-400">{d.email}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-forest-600 text-sm">
                      ₹{d.amount.toLocaleString('en-IN')}
                    </div>
                    <span className={`badge text-xs ${d.status === 'successful' ? 'badge-green' : d.status === 'pending' ? 'badge-yellow' : 'badge-red'}`}>
                      {d.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick actions */}
      <div className="mt-6 bg-forest-600 p-6 text-white">
        <h3 className="font-serif font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: '+ Create Event', href: '/admin/events/create' },
            { label: '+ Add Story', href: '/admin/stories' },
            { label: '+ Upload Images', href: '/admin/gallery' },
            { label: 'Edit Settings', href: '/admin/settings' },
          ].map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className="bg-white/10 hover:bg-white/20 transition-colors px-4 py-3 text-sm font-medium text-center"
            >
              {action.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
