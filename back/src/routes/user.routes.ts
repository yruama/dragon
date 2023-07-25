import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { RequestRouteOptions } from "fastify/types/request";
import Class_User from "../classes/user.class";
import Core_Utils from "../core/utils.core";

const classUser = new Class_User();
const coreUtils = new Core_Utils();

async function routes(fastify: FastifyInstance, options: RequestRouteOptions): Promise<void> {
	fastify.post("/sign-in", async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
		try {
			const userData = await classUser.signIn(request.body.user);
			reply.send(coreUtils.successFormat(userData));
		} catch (error: any) {
			reply.send(coreUtils.errorFormat(error));
		}
	});

	fastify.post("/sign-up", async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
		try {
			const userData = await classUser.signUp(request.body.user);
			reply.send(coreUtils.successFormat(userData));
		} catch (error: any) {
			reply.send(coreUtils.errorFormat(error));
		}
	});
}

export default routes;
