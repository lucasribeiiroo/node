import { app } from "@/app";
import request from "supertest";
import { describe, it, afterAll, beforeAll, expect } from "vitest";

describe("Authenticate user e2e", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to login", async () => {
    await request(app.server).post("/users").send({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    const responseLogin = await request(app.server).post("/sessions").send({
      email: "johndoe@example.com",
      password: "123456",
    });

    expect(responseLogin.statusCode).toEqual(200);
    expect(responseLogin.body).toEqual({ token: expect.any(String) });
  });
});
