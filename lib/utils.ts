import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, isSameDay } from 'date-fns'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return format(d, 'yyyy-MM-dd')
}

export function formatDisplayDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return format(d, 'MMM d, yyyy')
}

export function getCalendarDays(date: Date) {
  const start = startOfMonth(date)
  const end = endOfMonth(date)
  const days = eachDayOfInterval({ start, end })
  
  const startOfWeek = new Date(start)
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay())
  
  const endOfWeek = new Date(end)
  endOfWeek.setDate(endOfWeek.getDate() + (6 - endOfWeek.getDay()))
  
  const calendarDays = eachDayOfInterval({ start: startOfWeek, end: endOfWeek })
  
  return calendarDays.map(day => ({
    date: day,
    isCurrentMonth: isSameMonth(day, date),
    isToday: isToday(day),
  }))
}

export function getStreakCount(completedDates: string[]): number {
  if (completedDates.length === 0) return 0
  
  const sortedDates = completedDates
    .map(date => new Date(date))
    .sort((a, b) => b.getTime() - a.getTime())
  
  let streak = 0
  let currentDate = new Date()
  currentDate.setHours(0, 0, 0, 0)
  
  for (const date of sortedDates) {
    const checkDate = new Date(date)
    checkDate.setHours(0, 0, 0, 0)
    
    if (isSameDay(checkDate, currentDate)) {
      streak++
      currentDate.setDate(currentDate.getDate() - 1)
    } else if (checkDate < currentDate) {
      break
    }
  }
  
  return streak
}

export function getCompletionRate(completedDates: string[], days: number = 30): number {
  if (days <= 0) return 0
  
  const endDate = new Date()
  const startDate = new Date()
  startDate.setDate(endDate.getDate() - days + 1)
  
  const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1
  
  const completedInPeriod = completedDates.filter(dateStr => {
    const date = new Date(dateStr)
    return date >= startDate && date <= endDate
  }).length
  
  return Math.round((completedInPeriod / totalDays) * 100)
}