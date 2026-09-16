import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { formatDate } from '@/lib/utils'

export default async function AdminEventsPage() {
  const events = await prisma.event.findMany({
    orderBy: { date: 'desc' },
    include: { program: { select: { title: true } } },
  })

  const now = new Date()

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-2xl font-bold text-warmgray-900">Events</h1>
          <p className="text-warmgray-500 text-sm mt-1">{events.length} total events</p>
        </div>
        <Link href="/admin/events/create" className="btn-primary text-sm py-2.5 px-6">
          + Create Event
        </Link>
      </div>

      {events.length === 0 ? (
        <div className="text-center py-16 bg-white shadow-card">
          <p className="text-warmgray-400 mb-4">No events yet.</p>
          <Link href="/admin/events/create" className="btn-primary text-sm">
            Create First Event
          </Link>
        </div>
      ) : (
        <div className="bg-white shadow-card overflow-hidden">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Event</th>
                <th>Date</th>
                <th>Location</th>
                <th>Status</th>
                <th>Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => {
                const isUpcoming = new Date(event.date) >= now
                return (
                  <tr key={event.id}>
                    <td>
                      <div className="font-semibold text-warmgray-800 text-sm">{event.title}</div>
                      {event.program && (
                        <div className="text-xs text-warmgray-400">{event.program.title}</div>
                      )}
                    </td>
                    <td className="text-sm">{formatDate(event.date)}</td>
                    <td className="text-sm text-warmgray-500 max-w-32 truncate">{event.location}</td>
                    <td>
                      <span className={`badge ${
                        event.status === 'published' ? 'badge-green' :
                        event.status === 'completed' ? 'badge-gray' :
                        event.status === 'draft' ? 'badge-yellow' :
                        'badge-red'
                      }`}>
                        {event.status}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${isUpcoming ? 'badge-blue' : 'badge-gray'}`}>
                        {isUpcoming ? 'Upcoming' : 'Past'}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/events/${event.id}`}
                          className="text-xs text-forest-600 font-semibold hover:underline"
                        >
                          Edit
                        </Link>
                        <Link
                          href={`/events/${event.slug}`}
                          target="_blank"
                          className="text-xs text-warmgray-500 hover:underline"
                        >
                          View
                        </Link>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
