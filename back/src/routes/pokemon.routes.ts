import { FastifyReply } from "fastify";
import { RequestRouteOptions } from "fastify/types/request";
import Core_Pokemon from "../core/pokemon.core";
import { replySuccess, errorFormat } from "@core/route.core";
import { FastifyInstanceDecorated, RequestType } from "@type/route";

const corePokemon = new Core_Pokemon();

async function routes(fastify: FastifyInstanceDecorated, options: RequestRouteOptions): Promise<void> {
	fastify.get("/", async (request: RequestType, reply: FastifyReply) => {
		try {
			const offset = request.query.offset ? parseInt(request.query.offset) : 1;
			const limit = request.query.limit ? parseInt(request.query.limit) : 25;

			const pokemons = await corePokemon.getPokemonsWithPagination(offset, limit);
			await replySuccess(pokemons, reply, "get");
		} catch (error) {
			await reply.send(errorFormat(error));
		}
	});

	fastify.get("/user-pokedex", { onRequest: [fastify.authenticate] }, async (request: RequestType, reply: FastifyReply) => {
		try {
			const pokemons = await corePokemon.getPokemonOfUserPokedex(request.user.id);
			await replySuccess(pokemons, reply, "get");
		} catch (error) {
			await reply.send(errorFormat(error));
		}
	});

	fastify.post("/user-pokedex", { onRequest: [fastify.authenticate] }, async (request: RequestType, reply: FastifyReply) => {
		try {
			const pokemon = await corePokemon.addPokemonInUserPokedex(request.user.id, request.body.pokemonIds);
			await replySuccess(pokemon, reply, "post");
		} catch (error) {
			await reply.send(errorFormat(error));
		}
	});

	fastify.post("/getMany", async (request: RequestType, reply: FastifyReply) => {
		try {
			const pokemons = await corePokemon.getManyPokemon(request.body.pokemonIds);
			await replySuccess(pokemons, reply, "get");
		} catch (error) {
			await reply.send(errorFormat(error));
		}
	});

	fastify.get("/:id", async (request: RequestType, reply: FastifyReply) => {
		try {
			const pokemon = await corePokemon.getPokemon(parseInt(request.params.id));
			await replySuccess(pokemon, reply, "get");
		} catch (error) {
			await reply.send(errorFormat(error));
		}
	});
}

export default routes;
