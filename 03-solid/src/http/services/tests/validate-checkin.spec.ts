import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { InMemoryCheckInRepository } from "../../repositories/in-memory/in-memory-checkIn-repository";
import { ValidateCheckinService } from "../validate-checkin";
import { ResourceNotFoundError } from "../errors/resource-not-found";
import { CheckInLimitTimeError } from "../errors/check-in-limit";

let inMemoryCheckInRepository: InMemoryCheckInRepository;

let sut: ValidateCheckinService;

describe("Validate Check In Service", () => {
  beforeEach(async () => {
    inMemoryCheckInRepository = new InMemoryCheckInRepository();
    sut = new ValidateCheckinService(inMemoryCheckInRepository);

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("Should to be able to validate the check in", async () => {
    const { id } = await inMemoryCheckInRepository.create({
      user_id: "user-01",
      gym_id: "gym-01",
    });

    const { checkIn } = await sut.execute({
      id,
    });

    expect(checkIn.validated_at).toEqual(expect.any(Date));
    expect(inMemoryCheckInRepository.items[0].validated_at).toEqual(
      expect.any(Date)
    );
  });

  it("Should not to be able to validate an non-existent check in", async () => {
    const { id } = await inMemoryCheckInRepository.create({
      user_id: "user-01",
      gym_id: "gym-01",
    });

    await expect(
      sut.execute({
        id: "checkin-01",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it("Should not to be able to validate the checkin after 20 minutes of the creation", async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 13, 40));

    const { id } = await inMemoryCheckInRepository.create({
      user_id: "user-01",
      gym_id: "gym-01",
    });

    const TWENTY_ONE_MINUTES = 1000 * 60 * 21;

    vi.advanceTimersByTime(TWENTY_ONE_MINUTES);

    await expect(
      sut.execute({
        id,
      })
    ).rejects.toBeInstanceOf(CheckInLimitTimeError);
  });
});
