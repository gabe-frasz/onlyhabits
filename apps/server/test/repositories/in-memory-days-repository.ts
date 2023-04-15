import { Day, DaysRepository } from "@/app/repositories";
import { randomUUID } from "node:crypto";

export class InMemoryDaysRepository implements DaysRepository {
  private days: Day[] = [];

  async findOne(date: Date, userId: string) {
    return (
      this.days.find((day) => day.date === date && day.userId === userId) ??
      null
    );
  }

  async create(date: Date, userId: string) {
    const day = { id: randomUUID(), userId, date };
    this.days.push(day);

    return day;
  }
}
