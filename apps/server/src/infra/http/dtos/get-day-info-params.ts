import { z } from "zod";

export const getDayInfoSchema = z.object({
  date: z.coerce.date(),
});
