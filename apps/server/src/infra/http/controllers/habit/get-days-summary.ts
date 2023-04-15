import { getAuth } from "@clerk/fastify";
import type { RouteHandlerMethod } from "fastify";

import { GetSummary } from "@/app/use-cases";

/**
 * @route /habits/summary
 * @method GET
 * @description Get the summary of days (completed and not completed habits)
 * @protected
 * @returns 200
 */

export const getDaysSummary: RouteHandlerMethod = async (req, res) => {
  const { userId } = getAuth(req)

  const getSummary = new GetSummary();
  const summary = await getSummary.execute({
    userId: userId!
  });

  res.send(summary);
};
