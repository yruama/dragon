import { NgModule } from "@angular/core";
import { HeaderComponent } from "./header.component";
import { ButtonModule } from "primeng/button";
import { MenubarModule } from "primeng/menubar";
import { DropdownModule } from "primeng/dropdown";
import { SharedModule } from "src/app/shared.module";
import { MenuModule } from "primeng/menu";
import { FormsModule } from "@angular/forms";
import { ToggleDarkmodeComponent } from "./toggle-darkmode/toggle-darkmode.component";
import { InputSwitchModule } from "primeng/inputswitch";
import { CardModule } from 'primeng/card';

@NgModule({
	declarations: [HeaderComponent, ToggleDarkmodeComponent],
	imports: [ButtonModule, MenubarModule, DropdownModule, SharedModule, MenuModule, FormsModule, InputSwitchModule, CardModule],
	exports: [HeaderComponent]
})
export class HeaderModule { }
