import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PokedexComponent } from './pages/pokedex/pokedex.component';

import { AuthComponent } from './pages/auth/auth.component';
import { PokelistComponent } from './pages/pokelist/pokelist.component';
import { AuthGuardService } from './services/auth-guard/auth-guard.service';
import { PokemonsUserListComponent } from './pages/pokelist/pokemons-user-list/pokemons-user-list.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProfilePokedexComponent } from './pages/profile/profile-pokedex/profile-pokedex.component';

const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'pokedex', component: PokedexComponent },
	{ path: 'pokedex/:id', component: PokedexComponent },
	{ path: 'auth/:type', component: AuthComponent },
	{ path: 'pokelist', component: PokelistComponent, canActivate: [AuthGuardService] },
	{ path: 'pokelist/:id', component: PokemonsUserListComponent, canActivate: [AuthGuardService] },
	{ path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },
	{ path: 'profile/pokedex', component: ProfilePokedexComponent, canActivate: [AuthGuardService] }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
