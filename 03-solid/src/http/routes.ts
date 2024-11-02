import { FastifyInstance } from "fastify";
import { register } from "./controllers/users/register";
import { auth } from "./controllers/users/auth";

export async function appRoutes(app: FastifyInstance) {
  app.post("/users", register);
  app.post("/sessions", auth);
}
