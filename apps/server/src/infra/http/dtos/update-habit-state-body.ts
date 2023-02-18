import { z } from "zod";

export const updateHabitStateBodySchema = z.object({
  id: z.string().uuid(),
});
