'use client'

import Image from 'next/image'
import { useState, useRef } from 'react'
import { products as initialProducts, categories as initialCategories } from '@/data/products'

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
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [categories, setCategories] = useState<Category[]>(initialCategories)
  const [showModal, setShowModal] = useState(false)
  const [showCategoryModal, setShowCategoryModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [search, setSearch] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [imagePreview, setImagePreview] = useState<string>('')
  const [categoryImagePreview, setCategoryImagePreview] = useState<string>('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const categoryFileInputRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState({
    name: '',
    nameEn: '',
    nameIt: '',
    nameTr: '',
    price: '',
    category: 'produce',
    farm: '',
    farmEn: '',
    farmIt: '',
    farmTr: '',
    image: '',
    inStock: true
  })

  const [categoryFormData, setCategoryFormData] = useState({
    name: '',
    nameEn: '',
    nameIt: '',
    nameTr: '',
    image: ''
  })

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name?.toLowerCase().includes(search.toLowerCase()) || 
                       p.nameEn?.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = filterCategory === 'all' || p.category === filterCategory
    return matchesSearch && matchesCategory
  })

  const handleOpenModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product)
      setImagePreview(product.image)
      setFormData({
        name: product.name,
        nameEn: product.nameEn || '',
        nameIt: product.nameIt || '',
        nameTr: product.nameTr || '',
        price: product.price.toString(),
        category: product.category,
        farm: product.farm,
        farmEn: product.farmEn || '',
        farmIt: product.farmIt || '',
        farmTr: product.farmTr || '',
        image: product.image,
        inStock: product.inStock
      })
    } else {
      setEditingProduct(null)
      setImagePreview('')
      setFormData({ 
        name: '', nameEn: '', nameIt: '', nameTr: '', 
        price: '', category: 'produce', farm: '', 
        farmEn: '', farmIt: '', farmTr: '', 
        image: '', inStock: true 
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
    
    const productData = {
      ...formData,
      price: parseFloat(formData.price) || 0,
      image: formData.image || imagePreview || '/placeholder.png'
    }

    if (editingProduct) {
      setProducts(products.map(p => 
        p.id === editingProduct.id ? { ...p, ...productData } : p
      ))
    } else {
      const newProduct: Product = {
        ...productData,
        id: Date.now(),
      }
      setProducts([...products, newProduct])
    }
    setShowModal(false)
  }

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id))
    }
  }

  const handleOpenCategoryModal = (category?: Category) => {
    if (category) {
      setEditingCategory(category)
      setCategoryImagePreview(category.image)
      setCategoryFormData({
        name: category.name,
        nameEn: category.nameEn,
        nameIt: category.nameIt,
        nameTr: category.nameTr,
        image: category.image
      })
    } else {
      setEditingCategory(null)
      setCategoryImagePreview('')
      setCategoryFormData({
        name: '',
        nameEn: '',
        nameIt: '',
        nameTr: '',
        image: ''
      })
    }
    setShowCategoryModal(true)
  }

  const handleCategoryImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (event) => {
      const result = event.target?.result as string
      setCategoryImagePreview(result)
      setCategoryFormData({ ...categoryFormData, image: result })
    }
    reader.readAsDataURL(file)
  }

  const handleCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const slug = categoryFormData.name.toLowerCase().replace(/\s+/g, '-')
    const categoryData = {
      ...categoryFormData,
      image: categoryFormData.image || categoryImagePreview || 'https://via.placeholder.com/400'
    }

    if (editingCategory) {
      setCategories(categories.map(c => 
        c.slug === editingCategory.slug ? { ...c, ...categoryData } : c
      ))
    } else {
      const newCategory: Category = {
        ...categoryData,
        slug
      }
      setCategories([...categories, newCategory])
    }
    setShowCategoryModal(false)
  }

  const handleDeleteCategory = (slug: string) => {
    if (confirm('Are you sure you want to delete this category?')) {
      setCategories(categories.filter(c => c.slug !== slug))
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="text-gray-600">Manage your product inventory</p>
        </div>
        <button onClick={() => handleOpenModal()} className="btn-primary">
          + Add Product
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Categories</h2>
          <button 
            onClick={() => handleOpenCategoryModal()} 
            className="text-sm px-3 py-1 border rounded-lg hover:bg-gray-50"
          >
            + Add Category
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <div key={cat.slug} className="border rounded-lg p-3 relative group">
              <div className="relative aspect-square mb-2 bg-gray-100 rounded-lg overflow-hidden">
                {cat.image ? (
                  <Image src={cat.image} alt={cat.name} fill className="object-cover" />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400 text-xs">
                    No Image
                  </div>
                )}
              </div>
              <h3 className="font-medium text-sm truncate">{cat.name}</h3>
              <div className="flex gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-3 left-3 right-3">
                <button
                  onClick={() => handleOpenCategoryModal(cat)}
                  className="flex-1 text-xs py-1 bg-gray-100 rounded hover:bg-gray-200"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteCategory(cat.slug)}
                  className="flex-1 text-xs py-1 text-red-600 bg-red-50 rounded hover:bg-red-100"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-lg"
        />
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="all">All Categories</option>
          {categories.map(cat => (
            <option key={cat.slug} value={cat.slug}>{cat.name}</option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {filteredProducts.map((product) => (
            <div key={product.id} className="border rounded-lg p-3">
              <div className="relative aspect-square mb-2 bg-gray-100 rounded-lg overflow-hidden">
                {product.image ? (
                  <Image src={product.image} alt={product.name} fill className="object-cover" />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    No Image
                  </div>
                )}
              </div>
              <h3 className="font-medium text-sm truncate">{product.name}</h3>
              <p className="text-xs text-gray-500">${product.price}</p>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleOpenModal(product)}
                  className="flex-1 text-xs py-1 bg-gray-100 rounded hover:bg-gray-200"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="flex-1 text-xs py-1 text-red-600 bg-red-50 rounded hover:bg-red-100"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4 overflow-y-auto"
          onClick={(e) => e.target === e.currentTarget && setShowModal(false)}
        >
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto my-8">
            <h2 className="text-xl font-bold mb-4">
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium mb-2">Product Image</label>
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
                  <label className="block text-sm font-medium mb-1">Product Name (EN)</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="Product name in English"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Name (TR)</label>
                  <input
                    type="text"
                    value={formData.nameTr}
                    onChange={(e) => setFormData({...formData, nameTr: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="Türkçe isim"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Name (IT)</label>
                  <input
                    type="text"
                    value={formData.nameIt}
                    onChange={(e) => setFormData({...formData, nameIt: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="Nome italiano"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg"
                  >
                    {categories.map(cat => (
                      <option key={cat.slug} value={cat.slug}>{cat.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-3">
                  <label className="block text-sm font-medium mb-1">Farm Name (EN)</label>
                  <input
                    type="text"
                    required
                    value={formData.farm}
                    onChange={(e) => setFormData({...formData, farm: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="Farm name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Farm (TR)</label>
                  <input
                    type="text"
                    value={formData.farmTr}
                    onChange={(e) => setFormData({...formData, farmTr: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Farm (IT)</label>
                  <input
                    type="text"
                    value={formData.farmIt}
                    onChange={(e) => setFormData({...formData, farmIt: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.inStock}
                    onChange={(e) => setFormData({...formData, inStock: e.target.checked})}
                    className="rounded"
                  />
                  <span>In Stock</span>
                </label>
              </div>

              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-2 border rounded-lg">
                  Cancel
                </button>
                <button type="submit" className="flex-1 btn-primary">
                  {editingProduct ? 'Save Changes' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showCategoryModal && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4 overflow-y-auto"
          onClick={(e) => e.target === e.currentTarget && setShowCategoryModal(false)}
        >
          <div className="bg-white rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto my-8">
            <h2 className="text-xl font-bold mb-4">
              {editingCategory ? 'Edit Category' : 'Add New Category'}
            </h2>
            <form onSubmit={handleCategorySubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Category Image</label>
                <div className="flex gap-4 items-start">
                  <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 relative">
                    {categoryImagePreview || categoryFormData.image ? (
                      <Image src={categoryImagePreview || categoryFormData.image} alt="Preview" fill className="object-cover" />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400 text-xs">No Image</div>
                    )}
                  </div>
                  <div className="flex-1">
                    <input
                      type="file"
                      ref={categoryFileInputRef}
                      accept="image/*"
                      onChange={handleCategoryImageUpload}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => categoryFileInputRef.current?.click()}
                      className="w-full py-2 border border-dashed rounded-lg text-sm text-gray-500 hover:bg-gray-50"
                    >
                      Click to upload
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-3">
                  <label className="block text-sm font-medium mb-1">Category Name (EN)</label>
                  <input
                    type="text"
                    required
                    value={categoryFormData.name}
                    onChange={(e) => setCategoryFormData({...categoryFormData, name: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="Category name in English"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Name (TR)</label>
                  <input
                    type="text"
                    value={categoryFormData.nameTr}
                    onChange={(e) => setCategoryFormData({...categoryFormData, nameTr: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="Türkçe isim"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Name (IT)</label>
                  <input
                    type="text"
                    value={categoryFormData.nameIt}
                    onChange={(e) => setCategoryFormData({...categoryFormData, nameIt: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="Nome italiano"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setShowCategoryModal(false)} className="flex-1 py-2 border rounded-lg">
                  Cancel
                </button>
                <button type="submit" className="flex-1 btn-primary">
                  {editingCategory ? 'Save Changes' : 'Add Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}