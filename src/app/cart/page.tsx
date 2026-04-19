'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCartStore } from '@/store/cart'
import { useLanguageStore } from '@/store/language'
import { t, cart as cartT } from '@/data/translations'

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotal } = useCartStore()
  const total = getTotal()
  const { language } = useLanguageStore()

  const c = (key: string) => t('cart', key, language)

  if (items.length === 0) {
    return (
      <div className="pt-24 pb-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold mb-4">{c('empty')}</h1>
          <p className="text-gray-600 mb-8">{c('emptyDesc')}</p>
          <Link href="/shop" className="btn-primary inline-block">
            {language === 'tr' ? 'Alışverişe Başla' : language === 'it' ? 'Inizia lo Shopping' : 'Start Shopping'}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">{c('yourCart')}</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex gap-4 bg-white p-4 rounded-xl shadow-sm">
                <div className="w-24 h-24 relative rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-gray-500 text-sm">${item.price} each</p>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200"
                      >
                        -
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      {c('remove')}
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-6 rounded-xl sticky top-24">
              <h2 className="text-xl font-bold mb-4">{c('orderSummary')}</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>{c('subtotal')}</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>{c('delivery')}</span>
                  <span className="text-green-600">{c('free')}</span>
                </div>
                <hr className="border-gray-300" />
                <div className="flex justify-between text-xl font-bold">
                  <span>{c('total')}</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <Link href="/checkout" className="btn-primary w-full text-center block">
                {c('proceedCheckout')}
              </Link>
              <p className="text-xs text-gray-500 text-center mt-4">
                {c('freeDelivery')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}