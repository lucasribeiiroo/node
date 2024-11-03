import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryCheckInRepository } from "../repositories/in-memory/in-memory-checkIn-repository";
import { CheckInHistoryService } from "./checkIn-history";
import { ICheckInRepository } from "../repositories/interfaces";
import { CheckInMetricsService } from "./checkIn-metrics";

let inMemoryCheckInRepository: ICheckInRepository;
let sut: CheckInMetricsService;

describe("Check In History Service", () => {
  beforeEach(async () => {
    inMemoryCheckInRepository = new InMemoryCheckInRepository();
    sut = new CheckInMetricsService(inMemoryCheckInRepository);
  });

  it("Should return the history of checkins of an user", async () => {
    await inMemoryCheckInRepository.create({
      user_id: "user-01",
      gym_id: "gym-01",
    });

    await inMemoryCheckInRepository.create({
      user_id: "user-01",
      gym_id: "gym-02",
    });

    const result = await sut.execute({ userId: "user-01" });

    expect(result.checkInsCount).toBe(2);
  });
});
