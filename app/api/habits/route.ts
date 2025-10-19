import { NextRequest, NextResponse } from 'next/server'
import { Habit } from '@/lib/types'

let habits: Habit[] = [
  {
    id: '1',
    name: 'Morning Exercise',
    description: '30 minutes of physical activity',
    createdAt: new Date('2024-01-01').toISOString(),
    completedDates: ['2024-01-01', '2024-01-02'],
    color: '#3b82f6',
    icon: 'activity',
  },
  {
    id: '2',
    name: 'Read for 20 minutes',
    description: 'Read a book or article',
    createdAt: new Date('2024-01-01').toISOString(),
    completedDates: ['2024-01-01'],
    color: '#10b981',
    icon: 'book-open',
  },
]

export async function GET() {
  return NextResponse.json(habits)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, description, color, icon } = body

    if (!name) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      )
    }

    const newHabit: Habit = {
      id: Date.now().toString(),
      name,
      description: description || '',
      createdAt: new Date().toISOString(),
      completedDates: [],
      color: color || '#3b82f6',
      icon: icon || 'check-circle',
    }

    habits.push(newHabit)
    return NextResponse.json(newHabit, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    )
  }
}