'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { categories, getCategoryName } from '@/data/products'
import { useLanguageStore } from '@/store/language'
import { t, brandNames } from '@/data/translations'
import LanguageSelector from './LanguageSelector'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false)
  const { language } = useLanguageStore()

  const brand = brandNames[language] || brandNames.en
  const navT = (key: string) => t('nav', key, language)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-shadow ${isScrolled ? 'bg-white shadow-md' : 'bg-white/95'}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-10 h-10">
              <Image
                src="/logo.png"
                alt="Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="font-bold text-xl text-gray-900 hidden sm:block">{brand.full}</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-6">
            <div className="relative">
              <button
                onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                className="flex items-center gap-1 text-gray-700 hover:text-primary"
              >
                {navT('shop')}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isCategoriesOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border p-4 z-50">
                  <div className="grid grid-cols-2 gap-2">
                    {categories.map((cat) => (
                      <Link
                        key={cat.slug}
                        href={`/shop/${cat.slug}`}
                        className="px-3 py-2 text-sm hover:bg-gray-50 rounded"
                        onClick={() => setIsCategoriesOpen(false)}
                      >
                        {getCategoryName(cat, language)}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <Link href="/about" className="text-gray-700 hover:text-primary">{navT('about')}</Link>
            <Link href="/producers" className="text-gray-700 hover:text-primary">{navT('producers')}</Link>
            <Link href="/recipes" className="text-gray-700 hover:text-primary">{navT('recipes')}</Link>
            <Link href="/events" className="text-gray-700 hover:text-primary">{navT('events')}</Link>
          </nav>

          <div className="flex items-center gap-2">
            <LanguageSelector />
            <Link href="/login" className="text-gray-700 hover:text-primary hidden sm:block">{navT('login')}</Link>
            <Link href="/join" className="btn-primary hidden sm:block">{navT('join')}</Link>
            <Link href="/account" className="p-2 hover:bg-gray-100 rounded-lg" title="Account">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </Link>
            <Link href="/cart" className="p-2 hover:bg-gray-100 rounded-lg relative">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t">
          <div className="p-4 space-y-4">
            <div className="border-b pb-4">
              <Link href="/login" className="block py-2">{navT('login')}</Link>
              <Link href="/join" className="block py-2 text-primary">{navT('join')}</Link>
            </div>
            <div>
              <h3 className="font-semibold mb-2">{navT('shop')}</h3>
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/shop/${cat.slug}`}
                  className="block py-2 pl-4 text-gray-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {getCategoryName(cat, language)}
                </Link>
              ))}
            </div>
            <Link href="/about" className="block py-2">{navT('about')}</Link>
            <Link href="/producers" className="block py-2">{navT('producers')}</Link>
            <Link href="/recipes" className="block py-2">{navT('recipes')}</Link>
            <Link href="/events" className="block py-2">{navT('events')}</Link>
          </div>
        </div>
      )}
    </header>
  )
}