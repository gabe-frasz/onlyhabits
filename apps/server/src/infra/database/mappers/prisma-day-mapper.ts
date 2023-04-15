import { Day as PrismaDay } from "@prisma/client";

import { Day } from "@/app/repositories";

export class PrismaDayMapper {
  static toPrisma(day: Day) {
    return {
      id: day.id,
      user_id: day.userId,
      date: day.date,
    };
  }

  static toDomain(day: PrismaDay) {
    return {
      id: day.id,
      userId: day.user_id,
      date: day.date,
    };
  }
}
