import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pokelist } from 'src/app/types/pokelist.types';
import { APIResult } from 'src/app/types/utils.types';

@Injectable({
  providedIn: 'root'
})
export class PokelistService {

  constructor(private _http: HttpClient) { }

  getPokeList(id: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    this._http.get('http://localhost:3000/api/v1/pokelist/' + id,  {headers: headers }).subscribe(res => console.log(res));
  }

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
}
