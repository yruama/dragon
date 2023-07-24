import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { PokelistService } from "src/app/services/pokelist/pokelist.service";
import { Pokelist } from "src/app/types/pokelist.types";

@Component({
	selector: "app-pokelist",
	templateUrl: "./pokelist.component.html",
	styleUrls: ["./pokelist.component.scss"]
})
export class PokelistComponent implements OnInit {
	visible = false;

	pokelist: Pokelist[] = [];

	constructor(
		private readonly _pokelist: PokelistService,
		private readonly _router: Router
	) {}

	ngOnInit(): void {
		this.getPokeList();
	}

	async getPokeList(): Promise<void> {
		const pokelistData = await this._pokelist.getPokeLists();

		console.log("pokelistData => ", pokelistData);
		if (pokelistData.status === "success") {
			this.pokelist = pokelistData.result;
		}
	}

	viewList(list: Pokelist): void {
		this._router.navigate(["/pokelist/" + list.ID]);
	}

	reloadData(event: any): void {
		this.visible = false;
		if (event) this.getPokeList();
	}

	deletePokeList(id: number): void {
		console.log("Delete : ", id);
		this._pokelist.deletePokeList(id);
		this.getPokeList();
	}
}
