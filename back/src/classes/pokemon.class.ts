import { Pokemon, PokemonWithTypeData } from "@type/pokemon";

import CoreEvolution from "@core/evolution.core";
import CoreGeneration from "../core/generation.core";
import CorePokemon from "../core/pokemon.core";
import CoreType from "@core/type.core";
import { parserObject } from "@core/utils.core";

export default class ClassPokemon {
	private readonly corePokemon: CorePokemon;
	private readonly coreGeneration: CoreGeneration;
    private readonly coreType: CoreType;
	private readonly coreEvolution: CoreEvolution;

	constructor() {
		this.corePokemon = new CorePokemon();
		this.coreGeneration = new CoreGeneration();
        this.coreType = new CoreType();
		this.coreEvolution = new CoreEvolution();
	}

	/**
	 * Add a new pokemon
	 * @param {Pokemon} pokelist
	 * @returns {*}  {Promise<number[]>}
	 * @memberof ClassPokemon
	 */
	async add(pokelist: Pokemon): Promise<number[] | boolean> {
		try {
			// A Refaire suite aux changements du back
			console.log("pokelist : ", pokelist);
			return true;
		} catch (error) {
			console.error("[CLASS_POKELIST.add] : ", error);
			throw error;
		}
	}

    /**
	 * Get pokemon by pagination
	 * @param {number} offset
	 * @param {number} limit
	 * @returns {*}  {Promise<Pokemon[]>}
	 * @memberof CorePokemon
	 */
	async getWithPagination(offset: number, limit: number, max: number | null): Promise<Pokemon[]> {
		try {
			// Dans le cas ou on veut une seule génération par exemple
			if (max && offset + limit > max) limit = max - offset;

            let pokemons: PokemonWithTypeData[] = await this.corePokemon.getWithPagination(offset, limit) as PokemonWithTypeData[];
            
            for (let pokemon of pokemons) {
                pokemon = parserObject(pokemon);
                pokemon = await this.addTypeNameToPokemon(pokemon);
            }
           
			return pokemons;
		} catch (error) {
			console.error("[CORE_POKEMON.getWithPagination] : ", error);
			throw error;
		}
	}

	/**
	 * Get a pokemon
	 * @returns {*}  {Promise<Pokemon>}
	 * @memberof ClassPokemon
	 */
	async get(id: string): Promise<PokemonWithTypeData> {
		try {
			let pokemon: PokemonWithTypeData = await this.corePokemon.get(id) as PokemonWithTypeData;
            pokemon = parserObject(pokemon);
            pokemon = await this.addTypeNameToPokemon(pokemon);
           
            return pokemon;
		} catch (error) {
			console.error("[CLASS_POKELIST.get] : ", error);
			throw error;
		}
	}

    async addTypeNameToPokemon(pokemon: PokemonWithTypeData) {
        if (pokemon.TYPE_ID_1) {
            const type1 = await this.coreType.get(pokemon.TYPE_ID_1)
            pokemon.TYPE_1_NAME = type1.NAME;
        }

        if (pokemon.TYPE_ID_2) {
            const type2 = await this.coreType.get(pokemon.TYPE_ID_2)
            pokemon.TYPE_2_NAME = type2.NAME;
        }

        return pokemon;
    }

	async getEvolutionsOfPokemon(chainId: string): Promise<Pokemon[]> {
		try {
			
			const evolutions = await this.coreEvolution.getByChainID(chainId);
			const pokemons: Pokemon[] = [];

			for (const evolution of evolutions) {
				const pokemon = await this.corePokemon.get(evolution.POKEMON_ID.toString());

				if (pokemon) pokemons.push(pokemon);
			}
			
			return pokemons;
		} catch (error) {
			console.error("[CLASS_POKELIST.get] : ", error);
			throw error;
		}
	}
}
