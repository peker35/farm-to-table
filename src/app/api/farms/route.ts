import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { farms } from '@/db/schema'
import { eq } from 'drizzle-orm'

export async function GET() {
  const all = await db.select().from(farms).orderBy(farms.id)
  return NextResponse.json(all)
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const created = await db.insert(farms).values({
    nameEn: body.nameEn,
    nameIt: body.nameIt,
    nameTr: body.nameTr,
    locationEn: body.locationEn,
    locationIt: body.locationIt,
    locationTr: body.locationTr,
    descriptionEn: body.descriptionEn,
    descriptionIt: body.descriptionIt,
    descriptionTr: body.descriptionTr,
    image: body.image,
  }).returning()
  return NextResponse.json(created[0], { status: 201 })
}
