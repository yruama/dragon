import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokeapiService {

  constructor(private _http: HttpClient) { }

  getAllPokemon() {
    this._http.get('https://pokeapi.co/api/v2/pokemon/1').subscribe(res => console.log(res));
  }

  getTest() {
    this._http.get('https://pokeapi.co/api/v2/pokemon/').subscribe(res => console.log(res));
  }
}
