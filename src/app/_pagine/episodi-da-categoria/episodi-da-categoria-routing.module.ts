import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EpisodiDaCategoriaComponent } from './episodi-da-categoria.component';

const routes: Routes = [{ path: '', component: EpisodiDaCategoriaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EpisodiDaCategoriaRoutingModule { }
