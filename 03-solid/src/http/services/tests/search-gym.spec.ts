import { InMemoryGymRepository } from "@/http/repositories/in-memory/in-memory-gym-repository";
import { describe, it, expect, beforeEach } from "vitest";
import { SearchGymService } from "../search-gym";

let inMemoryGymRepository: InMemoryGymRepository;
let sut: SearchGymService;

describe("Search Gyms Service", () => {
  beforeEach(async () => {
    inMemoryGymRepository = new InMemoryGymRepository();
    sut = new SearchGymService(inMemoryGymRepository);
  });

  it("Should to be able to find many gyms with a query", async () => {
    await inMemoryGymRepository.create({
      title: "Academia Teste",
      description: "4all",
      phone: "",
      latitude: -30.0225711,
      longitude: -51.1507934,
    });

    await inMemoryGymRepository.create({
      title: "Academia Teste 2",
      description: "4all",
      phone: "",
      latitude: -30.0225711,
      longitude: -51.1507934,
    });

    const result = await sut.execute({ query: "Teste", page: 1 });
    expect(result.gyms.length).toBe(2);
  });

  it("Should to be able to find many gyms with a query AND paginated", async () => {
    for (let index = 1; index <= 22; index++) {
      await inMemoryGymRepository.create({
        title: `Academia Teste ${index}`,
        description: `${index}`,
        phone: "",
        latitude: -30.0225711,
        longitude: -51.1507934,
      });
    }

    const result = await sut.execute({ query: "Academia", page: 2 });

    expect(result.gyms).toBeInstanceOf(Array);
    expect(result.gyms).toEqual([
      expect.objectContaining({ title: "Academia Teste 21" }),
      expect.objectContaining({ title: "Academia Teste 22" }),
    ]);
  });
});
