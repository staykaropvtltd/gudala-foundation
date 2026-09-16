import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-warmgray-900 text-warmgray-300">
      {/* Pre-footer CTA */}
      <div className="bg-forest-600">
        <div className="container-wide py-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="eyebrow-light mb-3">Make A Difference</p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-white leading-tight">
                Every Contribution Matters.
                <br />
                <span className="text-amber-400">Join Our Mission Today.</span>
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 md:justify-end">
              <Link href="/donate" className="btn-amber text-center">
                &#9829; Donate Now
              </Link>
              <Link href="/volunteer" className="btn-outline-white text-center">
                Volunteer With Us
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container-wide py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-5">
              <div className="bg-white rounded px-3 py-2">
                <Image
                  src="/logo.jpeg"
                  alt="Gudala Family Foundation"
                  width={160}
                  height={54}
                  className="h-12 w-auto object-contain"
                />
              </div>
            </Link>
            <p className="text-sm text-warmgray-400 leading-relaxed mb-6">
              Committed to uplifting underserved communities through education, healthcare, and sustainable development &mdash; one family at a time.
            </p>
            {/* Social links */}
            <div className="flex items-center gap-3">
              {[
                { label: 'Facebook', icon: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z', href: '#' },
                { label: 'Instagram', icon: 'M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zM17.5 6.5h.01M21 5.5a3.5 3.5 0 00-3.5-3.5h-7A3.5 3.5 0 007 5.5v7a3.5 3.5 0 003.5 3.5h7a3.5 3.5 0 003.5-3.5v-7z', href: '#' },
                { label: 'Twitter', icon: 'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z', href: '#' },
                { label: 'YouTube', icon: 'M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z', href: '#' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 bg-warmgray-800 rounded-full flex items-center justify-center hover:bg-forest-600 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={social.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif font-semibold text-white text-base mb-5 pb-2 border-b border-warmgray-700">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Home', href: '/' },
                { label: 'About Us', href: '/about' },
                { label: 'Our Programs', href: '/programs' },
                { label: 'Events', href: '/events' },
                { label: 'Impact Stories', href: '/stories' },
                { label: 'Gallery', href: '/gallery' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-warmgray-400 hover:text-amber-400 transition-colors flex items-center gap-2"
                  >
                    <span className="text-forest-400 text-xs">&rsaquo;</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Involved */}
          <div>
            <h4 className="font-serif font-semibold text-white text-base mb-5 pb-2 border-b border-warmgray-700">
              Get Involved
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Volunteer', href: '/volunteer' },
                { label: 'Donate', href: '/donate' },
                { label: 'Partner With Us', href: '/contact' },
                { label: 'CSR Collaboration', href: '/contact' },
                { label: 'Contact Us', href: '/contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-warmgray-400 hover:text-amber-400 transition-colors flex items-center gap-2"
                  >
                    <span className="text-forest-400 text-xs">&rsaquo;</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif font-semibold text-white text-base mb-5 pb-2 border-b border-warmgray-700">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <svg className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <span className="text-sm text-warmgray-400">
                  [Foundation Address &mdash; To be provided by client]
                </span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-4 h-4 text-amber-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                <span className="text-sm text-warmgray-400">[Phone &mdash; To be provided]</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-4 h-4 text-amber-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                <span className="text-sm text-warmgray-400">[Email &mdash; To be provided]</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-warmgray-800">
        <div className="container-wide py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-warmgray-500">
            &copy; {year} Gudala Family Foundation. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/admin" className="text-xs text-warmgray-600 hover:text-warmgray-400 transition-colors">
              Admin
            </Link>
            <span className="text-xs text-warmgray-600">
              Built with care for communities
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
