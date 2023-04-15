import { getAuth } from "@clerk/fastify";
import { preHandlerHookHandler } from "fastify";

export const authenticate: preHandlerHookHandler = (req, res, next) => {
  const { userId } = getAuth(req);

  if (!userId) return res.status(401).send();

  next();
};
