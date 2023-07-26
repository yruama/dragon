import { Component } from "@angular/core";
import { ThemeService } from "src/app/theme.service";

@Component({
	selector: "app-toggle-darkmode",
	templateUrl: "./toggle-darkmode.component.html",
	styleUrls: ["./toggle-darkmode.component.scss"]
})
export class ToggleDarkmodeComponent {
	baseTheme = "arya-orange";
	isDarkMode = false;

	constructor(private ThemeService: ThemeService) {}

	ngOnInit() {
		this.isDarkMode = this.baseTheme === "arya-orange" ? true : false;
	}

	toggleTheme() {
		this.baseTheme = this.baseTheme === "arya-orange" ? "saga-orange" : "arya-orange";
		this.ThemeService.switchTheme(this.baseTheme);
	}
}
