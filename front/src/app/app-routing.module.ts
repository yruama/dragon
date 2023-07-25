import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'users', loadChildren: async() => (await import('./pages/users/users.module')).UsersModule }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
