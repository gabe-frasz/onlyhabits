import { prisma } from "@/lib";

interface GetSummaryRequest {
  userId: string;
}

export class GetSummary {
  async execute(request: GetSummaryRequest) {
    return await prisma.$queryRaw`
      SELECT
        D.id,
        D.date,
        (
          SELECT
            cast(count(*) as float)
          FROM day_habit DH
          WHERE DH.day_id = D.id
        ) as completed,
        (
          SELECT
            cast(count(*) as float)
          FROM habit_week_days HWD
          JOIN habits H
            ON H.id = HWD.habit_id
          WHERE
            HWD.week_day = cast(extract(dow from D.date::timestamp with time zone) as int)
            AND H.created_at <= D.date::timestamp with time zone
            AND H.user_id = ${request.userId}
        ) as amount
      FROM days D
      WHERE D.user_id = ${request.userId}
    `;
  }
}
