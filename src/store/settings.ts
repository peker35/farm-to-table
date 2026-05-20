import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface BrandName {
  en: string
  it: string
  tr: string
}

interface SettingsStore {
  logoUrl: string
  brandName: BrandName
  setLogoUrl: (url: string) => void
  setBrandName: (name: BrandName) => void
  resetLogo: () => void
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      logoUrl: '/logo.svg',
      brandName: { en: '', it: '', tr: '' },
      setLogoUrl: (url) => set({ logoUrl: url }),
      setBrandName: (name) => set({ brandName: name }),
      resetLogo: () => set({ logoUrl: '/logo.svg' }),
    }),
    { name: 'farm-settings' }
  )
)