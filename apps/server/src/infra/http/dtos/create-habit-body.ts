import { z } from "zod";

export const createHabitBodySchema = z.object({
  title: z.string(),
  weekDays: z.array(z.number().min(0).max(6)).nonempty(),
});

// export async function validateCreateHabitBody(
//   req: FastifyRequest,
//   res: FastifyReply,
// ) {
//   const parsedBody = createHabitBodySchema.safeParse(req.body);

//   if (!parsedBody.success) {
//     return res.status(400).send(parsedBody.error.message);
//   }

//   req.body = parsedBody.data;
// }
