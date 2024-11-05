import { InMemoryGymRepository } from "@/http/repositories/in-memory/in-memory-gym-repository";
import { describe, it, expect, beforeEach } from "vitest";
import { SearchNearbyGymService } from "../search-nearby-gym";

let inMemoryGymRepository: InMemoryGymRepository;
let sut: SearchNearbyGymService;

describe("Search Nearby Gyms Service", () => {
  beforeEach(async () => {
    inMemoryGymRepository = new InMemoryGymRepository();
    sut = new SearchNearbyGymService(inMemoryGymRepository);
  });

  it("Should to be able to find nearby gyms passing the user coordinates", async () => {
    await inMemoryGymRepository.create({
      title: "Near Gym",
      description: null,
      phone: null,
      latitude: -27.2092052,
      longitude: -49.6401091,
    });

    await inMemoryGymRepository.create({
      title: "Far Gym",
      description: null,
      phone: null,
      latitude: -27.0610928,
      longitude: -49.5229501,
    });

    const result = await sut.execute({
      userLatitude: -27.2092052,
      userLongitude: -49.6401091,
    });

    expect(result.gyms).toHaveLength(1);
    expect(result.gyms).toEqual([
      expect.objectContaining({ title: "Near Gym" }),
    ]);
  });
});
