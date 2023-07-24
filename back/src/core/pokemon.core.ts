import { Pokemon } from "../types/pokemon";
import Core_Utils from "./utils.core";
import { knex } from "../app";
export default class Core_Pokemon {
	private readonly _utils: Core_Utils;

	constructor() {
		this._utils = new Core_Utils();
	}

	async addPokemon(pokemon: Pokemon) {
		try {
			// await this._utils.downloadImage(pokemon.artwork, 'artwork/' + pokemon.id + '.png');
			// await this._utils.downloadImage(pokemon.miniature, 'miniature/' + pokemon.id + '.png');

			const pokemonCreated = await knex('POKEMON').insert({
				POKEMON_ID: pokemon.POKEMON_ID,
				NAME_FR: pokemon.NAME_FR,
				NAME_EN: pokemon.NAME_EN,
				DESCRIPTION_FR: pokemon.DESCRIPTION_FR,
				DESCRIPTION_EN: pokemon.DESCRIPTION_EN,
				CATEGORY: pokemon.CATEGORY,
				TYPE_ID_1: pokemon.TYPE_1_ID,
				TYPE_ID_2: pokemon.TYPE_2_ID,
				TALENT: pokemon.TALENT,
				SHAPE_ID: pokemon.SHAPE,
				GENERATION: pokemon.GENERATION,
				INFORMATIONS: pokemon.INFORMATION,
				EVOLUTION_ID: pokemon.EVOLUTION,
				COLOR: pokemon.COLOR
			});

			return pokemonCreated;
		} catch (error) {
			console.error("Error on addPokemon : ", error);
			throw error;
		}
	}

	async getPokemon(id: number) {
		try {
			const pokemon = await knex.select('*')
				.from('POKEMON')
				.where('POKEMON_ID', id);

			if (pokemon && pokemon.length > 0) return pokemon[0];
			else throw "No pokemon found with this id : " + id;
		} catch (error) {
			console.error("Error on getPokemon : ", error);
			throw error;
		}
	}

	async getPokemonsWithPagination(offset: number, limit: number) {
		try {
			const pokemon = await knex.select('*')
				.from('POKEMON')
				.limit(limit)
				.offset(offset)
				.orderBy('POKEMON_ID', 'asc');

			if (pokemon && pokemon.length > 0) return pokemon;
			else throw "No pokemon found";
		} catch (error) {
			console.error("Error on getPokemonsWithPagination : ", error);
			throw error;
		}
	}

	async getManyPokemon(pokemonIds: number[]) {
		try {
			const pokemon = await knex.select('*')
				.from('POKEMON')
				.whereIn('POKEMON_ID', pokemonIds);

			if (pokemon && pokemon.length > 0) return pokemon;
			else throw "No pokemon found";
		} catch (error) {
			console.error("Error on getManyPokemon : ", error);
			throw error;
		}
	}

	async getPokemonOfUserPokedex(userId: number) {
		try {
			const pokemon = await knex.select('*')
				.from('POKEMON_OWNED')
				.where('USER_ID', userId)
				.orderBy('POKEMON_ID', 'asc');

			if (pokemon && pokemon.length > 0) return pokemon;
			else throw "No pokemon found";
		} catch (error) {
			console.error("Error on getPokemonOfUserPokedex : ", error);
			throw error;
		}
	}

	async addPokemonInUserPokedex(userId: number, pokemonIds: number[]) {
		try {
			console.log("Pokemons Ids : ", pokemonIds);
			for (const id of pokemonIds) {
				await knex('POKEMON_OWNED').insert({
					POKEMON_ID: id,
					USER_ID: userId,
					OWNED: 1
				});
			}

			return true;
		} catch (error) {
			console.error("Error on addPokemonInUserPokedex : ", error);
			throw error;
		}
	}
}
