import { FastifyInstance } from "fastify";

import {
  CreateHabit,
  GetDayInfo,
  ToggleHabitState,
  getSummary,
} from "@/app/use-cases";
import { prismaDaysRepository, prismaHabitsRepository } from "@/infra/database";
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

    const getDayInfo = new GetDayInfo(prismaHabitsRepository);
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

    const createHabit = new CreateHabit(prismaHabitsRepository);
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

    const toggleHabitState = new ToggleHabitState(
      prismaHabitsRepository,
      prismaDaysRepository,
    );
    await toggleHabitState.execute(id);

    res.send();
  });
}
