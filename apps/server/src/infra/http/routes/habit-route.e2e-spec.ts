import { execSync } from "node:child_process";
import request from "supertest";

import { prisma } from "@/lib";
import { getTestSessionToken } from "test";
import { app } from "../../../app";

describe("[E2E] Habit routes", () => {
  let token: string;

  beforeAll(async () => {
    const promises = await Promise.all([app.ready(), getTestSessionToken()]);

    token = promises.at(1);
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    execSync("pnpm prisma migrate reset --skip-seed --skip-generate --force");
  });

  test("GET /habits", async () => {
    await request(app.server)
      .get("/habits?date=2023-06-13")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });

  test("GET /habits/summary", async () => {
    await request(app.server)
      .get("/habits/summary")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });

  test("POST /habits", async () => {
    await request(app.server)
      .post("/habits")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "some title",
        weekDays: [0, 1, 2],
      })
      .expect(201);
  });

  test("PATCH /habits/:id/toggle", async () => {
    await request(app.server)
      .post("/habits")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "some title",
        weekDays: [0, 1, 2],
      });

    const habit = await prisma.habit.findFirst({
      where: {
        title: "some title",
      },
    });

    await request(app.server)
      .patch(`/habits/${habit?.id}/toggle`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });
});
