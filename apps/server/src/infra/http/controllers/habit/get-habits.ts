import { RouteHandlerMethod } from "fastify";

import { GetDayInfo } from "@/app/use-cases";
import { prismaHabitsRepository } from "@/infra/database";
import { getDayInfoSchema } from "../../dtos";
import { HabitViewModel } from "../../view-models";

/**
 * @route /habits
 * @method GET
 * @description Get all habits
 * @protected
 * @returns 200
 */

export const getHabits: RouteHandlerMethod = async (req, res) => {
  const parsedParams = getDayInfoSchema.safeParse(req.query);
  if (!parsedParams.success)
    return res.status(400).send(parsedParams.error.message);

  const { date } = parsedParams.data;

  const getDayInfo = new GetDayInfo(prismaHabitsRepository);
  const { possibleHabits, completedHabitsId } = await getDayInfo.execute({
    date,
  });

  const habits = possibleHabits.map((habit) =>
    HabitViewModel.toHttp(habit, completedHabitsId),
  );

  res.send({ habits });
};
