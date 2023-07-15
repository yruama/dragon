import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PokedexComponent } from './pages/pokedex/pokedex.component';
import { AuthComponent } from './pages/auth/auth.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'pokedex', component: PokedexComponent },
  { path: 'pokedex/:id', component: PokedexComponent },
  { path: 'auth/sign-in', component: AuthComponent},
  { path: 'auth/sign-up', component: AuthComponent},
  { path: 'auth/sign-off', component: AuthComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
