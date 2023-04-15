import dayjs from "dayjs";

import { Habit } from "@/app/entities";
import { HabitsRepository } from "@/app/repositories";

export class InMemoryHabitsRepository implements HabitsRepository {
  private habits: Habit[] = [];
  private days: {
    id: string;
    date: Date;
    habit_ids: string[];
    user_id: string;
  }[] = [];

  async findManyByDate(date: Date, userId: string) {
    return this.habits.filter(
      (habit) => habit.createdAt <= date && habit.userId === userId,
    );
  }

  async findCompletedByDate(date: Date, userId: string) {
    const day = this.days.find(
      (day) => day.date === dayjs(date).toDate() && day.user_id === userId,
    );
    const completedHabits = day?.habit_ids;

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
