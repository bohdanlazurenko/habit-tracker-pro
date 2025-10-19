import { differenceInDays, format } from 'date-fns'
import { Calendar, CheckCircle, TrendingUp } from 'lucide-react'
import { Habit } from '@/lib/types'

interface StatsCardProps {
  habit: Habit
}

export function StatsCard({ habit }: StatsCardProps) {
  const today = new Date().toISOString().split('T')[0]
  const isCompletedToday = habit.completedDates.includes(today)
  
  const totalCompletions = habit.completedDates.length
  const daysSinceCreation = differenceInDays(new Date(), new Date(habit.createdAt)) + 1
  const completionRate = daysSinceCreation > 0 ? Math.round((totalCompletions / daysSinceCreation) * 100) : 0
  
  const sortedDates = [...habit.completedDates].sort()
  const currentStreak = calculateCurrentStreak(sortedDates)
  
  return (
    <div className="bg-card rounded-lg border p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-lg">{habit.name}</h3>
          {habit.description && (
            <p className="text-sm text-muted-foreground mt-1">{habit.description}</p>
          )}
        </div>
        {isCompletedToday && (
          <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
            Done Today
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
            <CheckCircle className="h-4 w-4" />
            <span className="text-xs">Total</span>
          </div>
          <p className="text-2xl font-bold">{totalCompletions}</p>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
            <TrendingUp className="h-4 w-4" />
            <span className="text-xs">Streak</span>
          </div>
          <p className="text-2xl font-bold">{currentStreak}</p>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
            <Calendar className="h-4 w-4" />
            <span className="text-xs">Rate</span>
          </div>
          <p className="text-2xl font-bold">{completionRate}%</p>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t">
        <p className="text-xs text-muted-foreground">
          Created on {format(new Date(habit.createdAt), 'MMM d, yyyy')}
        </p>
      </div>
    </div>
  )
}

function calculateCurrentStreak(completedDates: string[]): number {
  if (completedDates.length === 0) return 0
  
  let streak = 0
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  for (let i = 0; i < 365; i++) {
    const dateStr = today.toISOString().split('T')[0]
    if (completedDates.includes(dateStr)) {
      streak++
      today.setDate(today.getDate() - 1)
    } else if (i === 0) {
      break
    } else {
      break
    }
  }
  
  return streak
}