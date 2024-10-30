import { test, beforeAll, afterAll, expect, beforeEach } from "vitest";
import { execSync } from "child_process";
import supertest from "supertest";
import { app } from "../src/app";

beforeAll(async () => {
  await app.ready();
});

afterAll(async () => {
  await app.close();
});

beforeEach(async () => {
  execSync("npm run knex migrate:rollback --all");
  execSync("npm run knex migrate:latest");
});

test("should be able to create of a transaction", async () => {
  await supertest(app.server)
    .post("/transactions")
    .send({ title: "Teste post transaction", amount: 5000, type: "credit" })
    .expect(201);
});

test("should be able to list of all transaction", async () => {
  const response = await supertest(app.server)
    .post("/transactions")
    .send({ title: "Teste post transaction", amount: 5000, type: "credit" })
    .expect(201);

  const cookies = response.get("Set-Cookie") || [];

  const transactions = await supertest(app.server)
    .get("/transactions")
    .set("Cookie", cookies)
    .expect(200);

  expect(transactions.body.transactions).toEqual([
    expect.objectContaining({
      title: "Teste post transaction",
      amount: 5000,
    }),
  ]);
});

test("should be able to list of one transaction by id", async () => {
  const response = await supertest(app.server)
    .post("/transactions")
    .send({ title: "Teste post transaction", amount: 5000, type: "credit" })
    .expect(201);

  const cookies = response.get("Set-Cookie") || [];

  const transactions = await supertest(app.server)
    .get("/transactions")
    .set("Cookie", cookies)
    .expect(200);

  expect(transactions.body.transactions).toEqual([
    expect.objectContaining({
      title: "Teste post transaction",
      amount: 5000,
    }),
  ]);

  const { id } = transactions.body.transactions[0];

  await supertest(app.server)
    .get(`/transactions/${id}`)
    .set("Cookie", cookies)
    .expect(200);
});

test("should be able to get the summary of transactions", async () => {
  const response = await supertest(app.server)
    .post("/transactions")
    .send({ title: "Teste post transaction", amount: 5000, type: "credit" })
    .expect(201);

  const cookies = response.get("Set-Cookie") || [];

  await supertest(app.server)
    .post("/transactions")
    .set("Cookie", cookies)
    .send({ title: "Teste post2 transaction", amount: 1000, type: "debit" })
    .expect(201);

  const summary = await supertest(app.server)
    .get("/transactions/summary")
    .set("Cookie", cookies)
    .expect(200);

  expect(summary.body.summary).toEqual({
    amount: 4000,
  });
});
