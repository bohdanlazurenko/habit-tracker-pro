'use client'

import { useState, useEffect } from 'react'
import { Habit } from '@/lib/types'
import { getCalendarDays, formatDate } from '@/lib/utils'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { format, startOfMonth, endOfMonth, addMonths, subMonths } from 'date-fns'

export function HabitCalendar() {
  const [habits, setHabits] = useState<Habit[]>([])
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

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

  const calendarDays = getCalendarDays(currentMonth)
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const getHabitsForDate = (date: Date) => {
    const dateStr = formatDate(date)
    return habits.filter(habit => habit.completedDates.includes(dateStr))
  }

  const getCompletionPercentage = (date: Date) => {
    const completedHabits = getHabitsForDate(date)
    if (habits.length === 0) return 0
    return Math.round((completedHabits.length / habits.length) * 100)
  }

  const getHeatmapColor = (percentage: number) => {
    if (percentage === 0) return 'bg-gray-100'
    if (percentage <= 25) return 'bg-green-200'
    if (percentage <= 50) return 'bg-green-300'
    if (percentage <= 75) return 'bg-green-400'
    return 'bg-green-500'
  }

  const previousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  const goToToday = () => {
    setCurrentMonth(new Date())
    setSelectedDate(new Date())
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Habit Calendar</h2>
        <button
          onClick={goToToday}
          className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          Today
        </button>
      </div>

      <div className="bg-card p-6 rounded-lg border">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={previousMonth}
            className="p-2 hover:bg-accent rounded-md transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <h3 className="text-lg font-semibold">
            {format(currentMonth, 'MMMM yyyy')}
          </h3>
          <button
            onClick={nextMonth}
            className="p-2 hover:bg-accent rounded-md transition-colors"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-2 mb-2">
          {weekDays.map(day => (
            <div
              key={day}
              className="text-center text-sm font-medium text-muted-foreground py-2"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {calendarDays.map((day, index) => {
            const completionPercentage = getCompletionPercentage(day.date)
            const habitsForDate = getHabitsForDate(day.date)
            const isSelected = selectedDate && formatDate(day.date) === formatDate(selectedDate)
            const isToday = day.isToday

            return (
              <button
                key={index}
                onClick={() => setSelectedDate(day.date)}
                className={`
                  relative aspect-square p-2 rounded-md border transition-all
                  ${day.isCurrentMonth ? 'bg-background' : 'bg-muted/50'}
                  ${isSelected ? 'ring-2 ring-primary' : ''}
                  ${isToday ? 'border-primary' : 'border-border'}
                  hover:border-primary hover:shadow-sm
                `}
              >
                <div className="text-sm font-medium mb-1">
                  {format(day.date, 'd')}
                </div>
                {day.isCurrentMonth && habits.length > 0 && (
                  <div
                    className={`
                      w-full h-2 rounded-full
                      ${getHeatmapColor(completionPercentage)}
                    `}
                  />
                )}
                {habitsForDate.length > 0 && (
                  <div className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
                )}
              </button>
            )
          })}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Completion:</span>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-gray-100 rounded" />
                <span className="text-xs text-muted-foreground">0%</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-green-200 rounded" />
                <span className="text-xs text-muted-foreground">25%</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-green-300 rounded" />
                <span className="text-xs text-muted-foreground">50%</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-green-400 rounded" />
                <span className="text-xs text-muted-foreground">75%</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-green-500 rounded" />
                <span className="text-xs text-muted-foreground">100%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedDate && (
        <div className="bg-card p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">
            Habits for {format(selectedDate, 'MMMM d, yyyy')}
          </h3>
          {habits.length === 0 ? (
            <p className="text-muted-foreground">No habits created yet</p>
          ) : (
            <div className="space-y-2">
              {habits.map(habit => {
                const isCompleted = habit.completedDates.includes(formatDate(selectedDate))
                return (
                  <div
                    key={habit.id}
                    className={`
                      flex items-center gap-3 p-3 rounded-md
                      ${isCompleted ? 'bg-green-50 border border-green-200' : 'bg-muted/50'}
                    `}
                  >
                    <div
                      className={`
                        w-5 h-5 rounded-md border-2 flex items-center justify-center
                        ${isCompleted ? 'bg-green-500 border-green-500' : 'border-gray-300'}
                      `}
                    >
                      {isCompleted && (
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <span className={isCompleted ? 'text-green-700' : ''}>
                      {habit.name}
                    </span>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}
    </div>
  )
}