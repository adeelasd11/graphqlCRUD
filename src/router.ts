import { eventStream } from "./controller/eventController.js";
import { getHome } from "./controller/homeController.js";
import { fastify } from "./config.js";

fastify.get("/", getHome);
fastify.get("/connect", eventStream);

export { fastify as server };
