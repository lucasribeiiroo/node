import { Gym, Prisma } from "@prisma/client";
import { IGymRepository } from "@/http/repositories/interfaces";
import { getDistanceBetweenCoordinates } from "@/utils/distance-beetween-coordiantes";

export class InMemoryGymRepository implements IGymRepository {
  public items: Gym[] = [];

  async findNearbyGyms(latitude: number, longitude: number) {
    return this.items.filter((item) => {
      const distance = getDistanceBetweenCoordinates(
        { latitude, longitude },
        {
          latitude: item.latitude.toNumber(),
          longitude: item.longitude.toNumber(),
        }
      );

      return distance < 10;
    });
  }

  async create(data: Prisma.GymCreateInput) {
    const gym: Gym = {
      id: data.id || crypto.randomUUID(),
      title: data.title,
      description: data.description || null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
      created_at: new Date(),
      phone: data.phone || null,
    };
    this.items.push(gym);

    return gym;
  }

  async findMany(query: string, page: number): Promise<Gym[]> {
    return this.items
      .filter((item) => item.title.includes(query))
      .slice((page - 1) * 20, page * 20);
  }

  async findById(id: string) {
    const gym = this.items.find((item) => item.id === id);

    return gym || null;
  }
}
