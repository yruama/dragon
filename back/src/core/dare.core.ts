import { Dare } from "@type/dare";
import Error_dare from "@errors/dare.json";
import { knex } from "../app";

export default class CoreDare {
	async add(dare: Dare): Promise<number[]> {
		try {
			const dareCreated = await knex("DARE").insert({
				DESCRIPTION: dare.DESCRIPTION,
				CATEGORIES: JSON.stringify(dare.CATEGORIES),
				LEVEL: dare.LEVEL,
				CREATOR_ID: dare.CREATOR_ID
			});

			return dareCreated;
		} catch (error) {
			console.error("[CORE_DARE.add] : ", error);
			throw error;
		}
	}

	async get(id: string): Promise<Dare> {
		try {
			const dare = await knex.select("*").from("DARE").where("ID", id);

			if (dare.length <= 0) throw new InternalError(Error_dare.READ.NOT_FOUND.single);
			return dare[0];
		} catch (error) {
			console.error("[CORE_DARE.get] : ", error);
			throw error;
		}
	}

	async getAll(): Promise<Dare[]> {
		try {
			const dare = await knex.select("*").from("DARE");

			if (dare.length <= 0) throw new InternalError(Error_dare.READ.NOT_FOUND.multiple);
			return dare;
		} catch (error) {
			console.error("[CORE_DARE.getAll] : ", error);
			throw error;
		}
	}

	async getWithPagination(offset: number, limit: number): Promise<Dare[]> {
		try {
			const dares = await knex.select("*").from("DARE").limit(limit).offset(offset).orderBy("ID", "asc");

			if (dares.length <= 0) throw new InternalError(Error_dare.READ.NOT_FOUND.multiple);

			return dares;
		} catch (error) {
			console.error("[CORE_DARE.getWithPagination] : ", error);
			throw error;
		}
	}
}
