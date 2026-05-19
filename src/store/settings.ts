import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SettingsStore {
  logoUrl: string
  setLogoUrl: (url: string) => void
  resetLogo: () => void
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      logoUrl: '/logo.svg',
      setLogoUrl: (url) => set({ logoUrl: url }),
      resetLogo: () => set({ logoUrl: '/logo.svg' }),
    }),
    { name: 'farm-settings' }
  )
)