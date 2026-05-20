import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { orders } from '@/db/schema'
import { eq } from 'drizzle-orm'

export async function GET() {
  const all = await db.select().from(orders).orderBy(orders.id)
  return NextResponse.json(all)
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const created = await db.insert(orders).values({
    customer: body.customer,
    email: body.email,
    phone: body.phone,
    address: body.address,
    items: JSON.stringify(body.items),
    total: body.total.toString(),
    status: body.status || 'Pending',
    date: body.date || new Date().toISOString().split('T')[0],
  }).returning()
  return NextResponse.json(created[0], { status: 201 })
}
