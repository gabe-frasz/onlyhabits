import type { RouteHandlerMethod } from "fastify";

import { GetSummary } from "@/app/use-cases";
import { ClerkAuthAdapter } from "@/infra/auth";

/**
 * @route /habits/summary
 * @method GET
 * @description Get the summary of days (completed and not completed habits)
 * @protected
 * @returns 200
 */

export const getDaysSummary: RouteHandlerMethod = async (req, res) => {
  const authAdapter = new ClerkAuthAdapter();
  const userId = authAdapter.getUserId(req);

  const getSummary = new GetSummary();
  const summary = await getSummary.execute({
    userId: userId!,
  });

  res.send(summary);
};
