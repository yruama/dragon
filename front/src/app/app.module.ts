import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { JwtHelperService, JWT_OPTIONS } from "@auth0/angular-jwt";
import { AuthGuardService } from "./services/auth-guard/auth-guard.service";
import { MessageService } from "primeng/api";
import { SharedModule } from "./shared.module";
import { AppRoutingModule } from "./app-routing.module";
import { HeaderModule } from "./components/header/header.module";
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
	return new TranslateHttpLoader(http);
}

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		HttpClientModule,
		AppRoutingModule,
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: HttpLoaderFactory,
				deps: [HttpClient]
			}
		}),
		HeaderModule,
		SharedModule
	],
	providers: [{ provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, JwtHelperService, AuthGuardService, MessageService],
	bootstrap: [AppComponent]
})
export class AppModule { }
