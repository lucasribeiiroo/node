import { prisma } from "@/lib/prisma";
import { IGymRepository } from "./interfaces";
import { Gym, Prisma } from "@prisma/client";

export class GymRepository implements IGymRepository {
  async findNearbyGyms(latitude: number, longitude: number): Promise<Gym[]> {
    throw new Error("Method not implemented.");
  }
  async findById(id: string) {
    const gym = await prisma.gym.findFirst({
      where: {
        id,
      },
    });
    return gym;
  }

  async findMany(id: string) {
    const gym = await prisma.gym.findMany({
      where: {
        id,
      },
    });
    return gym;
  }

  async create(data: Prisma.GymCreateInput) {
    const gym = await prisma.gym.create({
      data,
    });
    return gym;
  }
}
