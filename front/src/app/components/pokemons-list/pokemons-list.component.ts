import { Component, Input, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon/pokemon.service';
import { Pokemon } from 'src/app/types/pokemons.types';

@Component({
  selector: 'app-pokemons-list',
  templateUrl: './pokemons-list.component.html',
  styleUrls: ['./pokemons-list.component.scss']
})
export class PokemonsListComponent implements OnInit {
  @Input() min: number = 0;
  @Input() max: number = 55;

  pokemons: Pokemon[] = [];

  offset = 0;
  limit = 25;

  constructor(private _pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.getPokemons();
  }

  async getPokemons() {
    if (this.offset > this.max) this.offset = this.max;
    const limit: number = this.offset + this.limit > this.max ? this.max - this.offset : this.limit;

    const pokemonsData: any = await this._pokemonService.getPokemons(this.offset, limit);

    if (pokemonsData.status === 'success') {
      this.pokemons = [...this.pokemons, ...pokemonsData.result];

      console.log("Pokemons => ", this.pokemons)
    }
  }

  loadMorePokemons() {
    this.offset += this.limit;
    
    this.getPokemons();
  }

}
