import { Habit } from "@/app/entities";
import { HabitsRepository } from "@/app/repositories";
import { prisma } from "@/lib";
import { PrismaHabitMapper } from "../../mappers/prisma-habit-mapper";

export class PrismaHabitsRepository implements HabitsRepository {
  async findMany() {
    const habits = await prisma.habit.findMany({
      include: {
        weekDays: true,
      },
    });

    return habits.map(PrismaHabitMapper.toDomain);
  }

  async create(habit: Habit) {
    await prisma.habit.create({
      data: PrismaHabitMapper.toPrisma(habit),
    });
  }
}

export const prismaHabitsRepository = new PrismaHabitsRepository();
