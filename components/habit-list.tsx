import { format } from 'date-fns'
import { Check, X, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Habit } from '@/lib/types'

interface HabitListProps {
  habits: Habit[]
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export function HabitList({ habits, onToggle, onDelete }: HabitListProps) {
  const today = new Date().toISOString().split('T')[0]

  if (habits.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p>No habits yet. Start by creating your first habit!</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Today's Habits</h2>
      <div className="space-y-2">
        {habits.map((habit) => {
          const isCompleted = habit.completedDates.includes(today)
          
          return (
            <div
              key={habit.id}
              className={`flex items-center justify-between p-4 rounded-lg border transition-all ${
                isCompleted
                  ? 'bg-muted/50 border-muted-foreground/20'
                  : 'bg-card border-border'
              }`}
            >
              <div className="flex items-center gap-3">
                <Button
                  variant={isCompleted ? 'secondary' : 'outline'}
                  size="icon"
                  onClick={() => onToggle(habit.id)}
                  className={isCompleted ? 'bg-green-100 hover:bg-green-200 border-green-300' : ''}
                >
                  {isCompleted ? (
                    <Check className="h-4 w-4 text-green-700" />
                  ) : (
                    <X className="h-4 w-4" />
                  )}
                </Button>
                <div>
                  <h3 className={`font-medium ${isCompleted ? 'line-through text-muted-foreground' : ''}`}>
                    {habit.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {habit.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {habit.completedDates.length} days
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(habit.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}