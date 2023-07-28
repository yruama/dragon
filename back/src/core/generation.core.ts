import { Generation } from "@type/generation";
import { knex } from "../app";
import Error_generation from "@errors/generation.json";

export default class CoreGeneration {
	async getGeneration(no: number): Promise<Generation> {
		try {
			const generation: any[] = []; // await knex.select("*").from("GENERATION").where("GENERATION_NO", no);

			if (generation.length <= 0) throw new InternalError(Error_generation.READ.NOT_FOUND.single);
			return generation[0];
		} catch (error) {
			console.error("[CORE_GENERATION.getGeneration] : ", error);
			throw error;
		}
	}

	async getGenerations(): Promise<Generation[]> {
		try {
			const generation = await knex.select("*").from("GENERATION");

			if (generation.length <= 0) throw new InternalError(Error_generation.READ.NOT_FOUND.multiple);
			return generation;
		} catch (error) {
			console.error("[CORE_GENERATION.getGenerations] : ", error);
			throw error;
		}
	}
}
