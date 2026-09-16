'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Who We Are', href: '/about' },
  {
    label: 'What We Do',
    href: '/programs',
    children: [
      { label: 'All Programs', href: '/programs' },
      { label: 'Education', href: '/programs/education' },
      { label: 'Healthcare', href: '/programs/healthcare' },
      { label: 'Women Empowerment', href: '/programs/women-empowerment' },
      { label: 'Community Development', href: '/programs/community-development' },
    ],
  },
  { label: 'Events', href: '/events' },
  { label: 'Impact Stories', href: '/stories' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setOpenDropdown(null)
  }, [pathname])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <>
      {/* Top info bar */}
      <div className="bg-forest-600 text-white text-xs py-2 hidden md:block">
        <div className="container-wide flex items-center justify-between">
          <span className="opacity-80">Gudala Family Foundation &mdash; Serving Communities With Compassion</span>
          <div className="flex items-center gap-6 opacity-90">
            <a href="tel:+91" className="hover:text-amber-300 transition-colors">
              [Phone &mdash; To be provided]
            </a>
            <a href="mailto:" className="hover:text-amber-300 transition-colors">
              [Email &mdash; To be provided]
            </a>
          </div>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 nav-scrolled shadow-lg border-b border-warmgray-100'
            : 'bg-white shadow-sm'
        }`}
      >
        <div className="container-wide">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.jpeg"
                alt="Gudala Family Foundation"
                width={180}
                height={60}
                className="h-14 w-auto object-contain"
                priority
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <div key={link.href} className="relative group">
                  <Link
                    href={link.href}
                    className={`px-3 py-2 text-sm font-medium transition-colors duration-150 flex items-center gap-1 ${
                      isActive(link.href)
                        ? 'text-forest-600'
                        : 'text-warmgray-700 hover:text-forest-600'
                    }`}
                  >
                    {link.label}
                    {link.children && (
                      <svg className="w-3 h-3 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                    {isActive(link.href) && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-forest-600" />
                    )}
                  </Link>

                  {link.children && (
                    <div className="absolute top-full left-0 mt-1 w-52 bg-white shadow-warm-lg border border-warmgray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-1 group-hover:translate-y-0">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2.5 text-sm text-warmgray-700 hover:bg-forest-50 hover:text-forest-600 transition-colors border-b border-warmgray-50 last:border-0"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* CTA + Mobile toggle */}
            <div className="flex items-center gap-3">
              <Link
                href="/donate"
                className="hidden sm:inline-flex btn-amber text-sm px-6 py-2.5 uppercase tracking-wide font-bold"
              >
                &#9829; Donate
              </Link>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 text-warmgray-700 hover:text-forest-600"
                aria-label="Toggle menu"
              >
                {mobileOpen ? (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-warmgray-100 shadow-lg">
            <div className="container-wide py-4">
              {navLinks.map((link) => (
                <div key={link.href}>
                  <div className="flex items-center justify-between">
                    <Link
                      href={link.href}
                      className={`block py-3 text-sm font-medium flex-1 ${
                        isActive(link.href) ? 'text-forest-600' : 'text-warmgray-700'
                      }`}
                    >
                      {link.label}
                    </Link>
                    {link.children && (
                      <button
                        onClick={() =>
                          setOpenDropdown(
                            openDropdown === link.href ? null : link.href
                          )
                        }
                        className="p-2"
                      >
                        <svg
                          className={`w-4 h-4 transition-transform ${
                            openDropdown === link.href ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    )}
                  </div>

                  {link.children && openDropdown === link.href && (
                    <div className="ml-4 pb-2">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block py-2 text-sm text-warmgray-600 hover:text-forest-600 border-l-2 border-warmgray-100 pl-3"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                  <div className="border-b border-warmgray-50" />
                </div>
              ))}

              <div className="pt-4 flex gap-3">
                <Link href="/donate" className="btn-amber flex-1 text-center text-sm py-3">
                  &#9829; Donate Now
                </Link>
                <Link href="/volunteer" className="btn-secondary flex-1 text-center text-sm py-3">
                  Volunteer
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  )
}
