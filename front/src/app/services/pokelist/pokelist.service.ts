import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pokelist } from 'src/app/types/pokelist.types';
import { APIResult } from 'src/app/types/utils.types';

@Injectable({
  providedIn: 'root'
})
export class PokelistService {

  constructor(private _http: HttpClient) { }

  addPokeList(pokelist: Pokelist) {
    return new Promise<APIResult>((resolve, reject) => {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      });

      this._http.post('http://localhost:3000/api/v1/pokelist/', { pokelist }, { headers }).subscribe(
        res => {
          resolve(res as APIResult);
        }, error => {
          console.log(error);
          reject(error);
        }
      );
    })
  }

  getPokeLists() {
    return new Promise<APIResult>((resolve, reject) => {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      });

      this._http.get(`http://localhost:3000/api/v1/pokelist`, {headers: headers }).subscribe(
        res => {
          resolve(res as APIResult);
        }, error => {
          console.log(error);
          reject(error);
        }
      );
    })
  }

  getPokeList(id: string) {
    return new Promise<APIResult>((resolve, reject) => {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      });

      this._http.get(`http://localhost:3000/api/v1/pokelist/${id}`,  {headers: headers }).subscribe(
        res => {
          resolve(res as APIResult);
        }, error => {
          console.log(error);
          reject(error);
        }
      );
    })
  }

  getPokemonOfPokeList(id: number, offset: number, limit: number) {
    return new Promise<APIResult>((resolve, reject) => {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      });

      this._http.get(`http://localhost:3000/api/v1/pokelist/${id}/pokemon?offset=${offset}&limit=${limit}`,  {headers: headers }).subscribe(
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
