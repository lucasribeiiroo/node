import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

import { CheckInService } from "./checkIn";
import { InMemoryCheckInRepository } from "../repositories/in-memory/in-memory-checkIn-repository";
import { SameDateCheckInError } from "./errors/same-date";
import { InMemoryGymRepository } from "../repositories/in-memory/in-memory-gym-repository";
import { Decimal } from "@prisma/client/runtime/library";
import { DistantGymError } from "./errors/distant-gym";
import { GymRepository } from "../repositories/gymRepository";
import { GymService } from "./createGym";

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
