'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { products, categories, getCategoryName, getProductName, getFarmName } from '@/data/products'
import { useCartStore } from '@/store/cart'
import { useLanguageStore } from '@/store/language'
import { t, home as homeT, product as productT } from '@/data/translations'

export default function Home() {
  const { language } = useLanguageStore()
  const h = (key: string) => t('home', key, language)
  const addItem = useCartStore(state => state.addItem)

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center bg-gradient-to-b from-green-50 to-white">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="https://cdn.sanity.io/images/ec9j7ju7/production/500b26d1b8378c7ea8a7505acb401a65f50c0d01-5616x3744.jpg"
            alt="Farm"
            fill
            className="object-cover opacity-10"
          />
        </div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            {h('heroTitle')}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            {h('heroSubtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/shop" className="btn-primary text-lg">
              {h('shopNow')}
            </Link>
            <Link href="/about" className="btn-secondary text-lg">
              {h('learnMore')}
            </Link>
          </div>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{language === 'tr' ? 'New York Bölgesi Teslimat' : language === 'it' ? 'Consegna a New York' : 'Delivering to New York Area'}</span>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{h('howItWorks')}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">{h('step1Title')}</h3>
              <p className="text-gray-600">{h('step1Desc')}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">{h('step2Title')}</h3>
              <p className="text-gray-600">{h('step2Desc')}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">{h('step3Title')}</h3>
              <p className="text-gray-600">{h('step3Desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">{h('shopByCategory')}</h2>
          <p className="text-gray-600 text-center mb-12">{h('freshFromFarms')}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.slice(0, 8).map((category) => (
              <Link
                key={category.slug}
                href={`/shop/${category.slug}`}
                className="group relative aspect-square bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <Image
                  src={category.image}
                  alt={getCategoryName(category, language)}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <span className="text-white text-lg font-semibold">{getCategoryName(category, language)}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">{h('featuredProducts')}</h2>
            <Link href="/shop" className="text-primary hover:underline">
              {h('viewAll')}
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} lang={language} />
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{h('whatSetsUsApart')}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">{h('grownTodayDelivered')}</h3>
              <p className="text-white/80">{h('freshProduceNutrients')}</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">{h('localProducts')}</h3>
              <p className="text-white/80">{h('sustainableGroceries')}</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">{h('subscribeSave')}</h3>
              <p className="text-white/80">{h('autopilotDelivery')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            {language === 'tr' ? 'Müşteri Yorumları' : language === 'it' ? 'Recensioni dei Clienti' : 'Customer Reviews'}
          </h2>
          <p className="text-gray-600 text-center mb-12">
            {language === 'tr' ? 'Müşterilerimiz ne diyor' : language === 'it' ? 'Cosa dicono i nostri clienti' : 'What our customers say'}
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-green-50 to-white p-8 rounded-2xl shadow-md relative">
              <div className="absolute -top-4 left-8 text-6xl text-primary/20">"</div>
              <div className="flex gap-1 mb-4">
                {[1,2,3,4,5].map((i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1.5 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1.5 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1.5 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1.5 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1.5 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-6 relative z-10">
                {language === 'tr' ? 'Her Pazartesi sabahı kutumu seçim yaparken çok heyecanlanıyorum. Seçenekler sürekli değişiyor ve mutfakta yeni şeyler denemek için beni motive ediyor.' : 
                 language === 'it' ? 'Ogni lunedì mattina non vedo l\'ora di scegliere cosa mettere nella mia scatola. La selezione cambia ogni settimana e mi motiva a provare cose nuove in cucina.' : 
                 'Every Monday morning I look forward to choosing what goes in my box over coffee. The seasonal produce selection changes every week and keeps me on my toes.'}
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <span className="text-primary font-bold">GP</span>
                </div>
                <div>
                  <p className="font-semibold">{language === 'tr' ? 'Gülsev P.' : language === 'it' ? 'Gülsev P.' : 'Gülsev P.'}</p>
                  <p className="text-sm text-gray-500">{language === 'tr' ? 'Müşteri' : language === 'it' ? 'Cliente' : 'Customer'}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-white p-8 rounded-2xl shadow-md relative">
              <div className="absolute -top-4 left-8 text-6xl text-primary/20">"</div>
              <div className="flex gap-1 mb-4">
                {[1,2,3,4,5].map((i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1.5 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1.5 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1.5 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1.5 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1.5 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-6 relative z-10">
                {language === 'tr' ? 'Ürünler yerel olarak temin ediliyor, bu da seyahat süresini ve israfı azaltıyor. Yerel çiftlikleri ve çiftçileri desteklemek harika bir duygu.' : 
                 language === 'it' ? 'I prodotti sono reperiti localmente, il che riduce i tempi di viaggio e gli sprechi. È fantastico supportare le fattorie e gli agricoltori locali.' : 
                 'I love that the produce is sourced locally, which reduces travel time and waste. It\'s a great way to support local farms and farmers.'}
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <span className="text-primary font-bold">VS</span>
                </div>
                <div>
                  <p className="font-semibold">{language === 'tr' ? 'Volkan S.' : language === 'it' ? 'Volkan S.' : 'Volkan S.'}</p>
                  <p className="text-sm text-gray-500">{language === 'tr' ? 'Müşteri' : language === 'it' ? 'Cliente' : 'Customer'}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-white p-8 rounded-2xl shadow-md relative">
              <div className="absolute -top-4 left-8 text-6xl text-primary/20">"</div>
              <div className="flex gap-1 mb-4">
                {[1,2,3,4,5].map((i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1.5 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1.5 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1.5 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1.5 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1.5 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-6 relative z-10">
                {language === 'tr' ? 'Kutum her Pazartesi geldiğinde önümdeki hafta için neler deneyeceğimi görmek çok heyecan verici! Malzemeleri yeterince seçiyorlar, mutfakta bolca yaratıcılık alanı bırakıyor.' : 
                 language === 'it' ? 'Quando arriva la mia scatola ogni lunedì, sono così eccitato da vedere cosa sperimenterò per la settimana! Curano gli ingredienti giusti, lasciando ampia creatività in cucina.' : 
                 'Every Monday when my box arrives, I get so excited to see what I\'ll be experimenting with for the upcoming week! They curate the ingredients just right, leaving plenty of room for creativity in the kitchen.'}
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <span className="text-primary font-bold">MK</span>
                </div>
                <div>
                  <p className="font-semibold">{language === 'tr' ? 'Mehmet K.' : language === 'it' ? 'Mehmet K.' : 'Mehmet K.'}</p>
                  <p className="text-sm text-gray-500">{language === 'tr' ? 'Müşteri' : language === 'it' ? 'Cliente' : 'Customer'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">{h('freshToInbox')}</h2>
          <p className="text-gray-600 mb-8">{h('signUpNewsletter')}</p>
          <form className="flex gap-4">
            <input
              type="email"
              placeholder={h('emailPlaceholder')}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <button type="submit" className="btn-primary">
              {h('signUp')}
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}

function ProductCard({ product, lang }: { product: typeof products[0]; lang: 'en' | 'it' | 'tr' }) {
  const [added, setAdded] = useState(false)
  const addItem = useCartStore(state => state.addItem)
  const p = (key: string) => t('product', key, lang)

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: getProductName(product, lang),
      price: product.price,
      image: product.image,
      quantity: 1
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <Link href={`/shop/${product.category}/${product.id}`}>
        <div className="relative aspect-square">
          <Image
            src={product.image}
            alt={getProductName(product, lang)}
            fill
            className="object-cover"
          />
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-semibold">{lang === 'tr' ? 'Stokta Yok' : lang === 'it' ? 'Non Disponibile' : 'Out of Stock'}</span>
            </div>
          )}
        </div>
      </Link>
      <div className="p-4">
        <p className="text-xs text-gray-500 mb-1">{getFarmName(product as any, lang)}</p>
        <Link href={`/shop/${product.category}/${product.id}`}>
          <h3 className="font-semibold mb-2 hover:text-primary">{getProductName(product, lang)}</h3>
        </Link>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold">${product.price}</span>
          {product.inStock && (
            <button
              onClick={handleAddToCart}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                added 
                  ? 'bg-green-500 text-white' 
                  : 'bg-primary text-white hover:bg-primary-dark'
              }`}
            >
              {added ? p('addedToCart') : p('addToCart').split(' ')[0]}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}