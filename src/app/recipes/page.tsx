'use client'

import Image from 'next/image'
import Link from 'next/link'

const recipes = [
  {
    id: 1,
    title: 'Spring Asparagus Salad',
    description: 'Fresh asparagus with lemon vinaigrette and parmesan',
    time: '15 min',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400',
    category: 'Salad'
  },
  {
    id: 2,
    title: 'Roasted Chicken with Herbs',
    description: 'Classic farm-raised chicken with rosemary and thyme',
    time: '1 hr 30 min',
    image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400',
    category: 'Main Course'
  },
  {
    id: 3,
    title: 'Garden Vegetable Soup',
    description: 'Hearty soup with seasonal root vegetables',
    time: '45 min',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744ac0?w=400',
    category: 'Soup'
  },
  {
    id: 4,
    title: 'Sourdough Bread',
    description: 'Artisan sourdough with a crispy crust',
    time: '24 hr',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400',
    category: 'Bread'
  },
  {
    id: 5,
    title: 'Farm Fresh Frittata',
    description: 'Egg frittata with garden vegetables and cheese',
    time: '25 min',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400',
    category: 'Breakfast'
  },
  {
    id: 6,
    title: 'Berry Smoothie Bowl',
    description: 'Antioxidant-rich smoothie with fresh berries',
    time: '10 min',
    image: 'https://images.unsplash.com/photo-1511690656952-34342d2c2836?w=400',
    category: 'Breakfast'
  }
]

export default function RecipesPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-primary text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Recipes</h1>
          <p className="text-xl opacity-90">
            Delicious recipes using seasonal ingredients from our farms.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recipes.map((recipe) => (
            <article key={recipe.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <Link href={`/recipes/${recipe.id}`}>
                <div className="relative h-48">
                  <Image
                    src={recipe.image}
                    alt={recipe.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 px-3 py-1 rounded-full text-xs font-medium">
                    {recipe.category}
                  </div>
                </div>
                <div className="p-6">
                  <h2 className="text-lg font-bold mb-2 hover:text-primary">
                    {recipe.title}
                  </h2>
                  <p className="text-gray-600 text-sm mb-3">{recipe.description}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{recipe.time}</span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-6">Want to share your recipe?</h2>
          <p className="text-gray-600 mb-6">
            Have a recipe you&apos;d like to share? We&apos;d love to hear from you!
          </p>
          <Link href="/contact" className="btn-primary">
            Submit a Recipe
          </Link>
        </div>
      </div>
    </div>
  )
}