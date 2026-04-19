'use client'

import Link from 'next/link'
import { categories, getCategoryName } from '@/data/products'
import { useLanguageStore } from '@/store/language'
import { t, brandNames } from '@/data/translations'

export default function Footer() {
  const { language } = useLanguageStore()
  const f = (key: string) => t('footer', key, language)
  const brand = brandNames[language]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">{brand.short}</span>
              </div>
              <span className="font-bold text-xl">{brand.full}</span>
            </div>
            <p className="text-gray-400 text-sm">
              {language === 'tr' ? 'Taze yerel ürünler kapınıza teslim.' : language === 'it' ? 'Prodotti locali freschi consegnati.' : 'Fresh local produce delivered to your door.'}
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">{f('shop')}</h3>
            <ul className="space-y-2">
              {categories.slice(0, 6).map((cat) => (
                <li key={cat.slug}>
                  <Link href={`/shop/${cat.slug}`} className="text-gray-400 hover:text-white text-sm">
                    {getCategoryName(cat, language)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">{f('company')}</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-400 hover:text-white text-sm">{f('aboutUs')}</Link></li>
              <li><Link href="/producers" className="text-gray-400 hover:text-white text-sm">{language === 'tr' ? 'Üreticiler' : language === 'it' ? 'Produttori' : 'Producers'}</Link></li>
              <li><Link href="/careers" className="text-gray-400 hover:text-white text-sm">{f('careers')}</Link></li>
              <li><Link href="/press" className="text-gray-400 hover:text-white text-sm">{f('press')}</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white text-sm">{f('contact')}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">{f('support')}</h3>
            <ul className="space-y-2">
              <li><Link href="/faq" className="text-gray-400 hover:text-white text-sm">{f('faq')}</Link></li>
              <li><Link href="/shipping" className="text-gray-400 hover:text-white text-sm">{f('shipping')}</Link></li>
              <li><Link href="/returns" className="text-gray-400 hover:text-white text-sm">{f('returns')}</Link></li>
              <li><Link href="/gift-cards" className="text-gray-400 hover:text-white text-sm">{f('giftCards')}</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">© 2026 {brand.full}. {f('allRights')}</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-gray-400 hover:text-white text-sm">{f('privacy')}</Link>
            <Link href="/terms" className="text-gray-400 hover:text-white text-sm">{f('terms')}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}