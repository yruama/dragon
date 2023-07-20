import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/types/user';
import { APIResult } from 'src/app/types/utils.types';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient,
              public jwtHelper: JwtHelperService) { }

  signUp(user: User) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this._http.post(environment.serverURL + '/user/sign-up', { user }, { headers })
  }

  signIn(user: User) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this._http.post(environment.serverURL + '/user/sign-in', { user }, { headers });
  }

  test() {
    return new Promise<APIResult>((resolve, reject) => {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      });

      this._http.post(environment.serverURL + '/user/test', { toto: "toto" }, { headers }).subscribe(
        res => {
          resolve(res as APIResult);
        }, error => {
          console.log(error);
          reject(error);
        }
      );
    })
  }

  public isAuthenticated(): boolean {
    try {
      const token = localStorage.getItem('token');
      return !this.jwtHelper.isTokenExpired(token);
    } catch (error) {
      return false
    }
    
  }

}
