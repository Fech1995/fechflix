import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilmRoutingModule } from './film-routing.module';
import { FilmComponent } from './film.component';
import { FormsModule } from '@angular/forms';
import { UikitModule } from 'src/app/_condivisi/uikit/uikit.module';


@NgModule({
  declarations: [
    FilmComponent
  ],
  imports: [
    CommonModule,
    FilmRoutingModule,
    FormsModule,
    UikitModule
  ]
})
export class FilmModule { }
