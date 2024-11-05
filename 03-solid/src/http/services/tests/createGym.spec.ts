import { InMemoryGymRepository } from "@/http/repositories/in-memory/in-memory-gym-repository";
import { describe, it, expect, beforeEach } from "vitest";
import { GymService } from "../createGym";

let inMemoryGymRepository: InMemoryGymRepository;
let sut: GymService;

describe("Create Gym Service", () => {
  beforeEach(async () => {
    inMemoryGymRepository = new InMemoryGymRepository();
    sut = new GymService(inMemoryGymRepository);
  });

  it("Should to be able to register a gym", async () => {
    const { gym } = await sut.create({
      title: "Academia Teste",
      description: "4all",
      phone: "",
      latitude: -30.0225711,
      longitude: -51.1507934,
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
