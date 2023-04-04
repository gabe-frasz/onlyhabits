import { HabitsRepository } from "../repositories";

export interface GetDayInfoRequest {
  date: Date;
}

export class GetDayInfo {
  constructor(private habitsRepository: HabitsRepository) {}

  async execute(request: GetDayInfoRequest) {
    const possibleHabits = await this.habitsRepository.findManyByDate(
      request.date,
    );
    const completedHabitsId = await this.habitsRepository.findCompletedByDate(
      request.date,
    );

    return { possibleHabits, completedHabitsId };
  }
}
