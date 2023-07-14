import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { RequestRouteOptions } from "fastify/types/request";

async function routes (fastify: FastifyInstance, options: RequestRouteOptions) {
  fastify.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    return { hello: 'world' }
  })
}

export default routes;