'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { products, categories, getCategoryName, getProductName, getFarmName } from '@/data/products'
import { useLanguageStore } from '@/store/language'

interface CategoryPageProps {
  params: { category: string }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const [sortBy, setSortBy] = useState('name')
  const { language } = useLanguageStore()

  const category = categories.find(c => c.slug === params.category)
  const filteredProducts = products.filter(p => p.category === params.category)

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price
    if (sortBy === 'price-high') return b.price - a.price
    return getProductName(a, language).localeCompare(getProductName(b, language))
  })

  const title = category ? getCategoryName(category, language) : params.category

  return (
    <div className="pt-20">
      <section className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">{title}</h1>
          <p className="text-xl opacity-90">
            {language === 'tr' ? 'Yerel çiftliklerden en iyi ürünler' : 
             language === 'it' ? 'I migliori prodotti dalle fattorie locali' : 
             'The best products from local farms'}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-gray-50 rounded-xl p-6 sticky top-24">
              <h3 className="font-semibold mb-4">
                {language === 'tr' ? 'Kategoriler' : language === 'it' ? 'Categorie' : 'Categories'}
              </h3>
              <ul className="space-y-2">
                {categories.map((cat) => (
                  <li key={cat.slug}>
                    <Link
                      href={`/shop/${cat.slug}`}
                      className={`w-full text-left px-3 py-2 rounded ${
                        params.category === cat.slug ? 'bg-primary text-white' : 'hover:bg-gray-100'
                      }`}
                    >
                      {getCategoryName(cat, language)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                {sortedProducts.length} {language === 'tr' ? 'ürün' : language === 'it' ? 'prodotti' : 'products'}
              </p>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border rounded-lg px-4 py-2"
              >
                <option value="name">{language === 'tr' ? 'İsim' : language === 'it' ? 'Nome' : 'Name'}</option>
                <option value="price-low">{language === 'tr' ? 'Fiyat: Düşük-Yüksek' : language === 'it' ? 'Prezzo: Basso-Alto' : 'Price: Low-High'}</option>
                <option value="price-high">{language === 'tr' ? 'Fiyat: Yüksek-Düşük' : language === 'it' ? 'Prezzo: Alto-Basso' : 'Price: High-Low'}</option>
              </select>
            </div>

            {sortedProducts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-600">
                  {language === 'tr' ? 'Bu kategoride ürün bulunmuyor' : 
                   language === 'it' ? 'Nessun prodotto in questa categoria' : 
                   'No products in this category'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} lang={language} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function ProductCard({ product, lang }: { product: typeof products[0]; lang: 'en' | 'it' | 'tr' }) {
  return (
    <Link href={`/shop/${product.category}/${product.id}`} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative aspect-square">
        <Image
          src={product.image}
          alt={getProductName(product, lang)}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <p className="text-xs text-gray-500 mb-1">{getFarmName(product as any, lang)}</p>
        <h3 className="font-semibold mb-2">{getProductName(product, lang)}</h3>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold">${product.price}</span>
          <span className={`text-xs ${product.inStock ? 'text-green-600' : 'text-red-500'}`}>
            {lang === 'tr' ? (product.inStock ? 'Stokta' : 'Stokta Yok') : 
             lang === 'it' ? (product.inStock ? 'Disponibile' : 'Non Disponibile') : 
             (product.inStock ? 'In Stock' : 'Out of Stock')}
          </span>
        </div>
      </div>
    </Link>
  )
}