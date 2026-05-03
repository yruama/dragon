import { HttpClient, HttpHeaders } from "@angular/common/http";

import { APIResult } from "src/app/types/utils.types";
import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Level } from "../types/level.types";
import { environment } from "src/environments/environment";
import { firstValueFrom } from 'rxjs';

@Injectable({
	providedIn: "root"
})
export class LevelService {
	constructor(
		private readonly _http: HttpClient,
		public jwtHelper: JwtHelperService
	) { }

	async get(): Promise<Level[]> {
		const headers = new HttpHeaders({
			"Content-Type": "application/json"
		});

		return await firstValueFrom(this._http.get<Level[]>(`${environment.apiURL}/level/`, { headers }));
	}
}
