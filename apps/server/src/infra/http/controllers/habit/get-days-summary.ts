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
  const getSummary = new GetSummary();
  const summary = await getSummary.execute();

  res.send(summary);
};
