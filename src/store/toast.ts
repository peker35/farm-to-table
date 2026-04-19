import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Toast {
  id: string
  message: string
  type: 'success' | 'error' | 'warning' | 'info'
}

interface ToastStore {
  toasts: Toast[]
  show: (message: string, type?: Toast['type']) => void
  dismiss: (id: string) => void
  clear: () => void
}

export const useToastStore = create<ToastStore>()(
  persist(
    (set, get) => ({
      toasts: [],
      show: (message, type = 'info') => {
        const id = Date.now().toString()
        set(state => ({
          toasts: [...state.toasts, { id, message, type }]
        }))
        setTimeout(() => {
          get().dismiss(id)
        }, 3000)
      },
      dismiss: (id) => {
        set(state => ({
          toasts: state.toasts.filter(t => t.id !== id)
        }))
      },
      clear: () => set({ toasts: [] })
    }),
    { name: 'toast-storage' }
  )
)