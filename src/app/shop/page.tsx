'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useLanguageStore } from '@/store/language'
import { api } from '@/lib/api'

function getName(item: any, lang: string, field: string) {
  if (lang === 'tr' && item[field + 'Tr']) return item[field + 'Tr']
  if (lang === 'it' && item[field + 'It']) return item[field + 'It']
  return item[field + 'En'] || item[field] || ''
}

export default function ShopPage() {
  const [products, setProducts] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [sortBy, setSortBy] = useState('name')
  const { language } = useLanguageStore()

  useEffect(() => {
    Promise.all([api.products.list(), api.categories.list()]).then(([prods, cats]) => {
      setProducts(prods.map((p: any) => ({ ...p, price: parseFloat(p.price) })))
      setCategories(cats)
    })
  }, [])

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter((p: any) => p.category === selectedCategory)

  const sortedProducts = [...filteredProducts].sort((a: any, b: any) => {
    if (sortBy === 'price-low') return a.price - b.price
    if (sortBy === 'price-high') return b.price - a.price
    return getName(a, language, 'name').localeCompare(getName(b, language, 'name'))
  })

  return (
    <div className="pt-20">
      <section className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">{language === 'tr' ? 'Tüm Ürünler' : language === 'it' ? 'Tutti i Prodotti' : 'All Products'}</h1>
          <p className="text-xl opacity-90">{language === 'tr' ? 'Yerel çiftliklerden taze ürünler' : language === 'it' ? 'Prodotti freschi dalle fattorie locali' : 'Fresh from local farms to your table'}</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-gray-50 rounded-xl p-6 sticky top-24">
              <h3 className="font-semibold mb-4">{language === 'tr' ? 'Kategoriler' : language === 'it' ? 'Categorie' : 'Categories'}</h3>
              <ul className="space-y-2">
                <li>
                  <button onClick={() => setSelectedCategory('all')} className={`w-full text-left px-3 py-2 rounded ${selectedCategory === 'all' ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}>
                    {language === 'tr' ? 'Tüm Ürünler' : language === 'it' ? 'Tutti i Prodotti' : 'All Products'}
                  </button>
                </li>
                {categories.map((cat: any) => (
                  <li key={cat.slug}>
                    <button onClick={() => setSelectedCategory(cat.slug)} className={`w-full text-left px-3 py-2 rounded ${selectedCategory === cat.slug ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}>
                      {getName(cat, language, 'name')}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">{sortedProducts.length} {language === 'tr' ? 'ürün' : language === 'it' ? 'prodotti' : 'products'}</p>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="border rounded-lg px-4 py-2">
                <option value="name">{language === 'tr' ? 'İsim' : language === 'it' ? 'Nome' : 'Name'}</option>
                <option value="price-low">{language === 'tr' ? 'En Düşük Fiyat' : language === 'it' ? 'Prezzo Minore' : 'Price: Low to High'}</option>
                <option value="price-high">{language === 'tr' ? 'En Yüksek Fiyat' : language === 'it' ? 'Prezzo Maggiore' : 'Price: High to Low'}</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProducts.map((product: any) => (
                <Link key={product.id} href={`/shop/${product.category}/${product.id}`} className="group">
                  <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                    <div className="relative h-64">
                      <Image src={product.image} alt={getName(product, language, 'name')} fill className="object-cover group-hover:scale-105 transition-transform" />
                      {!product.inStock && <div className="absolute inset-0 bg-black/50 flex items-center justify-center"><span className="text-white font-bold text-lg">{language === 'tr' ? 'Tükendi' : language === 'it' ? 'Esaurito' : 'Sold Out'}</span></div>}
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-primary font-medium mb-1">{getName(product, language, 'farm')}</p>
                      <h3 className="font-bold text-lg mb-2">{getName(product, language, 'name')}</h3>
                      <p className="text-xl font-bold text-gray-900">${product.price}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
