import { Habit } from "../entities";

export interface HabitsRepository {
  findMany: () => Promise<Habit[]>;
  create: (habit: Habit) => Promise<void>;
}
