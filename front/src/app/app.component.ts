import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { TranslateService } from "@ngx-translate/core";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'Pokedex';

	constructor (private readonly _primengConfig: PrimeNGConfig,
		private readonly _translate: TranslateService) {
		_translate.setDefaultLang('fr');
		_translate.use('fr');
	}

	ngOnInit () {
		this._primengConfig.ripple = true;
	}
}
