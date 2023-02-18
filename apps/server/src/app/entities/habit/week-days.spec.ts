import { WeekDays } from "./week-days";

describe("Week Days", () => {
  it("should create week days", () => {
    const arr = [0, 1, 2, 3, 4, 5, 6];
    const weekDays = new WeekDays(arr);

    expect(() => new WeekDays(arr)).not.toThrow();
    expect(weekDays.value).toHaveLength(7);
  });

  it("should not create week days with empty array", () => {
    expect(() => new WeekDays([])).toThrow();
  });

  it("should not create week days with more than 7 elements", () => {
    expect(() => new WeekDays([0, 1, 2, 3, 4, 5, 6, 7])).toThrow();
  });

  it("should not create week days with invalid values", () => {
    expect(() => new WeekDays([-5])).toThrow();
    expect(() => new WeekDays([9])).toThrow();
  });
});
