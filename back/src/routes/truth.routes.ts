import { FastifyInstanceDecorated, RequestType } from "@type/route";
import { replyError, replySuccess } from "@core/route.core";

import CoreTruth from "@core/truth.core";
import { FastifyReply } from "fastify";
import { RequestRouteOptions } from "fastify/types/request";
import TruthClass from "src/classes/truth.class";

const truthClass = new TruthClass();


async function routes(fastify: FastifyInstanceDecorated, options: RequestRouteOptions): Promise<void> {

	fastify.get("/", async (request: RequestType, reply: FastifyReply) => {
		try {
			const offset = request.query.offset ? parseInt(request.query.offset) : 1;
			const limit = request.query.limit ? parseInt(request.query.limit) : 25;
			const max = request.query.limit ? parseInt(request.query.max) : null;
			const language = request.headers['accept-language'] || 'fr-FR';

			const truth = await truthClass.getWithPagination(offset, limit, max, language);
			await replySuccess(truth, reply, "get");
		} catch (error) {
			await replyError(error, reply);
		}
	});

	fastify.post("/", { onRequest: [fastify.authenticate] }, async (request: RequestType, reply: FastifyReply) => {
		try {
			request.body.truth.CREATOR_ID = request.user.ID
			const truth = await truthClass.add(request.body.truth);
			await replySuccess(truth, reply, "post");
		} catch (error) {
			await replyError(error, reply);
		}
	});
}

export default routes;
