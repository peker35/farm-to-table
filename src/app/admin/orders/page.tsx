'use client'

import { useState, useEffect, useCallback } from 'react'
import { api } from '@/lib/api'
import { useLanguageStore } from '@/store/language'

interface Order {
  id: string
  customer: string
  email: string
  phone: string
  address: string
  items: { name: string; quantity: number; price: number }[]
  total: number
  status: string
  date: string
}

export default function AdminOrdersPage() {
  const { language } = useLanguageStore()
  const tr = (key: string) => {
    const m: Record<string, { en: string; it: string; tr: string }> = {
      orders: { en: 'Orders', it: 'Ordini', tr: 'Siparişler' },
      manageOrders: { en: 'Manage customer orders', it: 'Gestisci gli ordini dei clienti', tr: 'Müşteri siparişlerini yönetin' },
      allStatus: { en: 'All Status', it: 'Tutti gli Stati', tr: 'Tüm Durumlar' },
      orderID: { en: 'Order ID', it: 'ID Ordine', tr: 'Sipariş No' },
      customer: { en: 'Customer', it: 'Cliente', tr: 'Müşteri' },
      date: { en: 'Date', it: 'Data', tr: 'Tarih' },
      total: { en: 'Total', it: 'Totale', tr: 'Toplam' },
      status: { en: 'Status', it: 'Stato', tr: 'Durum' },
      actions: { en: 'Actions', it: 'Azioni', tr: 'İşlemler' },
      view: { en: 'View', it: 'Visualizza', tr: 'Görüntüle' },
      totalLabel: { en: 'Total', it: 'Totale', tr: 'Toplam' },
    }
    return m[key]?.[language as keyof typeof m['orders']] || key
  }
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  const loadOrders = useCallback(async () => {
    try {
      const data = await api.orders.list()
      setOrders(data.map((o: any) => ({
        ...o,
        total: parseFloat(o.total),
        items: typeof o.items === 'string' ? JSON.parse(o.items) : o.items,
      })))
    } catch (err) {
      console.error('Failed to load orders', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadOrders()
  }, [loadOrders])

  const filteredOrders = orders.filter(o => filterStatus === 'all' || o.status === filterStatus)

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await api.orders.update(parseInt(id.replace('ORD-', '')), { status: newStatus })
      setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o))
    } catch (err) {
      console.error('Failed to update order', err)
    }
  }

  const statusColors: Record<string, string> = {
    'Pending': 'bg-yellow-100 text-yellow-700',
    'Processing': 'bg-blue-100 text-blue-700',
    'Shipped': 'bg-purple-100 text-purple-700',
    'Delivered': 'bg-green-100 text-green-700',
    'Cancelled': 'bg-red-100 text-red-700',
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64"><div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" /></div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">{tr('orders')}</h1>
          <p className="text-gray-600">{tr('manageOrders')}</p>
        </div>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-4 py-2 border rounded-lg">
          <option value="all">{tr('allStatus')}</option>
          <option value="Pending">Pending</option>
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{tr('orderID')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{tr('customer')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{tr('date')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{tr('total')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{tr('status')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{tr('actions')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap font-medium">{order.id}</td>
                <td className="px-6 py-4">{order.customer}</td>
                <td className="px-6 py-4 text-gray-600">{order.date}</td>
                <td className="px-6 py-4 font-medium">${order.total.toFixed(2)}</td>
                <td className="px-6 py-4">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    className={`px-2 py-1 rounded-full text-xs font-medium border-0 ${statusColors[order.status] || 'bg-gray-100 text-gray-700'}`}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="px-6 py-4">
                  <button onClick={() => setSelectedOrder(order)} className="text-primary hover:underline text-sm">{tr('view')}</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4" onClick={(e) => e.target === e.currentTarget && setSelectedOrder(null)}>
          <div className="bg-white rounded-xl p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{selectedOrder.id}</h2>
              <button onClick={() => setSelectedOrder(null)} className="text-gray-500 hover:text-gray-700">&times;</button>
            </div>
            <div className="space-y-3 text-sm">
              <div><strong>{tr('customer')}:</strong> {selectedOrder.customer}</div>
              <div><strong>Email:</strong> {selectedOrder.email}</div>
              <div><strong>Telefon:</strong> {selectedOrder.phone}</div>
              <div><strong>{language === 'tr' ? 'Adres' : language === 'it' ? 'Indirizzo' : 'Address'}:</strong> {selectedOrder.address}</div>
              <div><strong>{tr('date')}:</strong> {selectedOrder.date}</div>
              <div><strong>{tr('status')}:</strong> {selectedOrder.status}</div>
              <div className="pt-3 border-t">
                <strong>{language === 'tr' ? 'Ürünler' : language === 'it' ? 'Articoli' : 'Items'}:</strong>
                <ul className="mt-2 space-y-1">
                  {selectedOrder.items.map((item, idx) => (
                    <li key={idx} className="flex justify-between">
                      <span>{item.name} x{item.quantity}</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex justify-between font-bold mt-2 pt-2 border-t">
                  <span>{tr('total')}</span>
                  <span>${selectedOrder.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
