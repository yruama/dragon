import { Pokemon } from "../types/pokemon";
import Core_Utils from "./utils.core";
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

export default class Core_Pokemon {

    private _utils: Core_Utils

    constructor() {
        console.log("Core_Pokemon constructor");
        this._utils = new Core_Utils();
    }

    async addPokemon(pokemon: Pokemon) {

        try {
            this._utils.downloadImage(pokemon.sprite, pokemon.id + '.jpg');

            await prisma.pokemon.create({
                data: {
                    POKEMON_ID:      parseInt(pokemon.id as any),
                    NAME:            JSON.parse(pokemon.name),
                    GENERATION:      pokemon.generation,
                    STATISTICS:      JSON.parse(pokemon.statistics),
                    INFORMATIONS:    pokemon.informations
                },
            });

            return true;
        } catch (error) {
            throw error;
        }

    }

    async getPokemon(id: number) {
        try {
            const pokemon = await prisma.pokemon.findMany({
                where: { POKEMON_ID: id },
            })

            if (pokemon && pokemon.length > 0) return pokemon[0];
            else throw "No pokemon found with this id : " + id;
        } catch (error) {
            throw error;
        }

    }

    async getPokemonsWithPagination(offset: number, limit: number) {
        try {
            const pokemon = await prisma.pokemon.findMany({
                skip: offset,
                take: limit,
                orderBy: {
                    POKEMON_ID: 'asc'
                }
            })

            if (pokemon && pokemon.length > 0) return pokemon;
            else throw "No pokemon found";
        } catch (error) {
            throw error;
        }

    }
}