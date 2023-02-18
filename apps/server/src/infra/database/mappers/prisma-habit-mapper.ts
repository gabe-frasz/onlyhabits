import { Habit as PrismaHabit, HabitWeekDays } from "@prisma/client";

import { Habit, WeekDays } from "@/app/entities";

export class PrismaHabitMapper {
  static toPrisma(habit: Habit) {
    return {
      id: habit.id,
      title: habit.title,
      created_at: habit.createdAt,
      weekDays: {
        create: habit.weekDays.value.map((weekDay) => ({ week_day: weekDay })),
      },
    };
  }

  static toDomain(habit: PrismaHabit & { weekDays: HabitWeekDays[] }): Habit {
    const weekDays = habit.weekDays.map((weekDay) => weekDay.week_day);

    return new Habit(
      {
        title: habit.title,
        weekDays: new WeekDays(weekDays),
        createdAt: habit.created_at,
      },
      habit.id,
    );
  }
}
