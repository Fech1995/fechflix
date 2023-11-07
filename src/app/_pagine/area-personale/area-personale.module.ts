import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AreaPersonaleRoutingModule } from './area-personale-routing.module';
import { AreaPersonaleComponent } from './area-personale.component';


@NgModule({
  declarations: [
    AreaPersonaleComponent
  ],
  imports: [
    CommonModule,
    AreaPersonaleRoutingModule
  ]
})
export class AreaPersonaleModule { }
