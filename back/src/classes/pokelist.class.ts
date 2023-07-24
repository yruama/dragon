import { Pokelist } from "@type/pokelist";
import Core_Pokelist from "../core/pokelist.core";
import _bcrypt from "bcrypt";
import Core_Generation from "../core/generation.core";
import Core_Pokemon from "../core/pokemon.core";

export default class Class_Pokelist {
	private readonly _pokelist: Core_Pokelist;
	private readonly _pokemon: Core_Pokemon;
	private readonly _generations: Core_Generation;

	constructor() {
		console.log("Core_Pokemon constructor");
		this._pokelist = new Core_Pokelist();
		this._generations = new Core_Generation();
		this._pokemon = new Core_Pokemon();
	}

	async addPokelist(pokelist: Pokelist): Promise<number[]> {
		try {
			// 1. On récupère la génération pour récupérer les bons pokémons
			const generationData = await this._generations.getGeneration(pokelist.GENERATION_ID);

			// 2. On créait la liste
			const pokelistData = await this._pokelist.addPokelist(pokelist);

			// 3. On créait les données de la liste
			for (let i = generationData.MIN; i < generationData.MAX + 1; i++) {
				await this._pokelist.addPokelistData({
					POKEMON_ID: i,
					USER_ID: pokelist.USER_ID,
					POKELIST_ID: pokelistData.ID,
					OWNED: 0
				});
			}

			return pokelistData;
		} catch (error) {
			throw error;
		}
	}

	async getPokeList(id: string, userId: number): Promise<any> {
		try {
			// 1. On récupère lesdonnées de la liste
			const pokelist = await this._pokelist.getPokelist(id, userId);

			// 2 On récupère les pokémons lié à cette liste
			const pokelistData = await this._pokelist.getPokemonOfList(id, userId);

			// 3. On récupère les premiers pokémons
			const pokemonsIds = pokelistData.map((_pokemon: Pokelist) => _pokemon.POKEMON_ID);
			const pokemon = await this._pokemon.getManyPokemon(pokemonsIds.slice(0, 25));

			return {
				pokelist,
				pokelistData,
				pokemon
			};
		} catch (error) {
			throw error;
		}
	}
}
