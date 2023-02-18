import { Habit } from "@/app/entities";

export class HabitViewModel {
  static toHttp(habit: Habit, completedHabitsId: string[] | null) {
    return {
      id: habit.id,
      title: habit.title,
      weekDays: habit.weekDays.value,
      completed:
        completedHabitsId?.some((habitId) => habitId === habit.id) ?? false,
      createdAt: habit.createdAt,
    };
  }
}
