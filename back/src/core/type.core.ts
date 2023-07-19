import { Type } from "../types/type";
import Core_Utils from "./utils.core";
import { knex } from "../app";

export default class Core_Type {

    private _utils: Core_Utils

    constructor() {
        this._utils = new Core_Utils();
    }

    async addType(type: Type) {
        try {
            const typeCreated = await knex('TYPE').insert({
                NAME: type.NAME
            });


            return typeCreated;

        } catch (error) {
            console.error("Error => ", error)
            throw error;
        }
    }

    async getType(id: number) {
        try {
            const type = await knex.select('*')
                                    .from('TYPE')
                                    .where('ID', id)

            if (type && type.length > 0) return type[0];
            else throw "No type found with this id : " + id;
        } catch (error) {
            console.error("Error => ", error)
            throw error;
        }

    }

    async getTypeByEnglishName(name: string) {
        try {
            const type = await knex.select('*')
                                    .from('TYPE')
                                    .where('NAME', name)

            if (type && type.length > 0) return type[0];
            else throw "No type found with this name : " + name;
        } catch (error) {
            console.error("Error => ", error)
            throw error;
        }
    }

    async getTypes() {
        try {
            const type = await knex.select('*')
                                    .from('TYPE')

            if (type && type.length > 0) return type;
            else throw "No type found";
        } catch (error) {
            console.error("Error => ", error)
            throw error;
        }

    }
}