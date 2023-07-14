import { Component, OnInit } from '@angular/core';
import { PokeapiService } from 'src/app/services/pokeapi/pokeapi.service';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit {

  pokemonId = 1;

  constructor(private _pokeapi: PokeapiService) {}

  ngOnInit(): void {
    
  }

  getPokemon() {
    this._pokeapi.getPokemon(this.pokemonId);
  }

}
