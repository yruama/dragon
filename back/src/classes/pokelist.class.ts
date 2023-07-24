import { Pokelist } from "../types/pokelist";
import Core_Pokelist from "../core/pokelist.core";
import _bcrypt from "bcrypt";
import { app } from "../app";
import Core_Generation from "../core/generation.core";
import Core_Pokemon from "../core/pokemon.core";

export default class Class_Pokelist {
	private readonly _pokelist: Core_Pokelist;
	private readonly _pokemon: Core_Pokemon;
	private readonly _generations: Core_Generation;

	constructor() {
		this._pokelist = new Core_Pokelist();
		this._generations = new Core_Generation();
		this._pokemon = new Core_Pokemon();
	}

	async addPokelist() {
		try {
			// A Refaire suite aux changements du back
			return true;
		} catch (error) {
			console.error("Error on addPokelist : ", error);
			throw error;
		}
	}

	async getPokeList() {
		try {
			// A Refaire suite aux changements du back
			return true;
		} catch (error) {
			console.error("Error on getPokeList : ", error);
			throw error;
		}
	}
}
