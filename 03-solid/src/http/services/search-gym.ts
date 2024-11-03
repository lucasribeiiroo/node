import { ISearchGymRequest, ISearchGymResponse } from "./interfaces";
import { IGymRepository } from "@/http/repositories/interfaces";

export class SearchGymService {
  constructor(private gymRepository: IGymRepository) {}

  async execute({
    query,
    page,
  }: ISearchGymRequest): Promise<ISearchGymResponse> {
    const gyms = await this.gymRepository.findMany(query, page);

    return { gyms };
  }
}
