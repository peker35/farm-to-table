import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { products as initialProducts, categories as initialCategories } from '@/data/products'

interface Product {
  id: number
  name: string
  nameEn?: string
  nameIt?: string
  nameTr?: string
  price: number
  category: string
  farm: string
  farmEn?: string
  farmIt?: string
  farmTr?: string
  image: string
  inStock: boolean
}

interface Category {
  slug: string
  name: string
  nameEn: string
  nameIt: string
  nameTr: string
  image: string
}

interface ProductsStore {
  products: Product[]
  categories: Category[]
  addProduct: (product: Product) => void
  updateProduct: (id: number, data: Partial<Product>) => void
  deleteProduct: (id: number) => void
  addCategory: (category: Category) => void
  updateCategory: (slug: string, data: Partial<Category>) => void
  deleteCategory: (slug: string) => void
}

export const useProductsStore = create<ProductsStore>()(
  persist(
    (set, get) => ({
      products: initialProducts,
      categories: initialCategories,

      addProduct: (product) => set(state => ({ products: [...state.products, product] })),
      updateProduct: (id, data) => set(state => ({
        products: state.products.map(p => p.id === id ? { ...p, ...data } : p)
      })),
      deleteProduct: (id) => set(state => ({
        products: state.products.filter(p => p.id !== id)
      })),

      addCategory: (category) => set(state => ({ categories: [...state.categories, category] })),
      updateCategory: (slug, data) => set(state => ({
        categories: state.categories.map(c => c.slug === slug ? { ...c, ...data } : c)
      })),
      deleteCategory: (slug) => set(state => ({
        categories: state.categories.filter(c => c.slug !== slug)
      })),
    }),
    { name: 'farm-products' }
  )
)