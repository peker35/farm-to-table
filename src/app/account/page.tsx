'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuthStore } from '@/store/auth'
import { useLanguageStore } from '@/store/language'
import { useCartStore } from '@/store/cart'

export default function AccountPage() {
  const auth = useAuthStore()
  const lang = useLanguageStore()
  const cart = useCartStore()
  const router = useRouter()

  const { user, isAuthenticated, logout } = auth
  const { language } = lang
  const { items } = cart
  
  const [activeTab, setActiveTab] = useState('profile')
  const [message, setMessage] = useState('')

  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    zipCode: user?.zipCode || ''
  })

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  if (!isAuthenticated) {
    return (
      <div className="pt-24 pb-16 min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">
            {language === 'tr' ? 'Giriş yapmalısınız' : 
             language === 'it' ? 'Devi effettuare il login' : 
             'Please log in'}
          </h1>
          <Link href="/login" className="btn-primary inline-block">
            {language === 'tr' ? 'Giriş Yap' : language === 'it' ? 'Accedi' : 'Sign In'}
          </Link>
        </div>
      </div>
    )
  }

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(language === 'tr' ? 'Profil güncellendi!' : 
             language === 'it' ? 'Profilo aggiornato!' : 
             'Profile updated!')
    setTimeout(() => setMessage(''), 3000)
  }

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setMessage(language === 'tr' ? 'Şifreler eşleşmiyor!' : 
               language === 'it' ? 'Le password non corrispondono!' : 
               'Passwords do not match!')
      return
    }
    setMessage(language === 'tr' ? 'Şifre değiştirildi!' : 
             language === 'it' ? 'Password cambiata!' : 
             'Password changed!')
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
    setTimeout(() => setMessage(''), 3000)
  }

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  const tabs = [
    { id: 'profile', label: language === 'tr' ? 'Profil' : language === 'it' ? 'Profilo' : 'Profile' },
    { id: 'orders', label: language === 'tr' ? 'Siparişler' : language === 'it' ? 'Ordini' : 'Orders' },
    { id: 'password', label: language === 'tr' ? 'Şifre' : language === 'it' ? 'Password' : 'Password' },
    { id: 'addresses', label: language === 'tr' ? 'Adresler' : language === 'it' ? 'Indirizzi' : 'Addresses' },
  ]

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">
          {language === 'tr' ? 'Hesabım' : language === 'it' ? 'Il Mio Account' : 'My Account'}
        </h1>

        <div className="flex gap-8">
          <aside className="w-64">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">
                    {user?.name?.charAt(0) || 'U'}
                  </span>
                </div>
                <h3 className="font-semibold">{user?.name}</h3>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary text-white'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 rounded-lg text-red-600 hover:bg-red-50"
                >
                  {language === 'tr' ? 'Çıkış Yap' : language === 'it' ? 'Esci' : 'Logout'}
                </button>
              </nav>
            </div>
          </aside>

          <div className="flex-1">
            {message && (
              <div className="bg-green-50 text-green-600 p-4 rounded-lg mb-4">
                {message}
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold mb-6">
                  {language === 'tr' ? 'Profil Bilgileri' : 
                   language === 'it' ? 'Informazioni Profilo' : 
                   'Profile Information'}
                </h2>
                <form onSubmit={handleProfileSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        {language === 'tr' ? 'Ad Soyad' : language === 'it' ? 'Nome Completo' : 'Full Name'}
                      </label>
                      <input
                        type="text"
                        value={profileForm.name}
                        onChange={(e) => setProfileForm({...profileForm, name: e.target.value})}
                        className="w-full px-4 py-2 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        {language === 'tr' ? 'Telefon' : language === 'it' ? 'Telefono' : 'Phone'}
                      </label>
                      <input
                        type="tel"
                        value={profileForm.phone}
                        onChange={(e) => setProfileForm({...profileForm, phone: e.target.value})}
                        className="w-full px-4 py-2 border rounded-lg"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                      type="email"
                      value={profileForm.email}
                      onChange={(e) => setProfileForm({...profileForm, email: e.target.value})}
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      {language === 'tr' ? 'Adres' : language === 'it' ? 'Indirizzo' : 'Address'}
                    </label>
                    <input
                      type="text"
                      value={profileForm.address}
                      onChange={(e) => setProfileForm({...profileForm, address: e.target.value})}
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        {language === 'tr' ? 'Şehir' : language === 'it' ? 'Città' : 'City'}
                      </label>
                      <input
                        type="text"
                        value={profileForm.city}
                        onChange={(e) => setProfileForm({...profileForm, city: e.target.value})}
                        className="w-full px-4 py-2 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        {language === 'tr' ? 'Posta Kodu' : language === 'it' ? 'CAP' : 'ZIP Code'}
                      </label>
                      <input
                        type="text"
                        value={profileForm.zipCode}
                        onChange={(e) => setProfileForm({...profileForm, zipCode: e.target.value})}
                        className="w-full px-4 py-2 border rounded-lg"
                      />
                    </div>
                  </div>
                  <button type="submit" className="btn-primary">
                    {language === 'tr' ? 'Kaydet' : language === 'it' ? 'Salva' : 'Save'}
                  </button>
                </form>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold mb-6">
                  {language === 'tr' ? 'Siparişlerim' : 
                   language === 'it' ? 'I Miei Ordini' : 
                   'My Orders'}
                </h2>
                {items.length === 0 ? (
                  <p className="text-gray-500">
                    {language === 'tr' ? 'Henüz sipariş yok' : 
                     language === 'it' ? 'Nessun ordine ancora' : 
                     'No orders yet'}
                  </p>
                ) : (
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-4 p-4 border rounded-lg">
                        <div className="w-16 h-16 bg-gray-100 rounded-lg"></div>
                        <div>
                          <h4 className="font-semibold">{item.name}</h4>
                          <p className="text-sm text-gray-500">
                            {language === 'tr' ? 'Adet: ' : language === 'it' ? 'Quantità: ' : 'Qty: '}{item.quantity}
                          </p>
                          <p className="font-medium">${item.price * item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'password' && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold mb-6">
                  {language === 'tr' ? 'Şifre Değiştir' : 
                   language === 'it' ? 'Cambia Password' : 
                   'Change Password'}
                </h2>
                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      {language === 'tr' ? 'Mevcut Şifre' : 
                       language === 'it' ? 'Password Attuale' : 
                       'Current Password'}
                    </label>
                    <input
                      type="password"
                      value={passwordForm.currentPassword}
                      onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})}
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      {language === 'tr' ? 'Yeni Şifre' : 
                       language === 'it' ? 'Nuova Password' : 
                       'New Password'}
                    </label>
                    <input
                      type="password"
                      value={passwordForm.newPassword}
                      onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      {language === 'tr' ? 'Yeni Şifre (Tekrar)' : 
                       language === 'it' ? 'Conferma Password' : 
                       'Confirm Password'}
                    </label>
                    <input
                      type="password"
                      value={passwordForm.confirmPassword}
                      onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>
                  <button type="submit" className="btn-primary">
                    {language === 'tr' ? 'Değiştir' : language === 'it' ? 'Cambia' : 'Change'}
                  </button>
                </form>
              </div>
            )}

            {activeTab === 'addresses' && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold mb-6">
                  {language === 'tr' ? 'Adreslerim' : 
                   language === 'it' ? 'I Miei Indirizzi' : 
                   'My Addresses'}
                </h2>
                <div className="text-center py-8 text-gray-500">
                  <p>
                    {language === 'tr' ? 'Henüz adres eklenmemiş' : 
                     language === 'it' ? 'Nessun indirizzo aggiunto' : 
                     'No addresses added yet'}
                  </p>
                  <button className="btn-primary mt-4">
                    {language === 'tr' ? 'Yeni Adres Ekle' : 
                     language === 'it' ? 'Aggiungi Indirizzo' : 
                     'Add New Address'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}