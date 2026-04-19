'use client'

import { useState } from 'react'

interface Order {
  id: string
  customer: string
  email: string
  phone: string
  address: string
  items: { name: string; quantity: number; price: number }[]
  total: number
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled'
  date: string
}

const initialOrders: Order[] = [
  { id: 'ORD-001', customer: 'John Doe', email: 'john@example.com', phone: '555-0101', address: '123 Main St, NY', items: [{ name: 'Heirloom Tomatoes', quantity: 2, price: 6.99 }, { name: 'Fresh Eggs', quantity: 1, price: 7.99 }], total: 21.97, status: 'Pending', date: '2024-01-15' },
  { id: 'ORD-002', customer: 'Jane Smith', email: 'jane@example.com', phone: '555-0102', address: '456 Oak Ave, NY', items: [{ name: 'Mixed Baby Greens', quantity: 3, price: 5.99 }], total: 17.97, status: 'Processing', date: '2024-01-15' },
  { id: 'ORD-003', customer: 'Mike Johnson', email: 'mike@example.com', phone: '555-0103', address: '789 Pine Rd, NY', items: [{ name: 'Grass-Fed Ground Beef', quantity: 2, price: 12.99 }], total: 25.98, status: 'Shipped', date: '2024-01-14' },
  { id: 'ORD-004', customer: 'Sarah Wilson', email: 'sarah@example.com', phone: '555-0104', address: '321 Elm St, NY', items: [{ name: 'Artisan Sourdough', quantity: 1, price: 8.99 }, { name: 'Organic Carrots', quantity: 2, price: 4.99 }], total: 18.97, status: 'Delivered', date: '2024-01-14' },
  { id: 'ORD-005', customer: 'Tom Brown', email: 'tom@example.com', phone: '555-0105', address: '654 Maple Dr, NY', items: [{ name: 'Raw Honey', quantity: 2, price: 14.99 }], total: 29.98, status: 'Cancelled', date: '2024-01-13' },
]

export default function AdminOrdersPage() {
  const [orders] = useState<Order[]>(initialOrders)
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  const filteredOrders = orders.filter(o => filterStatus === 'all' || o.status === filterStatus)

  const updateStatus = (orderId: string, newStatus: Order['status']) => {
    // In a real app, this would update the database
    alert(`Order ${orderId} status updated to ${newStatus}`)
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Orders</h1>
        <p className="text-gray-600">Manage and track customer orders</p>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6">
        {['all', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-2 rounded-lg text-sm ${
              filterStatus === status
                ? 'bg-primary text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            {status === 'all' ? 'All' : status}
          </button>
        ))}
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <div key={order.id} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-lg">{order.id}</h3>
                <p className="text-gray-600">{order.customer}</p>
                <p className="text-sm text-gray-500">{order.date}</p>
              </div>
              <select
                value={order.status}
                onChange={(e) => updateStatus(order.id, e.target.value as Order['status'])}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                  order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                  order.status === 'Processing' ? 'bg-purple-100 text-purple-700' :
                  order.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                  'bg-yellow-100 text-yellow-700'
                }`}
              >
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            <div className="border-t pt-4 mt-4">
              <h4 className="font-medium mb-2">Order Items</h4>
              <div className="space-y-1">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <span className="text-gray-600">{item.quantity}x {item.name}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between font-bold mt-2 pt-2 border-t">
                <span>Total</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>

            <div className="border-t pt-4 mt-4">
              <button
                onClick={() => setSelectedOrder(order)}
                className="text-primary hover:underline text-sm"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold">{selectedOrder.id}</h2>
              <button onClick={() => setSelectedOrder(null)} className="text-gray-500 hover:text-gray-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-1">Customer</h3>
                <p className="text-gray-600">{selectedOrder.customer}</p>
                <p className="text-gray-600">{selectedOrder.email}</p>
                <p className="text-gray-600">{selectedOrder.phone}</p>
              </div>

              <div>
                <h3 className="font-medium mb-1">Shipping Address</h3>
                <p className="text-gray-600">{selectedOrder.address}</p>
              </div>

              <div>
                <h3 className="font-medium mb-1">Items</h3>
                {selectedOrder.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between py-1">
                    <span className="text-gray-600">{item.quantity}x {item.name}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="flex justify-between font-bold pt-2 border-t mt-2">
                  <span>Total</span>
                  <span>${selectedOrder.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <button
                onClick={() => setSelectedOrder(null)}
                className="flex-1 py-2 border rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}