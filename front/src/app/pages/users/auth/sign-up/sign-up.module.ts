import { NgModule } from '@angular/core';
import { SignUpRoutingModule } from './sign-up-routing.module';
import { SignUpComponent } from './sign-up.component';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { FieldsetModule } from 'primeng/fieldset';
import { PasswordModule } from 'primeng/password';

@NgModule({
    imports: [
        CommonModule,
        SignUpRoutingModule,
        FormsModule,
        TranslateModule,
        ButtonModule,
        CardModule,
        InputTextModule,
        FieldsetModule,
        PasswordModule,
        SignUpComponent
    ]
})
export class SignUpModule { }
