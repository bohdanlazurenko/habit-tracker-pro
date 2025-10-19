import { Habit, HabitEntry } from '@/lib/types'
import { Check, X, Edit2, Trash2 } from 'lucide-react'
import { clsx } from 'clsx'

interface HabitListProps {
  habits: Habit[]
  entries: HabitEntry[]
  date: string
  onToggle: (habitId: string, date: string) => void
  onEdit: (habit: Habit) => void
  onDelete: (id: string) => void
}

export function HabitList({ habits, entries, date, onToggle, onEdit, onDelete }: HabitListProps) {
  const dayEntries = entries.filter(e => e.date === date)

  if (habits.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 mb-4">No habits yet. Create your first habit!</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {habits.map(habit => {
        const entry = dayEntries.find(e => e.habitId === habit.id)
        const isCompleted = entry?.completed || false

        return (
          <div
            key={habit.id}
            className={clsx(
              'flex items-center justify-between p-4 rounded-lg border transition-all',
              isCompleted
                ? 'bg-green-50 border-green-200'
                : 'bg-white border-gray-200 hover:border-gray-300'
            )}
          >
            <div className="flex items-center gap-3">
              <button
                onClick={() => onToggle(habit.id, date)}
                className={clsx(
                  'w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors',
                  isCompleted
                    ? 'bg-green-600 border-green-600 text-white'
                    : 'border-gray-300 hover:border-gray-400'
                )}
              >
                {isCompleted && <Check className="w-4 h-4" />}
              </button>
              <div>
                <h3 className={clsx(
                  'font-medium',
                  isCompleted ? 'text-gray-500 line-through' : 'text-gray-900'
                )}>
                  {habit.name}
                </h3>
                {habit.description && (
                  <p className="text-sm text-gray-500">{habit.description}</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onEdit(habit)}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDelete(habit.id)}
                className="p-2 text-gray-400 hover:text-red-600 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}