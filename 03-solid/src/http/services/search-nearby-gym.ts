import {
  ISearchNearbyGymRequest,
  ISearchNearbyGymResponse,
} from "./interfaces";
import { IGymRepository } from "@/http/repositories/interfaces";

export class SearchNearbyGymService {
  constructor(private gymRepository: IGymRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: ISearchNearbyGymRequest): Promise<ISearchNearbyGymResponse> {
    const gyms = await this.gymRepository.findNearbyGyms(
      userLatitude,
      userLongitude
    );

    return { gyms };
  }
}
