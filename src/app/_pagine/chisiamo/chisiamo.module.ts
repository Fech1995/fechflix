import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChisiamoRoutingModule } from './chisiamo-routing.module';
import { ChisiamoComponent } from './chisiamo.component';


@NgModule({
  declarations: [
    ChisiamoComponent
  ],
  imports: [
    CommonModule,
    ChisiamoRoutingModule
  ]
})
export class ChisiamoModule { }
