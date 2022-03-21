

import Fastify from "fastify";

const fastify = Fastify({ disableRequestLogging: true, logger: true });


export { fastify };
