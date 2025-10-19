export interface Habit {
  id: string
  name: string
  description?: string
  createdAt: string
  color: string
  icon: string
}

export interface HabitEntry {
  id: string
  habitId: string
  date: string
  completed: boolean
  completedAt?: string
}