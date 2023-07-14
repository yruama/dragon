import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { RequestRouteOptions } from "fastify/types/request";
import Core_Pokemon from "../core/pokemon.core";

const corePokemon = new Core_Pokemon()

async function routes (fastify: FastifyInstance, options: RequestRouteOptions) {

  fastify.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    return { hello: 'world' }
  })

  fastify.get('/:id', async (request: FastifyRequest, reply: FastifyReply) => {
    const id = request.params.id;

    const pokemon = await corePokemon.getPokemon(parseInt(request.params.id));

    reply.send(pokemon)
  })

}

export default routes;