'use client'

import Image from 'next/image'
import { farms } from '@/data/products'

export default function ProducersPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-primary text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Our Producers</h1>
          <p className="text-xl opacity-90">
            Meet the farmers and makers who bring fresh, local products to your table.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          {farms.map((farm) => (
            <div key={farm.id} className="bg-white rounded-xl overflow-hidden shadow-md">
              <div className="relative h-64">
                <Image
                  src={farm.image}
                  alt={farm.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2">{farm.name}</h2>
                <p className="text-primary font-medium mb-2">{farm.location}</p>
                <p className="text-gray-600">{farm.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gray-50 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Become a Producer</h2>
          <p className="text-gray-600 mb-6">
            Are you a local farmer or artisan interested in selling your products?
          </p>
          <a
            href="https://farmtopeople.typeform.com/to/slkLxSmU"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-block"
          >
            Apply Now
          </a>
        </div>
      </div>
    </div>
  )
}