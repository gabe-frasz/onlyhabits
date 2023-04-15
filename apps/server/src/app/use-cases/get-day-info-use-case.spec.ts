import dayjs from "dayjs";

import { InMemoryHabitsRepository } from "test";
import { CreateHabit } from "./create-habit-use-case";
import { GetDayInfo } from "./get-day-info-use-case";

const allWeek = [0, 1, 2, 3, 4, 5, 6];
const myBirthday = new Date("2023-06-13"); // Tuesday
const dayAfterBirthday = dayjs(myBirthday).add(1, "day").toDate(); // Wednesday

describe("Get day info Use Case", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should get the day info", async () => {
    vi.setSystemTime(myBirthday);

    const userId = "some-id";

    const inMemoryHabitsRepository = new InMemoryHabitsRepository();
    const getDayInfo = new GetDayInfo(inMemoryHabitsRepository);
    const createHabit = new CreateHabit(inMemoryHabitsRepository);

    const { habit } = await createHabit.execute({
      userId,
      title: "habit 1",
      weekDays: allWeek,
    });

    const { habit: habit2 } = await createHabit.execute({
      userId,
      title: "habit 2",
      weekDays: [0, 1, 2],
    });

    const { completedHabitsId, possibleHabits } = await getDayInfo.execute({
      userId,
      date: dayAfterBirthday,
    });

    expect(completedHabitsId).toBeNull();
    expect(possibleHabits).toHaveLength(2);
    expect(possibleHabits[0].id).toBe(habit.id);
    expect(possibleHabits[0].createdAt.getDate()).toBe(
      habit.createdAt.getDate(),
    );
    expect(possibleHabits[1].id).toBe(habit2.id);
    expect(possibleHabits[1].createdAt.getDate()).toBe(
      habit2.createdAt.getDate(),
    );
  });
});
