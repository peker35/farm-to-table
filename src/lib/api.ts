const BASE = '/api'

async function fetchJSON(url: string, options?: RequestInit) {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    ...options,
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }))
    throw new Error(err.error || res.statusText)
  }
  return res.json()
}

export const api = {
  products: {
    list: (category?: string) => {
      const params = category ? `?category=${category}` : ''
      return fetchJSON(`${BASE}/products${params}`)
    },
    get: (id: number) => fetchJSON(`${BASE}/products/${id}`),
    create: (data: any) => fetchJSON(`${BASE}/products`, { method: 'POST', body: JSON.stringify(data) }),
    update: (id: number, data: any) => fetchJSON(`${BASE}/products/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id: number) => fetchJSON(`${BASE}/products/${id}`, { method: 'DELETE' }),
  },
  categories: {
    list: () => fetchJSON(`${BASE}/categories`),
    get: (slug: string) => fetchJSON(`${BASE}/categories/${slug}`),
    create: (data: any) => fetchJSON(`${BASE}/categories`, { method: 'POST', body: JSON.stringify(data) }),
    update: (slug: string, data: any) => fetchJSON(`${BASE}/categories/${slug}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (slug: string) => fetchJSON(`${BASE}/categories/${slug}`, { method: 'DELETE' }),
  },
  farms: {
    list: () => fetchJSON(`${BASE}/farms`),
    get: (id: number) => fetchJSON(`${BASE}/farms/${id}`),
    create: (data: any) => fetchJSON(`${BASE}/farms`, { method: 'POST', body: JSON.stringify(data) }),
    update: (id: number, data: any) => fetchJSON(`${BASE}/farms/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id: number) => fetchJSON(`${BASE}/farms/${id}`, { method: 'DELETE' }),
  },
  events: {
    list: () => fetchJSON(`${BASE}/events`),
    get: (id: number) => fetchJSON(`${BASE}/events/${id}`),
    create: (data: any) => fetchJSON(`${BASE}/events`, { method: 'POST', body: JSON.stringify(data) }),
    update: (id: number, data: any) => fetchJSON(`${BASE}/events/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id: number) => fetchJSON(`${BASE}/events/${id}`, { method: 'DELETE' }),
  },
  orders: {
    list: () => fetchJSON(`${BASE}/orders`),
    get: (id: number) => fetchJSON(`${BASE}/orders/${id}`),
    create: (data: any) => fetchJSON(`${BASE}/orders`, { method: 'POST', body: JSON.stringify(data) }),
    update: (id: number, data: any) => fetchJSON(`${BASE}/orders/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id: number) => fetchJSON(`${BASE}/orders/${id}`, { method: 'DELETE' }),
  },
  users: {
    list: () => fetchJSON(`${BASE}/users`),
    create: (data: any) => fetchJSON(`${BASE}/users`, { method: 'POST', body: JSON.stringify(data) }),
  },
}
