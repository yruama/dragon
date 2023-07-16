import { Pokelist, PokelistData } from "../types/pokelist";
import Core_Utils from "./utils.core";
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

export default class Core_Pokelist {

    private _utils: Core_Utils

    constructor() {
        console.log("Core_Pokelist constructor");
        this._utils = new Core_Utils();
    }

    async addPokelist(pokelist: Pokelist) {

        try {
            const newPokelist = await prisma.pokelist.create({
                data: {
                    NAME:           pokelist.NAME,
                    IMAGE:          pokelist.IMAGE,
                    GENERATION_ID:  pokelist.GENERATION_ID,
                    USER_ID:        pokelist.USER_ID
                },
            }) .catch((err: any) => {
                console.log(err)
            })

            return newPokelist;
        } catch (error) {
            throw error;
        }

    }

    async getPokelist(id: number, userId: number) {
        try {
            const pokelist = await prisma.pokelist.findMany({
                where: { ID: id, USER_ID: userId },
            })

            if (pokelist && pokelist.length > 0) return pokelist[0];
            else throw "No pokelist found with this id : " + id;
        } catch (error) {
            throw error;
        }

    }

    async getPokelists(userId: number) {
        try {
            const pokelist = await prisma.pokelist.findMany({
                where: { USER_ID: userId },
                orderBy: {
                    ID: 'asc'
                }
            })

            if (pokelist && pokelist.length > 0) return pokelist;
            else throw "No pokelist found";
        } catch (error) {
            throw error;
        }

    }

    async addPokelistData(pokelistData: PokelistData) {
        try {
            await prisma.pokelistData.create({
                data: {
                    POKELIST_ID: pokelistData.POKELIST_ID,
                    POKEMON_ID: pokelistData.POKEMON_ID,
                    USER_ID: pokelistData.USER_ID,
                    OWNED: 0,
                    NOTE: ""
                },
            }).catch((err: any) => {
                console.log(err)
            })

            return true;
        } catch (error) {
            throw error;
        }
    }
}