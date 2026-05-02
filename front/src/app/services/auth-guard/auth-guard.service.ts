import { CanActivate, Router } from "@angular/router";

import { Injectable } from "@angular/core";
import { UserService } from "../user/user.service";
import { jwtDecode } from 'jwt-decode';

@Injectable()
export class AuthGuardService implements CanActivate {
	constructor(
		private readonly _router: Router,
		private readonly _user: UserService
	) { }

	async canActivate(): Promise<boolean> {
		if (!this._user.isAuthenticated()) {
			await this._router.navigate(["auth/sign-in"]);
			return false;
		}
		return true;
	}

	hadEnoughPower(power: number = 0): boolean {
		if (!this._user.isAuthenticated()) {
			this._router.navigate(["auth/sign-in"]);
			return false;
		}

		const token = localStorage.getItem('token');
		if (token) {
			const decoded: any = jwtDecode(token);

			if (decoded.POWER >= power) return true;
		}

		return false;
	}

}
