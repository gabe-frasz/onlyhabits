import dayjs from "dayjs";

import { prismaHabitsRepository } from "@/infra/database";
import { Habit, WeekDays } from "../entities";
import { HabitsRepository } from "../repositories";

interface CreateHabitRequest {
  title: string;
  weekDays: number[];
}

export class CreateHabit {
  constructor(private repository: HabitsRepository) {}

  async execute(request: CreateHabitRequest) {
    const { title, weekDays } = request;

    const today = dayjs().startOf("day").toDate();

    const habit = new Habit({
      title,
      weekDays: new WeekDays(weekDays),
      createdAt: today,
    });

    await this.repository.create(habit);

    return { habit };
  }
}

export const createHabit = new CreateHabit(prismaHabitsRepository);
