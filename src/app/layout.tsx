import type { Metadata, Viewport } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Toast from '@/components/Toast'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export const metadata: Metadata = {
  title: 'Farm to Table - Fresh Local Produce Delivered',
  description: 'Farm fresh produce delivered to your door. Shop seasonal vegetables, fruits, dairy, meat and more directly from local farms.',
  keywords: ['farm', 'organic', 'produce', 'local', 'delivery', 'groceries'],
  authors: [{ name: 'Farm to Table' }],
  openGraph: {
    title: 'Farm to Table - Fresh Local Produce Delivered',
    description: 'Farm fresh produce delivered to your door.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-1 w-full">
          {children}
        </main>
        <Footer />
        <Toast />
      </body>
    </html>
  )
}