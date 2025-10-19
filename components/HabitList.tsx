'use client'

import { useState, useEffect } from 'react'
import { Habit } from '@/lib/types'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { formatDisplayDate, getStreakCount, getCompletionRate } from '@/lib/utils'
import { Plus, Trash2, Edit2, Check, X, Activity, BookOpen, Coffee, Dumbbell, Heart, Moon, Sun, Target, Zap } from 'lucide-react'

const ICONS = {
  activity: Activity,
  'book-open': BookOpen,
  coffee: Coffee,
  dumbbell: Dumbbell,
  heart: Heart,
  moon: Moon,
  sun: Sun,
  target: Target,
  zap: Zap,
  'check-circle': Check,
}

const COLORS = [
  '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6',
  '#ec4899', '#06b6d4', '#84cc16', '#f97316', '#6366f1'
]

export function HabitList() {
  const [habits, setHabits] = useState<Habit[]>([])
  const [newHabitName, setNewHabitName] = useState('')
  const [newHabitDescription, setNewHabitDescription] = useState('')
  const [newHabitColor, setNewHabitColor] = useState('#3b82f6')
  const [newHabitIcon, setNewHabitIcon] = useState('check-circle')
  const [isAddingHabit, setIsAddingHabit] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editName, setEditName] = useState('')
  const [editDescription, setEditDescription] = useState('')
  const [today] = useState(new Date().toISOString().split('T')[0])

  useEffect(() => {
    fetchHabits()
  }, [])

  const fetchHabits = async () => {
    try {
      const response = await fetch('/api/habits')
      if (response.ok) {
        const data = await response.json()
        setHabits(data)
      }
    } catch (error) {
      console.error('Failed to fetch habits:', error)
    }
  }

  const addHabit = async () => {
    if (!newHabitName.trim()) return

    try {
      const response = await fetch('/api/habits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newHabitName,
          description: newHabitDescription,
          color: newHabitColor,
          icon: newHabitIcon,
        }),
      })

      if (response.ok) {
        const newHabit = await response.json()
        setHabits([...habits, newHabit])
        setNewHabitName('')
        setNewHabitDescription('')
        setNewHabitColor('#3b82f6')
        setNewHabitIcon('check-circle')
        setIsAddingHabit(false)
      }
    } catch (error) {
      console.error('Failed to add habit:', error)
    }
  }

  const deleteHabit = async (id: string) => {
    try {
      const response = await fetch(`/api/habits/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setHabits(habits.filter(h => h.id !== id))
      }
    } catch (error) {
      console.error('Failed to delete habit:', error)
    }
  }

  const updateHabit = async (id: string) => {
    try {
      const response = await fetch(`/api/habits/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: editName,
          description: editDescription,
        }),
      })

      if (response.ok) {
        const updatedHabit = await response.json()
        setHabits(habits.map(h => h.id === id ? updatedHabit : h))
        setEditingId(null)
        setEditName('')
        setEditDescription('')
      }
    } catch (error) {
      console.error('Failed to update habit:', error)
    }
  }

  const toggleHabitCompletion = async (id: string) => {
    const habit = habits.find(h => h.id === id)
    if (!habit) return

    const isCompletedToday = habit.completedDates.includes(today)
    const updatedCompletedDates = isCompletedToday
      ? habit.completedDates.filter(d => d !== today)
      : [...habit.completedDates, today]

    try {
      const response = await fetch(`/api/habits/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          completedDates: updatedCompletedDates,
        }),
      })

      if (response.ok) {
        const updatedHabit = await response.json()
        setHabits(habits.map(h => h.id === id ? updatedHabit : h))
      }
    } catch (error) {
      console.error('Failed to toggle habit completion:', error)
    }
  }

  const startEditing = (habit: Habit) => {
    setEditingId(habit.id)
    setEditName(habit.name)
    setEditDescription(habit.description)
  }

  const cancelEditing = () => {
    setEditingId(null)
    setEditName('')
    setEditDescription('')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">My Habits</h2>
        <Button
          onClick={() => setIsAddingHabit(true)}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Habit
        </Button>
      </div>

      {isAddingHabit && (
        <div className="bg-card p-6 rounded-lg border space-y-4">
          <h3 className="text-lg font-semibold">Create New Habit</h3>
          <Input
            placeholder="Habit name"
            value={newHabitName}
            onChange={(e) => setNewHabitName(e.target.value)}
            className="w-full"
          />
          <Input
            placeholder="Description (optional)"
            value={newHabitDescription}
            onChange={(e) => setNewHabitDescription(e.target.value)}
            className="w-full"
          />
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">Color</label>
              <div className="flex gap-2 flex-wrap">
                {COLORS.map(color => (
                  <button
                    key={color}
                    onClick={() => setNewHabitColor(color)}
                    className="w-8 h-8 rounded-md border-2 transition-all"
                    style={{
                      backgroundColor: color,
                      borderColor: newHabitColor === color ? '#1f2937' : 'transparent',
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">Icon</label>
              <div className="flex gap-2 flex-wrap">
                {Object.entries(ICONS).map(([iconName, IconComponent]) => (
                  <button
                    key={iconName}
                    onClick={() => setNewHabitIcon(iconName)}
                    className={`p-2 rounded-md border-2 transition-all ${
                      newHabitIcon === iconName
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <IconComponent className="h-4 w-4" />
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={addHabit} disabled={!newHabitName.trim()}>
              Create Habit
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setIsAddingHabit(false)
                setNewHabitName('')
                setNewHabitDescription('')
                setNewHabitColor('#3b82f6')
                setNewHabitIcon('check-circle')
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      <div className="grid gap-4">
        {habits.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p className="text-lg mb-2">No habits yet</p>
            <p>Click "Add Habit" to get started!</p>
          </div>
        ) : (
          habits.map(habit => {
            const IconComponent = ICONS[habit.icon as keyof typeof ICONS] || Check
            const isCompletedToday = habit.completedDates.includes(today)
            const streak = getStreakCount(habit.completedDates)
            const completionRate = getCompletionRate(habit.completedDates)
            const isEditing = editingId === habit.id

            return (
              <div
                key={habit.id}
                className="bg-card p-6 rounded-lg border hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <button
                      onClick={() => toggleHabitCompletion(habit.id)}
                      className={`mt-1 w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${
                        isCompletedToday
                          ? 'bg-primary border-primary'
                          : 'border-border hover:border-primary'
                      }`}
                    >
                      {isCompletedToday && (
                        <Check className="h-4 w-4 text-primary-foreground" />
                      )}
                    </button>
                    <div className="flex-1">
                      {isEditing ? (
                        <div className="space-y-2">
                          <Input
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="font-semibold"
                          />
                          <Input
                            value={editDescription}
                            onChange={(e) => setEditDescription(e.target.value)}
                            placeholder="Description"
                          />
                        </div>
                      ) : (
                        <>
                          <div className="flex items-center gap-2 mb-1">
                            <div
                              className="p-1 rounded"
                              style={{ backgroundColor: habit.color + '20' }}
                            >
                              <IconComponent
                                className="h-4 w-4"
                                style={{ color: habit.color }}
                              />
                            </div>
                            <h3 className="font-semibold text-lg">{habit.name}</h3>
                          </div>
                          {habit.description && (
                            <p className="text-muted-foreground mb-3">
                              {habit.description}
                            </p>
                          )}
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Zap className="h-3 w-3" />
                              {streak} day streak
                            </span>
                            <span className="flex items-center gap-1">
                              <Target className="h-3 w-3" />
                              {completionRate}% this month
                            </span>
                            <span>Created {formatDisplayDate(habit.createdAt)}</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {isEditing ? (
                      <>
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => updateHabit(habit.id)}
                          disabled={!editName.trim()}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={cancelEditing}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => startEditing(habit)}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => deleteHabit(habit.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}