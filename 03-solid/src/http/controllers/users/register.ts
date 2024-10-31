import { FastifyRequest, FastifyReply } from "fastify";
import { createUserSchema } from "@/schemas";
import { RegisterUser } from "@/http/services/registerUser";
import { UserRepository } from "@/http/repositories/userRepository";
import { EmailAlreadyExistsError } from "@/http/services/errors/email-exists";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const { name, password, email } = createUserSchema.parse(request.body);

  try {
    const userRepository = new UserRepository();
    const registerUser = new RegisterUser(userRepository);
    await registerUser.create({
      name,
      email,
      password,
    });
  } catch (err) {
    if (err instanceof EmailAlreadyExistsError) {
      reply.status(409).send({ message: err.message });
    }
    reply.status(500).send();
  }

  return reply.status(201).send();
}
