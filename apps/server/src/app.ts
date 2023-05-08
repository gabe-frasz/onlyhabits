import { clerkPlugin } from "@clerk/fastify";
import cors from "@fastify/cors";
import Fastify from "fastify";

import { env } from "./env";
import { habitRoutes } from "./infra/http";

export const app = Fastify({ logger: true });

const clerkOptions = {
  publishableKey: env.CLERK_PUBLISHABLE_KEY,
  secretKey: env.CLERK_SECRET_KEY,
};

// plugins
app.register(cors, { origin: [env.WEB_ORIGIN_URL] });
app.register(clerkPlugin, clerkOptions);

// routes
app.register(habitRoutes, { prefix: "/habits" });
