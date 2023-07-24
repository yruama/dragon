import { Pokelist } from "@type/pokelist";
import Core_Utils from "./utils.core";
import { knex } from "../app";

export default class Core_Pokelist {
	private readonly _utils: Core_Utils;

	constructor() {
		console.log("Core_Pokelist constructor");
		this._utils = new Core_Utils();
	}

	async addPokelist(pokelist: Pokelist, total: number): Promise<number[]> {
		try {
			const newPokelist = await knex.insert({
				NAME: pokelist.NAME,
				IMAGE: pokelist.DESCRIPTION,
				USER_ID: pokelist.USER_ID,
				FILTER: pokelist.FILTER,
				TOTAL: total
			});

			return newPokelist;
		} catch (error) {
			console.error("Error on addPokelist : ", error);
			throw error;
		}
	}

	async getPokelist(id: number, userId: number): Promise<Pokelist> {
		try {
			const pokelist = await knex.select("*").from("POKELIST").where("ID", id).andWhere("USER_ID", userId);

			if (pokelist.length > 0) return pokelist[0];
			else throw "No pokelist found with this id : " + id;
		} catch (error) {
			console.error("Error on getPokelist : ", error);
			throw error;
		}
	}

	async deletePokelist(id: number, userId: number): Promise<number> {
		try {
			const pokelist = await knex("POKELIST").where("ID", id).andWhere("USER_ID", userId).del();

			return pokelist;
		} catch (error) {
			console.error("Error on deletePokelist : ", error);
			throw error;
		}
	}

	async getPokelists(userId: number): Promise<Pokelist[]> {
		try {
			const pokelist = await knex.select("*").from("POKELIST").where("USER_ID", userId);

			if (pokelist.length > 0) return pokelist;
			else throw "No pokelist found";
		} catch (error) {
			console.error("Error on getPokelists : ", error);
			throw error;
		}
	}
}
