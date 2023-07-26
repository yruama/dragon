import { NgModule } from '@angular/core';
import { HeaderComponent } from './header.component';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { DropdownModule } from 'primeng/dropdown';
import { SharedModule } from 'src/app/shared.module';
import { MenuModule } from 'primeng/menu';
import { FormsModule } from "@angular/forms";

@NgModule({
	declarations: [
		HeaderComponent
	],
	imports: [
		ButtonModule,
		MenubarModule,
		DropdownModule,
		SharedModule,
		MenuModule,
		FormsModule
	],
	exports: [
		HeaderComponent
	]
})
export class HeaderModule { }
