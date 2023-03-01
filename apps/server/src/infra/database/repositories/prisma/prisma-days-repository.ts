import { DaysRepository } from "@/app/repositories";
import { prisma } from "@/lib";

export class PrismaDaysRepository implements DaysRepository {
  async findOne(date: Date) {
    return await prisma.day.findUnique({
      where: {
        date,
      },
    });
  }

  async create(date: Date) {
    return await prisma.day.create({
      data: {
        date,
      },
    });
  }
}

export const prismaDaysRepository = new PrismaDaysRepository();
