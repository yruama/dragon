import { AuthGuardService } from './services/auth-guard.service';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'design',
    loadComponent: () =>
      import('./pages/design/design.component').then(m => m.DesignComponent)
  },
  {
    path: 'database',
    loadComponent: () =>
      import('./pages/database/database.component').then(m => m.DatabaseComponent),
      canActivate: [AuthGuardService]
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
