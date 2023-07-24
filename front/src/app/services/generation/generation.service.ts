import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIResult } from 'src/app/types/utils.types';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class GenerationService {
	constructor (private readonly _http: HttpClient) { }

	async getGenerations () {
		return await new Promise<APIResult>((resolve, reject) => {
			const headers = new HttpHeaders({
				'Content-Type': 'application/json'
			});

			this._http.get(environment.apiURL + `/generation`, { headers }).subscribe(
				res => {
					resolve(res as APIResult);
				}, error => {
					console.log(error);
					reject(error);
				}
			);
		});
	}
}
