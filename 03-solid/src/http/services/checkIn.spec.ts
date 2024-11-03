import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

import { CheckInService } from "./checkIn";
import { InMemoryCheckInRepository } from "../repositories/in-memory/in-memory-checkIn-repository";
import { SameDateCheckInError } from "./errors/same-date";
import { InMemoryGymRepository } from "../repositories/in-memory/in-memory-gym-repository";
import { Decimal } from "@prisma/client/runtime/library";
import { DistantGymError } from "./errors/distant-gym";

let inMemoryCheckInRepository: InMemoryCheckInRepository;
let inMemoryGymRepository: InMemoryGymRepository;
let sut: CheckInService;

describe("Check In Service", () => {
  beforeEach(async () => {
    inMemoryGymRepository = new InMemoryGymRepository();
    inMemoryCheckInRepository = new InMemoryCheckInRepository();
    sut = new CheckInService(inMemoryCheckInRepository, inMemoryGymRepository);

    await inMemoryGymRepository.create({
      id: "gym-01",
      title: "Academia Teste",
      description: "4all",
      phone: "",
      latitude: new Decimal(-30.0225711),
      longitude: new Decimal(-51.1507934),
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("Should to be able to check in", async () => {
    const { checkIn } = await sut.create({
      userId: "user-01",
      gymId: "gym-01",
      userLatitude: -30.0225711,
      userLongitude: -51.1507934,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("Should not be able to check in twice in the same day", async () => {
    vi.setSystemTime(new Date(2024, 0, 20, 11, 0, 0));

    await sut.create({
      userId: "user-01",
      gymId: "gym-01",
      userLatitude: -30.0225711,
      userLongitude: -51.1507934,
    });

    await expect(
      sut.create({
        userId: "user-01",
        gymId: "gym-01",
        userLatitude: -30.0225711,
        userLongitude: -51.1507934,
      })
    ).rejects.toBeInstanceOf(SameDateCheckInError);
  });

  it("Should  be able to check in twice in differents days", async () => {
    vi.setSystemTime(new Date(2024, 0, 20, 11, 0, 0));

    await sut.create({
      userId: "user-01",
      gymId: "gym-01",
      userLatitude: -30.0225711,
      userLongitude: -51.1507934,
    });

    vi.setSystemTime(new Date(2024, 0, 21, 11, 0, 0));

    const { checkIn } = await sut.create({
      userId: "user-01",
      gymId: "gym-01",
      userLatitude: -30.0225711,
      userLongitude: -51.1507934,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("Should not be able to check in distant gyms", async () => {
    await inMemoryGymRepository.create({
      id: "gym-02",
      title: "Academia Teste 2",
      description: "4all",
      phone: "",
      latitude: new Decimal(-30.0075212),
      longitude: new Decimal(-51.1313957),
    });

    await expect(
      sut.create({
        userId: "user-01",
        gymId: "gym-02",
        userLatitude: -30.0225711,
        userLongitude: -51.1507934,
      })
    ).rejects.toBeInstanceOf(DistantGymError);
  });
});
