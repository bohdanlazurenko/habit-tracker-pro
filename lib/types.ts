export interface Habit {
  id: string
  name: string
  description: string
  createdAt: string
  completedDates: string[]
  color: string
  icon: string
}

export interface HabitFormData {
  name: string
  description?: string
  color?: string
  icon?: string
}

export interface CalendarDay {
  date: Date
n  isCurrentMonth: boolean
  isToday: boolean
  completedHabits: string[]
}