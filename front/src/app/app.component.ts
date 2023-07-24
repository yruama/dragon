import { Component } from "@angular/core";
import { PrimeNGConfig } from "primeng/api";
import { TranslateService } from "@ngx-translate/core";
import { GlobalService } from "./services/global/global.service";

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
		public _global: GlobalService
	) {
		this._global.appLoading = true;
		_translate.setDefaultLang("fr");
		_translate.use("fr").subscribe({
			next: () => {},
			error: err => {},
			complete: () => {
				this._global.appLoading = false;
			}
		});
	}

	ngOnInit(): void {
		this._primengConfig.ripple = true;
	}
}
