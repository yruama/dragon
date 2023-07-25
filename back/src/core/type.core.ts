import { Type } from "@type/type";
import { knex } from "../app";

export default class Core_Type {
	async addType(type: Type): Promise<number[]> {
		try {
			const typeCreated = await knex("TYPE").insert({
				NAME: type.NAME
			});

			return typeCreated;
		} catch (error) {
			console.error("Error => ", error);
			throw error;
		}
	}

	async getType(id: number): Promise<Type> {
		try {
			const type = await knex.select("*").from("TYPE").where("ID", id);

			if (type.length > 0) return type[0];
			else throw "No type found with this id : " + id;
		} catch (error) {
			console.error("Error => ", error);
			throw error;
		}
	}

	async getTypeByEnglishName(name: string): Promise<Type> {
		try {
			const type = await knex.select("*").from("TYPE").where("NAME", name);

			if (type.length > 0) return type[0];
			else throw "No type found with this name : " + name;
		} catch (error) {
			console.error("Error => ", error);
			throw error;
		}
	}

	async getTypes(): Promise<Type[]> {
		try {
			const type = await knex.select("*").from("TYPE");

			if (type.length > 0) return type;
			else throw "No type found";
		} catch (error) {
			console.error("Error => ", error);
			throw error;
		}
	}
}
