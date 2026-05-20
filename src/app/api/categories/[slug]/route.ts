import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { categories } from '@/db/schema'
import { eq } from 'drizzle-orm'

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  const item = await db.select().from(categories).where(eq(categories.slug, params.slug)).limit(1)
  if (!item.length) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(item[0])
}

export async function PUT(request: NextRequest, { params }: { params: { slug: string } }) {
  const body = await request.json()
  const updated = await db.update(categories).set(body).where(eq(categories.slug, params.slug)).returning()
  if (!updated.length) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(updated[0])
}

export async function DELETE(request: NextRequest, { params }: { params: { slug: string } }) {
  const deleted = await db.delete(categories).where(eq(categories.slug, params.slug)).returning()
  if (!deleted.length) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json({ success: true })
}
