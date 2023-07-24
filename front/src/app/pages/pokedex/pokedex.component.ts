import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { Subject } from "rxjs";
import { PokemonService } from "src/app/services/pokemon/pokemon.service";

@Component({
	selector: "app-pokedex",
	templateUrl: "./pokedex.component.html",
	styleUrls: ["./pokedex.component.scss"]
})
export class PokedexComponent implements OnInit {
	reloadData: Subject<void> = new Subject<void>();

	pokemonId = 1;
	generation = 0;

	generationValue = [
		{ from: 0, to: 1010 },
		{ from: 0, to: 151 },
		{ from: 151, to: 251 },
		{ from: 251, to: 386 },
		{ from: 386, to: 493 },
		{ from: 493, to: 649 },
		{ from: 649, to: 721 },
		{ from: 721, to: 809 },
		{ from: 809, to: 905 },
		{ from: 905, to: 1010 }
	];

	constructor(
		private readonly _router: Router,
		private readonly _aRoute: ActivatedRoute
	) { }

	ngOnInit(): void {
		this.getGeneration();
		this._router.events.forEach(event => {
			if (event instanceof NavigationEnd) {
				this.getGeneration();
			}
		});
	}

	getGeneration() {
		const generation = this._aRoute.snapshot.paramMap.get("id");

		this.generation = generation !== null ? parseInt(generation) : 0;

		setTimeout(() => {
			this.reloadData.next();
		}, 500);
	}
}
