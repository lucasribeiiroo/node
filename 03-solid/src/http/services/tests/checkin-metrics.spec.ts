import { describe, it, expect, beforeEach } from "vitest";
import { CheckInMetricsService } from "../checkIn-metrics";
import { ICheckInRepository } from "@/http/repositories/interfaces";
import { InMemoryCheckInRepository } from "@/http/repositories/in-memory/in-memory-checkIn-repository";

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
