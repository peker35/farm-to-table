'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useCartStore } from '@/store/cart'
import { useLanguageStore } from '@/store/language'
import { t } from '@/data/translations'
import { validate, getErrorForField, ValidationError } from '@/utils/validation'
import { useToastStore } from '@/store/toast'

export default function CheckoutPage() {
  const { items, getTotal, clearCart } = useCartStore()
  const total = getTotal()
  const { language } = useLanguageStore()
  const showToast = useToastStore(state => state.show)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<ValidationError[]>([])
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
    notes: ''
  })

  const a = (key: string) => t('checkout', key, language)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setErrors([])

    const validation = validate(formData, {
      firstName: { required: true, minLength: 2 },
      lastName: { required: true, minLength: 2 },
      email: { required: true, email: true },
      phone: { required: true, minLength: 10 },
      address: { required: true, minLength: 5 },
      city: { required: true, minLength: 2 },
      zip: { required: true, minLength: 5 }
    })

    if (!validation.isValid) {
      setErrors(validation.errors)
      return
    }

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setOrderPlaced(true)
      clearCart()
      showToast(language === 'tr' ? 'Siparişiniz alındı!' : language === 'it' ? 'Ordine ricevuto!' : 'Order placed successfully!', 'success')
    }, 1000)
  }

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="pt-24 pb-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <Link href="/shop" className="btn-primary inline-block">
            Start Shopping
          </Link>
        </div>
      </div>
    )
  }

  if (orderPlaced) {
    return (
      <div className="pt-24 pb-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
          <p className="text-gray-600 mb-2">Thank you for your order.</p>
          <p className="text-gray-600 mb-8">You will receive a confirmation email shortly.</p>
          <Link href="/shop" className="btn-primary">
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">{a('firstName')}</label>
                  <input
                    type="text"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                      getErrorForField('firstName', errors) ? 'border-red-500 focus:ring-red-500/50' : 'focus:ring-primary/50'
                    }`}
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  />
                  {getErrorForField('firstName', errors) && (
                    <p className="text-red-500 text-xs mt-1">{getErrorForField('firstName', errors)}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">{a('lastName')}</label>
                  <input
                    type="text"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                      getErrorForField('lastName', errors) ? 'border-red-500 focus:ring-red-500/50' : 'focus:ring-primary/50'
                    }`}
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  />
                  {getErrorForField('lastName', errors) && (
                    <p className="text-red-500 text-xs mt-1">{getErrorForField('lastName', errors)}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">{a('email')}</label>
                <input
                  type="email"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                    getErrorForField('email', errors) ? 'border-red-500 focus:ring-red-500/50' : 'focus:ring-primary/50'
                  }`}
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
                {getErrorForField('email', errors) && (
                  <p className="text-red-500 text-xs mt-1">{getErrorForField('email', errors)}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">{a('phone')}</label>
                <input
                  type="tel"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                    getErrorForField('phone', errors) ? 'border-red-500 focus:ring-red-500/50' : 'focus:ring-primary/50'
                  }`}
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
                {getErrorForField('phone', errors) && (
                  <p className="text-red-500 text-xs mt-1">{getErrorForField('phone', errors)}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">{a('address')}</label>
                <input
                  type="text"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                    getErrorForField('address', errors) ? 'border-red-500 focus:ring-red-500/50' : 'focus:ring-primary/50'
                  }`}
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                />
                {getErrorForField('address', errors) && (
                  <p className="text-red-500 text-xs mt-1">{getErrorForField('address', errors)}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">{a('city')}</label>
                  <input
                    type="text"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                      getErrorForField('city', errors) ? 'border-red-500 focus:ring-red-500/50' : 'focus:ring-primary/50'
                    }`}
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                  />
                  {getErrorForField('city', errors) && (
                    <p className="text-red-500 text-xs mt-1">{getErrorForField('city', errors)}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">{a('zip')}</label>
                  <input
                    type="text"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                      getErrorForField('zip', errors) ? 'border-red-500 focus:ring-red-500/50' : 'focus:ring-primary/50'
                    }`}
                    value={formData.zip}
                    onChange={(e) => setFormData({...formData, zip: e.target.value})}
                  />
                  {getErrorForField('zip', errors) && (
                    <p className="text-red-500 text-xs mt-1">{getErrorForField('zip', errors)}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">{a('notes')}</label>
                <textarea
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                />
              </div>

              <button type="submit" disabled={loading} className="w-full btn-primary disabled:opacity-50">
                {loading ? (language === 'tr' ? 'Sipariş veriliyor...' : language === 'it' ? 'Ordine in corso...' : 'Placing order...') : `${a('placeOrder')} - $${total.toFixed(2)}`}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-gray-50 p-6 rounded-xl sticky top-24">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="space-y-4 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-16 h-16 relative rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              <hr className="my-4 border-gray-300" />
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span className="text-green-600">Free</span>
                </div>
                <hr className="border-gray-300" />
                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}