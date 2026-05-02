import Error_truth from "@errors/truth.json";
import { Truth } from "@type/truth";
import { knex } from "../app";

export default class CoreTruth {
	async add(truth: Truth): Promise<number[]> {
		try {
			const truthCreated = await knex("TRUTH").insert({
				PHRASE: truth.PHRASE,
				TYPE: truth.TYPE,
				CATEGORIE: truth.CATEGORIE,
				TAGS: JSON.stringify(truth.TAGS)
			});

			return truthCreated;
		} catch (error) {
			console.error("[CORE_TRUTH.add] : ", error);
			throw error;
		}
	}

	async get(id: string): Promise<Truth> {
		try {
			const truth = await knex.select("*").from("TRUTH").where("ID", id);

			if (truth.length <= 0) throw new InternalError(Error_truth.READ.NOT_FOUND.single);
			return truth[0];
		} catch (error) {
			console.error("[CORE_TRUTH.get] : ", error);
			throw error;
		}
	}

	async getAll(): Promise<Truth[]> {
		try {
			const truth = await knex.select("*").from("TRUTH");

			if (truth.length <= 0) throw new InternalError(Error_truth.READ.NOT_FOUND.multiple);
			return truth;
		} catch (error) {
			console.error("[CORE_TRUTH.getAll] : ", error);
			throw error;
		}
	}

	async getWithPagination(offset: number, limit: number): Promise<Truth[]> {
		try {
			const truths = await knex.select("*").from("TRUTH").limit(limit).offset(offset).orderBy("ID", "asc");

			if (truths.length <= 0) throw new InternalError(Error_truth.READ.NOT_FOUND.multiple);

			return truths;
		} catch (error) {
			console.error("[CORE_TRUTH.getWithPagination] : ", error);
			throw error;
		}
	}
}
