import { FastifyInstance } from "fastify";

import { createHabit, getDayInfo } from "@/app/use-cases";
import {
  createHabitBodySchema,
  getDayInfoSchema,
  updateHabitStateBodySchema,
} from "../dtos";
import { HabitViewModel } from "../view-models";

export async function habitRoutes(app: FastifyInstance) {
  app.get("/", async (req, res) => {
    const parsedParams = getDayInfoSchema.safeParse(req.query);
    if (!parsedParams.success)
      return res.status(400).send(parsedParams.error.message);

    const { date } = parsedParams.data;

    const { possibleHabits, completedHabitsId } = await getDayInfo.execute({
      date,
    });

    const habits = possibleHabits.map((habit) =>
      HabitViewModel.toHttp(habit, completedHabitsId),
    );

    res.send({ habits });
  });

  app.get("/:id", async (req, res) => {
    const parsedParams = updateHabitStateBodySchema.safeParse(req.params);
    if (!parsedParams.success)
      return res.status(400).send(parsedParams.error.message);

    const { id } = parsedParams.data;
  });

  app.post("/", async (req, res) => {
    const parsedBody = createHabitBodySchema.safeParse(req.body);
    if (!parsedBody.success)
      return res.status(400).send(parsedBody.error.message);

    const { title, weekDays } = parsedBody.data;

    await createHabit.execute({
      title,
      weekDays,
    });

    res.status(201).send();
  });
}
