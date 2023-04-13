import { FastifyInstance } from "fastify";

import {
  createHabit,
  getDaysSummary,
  getHabits,
  toggleHabitState,
} from "../controllers/habit";
import { authenticate } from "../middlewares";

export async function habitRoutes(app: FastifyInstance) {
  app.addHook("preHandler", authenticate);

  app.get("/", getHabits);

  app.get("/summary", getDaysSummary);

  app.post("/", createHabit);

  app.patch("/:id/toggle", toggleHabitState);
}
