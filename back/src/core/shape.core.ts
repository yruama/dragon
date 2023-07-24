import { Shape } from "@type/shape";
import Core_Utils from "./utils.core";
import { knex } from "../app";

export default class Core_Shape {
	private readonly _utils: Core_Utils;

	constructor() {
		this._utils = new Core_Utils();
	}

	async addShape(shape: Shape): Promise<number[]> {
		try {
			const shapeCreated = await knex("POKEMON").insert({
				NAME: shape.NAME
			});

			return shapeCreated;
		} catch (error) {
			console.error("Error => ", error);
			throw error;
		}
	}

	async getShape(id: number): Promise<Shape> {
		try {
			const shape = await knex.select("*").from("SHAPE").where("ID", id);

			if (shape.length > 0) return shape[0];
			else throw "No shape found with this id : " + id;
		} catch (error) {
			console.error("Error => ", error);
			throw error;
		}
	}

	async getShapeByEnglishName(name: string): Promise<Shape> {
		try {
			const shape = await knex.select("*").from("SHAPE").where("NAME", name);

			if (shape.length > 0) return shape[0];
			else throw "No shape found with this name : " + name;
		} catch (error) {
			console.error("Error => ", error);
			throw error;
		}
	}

	async getShapes(): Promise<Shape[]> {
		try {
			const shape = await knex.select("*").from("SHAPE");

			if (shape.length > 0) return shape;
			else throw "No shape found";
		} catch (error) {
			console.error("Error => ", error);
			throw error;
		}
	}
}
