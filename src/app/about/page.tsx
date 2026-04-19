'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useLanguageStore } from '@/store/language'
import { t, about as aboutT } from '@/data/translations'

export default function AboutPage() {
  const { language } = useLanguageStore()
  const a = (key: string) => t('about', key, language)

  return (
    <div className="pt-20">
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center bg-primary text-white">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="https://cdn.sanity.io/images/ec9j7ju7/production/500b26d1b8378c7ea8a7505acb401a65f50c0d01-5616x3744.jpg"
            alt="Farm"
            fill
            className="object-cover opacity-20"
          />
        </div>
        <div className="relative z-10 text-center max-w-3xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{a('title')}</h1>
          <p className="text-xl opacity-90">
            {a('missionDesc')}
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-16">
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-4">{a('whoWeAre')}</h2>
          <p className="text-gray-600">
            {a('whoWeAreDesc')}
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-4">{a('ourStandards')}</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="font-semibold mb-2">{language === 'tr' ? 'Önce Yerel' : language === 'it' ? 'Locale Prima' : 'Local First'}</h3>
              <p className="text-gray-600 text-sm">{a('localFirstDesc')}</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="font-semibold mb-2">{language === 'tr' ? 'Sürdürülebilir' : language === 'it' ? 'Sostenibile' : 'Sustainable'}</h3>
              <p className="text-gray-600 text-sm">{a('sustainableDesc')}</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="font-semibold mb-2">{language === 'tr' ? 'Taze' : language === 'it' ? 'Fresco' : 'Fresh'}</h3>
              <p className="text-gray-600 text-sm">{a('freshDesc')}</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="font-semibold mb-2">{language === 'tr' ? 'Adil Fiyat' : language === 'it' ? 'Prezzo Giusto' : 'Fair Price'}</h3>
              <p className="text-gray-600 text-sm">{a('fairDesc')}</p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-4">{a('joinCommunity')}</h2>
          <p className="text-gray-600 mb-6">
            {a('joinCommunityDesc')}
          </p>
          <div className="flex gap-4">
            <Link href="/join" className="btn-primary">
              {a('getStarted')}
            </Link>
            <Link href="/producers" className="btn-secondary">
              {language === 'tr' ? 'Üreticiler' : language === 'it' ? 'Produttori' : 'Producers'}
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}