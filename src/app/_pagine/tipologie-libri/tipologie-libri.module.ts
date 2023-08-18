import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TipologieLibriRoutingModule } from './tipologie-libri-routing.module';
import { TipologieLibriComponent } from './tipologie-libri.component';
import { UikitModule } from 'src/app/_condivisi/uikit/uikit.module';


@NgModule({
  declarations: [
    TipologieLibriComponent
  ],
  imports: [
    CommonModule,
    TipologieLibriRoutingModule,
    UikitModule
  ]
})
export class TipologieLibriModule { }
