import { HttpClient, HttpHeaders } from "@angular/common/http";

import { APIResult } from "src/app/types/utils.types";
import { Data } from "@angular/router";
import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { environment } from "src/environments/environment";
import { firstValueFrom } from 'rxjs';

@Injectable({
	providedIn: "root"
})
export class DataService {
	constructor(
		private readonly _http: HttpClient,
		public jwtHelper: JwtHelperService
	) { }

	async add(data: Data): Promise<APIResult> {
		const headers = new HttpHeaders({
			"Content-Type": "application/json"
		});

		console.log("API : ", `${environment.apiURL}/data`)
		return await firstValueFrom(this._http.post<APIResult>(`${environment.apiURL}/data/`, { data }, { headers }));
	}
}
