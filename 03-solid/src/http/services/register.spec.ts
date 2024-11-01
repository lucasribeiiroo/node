import { describe, it, expect } from "vitest";
import { UserRepository } from "../repositories/userRepository";
import { RegisterUser } from "./registerUser";
import { compare } from "bcryptjs";
import { InMemoryUserRepository } from "../repositories/in-memory/in-memory-user-repository";
import { EmailAlreadyExistsError } from "./errors/email-exists";

describe("User Service", () => {
  it("Should hash the password upon the creation of the user", async () => {
    const inMemoryUserRepository = new InMemoryUserRepository();
    const userService = new RegisterUser(inMemoryUserRepository);

    const { user } = await userService.create({
      name: "John doe",
      email: "john@example.com",
      password: "123456",
    });

    const { password_hash } = user;
    const isPasswordCorrettlyHashed = await compare("123456", password_hash);

    expect(isPasswordCorrettlyHashed).toBe(true);
  });

  it("Should not create a user with same email", async () => {
    const inMemoryUserRepository = new InMemoryUserRepository();
    const userService = new RegisterUser(inMemoryUserRepository);

    await userService.create({
      name: "John doe",
      email: "john@example.com",
      password: "123456",
    });

    await expect(
      userService.create({
        name: "John doe",
        email: "john@example.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(EmailAlreadyExistsError);
  });

  it("Should create a user", async () => {
    const inMemoryUserRepository = new InMemoryUserRepository();
    const userService = new RegisterUser(inMemoryUserRepository);

    const { user } = await userService.create({
      name: "John doe",
      email: "john@example.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });
});
