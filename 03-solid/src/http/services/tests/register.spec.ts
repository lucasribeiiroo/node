import { IUserRepository } from "@/http/repositories/interfaces";
import { describe, it, expect, beforeEach } from "vitest";
import { RegisterUser } from "../registerUser";
import { EmailAlreadyExistsError } from "../errors/email-exists";
import { InMemoryUserRepository } from "@/http/repositories/in-memory/in-memory-user-repository";
import { compare } from "bcryptjs";

let inMemoryUserRepository: IUserRepository;
let sut: RegisterUser;

describe("User Service", () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    sut = new RegisterUser(inMemoryUserRepository);
  });
  it("Should hash the password upon the creation of the user", async () => {
    const { user } = await sut.create({
      name: "John doe",
      email: "john@example.com",
      password: "123456",
    });

    const { password_hash } = user;
    const isPasswordCorrettlyHashed = await compare("123456", password_hash);

    expect(isPasswordCorrettlyHashed).toBe(true);
  });

  it("Should not create a user with same email", async () => {
    await sut.create({
      name: "John doe",
      email: "john@example.com",
      password: "123456",
    });

    await expect(
      sut.create({
        name: "John doe",
        email: "john@example.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(EmailAlreadyExistsError);
  });

  it("Should create a user", async () => {
    const { user } = await sut.create({
      name: "John doe",
      email: "john@example.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });
});
