'use client'

import { useState, useRef } from 'react'
import { useSettingsStore } from '@/store/settings'
import { useLanguageStore } from '@/store/language'
import { useToastStore } from '@/store/toast'
import SafeImage from '@/components/SafeImage'
import { compressImage } from '@/utils/compressImage'

export default function AdminSettingsPage() {
  const { logoUrl, setLogoUrl, resetLogo } = useSettingsStore()
  const { language } = useLanguageStore()
  const showToast = useToastStore(state => state.show)
  const [preview, setPreview] = useState(logoUrl)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const t = (tr: string, en: string, it: string) =>
    language === 'tr' ? tr : language === 'it' ? it : en

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      const compressed = await compressImage(file, { maxWidth: 200, maxHeight: 200, quality: 0.9 })
      setPreview(compressed)
      setLogoUrl(compressed)
    } catch {
      const reader = new FileReader()
      reader.onload = (event) => {
        const result = event.target?.result as string
        setPreview(result)
        setLogoUrl(result)
      }
      reader.readAsDataURL(file)
    }
    showToast(t('Logo güncellendi!', 'Logo updated!', 'Logo aggiornato!'), 'success')
  }

  const handleReset = () => {
    resetLogo()
    setPreview('/logo.svg')
    showToast(
      t('Logoya sıfırlandı!', 'Logo reset to default!', 'Logo ripristinato!'),
      'info'
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">{t('Ayarlar', 'Settings', 'Impostazioni')}</h1>
        <p className="text-gray-600">{t('Site ayarlarını yönetin', 'Manage site settings', 'Gestisci le impostazioni del sito')}</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Logo Upload */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-bold mb-4">{t('Site Logosu', 'Site Logo', 'Logo del Sito')}</h2>
          
          <div className="space-y-4">
            <div className="flex items-center gap-6 p-4 bg-gray-50 rounded-lg">
              <div className="relative w-20 h-20 flex-shrink-0">
                <SafeImage
                  src={preview}
                  alt="Logo Preview"
                  fill
                  objectFit="contain"
                />
              </div>
              <div>
                <p className="font-medium">{t('Mevcut Logo', 'Current Logo', 'Logo Attuale')}</p>
                <p className="text-sm text-gray-500">
                  {t('Boyut: 40x40px olarak gösterilir', 'Displayed at 40x40px', 'Viene visualizzato a 40x40px')}
                </p>
              </div>
            </div>

            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleLogoUpload}
              className="hidden"
            />

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-3 border-2 border-dashed rounded-lg text-sm text-gray-500 hover:bg-gray-50 hover:border-primary"
            >
              <svg className="w-6 h-6 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {t('Logo Yükle', 'Upload Logo', 'Carica Logo')}
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="w-full py-2 border rounded-lg text-sm text-red-600 hover:bg-red-50"
            >
              {t('Varsayılana Dön', 'Reset to Default', 'Ripristina Originale')}
            </button>
          </div>
        </div>

        {/* Preview Section */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-bold mb-4">{t('Önizleme', 'Preview', 'Anteprima')}</h2>
          
          <div className="space-y-6">
            <div className="bg-primary/5 rounded-lg p-6">
              <p className="text-sm text-gray-500 mb-3">{t('Header Logosu', 'Header Logo', 'Logo Header')}</p>
              <div className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm">
                <div className="relative w-10 h-10 flex-shrink-0">
                  <SafeImage
                    src={preview}
                    alt="Logo"
                    fill
                    objectFit="contain"
                  />
                </div>
                <span className="font-bold text-lg">Farm to Table</span>
              </div>
            </div>

            <div className="bg-primary/5 rounded-lg p-6">
              <p className="text-sm text-gray-500 mb-3">{t('Büyük Logo', 'Large Logo', 'Logo Grande')}</p>
              <div className="bg-white p-6 rounded-lg shadow-sm flex items-center justify-center">
                <div className="relative w-24 h-24">
                  <SafeImage
                    src={preview}
                    alt="Logo"
                    fill
                    objectFit="contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}