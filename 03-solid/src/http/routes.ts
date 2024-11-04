import { FastifyInstance } from "fastify";
import { register } from "./controllers/users/register";
import { auth } from "./controllers/users/auth";
import { profile } from "./controllers/users/profile";
import { verifyJWT } from "./controllers/middlewares/verify-jwt";

export async function appRoutes(app: FastifyInstance) {
  app.post("/users", register);
  app.post("/sessions", auth);

  app.post("/me", { onRequest: [verifyJWT] }, profile);
}
