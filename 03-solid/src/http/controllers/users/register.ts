import { FastifyRequest, FastifyReply } from "fastify";
import { createUserSchema } from "@/schemas";
import { EmailAlreadyExistsError } from "@/http/services/errors/email-exists";
import { makeRegisterService } from "@/http/services/factories/make-user-services";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const { name, password, email } = createUserSchema.parse(request.body);

  try {
    const registerUser = makeRegisterService();
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
