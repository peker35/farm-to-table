import { config } from 'dotenv'
config({ path: '.env.local' })
import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import bcrypt from 'bcryptjs'
import * as schema from './schema'
import { categories as seedCategories, products as seedProducts, farms as seedFarms } from '../data/products'

const sql = neon(process.env.DATABASE_URL!)
const db = drizzle(sql, { schema })

async function seed() {
  console.log('Seeding categories...')
  for (const cat of seedCategories) {
    await db.insert(schema.categories).values({
      slug: cat.slug,
      nameEn: cat.nameEn,
      nameIt: cat.nameIt,
      nameTr: cat.nameTr,
      image: cat.image,
    }).onConflictDoNothing()
  }

  console.log('Seeding products...')
  for (const prod of seedProducts) {
    await db.insert(schema.products).values({
      id: prod.id,
      nameEn: prod.nameEn,
      nameIt: prod.nameIt,
      nameTr: prod.nameTr,
      price: prod.price.toString(),
      category: prod.category,
      farmEn: prod.farmEn,
      farmIt: prod.farmIt,
      farmTr: prod.farmTr,
      image: prod.image,
      inStock: prod.inStock,
    }).onConflictDoNothing()
  }

  console.log('Seeding farms...')
  for (const farm of seedFarms) {
    await db.insert(schema.farms).values({
      id: farm.id,
      nameEn: farm.nameEn,
      nameIt: farm.nameIt,
      nameTr: farm.nameTr,
      locationEn: farm.locationEn,
      locationIt: farm.locationIt,
      locationTr: farm.locationTr,
      descriptionEn: farm.descriptionEn,
      descriptionIt: farm.descriptionIt,
      descriptionTr: farm.descriptionTr,
      image: farm.image,
    }).onConflictDoNothing()
  }

  console.log('Seeding events...')
  const initialEvents = [
    {
      titleEn: 'Farm Tour', titleIt: 'Tour della Fattoria', titleTr: 'Çiftlik Turu',
      descriptionEn: 'Visit our farm and see the production process.',
      descriptionIt: 'Visitate la nostra fattoria e vedete il processo.',
      descriptionTr: 'Çiftliğimizi ziyaret edin ve üretim sürecini görün.',
      date: '2026-04-25', time: '10:00', location: 'Hilltop Farm',
      price: '25', image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=400',
    },
    {
      titleEn: 'Bread Making Workshop', titleIt: 'Corso di Panificazione', titleTr: 'Ekmek Yapım Atölyesi',
      descriptionEn: 'Learn to make bread with our expert bakers.',
      descriptionIt: 'Imparate a fare il pane con i nostri panettieri.',
      descriptionTr: 'Uzman fırıncılarımızla ekmek yapmayı öğrenin.',
      date: '2026-05-02', time: '14:00', location: 'She Wolf Bakery',
      price: '45', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400',
    },
    {
      titleEn: 'Organic Monday', titleIt: 'Lunedì Biologico', titleTr: 'Organik Pazartesi',
      descriptionEn: '20% off on organic products every Monday!',
      descriptionIt: '20% di sconto sui prodotti biologici ogni lunedì!',
      descriptionTr: 'Her Pazartesi organik ürünlerde %20 indirim!',
      date: '2026-05-05', time: '09:00', location: 'All Stores',
      price: null, image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400',
    },
    {
      titleEn: 'Cooking Class', titleIt: 'Corso di Cucina', titleTr: 'Yemek Pişirme Kursu',
      descriptionEn: 'Cook delicious meals with local ingredients.',
      descriptionIt: 'Cucinate pasti deliziosi con ingredienti locali.',
      descriptionTr: 'Yerel malzemelerle lezzetli yemekler pişirin.',
      date: '2026-05-10', time: '18:00', location: 'Farm Kitchen',
      price: '65', image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400',
    },
    {
      titleEn: 'Local Producers Market', titleIt: 'Mercato dei Produttori Locali', titleTr: 'Yerel Üretici Pazarı',
      descriptionEn: 'Meet local producers and discover their products.',
      descriptionIt: 'Incontrare i produttori locali e scoprire i loro prodotti.',
      descriptionTr: 'Yerel üreticilerle tanışın ve ürünlerini keşfedin.',
      date: '2026-05-15', time: '10:00', location: 'Brooklyn Venue',
      price: null, image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=400',
    },
  ]
  for (const event of initialEvents) {
    await db.insert(schema.events).values(event).onConflictDoNothing()
  }

  console.log('Seeding orders...')
  const initialOrders = [
    { customer: 'John Doe', email: 'john@example.com', phone: '555-0101', address: '123 Main St, NY', items: JSON.stringify([{ name: 'Heirloom Tomatoes', quantity: 2, price: 6.99 }, { name: 'Fresh Eggs', quantity: 1, price: 7.99 }]), total: '21.97', status: 'Pending', date: '2026-01-15' },
    { customer: 'Jane Smith', email: 'jane@example.com', phone: '555-0102', address: '456 Oak Ave, NY', items: JSON.stringify([{ name: 'Mixed Baby Greens', quantity: 3, price: 5.99 }]), total: '17.97', status: 'Processing', date: '2026-01-15' },
    { customer: 'Mike Johnson', email: 'mike@example.com', phone: '555-0103', address: '789 Pine Rd, NY', items: JSON.stringify([{ name: 'Grass-Fed Ground Beef', quantity: 2, price: 12.99 }]), total: '25.98', status: 'Shipped', date: '2026-01-14' },
    { customer: 'Sarah Wilson', email: 'sarah@example.com', phone: '555-0104', address: '321 Elm St, NY', items: JSON.stringify([{ name: 'Artisan Sourdough', quantity: 1, price: 8.99 }, { name: 'Organic Carrots', quantity: 2, price: 4.99 }]), total: '18.97', status: 'Delivered', date: '2026-01-14' },
    { customer: 'Tom Brown', email: 'tom@example.com', phone: '555-0105', address: '654 Maple Dr, NY', items: JSON.stringify([{ name: 'Raw Honey', quantity: 2, price: 14.99 }]), total: '29.98', status: 'Cancelled', date: '2026-01-13' },
  ]
  for (const order of initialOrders) {
    await db.insert(schema.orders).values(order).onConflictDoNothing()
  }

  console.log('Seeding users...')
  const defaultPassword = await bcrypt.hash('123456', 12)
  const adminPassword = await bcrypt.hash('Admin123!', 12)
  const initialUsers = [
    { email: 'admin@f2p.com', name: 'Admin User', password: adminPassword, role: 'admin', zipCode: '10001', phone: '555-0000', status: 'Active', orders: 0, totalSpent: '0', joinDate: '2026-01-01' },
    { email: 'john@example.com', name: 'John Doe', password: defaultPassword, role: 'user', zipCode: '10001', phone: '555-0101', status: 'Active', orders: 12, totalSpent: '456.78', joinDate: '2023-06-15' },
    { email: 'jane@example.com', name: 'Jane Smith', password: defaultPassword, role: 'user', zipCode: '10002', phone: '555-0102', status: 'Active', orders: 8, totalSpent: '234.50', joinDate: '2023-07-20' },
    { email: 'mike@example.com', name: 'Mike Johnson', password: defaultPassword, role: 'user', zipCode: '10003', phone: '555-0103', status: 'Active', orders: 24, totalSpent: '890.25', joinDate: '2023-03-10' },
    { email: 'sarah@example.com', name: 'Sarah Wilson', password: defaultPassword, role: 'user', zipCode: '10004', phone: '555-0104', status: 'Active', orders: 5, totalSpent: '123.45', joinDate: '2023-09-05' },
    { email: 'tom@example.com', name: 'Tom Brown', password: defaultPassword, role: 'user', zipCode: '10005', phone: '555-0105', status: 'Inactive', orders: 0, totalSpent: '0', joinDate: '2024-01-01' },
    { email: 'emily@example.com', name: 'Emily Davis', password: defaultPassword, role: 'user', zipCode: '10006', phone: '555-0106', status: 'Active', orders: 15, totalSpent: '567.89', joinDate: '2023-05-22' },
  ]
  for (const user of initialUsers) {
    await db.insert(schema.users).values(user).onConflictDoNothing()
  }

  console.log('Seed complete!')
}

seed().catch(console.error)
