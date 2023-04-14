import { getAuth } from "@clerk/fastify";
import type { RouteHandlerMethod } from "fastify";

import { ToggleHabitState } from "@/app/use-cases";
import { prismaDaysRepository, prismaHabitsRepository } from "@/infra/database";
import { toggleHabitStateBodySchema } from "../../dtos";

/**
 * @route /habits/:id/toggle
 * @method PATCH
 * @description Mark habit as done/undone
 * @protected
 * @returns 200 || 400
 */

export const toggleHabitState: RouteHandlerMethod = async (req, res) => {
  const parsedParams = toggleHabitStateBodySchema.safeParse(req.params);
  if (!parsedParams.success)
    return res.status(400).send(parsedParams.error.message);

  const { id } = parsedParams.data;

  const { userId } = getAuth(req);

  const toggleHabitState = new ToggleHabitState(
    prismaHabitsRepository,
    prismaDaysRepository,
  );
  await toggleHabitState.execute({ habitId: id, userId: userId! });

  res.send();
};
