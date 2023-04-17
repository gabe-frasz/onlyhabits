import type { RouteHandlerMethod } from "fastify";

import { CreateHabit } from "@/app/use-cases";
import { ClerkAuthAdapter } from "@/infra/auth";
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
  const _body = createHabitBodySchema.safeParse(req.body);
  if (!_body.success) return res.status(400).send(_body.error.message);

  const authAdapter = new ClerkAuthAdapter();
  const userId = authAdapter.getUserId(req);

  const { title, weekDays } = _body.data;

  const createHabit = new CreateHabit(prismaHabitsRepository);
  await createHabit.execute({
    userId: userId!,
    title,
    weekDays,
  });

  res.status(201).send();
};
