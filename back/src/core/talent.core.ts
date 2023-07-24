import { Talent } from "@type/talent";
import Core_Utils from "./utils.core";
import { knex } from "../app";

export default class Core_Talent {
	private readonly _utils: Core_Utils;

	constructor() {
		this._utils = new Core_Utils();
	}

	async addTalent(talent: Talent): Promise<number[]> {
		try {
			const talentCreated = await knex("TALENT").insert({
				NAME_FR: talent.NAME_FR,
				NAME_EN: talent.NAME_EN,
				DESCRIPTION_FR: talent.DESCRIPTION_FR,
				DESCRIPTION_EN: talent.DESCRIPTION_EN
			});

			return talentCreated;
		} catch (error) {
			console.error("Error => ", error);
			throw error;
		}
	}

	async getTalentByEnglishName(name: string): Promise<Talent> {
		try {
			const talent = await knex.select("*").from("TALENT").where("NAME_EN", name);

			if (talent.length > 0) return talent[0];
			else throw "No talent found with this name : " + name;
		} catch (error) {
			console.error("Error => ", error);
			throw error;
		}
	}

	async getTalent(id: number): Promise<Talent> {
		try {
			const talent = await knex.select("*").from("TALENT").where("ID", id);

			if (talent.length > 0) return talent[0];
			else throw "No talent found with this id : " + id;
		} catch (error) {
			console.error("Error => ", error);
			throw error;
		}
	}

	async getTalents(): Promise<Talent[]> {
		try {
			const talent = await knex.select("*").from("TALENT");

			if (talent.length > 0) return talent;
			else throw "No talent found";
		} catch (error) {
			console.error("Error => ", error);
			throw error;
		}
	}
}
