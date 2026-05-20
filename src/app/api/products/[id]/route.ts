import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { products } from '@/db/schema'
import { eq } from 'drizzle-orm'

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const item = await db.select().from(products).where(eq(products.id, parseInt(params.id))).limit(1)
  if (!item.length) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(item[0])
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const body = await request.json()
  const data: Record<string, any> = {}
  if (body.nameEn !== undefined) data.nameEn = body.nameEn
  if (body.nameIt !== undefined) data.nameIt = body.nameIt
  if (body.nameTr !== undefined) data.nameTr = body.nameTr
  if (body.price !== undefined) data.price = body.price.toString()
  if (body.category !== undefined) data.category = body.category
  if (body.farmEn !== undefined) data.farmEn = body.farmEn
  if (body.farmIt !== undefined) data.farmIt = body.farmIt
  if (body.farmTr !== undefined) data.farmTr = body.farmTr
  if (body.image !== undefined) data.image = body.image
  if (body.inStock !== undefined) data.inStock = body.inStock

  const updated = await db.update(products).set(data).where(eq(products.id, parseInt(params.id))).returning()
  if (!updated.length) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(updated[0])
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const deleted = await db.delete(products).where(eq(products.id, parseInt(params.id))).returning()
  if (!deleted.length) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json({ success: true })
}
