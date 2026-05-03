import { FastifyInstanceDecorated, RequestType } from "@type/route";
import { replyError, replySuccess } from "@core/route.core";

import CoreDare from "@core/dare.core";
import DareClass from "src/classes/dare.class";
import { FastifyReply } from "fastify";
import { RequestRouteOptions } from "fastify/types/request";

const dareClass = new DareClass();


async function routes(fastify: FastifyInstanceDecorated, options: RequestRouteOptions): Promise<void> {

	fastify.get("/", async (request: RequestType, reply: FastifyReply) => {
		try {
			const offset = request.query.offset ? parseInt(request.query.offset) : 1;
			const limit = request.query.limit ? parseInt(request.query.limit) : 25;
			const max = request.query.limit ? parseInt(request.query.max) : null;
			const language = request.headers['accept-language'] || 'fr-FR';

			const dare = await dareClass.getWithPagination(offset, limit, max, language);
			await replySuccess(dare, reply, "get");
		} catch (error) {
			await replyError(error, reply);
		}
	});

	fastify.post("/", { onRequest: [fastify.authenticate] }, async (request: RequestType, reply: FastifyReply) => {
		try {
			request.body.dare.CREATOR_ID = request.user.ID
			const dare = await dareClass.add(request.body.dare);
			await replySuccess(dare, reply, "post");
		} catch (error) {
			await replyError(error, reply);
		}
	});
}

export default routes;
