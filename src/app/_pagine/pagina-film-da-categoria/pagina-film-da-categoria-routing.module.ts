import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaginaFilmDaCategoriaComponent } from './pagina-film-da-categoria.component';

const routes: Routes = [{ path: '', component: PaginaFilmDaCategoriaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaginaFilmDaCategoriaRoutingModule { }
