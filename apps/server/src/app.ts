import cors from "@fastify/cors";
import Fastify from "fastify";

import { env } from "./env";
import { habitRoutes } from "./infra/http";

export const app = Fastify();

app.register(cors, { origin: env.WEB_ORIGIN_URL });

app.register(habitRoutes, { prefix: "/habits" });
