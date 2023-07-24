import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { MenuItem } from "primeng/api";
import { UserService } from "src/app/services/user/user.service";

@Component({
	selector: "app-header",
	templateUrl: "./header.component.html",
	styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
	items: MenuItem[] | undefined;
	pofileItems: MenuItem[] = [
		{
			label: this._translate.instant("USER.signoff"),
			command: () => {
				this.signOff();
			}
		},
		{
			label: this._translate.instant("USER.profile"),
			routerLink: "/profile"
		},
		{
			label: this._translate.instant("USER.my_pokedex"),
			routerLink: "/profile/pokedex"
		}
	];

	languages: Array<{ code: string; icon: string }> = [
		{
			code: "fr",
			icon: "fi fi-fr"
		},
		{
			code: "en",
			icon: "fi fi-us"
		},
		{
			code: "es",
			icon: "fi fi-es"
		},
		{
			code: "de",
			icon: "fi fi-de"
		},
		{
			code: "it",
			icon: "fi fi-it"
		},
		{
			code: "pt",
			icon: "fi fi-pt"
		},
		{
			code: "ja",
			icon: "fi fi-jp"
		},
		{
			code: "ko",
			icon: "fi fi-kr"
		},
		{
			code: "zh",
			icon: "fi fi-cn"
		}
	];

	currentLanguage: { code: string; icon: string } = this.languages[0];

	constructor(
		private readonly _translate: TranslateService,
		public _user: UserService,
		private readonly _router: Router
	) {}

	async ngOnInit(): Promise<void> {
		const generationItems: MenuItem[] = [];

		generationItems.push({
			label: this._translate.instant("GENERAL.all"),
			routerLink: "/pokedex/"
		});

		for (let index = 1; index < 10; index++) {
			const menuItem: MenuItem = {
				label: this._translate.instant("POKEDEX." + index.toString() + "gen"),
				routerLink: "/pokedex/" + index
			};

			generationItems.push(menuItem);
		}

		this.items = [
			{
				label: this._translate.instant("pokedex"),
				icon: "pi pi-fw pi-map-marker",
				items: generationItems
			},
			{
				label: this._translate.instant("pokelist"),
				icon: "pi pi-fw ",
				routerLink: "/pokelist/"
			}
		];

		// Find the current language or use default
		this.currentLanguage = this.languages.find(language => language.code === this._translate.currentLang) ?? this.languages[0];
	}

	signOff(): void {
		localStorage.removeItem("token");
		this._router.navigate(["/"]);
	}

	onLanguageChange(language: { code: string; icon: string }): void {
		this._translate.use(language.code);
		this.currentLanguage = language;
	}
}
