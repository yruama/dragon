import { Component, ViewEncapsulation } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { GlobalService } from 'src/app/services/global/global.service';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/types/user';
import { FieldsetModule } from 'primeng/fieldset';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss'],
    encapsulation: ViewEncapsulation.None,
    imports: [FieldsetModule, FormsModule, InputTextModule, PasswordModule, ButtonModule, RouterLink, TranslateModule]
})
export class SignInComponent {
  user: User = {
    EMAIL: 'amaurylaroze@gmail.com',
    USERNAME: 'Yruama',
    PASSWORD: ''
  };

  buttonLoading = false;

  constructor(private UserService: UserService,
    private ToastService: MessageService,
    private TranslateService: TranslateService,
    private Router: Router,
    private GlobalService: GlobalService) { }

  signIn() {
    this.buttonLoading = true;
    this.UserService.signIn(this.user).subscribe({
      next: (data: any) => {
        localStorage.setItem('token', data.token);
        this.ToastService.add({
          severity: 'success',
          summary: this.TranslateService.instant('TOAST.connexion_success'),
        });

        this.GlobalService.userSignIn();

        setTimeout(() => {
          this.Router.navigate(['/']);
        }, 1500);

      }, error: (err) => {
        this.ToastService.add({
          severity: 'error',
          summary: this.TranslateService.instant('TOAST.connexion_error'),
        });
        console.error("[SignIn] : ", err)
      }, complete: () => {
        this.buttonLoading = false;
      }
    })

  }

}
