import { successFormat, errorFormat } from "@core/route.core";
import Core_Generation from "../core/generation.core";
import { FastifyReply } from "fastify";
import { RequestRouteOptions } from "fastify/types/request";
import { FastifyInstanceDecorated, RequestType } from "@type/route";

const coreGeneration = new Core_Generation();

async function routes(fastify: FastifyInstanceDecorated, options: RequestRouteOptions): Promise<void> {
	fastify.get("/", async(request: RequestType, reply: FastifyReply) => {
		try {
			const generationsData = await coreGeneration.getGenerations();
			reply.send(successFormat(generationsData));
		} catch (error) {
			reply.send(errorFormat(error));
		}
	});
}

export default routes;
