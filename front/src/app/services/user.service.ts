import { HttpClient, HttpHeaders } from "@angular/common/http";

import { APIResult } from "src/app/types/utils.types";
import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable } from "rxjs";
import { User } from "src/app/types/user";
import { environment } from "src/environments/environment";

@Injectable({
	providedIn: "root"
})
export class UserService {
	constructor(
		private readonly _http: HttpClient,
		public jwtHelper: JwtHelperService
	) { }

	signUp(user: User): Observable<User> {
		const headers = new HttpHeaders({
			"Content-Type": "application/json"
		});

		console.log("coucou", `${environment.apiURL}/user/sign-up`)
		return this._http.post<User>(`${environment.apiURL}/user/sign-up`, { user }, { headers });
	}

	signIn(user: User): Observable<APIResult> {
		const headers = new HttpHeaders({
			"Content-Type": "application/json"
		});

		return this._http.post<APIResult>(`${environment.apiURL}/user/sign-in`, { user }, { headers });
	}

	getByToken(): Observable<APIResult> {
		const token = localStorage.getItem("token");

		const headers = new HttpHeaders({
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`
		});

		return this._http.get<APIResult>(`${environment.apiURL}/user/getByToken`, { headers });
	}

	public isAuthenticated(): boolean {
		try {
			const token = localStorage.getItem("token");
			return !this.jwtHelper.isTokenExpired(token);
		} catch (error) {
			return false;
		}
	}
}
