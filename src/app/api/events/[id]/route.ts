import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { events } from '@/db/schema'
import { eq } from 'drizzle-orm'

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const item = await db.select().from(events).where(eq(events.id, parseInt(params.id))).limit(1)
  if (!item.length) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(item[0])
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const body = await request.json()
  const data: Record<string, any> = {}
  if (body.titleEn !== undefined) data.titleEn = body.titleEn
  if (body.titleIt !== undefined) data.titleIt = body.titleIt
  if (body.titleTr !== undefined) data.titleTr = body.titleTr
  if (body.descriptionEn !== undefined) data.descriptionEn = body.descriptionEn
  if (body.descriptionIt !== undefined) data.descriptionIt = body.descriptionIt
  if (body.descriptionTr !== undefined) data.descriptionTr = body.descriptionTr
  if (body.date !== undefined) data.date = body.date
  if (body.time !== undefined) data.time = body.time
  if (body.location !== undefined) data.location = body.location
  if (body.price !== undefined) data.price = body.price ? body.price.toString() : null
  if (body.image !== undefined) data.image = body.image

  const updated = await db.update(events).set(data).where(eq(events.id, parseInt(params.id))).returning()
  if (!updated.length) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(updated[0])
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const deleted = await db.delete(events).where(eq(events.id, parseInt(params.id))).returning()
  if (!deleted.length) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json({ success: true })
}
