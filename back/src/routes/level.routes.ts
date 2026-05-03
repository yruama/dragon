import { FastifyInstanceDecorated, RequestType } from "@type/route";
import { replyError, replySuccess } from "@core/route.core";

import { FastifyReply } from "fastify";
import LevelClass from "src/classes/level.class";
import { RequestRouteOptions } from "fastify/types/request";

const levelClass = new LevelClass();


async function routes(fastify: FastifyInstanceDecorated, options: RequestRouteOptions): Promise<void> {

	fastify.get("/", async (request: RequestType, reply: FastifyReply) => {
		try {
			const level = await levelClass.getAll();
			console.log("LEVEL : ", level)
			await replySuccess(level, reply, "get");
		} catch (error) {
			await replyError(error, reply);
		}
	});

	//fastify.post("/", { onRequest: [fastify.authenticate] }, async (request: RequestType, reply: FastifyReply) => {
	fastify.post("/", async (request: RequestType, reply: FastifyReply) => {
		try {
			const level = await levelClass.add(request.body.level);
			await replySuccess(level, reply, "post");
		} catch (error) {
			await replyError(error, reply);
		}
	});
}

export default routes;
