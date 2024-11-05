import { FastifyReply, FastifyRequest } from "fastify";

import { makeCheckInMetricsService } from "@/http/services/factories/make-check-in-services";

export async function metrics(request: FastifyRequest, reply: FastifyReply) {
  const getUserMetricsUseCase = makeCheckInMetricsService();
  const { checkInsCount } = await getUserMetricsUseCase.execute({
    userId: request.user.sub,
  });
  return reply.status(200).send({
    checkInsCount,
  });
}
