import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { PokedexComponent } from './pokedex.component';

const routes: Routes = [{ path: '', component: PokedexComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PokedexRoutingModule { }
