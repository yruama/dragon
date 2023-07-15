import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/types/user';
import { APIResult } from 'src/app/types/utils.types';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) { }

  signUp(user: User) {
    return new Promise<APIResult>((resolve, reject) => {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });

      this._http.post('http://localhost:3000/api/v1/user/sign-up', { user }, { headers }).subscribe(
        res => {
          resolve(res as APIResult);
        }, error => {
          console.log(error);
          reject(error);
        }
      );
    })
  }

  signIn(user: User) {
    return new Promise<APIResult>((resolve, reject) => {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });

      this._http.post('http://localhost:3000/api/v1/user/sign-in', { user }, { headers }).subscribe(
        res => {
          resolve(res as APIResult);
        }, error => {
          console.log(error);
          reject(error);
        }
      );
    })
  }

  test() {
    return new Promise<APIResult>((resolve, reject) => {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFtYXVyeWxhcm96ZUBnbWFpbC5jb20iLCJpZCI6MSwiaWF0IjoxNjg5NDU3MDY3fQ.XBt0pF2Q9gGJbFoEOl6Mi_tbjr2xHFdgRg78nuTAW8k`
      });

      this._http.post('http://localhost:3000/api/v1/user/test', { toto: "toto" }, { headers }).subscribe(
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
