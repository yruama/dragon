import { Generation } from "@type/generation";
import { knex } from "../app";
import httpCommon from "@http/common.json";
import { strict as assert } from "node:assert";

export default class Core_Generation {
	async getGeneration(no: number): Promise<Generation> {
		try {
			const generation: any[] = []; // await knex.select("*").from("GENERATION").where("GENERATION_NO", no);

			if (generation.length <= 0) throw new InternalError(httpCommon.SERVER_ERROR.internal_server_error);
			return generation[0];
		} catch (error) {
			console.error("Error on getGeneration : ", error);
			throw error;
		}
	}

	async getGenerations(): Promise<Generation[]> {
		try {
			const generation = await knex.select("*").from("GENERATION");

			if (generation.length <= 0) throw new InternalError(httpCommon.SERVER_ERROR.internal_server_error);
			return generation;
		} catch (error) {
			console.error("Error on getGenerations : ", error);
			throw error;
		}
	}
}
