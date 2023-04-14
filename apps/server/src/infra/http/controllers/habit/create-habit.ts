import { getAuth } from "@clerk/fastify";
import type { RouteHandlerMethod } from "fastify";

import { CreateHabit } from "@/app/use-cases";
import { prismaHabitsRepository } from "@/infra/database";
import { createHabitBodySchema } from "../../dtos";

/**
 * @route /habits
 * @method POST
 * @description Create a new habit
 * @protected
 * @returns 201 || 400
 */

export const createHabit: RouteHandlerMethod = async (req, res) => {
  const parsedBody = createHabitBodySchema.safeParse(req.body);
  if (!parsedBody.success)
    return res.status(400).send(parsedBody.error.message);

  const { userId } = getAuth(req);

  const { title, weekDays } = parsedBody.data;

  const createHabit = new CreateHabit(prismaHabitsRepository);
  await createHabit.execute({
    userId: userId!,
    title,
    weekDays,
  });

  res.status(201).send();
};
