import { Habit } from "./habit";
import { WeekDays } from "./week-days";

describe("Habit", () => {
  it("should create a habit", () => {
    const habit = new Habit(
      {
        userId: "some-id",
        title: "some title",
        weekDays: new WeekDays([5]),
      },
      "some-id",
    );

    expect(habit.id).toBe("some-id");
    expect(habit.title).toBe("some title");
    expect(habit.weekDays.value[0]).toBe(5);
  });

  it("should not create a habit with invalid title", () => {
    expect(
      () =>
        new Habit({
          userId: "some-id",
          title: "",
          weekDays: new WeekDays([0]),
        }),
    ).toThrow();
  });
});
