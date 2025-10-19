import { Habit, HabitEntry } from './types'

const STORAGE_KEYS = {
  HABITS: 'habit-tracker-habits',
  ENTRIES: 'habit-tracker-entries',
}

export const storage = {
  getHabits(): Habit[] {
    if (typeof window === 'undefined') return []
    try {
      const data = localStorage.getItem(STORAGE_KEYS.HABITS)
      return data ? JSON.parse(data) : []
    } catch {
      return []
    }
  },

  saveHabits(habits: Habit[]): void {
    if (typeof window === 'undefined') return
    try {
      localStorage.setItem(STORAGE_KEYS.HABITS, JSON.stringify(habits))
    } catch {
      // Ignore errors
    }
  },

  getEntries(): HabitEntry[] {
    if (typeof window === 'undefined') return []
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ENTRIES)
      return data ? JSON.parse(data) : []
    } catch {
      return []
    }
  },

  saveEntries(entries: HabitEntry[]): void {
    if (typeof window === 'undefined') return
    try {
      localStorage.setItem(STORAGE_KEYS.ENTRIES, JSON.stringify(entries))
    } catch {
      // Ignore errors
    }
  },
}