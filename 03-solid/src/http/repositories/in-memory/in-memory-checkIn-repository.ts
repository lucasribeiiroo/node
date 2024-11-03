import { CheckIn, Prisma } from "@prisma/client";
import { ICheckInRepository } from "@/http/repositories/interfaces";
import dayjs from "dayjs";

export class InMemoryCheckInRepository implements ICheckInRepository {
  public items: CheckIn[] = [];

  async save(data: CheckIn): Promise<CheckIn> {
    const index = this.items.findIndex((item) => item.id === data.id);
    if (index) {
      this.items[index] = data;
    }

    return data;
  }

  async countByUserId(userId: string): Promise<number> {
    return this.items.filter((item) => item.user_id == userId).length;
  }

  async findById(id: string) {
    const checkIn = this.items.find((item) => item.id == id);
    return checkIn || null;
  }

  async findManyByUserId(id: string, page: number): Promise<CheckIn[]> {
    return this.items
      .filter((item) => item.user_id == id)
      .slice((page - 1) * 20, page * 20);
  }

  async findByUserIdOnDate(id: string, date: Date): Promise<CheckIn | null> {
    const startOfDay = dayjs(date).startOf("date");
    const endOfDay = dayjs(date).endOf("date");
    const checkInOnSameDate = this.items.find((item) => {
      const checkInDate = dayjs(item.created_at);
      const isOnSameDate =
        checkInDate.isAfter(startOfDay) && checkInDate.isBefore(endOfDay);
      return item.user_id === id && isOnSameDate ? item : null;
    });

    return checkInOnSameDate || null;
  }
  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn: CheckIn = {
      id: crypto.randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date(),
    };

    this.items.push(checkIn);

    return checkIn;
  }
}
