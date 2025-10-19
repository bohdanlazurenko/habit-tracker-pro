'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { HabitForm } from '@/components/habit-form'
import { HabitList } from '@/components/habit-list'
import { useHabits } from '@/lib/hooks/use-habits'

export default function HomePage() {
  const [showForm, setShowForm] = useState(false)
  const { habits, addHabit, toggleHabit, deleteHabit } = useHabits()

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Habit Tracker Pro</h1>
        <p className="text-muted-foreground">
          Build consistency by tracking your daily habits
        </p>
      </div>

      <div className="flex justify-center">
        <Button
          onClick={() => setShowForm(!showForm)}
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          {showForm ? 'Cancel' : 'Add New Habit'}
        </Button>
      </div>

      {showForm && (
        <div className="bg-card rounded-lg border p-6">
          <HabitForm
            onSubmit={(habit) => {
              addHabit(habit)
              setShowForm(false)
            }}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}

      <HabitList
        habits={habits}
        onToggle={toggleHabit}
        onDelete={deleteHabit}
      />
    </div>
  )
}