import { replySuccess, errorFormat } from "@core/route.core";
import Core_Pokelist from "../core/pokelist.core";
import { Pokelist } from "../types/pokelist";
import Class_Pokelist from "../classes/pokelist.class";
import { FastifyReply } from "fastify";
import { RequestRouteOptions } from "fastify/types/request";
import { FastifyInstanceDecorated, RequestType } from "@type/route";

const CorePokelist = new Core_Pokelist();
const ClassPokelist = new Class_Pokelist();

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

			const pokelistData = await ClassPokelist.addPokelist(list);
			await replySuccess(pokelistData, reply, "post");
		} catch (error) {
			await reply.send(errorFormat(error));
		}
	});

	fastify.get("/", { onRequest: [fastify.authenticate] }, async (request: RequestType, reply: FastifyReply) => {
		try {
			const pokelistData = await CorePokelist.getPokelists(request.user.id);
			await replySuccess(pokelistData, reply, "get");
		} catch (error) {
			await reply.send(errorFormat(error));
		}
	});

	fastify.get("/:id", { onRequest: [fastify.authenticate] }, async (request: RequestType, reply: FastifyReply) => {
		try {
			const pokelistData = await ClassPokelist.getPokeList();
			await replySuccess(pokelistData, reply, "get");
		} catch (error) {
			await reply.send(errorFormat(error));
		}
	});

	fastify.delete("/:id", { onRequest: [fastify.authenticate] }, async (request: RequestType, reply: FastifyReply) => {
		try {
			const id = typeof request.params.id === "string" ? parseInt(request.params.id) : request.params.id;
			const pokelistData = await CorePokelist.deletePokelist(id, request.user.id);
			await replySuccess(pokelistData, reply, "delete");
		} catch (error) {
			await reply.send(errorFormat(error));
		}
	});
}

export default routes;
