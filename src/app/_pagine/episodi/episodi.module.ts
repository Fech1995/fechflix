import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EpisodiRoutingModule } from './episodi-routing.module';
import { EpisodiComponent } from './episodi.component';
import { UikitModule } from 'src/app/_condivisi/uikit/uikit.module';


@NgModule({
  declarations: [
    EpisodiComponent
  ],
  imports: [
    CommonModule,
    EpisodiRoutingModule,
    UikitModule
  ]
})
export class EpisodiModule { }
