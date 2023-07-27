import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { TranslateLoader, TranslateModule, TranslateStore } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { JwtHelperService, JWT_OPTIONS } from "@auth0/angular-jwt";
import { AuthGuardService } from "./services/auth-guard/auth-guard.service";
import { MessageService } from "primeng/api";
import { AppRoutingModule } from "./app-routing.module";
import { HeaderModule } from "./components/header/header.module";
import { APP_INITIALIZER } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'primeng/toast';
import { LoaderComponent } from "./components/loader/loader.component";
import { LoaderService } from "./services/loader/loader.service";

export function appInitializerFactory(translate: TranslateService) {
	return () => new Promise<void>((resolve: any) => {
		// Load your translation files here
		// For example:
		translate.use('fr').subscribe(() => {
			// You can perform additional actions here if needed
			resolve(null);
		});
	});
}

export function HttpLoaderFactory(http: HttpClient) {
	return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
	declarations: [
		AppComponent,
		LoaderComponent
	],
	imports: [
		HttpClientModule,
		AppRoutingModule,
		HeaderModule,
		TranslateModule.forRoot({
			defaultLanguage: 'en',
			loader: {
				provide: TranslateLoader,
				useFactory: HttpLoaderFactory,
				deps: [HttpClient],
			},
		}),
		BrowserModule,
		CommonModule,
		BrowserAnimationsModule,
		ToastModule

	],
	providers: [
		{ provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
		JwtHelperService,
		AuthGuardService,
		MessageService,
		{
			provide: APP_INITIALIZER,
			useFactory: appInitializerFactory,
			deps: [TranslateService],
			multi: true,
		},
		LoaderService
	],
	bootstrap: [AppComponent],
})



export class AppModule { }
