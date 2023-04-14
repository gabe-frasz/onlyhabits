import { DaysRepository } from "@/app/repositories";
import { prisma } from "@/lib";

export class PrismaDaysRepository implements DaysRepository {
  async findOne(date: Date, userId: string) {
    return await prisma.day.findUnique({
      where: {
        user_id_date: {
          user_id: userId,
          date,
        },
      },
    });
  }

  async create(date: Date, userId: string) {
    return await prisma.day.create({
      data: {
        user_id: userId,
        date,
      },
    });
  }
}

export const prismaDaysRepository = new PrismaDaysRepository();
