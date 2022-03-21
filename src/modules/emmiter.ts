import { IEvent } from "./../types/IEvents.d";
import { FastifyReply } from "fastify";
import { EventEmitter } from "events";
import { Events } from "../global/event.js";
import { IClient } from "../types/IEvents";
export const emmiter = new EventEmitter();

export const emitEvent = (
  event: Events,
  clients: IClient[],
  details?: any,
  client?: IClient
) => {
  return emmiter.emit("emit", {
    event,
    client,
    details,
    clients,
  });
};

export const eventListener = () => {
  emmiter.addListener("emit", (e) => {
    const {
      details,
      event,
      client,
      clients,
    }: { event: Events; details?: any; client?: IClient; clients: IClient[] } =
      e;

    const write = (data: IEvent) => {
      const { rawData, to } = data(details, clients, client);
      console.log(to);

      if (client == undefined) {
        return console.error("Client not defined!");
      }

      if (Array.isArray(to)) {
        to.forEach((item) => {
          item.response.raw.write(
            `data:${JSON.stringify({
              details: rawData,
              event,
            })}\n\n`
          );
        });
      } else {
        to?.response?.raw.write(
          `data:${JSON.stringify({
            details: rawData,
            event,
          })}\n\n`
        );
      }
    };
    //Define your events here
    switch (event) {
      case Events.Connect:
        write(connectEventSelf);
        break;
    }
  });
};

const connectEventSelf: IEvent = (_data, _clients, client) => {
  return {
    to: client,
    rawData: `You are connected! client ${client?.publicId}`,
  };
};
eventListener();
