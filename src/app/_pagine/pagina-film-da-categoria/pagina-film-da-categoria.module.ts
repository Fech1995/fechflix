import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaginaFilmDaCategoriaRoutingModule } from './pagina-film-da-categoria-routing.module';
import { PaginaFilmDaCategoriaComponent } from './pagina-film-da-categoria.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PaginaFilmDaCategoriaComponent
  ],
  imports: [
    CommonModule,
    PaginaFilmDaCategoriaRoutingModule,
    ReactiveFormsModule
  ]
})
export class PaginaFilmDaCategoriaModule { }
