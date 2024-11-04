import { CheckIn, Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { ICheckInRepository } from "./interfaces";
import dayjs from "dayjs";

export class CheckInRepository implements ICheckInRepository {
  async save(data: CheckIn) {
    const checkIn = await prisma.checkIn.update({
      where: {
        id: data.id,
      },
      data,
    });

    return checkIn;
  }

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

  async findManyByUserId(id: string, page: number) {
    const result = await prisma.checkIn.findMany({
      where: { user_id: id },
      take: 20,
      skip: (page - 1) * 20,
    });

    return result;
  }

  async findByUserIdOnDate(id: string, date: Date) {
    const startOfDay = dayjs(date).startOf("date");
    const endOfDay = dayjs(date).endOf("date");
    const user = await prisma.checkIn.findFirst({
      where: {
        user_id: id,
        created_at: {
          gte: startOfDay.toDate(),
          lte: endOfDay.toDate(),
        },
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
