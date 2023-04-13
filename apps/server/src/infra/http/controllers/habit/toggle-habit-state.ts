import { RouteHandlerMethod } from "fastify";

import { ToggleHabitState } from "@/app/use-cases";
import { prismaDaysRepository, prismaHabitsRepository } from "@/infra/database";
import { toggleHabitStateBodySchema } from "../../dtos";

/**
 * @route /habits/:id/toggle
 * @method PATCH
 * @description Mark habit as done/undone
 * @protected
 * @returns 200
 */

export const toggleHabitState: RouteHandlerMethod = async (req, res) => {
  const parsedParams = toggleHabitStateBodySchema.safeParse(req.params);
  if (!parsedParams.success)
    return res.status(400).send(parsedParams.error.message);

  const { id } = parsedParams.data;

  const toggleHabitState = new ToggleHabitState(
    prismaHabitsRepository,
    prismaDaysRepository,
  );
  await toggleHabitState.execute(id);

  res.send();
};
