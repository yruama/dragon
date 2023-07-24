import { Component, Input } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PokelistService } from "src/app/services/pokelist/pokelist.service";
import { PokemonService } from "src/app/services/pokemon/pokemon.service";
import { Pokelist, PokelistData } from "src/app/types/pokelist.types";
import { Pokemon } from "src/app/types/pokemons.types";

@Component({
	selector: "app-pokemons-user-list",
	templateUrl: "./pokemons-user-list.component.html",
	styleUrls: ["./pokemons-user-list.component.scss"]
})
export class PokemonsUserListComponent {
	@Input() min: number = 0;
	@Input() max: number = 151;

	pokemons: Pokemon[] = [];
	pokelistData: PokelistData[] = [];
	pokelist!: Pokelist;

	offset = 0;
	limit = 50;

	canLoadMoreData = true;

	constructor(
		private readonly _pokemonService: PokemonService,
		private readonly _pokelistService: PokelistService,
		private readonly _aRoute: ActivatedRoute
	) { }

	async ngOnInit(): Promise<void> {
		this.getPokeList();
	}

	async getPokeList(): Promise<void> {
		console.log("GetPokelist");
	}

	async getPokemons(): Promise<void> {
		if (this.offset > this.max) this.offset = this.max;
		const limit: number = this.offset + this.limit > this.max ? this.max - this.offset : this.limit;

		const pokemonsData: any = await this._pokemonService.getPokemons(this.offset, limit);

		if (pokemonsData.status === "success") {
			this.pokemons = [...this.pokemons, ...pokemonsData.result];

			console.log("Pokemons => ", this.pokemons);
			setTimeout(() => {
				this.canLoadMoreData = true;
			}, 500);
		}
	}

	loadMorePokemons(): void {
		const delta = 100;
		const element = document.getElementsByClassName("p-datatable-wrapper") as any;

		element[0].addEventListener("scroll", (event: any) => {
			const scrollTop = element[0].scrollTop;
			const sizeWindowTable = element[0].offsetHeight;
			const sizeTable = element[0].childNodes[1].offsetHeight;

			if (scrollTop + sizeWindowTable + delta > sizeTable && this.canLoadMoreData) {
				this.canLoadMoreData = false;
				this.offset += this.limit;
				this.getPokemons();
			}
		});
	}
}
