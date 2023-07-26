import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{ path: '', loadChildren: async() => (await import('./pages/home/home.module')).HomeModule },
	{ path: 'users', loadChildren: async() => (await import('./pages/users/users.module')).UsersModule }

];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
