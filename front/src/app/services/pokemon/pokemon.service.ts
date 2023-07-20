import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIResult } from 'src/app/types/utils.types';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private _http: HttpClient) { }

  getPokemon(id: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    this._http.get(environment.apiURL +'/pokemon/' + id,  {headers: headers }).subscribe(res => console.log(res));
  }

  getPokemons(offset: number, limit: number) {

      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });

      return this._http.get(environment.apiURL +`/pokemon?offset=${offset}&limit=${limit}`, {headers: headers })
  }

  getUserPokedex() {
    console.log("environment => ", environment)
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this._http.get(environment.apiURL +`/pokemon/user-pokedex`, { headers: headers })
  }

  addPokemonsToUserPokedex(pokemonIds: number[]) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    const data = {
      pokemonIds
    }

    return this._http.post(environment.apiURL +`/pokemon/user-pokedex`, { pokemonIds }, { headers: headers })
  }
}
