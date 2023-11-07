import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaginaFilmRoutingModule } from './pagina-film-routing.module';
import { PaginaFilmComponent } from './pagina-film.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PaginaFilmComponent
  ],
  imports: [
    CommonModule,
    PaginaFilmRoutingModule,
    ReactiveFormsModule
  ]
})
export class PaginaFilmModule { }
