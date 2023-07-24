import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pokelist } from 'src/app/types/pokelist.types';
import { APIResult } from 'src/app/types/utils.types';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class PokelistService {
	constructor (private readonly _http: HttpClient) { }

	async addPokeList (pokelist: Pokelist) {
		return await new Promise<APIResult>((resolve, reject) => {
			const headers = new HttpHeaders({
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`
			});

			this._http.post(environment.apiURL + '/pokelist/', { pokelist }, { headers }).subscribe(
				res => {
					resolve(res as APIResult);
				}, error => {
					console.log(error);
					reject(error);
				}
			);
		});
	}

	async getPokeLists () {
		return await new Promise<APIResult>((resolve, reject) => {
			const headers = new HttpHeaders({
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`
			});

			this._http.get(environment.apiURL + `/pokelist`, { headers }).subscribe(
				res => {
					resolve(res as APIResult);
				}, error => {
					console.log(error);
					reject(error);
				}
			);
		});
	}

	async getPokeList (id: string) {
		return await new Promise<APIResult>((resolve, reject) => {
			const headers = new HttpHeaders({
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`
			});

			this._http.get(environment.apiURL + `/pokelist/${id}`, { headers }).subscribe(
				res => {
					resolve(res as APIResult);
				}, error => {
					console.log(error);
					reject(error);
				}
			);
		});
	}

	async deletePokeList (id: number) {
		return await new Promise<APIResult>((resolve, reject) => {
			const headers = new HttpHeaders({
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`
			});

			this._http.delete(environment.apiURL + `/pokelist/${id}`, { headers }).subscribe(
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
