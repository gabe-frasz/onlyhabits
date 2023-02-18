import { FastifyInstance } from "fastify";
import { z } from "zod";

import { CreateHabit } from "@/app/use-cases";
import { prismaHabitsRepository } from "@/infra/database";

export async function habitRoutes(app: FastifyInstance) {
  app.post("/", async (req, res) => {
    const createHabitBodySchema = z.object({
      title: z.string(),
      weekDays: z.array(z.number().min(0).max(6)).nonempty(),
    });

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
}
