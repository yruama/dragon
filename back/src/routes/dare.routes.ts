import { FastifyInstanceDecorated, RequestType } from "@type/route";
import { replyError, replySuccess } from "@core/route.core";

import CoreDare from "@core/dare.core";
import DareClass from "src/classes/dare.class";
import { FastifyReply } from "fastify";
import { RequestRouteOptions } from "fastify/types/request";

const dataClass = new DareClass();


async function routes(fastify: FastifyInstanceDecorated, options: RequestRouteOptions): Promise<void> {
	console.log("???")

	fastify.get("/", async (request: RequestType, reply: FastifyReply) => {
		try {
			const offset = request.query.offset ? parseInt(request.query.offset) : 1;
			const limit = request.query.limit ? parseInt(request.query.limit) : 25;
			const max = request.query.limit ? parseInt(request.query.max) : null;
			const language = request.headers['accept-language'] || 'fr-FR';

			const data = await dataClass.getWithPagination(offset, limit, max, language);
			await replySuccess(data, reply, "get");
		} catch (error) {
			await replyError(error, reply);
		}
	});

	//fastify.post("/", { onRequest: [fastify.authenticate] }, async (request: RequestType, reply: FastifyReply) => {
	fastify.post("/", async (request: RequestType, reply: FastifyReply) => {
		try {
			console.log("BODY : ", request.body)
			const data = await dataClass.add(request.body.data);
			await replySuccess(data, reply, "post");
		} catch (error) {
			await replyError(error, reply);
		}
	});
}

export default routes;
