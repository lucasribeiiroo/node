import { describe, it, expect, beforeEach } from "vitest";
import { hash } from "bcryptjs";
import { InMemoryUserRepository } from "../repositories/in-memory/in-memory-user-repository";
import { UserProfileService } from "./userProfile";
import { ResourceNotFoundError } from "./errors/resource-not-found";

let inMemoryUserRepository: InMemoryUserRepository;
let sut: UserProfileService;

describe("User Profile Service", () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    sut = new UserProfileService(inMemoryUserRepository);
  });

  it("Should found a user by id", async () => {
    const password_hash = await hash("123456", 6);

    const { id } = await inMemoryUserRepository.create({
      name: "John doe",
      email: "john@example.com",
      password_hash,
    });

    const { user } = await sut.execute({
      id,
    });

    expect(user.name).toBe("John doe");
  });

  it("Should not find a user with wrong id", async () => {
    await expect(
      sut.execute({
        id: "john-doe-id-not-found",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
