import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TcgRoutingModule } from './tcg-routing.module';
import { TcgComponent } from './tcg.component';


@NgModule({
  declarations: [
    TcgComponent
  ],
  imports: [
    CommonModule,
    TcgRoutingModule
  ]
})
export class TcgModule { }
