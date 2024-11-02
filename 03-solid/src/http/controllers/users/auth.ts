import { FastifyRequest, FastifyReply } from "fastify";
import { authUserSchema } from "@/schemas";
import { UserRepository } from "@/http/repositories/userRepository";
import { AuthService } from "@/http/services/auth";
import { InvalidCredentialsError } from "@/http/services/errors/invalid-credentials";

export async function auth(request: FastifyRequest, reply: FastifyReply) {
  const { password, email } = authUserSchema.parse(request.body);

  try {
    const userRepository = new UserRepository();
    const registerUser = new AuthService(userRepository);
    await registerUser.execute({
      email,
      password,
    });
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      reply.status(400).send({ message: err.message });
    }
    reply.status(500).send();
  }

  return reply.status(200).send();
}
