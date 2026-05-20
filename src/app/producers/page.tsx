'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useLanguageStore } from '@/store/language'
import { t } from '@/data/translations'
import { api } from '@/lib/api'

export default function ProducersPage() {
  const [farms, setFarms] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const { language } = useLanguageStore()
  const tr = (section: string, key: string) => t(section as any, key, language)

  useEffect(() => {
    api.farms.list().then(data => {
      setFarms(data.map((f: any) => ({
        ...f,
        name: language === 'tr' ? (f.nameTr || f.nameEn) : language === 'it' ? (f.nameIt || f.nameEn) : f.nameEn,
        location: language === 'tr' ? (f.locationTr || f.locationEn) : language === 'it' ? (f.locationIt || f.locationEn) : f.locationEn,
        description: language === 'tr' ? (f.descriptionTr || f.descriptionEn) : language === 'it' ? (f.descriptionIt || f.descriptionEn) : f.descriptionEn,
      })))
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [language])

  if (loading) {
    return <div className="pt-20 flex items-center justify-center h-64"><div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" /></div>
  }

  return (
    <div className="pt-20">
      <section className="bg-primary text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">{tr('producers', 'title')}</h1>
          <p className="text-xl opacity-90">{tr('producers', 'subtitle')}</p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          {farms.map((farm: any) => (
            <div key={farm.id} className="bg-white rounded-xl overflow-hidden shadow-md">
              <div className="relative h-64">
                <Image src={farm.image} alt={farm.name} fill className="object-cover" />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2">{farm.name}</h2>
                <p className="text-primary font-medium mb-2">{farm.location}</p>
                <p className="text-gray-600">{farm.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gray-50 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">{tr('producers', 'becomeProducer')}</h2>
          <p className="text-gray-600 mb-6">{tr('producers', 'becomeDesc')}</p>
          <a href="https://farmtopeople.typeform.com/to/slkLxSmU" target="_blank" rel="noopener noreferrer" className="btn-primary inline-block">{tr('producers', 'applyNow')}</a>
        </div>
      </div>
    </div>
  )
}
