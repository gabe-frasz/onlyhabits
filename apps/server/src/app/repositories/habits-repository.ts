import { Habit } from "../entities";

export interface HabitsRepository {
  findManyByDate: (date: Date, userId: Habit["userId"]) => Promise<Habit[]>;
  findCompletedByDate: (
    date: Date,
    userId: Habit["userId"],
  ) => Promise<Habit["id"][] | null>;
  create: (habit: Habit) => Promise<void>;
  toggleCompletedState: (habitId: string, dayId: string) => Promise<void>;
}
