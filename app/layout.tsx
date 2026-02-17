import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display, Dancing_Script } from 'next/font/google'

import './globals.css'
import SukoonMode from '../components/sukoon-mode'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
})

const dancing = Dancing_Script({
  subsets: ['latin'],
  variable: '--font-dancing',
})

export const metadata: Metadata = {
  title: 'Noor | A Valentine\'s Ode to Love',
  description: 'An immersive poetic experience celebrating the radiance of love. Every soul has a light that never fades.',
}

export const viewport: Viewport = {
  themeColor: '#0a0a1a',
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${dancing.variable}`}>
      <head>
        <link
          rel="preload"
          href="/videos/sequence-03.mp4"
          as="video"
          type="video/mp4"
        />
      </head>
      <body className="font-sans antialiased bg-background text-foreground overflow-x-hidden">
        {children}
        <SukoonMode />
      </body>
    </html>
  )
}
