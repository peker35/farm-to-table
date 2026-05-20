'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import SafeImage from '@/components/SafeImage'
import { compressImage, compressImageToThumbnail } from '@/utils/compressImage'
import { uploadImage, deleteImage } from '@/utils/useImageUpload'
import { api } from '@/lib/api'
import { useLanguageStore } from '@/store/language'
import { useToastStore } from '@/store/toast'
import { t } from '@/data/translations'

interface Category {
  slug: string
  name: string
  nameEn: string
  nameIt: string
  nameTr: string
  image: string
}

interface Product {
  id: number
  name: string
  nameEn?: string
  nameIt?: string
  nameTr?: string
  price: number
  category: string
  farm: string
  farmEn?: string
  farmIt?: string
  farmTr?: string
  image: string
  inStock: boolean
}

export default function AdminProductsPage() {
  const { language } = useLanguageStore()
  const tr = (key: string) => t('admin', key, language)
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [showCategoryModal, setShowCategoryModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [search, setSearch] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [imagePreview, setImagePreview] = useState<string>('')
  const [categoryImagePreview, setCategoryImagePreview] = useState<string>('')
  const [submitting, setSubmitting] = useState(false)
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null)
  const showToast = useToastStore(state => state.show)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const categoryFileInputRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState({
    name: '', nameEn: '', nameIt: '', nameTr: '',
    price: '', category: 'produce',
    farm: '', farmEn: '', farmIt: '', farmTr: '',
    image: '', inStock: true
  })

  const [categoryFormData, setCategoryFormData] = useState({
    name: '', nameEn: '', nameIt: '', nameTr: '', image: ''
  })

  const trField = useCallback((obj: any, field: string): string => {
    const lang = language === 'tr' ? 'Tr' : language === 'it' ? 'It' : 'En'
    return obj[field + lang] || obj[field + 'En'] || obj[field] || ''
  }, [language])

  const transformProduct = useCallback((p: any): Product => {
    return {
      ...p,
      price: parseFloat(p.price),
      name: trField(p, 'name'),
      farm: trField(p, 'farm'),
    }
  }, [trField])

  const transformCategory = useCallback((c: any): Category => {
    return { ...c, name: trField(c, 'name') }
  }, [trField])

  useEffect(() => {
    async function load() {
      try {
        const [prods, cats] = await Promise.all([
          api.products.list(),
          api.categories.list(),
        ])
        setProducts(prods.map(transformProduct))
        setCategories(cats.map(transformCategory))
      } catch (err) {
        console.error('Failed to load data', err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [transformCategory, transformProduct])

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name?.toLowerCase().includes(search.toLowerCase()) ||
      p.nameEn?.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = filterCategory === 'all' || p.category === filterCategory
    return matchesSearch && matchesCategory
  })

  const handleOpenModal = (product?: Product) => {
    setSelectedImageFile(null)
    if (product) {
      setEditingProduct(product)
      setImagePreview(product.image)
      setFormData({
        name: product.nameEn || product.name, nameEn: product.nameEn || '', nameIt: product.nameIt || '', nameTr: product.nameTr || '',
        price: product.price.toString(), category: product.category,
        farm: product.farmEn || product.farm, farmEn: product.farmEn || '', farmIt: product.farmIt || '', farmTr: product.farmTr || '',
        image: product.image, inStock: product.inStock
      })
    } else {
      setEditingProduct(null)
      setImagePreview('')
      setFormData({ name: '', nameEn: '', nameIt: '', nameTr: '', price: '', category: 'produce', farm: '', farmEn: '', farmIt: '', farmTr: '', image: '', inStock: true })
    }
    setShowModal(true)
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setSelectedImageFile(file)
    try {
      const compressed = await compressImageToThumbnail(file)
      setImagePreview(compressed)
      setFormData({ ...formData, image: compressed })
    } catch {
      const reader = new FileReader()
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string)
        setFormData({ ...formData, image: event.target?.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (submitting) return
    setSubmitting(true)

    let finalImage = editingProduct ? (formData.image || '/placeholder.svg') : '/placeholder.svg'
    if (selectedImageFile) {
      try {
        const compressed = await compressImageToThumbnail(selectedImageFile)
        const blob = await (await fetch(compressed)).blob()
        finalImage = await uploadImage(new File([blob], 'product.jpg', { type: 'image/jpeg' }))
      } catch {
        try {
          finalImage = await uploadImage(selectedImageFile)
        } catch {
          showToast(language === 'tr' ? 'Resim yüklenemedi, placeholder kullanılacak' : language === 'it' ? 'Immagine non caricata, verrà usato un placeholder' : 'Image upload failed, placeholder will be used', 'warning')
        }
      }
    }

    const data = {
      nameEn: formData.nameEn || formData.name,
      nameIt: formData.nameIt || formData.name,
      nameTr: formData.nameTr || formData.name,
      price: parseFloat(formData.price) || 0,
      category: formData.category,
      farmEn: formData.farmEn || formData.farm,
      farmIt: formData.farmIt || formData.farm,
      farmTr: formData.farmTr || formData.farm,
      image: finalImage,
      inStock: formData.inStock,
    }
    try {
      if (editingProduct) {
        const updated = await api.products.update(editingProduct.id, data)
        setProducts(prev => prev.map(p => p.id === editingProduct!.id ? transformProduct(updated) : p))
      } else {
        const created = await api.products.create(data)
        setProducts(prev => [...prev, transformProduct(created)])
      }
      setShowModal(false)
      showToast(editingProduct ? (language === 'tr' ? 'Ürün güncellendi' : language === 'it' ? 'Prodotto aggiornato' : 'Product updated') : (language === 'tr' ? 'Ürün eklendi' : language === 'it' ? 'Prodotto aggiunto' : 'Product added'), 'success')
    } catch (err) {
      console.error('Failed to save product', err)
      const msg = err instanceof Error ? err.message : String(err)
      showToast(language === 'tr' ? 'Hata: ' + msg : language === 'it' ? 'Errore: ' + msg : 'Error: ' + msg, 'error')
    }
    setSubmitting(false)
  }

  const handleDelete = async (id: number) => {
    if (confirm(tr('confirmDelete'))) {
      try {
        await api.products.delete(id)
        setProducts(products.filter(p => p.id !== id))
      } catch (err) {
        console.error('Failed to delete product', err)
      }
    }
  }

  const handleOpenCategoryModal = (category?: Category) => {
    if (category) {
      setEditingCategory(category)
      setCategoryImagePreview(category.image)
      setCategoryFormData({ name: category.nameEn || category.name, nameEn: category.nameEn || '', nameIt: category.nameIt || '', nameTr: category.nameTr || '', image: category.image })
    } else {
      setEditingCategory(null)
      setCategoryImagePreview('')
      setCategoryFormData({ name: '', nameEn: '', nameIt: '', nameTr: '', image: '' })
    }
    setShowCategoryModal(true)
  }

  const handleCategoryImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      const compressed = await compressImage(file, { maxWidth: 400, maxHeight: 400, quality: 0.7 })
      const url = await uploadImage(new File([compressed], 'category.jpg', { type: 'image/jpeg' }))
      setCategoryImagePreview(url)
      setCategoryFormData({ ...categoryFormData, image: url })
    } catch {
      const reader = new FileReader()
      reader.onload = (event) => {
        const result = event.target?.result as string
        setCategoryImagePreview(result)
        setCategoryFormData({ ...categoryFormData, image: result })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (submitting) return
    setSubmitting(true)
    const slug = (categoryFormData.nameEn || categoryFormData.name).toLowerCase().replace(/\s+/g, '-')
    const data = {
      slug,
      nameEn: categoryFormData.nameEn || categoryFormData.name,
      nameIt: categoryFormData.nameIt || categoryFormData.name,
      nameTr: categoryFormData.nameTr || categoryFormData.name,
      image: categoryFormData.image || categoryImagePreview || 'https://via.placeholder.com/400',
    }
    try {
      if (editingCategory) {
        const updated = await api.categories.update(editingCategory.slug, data)
        setCategories(categories.map(c => c.slug === editingCategory.slug ? updated : c))
      } else {
        const created = await api.categories.create(data)
        setCategories([...categories, created])
      }
      setShowCategoryModal(false)
      showToast(editingCategory ? (language === 'tr' ? 'Kategori güncellendi' : language === 'it' ? 'Categoria aggiornata' : 'Category updated') : (language === 'tr' ? 'Kategori eklendi' : language === 'it' ? 'Categoria aggiunta' : 'Category added'), 'success')
    } catch (err) {
      console.error('Failed to save category', err)
      showToast(language === 'tr' ? 'Hata: ' + (err as Error).message : language === 'it' ? 'Errore: ' + (err as Error).message : 'Error: ' + (err as Error).message, 'error')
    }
    setSubmitting(false)
  }

  const handleDeleteCategory = async (slug: string) => {
    if (confirm('Are you sure you want to delete this category?')) {
      try {
        await api.categories.delete(slug)
        setCategories(categories.filter(c => c.slug !== slug))
      } catch (err) {
        console.error('Failed to delete category', err)
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
          <h1 className="text-2xl font-bold">{tr('products')}</h1>
          <p className="text-gray-600">{tr('manageProducts')}</p>
        </div>
        <button onClick={() => handleOpenModal()} className="btn-primary">{tr('addNew')}</button>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">{language === 'tr' ? 'Kategoriler' : language === 'it' ? 'Categorie' : 'Categories'}</h2>
          <button onClick={() => handleOpenCategoryModal()} className="text-sm px-3 py-1 border rounded-lg hover:bg-gray-50">{language === 'tr' ? '+ Kategori Ekle' : language === 'it' ? '+ Aggiungi Categoria' : '+ Add Category'}</button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <div key={cat.slug} className="border rounded-lg p-3 relative group">
              <div className="relative aspect-square mb-2 bg-gray-100 rounded-lg overflow-hidden">
                <SafeImage src={cat.image} alt={cat.name} fill />
              </div>
              <h3 className="font-medium text-sm truncate">{cat.name}</h3>
              <div className="flex gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-3 left-3 right-3">
                <button onClick={() => handleOpenCategoryModal(cat)} className="flex-1 text-xs py-1 bg-gray-100 rounded hover:bg-gray-200">{tr('edit')}</button>
                <button onClick={() => handleDeleteCategory(cat.slug)} className="flex-1 text-xs py-1 text-red-600 bg-red-50 rounded hover:bg-red-100">{tr('delete')}</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <input type="text" placeholder={tr('search')} value={search} onChange={(e) => setSearch(e.target.value)} className="flex-1 px-4 py-2 border rounded-lg" />
        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="px-4 py-2 border rounded-lg">
          <option value="all">{language === 'tr' ? 'Tüm Kategoriler' : language === 'it' ? 'Tutte le Categorie' : 'All Categories'}</option>
          {categories.map(cat => (<option key={cat.slug} value={cat.slug}>{cat.name}</option>))}
        </select>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {filteredProducts.map((product) => (
            <div key={product.id} className="border rounded-lg p-3">
              <div className="relative aspect-square mb-2 bg-gray-100 rounded-lg overflow-hidden">
                <SafeImage src={product.image} alt={product.name} fill />
              </div>
              <h3 className="font-medium text-sm truncate">{product.name}</h3>
              <p className="text-xs text-gray-500">${product.price}</p>
              <div className="flex gap-2 mt-2">
                <button onClick={() => handleOpenModal(product)} className="flex-1 text-xs py-1 bg-gray-100 rounded hover:bg-gray-200">{tr('edit')}</button>
                <button onClick={() => handleDelete(product.id)} className="flex-1 text-xs py-1 text-red-600 bg-red-50 rounded hover:bg-red-100">{tr('delete')}</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4 overflow-y-auto" onClick={(e) => e.target === e.currentTarget && setShowModal(false)}>
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto my-8">
            <h2 className="text-xl font-bold mb-4">{editingProduct ? tr('editProduct') : tr('addProduct')}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Product Image</label>
                <div className="flex gap-4 items-start">
                  <div className="w-32 h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 relative">
                    <SafeImage src={imagePreview || formData.image} alt="Preview" fill />
                  </div>
                  <div className="flex-1">
                    <input type="file" ref={fileInputRef} accept="image/*" onChange={handleImageUpload} className="hidden" />
                    <button type="button" onClick={() => fileInputRef.current?.click()} className="w-full py-2 border border-dashed rounded-lg text-sm text-gray-500 hover:bg-gray-50">Click to upload image</button>
                    <p className="text-xs text-gray-400 mt-1">Supports: JPG, PNG, WebP</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-3">
                  <label className="block text-sm font-medium mb-1">Product Name (EN)</label>
                  <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2 border rounded-lg" placeholder="Product name in English" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Name (TR)</label>
                  <input type="text" value={formData.nameTr} onChange={(e) => setFormData({...formData, nameTr: e.target.value})} className="w-full px-4 py-2 border rounded-lg" placeholder="Türkçe isim" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Name (IT)</label>
                  <input type="text" value={formData.nameIt} onChange={(e) => setFormData({...formData, nameIt: e.target.value})} className="w-full px-4 py-2 border rounded-lg" placeholder="Nome italiano" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Price ($)</label>
                  <input type="number" step="0.01" required value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full px-4 py-2 border rounded-lg">
                    {categories.map(cat => (<option key={cat.slug} value={cat.slug}>{cat.name}</option>))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-3">
                  <label className="block text-sm font-medium mb-1">Farm Name (EN)</label>
                  <input type="text" required value={formData.farm} onChange={(e) => setFormData({...formData, farm: e.target.value})} className="w-full px-4 py-2 border rounded-lg" placeholder="Farm name" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Farm (TR)</label>
                  <input type="text" value={formData.farmTr} onChange={(e) => setFormData({...formData, farmTr: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Farm (IT)</label>
                  <input type="text" value={formData.farmIt} onChange={(e) => setFormData({...formData, farmIt: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={formData.inStock} onChange={(e) => setFormData({...formData, inStock: e.target.checked})} className="rounded" />
                  <span>{tr('inStock')}</span>
                </label>
              </div>

              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-2 border rounded-lg">{tr('cancel')}</button>
                <button type="submit" disabled={submitting} className="flex-1 btn-primary disabled:opacity-50">{submitting ? (language === 'tr' ? 'Kaydediliyor...' : language === 'it' ? 'Salvataggio...' : 'Saving...') : (editingProduct ? tr('save') : tr('addProduct'))}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showCategoryModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4 overflow-y-auto" onClick={(e) => e.target === e.currentTarget && setShowCategoryModal(false)}>
          <div className="bg-white rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto my-8">
            <h2 className="text-xl font-bold mb-4">{editingCategory ? tr('editCategory') : tr('addCategory')}</h2>
            <form onSubmit={handleCategorySubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Category Image</label>
                <div className="flex gap-4 items-start">
                  <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 relative">
                    <SafeImage src={categoryImagePreview || categoryFormData.image} alt="Preview" fill />
                  </div>
                  <div className="flex-1">
                    <input type="file" ref={categoryFileInputRef} accept="image/*" onChange={handleCategoryImageUpload} className="hidden" />
                    <button type="button" onClick={() => categoryFileInputRef.current?.click()} className="w-full py-2 border border-dashed rounded-lg text-sm text-gray-500 hover:bg-gray-50">Click to upload</button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-3">
                  <label className="block text-sm font-medium mb-1">Category Name (EN)</label>
                  <input type="text" required value={categoryFormData.name} onChange={(e) => setCategoryFormData({...categoryFormData, name: e.target.value})} className="w-full px-4 py-2 border rounded-lg" placeholder="Category name in English" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Name (TR)</label>
                  <input type="text" value={categoryFormData.nameTr} onChange={(e) => setCategoryFormData({...categoryFormData, nameTr: e.target.value})} className="w-full px-4 py-2 border rounded-lg" placeholder="Türkçe isim" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Name (IT)</label>
                  <input type="text" value={categoryFormData.nameIt} onChange={(e) => setCategoryFormData({...categoryFormData, nameIt: e.target.value})} className="w-full px-4 py-2 border rounded-lg" placeholder="Nome italiano" />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setShowCategoryModal(false)} className="flex-1 py-2 border rounded-lg">{tr('cancel')}</button>
                <button type="submit" className="flex-1 btn-primary">{editingCategory ? tr('save') : tr('addCategory')}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
