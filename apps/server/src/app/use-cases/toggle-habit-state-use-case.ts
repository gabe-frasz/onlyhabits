import dayjs from "dayjs";

import { DaysRepository, HabitsRepository } from "../repositories";

interface ToggleHabitStateRequest {
  userId: string;
  habitId: string;
}

export class ToggleHabitState {
  constructor(
    private habitsRepository: HabitsRepository,
    private daysRepository: DaysRepository,
  ) {}

  async execute(request: ToggleHabitStateRequest) {
    const today = dayjs().startOf("day").toDate();

    let day = await this.daysRepository.findOne(today, request.userId);

    if (!day) {
      day = await this.daysRepository.create(today, request.userId);
    }

    await this.habitsRepository.toggleCompletedState(request.habitId, day.id);
  }
}
