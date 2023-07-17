import { Pokelist, PokelistData } from "../types/pokelist";
import Core_Utils from "./utils.core";
import { PrismaClient } from '@prisma/client'
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

    async getPokelist(id: string, userId: number) {
        try {
            const pokelist = await prisma.pokelist.findMany({
                where: { ID: parseInt(id), USER_ID: userId },
            }).catch((err: any) => {
                console.error(err)
            })

            if (pokelist && pokelist.length > 0) return pokelist[0];
            else throw "No pokelist found with this id : " + id;
        } catch (error) {
            throw error;
        }

    }

    async deletePokelist(id: string, userId: number) {
        try {
            console.log("ID : ", parseInt(id), "userId : ", userId)

            const pokelist = await prisma.pokelist.delete({
                where: { ID: parseInt(id), USER_ID: userId }
            })

            return pokelist;
        } catch (error) {
            console.log("Error => ", error)
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

    async getPokemonOfList(id: string, userId: number) {
        try {
            const pokelist = await prisma.pokelistData.findMany({
                where: { USER_ID: userId, POKELIST_ID: parseInt(id) },
                orderBy: {
                    ID: 'asc'
                }
            }).catch((err: any) => {
                console.error(err)
            })

            if (pokelist && pokelist.length > 0) return pokelist;
            else throw "No pokelistdata found";
        } catch (error) {
            throw error;
        }
    }
}