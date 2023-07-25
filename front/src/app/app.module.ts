import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./pages/home/home.component";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { HeaderComponent } from "./components/header/header.component";
import { ForNumberPipe } from "./pipe/forNumber/for-number.pipe";
import { JwtHelperService, JWT_OPTIONS } from "@auth0/angular-jwt";
import { AuthGuardService } from "./services/auth-guard/auth-guard.service";
import { MessageService } from "primeng/api";
import { SharedModule } from "./shared.module";

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
	return new TranslateHttpLoader(http);
}

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		HeaderComponent,
		ForNumberPipe
	],
	imports: [
		HttpClientModule,
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: HttpLoaderFactory,
				deps: [HttpClient]
			}
		}),
		SharedModule
	],
	providers: [{ provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, JwtHelperService, AuthGuardService, MessageService],
	bootstrap: [AppComponent]
})
export class AppModule { }
