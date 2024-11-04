import { makeUserProfileService } from "src/http/services/factories/make-user-services";
import { FastifyRequest, FastifyReply } from "fastify";

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify();

  const getUserProfile = makeUserProfileService();

  const { user } = await getUserProfile.execute({
    id: request.user.sub,
  });

  return reply.status(200).send({
    user: {
      ...user,
      password_hash: undefined,
    },
  });
}
