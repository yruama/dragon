import { Generation } from "@type/generation";
import Core_Utils from "./utils.core";
import { knex } from "../app";
export default class Core_Generation {
	private readonly _utils: Core_Utils;

	constructor() {
		this._utils = new Core_Utils();
	}

	async getGeneration(no: number): Promise<Generation> {
		try {
			const generation = await knex.select("*").from("GENERATION").where("GENERATION_NO", no);

			if (generation.length > 0) return generation[0];
			else throw "No generation found with this id : " + no;
		} catch (error) {
			console.error("Error on getGeneration : ", error);
			throw error;
		}
	}

	async getGenerations(): Promise<Generation[]> {
		try {
			const generation = await knex.select("*").from("GENERATION");

			if (generation.length > 0) return generation;
			else throw "No generation found";
		} catch (error) {
			console.error("Error on getGenerations : ", error);
			throw error;
		}
	}
}
