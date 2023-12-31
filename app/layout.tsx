import './globals.css'

import type { Metadata } from 'next'

import { Inter } from 'next/font/google'

import Footer from '@/app/components/Footer'
import Header from '@/app/components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dashboard - Silicon University',
  description: 'Generated by create next app',
  icons: {
    shortcut: '/favicon.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={`${inter.className} scroll-smooth antialiased [font-feature-settings:'ss01']`} lang="en">
      <body>
        <Header />
        <div className="bg-grey-50 min-h-screen">{children}</div>
        <Footer />
      </body>
    </html>
  )
}
