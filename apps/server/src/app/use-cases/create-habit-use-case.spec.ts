import { InMemoryHabitsRepository } from "test";
import { Habit } from "../entities";
import { CreateHabit } from "./create-habit-use-case";

describe("Create habit Use Case", () => {
  it("should create a habit", async () => {
    const createHabit = new CreateHabit(new InMemoryHabitsRepository());

    const { habit } = await createHabit.execute({
      title: "some title",
      weekDays: [0, 2, 4],
    });

    expect(habit).toBeInstanceOf(Habit);
    expect(habit.createdAt.getDay()).toBe(new Date().getDay());
  });
});
