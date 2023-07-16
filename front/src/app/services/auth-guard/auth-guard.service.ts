import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterState, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private _router: Router,
    private _user: UserService
  ) { }

  canActivate(): boolean {
    if (!this._user.isAuthenticated()) {
      this._router.navigate(['auth/sign-in']);
      return false;
    }
    return true;
  }



}