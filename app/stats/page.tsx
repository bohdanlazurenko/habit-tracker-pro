'use client'

import Link from 'next/link'
import { ArrowLeft, TrendingUp, Calendar, Target } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { StatsCard } from '@/components/stats-card'
import { useHabits } from '@/lib/hooks/use-habits'

export default function StatsPage() {
  const { habits } = useHabits()

  const totalHabits = habits.length
  const completedToday = habits.filter(h => h.completedDates.includes(new Date().toISOString().split('T')[0])).length
  const totalCompletions = habits.reduce((sum, h) => sum + h.completedDates.length, 0)

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center gap-4">
        <Link href="/">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Statistics</h1>
          <p className="text-muted-foreground">
            Track your progress and build consistency
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="bg-card rounded-lg border p-6">
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Total Habits</h3>
          </div>
          <p className="text-2xl font-bold mt-2">{totalHabits}</p>
        </div>
        <div className="bg-card rounded-lg border p-6">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Completed Today</h3>
          </div>
          <p className="text-2xl font-bold mt-2">{completedToday}</p>
        </div>
        <div className="bg-card rounded-lg border p-6">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Total Completions</h3>
          </div>
          <p className="text-2xl font-bold mt-2">{totalCompletions}</p>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Individual Habit Stats</h2>
        {habits.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p>No habits yet. Start by creating your first habit!</p>
            <Link href="/" className="mt-4 inline-block">
              <Button>Create First Habit</Button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {habits.map((habit) => (
              <StatsCard key={habit.id} habit={habit} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}