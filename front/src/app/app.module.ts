import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PokedexComponent } from './pages/pokedex/pokedex.component';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule } from '@angular/forms';
import { MenubarModule } from 'primeng/menubar';
import { PokemonsListComponent } from './components/pokemons-list/pokemons-list.component';
import { TooltipModule } from 'primeng/tooltip';
import { AuthComponent } from './pages/auth/auth.component';
import { InputTextModule } from 'primeng/inputtext';
import { SkeletonModule } from 'primeng/skeleton';
import { ForNumberPipe } from './pipe/forNumber/for-number.pipe';
import { TableModule } from 'primeng/table';
import { PokelistComponent } from './pages/pokelist/pokelist.component';
import { PokemonsUserListComponent } from './pages/pokelist/pokemons-user-list/pokemons-user-list.component';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { AuthGuardService } from './services/auth-guard/auth-guard.service';
import { DialogModule } from 'primeng/dialog';
import { ModalListComponent } from './pages/pokelist/modal-list/modal-list.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { FieldsetModule } from 'primeng/fieldset';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { MessageService } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { ProfilePokedexComponent } from './pages/profile/profile-pokedex/profile-pokedex.component';
import { ProfileComponent } from './pages/profile/profile.component';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
	return new TranslateHttpLoader(http);
}

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		PokedexComponent,
		HeaderComponent,
		PokemonsListComponent,
		AuthComponent,
		ForNumberPipe,
		PokelistComponent,
		PokemonsUserListComponent,
		ModalListComponent,
		ProfilePokedexComponent,
		ProfileComponent
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
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		ButtonModule,
		RippleModule,
		FormsModule,
		MenubarModule,
		TooltipModule,
		InputTextModule,
		SkeletonModule,
		TableModule,
		DialogModule,
		MultiSelectModule,
		DropdownModule,
		FieldsetModule,
		InputSwitchModule,
		ToastModule,
		MessagesModule,
		MenuModule
	],
	providers: [
		{ provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
		JwtHelperService,
		AuthGuardService,
		MessageService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
