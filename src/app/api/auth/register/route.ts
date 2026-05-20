import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { users } from '@/db/schema'
import { eq } from 'drizzle-orm'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  const { name, email, password, zipCode } = await request.json()

  if (!name || !email || !password) {
    return NextResponse.json({ error: 'Name, email and password required' }, { status: 400 })
  }

  const existing = await db.select().from(users).where(eq(users.email, email)).limit(1)
  if (existing.length > 0) {
    return NextResponse.json({ error: 'Email already registered' }, { status: 409 })
  }

  const hashed = await bcrypt.hash(password, 12)
  const created = await db.insert(users).values({
    name,
    email,
    password: hashed,
    zipCode: zipCode || null,
    role: 'user',
    joinDate: new Date().toISOString().split('T')[0],
  }).returning()

  const { password: _, ...safeUser } = created[0]
  return NextResponse.json({ user: safeUser }, { status: 201 })
}
