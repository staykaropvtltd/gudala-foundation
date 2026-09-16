import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Gudala Family Foundation | Serving Communities With Compassion',
    template: '%s | Gudala Family Foundation',
  },
  description:
    'Gudala Family Foundation is committed to uplifting underserved communities through education, healthcare, women empowerment, and sustainable development programs.',
  keywords: [
    'NGO India',
    'Gudala Family Foundation',
    'community development',
    'education NGO',
    'healthcare NGO',
    'women empowerment',
    'donate India',
    'volunteer India',
  ],
  authors: [{ name: 'Gudala Family Foundation' }],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'Gudala Family Foundation',
    title: 'Gudala Family Foundation | Serving Communities With Compassion',
    description:
      'Together, we can build a better tomorrow. Join us in our mission to uplift underserved communities across India.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gudala Family Foundation',
    description:
      'Together, we can build a better tomorrow. Join us in our mission to uplift underserved communities across India.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,600&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-cream font-sans antialiased">{children}</body>
    </html>
  )
}
