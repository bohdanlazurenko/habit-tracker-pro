import { NextRequest, NextResponse } from 'next/server'
import { Habit, HabitEntry } from '@/lib/types'

// Mock storage for API routes
let habits: Habit[] = []
let entries: HabitEntry[] = []

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const date = searchParams.get('date')
  
  if (date) {
    const dayEntries = entries.filter(e => e.date === date)
    return NextResponse.json({ habits, entries: dayEntries })
  }
  
  return NextResponse.json({ habits, entries })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, data } = body
    
    switch (type) {
      case 'habit':
        const newHabit: Habit = {
          ...data,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
        }
        habits.push(newHabit)
        return NextResponse.json(newHabit)
        
      case 'entry':
        const existingEntry = entries.find(
          e => e.habitId === data.habitId && e.date === data.date
        )
        
        if (existingEntry) {
          const updatedEntries = entries.map(e =>
            e.habitId === data.habitId && e.date === data.date
              ? { ...e, completed: data.completed, completedAt: data.completed ? new Date().toISOString() : undefined }
              : e
          )
          entries = updatedEntries
        } else {
          const newEntry: HabitEntry = {
            ...data,
            id: Date.now().toString(),
            completedAt: data.completed ? new Date().toISOString() : undefined,
          }
          entries.push(newEntry)
        }
        
        return NextResponse.json({ success: true })
        
      default:
        return NextResponse.json({ error: 'Invalid type' }, { status: 400 })
    }
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const habitId = searchParams.get('habitId')
    
    if (habitId) {
      habits = habits.filter(h => h.id !== habitId)
      entries = entries.filter(e => e.habitId !== habitId)
      return NextResponse.json({ success: true })
    }
    
    return NextResponse.json({ error: 'Habit ID required' }, { status: 400 })
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}