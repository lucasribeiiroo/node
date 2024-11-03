import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryCheckInRepository } from "../repositories/in-memory/in-memory-checkIn-repository";
import { CheckInHistoryService } from "./checkIn-history";

let inMemoryCheckInRepository: InMemoryCheckInRepository;
let sut: CheckInHistoryService;

describe("Check In History Service", () => {
  beforeEach(async () => {
    inMemoryCheckInRepository = new InMemoryCheckInRepository();
    sut = new CheckInHistoryService(inMemoryCheckInRepository);
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

    const result = await sut.execute({ userId: "user-01", page: 1 });

    expect(result.checkIns).toBeInstanceOf(Array);
    expect(result.checkIns).toEqual([
      expect.objectContaining({ gym_id: "gym-01" }),
      expect.objectContaining({ gym_id: "gym-02" }),
    ]);
  });

  it("Should return the history of checkins of an user paginated", async () => {
    for (let index = 1; index <= 22; index++) {
      await inMemoryCheckInRepository.create({
        gym_id: `gym-${index}`,
        user_id: "user-01",
      });
    }

    const result = await sut.execute({ userId: "user-01", page: 2 });

    expect(result.checkIns).toBeInstanceOf(Array);
    expect(result.checkIns).toEqual([
      expect.objectContaining({ gym_id: "gym-21" }),
      expect.objectContaining({ gym_id: "gym-22" }),
    ]);
  });
});
