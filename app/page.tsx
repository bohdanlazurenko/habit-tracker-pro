import { HabitList } from '@/components/HabitList'
import { HabitCalendar } from '@/components/HabitCalendar'
import { Button } from '@/components/ui/Button'
import { CheckCircle, Calendar, BarChart3, Target } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary text-primary-foreground rounded-lg">
                <CheckCircle className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Habit Tracker Pro</h1>
                <p className="text-sm text-muted-foreground">
                  Build better habits, one day at a time
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Statistics
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                Goals
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <HabitList />
          </div>
          <div>
            <HabitCalendar />
          </div>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-card p-6 rounded-lg border">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                <Target className="h-5 w-5" />
              </div>
              <h3 className="font-semibold">Daily Goal</h3>
            </div>
            <p className="text-2xl font-bold mb-1">5/7 habits</p>
            <p className="text-sm text-muted-foreground">71% completed today</p>
          </div>

          <div className="bg-card p-6 rounded-lg border">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                <Calendar className="h-5 w-5" />
              </div>
              <h3 className="font-semibold">Current Streak</h3>
            </div>
            <p className="text-2xl font-bold mb-1">12 days</p>
            <p className="text-sm text-muted-foreground">Keep it going!</p>
          </div>

          <div className="bg-card p-6 rounded-lg border">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                <BarChart3 className="h-5 w-5" />
              </div>
              <h3 className="font-semibold">This Month</h3>
            </div>
            <p className="text-2xl font-bold mb-1">85%</p>
            <p className="text-sm text-muted-foreground">Average completion rate</p>
          </div>
        </div>
      </main>

      <footer className="border-t mt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              © 2024 Habit Tracker Pro. Build better habits.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Terms
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Help
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}