import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeNearbyGymService } from "@/http/services/factories/make-gym-services";

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
  const nearbyGymsQuerySchema = z.object({
    latitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180;
    }),
  });

  const { latitude, longitude } = await nearbyGymsQuerySchema.parse(
    request.query
  );

  const fetchNearbyGymsUseCase = makeNearbyGymService();

  const { gyms } = await fetchNearbyGymsUseCase.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  });

  return reply.status(200).send({
    gyms,
  });
}
