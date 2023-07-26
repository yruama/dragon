import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
  declarations: [],
  imports: [
  ],
  exports: [
    TranslateModule,
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule
  ]
})

export class SharedModule { }
