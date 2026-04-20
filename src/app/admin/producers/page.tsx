'use client'

import Image from 'next/image'
import { useState, useRef } from 'react'
import { farms as initialFarms } from '@/data/products'

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
  const [farms, setFarms] = useState<Farm[]>(initialFarms)
  const [showModal, setShowModal] = useState(false)
  const [editingFarm, setEditingFarm] = useState<Farm | null>(null)
  const [imagePreview, setImagePreview] = useState<string>('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState({
    name: '',
    nameEn: '',
    nameIt: '',
    nameTr: '',
    location: '',
    locationEn: '',
    locationIt: '',
    locationTr: '',
    description: '',
    descriptionEn: '',
    descriptionIt: '',
    descriptionTr: '',
    image: ''
  })

  const handleOpenModal = (farm?: Farm) => {
    if (farm) {
      setEditingFarm(farm)
      setImagePreview(farm.image)
      setFormData({
        name: farm.name,
        nameEn: farm.nameEn || '',
        nameIt: farm.nameIt || '',
        nameTr: farm.nameTr || '',
        location: farm.location,
        locationEn: farm.locationEn || '',
        locationIt: farm.locationIt || '',
        locationTr: farm.locationTr || '',
        description: farm.description,
        descriptionEn: farm.descriptionEn || '',
        descriptionIt: farm.descriptionIt || '',
        descriptionTr: farm.descriptionTr || '',
        image: farm.image
      })
    } else {
      setEditingFarm(null)
      setImagePreview('')
      setFormData({
        name: '', nameEn: '', nameIt: '', nameTr: '',
        location: '', locationEn: '', locationIt: '', locationTr: '',
        description: '', descriptionEn: '', descriptionIt: '', descriptionTr: '',
        image: ''
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
    const farmData = {
      ...formData,
      image: formData.image || imagePreview || 'https://via.placeholder.com/400'
    }

    if (editingFarm) {
      setFarms(farms.map(f => f.id === editingFarm.id ? { ...f, ...farmData } : f))
    } else {
      const newFarm: Farm = {
        ...farmData,
        id: Date.now(),
      }
      setFarms([...farms, newFarm])
    }
    setShowModal(false)
  }

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this producer?')) {
      setFarms(farms.filter(f => f.id !== id))
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Producers</h1>
          <p className="text-gray-600">Manage your producers and farms</p>
        </div>
        <button onClick={() => handleOpenModal()} className="btn-primary">
          + Add Producer
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {farms.map((farm) => (
          <div key={farm.id} className="bg-white rounded-xl overflow-hidden shadow-sm">
            <div className="relative h-48">
              <Image
                src={farm.image}
                alt={farm.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-bold mb-1">{farm.name}</h3>
              <p className="text-primary text-sm mb-2">{farm.location}</p>
              <p className="text-gray-600 text-sm line-clamp-2">{farm.description}</p>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => handleOpenModal(farm)}
                  className="flex-1 text-sm py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(farm.id)}
                  className="flex-1 text-sm py-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100"
                >
                  Delete
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
              {editingFarm ? 'Edit Producer' : 'Add New Producer'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Producer Image</label>
                <div className="flex gap-4 items-start">
                  <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 relative">
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
                      Click to upload
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-3">
                  <label className="block text-sm font-medium mb-1">Producer Name (EN)</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="Farm name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Name (TR)</label>
                  <input
                    type="text"
                    value={formData.nameTr}
                    onChange={(e) => setFormData({...formData, nameTr: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Name (IT)</label>
                  <input
                    type="text"
                    value={formData.nameIt}
                    onChange={(e) => setFormData({...formData, nameIt: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-3">
                  <label className="block text-sm font-medium mb-1">Location (EN)</label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="City, State"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Location (TR)</label>
                  <input
                    type="text"
                    value={formData.locationTr}
                    onChange={(e) => setFormData({...formData, locationTr: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Location (IT)</label>
                  <input
                    type="text"
                    value={formData.locationIt}
                    onChange={(e) => setFormData({...formData, locationIt: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-3">
                  <label className="block text-sm font-medium mb-1">Description (EN)</label>
                  <textarea
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Description (TR)</label>
                  <textarea
                    value={formData.descriptionTr}
                    onChange={(e) => setFormData({...formData, descriptionTr: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Description (IT)</label>
                  <textarea
                    value={formData.descriptionIt}
                    onChange={(e) => setFormData({...formData, descriptionIt: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg"
                    rows={3}
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-2 border rounded-lg">
                  Cancel
                </button>
                <button type="submit" className="flex-1 btn-primary">
                  {editingFarm ? 'Save Changes' : 'Add Producer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}