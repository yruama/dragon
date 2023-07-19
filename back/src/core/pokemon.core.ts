import { Pokemon } from "../types/pokemon";
import Core_Utils from "./utils.core";
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

export default class Core_Pokemon {

    private _utils: Core_Utils

    constructor() {
        this._utils = new Core_Utils();
    }

    async addPokemon(pokemon: Pokemon) {

        try {
            // await this._utils.downloadImage(pokemon.artwork, 'artwork/' + pokemon.id + '.png');
            // await this._utils.downloadImage(pokemon.miniature, 'miniature/' + pokemon.id + '.png');

            await prisma.POKEMON.create({
                data: {
                    POKEMON_ID      : pokemon.POKEMON_ID,
                    NAME_FR         : pokemon.NAME_FR,
                    NAME_EN         : pokemon.NAME_EN,
                    DESCRIPTION_FR  : pokemon.DESCRIPTION_FR,
                    DESCRIPTION_EN  : pokemon.DESCRIPTION_EN,
                    CATEGORY        : pokemon.CATEGORY,
                    TYPE_ID_1       : pokemon.TYPE_1_ID,
                    TYPE_ID_2       : pokemon.TYPE_2_ID,
                    TALENT          : pokemon.TALENT,
                    SHAPE_ID        : pokemon.SHAPE,
                    GENERATION      : pokemon.GENERATION,
                    INFORMATIONS    : pokemon.INFORMATION,
                    EVOLUTION_ID    : pokemon.EVOLUTION,
                    COLOR           : pokemon.COLOR
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
            const pokemon = await prisma.POKEMON.findMany({
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

    async getManyPokemon(pokemonIds: number[]) {
        try {
            console.log("Get many : ", pokemonIds)
            const pokemon = await prisma.pokemon.findMany({
                where: { POKEMON_ID: { in: pokemonIds } },
                orderBy: {
                    POKEMON_ID: 'asc'
                }
            }).catch((err: any) => {
                console.error(err)
            })

            console.log("POKEMON => ", pokemon)

            if (pokemon && pokemon.length > 0) return pokemon;
            else throw "No pokemon found";
        } catch (error) {
            throw error;
        }
    }

    async getPokemonOfUserPokedex(userId: number) {
        try {
            const pokemon = await prisma.POKEMON_OWNED.findMany({
                where: { USER_ID: userId },
                orderBy: {
                    POKEMON_ID: 'asc'
                }
            }).catch((err: any) => {
                console.error(err)
            })

            if (pokemon && pokemon.length > 0) return pokemon;
            else throw "No pokemon found";
        } catch (error) {
            throw error;
        }
    }

    async addPokemonInUserPokedex(userId: number, pokemonIds: number[]) {
        try {
            console.log("Pokemons Ids : ", pokemonIds)
            for (const id of pokemonIds) {
                await prisma.POKEMON_OWNED.create({
                    data: {
                        POKEMON_ID      : id,
                        USER_ID         : userId,
                        OWNED           : 1
                    },
                }).catch((err: any) => {
                    console.error(err)
                })
            }

            return true;
        } catch (error) {
            throw error;
        }

    }
}