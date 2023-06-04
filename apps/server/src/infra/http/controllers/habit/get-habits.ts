import type { RouteHandlerMethod } from "fastify";

import { GetDayInfo } from "@/app/use-cases";
import { ClerkAuthAdapter } from "@/infra/auth";
import { prismaHabitsRepository } from "@/infra/database";
import { getDayInfoSchema } from "../../dtos";
import { HabitViewModel } from "../../view-models";

/**
 * @route /habits
 * @method GET
 * @description Get all habits of specific day
 * @protected
 * @returns 200 || 400
 */

export const getHabits: RouteHandlerMethod = async (req, res) => {
  const _query = getDayInfoSchema.safeParse(req.query);
  if (!_query.success) return res.status(400).send(_query.error.message);

  const { date } = _query.data;

  const authAdapter = new ClerkAuthAdapter();
  const userId = authAdapter.getUserId(req);

  const getDayInfo = new GetDayInfo(prismaHabitsRepository);
  const { possibleHabits, completedHabitsId } = await getDayInfo.execute({
    date,
    userId: userId!,
  });

  const habits = possibleHabits.map((habit) =>
    HabitViewModel.toHttp(habit, completedHabitsId),
  );

  console.log(possibleHabits, completedHabitsId);

  res.send({ habits });
};
