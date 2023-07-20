import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIResult } from 'src/app/types/utils.types';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GenerationService {

  constructor(private _http: HttpClient) { }

  getGenerations() {
    return new Promise<APIResult>((resolve, reject) => {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });

      this._http.get(environment.apiURL + `/generation`, {headers: headers }).subscribe(
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
