import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { ICheckInRepository } from "./interfaces";

export class CheckInRepository implements ICheckInRepository {
  async findById(id: string) {
    const result = await prisma.checkIn.findUnique({
      where: { id },
    });

    return result;
  }
  async countByUserId(userId: string) {
    const result = await prisma.checkIn.count({
      where: { user_id: userId },
    });
    return result;
  }
  async findManyByUserId(id: string) {
    const result = await prisma.checkIn.findMany({
      where: { user_id: id },
    });

    return result;
  }

  async findByUserIdOnDate(id: string, date: Date) {
    const user = await prisma.checkIn.findFirst({
      where: {
        user_id: id,
        created_at: date,
      },
    });
    return user;
  }
  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = await prisma.checkIn.create({
      data,
    });
    return checkIn;
  }
}
