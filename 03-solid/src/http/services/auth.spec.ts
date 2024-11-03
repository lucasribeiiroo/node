import { describe, it, expect, beforeEach } from "vitest";
import { hash } from "bcryptjs";
import { InMemoryUserRepository } from "../repositories/in-memory/in-memory-user-repository";
import { AuthService } from "./auth";
import { InvalidCredentialsError } from "./errors/invalid-credentials";

let inMemoryUserRepository: InMemoryUserRepository;
let sut: AuthService;

describe("Auth Service", () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    sut = new AuthService(inMemoryUserRepository);
  });

  it("Should authenticate the user", async () => {
    const password_hash = await hash("123456", 6);

    await inMemoryUserRepository.create({
      name: "John doe",
      email: "john@example.com",
      password_hash,
    });

    const { user } = await sut.execute({
      email: "john@example.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("Should not authenticate the user with wrong email", async () => {
    const password_hash = await hash("123456", 6);

    await inMemoryUserRepository.create({
      name: "John doe",
      email: "john@example.com",
      password_hash,
    });

    await expect(
      sut.execute({
        email: "john3@example.com",
        password: "15523456",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("Should not authenticate the user with wrong password", async () => {
    const password_hash = await hash("123456", 6);

    await inMemoryUserRepository.create({
      name: "John doe",
      email: "john@example.com",
      password_hash,
    });

    await expect(
      sut.execute({
        email: "john@example.com",
        password: "15523456",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
