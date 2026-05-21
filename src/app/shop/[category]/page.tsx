'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useLanguageStore } from '@/store/language'
import { api } from '@/lib/api'
import SafeImage from '@/components/SafeImage'

function getName(item: any, lang: string, field: string) {
  if (lang === 'tr' && item[field + 'Tr']) return item[field + 'Tr']
  if (lang === 'it' && item[field + 'It']) return item[field + 'It']
  return item[field + 'En'] || item[field] || ''
}

export default function CategoryPage() {
  const params = useParams<{ category: string }>()
  const categorySlug = params.category
  const [products, setProducts] = useState<any[]>([])
  const [category, setCategory] = useState<any>(null)
  const [sortBy, setSortBy] = useState('name')
  const { language } = useLanguageStore()

  useEffect(() => {
    Promise.all([
      api.products.list(categorySlug),
      api.categories.list()
    ]).then(([prods, cats]) => {
      setProducts(prods.map((p: any) => ({ ...p, price: parseFloat(p.price) })))
      setCategory(cats.find((c: any) => c.slug === categorySlug))
    })
  }, [categorySlug])

  const sortedProducts = [...products].sort((a: any, b: any) => {
    if (sortBy === 'price-low') return a.price - b.price
    if (sortBy === 'price-high') return b.price - a.price
    return getName(a, language, 'name').localeCompare(getName(b, language, 'name'))
  })

  const title = category ? getName(category, language, 'name') : categorySlug

  return (
    <div className="pt-20">
      <section className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">{title}</h1>
          <p className="text-xl opacity-90">{language === 'tr' ? 'Taze ve yerel ürünler' : language === 'it' ? 'Prodotti freschi e locali' : 'Fresh and local products'}</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">{sortedProducts.length} {language === 'tr' ? 'ürün' : language === 'it' ? 'prodotti' : 'products'}</p>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="border rounded-lg px-4 py-2">
            <option value="name">{language === 'tr' ? 'İsim' : language === 'it' ? 'Nome' : 'Name'}</option>
            <option value="price-low">{language === 'tr' ? 'En Düşük Fiyat' : language === 'it' ? 'Prezzo Minore' : 'Price: Low to High'}</option>
            <option value="price-high">{language === 'tr' ? 'En Yüksek Fiyat' : language === 'it' ? 'Prezzo Maggiore' : 'Price: High to Low'}</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.map((product: any) => (
            <Link key={product.id} href={`/shop/${product.category}/${product.id}`} className="group">
              <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="relative h-64">
                  <SafeImage src={product.image} alt={getName(product, language, 'name')} fill className="object-cover group-hover:scale-105 transition-transform" />
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
  )
}
