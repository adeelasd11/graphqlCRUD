import { nanoid } from "nanoid";
import { IClient } from "./../types/IEvents.d";
import { emitEvent, eventListener } from "./../modules/emmiter.js";
import { FastifyReply } from "fastify";
import { FastifyRequest } from "fastify";
import { Events } from "../global/event.js";
import { animals, uniqueNamesGenerator } from "unique-names-generator";
export let clients: IClient[] = [];

export const eventStream = (req: FastifyRequest, res: FastifyReply) => {
  const randomName = uniqueNamesGenerator({
    dictionaries: [animals],
    separator: " ",
  });
  const headers = {
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
    "Access-Control-Allow-Methods": "*",
    "Access-Control-Allow-Headers": "text/event-stream",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true",
  };

  const token = (req.query as { token: string }).token;

  res.raw.writeHead(200, headers);

  const newClient = {
    id: token,
    response: res,
    name: `Annonymus ${randomName}`,
    annonymus: true,
    publicId: nanoid(),
  };

  clients.push(newClient);

  req.raw.on("close", () => {
    emitEvent(Events.Disconnect, clients, "Disconnedted");
    clients = clients.filter((item) => item.id !== token);
  });

  emitEvent(Events.Connect, clients, "Connected", newClient);
};

export const getActiveUsers = () => {
  return clients.map((item) => ({
    id: item.publicId,
    name: item.name,
    isAnnonymus: item.annonymus,
  }));
};
