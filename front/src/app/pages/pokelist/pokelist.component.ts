import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PokelistService } from 'src/app/services/pokelist/pokelist.service';
import { Pokelist } from 'src/app/types/pokelist.types';

@Component({
	selector: 'app-pokelist',
	templateUrl: './pokelist.component.html',
	styleUrls: ['./pokelist.component.scss']
})
export class PokelistComponent implements OnInit {
	visible = false;

	pokelist: Pokelist[] = [];

	constructor (private readonly _pokelist: PokelistService,
		private readonly _router: Router) {}

	ngOnInit () {
		this.getPokeList();
	}

	async getPokeList () {
		const pokelistData = await this._pokelist.getPokeLists();

		console.log("pokelistData => ", pokelistData);
		if (pokelistData.status === 'success') {
			this.pokelist = pokelistData.result;
		}
	}

	viewList (list: Pokelist) {
		this._router.navigate(['/pokelist/' + list.ID]);
	}

	reloadData (event: any) {
		this.visible = false;
		if (event) this.getPokeList();
	}

	deletePokeList (id: number) {
		console.log("Delete : ", id);
		this._pokelist.deletePokeList(id);
		this.getPokeList();
	}
}
