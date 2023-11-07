import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EpisodioDaSerieRoutingModule } from './episodio-da-serie-routing.module';
import { EpisodioDaSerieComponent } from './episodio-da-serie.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EpisodioDaSerieComponent
  ],
  imports: [
    CommonModule,
    EpisodioDaSerieRoutingModule,
    ReactiveFormsModule
  ]
})
export class EpisodioDaSerieModule { }
