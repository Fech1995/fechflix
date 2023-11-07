import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EpisodioDaSerieDaCategoriaRoutingModule } from './episodio-da-serie-da-categoria-routing.module';
import { EpisodioDaSerieDaCategoriaComponent } from './episodio-da-serie-da-categoria.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EpisodioDaSerieDaCategoriaComponent
  ],
  imports: [
    CommonModule,
    EpisodioDaSerieDaCategoriaRoutingModule,
    ReactiveFormsModule
  ]
})
export class EpisodioDaSerieDaCategoriaModule { }
