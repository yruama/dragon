import { FastifyInstanceDecorated, RequestType } from "@type/route";
import { replyError, replySuccess } from "@core/route.core";

import CategoryClass from "src/classes/category.class";
import { FastifyReply } from "fastify";
import { RequestRouteOptions } from "fastify/types/request";

const categoryClass = new CategoryClass();


async function routes(fastify: FastifyInstanceDecorated, options: RequestRouteOptions): Promise<void> {

	fastify.get("/", async (request: RequestType, reply: FastifyReply) => {
		try {
			const category = await categoryClass.getAll();
			await replySuccess(category, reply, "get");
		} catch (error) {
			await replyError(error, reply);
		}
	});

	//fastify.post("/", { onRequest: [fastify.authenticate] }, async (request: RequestType, reply: FastifyReply) => {
	fastify.post("/", async (request: RequestType, reply: FastifyReply) => {
		try {
			const category = await categoryClass.add(request.body.category);
			await replySuccess(category, reply, "post");
		} catch (error) {
			await replyError(error, reply);
		}
	});
}

export default routes;
