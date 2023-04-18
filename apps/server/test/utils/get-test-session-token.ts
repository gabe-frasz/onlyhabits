import axios from "axios";

import { env } from "@/env";

const clerkAPI = axios.create({
  baseURL: "https://api.clerk.com/v1",
  headers: {
    Authorization: `Bearer ${env.CLERK_SECRET_KEY}`,
  },
});

export async function getTestSessionToken() {
  const { data: sessions } = await clerkAPI.get<any[]>("/sessions");
  const { id } = sessions.find((session) => session.status === "active");

  if (!id) throw new Error("No active sessions found");

  const { data } = await clerkAPI.post(
    `/sessions/${id}/tokens/${env.CLERK_E2E_JWT_TEMPLATE}`,
  );

  return data.jwt;
}
