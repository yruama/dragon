import Core_Pokemon from "../core/pokemon.core";
import Core_Utils from "../core/utils.core";

const corePokemon = new Core_Pokemon();
const coreUtils = new Core_Utils();

async function routes(fastify: any, options: any): Promise<void> {
	fastify.get("/", async(request: any, reply: any) => {
		try {
			const offset = request.query.offset ? parseInt(request.query.offset) : 1;
			const limit = request.query.limit ? parseInt(request.query.limit) : 25;

			const pokemons = await corePokemon.getPokemonsWithPagination(offset, limit);
			reply.send(coreUtils.successFormat(pokemons));
		} catch (error: any) {
			reply.send(coreUtils.errorFormat(error));
		}
	});

	fastify.get("/user-pokedex", { onRequest: [fastify.authenticate] }, async(request: any, reply: any) => {
		try {
			const pokemons = await corePokemon.getPokemonOfUserPokedex(request.user.id);
			reply.send(coreUtils.successFormat(pokemons));
		} catch (error: any) {
			reply.send(coreUtils.errorFormat(error));
		}
	});

	fastify.post("/user-pokedex", { onRequest: [fastify.authenticate] }, async(request: any, reply: any) => {
		try {
			console.log("request.body => ", request.body);
			const pokemon = await corePokemon.addPokemonInUserPokedex(request.user.id, request.body.pokemonIds);
			reply.send(coreUtils.successFormat(pokemon));
		} catch (error: any) {
			reply.send(coreUtils.errorFormat(error));
		}
	});

	fastify.post("/getMany", async(request: any, reply: any) => {
		try {
			const pokemon = await corePokemon.getManyPokemon(request.body.pokemonIds);
			reply.send(coreUtils.successFormat(pokemon));
		} catch (error: any) {
			reply.send(coreUtils.errorFormat(error));
		}
	});

	fastify.get("/:id", async(request: any, reply: any) => {
		const pokemon = await corePokemon.getPokemon(parseInt(request.params.id));

		reply.send(pokemon);
	});
}

export default routes;
