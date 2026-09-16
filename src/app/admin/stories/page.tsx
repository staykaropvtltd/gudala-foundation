import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { formatDateShort } from '@/lib/utils'

export default async function AdminStoriesPage() {
  const stories = await prisma.impactStory.findMany({
    orderBy: { createdAt: 'desc' },
    include: { program: { select: { title: true } } },
  })

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-2xl font-bold text-warmgray-900">Impact Stories</h1>
          <p className="text-warmgray-500 text-sm mt-1">{stories.length} stories</p>
        </div>
      </div>

      <div className="bg-white shadow-card overflow-hidden">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Story</th>
              <th>Location</th>
              <th>Program</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {stories.map(s => (
              <tr key={s.id}>
                <td>
                  <div className="font-semibold text-warmgray-800 text-sm max-w-xs truncate">{s.title}</div>
                </td>
                <td className="text-sm text-warmgray-500">{s.location || '—'}</td>
                <td className="text-sm text-warmgray-500">{s.program?.title || '—'}</td>
                <td className="text-sm text-warmgray-400">{formatDateShort(s.date)}</td>
                <td>
                  <span className={`badge ${s.status === 'published' ? 'badge-green' : 'badge-gray'}`}>
                    {s.status}
                  </span>
                </td>
                <td>
                  <Link href={`/stories/${s.slug}`} target="_blank" className="text-xs text-forest-600 font-semibold hover:underline">
                    View →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
