import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { RequestRouteOptions } from "fastify/types/request";
import Class_User from "../classes/user.class";
import Core_Utils from "../core/utils.core";

const classUser = new Class_User();
const coreUtils = new Core_Utils();

async function routes (fastify: any, options: RequestRouteOptions) {

    fastify.post('/sign-in', async (request: any, reply: any) => {
        try {
            const userData = await classUser.signIn(request.body.user);
            reply.send(coreUtils.successFormat(userData));
        } catch (error: any) {
            reply.send(coreUtils.errorFormat(error))
        }
    })

    fastify.post('/sign-up', async (request: any, reply: any) => {

        try {
            const userData = await classUser.signUp(request.body.user);
            reply.send(coreUtils.successFormat(userData));
        } catch (error: any) {
            reply.send(coreUtils.errorFormat(error))
        }

    })


    fastify.post('/test', { onRequest: [fastify.authenticate] }, async (request: any, reply: FastifyReply) => {
        console.log("=========")
        console.log("Header => ", request.headers);
        console.log("User => ", request.user);
        console.log("=========")

        reply.send('ok')
    })


}

export default routes;