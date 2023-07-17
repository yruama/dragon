import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { RequestRouteOptions } from "fastify/types/request";
import Core_Utils from "../core/utils.core";
import Core_Pokelist from "../core/pokelist.core";
import { Pokelist } from "../types/pokelist";
import Class_Pokelist from "../classes/pokelist.class";

const corePokelist = new Core_Pokelist()
const classPokelist = new Class_Pokelist()
const coreUtils = new Core_Utils();

async function routes (fastify: any, options: RequestRouteOptions) {

    fastify.post('/', { onRequest: [fastify.authenticate] }, async (request: any, reply: FastifyReply) => {

        console.log("request.body.pokelist => ", request.body.pokelist)
        try {
            const list: Pokelist = {
                NAME: request.body.pokelist.NAME,
                IMAGE: request.body.pokelist.IMAGE,
                USER_ID: request.user.id
            }


            const pokelistData = await classPokelist.addPokelist(list);
            reply.send(coreUtils.successFormat(pokelistData));
        } catch (error: any) {
            reply.send(coreUtils.errorFormat(error))
        }
    })

    fastify.get('/', { onRequest: [fastify.authenticate] }, async (request: any, reply: FastifyReply) => {

        try {
            const pokelistData = await corePokelist.getPokelists(request.user.id);
            reply.send(coreUtils.successFormat(pokelistData));
        } catch (error: any) {
            reply.send(coreUtils.errorFormat(error))
        }
    })

    fastify.get('/:id', { onRequest: [fastify.authenticate] }, async (request: any, reply: FastifyReply) => {

        try {
            const pokelistData = await classPokelist.getPokeList(request.params.id, request.user.id);
            reply.send(coreUtils.successFormat(pokelistData));
        } catch (error: any) {
            reply.send(coreUtils.errorFormat(error))
        }
    })

    fastify.delete('/:id', { onRequest: [fastify.authenticate] }, async (request: any, reply: FastifyReply) => {

        try {
            const pokelistData = await corePokelist.deletePokelist(request.params.id, request.user.id);
            reply.send(coreUtils.successFormat(pokelistData));
        } catch (error: any) {
            reply.send(coreUtils.errorFormat(error))
        }
    })

}

export default routes;