import { HttpClient, HttpHeaders } from "@angular/common/http";

import { APIResult } from "src/app/types/utils.types";
import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Truth } from "../types/truth.types";
import { environment } from "src/environments/environment";
import { firstValueFrom } from 'rxjs';

@Injectable({
	providedIn: "root"
})
export class TruthService {
	constructor(
		private readonly _http: HttpClient,
		public jwtHelper: JwtHelperService
	) { }

	async add(truth: Truth): Promise<APIResult> {
		const token = localStorage.getItem("token");
		const headers = new HttpHeaders({
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`
		});

		return await firstValueFrom(this._http.post<APIResult>(`${environment.apiURL}/truth/`, { truth }, { headers }));
	}
}
