import Core_Utils from "../core/utils.core";
import Core_Generation from "../core/generation.core";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { RequestRouteOptions } from "fastify/types/request";

const coreGeneration = new Core_Generation();
const coreUtils = new Core_Utils();

async function routes(fastify: FastifyInstance, options: RequestRouteOptions): Promise<void> {
	fastify.get("/", async (request: FastifyRequest, reply: FastifyReply) => {
		try {
			const generationsData = await coreGeneration.getGenerations();
			reply.send(coreUtils.successFormat(generationsData));
		} catch (error: any) {
			reply.send(coreUtils.errorFormat(error));
		}
	});
}

export default routes;
