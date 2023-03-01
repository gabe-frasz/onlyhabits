import { z } from "zod";

export const toggleHabitStateBodySchema = z.object({
  id: z.string().uuid(),
});
