'use client'

import { useState, useEffect } from 'react'
import { api } from '@/lib/api'
import { useLanguageStore } from '@/store/language'

interface Customer {
  id: string
  name: string
  email: string
  phone: string
  zipCode: string
  orders: number
  totalSpent: number
  joinDate: string
  status: 'Active' | 'Inactive'
}

export default function AdminCustomersPage() {
  const { language } = useLanguageStore()
  const tr = (key: string) => {
    const m: Record<string, { en: string; it: string; tr: string }> = {
      customers: { en: 'Customers', it: 'Clienti', tr: 'Müşteriler' },
      viewCustomers: { en: 'View your customer base', it: 'Visualizza la tua base clienti', tr: 'Müşteri tabanınızı görüntüleyin' },
      search: { en: 'Search customers...', it: 'Cerca clienti...', tr: 'Müşteri ara...' },
      allStatus: { en: 'All Status', it: 'Tutti gli Stati', tr: 'Tüm Durumlar' },
      customerID: { en: 'Customer ID', it: 'ID Cliente', tr: 'Müşteri No' },
      name: { en: 'Name', it: 'Nome', tr: 'Ad' },
      email: { en: 'Email', it: 'Email', tr: 'E-posta' },
      phone: { en: 'Phone', it: 'Telefono', tr: 'Telefon' },
      zip: { en: 'ZIP', it: 'CAP', tr: 'Posta Kodu' },
      orders: { en: 'Orders', it: 'Ordini', tr: 'Siparişler' },
      totalSpent: { en: 'Total Spent', it: 'Totale Speso', tr: 'Toplam Harcama' },
      status: { en: 'Status', it: 'Stato', tr: 'Durum' },
      joinDate: { en: 'Join Date', it: 'Data Iscrizione', tr: 'Kayıt Tarihi' },
    }
    return m[key]?.[language as keyof typeof m['customers']] || key
  }
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')

  useEffect(() => {
    api.users.list().then(data => {
      setCustomers(data.map((u: any) => ({
        id: `CUS-${String(u.id).padStart(3, '0')}`,
        name: u.name,
        email: u.email,
        phone: u.phone || '',
        zipCode: u.zipCode || '',
        orders: u.orders || 0,
        totalSpent: parseFloat(u.totalSpent || '0'),
        joinDate: u.joinDate || '',
        status: u.status || 'Active',
      })))
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  const filteredCustomers = customers.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = filterStatus === 'all' || c.status === filterStatus
    return matchesSearch && matchesStatus
  })

  if (loading) {
    return <div className="flex items-center justify-center h-64"><div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" /></div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">{tr('customers')}</h1>
          <p className="text-gray-600">{tr('viewCustomers')}</p>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <input type="text" placeholder={tr('search')} value={search} onChange={(e) => setSearch(e.target.value)} className="flex-1 px-4 py-2 border rounded-lg" />
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-4 py-2 border rounded-lg">
          <option value="all">{tr('allStatus')}</option>
          <option value="Active">{language === 'tr' ? 'Aktif' : language === 'it' ? 'Attivo' : 'Active'}</option>
          <option value="Inactive">{language === 'tr' ? 'Pasif' : language === 'it' ? 'Inattivo' : 'Inactive'}</option>
        </select>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{tr('customerID')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{tr('name')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{tr('email')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{tr('phone')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{tr('zip')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{tr('orders')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{tr('totalSpent')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{tr('status')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{tr('joinDate')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredCustomers.map((customer) => (
              <tr key={customer.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap font-medium">{customer.id}</td>
                <td className="px-6 py-4">{customer.name}</td>
                <td className="px-6 py-4">{customer.email}</td>
                <td className="px-6 py-4">{customer.phone}</td>
                <td className="px-6 py-4">{customer.zipCode}</td>
                <td className="px-6 py-4">{customer.orders}</td>
                <td className="px-6 py-4">${customer.totalSpent.toFixed(2)}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${customer.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{customer.status}</span>
                </td>
                <td className="px-6 py-4 text-gray-600">{customer.joinDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
