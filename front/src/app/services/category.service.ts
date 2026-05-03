import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Category } from "../types/category.types";
import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { environment } from "src/environments/environment";
import { firstValueFrom } from 'rxjs';

@Injectable({
	providedIn: "root"
})
export class CategoryService {
	constructor(
		private readonly _http: HttpClient,
		public jwtHelper: JwtHelperService
	) { }

	async get(): Promise<Category[]> {
		const headers = new HttpHeaders({
			"Content-Type": "application/json"
		});

		return await firstValueFrom(this._http.get<Category[]>(`${environment.apiURL}/category/`, { headers }));
	}
}
