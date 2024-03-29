import { InMemoryDaysRepository } from "test/repositories/in-memory-days-repository";
import { InMemoryHabitsRepository } from "test/repositories/in-memory-habits-repository";
import { CreateHabit } from "./create-habit-use-case";
import { GetDayInfo } from "./get-day-info-use-case";
import { ToggleHabitState } from "./toggle-habit-state-use-case";

const allWeek = [0, 1, 2, 3, 4, 5, 6];

describe("Toggle habit state Use Case", () => {
  it.skip("should toggle the habit state", async () => {
    const userId = "some-id";

    const inMemoryHabitsRepository = new InMemoryHabitsRepository();
    const inMemoryDaysRepository = new InMemoryDaysRepository();
    const toggleHabitState = new ToggleHabitState(
      inMemoryHabitsRepository,
      inMemoryDaysRepository,
    );
    const createHabit = new CreateHabit(inMemoryHabitsRepository);
    const getDayInfo = new GetDayInfo(inMemoryHabitsRepository);

    const { habit } = await createHabit.execute({
      userId,
      title: "some title",
      weekDays: allWeek,
    });

    await toggleHabitState.execute({
      userId,
      habitId: habit.id,
    });

    const { completedHabitsId } = await getDayInfo.execute({
      userId,
      date: new Date(),
    });

    expect(completedHabitsId).toBe(expect.arrayContaining([habit.id]));
  });
});
