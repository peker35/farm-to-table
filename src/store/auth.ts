import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  email: string
  name: string
  zipCode: string
}

interface AuthStore {
  user: User | null
  users: User[]
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string, zipCode: string) => Promise<boolean>
  logout: () => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      users: [
        { id: '1', email: 'admin@f2p.com', name: 'Admin User', zipCode: '10001' },
        { id: '2', email: 'john@example.com', name: 'John Doe', zipCode: '10002' },
        { id: '3', email: 'jane@example.com', name: 'Jane Smith', zipCode: '10003' },
      ],
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        if (email && password) {
          const user: User = {
            id: '1',
            email,
            name: email.split('@')[0],
            zipCode: '10001'
          }
          set({ user, isAuthenticated: true })
          return true
        }
        return false
      },

      register: async (name: string, email: string, password: string, zipCode: string) => {
        if (name && email && password && zipCode) {
          const users = get().users
          const newUser: User = {
            id: String(users.length + 1),
            email,
            name,
            zipCode
          }
          set({ users: [...users, newUser], user: newUser, isAuthenticated: true })
          return true
        }
        return false
      },

      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: 'farm-auth',
    }
  )
)