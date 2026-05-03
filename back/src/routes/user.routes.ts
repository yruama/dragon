import { FastifyInstanceDecorated, RequestType } from "@type/route";
import { replyError, replySuccess } from "@core/route.core";

import ClassUser from "../classes/user.class";
import { FastifyReply } from "fastify";
import { RequestRouteOptions } from "fastify/types/request";

const classUser = new ClassUser();

async function routes(fastify: FastifyInstanceDecorated, options: RequestRouteOptions): Promise<void> {
	fastify.post("/sign-in", async (request: RequestType, reply: FastifyReply): Promise<void> => {
		try {
			const userData = await classUser.signIn(request.body.user);
			await replySuccess(userData, reply, "post");
		} catch (error) {
			await replyError(error, reply);
		}
	});

	fastify.post("/sign-up", async (request: RequestType, reply: FastifyReply): Promise<void> => {
		try {
			console.log("??..")
			const userData = await classUser.signUp(request.body.user);
			await replySuccess(userData, reply, "post");
		} catch (error) {
			await replyError(error, reply);
		}
	});

	fastify.get("/getByToken", { onRequest: [fastify.authenticate] }, async (request: RequestType, reply: FastifyReply): Promise<void> => {
		try {

			if (request.user) await replySuccess(true, reply, "get");
			else await replySuccess(false, reply, "get");

		} catch (error) {
			await replyError(error, reply);
		}
	});
}

export default routes;
