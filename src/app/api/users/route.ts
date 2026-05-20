import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { users } from '@/db/schema'
import { eq } from 'drizzle-orm'

export async function GET() {
  const all = await db.select().from(users).orderBy(users.id)
  return NextResponse.json(all)
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const created = await db.insert(users).values({
    email: body.email,
    name: body.name,
    password: body.password,
    zipCode: body.zipCode || null,
    phone: body.phone || null,
    joinDate: body.joinDate || new Date().toISOString().split('T')[0],
  }).returning()
  return NextResponse.json(created[0], { status: 201 })
}
