import { FastifyRequest } from "fastify";
export const getSessionId = (req: FastifyRequest) => {
  return req.headers.sessionid ?? new Error("Session Id not found!");
};
