import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EpisodiDaCategoriaRoutingModule } from './episodi-da-categoria-routing.module';
import { EpisodiDaCategoriaComponent } from './episodi-da-categoria.component';
import { UikitModule } from 'src/app/_condivisi/uikit/uikit.module';


@NgModule({
  declarations: [
    EpisodiDaCategoriaComponent
  ],
  imports: [
    CommonModule,
    EpisodiDaCategoriaRoutingModule,
    UikitModule
  ]
})
export class EpisodiDaCategoriaModule { }
