'use client'

import Image from 'next/image'
import { useState, useRef } from 'react'
import { useEventsStore, Event } from '@/store/events'
import { useLanguageStore } from '@/store/language'

export default function AdminEventsPage() {
  const { events, addEvent, updateEvent, deleteEvent } = useEventsStore()
  const { language } = useLanguageStore()
  const [showModal, setShowModal] = useState(false)
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)
  const [imagePreview, setImagePreview] = useState<string>('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState({
    title: '',
    titleEn: '',
    titleIt: '',
    description: '',
    descriptionEn: '',
    descriptionIt: '',
    date: '',
    time: '',
    location: '',
    price: '',
    image: ''
  })

  const handleOpenModal = (event?: Event) => {
    if (event) {
      setEditingEvent(event)
      setImagePreview(event.image)
      setFormData({
        title: event.title,
        titleEn: event.titleEn,
        titleIt: event.titleIt,
        description: event.description,
        descriptionEn: event.descriptionEn,
        descriptionIt: event.descriptionIt,
        date: event.date,
        time: event.time,
        location: event.location,
        price: event.price?.toString() || '',
        image: event.image
      })
    } else {
      setEditingEvent(null)
      setImagePreview('')
      setFormData({
        title: '', titleEn: '', titleIt: '',
        description: '', descriptionEn: '', descriptionIt: '',
        date: '', time: '', location: '',
        price: '', image: ''
      })
    }
    setShowModal(true)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const result = event.target?.result as string
      setImagePreview(result)
      setFormData({ ...formData, image: result })
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const eventData = {
      ...formData,
      price: formData.price ? parseFloat(formData.price) : null,
      image: formData.image || imagePreview || '/placeholder.png'
    }

    if (editingEvent) {
      updateEvent(editingEvent.id, eventData)
    } else {
      addEvent(eventData as any)
    }
    setShowModal(false)
  }

  const handleDelete = (id: string) => {
    if (confirm(language === 'tr' ? 'Silmek istediğinize emin misiniz?' : 
                language === 'it' ? 'Sei sicuro di voler eliminare?' : 
                'Are you sure you want to delete?')) {
      deleteEvent(id)
    }
  }

  const getTitle = (event: Event) => {
    if (language === 'tr') return event.title
    if (language === 'it') return event.titleIt
    return event.titleEn
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">
            {language === 'tr' ? 'Etkinlikler' : language === 'it' ? 'Eventi' : 'Events'}
          </h1>
          <p className="text-gray-600">
            {language === 'tr' ? 'Etkinlikleri yönet' : language === 'it' ? 'Gestisci gli eventi' : 'Manage events'}
          </p>
        </div>
        <button onClick={() => handleOpenModal()} className="btn-primary">
          + {language === 'tr' ? 'Etkinlik Ekle' : language === 'it' ? 'Aggiungi Evento' : 'Add Event'}
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event.id} className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="relative h-40">
              <Image
                src={event.image}
                alt={getTitle(event)}
                fill
                className="object-cover"
              />
              <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-lg font-bold text-sm">
                ${event.price || 'Free'}
              </div>
            </div>
            <div className="p-4">
              <p className="text-sm text-primary font-medium">
                {new Date(event.date).toLocaleDateString()} • {event.time}
              </p>
              <h3 className="font-bold text-lg mb-1">{getTitle(event)}</h3>
              <p className="text-sm text-gray-500 mb-3">{event.location}</p>
              
              <div className="flex gap-2">
                <button
                  onClick={() => handleOpenModal(event)}
                  className="flex-1 text-sm py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  {language === 'tr' ? 'Düzenle' : language === 'it' ? 'Modifica' : 'Edit'}
                </button>
                <button
                  onClick={() => handleDelete(event.id)}
                  className="flex-1 text-sm py-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100"
                >
                  {language === 'tr' ? 'Sil' : language === 'it' ? 'Elimina' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4 overflow-y-auto"
          onClick={(e) => e.target === e.currentTarget && setShowModal(false)}
        >
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto my-8">
            <h2 className="text-xl font-bold mb-4">
              {editingEvent 
                ? (language === 'tr' ? 'Etkinlik Düzenle' : language === 'it' ? 'Modifica Evento' : 'Edit Event')
                : (language === 'tr' ? 'Yeni Etkinlik' : language === 'it' ? 'Nuovo Evento' : 'New Event')
              }
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium mb-2">Event Image</label>
                <div className="flex gap-4 items-start">
                  <div className="w-32 h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 relative">
                    {imagePreview || formData.image ? (
                      <Image src={imagePreview || formData.image} alt="Preview" fill className="object-cover" />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400 text-xs">No Image</div>
                    )}
                  </div>
                  <div className="flex-1">
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full py-2 border border-dashed rounded-lg text-sm text-gray-500 hover:bg-gray-50"
                    >
                      Click to upload image
                    </button>
                    <p className="text-xs text-gray-400 mt-1">
                      Supports: JPG, PNG, WebP
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-3">
                  <label className="block text-sm font-medium mb-1">Title (EN) *</label>
                  <input
                    type="text"
                    required
                    value={formData.titleEn}
                    onChange={(e) => setFormData({...formData, titleEn: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Title (TR)</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Title (IT)</label>
                  <input
                    type="text"
                    value={formData.titleIt}
                    onChange={(e) => setFormData({...formData, titleIt: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-3">
                  <label className="block text-sm font-medium mb-1">Description (EN)</label>
                  <textarea
                    value={formData.descriptionEn}
                    onChange={(e) => setFormData({...formData, descriptionEn: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg"
                    rows={2}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Description (TR)</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg"
                    rows={2}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Description (IT)</label>
                  <textarea
                    value={formData.descriptionIt}
                    onChange={(e) => setFormData({...formData, descriptionIt: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg"
                    rows={2}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Time *</label>
                  <input
                    type="time"
                    required
                    value={formData.time}
                    onChange={(e) => setFormData({...formData, time: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Location *</label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="Leave empty for free"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-2 border rounded-lg">
                  {language === 'tr' ? 'İptal' : language === 'it' ? 'Annulla' : 'Cancel'}
                </button>
                <button type="submit" className="flex-1 btn-primary">
                  {editingEvent 
                    ? (language === 'tr' ? 'Kaydet' : language === 'it' ? 'Salva' : 'Save')
                    : (language === 'tr' ? 'Ekle' : language === 'it' ? 'Aggiungi' : 'Add')
                  }
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}