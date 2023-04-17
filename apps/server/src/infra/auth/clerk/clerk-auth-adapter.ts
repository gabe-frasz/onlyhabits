import { getAuth } from "@clerk/fastify";
import type { FastifyRequest } from "fastify";

import type { AuthAdapter } from "@/app/adapters";

export class ClerkAuthAdapter implements AuthAdapter {
  getUserId(req: FastifyRequest) {
    const { userId } = getAuth(req);

    return userId;
  }
}
