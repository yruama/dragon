import { Router, RouterOutlet } from "@angular/router";

import { Component } from "@angular/core";
import { GlobalService } from "./services/global/global.service";
import { HeaderComponent } from "./components/header/header.component";
import { LoaderComponent } from "./components/loader/loader.component";
import { LoaderService } from "./services/loader/loader.service";
import { PrimeNGConfig } from "primeng/api";
import { ThemeService } from "./theme.service";
import { ToastModule } from 'primeng/toast';
import { TranslateService } from "@ngx-translate/core";
import { UserService } from "./services/user/user.service";

@Component({
	imports:[HeaderComponent, RouterOutlet, LoaderComponent, ToastModule],
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
    standalone: true
})
export class AppComponent {
	title = "Pokedex";
	isLoading = false;

	constructor(
		private readonly _primengConfig: PrimeNGConfig,
		private readonly _translate: TranslateService,
		public GlobalService: GlobalService,
		private ThemeService: ThemeService,
		private UserService: UserService,
		private Router: Router,
		private LoaderService: LoaderService
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

		/* gestion loader */
		this.LoaderService.isLoading$.subscribe((isLoading) => {
			this.isLoading = isLoading;
		});

		/* check connexion */
		if (localStorage.getItem("token")) {
			// On catch un token, on vérifie qu'il est bon
			this.UserService.getByToken().subscribe({
				next: () => { },
				error: (err) => {
					console.error("[SignIn] : ", err)
					localStorage.removeItem('token');
					this.Router.navigate(['/users/sign-in'])
				},
				complete: () => { }
			})
		}


	}
}
