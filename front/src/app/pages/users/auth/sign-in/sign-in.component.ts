import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/types/user';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SignInComponent {
  user: User = {
    FIRSTNAME: 'Amaury',
    LASTNAME: 'LAROZE',
    EMAIL: 'amaurylaroze@gmail.com',
    USERNAME: 'Yruama',
    PASSWORD: ''
  };

  buttonLoading = false;

  constructor(private UserService: UserService,
    private ToastService: MessageService,
    private TranslateService: TranslateService,
    private Router: Router) { }

  async signUp() {
    this.buttonLoading = true;
    this.UserService.signUp(this.user).subscribe({
      next: (data: any) => {
        this.ToastService.add({
          severity: 'success',
          summary: this.TranslateService.instant('TOAST.register_success'),
        });

        setTimeout(() => {
          this.Router.navigate(['/']);
        }, 1500);

      }, error: (err) => {
        this.ToastService.add({
          severity: 'error',
          summary: this.TranslateService.instant('TOAST.register_error'),
        });
        console.error("[SignIn] : ", err)
      }, complete: () => {
        this.buttonLoading = false;
      }
    })

  }
}
