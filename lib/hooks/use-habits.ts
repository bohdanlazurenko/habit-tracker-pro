import { useState, useEffect } from 'react'
import { Habit } from '@/lib/types'
import { getTodayKey } from '@/lib/utils'

const STORAGE_KEY = 'habit-tracker-pro-habits'

export function useHabits() {
  const [habits, setHabits] = useState<Habit[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsedHabits = JSON.parse(stored)
        setHabits(parsedHabits)
      }
    } catch (error) {
      console.error('Failed to load habits:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(habits))
      } catch (error) {
        console.error('Failed to save habits:', error)
      }
    }
  }, [habits, isLoading])

  const addHabit = (habitData: Omit<Habit, 'id' | 'completedDates'>) => {
    const newHabit: Habit = {
      ...habitData,
      id: crypto.randomUUID(),
      completedDates: [],
    }
    setHabits(prev => [...prev, newHabit])
  }

  const toggleHabit = (id: string) => {
    const today = getTodayKey()
    setHabits(prev => prev.map(habit => {
      if (habit.id === id) {
        const isCompleted = habit.completedDates.includes(today)
        return {
          ...habit,
          completedDates: isCompleted
            ? habit.completedDates.filter(date => date !== today)
            : [...habit.completedDates, today]
        }
      }
      return habit
    }))
  }

  const deleteHabit = (id: string) => {
    setHabits(prev => prev.filter(habit => habit.id !== id))
  }

  return {
    habits,
    addHabit,
    toggleHabit,
    deleteHabit,
    isLoading,
  }
}