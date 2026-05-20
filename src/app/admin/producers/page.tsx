'use client'

import { useState, useRef, useEffect } from 'react'
import SafeImage from '@/components/SafeImage'
import { compressImage } from '@/utils/compressImage'
import { uploadImage, deleteImage } from '@/utils/useImageUpload'
import { api } from '@/lib/api'
import { useLanguageStore } from '@/store/language'

interface Farm {
  id: number
  name: string
  nameEn?: string
  nameIt?: string
  nameTr?: string
  location: string
  locationEn?: string
  locationIt?: string
  locationTr?: string
  description: string
  descriptionEn?: string
  descriptionIt?: string
  descriptionTr?: string
  image: string
}

export default function AdminProducersPage() {
  const { language } = useLanguageStore()
  const tr = (key: string) => {
    const translations: Record<string, { en: string; it: string; tr: string }> = {
      producers: { en: 'Producers', it: 'Produttori', tr: 'Üreticiler' },
      manageProducers: { en: 'Manage your producers', it: 'Gestisci i tuoi produttori', tr: 'Üreticilerinizi yönetin' },
      addNew: { en: '+ Add Producer', it: '+ Aggiungi Produttore', tr: '+ Üretici Ekle' },
      edit: { en: 'Edit', it: 'Modifica', tr: 'Düzenle' },
      delete: { en: 'Delete', it: 'Elimina', tr: 'Sil' },
      cancel: { en: 'Cancel', it: 'Annulla', tr: 'İptal' },
      save: { en: 'Save Changes', it: 'Salva Modifiche', tr: 'Değişiklikleri Kaydet' },
      addProducer: { en: 'Add Producer', it: 'Aggiungi Produttore', tr: 'Üretici Ekle' },
      editProducer: { en: 'Edit Producer', it: 'Modifica Produttore', tr: 'Üretici Düzenle' },
    }
    return translations[key]?.[language as keyof typeof translations['producers']] || key
  }
  const [farms, setFarms] = useState<Farm[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingFarm, setEditingFarm] = useState<Farm | null>(null)
  const [imagePreview, setImagePreview] = useState<string>('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState({
    name: '', nameEn: '', nameIt: '', nameTr: '',
    location: '', locationEn: '', locationIt: '', locationTr: '',
    description: '', descriptionEn: '', descriptionIt: '', descriptionTr: '',
    image: ''
  })

  useEffect(() => {
    api.farms.list().then(data => {
      setFarms(data.map(transformFarm))
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  function trField(f: any, field: string): string {
    const lang = language === 'tr' ? 'Tr' : language === 'it' ? 'It' : 'En'
    return f[field + lang] || f[field + 'En'] || f[field] || ''
  }
  function transformFarm(f: any): Farm {
    return {
      ...f,
      name: trField(f, 'name'),
      location: trField(f, 'location'),
      description: trField(f, 'description'),
    }
  }

  const handleOpenModal = (farm?: Farm) => {
    if (farm) {
      setEditingFarm(farm)
      setImagePreview(farm.image)
      setFormData({
        name: farm.name, nameEn: farm.nameEn || '', nameIt: farm.nameIt || '', nameTr: farm.nameTr || '',
        location: farm.location, locationEn: farm.locationEn || '', locationIt: farm.locationIt || '', locationTr: farm.locationTr || '',
        description: farm.description, descriptionEn: farm.descriptionEn || '', descriptionIt: farm.descriptionIt || '', descriptionTr: farm.descriptionTr || '',
        image: farm.image
      })
    } else {
      setEditingFarm(null)
      setImagePreview('')
      setFormData({ name: '', nameEn: '', nameIt: '', nameTr: '', location: '', locationEn: '', locationIt: '', locationTr: '', description: '', descriptionEn: '', descriptionIt: '', descriptionTr: '', image: '' })
    }
    setShowModal(true)
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      const compressed = await compressImage(file, { maxWidth: 600, maxHeight: 600, quality: 0.8 })
      const url = await uploadImage(new File([compressed], 'producer.jpg', { type: 'image/jpeg' }))
      setImagePreview(url)
      setFormData({ ...formData, image: url })
    } catch {
      const reader = new FileReader()
      reader.onload = (event) => {
        const result = event.target?.result as string
        setImagePreview(result)
        setFormData({ ...formData, image: result })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const data = {
      nameEn: formData.nameEn || formData.name,
      nameIt: formData.nameIt || formData.name,
      nameTr: formData.nameTr || formData.name,
      locationEn: formData.locationEn || formData.location,
      locationIt: formData.locationIt || formData.location,
      locationTr: formData.locationTr || formData.location,
      descriptionEn: formData.descriptionEn || formData.description,
      descriptionIt: formData.descriptionIt || formData.description,
      descriptionTr: formData.descriptionTr || formData.description,
      image: formData.image || imagePreview || 'https://via.placeholder.com/400',
    }
    try {
      if (editingFarm) {
        const updated = await api.farms.update(editingFarm.id, data)
        setFarms(farms.map(f => f.id === editingFarm.id ? transformFarm(updated) : f))
      } else {
        const created = await api.farms.create(data)
        setFarms([...farms, transformFarm(created)])
      }
    } catch (err) {
      console.error('Failed to save producer', err)
    }
    setShowModal(false)
  }

  const handleDelete = async (id: number) => {
    if (confirm(language === 'tr' ? 'Bu üreticiyi silmek istediğinize emin misiniz?' : language === 'it' ? 'Sei sicuro di voler eliminare questo produttore?' : 'Are you sure you want to delete this producer?')) {
      try {
        await api.farms.delete(id)
        setFarms(farms.filter(f => f.id !== id))
      } catch (err) {
        console.error('Failed to delete producer', err)
      }
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64"><div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" /></div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">{tr('producers')}</h1>
          <p className="text-gray-600">{tr('manageProducers')}</p>
        </div>
        <button onClick={() => handleOpenModal()} className="btn-primary">{tr('addNew')}</button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {farms.map((farm) => (
          <div key={farm.id} className="bg-white rounded-xl overflow-hidden shadow-sm">
            <div className="relative h-48">
              <SafeImage src={farm.image} alt={farm.name} fill />
            </div>
            <div className="p-4">
              <h3 className="font-bold mb-1">{farm.name}</h3>
              <p className="text-primary text-sm mb-2">{farm.location}</p>
              <p className="text-gray-600 text-sm line-clamp-2">{farm.description}</p>
              <div className="flex gap-2 mt-4">
                <button onClick={() => handleOpenModal(farm)} className="flex-1 text-sm py-2 bg-gray-100 rounded-lg hover:bg-gray-200">{tr('edit')}</button>
                <button onClick={() => handleDelete(farm.id)} className="flex-1 text-sm py-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100">{tr('delete')}</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4 overflow-y-auto" onClick={(e) => e.target === e.currentTarget && setShowModal(false)}>
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto my-8">
            <h2 className="text-xl font-bold mb-4">{editingFarm ? tr('editProducer') : tr('addProducer')}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Producer Image</label>
                <div className="flex gap-4 items-start">
                  <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 relative">
                    <SafeImage src={imagePreview || formData.image} alt="Preview" fill />
                  </div>
                  <div className="flex-1">
                    <input type="file" ref={fileInputRef} accept="image/*" onChange={handleImageUpload} className="hidden" />
                    <button type="button" onClick={() => fileInputRef.current?.click()} className="w-full py-2 border border-dashed rounded-lg text-sm text-gray-500 hover:bg-gray-50">Click to upload</button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-3">
                  <label className="block text-sm font-medium mb-1">Producer Name (EN)</label>
                  <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2 border rounded-lg" placeholder="Farm name" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Name (TR)</label>
                  <input type="text" value={formData.nameTr} onChange={(e) => setFormData({...formData, nameTr: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Name (IT)</label>
                  <input type="text" value={formData.nameIt} onChange={(e) => setFormData({...formData, nameIt: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-3">
                  <label className="block text-sm font-medium mb-1">Location (EN)</label>
                  <input type="text" required value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} className="w-full px-4 py-2 border rounded-lg" placeholder="City, State" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Location (TR)</label>
                  <input type="text" value={formData.locationTr} onChange={(e) => setFormData({...formData, locationTr: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Location (IT)</label>
                  <input type="text" value={formData.locationIt} onChange={(e) => setFormData({...formData, locationIt: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-3">
                  <label className="block text-sm font-medium mb-1">Description (EN)</label>
                  <textarea required value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full px-4 py-2 border rounded-lg" rows={3} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Description (TR)</label>
                  <textarea value={formData.descriptionTr} onChange={(e) => setFormData({...formData, descriptionTr: e.target.value})} className="w-full px-4 py-2 border rounded-lg" rows={3} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Description (IT)</label>
                  <textarea value={formData.descriptionIt} onChange={(e) => setFormData({...formData, descriptionIt: e.target.value})} className="w-full px-4 py-2 border rounded-lg" rows={3} />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-2 border rounded-lg">{tr('cancel')}</button>
                <button type="submit" className="flex-1 btn-primary">{editingFarm ? tr('save') : tr('addProducer')}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
