import { useState } from 'react'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns'
import { Habit, HabitEntry } from '@/lib/types'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface CalendarViewProps {
  habits: Habit[]
  entries: HabitEntry[]
  onToggle: (habitId: string, date: string) => void
}

export function CalendarView({ habits, entries, onToggle }: CalendarViewProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd })

  const getDayProgress = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd')
    const dayEntries = entries.filter(e => e.date === dateStr)
    const completed = dayEntries.filter(e => e.completed).length
    const total = habits.length
    return { completed, total, percentage: total > 0 ? (completed / total) * 100 : 0 }
  }

  const getProgressColor = (percentage: number) => {
    if (percentage === 100) return 'bg-green-500'
    if (percentage >= 75) return 'bg-blue-500'
    if (percentage >= 50) return 'bg-yellow-500'
    if (percentage > 0) return 'bg-orange-500'
    return 'bg-gray-200'
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <button
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}
        
        {monthDays.map(day => {
          const progress = getDayProgress(day)
          const isToday = isSameDay(day, new Date())
          
          return (
            <div
              key={day.toString()}
              className="aspect-square"
            >
              <button
                onClick={() => {
                  // Toggle all habits for this day (simplified interaction)
                  habits.forEach(habit => {
                    onToggle(habit.id, format(day, 'yyyy-MM-dd'))
                  })
                }}
                className={clsx(
                  'w-full h-full rounded-lg border-2 flex flex-col items-center justify-center transition-all hover:scale-105',
                  isToday ? 'border-blue-500' : 'border-gray-200',
                  'hover:border-gray-400'
                )}
              >
                <span className={clsx(
                  'text-sm font-medium',
                  isToday ? 'text-blue-600' : 'text-gray-700'
                )}>
                  {format(day, 'd')}
                </span>
                {habits.length > 0 && (
                  <div className="flex gap-1 mt-1">
                    <div
                      className={clsx(
                        'w-1 h-1 rounded-full',
                        getProgressColor(progress.percentage)
                      )}
                    />
                  </div>
                )}
              </button>
            </div>
          )
        })}
      </div>

      <div className="border-t pt-4">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Legend</h3>
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full" />
            <span className="text-gray-600">100% Complete</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full" />
            <span className="text-gray-600">75-99% Complete</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full" />
            <span className="text-gray-600">50-74% Complete</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-orange-500 rounded-full" />
            <span className="text-gray-600">1-49% Complete</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-200 rounded-full" />
            <span className="text-gray-600">Not Started</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function clsx(...classes: (string | undefined | null | boolean)[]) {
  return classes.filter(Boolean).join(' ')
}