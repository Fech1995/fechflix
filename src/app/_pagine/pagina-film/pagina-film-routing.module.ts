import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaginaFilmComponent } from './pagina-film.component';

const routes: Routes = [{ path: '', component: PaginaFilmComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaginaFilmRoutingModule { }
