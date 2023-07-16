import { Component, HostListener, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokelistService } from 'src/app/services/pokelist/pokelist.service';
import { PokemonService } from 'src/app/services/pokemon/pokemon.service';
import { Pokelist, PokelistData } from 'src/app/types/pokelist.types';
import { Pokemon } from 'src/app/types/pokemons.types';

@Component({
  selector: 'app-pokemons-user-list',
  templateUrl: './pokemons-user-list.component.html',
  styleUrls: ['./pokemons-user-list.component.scss']
})
export class PokemonsUserListComponent {

  @Input() min: number = 0;
  @Input() max: number = 151;

  pokemons: Pokemon[] = [];
  pokelistData: PokelistData[] = [];
  //@ts-ignore
  pokelist: Pokelist;

  offset = 0;
  limit = 50;

  canLoadMoreData = true;


  constructor(private _pokemonService: PokemonService,
              private _pokelistService: PokelistService,
              private _aRoute: ActivatedRoute) {}

  async ngOnInit() {
    const list = await this._pokelistService.getPokeList(this._aRoute.snapshot.paramMap.get('id')!)
    
    if (list.status === "success") {
      this.pokelistData = list.result.pokelistData;
      this.pokemons = list.result.pokemon;
      this.pokelist = list.result.pokelist;
    }

    console.log("LIST => ", list)
   /* this.offset = this.min;
    this.getPokemons();

    this.loadMorePokemons()*/
  }

  async getPokemons() {
    
    if (this.offset > this.max) this.offset = this.max;
    const limit: number = this.offset + this.limit > this.max ? this.max - this.offset : this.limit;


    const pokemonsData: any = await this._pokemonService.getPokemons(this.offset, limit);

    if (pokemonsData.status === 'success') {
      this.pokemons = [...this.pokemons, ...pokemonsData.result];

      console.log("Pokemons => ", this.pokemons)
      setTimeout(() => {
        this.canLoadMoreData = true;
      }, 500);
    }
  }

  loadMorePokemons() {
    const delta = 100;
    const element = document.getElementsByClassName('p-datatable-wrapper') as any;


    element[0].addEventListener('scroll', (event: any) => {
      const scrollTop = element[0].scrollTop;
      const sizeWindowTable = element[0].offsetHeight
      const sizeTable = element[0].childNodes[1].offsetHeight;

      if (scrollTop + sizeWindowTable + delta > sizeTable && this.canLoadMoreData) {
        this.canLoadMoreData = false;
        this.offset += this.limit;
        this.getPokemons();
      }
    });

  }

}
