import { GymService } from "../createGym";
import { GymRepository } from "@/http/repositories/gymRepository";
import { SearchNearbyGymService } from "../search-nearby-gym";
import { SearchGymService } from "../search-gym";

export const makeGymService = () => {
  const gymRepository = new GymRepository();
  const useCase = new GymService(gymRepository);

  return useCase;
};

export const makeNearbyGymService = () => {
  const gymRepository = new GymRepository();
  const useCase = new SearchNearbyGymService(gymRepository);

  return useCase;
};

export const makeSearchGymService = () => {
  const gymRepository = new GymRepository();
  const useCase = new SearchGymService(gymRepository);

  return useCase;
};
