import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SerieDaCategoriaRoutingModule } from './serie-da-categoria-routing.module';
import { SerieDaCategoriaComponent } from './serie-da-categoria.component';
import { UikitModule } from 'src/app/_condivisi/uikit/uikit.module';


@NgModule({
  declarations: [
    SerieDaCategoriaComponent
  ],
  imports: [
    CommonModule,
    SerieDaCategoriaRoutingModule,
    UikitModule
  ]
})
export class SerieDaCategoriaModule { }
