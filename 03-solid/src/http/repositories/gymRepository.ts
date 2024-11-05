import { prisma } from "@/lib/prisma";
import { IGymRepository } from "./interfaces";
import { Gym, Prisma } from "@prisma/client";

export class GymRepository implements IGymRepository {
  async findNearbyGyms(latitude: number, longitude: number) {
    const gyms = await prisma.$queryRaw<Gym[]>`
      SELECT * from gyms
      WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `;

    return gyms;
  }

  async findById(id: string) {
    const gym = await prisma.gym.findFirst({
      where: {
        id,
      },
    });
    return gym;
  }

  async findMany(query: string, page: number) {
    const gym = await prisma.gym.findMany({
      where: {
        title: {
          contains: query,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
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
