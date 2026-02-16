import { Inject, Injectable, DOCUMENT } from '@angular/core';


@Injectable({
	providedIn: 'root'
})
export class ThemeService {
	constructor(@Inject(DOCUMENT) private readonly _document: Document) { }

	themes = ['arya-orange', "saga-orange"]

	switchTheme(theme: string) {
		const themeLink = this._document.getElementById('app-theme') as HTMLLinkElement;

		if (!this.verificationTheme(theme)) theme = "arya-orange";

		if (themeLink) {
			localStorage.setItem("theme", theme);
			themeLink.href = theme + '.css';
		}
	}

	verificationTheme(theme: string): boolean {
		return this.themes.includes(theme)
	}
}
