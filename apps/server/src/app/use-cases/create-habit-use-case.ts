import dayjs from "dayjs";

import { Habit, WeekDays } from "../entities";
import { HabitsRepository } from "../repositories";

interface CreateHabitRequest {
  userId: Habit["userId"];
  title: string;
  weekDays: number[];
}

export class CreateHabit {
  constructor(private repository: HabitsRepository) {}

  async execute(request: CreateHabitRequest) {
    const { userId, title, weekDays } = request;

    const today = dayjs().startOf("day").toDate();

    const habit = new Habit({
      userId,
      title,
      weekDays: new WeekDays(weekDays),
      createdAt: today,
    });

    await this.repository.create(habit);

    return { habit };
  }
}
