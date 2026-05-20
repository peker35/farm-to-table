import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { farms } from '@/db/schema'
import { eq } from 'drizzle-orm'

type RouteContext = { params: Promise<{ id: string }> }

export async function GET(request: NextRequest, { params }: RouteContext) {
  const { id } = await params
  const item = await db.select().from(farms).where(eq(farms.id, parseInt(id))).limit(1)
  if (!item.length) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(item[0])
}

export async function PUT(request: NextRequest, { params }: RouteContext) {
  const { id } = await params
  const body = await request.json()
  const updated = await db.update(farms).set(body).where(eq(farms.id, parseInt(id))).returning()
  if (!updated.length) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(updated[0])
}

export async function DELETE(request: NextRequest, { params }: RouteContext) {
  const { id } = await params
  const deleted = await db.delete(farms).where(eq(farms.id, parseInt(id))).returning()
  if (!deleted.length) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json({ success: true })
}
