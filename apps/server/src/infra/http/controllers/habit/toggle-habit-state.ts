import type { RouteHandlerMethod } from "fastify";

import { ToggleHabitState } from "@/app/use-cases";
import { ClerkAuthAdapter } from "@/infra/auth";
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
  const _params = toggleHabitStateBodySchema.safeParse(req.params);
  if (!_params.success) return res.status(400).send(_params.error.message);

  const { id } = _params.data;

  const authAdapter = new ClerkAuthAdapter();
  const userId = authAdapter.getUserId(req);

  const toggleHabitState = new ToggleHabitState(
    prismaHabitsRepository,
    prismaDaysRepository,
  );
  await toggleHabitState.execute({ habitId: id, userId: userId! });

  res.send();
};
