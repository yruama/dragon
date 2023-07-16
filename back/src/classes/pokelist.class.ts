import { Pokelist , PokelistData} from "../types/pokelist";
import Core_Pokelist from "../core/pokelist.core";
import _bcrypt from 'bcrypt';
import { app } from "../app";
import Core_Generation from "../core/generation.core";

export default class Class_Pokelist {

    private _pokelist: Core_Pokelist
    private _generations: Core_Generation;

    constructor() {
        console.log("Core_Pokemon constructor");
        this._pokelist = new Core_Pokelist();
        this._generations = new Core_Generation();
    }

    async addPokelist(pokelist: Pokelist) {
        try {
            //1. On récupère la génération pour récupérer les bons pokémons
            const generationData = await this._generations.getGeneration(pokelist.GENERATION_ID);

            //2. On créait la liste
            const pokelistData = await this._pokelist.addPokelist(pokelist);

            //3. On créait les données de la liste
            for (let i = generationData.MIN; i < generationData.MAX + 1; i++) {
                await this._pokelist.addPokelistData({
                    POKEMON_ID: i,
                    USER_ID: pokelist.USER_ID,
                    POKELIST_ID: pokelistData.ID,
                    OWNED: 0
                })
            }

            return pokelistData;

        } catch (error) {
                throw error;
        }
    }



}