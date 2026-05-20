import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { events } from '@/db/schema'
import { eq, desc } from 'drizzle-orm'

export async function GET() {
  const all = await db.select().from(events).orderBy(desc(events.createdAt))
  return NextResponse.json(all)
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const created = await db.insert(events).values({
    titleEn: body.titleEn,
    titleIt: body.titleIt,
    titleTr: body.titleTr,
    descriptionEn: body.descriptionEn,
    descriptionIt: body.descriptionIt,
    descriptionTr: body.descriptionTr,
    date: body.date,
    time: body.time,
    location: body.location,
    price: body.price ? body.price.toString() : null,
    image: body.image,
  }).returning()
  return NextResponse.json(created[0], { status: 201 })
}
