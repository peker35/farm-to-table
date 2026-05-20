import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { categories } from '@/db/schema'
import { eq } from 'drizzle-orm'

type RouteContext = { params: Promise<{ slug: string }> }

export async function GET(request: NextRequest, { params }: RouteContext) {
  const { slug } = await params
  const item = await db.select().from(categories).where(eq(categories.slug, slug)).limit(1)
  if (!item.length) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(item[0])
}

export async function PUT(request: NextRequest, { params }: RouteContext) {
  const { slug } = await params
  const body = await request.json()
  const updated = await db.update(categories).set(body).where(eq(categories.slug, slug)).returning()
  if (!updated.length) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(updated[0])
}

export async function DELETE(request: NextRequest, { params }: RouteContext) {
  const { slug } = await params
  const deleted = await db.delete(categories).where(eq(categories.slug, slug)).returning()
  if (!deleted.length) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json({ success: true })
}
