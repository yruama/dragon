import { Category } from "@type/category";
import Error_category from "@errors/category.json";
import { knex } from "../app";

export default class CoreCategory {
	async add(category: Category): Promise<number[]> {
		try {
			const categoryCreated = await knex("CATEGORY").insert({
				NAME: category.NAME,
				COLOR: category.COLOR,
			});

			return categoryCreated;
		} catch (error) {
			console.error("[CORE_CATEGORY.add] : ", error);
			throw error;
		}
	}

	async get(id: string): Promise<Category> {
		try {
			const category = await knex.select("*").from("CATEGORY").where("ID", id);

			if (category.length <= 0) throw new InternalError(Error_category.READ.NOT_FOUND.single);
			return category[0];
		} catch (error) {
			console.error("[CORE_CATEGORY.get] : ", error);
			throw error;
		}
	}

	async getAll(): Promise<Category[]> {
		try {
			const category = await knex.select("*").from("CATEGORY");

			if (category.length <= 0) throw new InternalError(Error_category.READ.NOT_FOUND.multiple);
			return category;
		} catch (error) {
			console.error("[CORE_CATEGORY.getAll] : ", error);
			throw error;
		}
	}

	async getWithPagination(offset: number, limit: number): Promise<Category[]> {
		try {
			const categorys = await knex.select("*").from("CATEGORY").limit(limit).offset(offset).orderBy("ID", "asc");

			if (categorys.length <= 0) throw new InternalError(Error_category.READ.NOT_FOUND.multiple);

			return categorys;
		} catch (error) {
			console.error("[CORE_CATEGORY.getWithPagination] : ", error);
			throw error;
		}
	}
}
