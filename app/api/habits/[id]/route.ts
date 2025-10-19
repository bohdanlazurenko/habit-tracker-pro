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

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const body = await request.json()
    const { name, description, color, icon, completedDates } = body

    const habitIndex = habits.findIndex(h => h.id === id)
    if (habitIndex === -1) {
      return NextResponse.json(
        { error: 'Habit not found' },
        { status: 404 }
      )
    }

    const updatedHabit: Habit = {
      ...habits[habitIndex],
      ...(name !== undefined && { name }),
      ...(description !== undefined && { description }),
      ...(color !== undefined && { color }),
      ...(icon !== undefined && { icon }),
      ...(completedDates !== undefined && { completedDates }),
    }

    habits[habitIndex] = updatedHabit
    return NextResponse.json(updatedHabit)
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params
  const habitIndex = habits.findIndex(h => h.id === id)
  
  if (habitIndex === -1) {
    return NextResponse.json(
      { error: 'Habit not found' },
      { status: 404 }
    )
  }

  habits.splice(habitIndex, 1)
  return NextResponse.json({ message: 'Habit deleted successfully' })
}