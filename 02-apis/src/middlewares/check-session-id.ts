import { FastifyReply, FastifyRequest } from "fastify";

export async function checkSessionId(
  request: FastifyRequest,
  response: FastifyReply
) {
  let sessionId = request.cookies.sessionId;

  if (!sessionId) {
    response.status(401).send({
      error: "Unauthorized",
    });
  }
}
