import { pgTable, serial, text, integer, decimal, boolean, timestamp } from 'drizzle-orm/pg-core'

export const categories = pgTable('categories', {
  slug: text('slug').primaryKey(),
  nameEn: text('name_en').notNull(),
  nameIt: text('name_it').notNull(),
  nameTr: text('name_tr').notNull(),
  image: text('image').notNull(),
})

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  nameEn: text('name_en').notNull(),
  nameIt: text('name_it').notNull(),
  nameTr: text('name_tr').notNull(),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  category: text('category').notNull().references(() => categories.slug),
  farmEn: text('farm_en').notNull(),
  farmIt: text('farm_it').notNull(),
  farmTr: text('farm_tr').notNull(),
  image: text('image').notNull(),
  inStock: boolean('in_stock').notNull().default(true),
})

export const farms = pgTable('farms', {
  id: serial('id').primaryKey(),
  nameEn: text('name_en').notNull(),
  nameIt: text('name_it').notNull(),
  nameTr: text('name_tr').notNull(),
  locationEn: text('location_en').notNull(),
  locationIt: text('location_it').notNull(),
  locationTr: text('location_tr').notNull(),
  descriptionEn: text('description_en').notNull(),
  descriptionIt: text('description_it').notNull(),
  descriptionTr: text('description_tr').notNull(),
  image: text('image').notNull(),
})

export const events = pgTable('events', {
  id: serial('id').primaryKey(),
  titleEn: text('title_en').notNull(),
  titleIt: text('title_it').notNull(),
  titleTr: text('title_tr').notNull(),
  descriptionEn: text('description_en').notNull(),
  descriptionIt: text('description_it').notNull(),
  descriptionTr: text('description_tr').notNull(),
  date: text('date').notNull(),
  time: text('time').notNull(),
  location: text('location').notNull(),
  price: decimal('price', { precision: 10, scale: 2 }),
  image: text('image').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
})

export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  customer: text('customer').notNull(),
  email: text('email').notNull(),
  phone: text('phone').notNull(),
  address: text('address').notNull(),
  items: text('items').notNull(),
  total: decimal('total', { precision: 10, scale: 2 }).notNull(),
  status: text('status').notNull().default('Pending'),
  date: text('date').notNull(),
})

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: text('email').notNull().unique(),
  name: text('name').notNull(),
  password: text('password').notNull(),
  role: text('role').notNull().default('user'),
  zipCode: text('zip_code'),
  status: text('status').notNull().default('Active'),
  orders: integer('orders').default(0),
  totalSpent: decimal('total_spent', { precision: 10, scale: 2 }).default('0'),
  joinDate: text('join_date'),
  phone: text('phone'),
})
