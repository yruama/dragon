import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIResult } from 'src/app/types/utils.types';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private _http: HttpClient) { }

  getAllPokemon() {
    //this._http.get('https://pokeapi.co/api/v2/pokemon/1').subscribe(res => console.log(res));
  }

  getTest() {
    //this._http.get('https://pokeapi.co/api/v2/pokemon/').subscribe(res => console.log(res));
  }

  getPokemon(id: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    this._http.get('http://localhost:3000/api/v1/pokemon/' + id,  {headers: headers }).subscribe(res => console.log(res));
  }

  getPokemons(offset: number, limit: number) {
    return new Promise<APIResult>((resolve, reject) => {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });

      this._http.get(`http://localhost:3000/api/v1/pokemon?offset=${offset}&limit=${limit}`, {headers: headers }).subscribe(
        res => {
          resolve(res as APIResult);
        }, error => {
          console.log(error);
          reject(error);
        }
      );
    })
  }
}
