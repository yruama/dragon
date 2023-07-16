import { Component, OnInit } from '@angular/core';
import { PokelistService } from 'src/app/services/pokelist/pokelist.service';

@Component({
  selector: 'app-pokelist',
  templateUrl: './pokelist.component.html',
  styleUrls: ['./pokelist.component.scss']
})
export class PokelistComponent implements OnInit {
  visible = false;

  constructor(private _pokelist: PokelistService) {}

  async ngOnInit() {
    const pokelistData = await this._pokelist.getPokeLists();

    if (pokelistData.status === 'success') {
      console.log(pokelistData.result)
    }
  }
}
