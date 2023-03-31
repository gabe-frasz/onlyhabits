import { Day, DaysRepository } from "@/app/repositories";
import { randomUUID } from "node:crypto";

export class InMemoryDaysRepository implements DaysRepository {
  private days: Day[] = [];

  async findOne(date: Date) {
    return this.days.find((day) => day.date === date) ?? null;
  }

  async create(date: Date) {
    const day = { id: randomUUID(), date };
    this.days.push(day);

    return day;
  }
}
