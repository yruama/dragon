import { Component, OnInit } from '@angular/core';

import { GenerationService } from 'src/app/services/generation/generation.service';
import { Pokemon } from 'src/app/types/pokemons.types';
import { PokemonService } from 'src/app/services/pokemon/pokemon.service';
import { TypeService } from 'src/app/services/type/type.service';
import { environment } from 'src/environments/environment';

interface PokemonWithTypeData extends Pokemon {
  TYPE_1_NAME: string;
  TYPE_2_NAME: string
}

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit {

  env = environment;
  pokemons: PokemonWithTypeData[] = [];
  generations: any;
  type: any;
  currentGeneration = -2;
  scrollTo = false;
  scrollToId = 0;
  sidebarVisible = false;

  pagination = {
    offset: 0,
    limit: 0,
    max: 0
  }

  buttonLoading = false;

  constructor(private PokemonService: PokemonService,
              private GenerationService: GenerationService,
              private TypeService: TypeService) {}

  ngOnInit(): void {
    this.getType();
  }

  getType() {
    this.TypeService.getTypes().subscribe({
      next: (data: any) => {
        console.log("TYPE : ", data)

        this.type = data;
      }, error: (err) => {
        
      }, complete: () => {
        this.getGeneration();
      }
    })
  }

  getGeneration() {
    this.GenerationService.getGenerations().subscribe({
      next: (data: any) => {
        this.generations = data;
      }, error: (err) => {
        
      }, complete: () => {
        this.selectGeneration(-1);
      }
    })
  }

  selectGeneration(generationIndex: number) {
    if (generationIndex === this.currentGeneration) return;

    this.currentGeneration = generationIndex;

    let min = 0;
    let max = 999;

    if (generationIndex === -1) {
      min = 1;
      max = this.generations[this.generations.length -1].MAX;
    } else {
      const generation = this.generations[this.currentGeneration];
      min = generation.MIN;
      max = generation.MAX;
    }

    this.scrollTo = true;
    this.scrollToId = min;
    this.setPagination(min - 1, 50, max);
  }

  loadMore() {
    if (this.buttonLoading) return;
    this.buttonLoading = true;
    this.scrollTo = true;
    this.scrollToId = (this.pagination.offset + this.pagination.limit) > this.pagination.max ? this.pagination.max : this.pagination.offset + this.pagination.limit;
    this.setPagination(this.pagination.offset, this.pagination.limit + 50, this.pagination.max);
  }

  setPagination(offset: number, limit: number, max: number) {
    this.pagination = {
      offset: offset,
      limit: limit,
      max: max
    }

    this.getPokemons();
  }

  getPokemons() {
    this.PokemonService.getPokemons(this.pagination.offset, this.pagination.limit, this.pagination.max).subscribe({
      next: (data: any) => {
       this.pokemons = data;

       for (const pokemon of this.pokemons) {
        if (pokemon.TYPE_ID_1) pokemon.TYPE_1_NAME = this.type.find((t: any) => t.ID === pokemon.TYPE_ID_1)?.NAME
        if (pokemon.TYPE_ID_2) pokemon.TYPE_2_NAME = this.type.find((t: any) => t.ID === pokemon.TYPE_ID_2)?.NAME
       }

       console.log("Pokemons : ", data)
      }, error: (err) => {
        
      }, complete: () => {
        setTimeout(() => {
          this.buttonLoading = false;
          if (this.scrollTo) {
            const element = document.getElementById('pokemon-' + this.scrollToId);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }
        }, 150);
        
      }
    })
  }

}
