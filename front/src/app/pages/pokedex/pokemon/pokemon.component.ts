import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Pokemon } from 'src/app/types/pokemons.types';
import { PokemonService } from 'src/app/services/pokemon/pokemon.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {
  id!: string;
  pokemon!: Pokemon;
  evolutions: Pokemon[] = [];
  env = environment;

  isLoading = true;

  constructor(private route: ActivatedRoute,
              private PokemonService: PokemonService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      // Vous pouvez maintenant utiliser this.id dans votre composant
      console.log(this.id);
      this.getPokemon()
    });
  }

  getPokemon() {
    this.PokemonService.getPokemon(this.id).subscribe({
      next: (data: any) => {
        console.log("Pokemon : ", data)
        this.pokemon = data;
      }, error: (err) => {
        
      }, complete: () => {
        this.getPokemonEvolutions();
      }
    })
  }


  getPokemonEvolutions() {
    this.PokemonService.getPokemonEvolutions(this.pokemon.EVOLUTION_ID).subscribe({
      next: (data: any) => {
        console.log("Evolutions : ", data)
        this.evolutions = data;
      }, error: (err) => {
        
      }, complete: () => {
        this.isLoading = false;
      }
    })
  }

}
