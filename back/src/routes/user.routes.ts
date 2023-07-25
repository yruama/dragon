import { FastifyReply } from "fastify";
import { RequestRouteOptions } from "fastify/types/request";
import Class_User from "../classes/user.class";
import { successFormat, errorFormat } from "@core/route.core";
import { FastifyInstanceDecorated, RequestType } from "@type/route";

const classUser = new Class_User();

async function routes(fastify: FastifyInstanceDecorated, options: RequestRouteOptions): Promise<void> {
	fastify.post("/sign-in", async(request: RequestType, reply: FastifyReply): Promise<void> => {
		try {
			const userData = await classUser.signIn(request.body.user);
			reply.send(successFormat(userData));
		} catch (error) {
			reply.send(errorFormat(error));
		}
	});

	fastify.post("/sign-up", async(request: RequestType, reply: FastifyReply): Promise<void> => {
		try {
			const userData = await classUser.signUp(request.body.user);
			reply.send(successFormat(userData));
		} catch (error) {
			reply.send(errorFormat(error));
		}
	});
}

export default routes;
