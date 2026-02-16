import { Routes } from '@angular/router';

export function loadPokedexRoutes(): Routes {
  return [
    {
      path: '',
      loadComponent: () =>
        import('./pokedex.component').then(m => m.PokedexComponent)
    },
    {
      path: ':id',
      loadComponent: () =>
        import('./pokemon/pokemon.component').then(m => m.PokemonComponent)
    }
  ];
}
