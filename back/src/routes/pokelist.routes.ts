import { successFormat, errorFormat } from "@core/route.core";
import Core_Pokelist from "../core/pokelist.core";
import { Pokelist } from "../types/pokelist";
import Class_Pokelist from "../classes/pokelist.class";
import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { RequestRouteOptions } from "fastify/types/request";
import { FastifyInstanceDecorated, RequestType } from "@type/route";

const corePokelist = new Core_Pokelist();
const classPokelist = new Class_Pokelist();

async function routes(fastify: FastifyInstanceDecorated, options: RequestRouteOptions): Promise<void> {
	fastify.post("/", { onRequest: [fastify.authenticate] }, async (request: RequestType, reply: FastifyReply) => {
		try {
			const list: Pokelist = {
				NAME: request.body.pokelist.NAME,
				DESCRIPTION: request.body.pokelist.DESCRIPTION,
				USER_ID: request.user.id,
				FILTER: request.body.filter,
				TOTAL: 0
			};

			const pokelistData = await classPokelist.addPokelist(list);
			reply.send(successFormat(pokelistData));
		} catch (error) {
			reply.send(errorFormat(error));
		}
	});

	fastify.get("/", { onRequest: [fastify.authenticate] }, async (request: RequestType, reply: FastifyReply) => {
		try {
			const pokelistData = await corePokelist.getPokelists(request.user.id);
			reply.send(successFormat(pokelistData));
		} catch (error) {
			reply.send(errorFormat(error));
		}
	});

	fastify.get("/:id", { onRequest: [fastify.authenticate] }, async (request: RequestType, reply: FastifyReply) => {
		try {
			const pokelistData = await classPokelist.getPokeList();
			// const pokelistData = await classPokelist.getPokeList(request.params.id, request.user.id);
			reply.send(successFormat(pokelistData));
		} catch (error) {
			reply.send(errorFormat(error));
		}
	});

	fastify.delete("/:id", { onRequest: [fastify.authenticate] }, async (request: RequestType, reply: FastifyReply) => {
		try {
			const id = typeof request.params.id === "string" ? parseInt(request.params.id) : request.params.id;
			const pokelistData = await corePokelist.deletePokelist(id, request.user.id);
			reply.send(successFormat(pokelistData));
		} catch (error) {
			reply.send(errorFormat(error));
		}
	});
}

export default routes;
