import { CommonModule } from '@angular/common';
import { ForNumberPipe } from 'src/app/pipe/forNumber/for-number.pipe';
import { NgModule } from '@angular/core';
import { TcgComponent } from './tcg.component';
import { TcgRoutingModule } from './tcg-routing.module';

@NgModule({
  declarations: [
    TcgComponent,
    ForNumberPipe
  ],
  imports: [
    CommonModule,
    TcgRoutingModule,
  ]
})
export class TcgModule { }
