import { FastifyInstance } from "fastify";
import { register } from "./register";
import { auth } from "./auth";
import { profile } from "./profile";
import { verifyJWT } from "../middlewares/verify-jwt";

export async function userRoutes(app: FastifyInstance) {
  app.post("/users", register);
  app.post("/sessions", auth);

  app.get("/me", { onRequest: [verifyJWT] }, profile);
}
