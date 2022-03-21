import { FastifyReply } from "fastify";
export interface IClient {
  id: string;
  response: FastifyReply;
  name: string;
  annonymus: boolean;
  publicId: string;
}

export type IEvent = (
  data: unknown,
  clients: IClient[],
  client?: IClient
) => { to: IClient | IClient[] | undefined; rawData: any };
