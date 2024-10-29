import { FastifyInstance } from "fastify";
import { knex } from "../database";
import { getTransactionsSquema, postTransactionsSquema } from "./schemas";
import { debug } from "console";
import { checkSessionId } from "../middlewares/check-session-id";

export async function transactionsRoutes(app: FastifyInstance) {
  app.post("/", { preHandler: [checkSessionId] }, async (request, response) => {
    const transaction = postTransactionsSquema.parse(request.body);

    const { title, amount, type } = transaction;

    let { sessionId } = request.cookies;

    if (!sessionId) {
      sessionId = crypto.randomUUID();

      response.cookie("sessionId", sessionId, {
        path: "/",
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 dias
      });
    }

    await knex("transactions").insert({
      id: crypto.randomUUID(),
      title,
      amount: type === "credit" ? amount : amount * -1,
      session_id: sessionId,
    });

    response.status(201).send();
  });

  app.get("/", { preHandler: [checkSessionId] }, async (request, response) => {
    const { sessionId } = request.cookies;

    const transactions = await knex("transactions")
      .where("session_id", sessionId)
      .select();

    return { transactions };
  });

  app.get(
    "/summary",
    { preHandler: [checkSessionId] },
    async (request, response) => {
      let { sessionId } = request.cookies;

      const summary = await knex("transactions")
        .sum("amount", { as: "amount" })
        .where({
          session_id: sessionId,
        })
        .first();

      return { summary };
    }
  );

  app.get("/:id", { preHandler: [checkSessionId] }, async (request) => {
    let { sessionId } = request.cookies;
    const { id } = getTransactionsSquema.parse(request.params);
    const transaction = await knex("transactions")
      .where({
        id,
        session_id: sessionId,
      })
      .first();

    return { transaction };
  });
}
