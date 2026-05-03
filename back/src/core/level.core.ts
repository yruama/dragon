import Error_level from "@errors/level.json";
import { Level } from "@type/level";
import { knex } from "../app";

export default class CoreLevel {
	async add(level: Level): Promise<number[]> {
		try {
			const levelCreated = await knex("LEVEL").insert({
				DIFFICULTY: level.DIFFICULTY,
				TITLE: level.TITLE,
                DESCRIPTION: level.DESCRIPTION
			});

			return levelCreated;
		} catch (error) {
			console.error("[CORE_LEVEL.add] : ", error);
			throw error;
		}
	}

	async get(id: string): Promise<Level> {
		try {
			const level = await knex.select("*").from("LEVEL").where("ID", id);

			if (level.length <= 0) throw new InternalError(Error_level.READ.NOT_FOUND.single);
			return level[0];
		} catch (error) {
			console.error("[CORE_LEVEL.get] : ", error);
			throw error;
		}
	}

	async getAll(): Promise<Level[]> {
		try {
			const level = await knex.select("*").from("LEVEL");

			if (level.length <= 0) throw new InternalError(Error_level.READ.NOT_FOUND.multiple);
			return level;
		} catch (error) {
			console.error("[CORE_LEVEL.getAll] : ", error);
			throw error;
		}
	}

	async getWithPagination(offset: number, limit: number): Promise<Level[]> {
		try {
			const levels = await knex.select("*").from("LEVEL").limit(limit).offset(offset).orderBy("ID", "asc");

			if (levels.length <= 0) throw new InternalError(Error_level.READ.NOT_FOUND.multiple);

			return levels;
		} catch (error) {
			console.error("[CORE_LEVEL.getWithPagination] : ", error);
			throw error;
		}
	}
}
