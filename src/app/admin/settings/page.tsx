'use client'

import { useState, useRef } from 'react'
import { useSettingsStore } from '@/store/settings'
import { useLanguageStore } from '@/store/language'
import { useToastStore } from '@/store/toast'
import { brandNames } from '@/data/translations'
import SafeImage from '@/components/SafeImage'
import { compressImage } from '@/utils/compressImage'
import { uploadImage } from '@/utils/useImageUpload'

export default function AdminSettingsPage() {
  const { logoUrl, brandName: savedBrand, setLogoUrl, setBrandName, resetLogo } = useSettingsStore()
  const { language } = useLanguageStore()
  const showToast = useToastStore(state => state.show)
  const [preview, setPreview] = useState(logoUrl)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [brandEn, setBrandEn] = useState(savedBrand.en || '')
  const [brandIt, setBrandIt] = useState(savedBrand.it || '')
  const [brandTr, setBrandTr] = useState(savedBrand.tr || '')

  const t = (tr: string, en: string, it: string) =>
    language === 'tr' ? tr : language === 'it' ? it : en

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      const compressed = await compressImage(file, { maxWidth: 200, maxHeight: 200, quality: 0.9 })
      const url = await uploadImage(new File([compressed], 'logo.jpg', { type: 'image/jpeg' }))
      setPreview(url)
      setLogoUrl(url)
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

  const handleBrandSave = () => {
    setBrandName({ en: brandEn, it: brandIt, tr: brandTr })
    showToast(
      t('Marka adı kaydedildi!', 'Brand name saved!', 'Nome del marchio salvato!'),
      'success'
    )
  }

  const handleBrandReset = () => {
    setBrandEn('')
    setBrandIt('')
    setBrandTr('')
    setBrandName({ en: '', it: '', tr: '' })
    showToast(
      t('Varsayılana dönüldü!', 'Reset to default!', 'Ripristinato!'),
      'info'
    )
  }

  const previewBrand = {
    en: brandEn || brandNames.en.full,
    it: brandIt || brandNames.it.full,
    tr: brandTr || brandNames.tr.full,
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

        {/* Brand Name Settings */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-bold mb-4">{t('Marka Adı', 'Brand Name', 'Nome Marchio')}</h2>
          <p className="text-sm text-gray-500 mb-4">
            {t('Logonun yanında görünen site adını değiştirin.', 'Change the site name shown next to the logo.', 'Modifica il nome del sito visualizzato accanto al logo.')}
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">English</label>
              <input type="text" value={brandEn} onChange={(e) => setBrandEn(e.target.value)} placeholder={brandNames.en.full} className="w-full px-4 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Italiano</label>
              <input type="text" value={brandIt} onChange={(e) => setBrandIt(e.target.value)} placeholder={brandNames.it.full} className="w-full px-4 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Türkçe</label>
              <input type="text" value={brandTr} onChange={(e) => setBrandTr(e.target.value)} placeholder={brandNames.tr.full} className="w-full px-4 py-2 border rounded-lg" />
            </div>

            <div className="flex gap-2 pt-2">
              <button onClick={handleBrandSave} className="flex-1 btn-primary">
                {t('Kaydet', 'Save', 'Salva')}
              </button>
              <button onClick={handleBrandReset} className="px-4 py-2 border rounded-lg text-sm text-red-600 hover:bg-red-50">
                {t('Sıfırla', 'Reset', 'Ripristina')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Section */}
      <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-bold mb-4">{t('Önizleme', 'Preview', 'Anteprima')}</h2>
        
        <div className="space-y-6">
          <div className="bg-primary/5 rounded-lg p-6">
            <p className="text-sm text-gray-500 mb-3">{t('Header Görünümü', 'Header Preview', 'Anteprima Header')}</p>
            <div className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm">
              <div className="relative w-10 h-10 flex-shrink-0">
                <SafeImage
                  src={preview}
                  alt="Logo"
                  fill
                  objectFit="contain"
                />
              </div>
              <span className="font-bold text-lg">{previewBrand.en}</span>
            </div>
            <div className="mt-2 flex gap-2 text-xs text-gray-400">
              <span>IT: {previewBrand.it}</span>
              <span>TR: {previewBrand.tr}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}