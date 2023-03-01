import { FastifyInstance } from "fastify";

import {
  createHabit,
  getDayInfo,
  getSummary,
  toggleHabitState,
} from "@/app/use-cases";
import {
  createHabitBodySchema,
  getDayInfoSchema,
  toggleHabitStateBodySchema,
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

  app.get("/summary", async (req, res) => {
    const summary = await getSummary.execute();

    res.send(summary);
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

  app.patch("/:id/toggle", async (req, res) => {
    const parsedParams = toggleHabitStateBodySchema.safeParse(req.params);
    if (!parsedParams.success)
      return res.status(400).send(parsedParams.error.message);

    const { id } = parsedParams.data;

    await toggleHabitState.execute(id);

    res.send();
  });
}
