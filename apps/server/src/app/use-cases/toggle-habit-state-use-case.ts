import dayjs from "dayjs";

import { DaysRepository, HabitsRepository } from "../repositories";

export class ToggleHabitState {
  constructor(
    private habitsRepository: HabitsRepository,
    private daysRepository: DaysRepository,
  ) {}

  async execute(habitId: string) {
    const today = dayjs().startOf("day").toDate();

    let day = await this.daysRepository.findOne(today);

    if (!day) {
      day = await this.daysRepository.create(today);
    }

    await this.habitsRepository.toggleCompletedState(habitId, day.id);
  }
}
