import { Pokelist } from "@type/pokelist";
import { knex } from "../app";
import Error_pokelist from "@errors/pokelist.json";

export default class CorePokelist {
	async add(pokelist: Pokelist, total: number): Promise<number[]> {
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
			console.error("[CORE_POKELIST.addPokelist] : ", error);
			throw error;
		}
	}

	async get(id: number, userId: number): Promise<Pokelist> {
		try {
			const pokelist = await knex.select("*").from("POKELIST").where("ID", id).andWhere("USER_ID", userId);

			if (pokelist.length > 0) throw new InternalError(Error_pokelist.READ.NOT_FOUND.single);
			return pokelist[0];
		} catch (error) {
			console.error("[CORE_POKELIST.get] : ", error);
			throw error;
		}
	}

	async delete(id: number, userId: number): Promise<number> {
		try {
			const pokelist = await knex("POKELIST").where("ID", id).andWhere("USER_ID", userId).del();

			return pokelist;
		} catch (error) {
			console.error("[CORE_POKELIST.deletePokelist] : ", error);
			throw error;
		}
	}

	async getAll(userId: number): Promise<Pokelist[]> {
		try {
			const pokelist = await knex.select("*").from("POKELIST").where("USER_ID", userId);

			if (pokelist.length > 0) return pokelist;
			else throw "No pokelist found";
		} catch (error) {
			console.error("[CORE_POKELIST.getPokelists] : ", error);
			throw error;
		}
	}
}
