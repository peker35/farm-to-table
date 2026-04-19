'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { products } from '@/data/products'
import { useCartStore } from '@/store/cart'
import { notFound } from 'next/navigation'

interface ProductPageProps {
  params: { category: string; id: string }
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = products.find(p => p.id === parseInt(params.id))
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)
  const addItem = useCartStore(state => state.addItem)

  if (!product) {
    notFound()
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity
    })
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/shop" className="hover:text-primary">Shop</Link>
          <span>/</span>
          <Link href={`/shop/${product.category}`} className="hover:text-primary capitalize">
            {product.category.replace('-', ' ')}
          </Link>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Image */}
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Details */}
          <div>
            <p className="text-primary font-medium mb-2">{product.farm}</p>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-2xl font-bold mb-6">${product.price}</p>

            <div className="mb-6">
              <p className="text-gray-600 mb-4">
                Fresh from {product.farm}. Our products are carefully sourced from local farms 
                to ensure the highest quality and freshness.
              </p>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Quantity</label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 flex items-center justify-center hover:bg-gray-50"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 flex items-center justify-center hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={`w-full py-4 rounded-lg font-medium transition-all ${
                addedToCart
                  ? 'bg-green-500 text-white'
                  : product.inStock
                    ? 'btn-primary'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              {addedToCart ? 'Added to Cart!' : product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>

            {/* Product Info */}
            <div className="mt-8 pt-8 border-t">
              <h3 className="font-semibold mb-4">Product Details</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Farm</span>
                  <span>{product.farm}</span>
                </div>
                <div className="flex justify-between">
                  <span>Category</span>
                  <span className="capitalize">{product.category.replace('-', ' ')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Availability</span>
                  <span className={product.inStock ? 'text-green-600' : 'text-red-500'}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}