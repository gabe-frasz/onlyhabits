import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// email: gabe+clerk_test@example.com
const userId = "user_2OQ7DSXwg8vIknsCJpgca4WzCIZ";

const firstHabitId = "0730ffac-d039-4194-9571-01aa2aa0efbd";
const firstHabitCreationDate = new Date("2022-12-31T03:00:00.000");

const secondHabitId = "00880d75-a933-4fef-94ab-e05744435297";
const secondHabitCreationDate = new Date("2023-01-03T03:00:00.000");

const thirdHabitId = "fa1a1bcf-3d87-4626-8c0d-d7fd1255ac00";
const thirdHabitCreationDate = new Date("2023-01-08T03:00:00.000");

async function main() {
  await prisma.habit.deleteMany({
    where: {
      user_id: userId,
    },
  });
  await prisma.day.deleteMany({
    where: {
      user_id: userId,
    },
  });

  /**
   * Create habits
   */
  await Promise.all([
    prisma.habit.create({
      data: {
        id: firstHabitId,
        user_id: userId,
        title: "Drink 2L of water",
        created_at: firstHabitCreationDate,
        weekDays: {
          create: [{ week_day: 1 }, { week_day: 2 }, { week_day: 3 }],
        },
      },
    }),

    prisma.habit.create({
      data: {
        id: secondHabitId,
        user_id: userId,
        title: "Workout",
        created_at: secondHabitCreationDate,
        weekDays: {
          create: [{ week_day: 3 }, { week_day: 4 }, { week_day: 5 }],
        },
      },
    }),

    prisma.habit.create({
      data: {
        id: thirdHabitId,
        user_id: userId,
        title: "Sleep 8h",
        created_at: thirdHabitCreationDate,
        weekDays: {
          create: [
            { week_day: 1 },
            { week_day: 2 },
            { week_day: 3 },
            { week_day: 4 },
            { week_day: 5 },
          ],
        },
      },
    }),
  ]);

  await Promise.all([
    /**
     * Habits (Complete/Available): 1/1
     */
    prisma.day.create({
      data: {
        /** Monday */
        date: new Date("2023-01-02T03:00:00.000z"),
        user_id: userId,
        dayHabits: {
          create: {
            habit_id: firstHabitId,
          },
        },
      },
    }),

    /**
     * Habits (Complete/Available): 1/1
     */
    prisma.day.create({
      data: {
        /** Friday */
        date: new Date("2023-01-06T03:00:00.000z"),
        user_id: userId,
        dayHabits: {
          create: {
            habit_id: secondHabitId,
          },
        },
      },
    }),

    /**
     * Habits (Complete/Available): 2/2
     */
    prisma.day.create({
      data: {
        /** Wednesday */
        date: new Date("2023-01-04T03:00:00.000z"),
        user_id: userId,
        dayHabits: {
          create: [{ habit_id: firstHabitId }, { habit_id: secondHabitId }],
        },
      },
    }),
  ]);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
