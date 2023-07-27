import { Component } from "@angular/core";
import { PrimeNGConfig } from "primeng/api";
import { TranslateService } from "@ngx-translate/core";
import { GlobalService } from "./services/global/global.service";
import { ThemeService } from "./theme.service";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"]
})
export class AppComponent {
	title = "Pokedex";

	constructor(
		private readonly _primengConfig: PrimeNGConfig,
		private readonly _translate: TranslateService,
		public GlobalService: GlobalService,
		private ThemeService: ThemeService
	) {
		this.GlobalService.appLoading = true;
		_translate.setDefaultLang("fr");
		_translate.use("fr").subscribe({
			next: () => { },
			error: err => { console.log("error : ", err); },
			complete: () => {
				this.GlobalService.appLoading = false;
			}
		});
	}

	ngOnInit(): void {
		this._primengConfig.ripple = true;

		/* Theming */
		let localDarMode = localStorage.getItem('darkmode') != null ? JSON.parse(localStorage.getItem('darkmode')!) : null;
		this.GlobalService.isDarkMode = localDarMode ?? this.GlobalService.isDarkMode;
		this.GlobalService.theme = localStorage.getItem("theme") || this.GlobalService.theme;
		this.ThemeService.switchTheme(this.GlobalService.theme);
	}
}
