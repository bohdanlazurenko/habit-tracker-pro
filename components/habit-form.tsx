import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Habit } from '@/lib/types'

interface HabitFormProps {
  onSubmit: (habit: Omit<Habit, 'id' | 'completedDates'>) => void
  onCancel: () => void
}

export function HabitForm({ onSubmit, onCancel }: HabitFormProps) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return
    
    onSubmit({
      name: name.trim(),
      description: description.trim(),
      createdAt: new Date().toISOString(),
    })
    
    setName('')
    setDescription('')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Habit Name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
          placeholder="e.g., Morning Exercise"
          required
        />
      </div>
      
      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-2">
          Description (optional)
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none"
          placeholder="e.g., 30 minutes of cardio and stretching"
          rows={3}
        />
      </div>
      
      <div className="flex gap-2 justify-end">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={!name.trim()}>
          Create Habit
        </Button>
      </div>
    </form>
  )
}