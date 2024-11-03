import { Gym } from "@prisma/client";
import { ICreateGymRequest, ICreateGymResponse } from "./interfaces";
import { IGymRepository } from "@/http/repositories/interfaces";

export class GymService {
  constructor(private gymRepository: IGymRepository) {}

  async create({
    title,
    description,
    phone,
    latitude,
    longitude,
  }: ICreateGymRequest): Promise<ICreateGymResponse> {
    const gym = await this.gymRepository.create({
      title,
      description,
      phone,
      latitude,
      longitude,
    });

    return { gym };
  }
}
