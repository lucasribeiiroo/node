import { describe, it, expect } from "vitest";
import { RegisterUser } from "./registerUser";
import { compare, hash } from "bcryptjs";
import { InMemoryUserRepository } from "../repositories/in-memory/in-memory-user-repository";
import { AuthService } from "./auth";
import { InvalidCredentialsError } from "./errors/invalid-credentials";

describe("Auth Service", () => {
  it("Should authenticate the user", async () => {
    const inMemoryUserRepository = new InMemoryUserRepository();
    const sut = new AuthService(inMemoryUserRepository);

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
    const inMemoryUserRepository = new InMemoryUserRepository();
    const sut = new AuthService(inMemoryUserRepository);
  });

  it("Should not authenticate the user with wrong password", async () => {
    const inMemoryUserRepository = new InMemoryUserRepository();
    const sut = new AuthService(inMemoryUserRepository);

    const password_hash = await hash("123456", 6);

    await inMemoryUserRepository.create({
      name: "John doe",
      email: "john@example.com",
      password_hash,
    });

    await expect(
      sut.execute({
        email: "john3@example.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
