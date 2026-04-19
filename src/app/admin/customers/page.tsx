'use client'

import { useState } from 'react'

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

const initialCustomers: Customer[] = [
  { id: 'CUS-001', name: 'John Doe', email: 'john@example.com', phone: '555-0101', zipCode: '10001', orders: 12, totalSpent: 456.78, joinDate: '2023-06-15', status: 'Active' },
  { id: 'CUS-002', name: 'Jane Smith', email: 'jane@example.com', phone: '555-0102', zipCode: '10002', orders: 8, totalSpent: 234.50, joinDate: '2023-07-20', status: 'Active' },
  { id: 'CUS-003', name: 'Mike Johnson', email: 'mike@example.com', phone: '555-0103', zipCode: '10003', orders: 24, totalSpent: 890.25, joinDate: '2023-03-10', status: 'Active' },
  { id: 'CUS-004', name: 'Sarah Wilson', email: 'sarah@example.com', phone: '555-0104', zipCode: '10004', orders: 5, totalSpent: 123.45, joinDate: '2023-09-05', status: 'Active' },
  { id: 'CUS-005', name: 'Tom Brown', email: 'tom@example.com', phone: '555-0105', zipCode: '10005', orders: 0, totalSpent: 0, joinDate: '2024-01-01', status: 'Inactive' },
  { id: 'CUS-006', name: 'Emily Davis', email: 'emily@example.com', phone: '555-0106', zipCode: '10006', orders: 15, totalSpent: 567.89, joinDate: '2023-05-22', status: 'Active' },
]

export default function AdminCustomersPage() {
  const [customers] = useState<Customer[]>(initialCustomers)
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')

  const filteredCustomers = customers.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) || 
                      c.email.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = filterStatus === 'all' || c.status === filterStatus
    return matchesSearch && matchesStatus
  })

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Customers</h1>
        <p className="text-gray-600">Manage your customer database</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <p className="text-gray-600 text-sm">Total Customers</p>
          <p className="text-2xl font-bold">{customers.length}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <p className="text-gray-600 text-sm">Active Customers</p>
          <p className="text-2xl font-bold">{customers.filter(c => c.status === 'Active').length}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <p className="text-gray-600 text-sm">Total Revenue</p>
          <p className="text-2xl font-bold">${customers.reduce((sum, c) => sum + c.totalSpent, 0).toFixed(2)}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search customers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-lg"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="all">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ZIP Code</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Orders</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Spent</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Joined</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredCustomers.map((customer) => (
              <tr key={customer.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium">{customer.name}</p>
                    <p className="text-sm text-gray-500">{customer.id}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-gray-600">{customer.email}</p>
                  <p className="text-sm text-gray-500">{customer.phone}</p>
                </td>
                <td className="px-6 py-4">{customer.zipCode}</td>
                <td className="px-6 py-4">{customer.orders}</td>
                <td className="px-6 py-4 font-medium">${customer.totalSpent.toFixed(2)}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    customer.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {customer.status}
                  </span>
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