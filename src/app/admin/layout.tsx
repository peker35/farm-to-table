'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import LanguageSelector from '@/components/LanguageSelector'
import { useLanguageStore } from '@/store/language'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { language } = useLanguageStore()

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { href: '/admin/products', label: 'Products', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
    { href: '/admin/producers', label: 'Producers', icon: 'M3 7v10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2m4-4h10a2 2 0 012 2v2M7 7H5a2 2 0 00-2 2v2m12-6v4m-4 0h2m-2 0H9m4 0h2m-6-4v4m-4 0h2m-2 0H7' },
    { href: '/admin/orders', label: 'Orders', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01' },
    { href: '/admin/customers', label: 'Customers', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
    { href: '/admin/events', label: 'Events', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
  ]

  const getLabel = (item: typeof navItems[0]) => {
    if (language === 'tr') {
      if (item.href === '/admin') return 'Panel'
      if (item.href === '/admin/products') return 'Ürünler'
      if (item.href === '/admin/producers') return 'Üreticiler'
      if (item.href === '/admin/orders') return 'Siparişler'
      if (item.href === '/admin/customers') return 'Müşteriler'
      if (item.href === '/admin/events') return 'Etkinlikler'
    }
    if (language === 'it') {
      if (item.href === '/admin') return 'Pannello'
      if (item.href === '/admin/products') return 'Prodotti'
      if (item.href === '/admin/producers') return 'Produttori'
      if (item.href === '/admin/orders') return 'Ordini'
      if (item.href === '/admin/customers') return 'Clienti'
      if (item.href === '/admin/events') return 'Eventi'
    }
    return item.label
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        <aside className="w-64 bg-white shadow-sm min-h-screen fixed">
          <div className="p-6 border-b">
            <Link href="/admin" className="text-xl font-bold text-primary">
              Admin Panel
            </Link>
          </div>

          <nav className="p-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${
                  pathname === item.href
                    ? 'bg-primary text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                </svg>
                {getLabel(item)}
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t">
            <div className="mb-4">
              <LanguageSelector />
            </div>
          </div>

          <div className="p-4 border-t mt-auto">
            <Link href="/" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              {language === 'tr' ? 'Siteye Dön' : language === 'it' ? 'Torna al Sito' : 'Back to Site'}
            </Link>
          </div>
        </aside>

        <main className="ml-64 flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  )
}