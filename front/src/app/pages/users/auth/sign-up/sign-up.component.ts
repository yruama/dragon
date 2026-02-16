import { Component, ViewEncapsulation } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/types/user';
import { FieldsetModule } from 'primeng/fieldset';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss'],
    encapsulation: ViewEncapsulation.None,
    imports: [FieldsetModule, FormsModule, InputTextModule, PasswordModule, ButtonModule, RouterLink, TranslateModule]
})
export class SignUpComponent {
  user: User = {
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
        this.buttonLoading = false;
      }, complete: () => {
        this.buttonLoading = false;
      }
    })

  }
}
