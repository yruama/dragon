import { Component, OnInit } from "@angular/core";
import { PokemonService } from "src/app/services/pokemon/pokemon.service";
import { Pokemon } from "src/app/types/pokemons.types";

import * as Papa from "papaparse";
import { GlobalService } from "src/app/services/global/global.service";

@Component({
	selector: "app-profile-pokedex",
	templateUrl: "./profile-pokedex.component.html",
	styleUrls: ["./profile-pokedex.component.scss"]
})
export class ProfilePokedexComponent implements OnInit {
	pokemons: Pokemon[] = [];
	pokemonsOwned: number[] = [];

	constructor(
		private readonly _pokemonService: PokemonService,
		public _global: GlobalService
	) {}

	async ngOnInit() {
		this._pokemonService.getUserPokedex().subscribe({
			next: (userPokedexData: any) => {
				console.log("userPokedexData : ", userPokedexData);
				this.pokemonsOwned = userPokedexData.result.map((_pokemon: any) => _pokemon.POKEMON_ID);

				this._pokemonService.getPokemons(0, 1010).subscribe({
					next: (pokemonData: any) => {
						this.pokemons = pokemonData.result;

						this.pokemons
							.filter(_pokemon => this.pokemonsOwned.includes(_pokemon.POKEMON_ID))
							.forEach(_pokemon => (_pokemon.owned = true));
					},
					error: err => {},
					complete: () => {}
				});
			},
			error: err => {
				console.log("error => ", err);
			},
			complete: () => {}
		});
	}

	exportPokedex() {
		console.log("This.pokemon : ", this.pokemons);
		const csvLines: string[][] = [];
		const row: string[] = [];
		const header = ["No", "Nom", "Possédés"];

		csvLines.push(header);

		for (const pokemon of this.pokemons) {
			if (!pokemon.owned) pokemon.owned = false;
			csvLines.push([pokemon.POKEMON_ID.toString(), pokemon.NAME_FR, String(pokemon.owned)]);
		}

		const csvData = Papa.unparse(csvLines);
		const blob = new Blob([csvData], { type: "text/csv" });
		const url = window.URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = "data.csv";
		a.click();
		window.URL.revokeObjectURL(url);
	}

	savePokedex() {
		/*
    if (data.status === 'success')  pokemonIds = this.filterUniqueElements(pokemonIds, data.result.map((_p: any) => _p.POKEMON_ID));

    console.log("PokemonIds : ", pokemonIds);
    console.log("Data => ", data.result)

    if (pokemonIds && pokemonIds.length > 0)
    this._pokemonService.addPokemonsToUserPokedex(pokemonIds).subscribe({
      next: (data: any) => {
        console.log("Dataaaaa => ", data)
      }, error: (err) => {

      }, complete: () => {

      }
    }) */
	}

	filterUniqueElements(arr1: number[], arr2: number[]): number[] {
		// Compter les occurrences des éléments du premier tableau
		const occurrences: Record<number, number> = {};
		for (const num of arr1) {
			occurrences[num] = (occurrences[num] || 0) + 1;
		}

		// Décrémenter les occurrences des éléments du deuxième tableau
		for (const num of arr2) {
			if (occurrences.hasOwnProperty(num)) {
				occurrences[num] -= 1;
			}
		}

		// Conserver les éléments du premier tableau dont l'occurrence est supérieure à zéro
		const uniqueElements: number[] = arr1.filter(num => occurrences[num] > 0);

		return uniqueElements;
	}
}
