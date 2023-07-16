import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/types/user';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  user: User = {
    FIRSTNAME:  'Amaury',
    LASTNAME:   'LAROZE',
    EMAIL:      'amaurylaroze@gmail.com',
    USERNAME:   'Yruama',
    PASSWORD:   'link2407al'
  };

  constructor(private _user: UserService) {}

  async signUp() {
    try {
      console.log("Inscription => ", this.user);
      const userData = await this._user.signUp(this.user);

      console.log(userData);
    } catch (error) {

    }

  }

  async signIn() {
    try {
      console.log("Connexion => ", this.user);
      const userData = await this._user.signIn(this.user);
    if (userData.status === 'success') {
      localStorage.setItem('token', userData.result.token);
    }
    console.log(userData);
    } catch (error) {

    }

  }

  async test() {
    const test = await this._user.test();
    console.log("Test => ", test)
  }
}
