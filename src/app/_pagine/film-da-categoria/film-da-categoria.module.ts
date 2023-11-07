import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilmDaCategoriaRoutingModule } from './film-da-categoria-routing.module';
import { FilmDaCategoriaComponent } from './film-da-categoria.component';
import { UikitModule } from 'src/app/_condivisi/uikit/uikit.module';


@NgModule({
  declarations: [
    FilmDaCategoriaComponent
  ],
  imports: [
    CommonModule,
    FilmDaCategoriaRoutingModule,
    UikitModule,
  ]
})
export class FilmDaCategoriaModule { }
