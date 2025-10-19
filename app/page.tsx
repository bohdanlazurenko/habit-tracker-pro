'use client'

import { useState, useEffect } from 'react'
import { Plus, Calendar, CheckCircle2 } from 'lucide-react'
import { Habit, HabitEntry } from '@/lib/types'
import { storage } from '@/lib/storage'
import { HabitList } from '@/components/HabitList'
import { HabitForm } from '@/components/HabitForm'
import { CalendarView } from '@/components/Calendar'
import { format, startOfDay } from 'date-fns'

export default function HomePage() {
  const [habits, setHabits] = useState<Habit[]>([])
  const [entries, setEntries] = useState<HabitEntry[]>([])
  const [showForm, setShowForm] = useState(false)
  const [activeTab, setActiveTab] = useState<'today' | 'calendar'>('today')
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null)

  useEffect(() => {
    setHabits(storage.getHabits())
    setEntries(storage.getEntries())
  }, [])

  const saveHabits = (newHabits: Habit[]) => {
    setHabits(newHabits)
    storage.saveHabits(newHabits)
  }

  const saveEntries = (newEntries: HabitEntry[]) => {
    setEntries(newEntries)
    storage.saveEntries(newEntries)
  }

  const handleCreateHabit = (habitData: Omit<Habit, 'id' | 'createdAt'>) => {
    const newHabit: Habit = {
      ...habitData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    }
    saveHabits([...habits, newHabit])
    setShowForm(false)
  }

  const handleUpdateHabit = (habitData: Omit<Habit, 'id' | 'createdAt'>) => {
    if (!editingHabit) return
    const updatedHabits = habits.map(h => 
      h.id === editingHabit.id 
        ? { ...h, ...habitData }
        : h
    )
    saveHabits(updatedHabits)
    setEditingHabit(null)
    setShowForm(false)
  }

  const handleDeleteHabit = (id: string) => {
    const updatedHabits = habits.filter(h => h.id !== id)
    const updatedEntries = entries.filter(e => e.habitId !== id)
    saveHabits(updatedHabits)
    saveEntries(updatedEntries)
  }

  const handleEditHabit = (habit: Habit) => {
    setEditingHabit(habit)
    setShowForm(true)
  }

  const toggleHabitEntry = (habitId: string, date: string) => {
    const existingEntry = entries.find(
      e => e.habitId === habitId && e.date === date
    )

    let newEntries: HabitEntry[]
    if (existingEntry) {
      newEntries = entries.map(e =>
        e.habitId === habitId && e.date === date
          ? { ...e, completed: !e.completed, completedAt: !e.completed ? new Date().toISOString() : undefined }
          : e
      )
    } else {
      const newEntry: HabitEntry = {
        id: Date.now().toString(),
        habitId,
        date,
        completed: true,
        completedAt: new Date().toISOString(),
      }
      newEntries = [...entries, newEntry]
    }

    saveEntries(newEntries)
  }

  const today = format(new Date(), 'yyyy-MM-dd')
  const todayEntries = entries.filter(e => e.date === today)
  const completedToday = todayEntries.filter(e => e.completed).length

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Habit Tracker Pro
          </h1>
          <p className="text-gray-600">
            Build better habits, one day at a time
          </p>
        </header>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <span className="text-lg font-semibold text-gray-900">
                Today's Progress
              </span>
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {completedToday}/{habits.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${habits.length > 0 ? (completedToday / habits.length) * 100 : 0}%` }}
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('today')}
                className={`py-3 px-6 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'today'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Today's Habits
              </button>
              <button
                onClick={() => setActiveTab('calendar')}
                className={`py-3 px-6 border-b-2 font-medium text-sm transition-colors flex items-center gap-2 ${
                  activeTab === 'calendar'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Calendar className="w-4 h-4" />
                Calendar View
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'today' ? (
              <HabitList
                habits={habits}
                entries={entries}
                onToggle={toggleHabitEntry}
                onEdit={handleEditHabit}
                onDelete={handleDeleteHabit}
                date={today}
              />
            ) : (
              <CalendarView
                habits={habits}
                entries={entries}
                onToggle={toggleHabitEntry}
              />
            )}
          </div>
        </div>

        <button
          onClick={() => {
            setEditingHabit(null)
            setShowForm(true)
          }}
          className="fixed bottom-6 right-6 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-6 h-6" />
        </button>

        {showForm && (
          <HabitForm
            habit={editingHabit}
            onSubmit={editingHabit ? handleUpdateHabit : handleCreateHabit}
            onCancel={() => {
              setShowForm(false)
              setEditingHabit(null)
            }}
          />
        )}
      </div>
    </div>
  )
}