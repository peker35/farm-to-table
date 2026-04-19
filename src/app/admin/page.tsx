'use client'

import Link from 'next/link'
import { products } from '@/data/products'
import { useCartStore } from '@/store/cart'
import { useAuthStore } from '@/store/auth'
import { useLanguageStore } from '@/store/language'
import { useEventsStore } from '@/store/events'

export default function AdminDashboard() {
  const { items } = useCartStore()
  const { users } = useAuthStore()
  const { events } = useEventsStore()
  const { language } = useLanguageStore()

  const totalRevenue = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const totalProducts = products.length
  const totalCustomers = users.length || 10
  const totalEvents = events.length || 5

  const stats = [
    { label: language === 'tr' ? 'Toplam Gelir' : language === 'it' ? 'Fatturato Totale' : 'Total Revenue', value: `$${totalRevenue.toFixed(2)}`, change: '+12%', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { label: language === 'tr' ? 'Siparişler' : language === 'it' ? 'Ordini' : 'Orders', value: items.length.toString(), change: '+8%', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01' },
    { label: language === 'tr' ? 'Ürünler' : language === 'it' ? 'Prodotti' : 'Products', value: totalProducts.toString(), change: '+2', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
    { label: language === 'tr' ? 'Müşteriler' : language === 'it' ? 'Clienti' : 'Customers', value: totalCustomers.toString(), change: '+15', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
  ]

  const recentOrders = items.slice(0, 5).map((item, index) => ({
    id: `ORD-${String(index + 1).padStart(3, '0')}`,
    customer: item.name,
    total: `$${(item.price * item.quantity).toFixed(2)}`,
    status: index % 3 === 0 ? 'Delivered' : index % 3 === 1 ? 'Shipped' : 'Pending',
    date: new Date().toISOString().split('T')[0]
  }))

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                </svg>
              </div>
              <span className="text-green-600 text-sm font-medium">{stat.change}</span>
            </div>
            <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
            <p className="text-gray-600 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-lg font-bold">Recent Orders</h2>
          <Link href="/admin/orders" className="text-primary hover:underline text-sm">
            View All
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium">{order.id}</td>
                  <td className="px-6 py-4">{order.customer}</td>
                  <td className="px-6 py-4 text-gray-600">{order.date}</td>
                  <td className="px-6 py-4 font-medium">{order.total}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                      order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-primary hover:underline text-sm">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}