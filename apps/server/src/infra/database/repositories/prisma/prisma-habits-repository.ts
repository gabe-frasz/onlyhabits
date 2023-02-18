import dayjs from "dayjs";

import { Habit } from "@/app/entities";
import { HabitsRepository } from "@/app/repositories";
import { prisma } from "@/lib";
import { PrismaHabitMapper } from "../../mappers";

export class PrismaHabitsRepository implements HabitsRepository {
  async findManyByDate(date: Date) {
    const weekDay = dayjs(date).startOf("day").get("day");

    const possibleHabits = await prisma.habit.findMany({
      where: {
        created_at: {
          lte: date,
        },
        weekDays: {
          some: {
            week_day: weekDay,
          },
        },
      },
      include: {
        weekDays: true,
      },
    });

    return possibleHabits.map(PrismaHabitMapper.toDomain);
  }

  async findCompletedByDate(date: Date) {
    const day = await prisma.day.findUnique({
      where: {
        date: dayjs(date).toDate(),
      },
      include: {
        dayHabits: true,
      },
    });

    return day?.dayHabits.map((dayHabit) => dayHabit.habit_id) ?? null;
  }

  async create(habit: Habit) {
    await prisma.habit.create({
      data: PrismaHabitMapper.toPrisma(habit),
    });
  }
}

export const prismaHabitsRepository = new PrismaHabitsRepository();
