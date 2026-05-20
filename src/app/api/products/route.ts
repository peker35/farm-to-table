import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { products, categories } from '@/db/schema'
import { eq } from 'drizzle-orm'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const category = searchParams.get('category')
  const query = db.select().from(products).orderBy(products.id)
  if (category) {
    query.where(eq(products.category, category))
  }
  const all = await query
  return NextResponse.json(all)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const created = await db.insert(products).values({
      nameEn: body.nameEn,
      nameIt: body.nameIt,
      nameTr: body.nameTr,
      price: body.price.toString(),
      category: body.category,
      farmEn: body.farmEn,
      farmIt: body.farmIt,
      farmTr: body.farmTr,
      image: body.image,
      inStock: body.inStock,
    }).returning()
    return NextResponse.json(created[0], { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
