import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { GlobalService } from 'src/app/services/global.service';
import { Router } from '@angular/router';
import { User } from 'src/app/types/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-in',
  imports: [CommonModule, FormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  user: User = {
    EMAIL: 'amaurylaroze@gmail.com',
    USERNAME: 'Yruama',
    PASSWORD: ''
  };
  buttonLoading = false;

  constructor(private UserService: UserService,
              private GlobalService: GlobalService,
              private Router: Router,
              private AuthGuard: AuthGuardService
  ) {}

  signIn() {
    this.buttonLoading = true;
    this.UserService.signIn(this.user).subscribe({
      next: (data: any) => {
        console.log("Data : ", data)
        localStorage.setItem('token', data.token);
        this.GlobalService.userSignIn();

        this.AuthGuard.hadEnoughPower();

        setTimeout(() => {
          this.Router.navigate(['/']);
        }, 1500);

      }, error: (err) => {
        console.error("[SignIn] : ", err)
      }, complete: () => {
        this.buttonLoading = false;
      }
    })
  }
}
