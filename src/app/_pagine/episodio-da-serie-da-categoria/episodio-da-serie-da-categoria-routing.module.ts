import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EpisodioDaSerieDaCategoriaComponent } from './episodio-da-serie-da-categoria.component';

const routes: Routes = [{ path: '', component: EpisodioDaSerieDaCategoriaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EpisodioDaSerieDaCategoriaRoutingModule { }
