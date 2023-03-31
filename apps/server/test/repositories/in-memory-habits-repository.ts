import dayjs from "dayjs";

import { Habit } from "@/app/entities";
import { HabitsRepository } from "@/app/repositories";

export class InMemoryHabitsRepository implements HabitsRepository {
  private habits: Habit[] = [];
  private days: { id: string; date: Date; habit_ids: string[] }[] = [];

  async findManyByDate(date: Date) {
    return this.habits.filter((habit) => habit.createdAt <= date);
  }

  async findCompletedByDate(date: Date) {
    const day = this.days.find((day) => day.date === dayjs(date).toDate());
    const completedHabits = day?.habit_ids.map((habit) => habit);

    return completedHabits ?? null;
  }

  async create(habit: Habit) {
    this.habits.push(habit);
  }

  async toggleCompletedState(habitId: string, dayId: string) {
    const dayIndex = this.days.findIndex(
      (day) =>
        day.id === dayId &&
        day.habit_ids.filter((habit) => habit === habitId).length === 1,
    );

    if (dayIndex >= 0) {
      this.days.at(dayIndex)?.habit_ids.filter((habit) => habit !== habitId);
      return;
    }

    this.days.find((day) => day.id === dayId)?.habit_ids.push(habitId);
  }
}
