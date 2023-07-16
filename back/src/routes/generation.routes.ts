import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { RequestRouteOptions } from "fastify/types/request";
import Core_Utils from "../core/utils.core";
import Core_Generation from "../core/generation.core";

const coreGeneration = new Core_Generation()
const coreUtils = new Core_Utils();

async function routes (fastify: any, options: RequestRouteOptions) {

    fastify.get('/', async (request: any, reply: FastifyReply) => {

        try {
            const generationsData = await coreGeneration.getGenerations();
            reply.send(coreUtils.successFormat(generationsData));
        } catch (error: any) {
            reply.send(coreUtils.errorFormat(error))
        }
    })

}

export default routes;