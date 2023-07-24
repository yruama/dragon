import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { GenerationService } from "src/app/services/generation/generation.service";
import { PokelistService } from "src/app/services/pokelist/pokelist.service";
import { Pokelist } from "src/app/types/pokelist.types";

@Component({
	selector: "app-modal-list",
	templateUrl: "./modal-list.component.html",
	styleUrls: ["./modal-list.component.scss"]
})
export class ModalListComponent implements OnInit {
	@Output() reloadData = new EventEmitter();

	pokelist: Pokelist = {
		NAME: "",
		IMAGE: "image",
		GENERATION_ID: 0
	};

	loading = false;
	generations: any = [];

	constructor(
		private readonly _generation: GenerationService,
		private readonly _pokelist: PokelistService
	) {}

	async ngOnInit(): Promise<void> {
		const generationData = await this._generation.getGenerations();

		console.log("generationData => ", generationData);

		if (generationData.status === "success") {
			this.generations = generationData.result;
			this.generations.forEach((_generation: any) => {
				_generation.NAME = `${_generation.NAME} - (${_generation.MIN} - ${_generation.MAX})`;
			});
			console.log("Generations : ", this.generations);
		}
	}

	async createList(): Promise<void> {
		if (!this.loading) {
			this.loading = true;
			const pokelistData = await this._pokelist.addPokeList(this.pokelist);

			if (pokelistData.status === "success") {
				this.loading = false;
				this.reloadData.emit(true);
			}
		}
	}
}
