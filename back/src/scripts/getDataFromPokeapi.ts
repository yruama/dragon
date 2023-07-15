import axios from "axios";
import fs from "fs";
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

import Core_Pokemon from "../core/pokemon.core";
import { Pokemon, PokeInfos } from "../types/pokemon";


async function start() {
    console.log("Start !")

    //await prisma.pokemon.deleteMany({})
    getPokemonsFromFile()
    //getXPokemon(152, 251);
    //updatePokemonFromFile(0)

}

function updatePokemonFromFile(id: number) {
    fs.readFile('./mynewfile1.txt', 'utf8', (err, data) => {
        let pokemons = JSON.parse(data);
        const corePokemon = new Core_Pokemon();


        let pokemon = JSON.parse(pokemons[id]);

        const formatedPokemon: Pokemon = {
            id          : pokemon.id,
            name        : pokemon.name,
            sprite      : pokemon.sprite,
            statistics  : pokemon.statistics,
            generation  : pokemon.generation,
            informations: {
                height: pokemon.height,
                category: pokemon.category,
                weight: pokemon.weight,
                type: pokemon.types
            }
        }

        corePokemon.addPokemon(formatedPokemon);


    });
}

function getPokemonsFromFile() {
    fs.readFile('./mynewfile1.txt', 'utf8', (err, data) => {
        let pokemons = JSON.parse(data);
        const corePokemon = new Core_Pokemon();

        for (let pokemon of pokemons) {

            pokemon = JSON.parse(pokemon);

            const formatedPokemon: Pokemon = {
                id          : pokemon.id,
                name        : pokemon.name,
                sprite      : pokemon.sprite,
                statistics  : pokemon.statistics,
                generation  : pokemon.generation,
                informations: {
                    height: pokemon.height,
                    category: pokemon.category,
                    weight: pokemon.weight,
                    type: pokemon.types
                }
            }

            corePokemon.addPokemon(formatedPokemon);
        }

    });
}

async function getXPokemon(start: number, end: number) {
    const allPokemon: string[] = []
    for (let index = start; index < (end + start); index++) {
        allPokemon.push(await getOnePokemonAndFormatIt(index.toString()));
    }

    fs.appendFile('mynewfile1.txt', JSON.stringify(allPokemon), function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
}

async function getOnePokemonAndFormatIt(i: string): Promise<string> {

    try {
        const pokemonData           = await axios.get('https://pokeapi.co/api/v2/pokemon/' + i);
        const pokemonSpeciesData    = await axios.get('https://pokeapi.co/api/v2/pokemon-species/' + i)

        console.log("get data of", i, "th pokemon");

        if (pokemonData.data && pokemonSpeciesData.data) {
            const pokemon         = pokemonData.data;
            const pokemonSpecies  = pokemonSpeciesData.data;

            const height        = pokemon.height;
            const weight        = pokemon.weight;
            const name          = JSON.stringify(pokemonSpecies.names.filter((_name: any) => _name.language.name === 'fr' || _name.language.name === 'en')
                                                                    .map((_name: any) => { return { name: _name.name, language: _name.language.name }}));
            const generation    = getGeneration(pokemonSpecies.generation.name.split('-')[1]);
            const statistics    = pokemon.stats.map((_stats: any) => { return { value: _stats.base_stat, name: _stats.stat.name }})
            const types         = pokemon.types.map((_type: any) => { return { name: _type.type.name }});
            const srpite        = pokemon.sprites.other['official-artwork'].front_default;
            const category      = pokemonSpecies.genera.filter((_genera: any) => _genera.language.name === 'fr' || _genera.language.name === 'en')
                                                        .map((_category: any) => { return { name: _category.genus, language: _category.language.name }});
            const id            = pokemonSpecies.pokedex_numbers[0].entry_number;

            const pokemonFormated = {
                id          : id,
                name        : name,
                height      : height,
                weight      : weight,
                sprite      : srpite,
                types       : types,
                statistics  : JSON.stringify(statistics),
                generation  : generation,
                category    : category
            }

            return JSON.stringify(pokemonFormated);
        }
    } catch (error) {
        console.error('[getOnePokemon error ] => ', i, " - ", error);
        throw 'Error'
    }

    return '';
}

function getGeneration(romanNumber: string): number {
    switch (romanNumber) {
        case 'i':
            return 1;
            break;
    
        default:
            return 1;
            break;
    }
}

export default start;