import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Language } from '@/data/translations'

interface LanguageStore {
  language: Language
  setLanguage: (lang: Language) => void
}

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set) => ({
      language: 'tr' as Language,

      setLanguage: (language) => set({ language }),
    }),
    {
      name: 'farm-language',
    }
  )
)