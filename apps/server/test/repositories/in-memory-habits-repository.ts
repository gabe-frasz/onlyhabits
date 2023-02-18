import dayjs from "dayjs";

import { Habit } from "@/app/entities";
import { HabitsRepository } from "@/app/repositories";

// TODO: Fix this days array
export class InMemoryHabitsRepository implements HabitsRepository {
  private habits: Habit[] = [];
  private days: {
    date: Date;
    dayHabits: { day_id: string; habit_id: string }[];
  }[] = [];

  async findManyByDate(date: Date) {
    return this.habits.filter((habit) => habit.createdAt <= date);
  }

  // TODO: Finish this method
  async findCompletedByDate(date: Date) {
    const day = this.days.find((day) => day.date === dayjs(date).toDate());
    const xablau = day?.dayHabits.map((dayHabit) => dayHabit.habit_id);

    return xablau ?? null;
  }

  async create(habit: Habit) {
    this.habits.push(habit);
  }
}
