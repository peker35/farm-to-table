'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useLanguageStore } from '@/store/language'
import { t } from '@/data/translations'

interface Recipe {
  id: number
  titleEn: string
  titleIt: string
  titleTr: string
  descriptionEn: string
  descriptionIt: string
  descriptionTr: string
  timeEn: string
  timeIt: string
  timeTr: string
  image: string
  categoryEn: string
  categoryIt: string
  categoryTr: string
}

const recipes: Recipe[] = [
  { id: 1, titleEn: 'Spring Asparagus Salad', titleIt: 'Insalata di Asparagi', titleTr: 'Kuşkonmaz Salatası', descriptionEn: 'Fresh asparagus with lemon vinaigrette', descriptionIt: 'Asparagi freschi con vinaigrette', descriptionTr: 'Limonlu kuşkonmaz salatası', timeEn: '15 min', timeIt: '15 min', timeTr: '15 dk', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400', categoryEn: 'Salad', categoryIt: 'Insalata', categoryTr: 'Salata' },
  { id: 2, titleEn: 'Roasted Chicken with Herbs', titleIt: 'Pollo Arrosto alle Erbe', titleTr: 'Otlu Tavuk Kızartma', descriptionEn: 'Classic farm-raised chicken with rosemary', descriptionIt: 'Pollo classico con rosmarino', descriptionTr: 'Biberiye ile klasik tavuk', timeEn: '1 hr 30 min', timeIt: '1 ora e 30 min', timeTr: '1 saat 30 dk', image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400', categoryEn: 'Main Course', categoryIt: 'Primo', categoryTr: 'Ana Yemek' },
  { id: 3, titleEn: 'Garden Vegetable Soup', titleIt: 'Zuppa di Verdure', titleTr: 'Bahçe Sebze Çorbası', descriptionEn: 'Hearty soup with seasonal root vegetables', descriptionIt: 'Zuppa sostanziosa con verdure', descriptionTr: 'Mevsim sebzeleri ile doyurucu çorba', timeEn: '45 min', timeIt: '45 min', timeTr: '45 dk', image: 'https://images.unsplash.com/photo-1547592166-23ac45744ac0?w=400', categoryEn: 'Soup', categoryIt: 'Zuppa', categoryTr: 'Çorba' },
  { id: 4, titleEn: 'Sourdough Bread', titleIt: 'Pane a Lievitazione Naturale', titleTr: 'Ekşi Mayalı Ekmek', descriptionEn: 'Artisan sourdough with a crispy crust', descriptionIt: 'Pane artigianale croccante', descriptionTr: 'Çıtır kabuklu zanaatkar ekmeği', timeEn: '24 hr', timeIt: '24 ore', timeTr: '24 saat', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400', categoryEn: 'Bread', categoryIt: 'Pane', categoryTr: 'Ekmek' },
  { id: 5, titleEn: 'Farm Fresh Frittata', titleIt: 'Frittata Fresca', titleTr: 'Çiftlik Omleti', descriptionEn: 'Egg frittata with garden vegetables', descriptionIt: 'Frittata con verdure', descriptionTr: 'Bahçe sebzeli yumurta', timeEn: '25 min', timeIt: '25 min', timeTr: '25 dk', image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400', categoryEn: 'Breakfast', categoryIt: 'Colazione', categoryTr: 'Kahvaltı' },
  { id: 6, titleEn: 'Berry Smoothie Bowl', titleIt: 'Bowls di Frutti di Bosco', titleTr: 'Yaban Mersinli Kase', descriptionEn: 'Antioxidant-rich smoothie with fresh berries', descriptionIt: 'Frullato ricco di antiossidanti', descriptionTr: 'Taze meyveli antioksidan smoothie', timeEn: '10 min', timeIt: '10 min', timeTr: '10 dk', image: 'https://images.unsplash.com/photo-1511690656952-34342d2c2836?w=400', categoryEn: 'Breakfast', categoryIt: 'Colazione', categoryTr: 'Kahvaltı' },
]

export default function RecipesPage() {
  const { language } = useLanguageStore()
  const tr = (section: string, key: string) => t(section as any, key, language)

  const g = (item: Recipe, field: string) => {
    if (language === 'tr' && (item as any)[field + 'Tr']) return (item as any)[field + 'Tr']
    if (language === 'it' && (item as any)[field + 'It']) return (item as any)[field + 'It']
    return (item as any)[field + 'En']
  }

  return (
    <div className="pt-20">
      <section className="bg-primary text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">{tr('recipes', 'title')}</h1>
          <p className="text-xl opacity-90">{tr('recipes', 'subtitle')}</p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recipes.map((recipe) => (
            <article key={recipe.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <Link href={`/recipes/${recipe.id}`}>
                <div className="relative h-48">
                  <Image src={recipe.image} alt={g(recipe, 'title')} fill className="object-cover" />
                  <div className="absolute top-3 left-3 bg-white/90 px-3 py-1 rounded-full text-xs font-medium">{g(recipe, 'category')}</div>
                </div>
                <div className="p-6">
                  <h2 className="text-lg font-bold mb-2 hover:text-primary">{g(recipe, 'title')}</h2>
                  <p className="text-gray-600 text-sm mb-3">{g(recipe, 'description')}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{g(recipe, 'time')} {tr('recipes', 'min')}</span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-6">{tr('recipes', 'shareRecipe')}</h2>
          <p className="text-gray-600 mb-6">{tr('recipes', 'subtitle')}</p>
          <Link href="/contact" className="btn-primary">{tr('recipes', 'submitRecipe')}</Link>
        </div>
      </div>
    </div>
  )
}
