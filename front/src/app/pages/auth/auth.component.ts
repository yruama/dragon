import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/types/user';
import { APIResult } from 'src/app/types/utils.types';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  user: User = {
    FIRSTNAME:  'Amaury',
    LASTNAME:   'LAROZE',
    EMAIL:      'amaurylaroze@gmail.com',
    USERNAME:   'Yruama',
    PASSWORD:   ''
  };

  currentPage = 'sign-in';
  buttonLoading = false;

  constructor(private _user: UserService,
              private _aRoute: ActivatedRoute,
              private _router: Router,
              private _toast: MessageService,
              private _translate: TranslateService) {}

  ngOnInit(): void {
    this._aRoute.params.subscribe( params => {
      this.currentPage = params['type'] !== null ? this._aRoute.snapshot.paramMap.get('type')! : 'sign-in';
    });
  }

  async signUp() {
    this.buttonLoading = true;
    this._user.signUp(this.user).subscribe({
      next: (data: any) => {
        this._toast.add({
          severity: 'success',
          summary: this._translate.instant('TOAST.register_success'),
        });

        setTimeout(() => {
            this._router.navigate(['/']);
        }, 1500);

      }, error: (err) => {
        this._toast.add({
            severity: 'error',
            summary: this._translate.instant('TOAST.register_error'),
        });
        console.error("[SignIn] : ", err)
      }, complete: () => {
        this.buttonLoading = false;
      }
    })

  }

  signIn() {
    this.buttonLoading = true;
    this._user.signIn(this.user).subscribe({
      next: (data: any) => {
        console.log("Data => ", data)
        localStorage.setItem('token', data.result.token);
        this._toast.add({
          severity: 'success',
          summary: this._translate.instant('TOAST.connexion_success'),
      });

      setTimeout(() => {
          this._router.navigate(['/']);
      }, 1500);

      }, error: (err) => {
        this._toast.add({
            severity: 'error',
            summary: this._translate.instant('TOAST.connexion_error'),
        });
        console.error("[SignIn] : ", err)
      }, complete: () => {
        this.buttonLoading = false;
      }
    })

  }

  async test() {
    const test = await this._user.test();
    console.log("Test => ", test)
  }
}
