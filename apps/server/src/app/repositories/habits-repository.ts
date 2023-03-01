import { Habit } from "../entities";

export interface HabitsRepository {
  findManyByDate: (date: Date) => Promise<Habit[]>;
  findCompletedByDate: (date: Date) => Promise<Habit["id"][] | null>;
  create: (habit: Habit) => Promise<void>;
  toggleCompletedState: (habitId: string, dayId: string) => Promise<void>;
}
