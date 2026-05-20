import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { categories } from '@/db/schema'
import { eq } from 'drizzle-orm'

export async function GET() {
  const all = await db.select().from(categories).orderBy(categories.slug)
  return NextResponse.json(all)
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const created = await db.insert(categories).values({
    slug: body.slug,
    nameEn: body.nameEn,
    nameIt: body.nameIt,
    nameTr: body.nameTr,
    image: body.image,
  }).returning()
  return NextResponse.json(created[0], { status: 201 })
}
