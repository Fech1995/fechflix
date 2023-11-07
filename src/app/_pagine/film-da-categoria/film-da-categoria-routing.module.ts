import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilmDaCategoriaComponent } from './film-da-categoria.component';

const routes: Routes = [{ path: '', component: FilmDaCategoriaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FilmDaCategoriaRoutingModule { }
