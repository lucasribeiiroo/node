import { FastifyRequest, FastifyReply } from "fastify";
import { authUserSchema } from "@/schemas";

import { InvalidCredentialsError } from "@/http/services/errors/invalid-credentials";
import { makeAuthService } from "@/http/services/factories/make-auth-services";

export async function auth(request: FastifyRequest, reply: FastifyReply) {
  const { password, email } = authUserSchema.parse(request.body);

  try {
    const authService = makeAuthService();
    const { user } = await authService.execute({
      email,
      password,
    });

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
        },
      }
    );
    return reply.status(200).send({ token });
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      reply.status(400).send({ message: err.message });
    }
    reply.status(500).send();
  }
}
