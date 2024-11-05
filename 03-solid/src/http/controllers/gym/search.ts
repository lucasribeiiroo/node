import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeSearchGymService } from "@/http/services/factories/make-gym-services";

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchGymsQuerySchema = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1),
  });

  const { q, page } = searchGymsQuerySchema.parse(request.body);

  const searchGymsUseCase = makeSearchGymService();
  const { gyms } = await searchGymsUseCase.execute({
    query: q,
    page,
  });
  return reply.status(200).send({
    gyms,
  });
}
