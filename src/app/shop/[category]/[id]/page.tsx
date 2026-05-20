'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useCartStore } from '@/store/cart'
import { useLanguageStore } from '@/store/language'
import { notFound } from 'next/navigation'
import { api } from '@/lib/api'
import SafeImage from '@/components/SafeImage'

interface ProductPageProps {
  params: { category: string; id: string }
}

function getName(item: any, lang: string, field: string) {
  if (lang === 'tr' && item[field + 'Tr']) return item[field + 'Tr']
  if (lang === 'it' && item[field + 'It']) return item[field + 'It']
  return item[field + 'En'] || item[field] || ''
}

export default function ProductPage({ params }: ProductPageProps) {
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)
  const addItem = useCartStore(state => state.addItem)
  const { language } = useLanguageStore()

  useEffect(() => {
    api.products.get(parseInt(params.id)).then(data => {
      setProduct({ ...data, price: parseFloat(data.price) })
      setLoading(false)
    }).catch(() => {
      setLoading(false)
    })
  }, [params.id])

  if (loading) {
    return <div className="pt-20 flex items-center justify-center h-64"><div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" /></div>
  }

  if (!product) {
    notFound()
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: getName(product, language, 'name'),
      price: product.price,
      image: product.image,
      quantity,
    })
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  return (
    <div className="pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <nav className="text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-primary">Home</Link> / <Link href="/shop" className="hover:text-primary">Shop</Link> / <span className="text-gray-900">{getName(product, language, 'name')}</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden">
            <SafeImage src={product.image} alt={getName(product, language, 'name')} fill className="object-cover" />
            {!product.inStock && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="text-white font-bold text-2xl">{language === 'tr' ? 'Tükendi' : language === 'it' ? 'Esaurito' : 'Sold Out'}</span>
              </div>
            )}
          </div>

          <div>
            <p className="text-primary font-medium mb-2">{getName(product, language, 'farm')}</p>
            <h1 className="text-3xl font-bold mb-4">{getName(product, language, 'name')}</h1>
            <p className="text-4xl font-bold text-gray-900 mb-6">${product.price}</p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-2">
                <span className="text-gray-600">{language === 'tr' ? 'Kategori' : language === 'it' ? 'Categoria' : 'Category'}:</span>
                <Link href={`/shop/${product.category}`} className="text-primary hover:underline">{product.category}</Link>
              </div>
              <div className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`}></span>
                <span>{product.inStock ? (language === 'tr' ? 'Stokta' : language === 'it' ? 'Disponibile' : 'In Stock') : (language === 'tr' ? 'Tükendi' : language === 'it' ? 'Esaurito' : 'Sold Out')}</span>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border rounded-lg">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-2 hover:bg-gray-100">-</button>
                <span className="px-4 py-2 border-x font-medium">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-2 hover:bg-gray-100">+</button>
              </div>
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-3 rounded-lg font-bold transition-all ${addedToCart ? 'bg-green-500 text-white' : 'bg-primary text-white hover:bg-primary-dark'}`}
              >
                {addedToCart ? (language === 'tr' ? 'Sepete Eklendi!' : language === 'it' ? 'Aggiunto!' : 'Added!') : (language === 'tr' ? 'Sepete Ekle' : language === 'it' ? 'Aggiungi al Carrello' : 'Add to Cart')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
