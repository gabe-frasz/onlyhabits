import { DaysRepository } from "@/app/repositories";
import { prisma } from "@/lib";
import { PrismaDayMapper } from "../../mappers";

export class PrismaDaysRepository implements DaysRepository {
  async findOne(date: Date, userId: string) {
    const day = await prisma.day.findUnique({
      where: {
        user_id_date: {
          user_id: userId,
          date,
        },
      },
    });

    return day ? PrismaDayMapper.toDomain(day) : null;
  }

  async create(date: Date, userId: string) {
    const day = await prisma.day.create({
      data: {
        user_id: userId,
        date,
      },
    });

    return PrismaDayMapper.toDomain(day);
  }
}

export const prismaDaysRepository = new PrismaDaysRepository();
