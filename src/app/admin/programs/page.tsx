import Link from 'next/link'
import Image from 'next/image'
import { prisma } from '@/lib/prisma'

export default async function AdminProgramsPage() {
  const programs = await prisma.program.findMany({ orderBy: { order: 'asc' } })

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-2xl font-bold text-warmgray-900">Programs</h1>
          <p className="text-warmgray-500 text-sm mt-1">{programs.length} programs</p>
        </div>
      </div>

      <div className="bg-white shadow-card overflow-hidden">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Program</th>
              <th>Category</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {programs.map(p => (
              <tr key={p.id}>
                <td>
                  <div className="flex items-center gap-3">
                    {p.coverImage && (
                      <div className="relative w-12 h-10 flex-shrink-0 overflow-hidden">
                        <Image src={p.coverImage} alt={p.title} fill className="object-cover" sizes="48px" />
                      </div>
                    )}
                    <div>
                      <div className="font-semibold text-warmgray-800 text-sm">{p.title}</div>
                      <div className="text-xs text-warmgray-400">/{p.slug}</div>
                    </div>
                  </div>
                </td>
                <td><span className="badge badge-blue">{p.category}</span></td>
                <td>
                  <span className={`badge ${p.status === 'published' ? 'badge-green' : 'badge-gray'}`}>
                    {p.status}
                  </span>
                </td>
                <td>
                  <Link href={`/programs/${p.slug}`} target="_blank" className="text-xs text-forest-600 font-semibold hover:underline">
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
