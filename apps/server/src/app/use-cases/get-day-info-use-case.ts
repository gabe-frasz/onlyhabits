import { HabitsRepository } from "../repositories";

export interface GetDayInfoRequest {
  userId: string;
  date: Date;
}

export class GetDayInfo {
  constructor(private habitsRepository: HabitsRepository) {}

  async execute(request: GetDayInfoRequest) {
    const possibleHabits = await this.habitsRepository.findManyByDate(
      request.date,
      request.userId,
    );
    const completedHabitsId = await this.habitsRepository.findCompletedByDate(
      request.date,
      request.userId,
    );

    return { possibleHabits, completedHabitsId };
  }
}
