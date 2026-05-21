import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface User {
  id: number
  email: string
  name: string
  role: string
  zipCode?: string | null
  phone?: string | null
  status?: string
}

interface AuthStore {
  user: User | null
  isAuthenticated: boolean
  isAdmin: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; user?: User; error?: string }>
  register: (name: string, email: string, password: string, zipCode: string) => Promise<{ success: boolean; user?: User; error?: string }>
  logout: () => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isAdmin: false,

      login: async (email: string, password: string) => {
        try {
          const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
          })
          const data = await res.json()
          if (!res.ok) return { success: false, error: data.error || 'Login failed' }
          const user = data.user as User
          set({ user, isAuthenticated: true, isAdmin: user.role === 'admin' })
          return { success: true, user }
        } catch {
          return { success: false, error: 'Network error' }
        }
      },

      register: async (name: string, email: string, password: string, zipCode: string) => {
        try {
          const res = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password, zipCode }),
          })
          const data = await res.json()
          if (!res.ok) return { success: false, error: data.error || 'Registration failed' }
          const user = data.user as User
          set({ user, isAuthenticated: true, isAdmin: user.role === 'admin' })
          return { success: true, user }
        } catch {
          return { success: false, error: 'Network error' }
        }
      },

      logout: () => set({ user: null, isAuthenticated: false, isAdmin: false }),
    }),
    {
      name: 'farm-auth',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated, isAdmin: state.isAdmin }),
    }
  )
)
