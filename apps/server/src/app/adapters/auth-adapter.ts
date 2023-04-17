import { FastifyRequest } from "fastify";

export interface AuthAdapter {
  getUserId: (request: FastifyRequest) => string | null;
}
