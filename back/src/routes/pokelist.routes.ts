import Core_Utils from "../core/utils.core";
import Core_Pokelist from "../core/pokelist.core";
import { Pokelist } from "../types/pokelist";
import Class_Pokelist from "../classes/pokelist.class";

const corePokelist = new Core_Pokelist();
const classPokelist = new Class_Pokelist();
const coreUtils = new Core_Utils();

async function routes(fastify: any, options: any) {
	fastify.post('/', { onRequest: [fastify.authenticate] }, async (request: any, reply: any) => {
		try {
			const list: Pokelist = {
				NAME: request.body.pokelist.NAME,
				DESCRIPTION: request.body.pokelist.DESCRIPTION,
				USER_ID: request.user.id,
				FILTER: request.body.filter,
				TOTAL: 0
			};

			const pokelistData = await classPokelist.addPokelist();
			// const pokelistData = await classPokelist.addPokelist(list);
			reply.send(coreUtils.successFormat(pokelistData));
		} catch (error: any) {
			reply.send(coreUtils.errorFormat(error));
		}
	});

	fastify.get('/', { onRequest: [fastify.authenticate] }, async (request: any, reply: any) => {
		try {
			const pokelistData = await corePokelist.getPokelists(request.user.id);
			reply.send(coreUtils.successFormat(pokelistData));
		} catch (error: any) {
			reply.send(coreUtils.errorFormat(error));
		}
	});

	fastify.get('/:id', { onRequest: [fastify.authenticate] }, async (request: any, reply: any) => {
		try {
			const pokelistData = await classPokelist.getPokeList();
			// const pokelistData = await classPokelist.getPokeList(request.params.id, request.user.id);
			reply.send(coreUtils.successFormat(pokelistData));
		} catch (error: any) {
			reply.send(coreUtils.errorFormat(error));
		}
	});

	fastify.delete('/:id', { onRequest: [fastify.authenticate] }, async (request: any, reply: any) => {
		try {
			const pokelistData = await corePokelist.deletePokelist(request.params.id, request.user.id);
			reply.send(coreUtils.successFormat(pokelistData));
		} catch (error: any) {
			reply.send(coreUtils.errorFormat(error));
		}
	});
}

export default routes;
