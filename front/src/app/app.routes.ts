import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'users',
    loadComponent: () =>
      import('./pages/users/users.component').then(m => m.UsersComponent)
  },
  {
    path: 'pokedex',
    loadChildren: () =>
      import('./pages/pokedex/pokedex.routes').then(m => m.loadPokedexRoutes())
  },
  {
    path: 'tcg',
    loadComponent: () =>
      import('./pages/tcg/tcg.component').then(m => m.TcgComponent)
  },
  {
    path: 'users/collection',
    loadComponent: () =>
      import('./pages/users/pokelist/pokelist.component').then(m => m.PokelistComponent)
  },
  {
    path: 'users/sign-up',
    loadComponent: () =>
      import('./pages/users/auth/sign-up/sign-up.component').then(m => m.SignUpComponent)
  },
  {
    path: 'users/sign-in',
    loadComponent: () =>
      import('./pages/users/auth/sign-in/sign-in.component').then(m => m.SignInComponent)
  }
];
