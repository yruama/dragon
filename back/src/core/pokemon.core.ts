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

        this._utils.downloadImage(pokemon.sprite, pokemon.id + '.jpg');

    console.log("Add pokemon : ", pokemon.id)

        await prisma.pokemon.create({
            data: {
                POKEMON_ID:      parseInt(pokemon.id as any),
                NAME:            JSON.parse(pokemon.name),
                GENERATION:      pokemon.generation,
                STATISTICS:      JSON.parse(pokemon.statistics),
                INFORMATIONS:    pokemon.informations
            },
          });
    }

    async getPokemon(id: number) {
        const pokemon = await prisma.pokemon.findMany({
            where: { POKEMON_ID: id },
        })

        return pokemon;
    }

    async getPokemonsWithPagination() {

    }
}