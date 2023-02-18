import { prismaHabitsRepository } from "@/infra/database";
import { HabitsRepository } from "../repositories";

export interface GetDayInfoRequest {
  date: Date;
}

export class GetDayInfo {
  constructor(private repository: HabitsRepository) {}

  async execute(request: GetDayInfoRequest) {
    const possibleHabits = await this.repository.findManyByDate(request.date);
    const completedHabitsId = await this.repository.findCompletedByDate(
      request.date,
    );

    return { possibleHabits, completedHabitsId };
  }
}

export const getDayInfo = new GetDayInfo(prismaHabitsRepository);
